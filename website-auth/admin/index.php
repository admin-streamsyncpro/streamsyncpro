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
    ensureSchema($pdo, $config);
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
            $user = findUserById($pdo, $id);

            if (!$user) {
                $message = 'User account could not be found.';
                $messageType = 'error';
            } else {
                $currentSessionTokenHash = trim((string) ($user['session_token_hash'] ?? ''));
                $statement = $pdo->prepare(
                    'UPDATE auth_users
                     SET is_locked = 1,
                         locked_reason = :locked_reason,
                         forced_logout_token_hash = :forced_logout_token_hash,
                         forced_logout_reason = :forced_logout_reason,
                         forced_logout_at = :forced_logout_at,
                         session_token_hash = NULL,
                         session_token_expires_at = NULL,
                         active_connection_token_hash = NULL,
                         active_connection_started_at = NULL
                     WHERE id = :id'
                );
                $statement->execute([
                    ':locked_reason' => $reason !== '' ? $reason : null,
                    ':forced_logout_token_hash' => $currentSessionTokenHash !== '' ? $currentSessionTokenHash : null,
                    ':forced_logout_reason' => $currentSessionTokenHash !== '' ? 'account_locked' : null,
                    ':forced_logout_at' => gmdate('Y-m-d H:i:s'),
                    ':id' => $id,
                ]);

                logAuditEvent(
                    $pdo,
                    $id,
                    'account_locked',
                    $reason !== ''
                        ? 'Administrator locked this account and ended the active session. Reason: ' . $reason
                        : 'Administrator locked this account and ended the active session.',
                    (int) ($user['credits'] ?? 0)
                );

                $message = 'Account locked successfully. If the user was signed in, their app will be signed out and shown a lock message.';
                $messageType = 'success';
            }
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
        } elseif ($action === 'toggle-user-debug') {
            $id = (int) ($_POST['user_id'] ?? 0);
            $debugEnabled = (int) ($_POST['debug_enabled'] ?? 0) === 1 ? 1 : 0;
            $statement = $pdo->prepare('UPDATE auth_users SET debug_enabled = :debug_enabled WHERE id = :id');
            $statement->execute([
                ':debug_enabled' => $debugEnabled,
                ':id' => $id,
            ]);
            $message = $debugEnabled === 1
                ? 'Per-user debug logging enabled successfully.'
                : 'Per-user debug logging disabled successfully.';
            $messageType = 'success';
        } elseif ($action === 'force-signout-user') {
            $id = (int) ($_POST['user_id'] ?? 0);
            $user = findUserById($pdo, $id);

            if (!$user) {
                $message = 'User account could not be found.';
                $messageType = 'error';
            } else {
                $currentSessionTokenHash = trim((string) ($user['session_token_hash'] ?? ''));
                $statement = $pdo->prepare(
                    'UPDATE auth_users
                     SET forced_logout_token_hash = :forced_logout_token_hash,
                         forced_logout_reason = :forced_logout_reason,
                         forced_logout_at = :forced_logout_at,
                         session_token_hash = NULL,
                         session_token_expires_at = NULL,
                         active_connection_token_hash = NULL,
                         active_connection_started_at = NULL
                     WHERE id = :id'
                );
                $statement->execute([
                    ':forced_logout_token_hash' => $currentSessionTokenHash !== '' ? $currentSessionTokenHash : null,
                    ':forced_logout_reason' => $currentSessionTokenHash !== '' ? 'admin_forced_sign_out' : null,
                    ':forced_logout_at' => gmdate('Y-m-d H:i:s'),
                    ':id' => $id,
                ]);

                if ($currentSessionTokenHash !== '') {
                    logAuditEvent(
                        $pdo,
                        $id,
                        'forced_sign_out',
                        'Administrator forcibly signed out this account and closed the active app session.',
                        (int) ($user['credits'] ?? 0)
                    );
                    $message = 'User was forcibly signed out. The app will close on its next session check.';
                } else {
                    $message = 'User had no active signed-in session to terminate.';
                }
                $messageType = 'success';
            }
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
        } elseif ($action === 'update-billing-settings') {
            $creditsPerGbp = max(1, (int) ($_POST['credits_per_gbp'] ?? 10));
            $minimumCredits = max(1, (int) ($_POST['minimum_credits'] ?? 1));
            $maximumCredits = max($minimumCredits, (int) ($_POST['maximum_credits'] ?? 5000));
            $signupCredits = max(0, (int) ($_POST['signup_credits'] ?? 5));
            upsertBillingSetting($pdo, 'credits_per_gbp', (string) $creditsPerGbp);
            upsertBillingSetting($pdo, 'minimum_credits', (string) $minimumCredits);
            upsertBillingSetting($pdo, 'maximum_credits', (string) $maximumCredits);
            upsertBillingSetting($pdo, 'signup_credits', (string) $signupCredits);
            $message = 'Billing settings updated successfully.';
            $messageType = 'success';
        } elseif ($action === 'create-promo-code') {
            $code = strtoupper(trim((string) ($_POST['promo_code'] ?? '')));
            $discountType = (string) ($_POST['discount_type'] ?? 'percent');
            $discountValue = max(0, (float) ($_POST['discount_value'] ?? 0));
            $minimumCredits = max(1, (int) ($_POST['promo_minimum_credits'] ?? 1));
            $maximumRedemptionsRaw = trim((string) ($_POST['maximum_redemptions'] ?? ''));
            $maximumRedemptions = $maximumRedemptionsRaw === '' ? null : max(1, (int) $maximumRedemptionsRaw);
            $expiresAt = trim((string) ($_POST['expires_at'] ?? ''));

            if ($code === '') {
                $message = 'Promo code is required.';
                $messageType = 'error';
            } elseif (!in_array($discountType, ['percent', 'fixed_gbp'], true)) {
                $message = 'Promo discount type is invalid.';
                $messageType = 'error';
            } elseif ($discountValue <= 0) {
                $message = 'Promo discount value must be greater than zero.';
                $messageType = 'error';
            } else {
                $statement = $pdo->prepare(
                    'INSERT INTO auth_promo_codes (
                        code, discount_type, discount_value, minimum_credits, maximum_redemptions, expires_at, is_active
                     ) VALUES (
                        :code, :discount_type, :discount_value, :minimum_credits, :maximum_redemptions, :expires_at, 1
                     )
                     ON DUPLICATE KEY UPDATE
                        discount_type = VALUES(discount_type),
                        discount_value = VALUES(discount_value),
                        minimum_credits = VALUES(minimum_credits),
                        maximum_redemptions = VALUES(maximum_redemptions),
                        expires_at = VALUES(expires_at),
                        is_active = 1'
                );
                $statement->execute([
                    ':code' => $code,
                    ':discount_type' => $discountType,
                    ':discount_value' => $discountValue,
                    ':minimum_credits' => $minimumCredits,
                    ':maximum_redemptions' => $maximumRedemptions,
                    ':expires_at' => $expiresAt !== '' ? $expiresAt . ' 23:59:59' : null,
                ]);
                $message = 'Promo code saved successfully.';
                $messageType = 'success';
            }
        } elseif ($action === 'toggle-promo-code') {
            $promoId = (int) ($_POST['promo_id'] ?? 0);
            $nextState = (int) ($_POST['is_active'] ?? 0) === 1 ? 1 : 0;
            $statement = $pdo->prepare('UPDATE auth_promo_codes SET is_active = :is_active WHERE id = :id');
            $statement->execute([
                ':is_active' => $nextState,
                ':id' => $promoId,
            ]);
            $message = $nextState === 1 ? 'Promo code activated.' : 'Promo code deactivated.';
            $messageType = 'success';
        } elseif ($action === 'delete-promo-code') {
            $promoId = (int) ($_POST['promo_id'] ?? 0);
            $statement = $pdo->prepare('DELETE FROM auth_promo_codes WHERE id = :id');
            $statement->execute([':id' => $promoId]);
            $message = 'Promo code deleted successfully.';
            $messageType = 'success';
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
$auditGroup = trim((string) ($_GET['audit_group'] ?? 'day'));
$billingSettings = fetchBillingSettings($pdo, $config);
$promoCodes = fetchPromoCodes($pdo);
$users = fetchUsers($pdo, $searchQuery, $statusFilter);
$auditedUser = $auditUserId > 0 ? findUserById($pdo, $auditUserId) : null;
$auditLogs = $auditUserId > 0 ? fetchAuditLogs($pdo, $auditUserId, $auditFrom, $auditTo, $auditType, $auditSort) : [];
$auditChart = $auditUserId > 0 ? fetchAuditChartData($pdo, $auditUserId, $auditFrom, $auditTo, $auditType, $auditGroup) : ['periods' => [], 'legend' => []];
renderDashboard($users, $message, $messageType, $searchQuery, $statusFilter, $auditUserId, $auditedUser, $auditLogs, $auditFrom, $auditTo, $auditType, $auditSort, $auditGroup, $auditChart, $billingSettings, $promoCodes);

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

function ensureSchema(PDO $pdo, array $config = []): void
{
    $pdo->exec(
          'CREATE TABLE IF NOT EXISTS auth_users (
              id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
              email VARCHAR(255) NOT NULL UNIQUE,
              display_name VARCHAR(120) NOT NULL,
              password_hash VARCHAR(255) NOT NULL,
              is_verified TINYINT(1) NOT NULL DEFAULT 0,
              is_locked TINYINT(1) NOT NULL DEFAULT 0,
              debug_enabled TINYINT(1) NOT NULL DEFAULT 0,
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

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS auth_billing_settings (
            setting_key VARCHAR(80) NOT NULL PRIMARY KEY,
            setting_value VARCHAR(255) NOT NULL,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS auth_promo_codes (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            code VARCHAR(80) NOT NULL UNIQUE,
            discount_type VARCHAR(20) NOT NULL DEFAULT "percent",
            discount_value DECIMAL(10,2) NOT NULL DEFAULT 0,
            minimum_credits INT NOT NULL DEFAULT 1,
            maximum_redemptions INT NULL,
            redeemed_count INT NOT NULL DEFAULT 0,
            is_active TINYINT(1) NOT NULL DEFAULT 1,
            expires_at DATETIME NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    ensureColumn($pdo, 'auth_users', 'is_locked', 'ALTER TABLE auth_users ADD COLUMN is_locked TINYINT(1) NOT NULL DEFAULT 0 AFTER is_verified');
    ensureColumn($pdo, 'auth_users', 'debug_enabled', 'ALTER TABLE auth_users ADD COLUMN debug_enabled TINYINT(1) NOT NULL DEFAULT 0 AFTER is_locked');
    ensureColumn($pdo, 'auth_users', 'credits', 'ALTER TABLE auth_users ADD COLUMN credits INT NOT NULL DEFAULT 0 AFTER debug_enabled');
    ensureColumn($pdo, 'auth_users', 'locked_reason', 'ALTER TABLE auth_users ADD COLUMN locked_reason VARCHAR(255) NULL AFTER is_locked');
    ensureColumn($pdo, 'auth_users', 'session_token_hash', 'ALTER TABLE auth_users ADD COLUMN session_token_hash VARCHAR(255) NULL AFTER locked_reason');
    ensureColumn($pdo, 'auth_users', 'session_token_expires_at', 'ALTER TABLE auth_users ADD COLUMN session_token_expires_at DATETIME NULL AFTER session_token_hash');
    ensureColumn($pdo, 'auth_users', 'active_connection_token_hash', 'ALTER TABLE auth_users ADD COLUMN active_connection_token_hash VARCHAR(255) NULL AFTER session_token_expires_at');
    ensureColumn($pdo, 'auth_users', 'active_connection_started_at', 'ALTER TABLE auth_users ADD COLUMN active_connection_started_at DATETIME NULL AFTER active_connection_token_hash');
    ensureColumn($pdo, 'auth_users', 'forced_logout_token_hash', 'ALTER TABLE auth_users ADD COLUMN forced_logout_token_hash VARCHAR(255) NULL AFTER active_connection_started_at');
    ensureColumn($pdo, 'auth_users', 'forced_logout_reason', 'ALTER TABLE auth_users ADD COLUMN forced_logout_reason VARCHAR(64) NULL AFTER forced_logout_token_hash');
    ensureColumn($pdo, 'auth_users', 'forced_logout_at', 'ALTER TABLE auth_users ADD COLUMN forced_logout_at DATETIME NULL AFTER forced_logout_reason');
    seedDefaultBillingSettings($pdo, $config ?? []);
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

function resolveBillingDefaults(array $config): array
{
    return [
        'credits_per_gbp' => max(1, (int) (($config['billing']['credits_per_gbp'] ?? 10))),
        'minimum_credits' => max(1, (int) (($config['billing']['minimum_credits'] ?? 1))),
        'maximum_credits' => max(1, (int) (($config['billing']['maximum_credits'] ?? 5000))),
        'signup_credits' => max(0, (int) (($config['billing']['signup_credits'] ?? 5))),
    ];
}

function seedDefaultBillingSettings(PDO $pdo, array $config): void
{
    foreach (resolveBillingDefaults($config) as $key => $value) {
        $statement = $pdo->prepare(
            'INSERT INTO auth_billing_settings (setting_key, setting_value)
             VALUES (:setting_key, :setting_value)
             ON DUPLICATE KEY UPDATE setting_value = setting_value'
        );
        $statement->execute([
            ':setting_key' => $key,
            ':setting_value' => (string) $value,
        ]);
    }
}

function upsertBillingSetting(PDO $pdo, string $key, string $value): void
{
    $statement = $pdo->prepare(
        'INSERT INTO auth_billing_settings (setting_key, setting_value)
         VALUES (:setting_key, :setting_value)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)'
    );
    $statement->execute([
        ':setting_key' => $key,
        ':setting_value' => $value,
    ]);
}

function fetchBillingSettings(PDO $pdo, array $config): array
{
    $settings = resolveBillingDefaults($config);
    $statement = $pdo->query('SELECT setting_key, setting_value FROM auth_billing_settings');
    foreach ($statement->fetchAll() as $row) {
        $settings[(string) $row['setting_key']] = (string) $row['setting_value'];
    }

    $settings['credits_per_gbp'] = max(1, (int) ($settings['credits_per_gbp'] ?? 10));
    $settings['minimum_credits'] = max(1, (int) ($settings['minimum_credits'] ?? 1));
    $settings['maximum_credits'] = max((int) $settings['minimum_credits'], (int) ($settings['maximum_credits'] ?? 5000));
    $settings['signup_credits'] = max(0, (int) ($settings['signup_credits'] ?? 5));
    $settings['gbp_per_credit'] = number_format(1 / (int) $settings['credits_per_gbp'], 2, '.', '');

    return $settings;
}

function fetchPromoCodes(PDO $pdo): array
{
    $statement = $pdo->query(
        'SELECT id, code, discount_type, discount_value, minimum_credits, maximum_redemptions, redeemed_count, is_active, expires_at, created_at
         FROM auth_promo_codes
         ORDER BY created_at DESC, id DESC'
    );
    return $statement->fetchAll();
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
        'SELECT id, email, display_name, is_verified, is_locked, debug_enabled, credits, locked_reason,
                session_token_hash, session_token_expires_at,
                active_connection_token_hash, active_connection_started_at,
                created_at, updated_at
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
        'SELECT id, email, display_name, is_verified, is_locked, debug_enabled, credits, locked_reason,
                session_token_hash, session_token_expires_at,
                active_connection_token_hash, active_connection_started_at,
                forced_logout_token_hash, forced_logout_at,
                created_at, updated_at
         FROM auth_users
         WHERE id = :id
         LIMIT 1'
    );
    $statement->execute([':id' => $userId]);
    $user = $statement->fetch();

    return $user ?: null;
}

function hasActiveSignedInSession(array $user): bool
{
    $tokenHash = trim((string) ($user['session_token_hash'] ?? ''));
    $expiresAt = trim((string) ($user['session_token_expires_at'] ?? ''));

    if ($tokenHash === '' || $expiresAt === '') {
        return false;
    }

    $expiryTime = strtotime($expiresAt);
    if ($expiryTime === false) {
        return false;
    }

    return $expiryTime >= time();
}

function hasActiveLiveConnection(array $user): bool
{
    return trim((string) ($user['active_connection_token_hash'] ?? '')) !== '';
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
        'SELECT event_type, event_description, remaining_credits, ip_address, created_at, metadata_json
         FROM auth_user_audit_logs
         WHERE ' . implode(' AND ', $conditions) . '
         ORDER BY created_at ' . $sortDirection . ', id ' . $sortDirection . '
         LIMIT 100'
    );
    $statement->execute($params);

    return $statement->fetchAll();
}

function getAuditChartGroupConfig(string $auditGroup): array
{
    return match ($auditGroup) {
        'week' => [
            'group' => 'YEARWEEK(created_at, 3)',
            'label' => 'CONCAT("Week ", LPAD(WEEK(created_at, 3), 2, "0"), " ", YEAR(created_at))',
        ],
        'month' => [
            'group' => 'DATE_FORMAT(created_at, "%Y-%m")',
            'label' => 'DATE_FORMAT(created_at, "%b %Y")',
        ],
        'year' => [
            'group' => 'DATE_FORMAT(created_at, "%Y")',
            'label' => 'DATE_FORMAT(created_at, "%Y")',
        ],
        default => [
            'group' => 'DATE_FORMAT(created_at, "%Y-%m-%d")',
            'label' => 'DATE_FORMAT(created_at, "%d %b %Y")',
        ],
    };
}

function getAuditTypeColor(string $eventType): string
{
    return match ($eventType) {
        'sign_in' => '#4de7ff',
        'sign_in_failed' => '#ff9f59',
        'sign_out' => '#8db6ff',
        'forced_sign_out' => '#ff5a7a',
        'signed_in_elsewhere' => '#ffd166',
        'account_locked' => '#ffb04f',
        'app_error' => '#ff667d',
        'debug_trace' => '#4de7ff',
        'connect' => '#61f3a4',
        'disconnect' => '#9068ff',
        'password_reset_requested' => '#ffd166',
        'password_reset_completed' => '#ff4db8',
        default => '#c5d8f4',
    };
}

function getAuditTypeLabel(string $eventType): string
{
    return match ($eventType) {
        'sign_in' => 'Sign in',
        'sign_in_failed' => 'Bad password',
        'sign_out' => 'Sign out',
        'forced_sign_out' => 'Forced sign out',
        'signed_in_elsewhere' => 'Signed in elsewhere',
        'account_locked' => 'Account locked',
        'app_error' => 'App error',
        'debug_trace' => 'Debug trace',
        'connect' => 'Connect',
        'disconnect' => 'Disconnect',
        'password_reset_requested' => 'Password reset requested',
        'password_reset_completed' => 'Password reset completed',
        default => ucwords(str_replace('_', ' ', $eventType)),
    };
}

function formatAuditMetadataSummary(?string $metadataJson): string
{
    if ($metadataJson === null || trim($metadataJson) === '') {
        return '';
    }

    $metadata = json_decode($metadataJson, true);
    if (!is_array($metadata) || $metadata === []) {
        return '';
    }

    $summaryParts = [];

    if (!empty($metadata['source'])) {
        $summaryParts[] = 'Source: ' . (string) $metadata['source'];
    }

      if (!empty($metadata['errorCode'])) {
          $summaryParts[] = 'Code: ' . (string) $metadata['errorCode'];
      }

      if (!empty($metadata['debugContext'])) {
          $summaryParts[] = 'Context: ' . (string) $metadata['debugContext'];
      }

    if (!empty($metadata['details']) && is_array($metadata['details'])) {
        foreach ($metadata['details'] as $key => $value) {
            if ($value === null || $value === '') {
                continue;
            }

            $summaryParts[] = is_array($value)
                ? sprintf('%s: %s', (string) $key, (string) json_encode($value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE))
                : sprintf('%s: %s', (string) $key, (string) $value);
        }
    }

    return implode(' | ', $summaryParts);
}

function fetchAuditChartData(PDO $pdo, int $userId, string $auditFrom, string $auditTo, string $auditType, string $auditGroup): array
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

    $groupConfig = getAuditChartGroupConfig($auditGroup);
    $statement = $pdo->prepare(
        'SELECT ' . $groupConfig['group'] . ' AS period_key,
                ' . $groupConfig['label'] . ' AS period_label,
                event_type,
                COUNT(*) AS event_count
         FROM auth_user_audit_logs
         WHERE ' . implode(' AND ', $conditions) . '
         GROUP BY period_key, period_label, event_type
         ORDER BY period_key ASC, event_type ASC'
    );
    $statement->execute($params);
    $rows = $statement->fetchAll();

    $periods = [];
    $legend = [];

    foreach ($rows as $row) {
        $periodKey = (string) ($row['period_key'] ?? '');
        $periodLabel = (string) ($row['period_label'] ?? $periodKey);
        $eventType = (string) ($row['event_type'] ?? 'unknown');
        $eventCount = max(0, (int) ($row['event_count'] ?? 0));

        if ($periodKey === '' || $eventCount === 0) {
            continue;
        }

        if (!isset($periods[$periodKey])) {
            $periods[$periodKey] = [
                'key' => $periodKey,
                'label' => $periodLabel,
                'total' => 0,
                'segments' => [],
            ];
        }

        $periods[$periodKey]['segments'][] = [
            'type' => $eventType,
            'label' => getAuditTypeLabel($eventType),
            'count' => $eventCount,
            'color' => getAuditTypeColor($eventType),
        ];
        $periods[$periodKey]['total'] += $eventCount;

        if (!isset($legend[$eventType])) {
            $legend[$eventType] = [
                'type' => $eventType,
                'label' => getAuditTypeLabel($eventType),
                'color' => getAuditTypeColor($eventType),
            ];
        }
    }

    foreach ($periods as &$period) {
        foreach ($period['segments'] as &$segment) {
            $segment['percent'] = $period['total'] > 0 ? ($segment['count'] / $period['total']) * 100 : 0;
        }
        unset($segment);
    }
    unset($period);

    return [
        'periods' => array_values($periods),
        'legend' => array_values($legend),
    ];
}

function logAuditEvent(
    PDO $pdo,
    int $userId,
    string $eventType,
    string $eventDescription,
    ?int $remainingCredits = null
): void {
    $statement = $pdo->prepare(
        'INSERT INTO auth_user_audit_logs (
            user_id,
            event_type,
            event_description,
            remaining_credits,
            metadata_json,
            ip_address
         ) VALUES (
            :user_id,
            :event_type,
            :event_description,
            :remaining_credits,
            :metadata_json,
            :ip_address
         )'
    );
    $statement->execute([
        ':user_id' => $userId,
        ':event_type' => $eventType,
        ':event_description' => $eventDescription,
        ':remaining_credits' => $remainingCredits,
        ':metadata_json' => null,
        ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);
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

function renderDashboard(array $users, string $message, string $messageType, string $searchQuery, string $statusFilter, int $auditUserId, ?array $auditedUser, array $auditLogs, string $auditFrom, string $auditTo, string $auditType, string $auditSort, string $auditGroup, array $auditChart, array $billingSettings, array $promoCodes): void
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
    .panel-head--toggle{display:flex;align-items:center;justify-content:space-between;gap:12px}
    .panel-toggle{height:32px;min-width:32px;padding:0 12px;border-radius:999px;border:1px solid rgba(89,170,255,.18);background:rgba(8,18,36,.92);color:#dceaff;font-size:12px;font-weight:800;letter-spacing:.04em}
    .panel-toggle:hover{border-color:rgba(77,231,255,.45);box-shadow:0 0 0 3px rgba(77,231,255,.1)}
    .panel-toggle:focus-visible{outline:none;border-color:rgba(77,231,255,.55);box-shadow:0 0 0 3px rgba(77,231,255,.14)}
    .panel-collapsed .panel-body{display:none}
    .toolbar-top{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
    .toolbar form,.admin-panel form{display:flex;gap:10px;align-items:end;flex-wrap:wrap}
    label{display:grid;gap:6px;color:#c5d8f4;font-size:13px}
    input,select{height:42px;border-radius:12px;border:1px solid rgba(89,170,255,.18);background:#081224;color:#fff;padding:0 12px;min-width:180px;outline:none}
    input:focus,select:focus{border-color:rgba(77,231,255,.5);box-shadow:0 0 0 3px rgba(77,231,255,.12)}
    .toolbar .search{min-width:280px}
    table{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed}
    .table-panel{overflow:hidden}
    .table-panel .panel-body{padding:0 18px 18px}
    .accounts-table-wrap{overflow:hidden;padding-right:0;border-radius:18px;border:1px solid rgba(89,170,255,.12);background:rgba(8,14,27,.72)}
    th,td{padding:12px 10px;border-bottom:1px solid rgba(89,170,255,.1);text-align:left;vertical-align:middle}
    th{position:relative;background:linear-gradient(180deg,rgba(5,7,13,.998) 0%,rgba(10,14,22,.994) 34%,rgba(20,28,41,.96) 100%);color:#b9d7ff;font-size:12px;text-transform:uppercase;letter-spacing:.1em}
    tr:last-child td{border-bottom:none}
    .accounts-table-wrap table th:nth-child(1),.accounts-table-wrap table td:nth-child(1){width:12%}
    .accounts-table-wrap table th:nth-child(2),.accounts-table-wrap table td:nth-child(2){width:15%}
    .accounts-table-wrap table th:nth-child(3),.accounts-table-wrap table td:nth-child(3){width:7%}
    .accounts-table-wrap table th:nth-child(4),.accounts-table-wrap table td:nth-child(4){width:9%}
    .accounts-table-wrap table th:nth-child(5),.accounts-table-wrap table td:nth-child(5){width:13%}
    .accounts-table-wrap table th:nth-child(6),.accounts-table-wrap table td:nth-child(6){width:10%}
    .accounts-table-wrap table th:nth-child(7),.accounts-table-wrap table td:nth-child(7){width:6%}
    .accounts-table-wrap table th:nth-child(8),.accounts-table-wrap table td:nth-child(8){width:8%}
    .accounts-table-wrap table th:nth-child(9),.accounts-table-wrap table td:nth-child(9){width:20%}
    .pill{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;font-size:12px;font-weight:800}
    .pill.ok{background:rgba(97,243,164,.12);color:#9cf0b7}
    .pill.off{background:rgba(255,255,255,.08);color:#c4d4ea}
    .pill.locked{background:rgba(255,88,125,.14);color:#ffb7c7}
    .pill.live{background:rgba(77,231,255,.14);color:#9cedff}
    .pill.session{background:rgba(144,104,255,.16);color:#d2c4ff}
    .actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:nowrap;min-width:0}
    .action-form{display:flex;align-items:center;gap:6px;flex-wrap:nowrap;margin:0;min-width:0}
    .action-form input{height:38px;min-width:0}
    .credits-input{width:52px;text-align:center}
    .reason-input{width:84px}
    .row{display:flex;gap:4px;flex-wrap:nowrap}
    .account-actions{display:flex;align-items:center;justify-content:flex-start;gap:6px;padding:6px 8px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(89,170,255,.12);box-shadow:inset 0 1px 0 rgba(255,255,255,.03);overflow:visible}
    .account-actions .action-form,.account-actions > a.icon-btn{flex:0 0 auto}
    .account-actions .action-form{padding:0}
    .account-actions .action-form + .action-form,.account-actions .action-form + a.icon-btn,.account-actions a.icon-btn + .action-form{position:relative}
    .account-actions .action-form + .action-form::before,.account-actions .action-form + a.icon-btn::before,.account-actions a.icon-btn + .action-form::before{content:"";position:absolute;left:-4px;top:6px;bottom:6px;width:1px;background:rgba(89,170,255,.14)}
    td{word-break:normal;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    td .muted{word-break:normal;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .cell-debug,.cell-actions{white-space:normal;overflow:visible;text-overflow:clip}
    .cell-debug .muted,.cell-actions .muted{white-space:normal;overflow:visible;text-overflow:clip}
    button{height:34px;border:none;border-radius:10px;padding:0 10px;cursor:pointer;font-weight:800;font-size:12px}
    .lock{background:#ffb04f;color:#1b1200}
    .unlock{background:linear-gradient(135deg,#27d9ff,#8dfbff);color:#04111f}
    .delete{background:#ff5a7a;color:#fff}
    .icon-btn{width:36px;min-width:36px;height:36px;padding:0;font-size:14px;line-height:1;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto}
    .actions > a.icon-btn,.actions > .action-form > .row > .icon-btn,.actions > .action-form > .icon-btn{box-shadow:inset 0 0 0 1px rgba(255,255,255,.04)}
    .cell-inline-meta{display:inline-block;margin-left:6px;font-size:12px;color:var(--muted);vertical-align:middle}
    .account-id{display:inline-block;margin-left:6px;font-size:12px;color:var(--muted)}
    .muted{color:var(--muted)}
    .audit-panel{margin-top:18px}
    .audit-filters{display:flex;gap:10px;align-items:end;flex-wrap:wrap;margin-bottom:18px}
    .audit-chart{display:grid;gap:16px;margin-bottom:22px;padding:18px;border:1px solid rgba(89,170,255,.14);border-radius:20px;background:rgba(8,14,27,.72);box-shadow:0 14px 32px rgba(0,0,0,.18)}
    .audit-chart-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap}
    .audit-chart-copy{display:grid;gap:6px}
    .audit-chart-copy strong{font-size:16px;color:#eef4ff}
    .audit-chart-copy .muted{font-size:13px;line-height:1.5}
    .audit-chart-legend{display:flex;gap:10px;flex-wrap:wrap}
    .audit-legend-item{display:inline-flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.04);font-size:12px;color:#d9e7fb}
    .audit-legend-swatch{width:10px;height:10px;border-radius:999px;box-shadow:0 0 0 1px rgba(255,255,255,.08)}
    .audit-bars{display:grid;gap:12px}
    .audit-bar-row{display:grid;grid-template-columns:minmax(120px,.9fr) minmax(0,3fr) auto;align-items:center;gap:14px}
    .audit-bar-label{font-size:13px;color:#dce9fb}
    .audit-bar-track{position:relative;display:flex;height:18px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(89,170,255,.12)}
    .audit-bar-segment{height:100%}
    .audit-bar-total{font-size:12px;font-weight:800;color:#eef4ff;letter-spacing:.04em}
    .audit-table{border:1px solid rgba(89,170,255,.14);border-radius:20px;overflow:hidden;background:rgba(8,14,27,.72);box-shadow:0 14px 32px rgba(0,0,0,.18)}
    .audit-head,.audit-row{display:grid;grid-template-columns:minmax(170px,1.2fr) minmax(130px,.9fr) minmax(90px,.55fr) minmax(130px,.8fr) minmax(260px,1.7fr);column-gap:18px;align-items:start}
    .audit-head{padding:14px 18px;background:linear-gradient(180deg,rgba(5,7,13,.998) 0%,rgba(10,14,22,.994) 34%,rgba(20,28,41,.96) 100%);border-bottom:1px solid rgba(89,170,255,.16);color:#eef4ff;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
    .audit-list{display:grid;max-height:540px;overflow-y:auto}
    .audit-item{padding:16px 18px;border-bottom:1px solid rgba(89,170,255,.1);background:rgba(8,14,27,.72)}
    .audit-item:last-child{border-bottom:none}
    .audit-list::-webkit-scrollbar{width:12px}
    .audit-list::-webkit-scrollbar-track{background:rgba(255,255,255,.04)}
    .audit-list::-webkit-scrollbar-thumb{background:linear-gradient(180deg,rgba(77,231,255,.55),rgba(144,104,255,.6));border-radius:999px;border:2px solid rgba(8,14,27,.72)}
    .audit-row{font-size:13px;color:#c5d8f4}
    .audit-cell{min-width:0}
    .audit-cell strong{display:block;color:#eef4ff;font-size:15px;line-height:1.45;font-weight:700}
    .audit-cell--description{grid-column:1 / -1;margin-top:10px;color:#e5eefc;font-size:14px;line-height:1.55}
    .audit-empty{padding:18px}
    code{background:rgba(255,255,255,.06);padding:2px 6px;border-radius:8px}
    @media (max-width:1180px){.actions,.action-form,.row{flex-wrap:wrap}}
    @media (max-width:900px){.top{flex-direction:column}.toolbar form,.admin-panel form,.audit-filters{display:grid}.toolbar .search,input,select{min-width:100%}.wrap{padding:20px 14px 40px}.panel-body{padding:18px}.table-panel .panel-body{padding:0 0 18px}table,thead,tbody,tr,td,th{display:block}thead{display:none}tr{border-bottom:1px solid rgba(89,170,255,.12)}td{padding:10px 14px}.table-panel{display:grid}.accounts-table-wrap{border-radius:0;border-left:none;border-right:none}.actions,.action-form,.row{flex-wrap:wrap}.audit-head{display:none}.audit-row{grid-template-columns:1fr 1fr}.audit-cell strong{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#9eb9df}.audit-cell--description{grid-column:1 / -1}.audit-bar-row{grid-template-columns:1fr}.audit-bar-total{text-align:right}}
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

      <div class="admin-panel panel panel-collapsed" id="security-panel">
        <div class="panel-head panel-head--toggle">
          <span class="eyebrow">Security</span>
          <button type="button" class="panel-toggle" id="security-toggle" aria-expanded="false" aria-controls="security-panel-body">Expand</button>
        </div>
      <div class="panel-body" id="security-panel-body">
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

      <div class="admin-panel panel">
        <div class="panel-head"><span class="eyebrow">Billing</span></div>
        <div class="panel-body">
          <div class="subtitle" style="margin-top:0">Change live credit pricing, control how many credits new users receive on sign-up, and manage promo codes for the top-up page.</div>
          <form method="post" style="margin-top:16px">
            <input type="hidden" name="action" value="update-billing-settings" />
            <label>
              Credits per GBP
              <input type="number" min="1" name="credits_per_gbp" value="<?php echo (int) ($billingSettings['credits_per_gbp'] ?? 10); ?>" required />
            </label>
            <label>
              Minimum credits per purchase
              <input type="number" min="1" name="minimum_credits" value="<?php echo (int) ($billingSettings['minimum_credits'] ?? 1); ?>" required />
            </label>
            <label>
              Maximum credits per purchase
              <input type="number" min="1" name="maximum_credits" value="<?php echo (int) ($billingSettings['maximum_credits'] ?? 5000); ?>" required />
            </label>
            <label>
              Credits granted on sign-up
              <input type="number" min="0" name="signup_credits" value="<?php echo (int) ($billingSettings['signup_credits'] ?? 5); ?>" required />
            </label>
            <button type="submit" class="unlock">Save Billing Settings</button>
          </form>
          <div class="muted" style="margin-top:12px;font-size:14px;">Current rate: <strong>£<?php echo htmlspecialchars((string) ($billingSettings['gbp_per_credit'] ?? '0.10'), ENT_QUOTES, 'UTF-8'); ?></strong> per credit.</div>
        </div>
      </div>

      <div class="admin-panel panel">
        <div class="panel-head"><span class="eyebrow">Promo Codes</span></div>
        <div class="panel-body">
          <form method="post">
            <input type="hidden" name="action" value="create-promo-code" />
            <label>
              Promo code
              <input type="text" name="promo_code" placeholder="SUMMER25" required />
            </label>
            <label>
              Discount type
              <select name="discount_type">
                <option value="percent">Percent off</option>
                <option value="fixed_gbp">Fixed GBP off</option>
              </select>
            </label>
            <label>
              Discount value
              <input type="number" min="0.01" step="0.01" name="discount_value" required />
            </label>
            <label>
              Minimum credits
              <input type="number" min="1" name="promo_minimum_credits" value="1" required />
            </label>
            <label>
              Maximum redemptions
              <input type="number" min="1" name="maximum_redemptions" placeholder="Leave blank for unlimited" />
            </label>
            <label>
              Expiry date
              <input type="date" name="expires_at" />
            </label>
            <button type="submit" class="unlock">Save Promo Code</button>
          </form>

          <div class="accounts-table-wrap" style="margin-top:18px;">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Min Credits</th>
                  <th>Uses</th>
                  <th>Expiry</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <?php if (!$promoCodes): ?>
                  <tr><td colspan="7" class="muted">No promo codes created yet.</td></tr>
                <?php else: ?>
                  <?php foreach ($promoCodes as $promo): ?>
                    <tr>
                      <td><strong><?php echo htmlspecialchars((string) $promo['code'], ENT_QUOTES, 'UTF-8'); ?></strong></td>
                      <td>
                        <?php if ((string) $promo['discount_type'] === 'fixed_gbp'): ?>
                          £<?php echo htmlspecialchars(number_format((float) $promo['discount_value'], 2, '.', ''), ENT_QUOTES, 'UTF-8'); ?> off
                        <?php else: ?>
                          <?php echo htmlspecialchars(number_format((float) $promo['discount_value'], 2, '.', ''), ENT_QUOTES, 'UTF-8'); ?>% off
                        <?php endif; ?>
                      </td>
                      <td><?php echo (int) $promo['minimum_credits']; ?></td>
                      <td><?php echo (int) $promo['redeemed_count']; ?><?php echo $promo['maximum_redemptions'] !== null ? ' / ' . (int) $promo['maximum_redemptions'] : ''; ?></td>
                      <td><?php echo htmlspecialchars((string) ($promo['expires_at'] ?: '--'), ENT_QUOTES, 'UTF-8'); ?></td>
                      <td><span class="pill <?php echo (int) $promo['is_active'] === 1 ? 'ok' : 'off'; ?>"><?php echo (int) $promo['is_active'] === 1 ? 'Active' : 'Inactive'; ?></span></td>
                      <td>
                        <div class="actions">
                          <form class="action-form" method="post">
                            <input type="hidden" name="action" value="toggle-promo-code" />
                            <input type="hidden" name="promo_id" value="<?php echo (int) $promo['id']; ?>" />
                            <input type="hidden" name="is_active" value="<?php echo (int) $promo['is_active'] === 1 ? 0 : 1; ?>" />
                            <button class="<?php echo (int) $promo['is_active'] === 1 ? 'lock' : 'unlock'; ?> icon-btn" type="submit" title="<?php echo (int) $promo['is_active'] === 1 ? 'Deactivate promo code' : 'Activate promo code'; ?>" aria-label="<?php echo (int) $promo['is_active'] === 1 ? 'Deactivate promo code' : 'Activate promo code'; ?>"><?php echo (int) $promo['is_active'] === 1 ? '&#128274;' : '&#10003;'; ?></button>
                          </form>
                          <form class="action-form" method="post" onsubmit="return confirm('Delete this promo code?');">
                            <input type="hidden" name="action" value="delete-promo-code" />
                            <input type="hidden" name="promo_id" value="<?php echo (int) $promo['id']; ?>" />
                            <button class="delete icon-btn" type="submit" title="Delete promo code" aria-label="Delete promo code">&#128465;</button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  <?php endforeach; ?>
                <?php endif; ?>
              </tbody>
            </table>
          </div>
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
      <div class="panel-body">
      <div class="accounts-table-wrap">
      <table>
        <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Locked</th>
              <th>Debug</th>
              <th>Active Session</th>
              <th>Credits</th>
              <th>Created</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($users as $user): ?>
            <tr>
              <td>
                <strong><?php echo htmlspecialchars((string) $user['display_name'], ENT_QUOTES, 'UTF-8'); ?></strong><span class="account-id">ID <?php echo (int) $user['id']; ?></span>
              </td>
              <td title="<?php echo htmlspecialchars((string) $user['email'], ENT_QUOTES, 'UTF-8'); ?>"><?php echo htmlspecialchars((string) $user['email'], ENT_QUOTES, 'UTF-8'); ?></td>
              <td><span class="pill <?php echo (int) $user['is_verified'] === 1 ? 'ok' : 'off'; ?>"><?php echo (int) $user['is_verified'] === 1 ? 'Verified' : 'Pending'; ?></span></td>
                <td class="cell-debug">
                  <span class="pill <?php echo (int) $user['is_locked'] === 1 ? 'locked' : 'ok'; ?>" title="<?php echo !empty($user['locked_reason']) ? htmlspecialchars((string) $user['locked_reason'], ENT_QUOTES, 'UTF-8') : ''; ?>">
                    <?php echo (int) $user['is_locked'] === 1 ? 'Locked' : 'Active'; ?>
                  </span>
                </td>
                <td>
                  <span class="pill <?php echo (int) ($user['debug_enabled'] ?? 0) === 1 ? 'live' : 'off'; ?>">
                    <?php echo (int) ($user['debug_enabled'] ?? 0) === 1 ? 'Debug On' : 'Debug Off'; ?>
                  </span>
                  <form class="action-form" method="post" style="display:inline-flex;margin-left:6px;">
                    <input type="hidden" name="action" value="toggle-user-debug" />
                    <input type="hidden" name="user_id" value="<?php echo (int) $user['id']; ?>" />
                    <input type="hidden" name="debug_enabled" value="<?php echo (int) ($user['debug_enabled'] ?? 0) === 1 ? 0 : 1; ?>" />
                    <button class="<?php echo (int) ($user['debug_enabled'] ?? 0) === 1 ? 'lock' : 'unlock'; ?>" type="submit">
                      <?php echo (int) ($user['debug_enabled'] ?? 0) === 1 ? 'Off' : 'On'; ?>
                    </button>
                  </form>
                </td>
                <td>
                  <?php if (hasActiveLiveConnection($user)): ?>
                    <span class="pill live" title="<?php echo htmlspecialchars((string) ($user['active_connection_started_at'] ?? ''), ENT_QUOTES, 'UTF-8'); ?>">LIVE Connected</span>
                  <?php elseif (hasActiveSignedInSession($user)): ?>
                  <span class="pill session" title="Expires <?php echo htmlspecialchars((string) ($user['session_token_expires_at'] ?? ''), ENT_QUOTES, 'UTF-8'); ?>">Signed In</span>
                <?php else: ?>
                  <span class="pill off">Offline</span>
                <?php endif; ?>
              </td>
              <td><strong><?php echo (int) ($user['credits'] ?? 0); ?></strong></td>
              <td title="<?php echo htmlspecialchars((string) $user['created_at'], ENT_QUOTES, 'UTF-8'); ?>"><?php echo htmlspecialchars((string) $user['created_at'], ENT_QUOTES, 'UTF-8'); ?></td>
              <td class="cell-actions">
                  <div class="actions account-actions">
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
                    <form class="action-form" method="post" onsubmit="return confirm('Force sign out this user and close their active app session?');">
                      <input type="hidden" name="action" value="force-signout-user" />
                      <input type="hidden" name="user_id" value="<?php echo (int) $user['id']; ?>" />
                      <div class="row"><button class="delete icon-btn" type="submit" title="Force sign out user" aria-label="Force sign out user">&#10162;</button></div>
                    </form>
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
                      <div class="row"><button class="lock icon-btn" type="submit" title="Lock account" aria-label="Lock account">&#128274;</button></div>
                      <input class="reason-input" type="text" name="locked_reason" placeholder="Reason (optional)" />
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
      </div>
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
                  <option value="forced_sign_out" <?php echo $auditType === 'forced_sign_out' ? 'selected' : ''; ?>>Forced sign out</option>
                  <option value="signed_in_elsewhere" <?php echo $auditType === 'signed_in_elsewhere' ? 'selected' : ''; ?>>Signed in elsewhere</option>
                  <option value="account_locked" <?php echo $auditType === 'account_locked' ? 'selected' : ''; ?>>Account locked</option>
                  <option value="app_error" <?php echo $auditType === 'app_error' ? 'selected' : ''; ?>>App error</option>
                  <option value="debug_trace" <?php echo $auditType === 'debug_trace' ? 'selected' : ''; ?>>Debug trace</option>
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
            <label>
              Chart grouping
              <select name="audit_group">
                <option value="day" <?php echo $auditGroup === 'day' ? 'selected' : ''; ?>>Per day</option>
                <option value="week" <?php echo $auditGroup === 'week' ? 'selected' : ''; ?>>Per week</option>
                <option value="month" <?php echo $auditGroup === 'month' ? 'selected' : ''; ?>>Per month</option>
                <option value="year" <?php echo $auditGroup === 'year' ? 'selected' : ''; ?>>Per year</option>
              </select>
            </label>
            <button type="submit" class="unlock">Apply</button>
          </form>
          <div class="audit-chart">
            <div class="audit-chart-head">
              <div class="audit-chart-copy">
                <strong>Audit Activity Chart</strong>
                <div class="muted">Grouped by <?php echo htmlspecialchars($auditGroup === 'week' ? 'week' : ($auditGroup === 'month' ? 'month' : ($auditGroup === 'year' ? 'year' : 'day')), ENT_QUOTES, 'UTF-8'); ?> and split by audit type.</div>
              </div>
              <div class="audit-chart-legend">
                <?php foreach ($auditChart['legend'] as $legendItem): ?>
                  <span class="audit-legend-item">
                    <span class="audit-legend-swatch" style="background:<?php echo htmlspecialchars((string) $legendItem['color'], ENT_QUOTES, 'UTF-8'); ?>"></span>
                    <?php echo htmlspecialchars((string) $legendItem['label'], ENT_QUOTES, 'UTF-8'); ?>
                  </span>
                <?php endforeach; ?>
              </div>
            </div>
            <?php if (!$auditChart['periods']): ?>
              <div class="muted">No chart data is available for the current audit filters.</div>
            <?php else: ?>
              <div class="audit-bars">
                <?php foreach ($auditChart['periods'] as $period): ?>
                  <div class="audit-bar-row">
                    <div class="audit-bar-label"><?php echo htmlspecialchars((string) $period['label'], ENT_QUOTES, 'UTF-8'); ?></div>
                    <div class="audit-bar-track">
                      <?php foreach ($period['segments'] as $segment): ?>
                        <div
                          class="audit-bar-segment"
                          style="width:<?php echo htmlspecialchars(number_format((float) $segment['percent'], 2, '.', ''), ENT_QUOTES, 'UTF-8'); ?>%;background:<?php echo htmlspecialchars((string) $segment['color'], ENT_QUOTES, 'UTF-8'); ?>"
                          title="<?php echo htmlspecialchars((string) $segment['label'] . ': ' . (int) $segment['count'], ENT_QUOTES, 'UTF-8'); ?>"
                        ></div>
                      <?php endforeach; ?>
                    </div>
                    <div class="audit-bar-total"><?php echo (int) $period['total']; ?> event<?php echo (int) $period['total'] === 1 ? '' : 's'; ?></div>
                  </div>
                <?php endforeach; ?>
              </div>
            <?php endif; ?>
          </div>
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
                  <?php $metadataSummary = formatAuditMetadataSummary($log['metadata_json'] ?? null); ?>
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
                        <?php if ($metadataSummary !== ''): ?>
                          <div class="muted" style="margin-top:6px;line-height:1.5;"><?php echo htmlspecialchars($metadataSummary, ENT_QUOTES, 'UTF-8'); ?></div>
                        <?php endif; ?>
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
  <script>
    (() => {
      const securityPanel = document.getElementById('security-panel');
      const securityToggle = document.getElementById('security-toggle');
      if (!securityPanel || !securityToggle) {
        return;
      }

      securityToggle.addEventListener('click', () => {
        const isCollapsed = securityPanel.classList.toggle('panel-collapsed');
        securityToggle.textContent = isCollapsed ? 'Expand' : 'Collapse';
        securityToggle.setAttribute('aria-expanded', String(!isCollapsed));
      });
    })();
  </script>
</body>
</html>
<?php
}
