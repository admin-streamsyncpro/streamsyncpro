<?php

declare(strict_types=1);

date_default_timezone_set('UTC');
session_start();

$configPath = __DIR__ . '/../api/config.php';

if (!file_exists($configPath)) {
    http_response_code(500);
    echo 'Missing API config.php. Upload and configure website-auth/api/config.php first.';
    exit;
}

$config = require $configPath;
$message = '';
$messageType = 'info';

try {
    $pdo = createPdo($config['db'] ?? []);
    ensureSchema($pdo);
} catch (Throwable $exception) {
    http_response_code(500);
    echo 'Database connection failed: ' . htmlspecialchars($exception->getMessage(), ENT_QUOTES, 'UTF-8');
    exit;
}

if (isset($_GET['logout'])) {
    unset($_SESSION['ssp_admin_authenticated']);
    header('Location: ./');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = (string) ($_POST['action'] ?? '');

    if ($action === 'login') {
        $username = trim((string) ($_POST['username'] ?? ''));
        $password = (string) ($_POST['password'] ?? '');

        if (verifyAdminCredentials($config['admin'] ?? [], $username, $password)) {
            $_SESSION['ssp_admin_authenticated'] = true;
            header('Location: ./');
            exit;
        }

        $message = 'Admin username or password is incorrect.';
        $messageType = 'error';
    }

    if (isAdminAuthenticated()) {
        if ($action === 'lock-user') {
            $id = (int) ($_POST['user_id'] ?? 0);
            $reason = trim((string) ($_POST['locked_reason'] ?? ''));
            $statement = $pdo->prepare('UPDATE auth_users SET is_locked = 1, locked_reason = :locked_reason WHERE id = :id');
            $statement->execute([
                ':locked_reason' => $reason !== '' ? $reason : null,
                ':id' => $id,
            ]);
            $message = 'Account locked successfully.';
            $messageType = 'success';
        } elseif ($action === 'unlock-user') {
            $id = (int) ($_POST['user_id'] ?? 0);
            $statement = $pdo->prepare('UPDATE auth_users SET is_locked = 0, locked_reason = NULL WHERE id = :id');
            $statement->execute([':id' => $id]);
            $message = 'Account unlocked successfully.';
            $messageType = 'success';
        } elseif ($action === 'delete-user') {
            $id = (int) ($_POST['user_id'] ?? 0);
            $statement = $pdo->prepare('DELETE FROM auth_users WHERE id = :id');
            $statement->execute([':id' => $id]);
            $message = 'Account deleted successfully.';
            $messageType = 'success';
        } elseif ($action === 'update-user-credits') {
            $id = (int) ($_POST['user_id'] ?? 0);
            $credits = max(0, (int) ($_POST['credits'] ?? 0));
            $statement = $pdo->prepare('UPDATE auth_users SET credits = :credits WHERE id = :id');
            $statement->execute([
                ':credits' => $credits,
                ':id' => $id,
            ]);
            $message = 'User credits updated successfully.';
            $messageType = 'success';
        } elseif ($action === 'change-admin-password') {
            $currentPassword = (string) ($_POST['current_password'] ?? '');
            $newPassword = (string) ($_POST['new_password'] ?? '');
            $confirmPassword = (string) ($_POST['confirm_password'] ?? '');

            if (!verifyAdminCredentials($config['admin'] ?? [], (string) (($config['admin']['username'] ?? 'admin')), $currentPassword)) {
                $message = 'Current admin password is incorrect.';
                $messageType = 'error';
            } elseif (strlen($newPassword) < 8) {
                $message = 'New admin password must be at least 8 characters long.';
                $messageType = 'error';
            } elseif (!hash_equals($newPassword, $confirmPassword)) {
                $message = 'New admin password confirmation does not match.';
                $messageType = 'error';
            } elseif (!is_writable($configPath)) {
                $message = 'The API config file is not writable. Update website-auth/api/config.php manually or change file permissions.';
                $messageType = 'error';
            } else {
                updateAdminPasswordHash($configPath, password_hash($newPassword, PASSWORD_DEFAULT));
                $config = require $configPath;
                $message = 'Admin password updated successfully.';
                $messageType = 'success';
            }
        }
    }
}

if (!isAdminAuthenticated()) {
    renderLogin($message, $messageType);
    exit;
}

$searchQuery = trim((string) ($_GET['q'] ?? ''));
$statusFilter = (string) ($_GET['status'] ?? 'all');
$auditUserId = max(0, (int) ($_GET['audit_user_id'] ?? 0));
$auditFrom = trim((string) ($_GET['audit_from'] ?? ''));
$auditTo = trim((string) ($_GET['audit_to'] ?? ''));
$auditType = trim((string) ($_GET['audit_type'] ?? 'all'));
$auditSort = trim((string) ($_GET['audit_sort'] ?? 'desc'));
$users = fetchUsers($pdo, $searchQuery, $statusFilter);
$auditedUser = $auditUserId > 0 ? findUserById($pdo, $auditUserId) : null;
$auditLogs = $auditUserId > 0 ? fetchAuditLogs($pdo, $auditUserId, $auditFrom, $auditTo, $auditType, $auditSort) : [];
renderDashboard($users, $message, $messageType, $searchQuery, $statusFilter, $auditUserId, $auditedUser, $auditLogs, $auditFrom, $auditTo, $auditType, $auditSort);

function isAdminAuthenticated(): bool
{
    return !empty($_SESSION['ssp_admin_authenticated']);
}

function verifyAdminCredentials(array $adminConfig, string $username, string $password): bool
{
    $expectedUsername = (string) ($adminConfig['username'] ?? 'admin');
    $expectedHash = (string) ($adminConfig['password_hash'] ?? '');

    if ($username !== $expectedUsername) {
        return false;
    }

    if ($expectedHash === '') {
        return false;
    }

    return password_verify($password, $expectedHash);
}

function createPdo(array $db): PDO
{
    $host = (string) ($db['host'] ?? 'localhost');
    $port = (int) ($db['port'] ?? 3306);
    $name = (string) ($db['name'] ?? '');
    $user = (string) ($db['user'] ?? '');
    $password = (string) ($db['password'] ?? '');
    $charset = (string) ($db['charset'] ?? 'utf8mb4');

    $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $host, $port, $name, $charset);

    return new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}

function ensureSchema(PDO $pdo): void
{
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS auth_users (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            display_name VARCHAR(120) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            is_verified TINYINT(1) NOT NULL DEFAULT 0,
            is_locked TINYINT(1) NOT NULL DEFAULT 0,
            credits INT NOT NULL DEFAULT 0,
            locked_reason VARCHAR(255) NULL,
            session_token_hash VARCHAR(255) NULL,
            session_token_expires_at DATETIME NULL,
            verification_code_hash VARCHAR(255) NULL,
            verification_code_expires_at DATETIME NULL,
            password_reset_code_hash VARCHAR(255) NULL,
            password_reset_expires_at DATETIME NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS auth_user_audit_logs (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NOT NULL,
            event_type VARCHAR(80) NOT NULL,
            event_description VARCHAR(255) NOT NULL,
            remaining_credits INT NULL,
            metadata_json TEXT NULL,
            ip_address VARCHAR(64) NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_audit_user_created (user_id, created_at),
            CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    ensureColumn($pdo, 'auth_users', 'is_locked', 'ALTER TABLE auth_users ADD COLUMN is_locked TINYINT(1) NOT NULL DEFAULT 0 AFTER is_verified');
    ensureColumn($pdo, 'auth_users', 'credits', 'ALTER TABLE auth_users ADD COLUMN credits INT NOT NULL DEFAULT 0 AFTER is_locked');
    ensureColumn($pdo, 'auth_users', 'locked_reason', 'ALTER TABLE auth_users ADD COLUMN locked_reason VARCHAR(255) NULL AFTER is_locked');
    ensureColumn($pdo, 'auth_users', 'session_token_hash', 'ALTER TABLE auth_users ADD COLUMN session_token_hash VARCHAR(255) NULL AFTER locked_reason');
    ensureColumn($pdo, 'auth_users', 'session_token_expires_at', 'ALTER TABLE auth_users ADD COLUMN session_token_expires_at DATETIME NULL AFTER session_token_hash');
}

function ensureColumn(PDO $pdo, string $table, string $column, string $sql): void
{
    $statement = $pdo->prepare(
        'SELECT COUNT(*) FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table_name AND COLUMN_NAME = :column_name'
    );
    $statement->execute([
        ':table_name' => $table,
        ':column_name' => $column,
    ]);

    if ((int) $statement->fetchColumn() === 0) {
        $pdo->exec($sql);
    }
}

function fetchUsers(PDO $pdo, string $searchQuery, string $statusFilter): array
{
    $conditions = [];
    $params = [];

    if ($searchQuery !== '') {
        $conditions[] = '(email LIKE :search OR display_name LIKE :search)';
        $params[':search'] = '%' . $searchQuery . '%';
    }

    if ($statusFilter === 'locked') {
        $conditions[] = 'is_locked = 1';
    } elseif ($statusFilter === 'active') {
        $conditions[] = 'is_locked = 0';
    } elseif ($statusFilter === 'verified') {
        $conditions[] = 'is_verified = 1';
    } elseif ($statusFilter === 'pending') {
        $conditions[] = 'is_verified = 0';
    }

    $sql =
        'SELECT id, email, display_name, is_verified, is_locked, credits, locked_reason, created_at, updated_at
         FROM auth_users';

    if ($conditions) {
        $sql .= ' WHERE ' . implode(' AND ', $conditions);
    }

    $sql .= ' ORDER BY created_at DESC';

    $statement = $pdo->prepare($sql);
    $statement->execute($params);

    return $statement->fetchAll();
}

function findUserById(PDO $pdo, int $userId): ?array
{
    $statement = $pdo->prepare(
        'SELECT id, email, display_name, is_verified, is_locked, credits, locked_reason, created_at, updated_at
         FROM auth_users
         WHERE id = :id
         LIMIT 1'
    );
    $statement->execute([':id' => $userId]);
    $user = $statement->fetch();

    return $user ?: null;
}

function fetchAuditLogs(PDO $pdo, int $userId, string $auditFrom, string $auditTo, string $auditType, string $auditSort): array
{
    $conditions = ['user_id = :user_id'];
    $params = [':user_id' => $userId];

    if ($auditFrom !== '' && preg_match('/^\d{4}-\d{2}-\d{2}$/', $auditFrom) === 1) {
        $conditions[] = 'created_at >= :audit_from';
        $params[':audit_from'] = $auditFrom . ' 00:00:00';
    }

    if ($auditTo !== '' && preg_match('/^\d{4}-\d{2}-\d{2}$/', $auditTo) === 1) {
        $conditions[] = 'created_at <= :audit_to';
        $params[':audit_to'] = $auditTo . ' 23:59:59';
    }

    if ($auditType !== '' && $auditType !== 'all') {
        $conditions[] = 'event_type = :audit_type';
        $params[':audit_type'] = $auditType;
    }

    $sortDirection = $auditSort === 'asc' ? 'ASC' : 'DESC';
    $statement = $pdo->prepare(
        'SELECT event_type, event_description, remaining_credits, ip_address, created_at
         FROM auth_user_audit_logs
         WHERE ' . implode(' AND ', $conditions) . '
         ORDER BY created_at ' . $sortDirection . ', id ' . $sortDirection . '
         LIMIT 100'
    );
    $statement->execute($params);

    return $statement->fetchAll();
}

function updateAdminPasswordHash(string $configPath, string $passwordHash): void
{
    $contents = file_get_contents($configPath);

    if ($contents === false) {
        throw new RuntimeException('Unable to read config.php.');
    }

    $updated = preg_replace_callback(
        "/('password_hash'\\s*=>\\s*)'[^']*'/",
        static function (array $matches) use ($passwordHash): string {
            return $matches[1] . "'" . addslashes($passwordHash) . "'";
        },
        $contents,
        1
    );

    if ($updated === null || $updated === $contents) {
        throw new RuntimeException('Unable to update admin password hash in config.php.');
    }

    if (file_put_contents($configPath, $updated) === false) {
        throw new RuntimeException('Unable to write updated config.php.');
    }
}

function renderLogin(string $message, string $messageType): void
{
    ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Stream Sync Pro Admin</title>
  <style>
    :root{--bg:#050915;--bg2:#081122;--panel:rgba(12,20,37,.95);--panel2:rgba(7,12,24,.98);--text:#eaf2ff;--muted:#a7b9d6;--line:rgba(97,160,255,.22);--cyan:#4de7ff;--violet:#9068ff;--magenta:#ff4db8;--shadow:0 30px 90px rgba(0,0,0,.56),0 10px 28px rgba(0,0,0,.26);--radius:28px}
    *{box-sizing:border-box}
    body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;color:var(--text);display:grid;place-items:center;min-height:100vh;background:radial-gradient(circle at top left,rgba(77,231,255,.12),transparent 32%),radial-gradient(circle at top right,rgba(144,104,255,.16),transparent 26%),linear-gradient(180deg,var(--bg2) 0%,var(--bg) 45%,#02050d 100%)}
    body::before{content:"";position:fixed;inset:0;pointer-events:none;background:linear-gradient(120deg,rgba(77,231,255,.05),transparent 22%),linear-gradient(300deg,rgba(255,77,184,.04),transparent 18%)}
    .card{position:relative;isolation:isolate;overflow:hidden;width:min(460px,92vw);background:linear-gradient(180deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}
    .card::before{content:"";position:absolute;inset:-1px;padding:2px;border-radius:inherit;background:conic-gradient(from 0deg,rgba(77,231,255,.12) 0deg,rgba(77,231,255,.18) 55deg,rgba(77,231,255,.95) 88deg,rgba(144,104,255,.9) 132deg,rgba(255,77,184,.82) 170deg,rgba(77,231,255,.16) 230deg,rgba(77,231,255,.12) 360deg);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
    .head{position:relative;padding:18px 22px 16px;background:linear-gradient(180deg,rgba(5,7,13,.998) 0%,rgba(10,14,22,.994) 34%,rgba(20,28,41,.96) 100%);border-bottom:1px solid rgba(97,160,255,.18);box-shadow:inset 0 -1px 0 rgba(77,231,255,.1),0 8px 18px rgba(0,0,0,.16)}
    .head::after{content:"";position:absolute;left:12px;right:12px;bottom:0;height:1px;background:linear-gradient(90deg,rgba(77,231,255,.1),rgba(144,104,255,.28),rgba(77,231,255,.1))}
    .eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--magenta);margin-bottom:8px}
    .title{font-family:"Space Grotesk",Segoe UI,Arial,sans-serif;font-weight:700;font-size:29px;letter-spacing:-.03em;line-height:1.02}
    .subtitle{margin-top:8px;color:var(--muted);font-size:14px;line-height:1.6}
    .body{padding:22px;display:grid;gap:14px}
    label{display:grid;gap:8px;font-size:14px;color:#c5d8f4}
    input{height:46px;border-radius:14px;border:1px solid rgba(89,170,255,.18);background:#081224;color:#fff;padding:0 14px;outline:none}
    input:focus{border-color:rgba(77,231,255,.5);box-shadow:0 0 0 3px rgba(77,231,255,.12)}
    button{height:46px;border:none;border-radius:14px;background:linear-gradient(135deg,#27d9ff,#8dfbff);color:#04111f;font-weight:800;cursor:pointer;box-shadow:0 16px 30px rgba(77,231,255,.18)}
    .msg{padding:12px 14px;border-radius:14px;font-size:14px;border:1px solid transparent}
    .msg.error{background:rgba(255,88,125,.12);border-color:rgba(255,88,125,.15);color:#ffb7c7}
  </style>
</head>
<body>
  <form class="card" method="post">
    <div class="head">
      <div class="eyebrow">Admin Access</div>
      <div class="title">Stream Sync Pro</div>
      <div class="subtitle">Secure dashboard access for account management, credits, lockouts, and admin controls.</div>
    </div>
    <div class="body">
      <?php if ($message !== ''): ?>
        <div class="msg <?php echo htmlspecialchars($messageType, ENT_QUOTES, 'UTF-8'); ?>"><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></div>
      <?php endif; ?>
      <input type="hidden" name="action" value="login" />
      <label>Username<input type="text" name="username" required /></label>
      <label>Password<input type="password" name="password" required /></label>
      <button type="submit">Sign In</button>
    </div>
  </form>
</body>
</html>
<?php
}

function renderDashboard(array $users, string $message, string $messageType, string $searchQuery, string $statusFilter, int $auditUserId, ?array $auditedUser, array $auditLogs, string $auditFrom, string $auditTo, string $auditType, string $auditSort): void
{
    ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Stream Sync Pro User Dashboard</title>
  <style>
    :root{--bg:#050915;--bg2:#081122;--panel:rgba(12,20,37,.95);--panel2:rgba(7,12,24,.98);--text:#eaf2ff;--muted:#a7b9d6;--line:rgba(97,160,255,.22);--cyan:#4de7ff;--violet:#9068ff;--magenta:#ff4db8;--shadow:0 30px 90px rgba(0,0,0,.56),0 10px 28px rgba(0,0,0,.26);--shadow-soft:0 22px 56px rgba(0,0,0,.34);--radius:28px}
    *{box-sizing:border-box}
    body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:radial-gradient(circle at top left,rgba(77,231,255,.12),transparent 32%),radial-gradient(circle at top right,rgba(144,104,255,.16),transparent 26%),linear-gradient(180deg,var(--bg2) 0%,var(--bg) 45%,#02050d 100%);color:var(--text)}
    body::before{content:"";position:fixed;inset:0;pointer-events:none;background:linear-gradient(120deg,rgba(77,231,255,.05),transparent 22%),linear-gradient(300deg,rgba(255,77,184,.04),transparent 18%)}
    .wrap{max-width:1280px;margin:0 auto;padding:28px 20px 56px}
    .panel{position:relative;isolation:isolate;overflow:hidden;background:linear-gradient(180deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}
    .panel::before{content:"";position:absolute;inset:-1px;padding:2px;border-radius:inherit;background:conic-gradient(from 0deg,rgba(77,231,255,.12) 0deg,rgba(77,231,255,.18) 55deg,rgba(77,231,255,.95) 88deg,rgba(144,104,255,.9) 132deg,rgba(255,77,184,.82) 170deg,rgba(77,231,255,.16) 230deg,rgba(77,231,255,.12) 360deg);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
    .panel-head{position:relative;padding:16px 22px 15px;background:linear-gradient(180deg,rgba(5,7,13,.998) 0%,rgba(10,14,22,.994) 34%,rgba(20,28,41,.96) 100%);border-bottom:1px solid rgba(97,160,255,.18);box-shadow:inset 0 -1px 0 rgba(77,231,255,.1),0 8px 18px rgba(0,0,0,.16)}
    .panel-head::after{content:"";position:absolute;left:12px;right:12px;bottom:0;height:1px;background:linear-gradient(90deg,rgba(77,231,255,.1),rgba(144,104,255,.28),rgba(77,231,255,.1))}
    .panel-body{padding:22px}
    .eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--magenta);margin-bottom:8px}
    .title{font-family:"Space Grotesk",Segoe UI,Arial,sans-serif;font-size:30px;font-weight:700;line-height:1.02;letter-spacing:-.03em}
    .subtitle{margin-top:8px;color:var(--muted);font-size:15px;line-height:1.65}
    .top{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;margin-bottom:20px}
    .top a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:14px;text-decoration:none;font-weight:800;background:rgba(16,24,44,.86);border:1px solid rgba(144,104,255,.34);color:var(--text)}
    .msg{padding:12px 14px;border-radius:14px;font-size:14px;margin-bottom:16px;border:1px solid transparent}
    .msg.success{background:rgba(97,243,164,.12);border-color:rgba(97,243,164,.15);color:#bff7d4}
    .msg.error{background:rgba(255,88,125,.12);border-color:rgba(255,88,125,.15);color:#ffb7c7}
    .toolbar,.admin-panel{margin-bottom:18px}
    .toolbar .panel-body,.admin-panel .panel-body{display:grid;gap:16px}
    .toolbar-top{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
    .toolbar form,.admin-panel form{display:flex;gap:10px;align-items:end;flex-wrap:wrap}
    label{display:grid;gap:6px;color:#c5d8f4;font-size:13px}
    input,select{height:42px;border-radius:12px;border:1px solid rgba(89,170,255,.18);background:#081224;color:#fff;padding:0 12px;min-width:180px;outline:none}
    input:focus,select:focus{border-color:rgba(77,231,255,.5);box-shadow:0 0 0 3px rgba(77,231,255,.12)}
    .toolbar .search{min-width:280px}
    table{width:100%;border-collapse:separate;border-spacing:0}
    .table-panel{overflow:hidden}
    th,td{padding:14px 12px;border-bottom:1px solid rgba(89,170,255,.1);text-align:left;vertical-align:middle}
    th{position:relative;background:linear-gradient(180deg,rgba(5,7,13,.998) 0%,rgba(10,14,22,.994) 34%,rgba(20,28,41,.96) 100%);color:#b9d7ff;font-size:12px;text-transform:uppercase;letter-spacing:.1em}
    tr:last-child td{border-bottom:none}
    .pill{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;font-size:12px;font-weight:800}
    .pill.ok{background:rgba(97,243,164,.12);color:#9cf0b7}
    .pill.off{background:rgba(255,255,255,.08);color:#c4d4ea}
    .pill.locked{background:rgba(255,88,125,.14);color:#ffb7c7}
    .actions{display:flex;align-items:center;gap:8px;flex-wrap:nowrap}
    .action-form{display:flex;align-items:center;gap:8px;flex-wrap:nowrap;margin:0}
    .action-form input{height:38px;min-width:0}
    .credits-input{width:74px;text-align:center}
    .reason-input{width:148px}
    .row{display:flex;gap:8px;flex-wrap:nowrap}
    button{height:38px;border:none;border-radius:12px;padding:0 14px;cursor:pointer;font-weight:800}
    .lock{background:#ffb04f;color:#1b1200}
    .unlock{background:linear-gradient(135deg,#27d9ff,#8dfbff);color:#04111f}
    .delete{background:#ff5a7a;color:#fff}
    .icon-btn{width:38px;min-width:38px;padding:0;font-size:16px;line-height:1;display:inline-flex;align-items:center;justify-content:center}
    .muted{color:var(--muted)}
    .audit-panel{margin-top:18px}
    .audit-filters{display:flex;gap:10px;align-items:end;flex-wrap:wrap;margin-bottom:18px}
    .audit-table{border:1px solid rgba(89,170,255,.14);border-radius:20px;overflow:hidden;background:rgba(8,14,27,.72);box-shadow:0 14px 32px rgba(0,0,0,.18)}
    .audit-head,.audit-row{display:grid;grid-template-columns:minmax(170px,1.2fr) minmax(130px,.9fr) minmax(90px,.55fr) minmax(130px,.8fr) minmax(260px,1.7fr);column-gap:18px;align-items:start}
    .audit-head{padding:14px 18px;background:linear-gradient(180deg,rgba(5,7,13,.998) 0%,rgba(10,14,22,.994) 34%,rgba(20,28,41,.96) 100%);border-bottom:1px solid rgba(89,170,255,.16);color:#eef4ff;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
    .audit-list{display:grid}
    .audit-item{padding:16px 18px;border-bottom:1px solid rgba(89,170,255,.1);background:rgba(8,14,27,.72)}
    .audit-item:last-child{border-bottom:none}
    .audit-row{font-size:13px;color:#c5d8f4}
    .audit-cell{min-width:0}
    .audit-cell strong{display:block;color:#eef4ff;font-size:15px;line-height:1.45;font-weight:700}
    .audit-cell--description{grid-column:1 / -1;margin-top:10px;color:#e5eefc;font-size:14px;line-height:1.55}
    .audit-empty{padding:18px}
    code{background:rgba(255,255,255,.06);padding:2px 6px;border-radius:8px}
    @media (max-width:1180px){.actions,.action-form,.row{flex-wrap:wrap}}
    @media (max-width:900px){.top{flex-direction:column}.toolbar form,.admin-panel form,.audit-filters{display:grid}.toolbar .search,input,select{min-width:100%}.wrap{padding:20px 14px 40px}.panel-body{padding:18px}table,thead,tbody,tr,td,th{display:block}thead{display:none}tr{border-bottom:1px solid rgba(89,170,255,.12)}td{padding:10px 14px}.table-panel{display:grid}.actions,.action-form,.row{flex-wrap:wrap}.audit-head{display:none}.audit-row{grid-template-columns:1fr 1fr}.audit-cell strong{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#9eb9df}.audit-cell--description{grid-column:1 / -1}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div>
        <div class="eyebrow">Admin Dashboard</div>
        <div class="title">User Accounts</div>
        <div class="subtitle">Manage verification, lockouts, credits, and account access from one place.</div>
      </div>
      <a href="?logout=1">Sign Out</a>
    </div>

    <?php if ($message !== ''): ?>
      <div class="msg <?php echo htmlspecialchars($messageType, ENT_QUOTES, 'UTF-8'); ?>"><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></div>
    <?php endif; ?>

    <div class="admin-panel panel">
      <div class="panel-head"><span class="eyebrow">Security</span></div>
      <div class="panel-body">
        <div>
          <strong>Admin Password</strong>
          <div class="muted" style="font-size:14px;margin-top:4px;">Update the dashboard sign-in password. The new password is saved as a bcrypt hash in <code>api/config.php</code>.</div>
        </div>
        <form method="post">
          <input type="hidden" name="action" value="change-admin-password" />
          <label>
            Current password
            <input type="password" name="current_password" required />
          </label>
          <label>
            New password
            <input type="password" name="new_password" required />
          </label>
          <label>
            Confirm new password
            <input type="password" name="confirm_password" required />
          </label>
          <button type="submit" class="unlock">Update Password</button>
        </form>
      </div>
    </div>

    <div class="toolbar panel">
      <div class="panel-head"><span class="eyebrow">Filters</span></div>
      <div class="panel-body">
        <div class="toolbar-top">
          <div class="muted"><?php echo count($users); ?> account<?php echo count($users) === 1 ? '' : 's'; ?> shown</div>
        </div>
        <form method="get">
          <label>
            Search users
            <input class="search" type="text" name="q" value="<?php echo htmlspecialchars($searchQuery, ENT_QUOTES, 'UTF-8'); ?>" placeholder="Search by email or display name" />
          </label>
          <label>
            Filter
            <select name="status">
              <option value="all" <?php echo $statusFilter === 'all' ? 'selected' : ''; ?>>All users</option>
              <option value="active" <?php echo $statusFilter === 'active' ? 'selected' : ''; ?>>Active only</option>
              <option value="locked" <?php echo $statusFilter === 'locked' ? 'selected' : ''; ?>>Locked only</option>
              <option value="verified" <?php echo $statusFilter === 'verified' ? 'selected' : ''; ?>>Verified only</option>
              <option value="pending" <?php echo $statusFilter === 'pending' ? 'selected' : ''; ?>>Pending verification</option>
            </select>
          </label>
          <button type="submit" class="unlock">Apply</button>
        </form>
      </div>
    </div>

    <div class="table-panel panel">
      <div class="panel-head"><span class="eyebrow">Accounts</span></div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Locked</th>
            <th>Credits</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($users as $user): ?>
            <tr>
              <td>
                <strong><?php echo htmlspecialchars((string) $user['display_name'], ENT_QUOTES, 'UTF-8'); ?></strong><br />
                <span class="muted" style="font-size:13px;">ID <?php echo (int) $user['id']; ?></span>
              </td>
              <td><?php echo htmlspecialchars((string) $user['email'], ENT_QUOTES, 'UTF-8'); ?></td>
              <td><span class="pill <?php echo (int) $user['is_verified'] === 1 ? 'ok' : 'off'; ?>"><?php echo (int) $user['is_verified'] === 1 ? 'Verified' : 'Pending'; ?></span></td>
              <td>
                <span class="pill <?php echo (int) $user['is_locked'] === 1 ? 'locked' : 'ok'; ?>">
                  <?php echo (int) $user['is_locked'] === 1 ? 'Locked' : 'Active'; ?>
                </span>
                <?php if (!empty($user['locked_reason'])): ?>
                  <div style="margin-top:8px;color:#ffcfda;font-size:13px;"><?php echo htmlspecialchars((string) $user['locked_reason'], ENT_QUOTES, 'UTF-8'); ?></div>
                <?php endif; ?>
              </td>
              <td><strong><?php echo (int) ($user['credits'] ?? 0); ?></strong></td>
              <td><?php echo htmlspecialchars((string) $user['created_at'], ENT_QUOTES, 'UTF-8'); ?></td>
              <td>
                <div class="actions">
                  <form class="action-form" method="post">
                    <input type="hidden" name="action" value="update-user-credits" />
                    <input type="hidden" name="user_id" value="<?php echo (int) $user['id']; ?>" />
                    <input class="credits-input" type="text" name="credits" value="<?php echo (int) ($user['credits'] ?? 0); ?>" />
                    <div class="row"><button class="unlock icon-btn" type="submit" title="Update credits" aria-label="Update credits">&#9998;</button></div>
                  </form>
                  <a
                    class="unlock icon-btn"
                    href="?q=<?php echo urlencode($searchQuery); ?>&status=<?php echo urlencode($statusFilter); ?>&audit_user_id=<?php echo (int) $user['id']; ?>"
                    title="View audit log"
                    aria-label="View audit log"
                    style="text-decoration:none;"
                  >&#128196;</a>
                  <?php if ((int) $user['is_locked'] === 1): ?>
                    <form class="action-form" method="post">
                      <input type="hidden" name="action" value="unlock-user" />
                      <input type="hidden" name="user_id" value="<?php echo (int) $user['id']; ?>" />
                      <div class="row"><button class="unlock icon-btn" type="submit" title="Unlock account" aria-label="Unlock account">&#128275;</button></div>
                    </form>
                  <?php else: ?>
                    <form class="action-form" method="post">
                      <input type="hidden" name="action" value="lock-user" />
                      <input type="hidden" name="user_id" value="<?php echo (int) $user['id']; ?>" />
                      <input class="reason-input" type="text" name="locked_reason" placeholder="Lock reason" />
                      <div class="row"><button class="lock icon-btn" type="submit" title="Lock account" aria-label="Lock account">&#128274;</button></div>
                    </form>
                  <?php endif; ?>
                  <form class="action-form" method="post" onsubmit="return confirm('Delete this account permanently?');">
                    <input type="hidden" name="action" value="delete-user" />
                    <input type="hidden" name="user_id" value="<?php echo (int) $user['id']; ?>" />
                    <div class="row"><button class="delete icon-btn" type="submit" title="Delete account" aria-label="Delete account">&#128465;</button></div>
                  </form>
                </div>
              </td>
            </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    </div>

    <?php if ($auditedUser): ?>
      <div class="audit-panel panel">
        <div class="panel-head"><span class="eyebrow">Audit Trail</span></div>
        <div class="panel-body">
          <div>
            <strong><?php echo htmlspecialchars((string) $auditedUser['display_name'], ENT_QUOTES, 'UTF-8'); ?></strong>
            <div class="muted" style="margin-top:4px;"><?php echo htmlspecialchars((string) $auditedUser['email'], ENT_QUOTES, 'UTF-8'); ?></div>
          </div>
          <form class="audit-filters" method="get">
            <input type="hidden" name="q" value="<?php echo htmlspecialchars($searchQuery, ENT_QUOTES, 'UTF-8'); ?>" />
            <input type="hidden" name="status" value="<?php echo htmlspecialchars($statusFilter, ENT_QUOTES, 'UTF-8'); ?>" />
            <input type="hidden" name="audit_user_id" value="<?php echo (int) $auditUserId; ?>" />
            <label>
              From date
              <input type="date" name="audit_from" value="<?php echo htmlspecialchars($auditFrom, ENT_QUOTES, 'UTF-8'); ?>" />
            </label>
            <label>
              To date
              <input type="date" name="audit_to" value="<?php echo htmlspecialchars($auditTo, ENT_QUOTES, 'UTF-8'); ?>" />
            </label>
            <label>
              Issue
              <select name="audit_type">
                <option value="all" <?php echo $auditType === 'all' ? 'selected' : ''; ?>>All issues</option>
                <option value="sign_in" <?php echo $auditType === 'sign_in' ? 'selected' : ''; ?>>Sign in</option>
                <option value="sign_in_failed" <?php echo $auditType === 'sign_in_failed' ? 'selected' : ''; ?>>Bad password</option>
                <option value="sign_out" <?php echo $auditType === 'sign_out' ? 'selected' : ''; ?>>Sign out</option>
                <option value="connect" <?php echo $auditType === 'connect' ? 'selected' : ''; ?>>Connect</option>
                <option value="disconnect" <?php echo $auditType === 'disconnect' ? 'selected' : ''; ?>>Disconnect</option>
                <option value="password_reset_requested" <?php echo $auditType === 'password_reset_requested' ? 'selected' : ''; ?>>Password reset requested</option>
                <option value="password_reset_completed" <?php echo $auditType === 'password_reset_completed' ? 'selected' : ''; ?>>Password reset completed</option>
              </select>
            </label>
            <label>
              Sort order
              <select name="audit_sort">
                <option value="desc" <?php echo $auditSort === 'desc' ? 'selected' : ''; ?>>Newest first</option>
                <option value="asc" <?php echo $auditSort === 'asc' ? 'selected' : ''; ?>>Oldest first</option>
              </select>
            </label>
            <button type="submit" class="unlock">Apply</button>
          </form>
          <?php if (!$auditLogs): ?>
            <div class="muted audit-empty">No audit events recorded for this user yet.</div>
          <?php else: ?>
            <div class="audit-table">
              <div class="audit-head">
                <span>Date / Time</span>
                <span>Audit Type</span>
                <span>Credits</span>
                <span>IP</span>
                <span>Action Details</span>
              </div>
              <div class="audit-list">
                <?php foreach ($auditLogs as $log): ?>
                  <article class="audit-item">
                    <div class="audit-row">
                      <div class="audit-cell">
                        <strong>Date / Time</strong>
                        <?php echo htmlspecialchars((string) $log['created_at'], ENT_QUOTES, 'UTF-8'); ?>
                      </div>
                      <div class="audit-cell">
                        <strong>Audit Type</strong>
                        <?php echo htmlspecialchars((string) $log['event_type'], ENT_QUOTES, 'UTF-8'); ?>
                      </div>
                      <div class="audit-cell">
                        <strong>Credits</strong>
                        <?php echo $log['remaining_credits'] === null ? '--' : (int) $log['remaining_credits']; ?>
                      </div>
                      <div class="audit-cell">
                        <strong>IP</strong>
                        <?php echo htmlspecialchars((string) ($log['ip_address'] ?? '--'), ENT_QUOTES, 'UTF-8'); ?>
                      </div>
                      <div class="audit-cell">
                        <strong>Action Details</strong>
                        <?php echo htmlspecialchars((string) $log['event_description'], ENT_QUOTES, 'UTF-8'); ?>
                      </div>
                    </div>
                  </article>
                <?php endforeach; ?>
              </div>
            </div>
          <?php endif; ?>
        </div>
      </div>
    <?php endif; ?>
  </div>
</body>
</html>
<?php
}
