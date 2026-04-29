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
$users = fetchUsers($pdo, $searchQuery, $statusFilter);
renderDashboard($users, $message, $messageType, $searchQuery, $statusFilter);

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
    body{margin:0;font-family:Segoe UI,Arial,sans-serif;background:#071124;color:#e9f4ff;display:grid;place-items:center;min-height:100vh}
    .card{width:min(420px,92vw);background:#0d1730;border:1px solid rgba(89,170,255,.22);border-radius:22px;box-shadow:0 18px 45px rgba(0,0,0,.35);overflow:hidden}
    .head{padding:18px 22px;background:#0a1020;border-bottom:1px solid rgba(89,170,255,.18)}
    .body{padding:22px;display:grid;gap:14px}
    label{display:grid;gap:8px;font-size:14px;color:#b8cbef}
    input{height:44px;border-radius:12px;border:1px solid rgba(89,170,255,.22);background:#081224;color:#fff;padding:0 14px}
    button{height:44px;border:none;border-radius:12px;background:linear-gradient(135deg,#27d9ff,#7367ff);color:#04111f;font-weight:700;cursor:pointer}
    .msg{padding:12px 14px;border-radius:12px;font-size:14px}
    .msg.error{background:rgba(255,88,125,.12);color:#ffb7c7}
  </style>
</head>
<body>
  <form class="card" method="post">
    <div class="head"><strong>Stream Sync Pro Admin</strong></div>
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

function renderDashboard(array $users, string $message, string $messageType, string $searchQuery, string $statusFilter): void
{
    ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Stream Sync Pro User Dashboard</title>
  <style>
    body{margin:0;font-family:Segoe UI,Arial,sans-serif;background:#071124;color:#e9f4ff}
    .wrap{max-width:1200px;margin:0 auto;padding:24px}
    .top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:20px}
    .top a{color:#9ad9ff;text-decoration:none}
    .msg{padding:12px 14px;border-radius:12px;font-size:14px;margin-bottom:16px}
    .msg.success{background:rgba(97,243,164,.12);color:#bff7d4}
    .msg.error{background:rgba(255,88,125,.12);color:#ffb7c7}
    .toolbar{display:flex;justify-content:space-between;align-items:end;gap:16px;flex-wrap:wrap;margin-bottom:16px;background:#0d1730;border:1px solid rgba(89,170,255,.18);border-radius:18px;padding:16px}
    .toolbar form{display:flex;gap:10px;align-items:end;flex-wrap:wrap}
    .toolbar label{display:grid;gap:6px;color:#b8cbef;font-size:13px}
    .toolbar input,.toolbar select{height:40px;border-radius:10px;border:1px solid rgba(89,170,255,.18);background:#081224;color:#fff;padding:0 10px;min-width:180px}
    .toolbar .search{min-width:260px}
    .toolbar button{height:40px}
    .admin-panel{display:grid;gap:16px;margin-bottom:16px;background:#0d1730;border:1px solid rgba(89,170,255,.18);border-radius:18px;padding:16px}
    .admin-panel form{display:flex;gap:10px;align-items:end;flex-wrap:wrap}
    .admin-panel label{display:grid;gap:6px;color:#b8cbef;font-size:13px}
    .admin-panel input{height:40px;border-radius:10px;border:1px solid rgba(89,170,255,.18);background:#081224;color:#fff;padding:0 10px;min-width:220px}
    table{width:100%;border-collapse:collapse;background:#0d1730;border:1px solid rgba(89,170,255,.18);border-radius:18px;overflow:hidden}
    th,td{padding:14px 12px;border-bottom:1px solid rgba(89,170,255,.1);text-align:left;vertical-align:top}
    th{background:#0a1020;color:#b9d7ff;font-size:13px;text-transform:uppercase;letter-spacing:.08em}
    .pill{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;font-size:12px;font-weight:700}
    .pill.ok{background:rgba(97,243,164,.12);color:#9cf0b7}
    .pill.off{background:rgba(255,255,255,.08);color:#c4d4ea}
    .pill.locked{background:rgba(255,88,125,.14);color:#ffb7c7}
    .actions{display:grid;gap:10px}
    .action-form{display:grid;gap:8px}
    .action-form input{height:38px;border-radius:10px;border:1px solid rgba(89,170,255,.18);background:#081224;color:#fff;padding:0 10px}
    .row{display:flex;gap:8px;flex-wrap:wrap}
    button{height:38px;border:none;border-radius:10px;padding:0 12px;cursor:pointer;font-weight:700}
    .lock{background:#ff9f43;color:#1b1200}
    .unlock{background:#5edb9d;color:#04160d}
    .delete{background:#ff5a7a;color:#fff}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div>
        <h1 style="margin:0 0 6px;">User Accounts</h1>
        <div style="color:#a8bfdc;">Manage verification, lockouts, and account removal.</div>
      </div>
      <a href="?logout=1">Sign Out</a>
    </div>

    <?php if ($message !== ''): ?>
      <div class="msg <?php echo htmlspecialchars($messageType, ENT_QUOTES, 'UTF-8'); ?>"><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></div>
    <?php endif; ?>

    <div class="toolbar">
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
      <div style="color:#a8bfdc;font-size:14px;"><?php echo count($users); ?> account<?php echo count($users) === 1 ? '' : 's'; ?> shown</div>
    </div>

    <div class="admin-panel">
      <div>
        <strong>Admin Password</strong>
        <div style="color:#a8bfdc;font-size:14px;margin-top:4px;">Update the dashboard sign-in password. The new password is saved as a bcrypt hash in <code>api/config.php</code>.</div>
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
              <span style="color:#98afcc;font-size:13px;">ID <?php echo (int) $user['id']; ?></span>
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
            <td>
              <strong><?php echo (int) ($user['credits'] ?? 0); ?></strong>
            </td>
            <td><?php echo htmlspecialchars((string) $user['created_at'], ENT_QUOTES, 'UTF-8'); ?></td>
            <td>
              <div class="actions">
                <form class="action-form" method="post">
                  <input type="hidden" name="action" value="update-user-credits" />
                  <input type="hidden" name="user_id" value="<?php echo (int) $user['id']; ?>" />
                  <input type="text" name="credits" value="<?php echo (int) ($user['credits'] ?? 0); ?>" />
                  <div class="row"><button class="unlock" type="submit">Update Credits</button></div>
                </form>
                <?php if ((int) $user['is_locked'] === 1): ?>
                  <form class="action-form" method="post">
                    <input type="hidden" name="action" value="unlock-user" />
                    <input type="hidden" name="user_id" value="<?php echo (int) $user['id']; ?>" />
                    <div class="row"><button class="unlock" type="submit">Unlock</button></div>
                  </form>
                <?php else: ?>
                  <form class="action-form" method="post">
                    <input type="hidden" name="action" value="lock-user" />
                    <input type="hidden" name="user_id" value="<?php echo (int) $user['id']; ?>" />
                    <input type="text" name="locked_reason" placeholder="Optional lock reason" />
                    <div class="row"><button class="lock" type="submit">Lock</button></div>
                  </form>
                <?php endif; ?>
                <form class="action-form" method="post" onsubmit="return confirm('Delete this account permanently?');">
                  <input type="hidden" name="action" value="delete-user" />
                  <input type="hidden" name="user_id" value="<?php echo (int) $user['id']; ?>" />
                  <div class="row"><button class="delete" type="submit">Delete</button></div>
                </form>
              </div>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</body>
</html>
<?php
}
