<?php

declare(strict_types=1);

date_default_timezone_set('UTC');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$configPath = __DIR__ . '/config.php';

if (!file_exists($configPath)) {
    jsonResponse(500, [
        'ok' => false,
        'error' => 'Server auth config is missing. Copy config.sample.php to config.php first.',
    ]);
}

$config = require $configPath;

try {
    $pdo = createPdo($config['db'] ?? []);
    ensureSchema($pdo, $config);
    routeRequest($pdo, $config);
} catch (Throwable $exception) {
    jsonResponse(500, [
        'ok' => false,
        'error' => $exception->getMessage(),
    ]);
}

function routeRequest(PDO $pdo, array $config): void
{
    $requestMethod = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    $requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $scriptDir = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/api/index.php')), '/');

    if ($scriptDir !== '' && $scriptDir !== '/') {
        if (strpos($requestPath, $scriptDir) === 0) {
            $requestPath = substr($requestPath, strlen($scriptDir));
        }
    }

    $requestPath = '/' . ltrim($requestPath, '/');

    if ($requestMethod === 'GET' && $requestPath === '/health') {
        jsonResponse(200, ['ok' => true, 'service' => 'website-auth']);
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/queue-state') {
        handleGetQueueOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/command-feedback-state') {
        handleGetCommandFeedbackOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod !== 'POST') {
        jsonResponse(404, ['ok' => false, 'error' => 'Not found']);
    }

    $input = getJsonInput();

    switch ($requestPath) {
        case '/auth/register':
            handleRegister($pdo, $config, $input);
            return;
        case '/auth/verify-email':
            handleVerifyEmail($pdo, $input);
            return;
        case '/auth/login':
            handleLogin($pdo, $input);
            return;
        case '/auth/logout':
            handleLogout($pdo, $input);
            return;
        case '/auth/session':
            handleSession($pdo, $input);
            return;
        case '/auth/self-check':
            handleSelfCheck($pdo, $input);
            return;
        case '/auth/claim-active-connection':
            handleClaimActiveConnection($pdo, $input);
            return;
        case '/auth/audit-event':
            handleAuditEvent($pdo, $input);
            return;
        case '/auth/check-connect-credit':
            handleCheckConnectCredit($pdo, $input);
            return;
        case '/auth/consume-connect-credit':
            handleConsumeConnectCredit($pdo, $input);
            return;
        case '/auth/forgot-password':
            handleForgotPassword($pdo, $config, $input);
            return;
        case '/auth/reset-password':
            handleResetPassword($pdo, $input);
            return;
        case '/auth/create-topup-session':
            handleCreateTopupSession($pdo, $config, $input);
            return;
        case '/auth/create-queue-overlay-session':
            handleCreateQueueOverlaySession($pdo, $input);
            return;
        case '/auth/create-command-feedback-overlay-session':
            handleCreateCommandFeedbackOverlaySession($pdo, $input);
            return;
        case '/contact/submit':
            handleContactSubmit($pdo, $config, $input);
            return;
        case '/billing/session':
            handleBillingSession($pdo, $config, $input);
            return;
        case '/billing/quote':
            handleBillingQuote($pdo, $config, $input);
            return;
        case '/billing/create-paypal-order':
            handleCreatePayPalOrder($pdo, $config, $input);
            return;
        case '/billing/capture-paypal-order':
            handleCapturePayPalOrder($pdo, $config, $input);
            return;
        case '/overlay/update-queue-state':
            handleUpdateQueueOverlayState($pdo, $input);
            return;
        case '/overlay/update-command-feedback-state':
            handleUpdateCommandFeedbackOverlayState($pdo, $input);
            return;
        default:
            jsonResponse(404, ['ok' => false, 'error' => 'Not found']);
    }
}

function createPdo(array $db): PDO
{
    $host = (string) ($db['host'] ?? 'localhost');
    $port = (int) ($db['port'] ?? 3306);
    $name = (string) ($db['name'] ?? '');
    $user = (string) ($db['user'] ?? '');
    $password = (string) ($db['password'] ?? '');
    $charset = (string) ($db['charset'] ?? 'utf8mb4');

    if ($name === '' || $user === '') {
        throw new RuntimeException('Database settings are incomplete.');
    }

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
            active_connection_token_hash VARCHAR(255) NULL,
            active_connection_started_at DATETIME NULL,
            forced_logout_token_hash VARCHAR(255) NULL,
            forced_logout_reason VARCHAR(64) NULL,
            forced_logout_at DATETIME NULL,
            billing_link_token_hash VARCHAR(255) NULL,
            billing_link_token_expires_at DATETIME NULL,
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
        'CREATE TABLE IF NOT EXISTS auth_credit_transactions (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NOT NULL,
            provider VARCHAR(40) NOT NULL,
            provider_order_id VARCHAR(80) NOT NULL,
            requested_credits INT NOT NULL,
            amount_value DECIMAL(10,2) NOT NULL,
            discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
            currency_code VARCHAR(8) NOT NULL DEFAULT "GBP",
            status VARCHAR(40) NOT NULL DEFAULT "created",
            capture_id VARCHAR(80) NULL,
            metadata_json TEXT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            captured_at DATETIME NULL,
            UNIQUE KEY uniq_provider_order (provider, provider_order_id),
            INDEX idx_credit_user_created (user_id, created_at),
            CONSTRAINT fk_credit_user FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE CASCADE
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
        'CREATE TABLE IF NOT EXISTS auth_user_overlay_state (
            user_id INT UNSIGNED NOT NULL PRIMARY KEY,
            overlay_token_hash VARCHAR(255) NULL,
            overlay_token_expires_at DATETIME NULL,
            queue_state_json LONGTEXT NULL,
            command_feedback_json LONGTEXT NULL,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_overlay_user FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE CASCADE,
            INDEX idx_overlay_token_expiry (overlay_token_hash, overlay_token_expires_at)
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
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_promo_active (is_active, expires_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS auth_contact_messages (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(120) NOT NULL,
            email VARCHAR(255) NOT NULL,
            topic VARCHAR(80) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            message_body TEXT NOT NULL,
            ip_address VARCHAR(64) NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_contact_created (created_at),
            INDEX idx_contact_topic (topic)
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
    ensureColumn($pdo, 'auth_users', 'billing_link_token_hash', 'ALTER TABLE auth_users ADD COLUMN billing_link_token_hash VARCHAR(255) NULL AFTER forced_logout_at');
    ensureColumn($pdo, 'auth_users', 'billing_link_token_expires_at', 'ALTER TABLE auth_users ADD COLUMN billing_link_token_expires_at DATETIME NULL AFTER billing_link_token_hash');
    ensureColumn($pdo, 'auth_credit_transactions', 'discount_amount', 'ALTER TABLE auth_credit_transactions ADD COLUMN discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0 AFTER amount_value');
    ensureColumn($pdo, 'auth_user_overlay_state', 'command_feedback_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN command_feedback_json LONGTEXT NULL AFTER queue_state_json');
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

function getJsonInput(): array
{
    $raw = file_get_contents('php://input') ?: '';

    if ($raw === '') {
        return [];
    }

    $decoded = json_decode($raw, true);

    if (!is_array($decoded)) {
        jsonResponse(400, ['ok' => false, 'error' => 'Invalid JSON payload']);
    }

    return $decoded;
}

function handleRegister(PDO $pdo, array $config, array $input): void
{
    $displayName = trim((string) ($input['displayName'] ?? ''));
    $email = normalizeEmail((string) ($input['email'] ?? ''));
    $password = (string) ($input['password'] ?? '');
    $billingSettings = getBillingSettings($pdo, $config);
    $signupCredits = max(0, (int) ($billingSettings['signup_credits'] ?? 5));

    if ($displayName === '' || $email === '' || $password === '') {
        jsonResponse(400, ['ok' => false, 'error' => 'Display name, email, and password are required.']);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(400, ['ok' => false, 'error' => 'Enter a valid email address.']);
    }

    if (strlen($password) < 8) {
        jsonResponse(400, ['ok' => false, 'error' => 'Password must be at least 8 characters long.']);
    }

    $existingUser = findUserByEmail($pdo, $email);
    $code = createNumericCode();
    $codeHash = hash('sha256', $code);
    $expiresAt = createExpiryTimestamp((int) (($config['app']['verification_expiry_minutes'] ?? 15)));
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    if ($existingUser) {
        if ((int) $existingUser['is_verified'] === 1) {
            jsonResponse(409, [
                'ok' => false,
                'error' => 'That email is already being used. If you have forgotten your password, please use Reset Password.',
            ]);
        }

        $statement = $pdo->prepare(
            'UPDATE auth_users
             SET display_name = :display_name,
                 password_hash = :password_hash,
                 credits = :credits,
                 verification_code_hash = :verification_code_hash,
                 verification_code_expires_at = :verification_code_expires_at
             WHERE id = :id'
        );
        $statement->execute([
            ':display_name' => $displayName,
            ':password_hash' => $passwordHash,
            ':credits' => $signupCredits,
            ':verification_code_hash' => $codeHash,
            ':verification_code_expires_at' => $expiresAt,
            ':id' => (int) $existingUser['id'],
        ]);
    } else {
        $statement = $pdo->prepare(
            'INSERT INTO auth_users (
                email,
                display_name,
                password_hash,
                credits,
                verification_code_hash,
                verification_code_expires_at
             ) VALUES (
                :email,
                :display_name,
                :password_hash,
                :credits,
                :verification_code_hash,
                :verification_code_expires_at
             )'
        );
        $statement->execute([
            ':email' => $email,
            ':display_name' => $displayName,
            ':password_hash' => $passwordHash,
            ':credits' => $signupCredits,
            ':verification_code_hash' => $codeHash,
            ':verification_code_expires_at' => $expiresAt,
        ]);
    }

    sendCodeEmail(
        $config,
        $email,
        'Verify your email',
        'Use this code to verify your Stream Sync Pro LIVE account:',
        $code
    );

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Registration started. Check your email for the verification code.',
    ]);
}

function handleVerifyEmail(PDO $pdo, array $input): void
{
    $email = normalizeEmail((string) ($input['email'] ?? ''));
    $code = trim((string) ($input['code'] ?? ''));

    if ($email === '' || $code === '') {
        jsonResponse(400, ['ok' => false, 'error' => 'Email and code are required.']);
    }

    $user = findUserByEmail($pdo, $email);

    if (!$user) {
        jsonResponse(404, ['ok' => false, 'error' => 'No account found for that email.']);
    }

    if ((int) $user['is_verified'] === 1) {
        jsonResponse(200, ['ok' => true, 'message' => 'Email already verified.']);
    }

    if (empty($user['verification_code_hash']) || empty($user['verification_code_expires_at'])) {
        jsonResponse(400, ['ok' => false, 'error' => 'No active verification code found.']);
    }

    if (strtotime((string) $user['verification_code_expires_at']) < time()) {
        jsonResponse(400, ['ok' => false, 'error' => 'Verification code has expired.']);
    }

    if (!hash_equals((string) $user['verification_code_hash'], hash('sha256', $code))) {
        jsonResponse(400, ['ok' => false, 'error' => 'Verification code is incorrect.']);
    }

    $statement = $pdo->prepare(
        'UPDATE auth_users
         SET is_verified = 1,
             verification_code_hash = NULL,
             verification_code_expires_at = NULL
         WHERE id = :id'
    );
    $statement->execute([':id' => (int) $user['id']]);

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Email verified successfully.',
    ]);
}

function handleLogin(PDO $pdo, array $input): void
{
    $email = normalizeEmail((string) ($input['email'] ?? ''));
    $password = (string) ($input['password'] ?? '');

    if ($email === '' || $password === '') {
        jsonResponse(400, ['ok' => false, 'error' => 'Email and password are required.']);
    }

    $user = findUserByEmail($pdo, $email);

    if (!$user) {
        jsonResponse(401, ['ok' => false, 'error' => 'Email or password is incorrect.']);
    }

    if (!verifyPassword($password, (string) $user['password_hash'])) {
        logAuditEvent(
            $pdo,
            (int) $user['id'],
            'sign_in_failed',
            'Failed sign-in attempt due to an incorrect password.',
            (int) ($user['credits'] ?? 0)
        );
        jsonResponse(401, ['ok' => false, 'error' => 'Email or password is incorrect.']);
    }

    if ((int) ($user['is_locked'] ?? 0) === 1) {
        $reason = trim((string) ($user['locked_reason'] ?? ''));
        $message = 'This account has been locked. Please contact admin.';
        if ($reason !== '') {
            $message .= ' Reason: ' . $reason;
        }
        jsonResponse(423, ['ok' => false, 'error' => $message]);
    }

    if ((int) $user['is_verified'] !== 1) {
        jsonResponse(403, ['ok' => false, 'error' => 'Please verify your email before signing in.']);
    }

    $previousSessionTokenHash = trim((string) ($user['session_token_hash'] ?? ''));
    $sessionTakeover = $previousSessionTokenHash !== '';
    $sessionToken = bin2hex(random_bytes(32));
    $sessionTokenHash = hash('sha256', $sessionToken);
    $sessionTokenExpiresAt = createExpiryTimestamp(60 * 24 * 30);

    $statement = $pdo->prepare(
        'UPDATE auth_users
         SET session_token_hash = :session_token_hash,
             session_token_expires_at = :session_token_expires_at,
             forced_logout_token_hash = :forced_logout_token_hash,
             forced_logout_reason = :forced_logout_reason,
             forced_logout_at = :forced_logout_at
         WHERE id = :id'
    );
    $statement->execute([
        ':session_token_hash' => $sessionTokenHash,
        ':session_token_expires_at' => $sessionTokenExpiresAt,
        ':forced_logout_token_hash' => $sessionTakeover ? $previousSessionTokenHash : null,
        ':forced_logout_reason' => $sessionTakeover ? 'signed_in_elsewhere' : null,
        ':forced_logout_at' => $sessionTakeover ? gmdate('Y-m-d H:i:s') : null,
        ':id' => (int) $user['id'],
    ]);

    $user['session_token_hash'] = $sessionTokenHash;
    $user['session_token_expires_at'] = $sessionTokenExpiresAt;
    logAuditEvent(
        $pdo,
        (int) $user['id'],
        'sign_in',
        'User signed in.',
        (int) ($user['credits'] ?? 0)
    );
    if ($sessionTakeover) {
        logAuditEvent(
            $pdo,
            (int) $user['id'],
            'signed_in_elsewhere',
            'A previous session was signed out because this account signed in on another device.',
            (int) ($user['credits'] ?? 0)
        );
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user, $sessionToken),
    ]);
}

function handleLogout(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);

    $statement = $pdo->prepare(
        'UPDATE auth_users
         SET session_token_hash = NULL,
             session_token_expires_at = NULL,
             active_connection_token_hash = NULL,
             active_connection_started_at = NULL
         WHERE id = :id'
    );
    $statement->execute([':id' => (int) $user['id']]);

    logAuditEvent(
        $pdo,
        (int) $user['id'],
        'sign_out',
        'User signed out.',
        (int) ($user['credits'] ?? 0)
    );

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Signed out successfully.',
    ]);
}

function handleConsumeConnectCredit(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $sessionTokenHash = hash('sha256', $sessionToken);
    $tiktokUsername = trim((string) ($input['tiktokUsername'] ?? ''));
    $normalizedTiktokUsername = ltrim($tiktokUsername, '@');

    if (hasAnotherActiveConnection($user, $sessionTokenHash)) {
        jsonResponse(409, ['ok' => false, 'error' => 'This account is already connected on another device or session.']);
    }

    $currentCredits = (int) ($user['credits'] ?? 0);
    if ($currentCredits < 1) {
        jsonResponse(402, ['ok' => false, 'error' => "You do not have enough credits to connect. Current balance: {$currentCredits}. Please contact admin."]);
    }

    $statement = $pdo->prepare(
        'UPDATE auth_users
         SET credits = credits - 1,
             active_connection_token_hash = :active_connection_token_hash,
             active_connection_started_at = :active_connection_started_at
         WHERE id = :id AND credits >= 1'
    );
    $statement->execute([
        ':active_connection_token_hash' => $sessionTokenHash,
        ':active_connection_started_at' => gmdate('Y-m-d H:i:s'),
        ':id' => (int) $user['id'],
    ]);

    if ($statement->rowCount() !== 1) {
        jsonResponse(402, ['ok' => false, 'error' => 'You do not have enough credits to connect after recheck. Please contact admin.']);
    }

    $updatedUser = findUserById($pdo, (int) $user['id']);
    $connectDescription = $normalizedTiktokUsername !== ''
        ? sprintf('Connected to TikTok LIVE as @%s.', $normalizedTiktokUsername)
        : 'Connected to TikTok LIVE.';
    logAuditEvent(
        $pdo,
        (int) $user['id'],
        'connect',
        $connectDescription,
        (int) ($updatedUser['credits'] ?? 0),
        $normalizedTiktokUsername !== '' ? ['tiktokUsername' => $normalizedTiktokUsername] : []
    );

    jsonResponse(200, [
        'ok' => true,
        'message' => '1 credit used to connect.',
        'user' => sanitizeUser($updatedUser, $sessionToken),
    ]);
}

function handleCheckConnectCredit(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $sessionTokenHash = hash('sha256', $sessionToken);

    if (hasAnotherActiveConnection($user, $sessionTokenHash)) {
        jsonResponse(409, ['ok' => false, 'error' => 'This account is already connected on another device or session.']);
    }

    $currentCredits = (int) ($user['credits'] ?? 0);
    if ($currentCredits < 1) {
        jsonResponse(402, ['ok' => false, 'error' => "You do not have enough credits to connect. Current balance: {$currentCredits}. Please contact admin."]);
    }

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Credits available to connect.',
        'user' => sanitizeUser($user, $sessionToken),
    ]);
}

function handleSession(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user, $sessionToken),
    ]);
}

function handleSelfCheck(PDO $pdo, array $input): void
{
    $sessionToken = trim((string) ($input['sessionToken'] ?? ''));
    $userId = max(0, (int) ($input['userId'] ?? 0));

    if ($sessionToken === '') {
        jsonResponse(200, [
            'ok' => true,
            'active' => false,
            'code' => 'missing_session',
            'message' => 'No active session token was provided.',
        ]);
    }

    $sessionTokenHash = hash('sha256', $sessionToken);
    $user = findUserBySessionTokenHash($pdo, $sessionTokenHash);

    if ($user) {
        if ((int) ($user['is_locked'] ?? 0) === 1) {
            $reason = trim((string) ($user['locked_reason'] ?? ''));
            $message = 'This account has been locked. Please contact admin.';
            if ($reason !== '') {
                $message .= ' Reason: ' . $reason;
            }
            clearUserActiveSession($pdo, (int) $user['id'], $sessionTokenHash, 'account_locked');
            jsonResponse(200, [
                'ok' => true,
                'active' => false,
                'code' => 'account_locked',
                'message' => $message,
            ]);
        }

        $expectedExpiry = (string) ($user['session_token_expires_at'] ?? '');
        if ($expectedExpiry !== '' && strtotime($expectedExpiry) !== false && strtotime($expectedExpiry) < time()) {
            jsonResponse(200, [
                'ok' => true,
                'active' => false,
                'code' => 'session_expired',
                'message' => 'Your session has expired. Please sign in again.',
            ]);
        }

        jsonResponse(200, [
            'ok' => true,
            'active' => true,
            'code' => 'session_active',
            'message' => 'Session is active.',
            'user' => sanitizeUser($user, $sessionToken),
        ]);
    }

    $forcedLogoutUser = findUserByForcedLogoutTokenHash($pdo, $sessionTokenHash, $userId);
    if ($forcedLogoutUser) {
        $forcedLogoutPayload = buildForcedLogoutResponse($forcedLogoutUser);
        jsonResponse(200, [
            'ok' => true,
            'active' => false,
            'code' => $forcedLogoutPayload['code'],
            'message' => $forcedLogoutPayload['message'],
        ]);
    }

    jsonResponse(200, [
        'ok' => true,
        'active' => false,
        'code' => 'session_invalid',
        'message' => 'Your session is invalid. Please sign in again.',
    ]);
}

function handleClaimActiveConnection(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $sessionTokenHash = hash('sha256', $sessionToken);
    $claimed = false;

    if (hasAnotherActiveConnection($user, $sessionTokenHash)) {
        $statement = $pdo->prepare(
            'UPDATE auth_users
             SET active_connection_token_hash = NULL,
                 active_connection_started_at = NULL
             WHERE id = :id'
        );
        $statement->execute([':id' => (int) $user['id']]);

        logAuditEvent(
            $pdo,
            (int) $user['id'],
            'session_takeover',
            'A newer app session signed out the previous active connection.',
            (int) ($user['credits'] ?? 0)
        );

        $claimed = true;
        $user = findUserById($pdo, (int) $user['id']) ?? $user;
    }

    jsonResponse(200, [
        'ok' => true,
        'claimed' => $claimed,
        'message' => $claimed
            ? 'Any previous active connection has been signed out.'
            : 'No previous active connection needed to be signed out.',
        'user' => sanitizeUser($user, $sessionToken),
    ]);
}

function handleAuditEvent(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $eventType = trim((string) ($input['eventType'] ?? ''));

    $allowedEvents = [
        'disconnect' => 'Disconnected from TikTok LIVE.',
        'app_error' => 'Application error captured.',
        'debug_trace' => 'Debug trace captured.',
    ];

    if (!isset($allowedEvents[$eventType])) {
        jsonResponse(400, ['ok' => false, 'error' => 'Unsupported audit event type.']);
    }

    if ($eventType === 'disconnect') {
        $statement = $pdo->prepare(
            'UPDATE auth_users
             SET active_connection_token_hash = NULL,
                 active_connection_started_at = NULL
             WHERE id = :id'
        );
        $statement->execute([':id' => (int) $user['id']]);
    }

    $eventDescription = $allowedEvents[$eventType];
    $metadata = [];
    $tiktokUsername = trim((string) ($input['tiktokUsername'] ?? ''));
    $normalizedTiktokUsername = ltrim($tiktokUsername, '@');

    if ($eventType === 'app_error') {
        $errorContext = trim((string) ($input['errorContext'] ?? ''));
        $errorMessage = trim((string) ($input['errorMessage'] ?? ''));
        $errorCode = trim((string) ($input['errorCode'] ?? ''));
        $source = trim((string) ($input['source'] ?? 'app'));
        $details = $input['details'] ?? [];

        if ($errorMessage === '') {
            jsonResponse(400, ['ok' => false, 'error' => 'Error message is required for app error audit events.']);
        }

        $eventDescription = $errorContext !== ''
            ? sprintf('%s: %s', $errorContext, $errorMessage)
            : $errorMessage;

        $metadata = [
            'source' => $source !== '' ? $source : 'app',
        ];

        if ($errorCode !== '') {
            $metadata['errorCode'] = $errorCode;
        }

        if (is_array($details) && $details !== []) {
            $metadata['details'] = $details;
        }
    } elseif ($eventType === 'debug_trace') {
        $debugContext = trim((string) ($input['debugContext'] ?? ''));
        $debugMessage = trim((string) ($input['debugMessage'] ?? ''));
        $source = trim((string) ($input['source'] ?? 'desktop_app'));
        $details = $input['details'] ?? [];

        if ((int) ($user['debug_enabled'] ?? 0) !== 1) {
            jsonResponse(200, [
                'ok' => true,
                'message' => 'Debug logging is disabled for this user.',
                'user' => sanitizeUser($user, $sessionToken),
            ]);
        }

        if ($debugMessage === '') {
            jsonResponse(400, ['ok' => false, 'error' => 'Debug message is required for debug trace audit events.']);
        }

        $eventDescription = $debugContext !== ''
            ? sprintf('%s: %s', $debugContext, $debugMessage)
            : $debugMessage;

        $metadata = [
            'source' => $source !== '' ? $source : 'desktop_app',
        ];

        if ($debugContext !== '') {
            $metadata['debugContext'] = $debugContext;
        }

        if (is_array($details) && $details !== []) {
            $metadata['details'] = $details;
        }
    }

    if ($normalizedTiktokUsername !== '') {
        $metadata['tiktokUsername'] = $normalizedTiktokUsername;
        if ($eventType === 'disconnect') {
            $eventDescription = sprintf('Disconnected from TikTok LIVE for @%s.', $normalizedTiktokUsername);
        }
    }

    logAuditEvent(
        $pdo,
        (int) $user['id'],
        $eventType,
        $eventDescription,
        (int) ($user['credits'] ?? 0),
        $metadata
    );

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Audit event recorded.',
        'user' => sanitizeUser($user, $sessionToken),
    ]);
}

function handleCreateTopupSession(PDO $pdo, array $config, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $billingSettings = getBillingSettings($pdo, $config);
    $expiryMinutes = max(5, (int) ($billingSettings['topup_session_expiry_minutes'] ?? 20));
    $billingToken = bin2hex(random_bytes(24));
    $billingTokenHash = hash('sha256', $billingToken);
    $expiresAt = createExpiryTimestamp($expiryMinutes);

    $statement = $pdo->prepare(
        'UPDATE auth_users
         SET billing_link_token_hash = :billing_link_token_hash,
             billing_link_token_expires_at = :billing_link_token_expires_at
         WHERE id = :id'
    );
    $statement->execute([
        ':billing_link_token_hash' => $billingTokenHash,
        ':billing_link_token_expires_at' => $expiresAt,
        ':id' => (int) $user['id'],
    ]);

    $user = findUserById($pdo, (int) $user['id']) ?? $user;

    jsonResponse(200, [
        'ok' => true,
        'url' => getSiteBaseUrl() . '/billing/?token=' . rawurlencode($billingToken),
        'expiresAt' => $expiresAt,
        'user' => sanitizeUser($user, $sessionToken),
    ]);
}

function handleCreateQueueOverlaySession(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $overlayToken = bin2hex(random_bytes(24));
    $overlayTokenHash = hash('sha256', $overlayToken);
    $expiresAt = createExpiryTimestamp(60 * 24 * 30);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            overlay_token_hash,
            overlay_token_expires_at,
            queue_state_json
        ) VALUES (
            :user_id,
            :overlay_token_hash,
            :overlay_token_expires_at,
            :queue_state_json
        )
        ON DUPLICATE KEY UPDATE
            overlay_token_hash = VALUES(overlay_token_hash),
            overlay_token_expires_at = VALUES(overlay_token_expires_at),
            queue_state_json = COALESCE(auth_user_overlay_state.queue_state_json, VALUES(queue_state_json))'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':overlay_token_hash' => $overlayTokenHash,
        ':overlay_token_expires_at' => $expiresAt,
        ':queue_state_json' => json_encode(defaultQueueOverlayState(), JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'url' => getSiteBaseUrl() . '/overlay/queue.php?token=' . rawurlencode($overlayToken),
        'expiresAt' => $expiresAt,
        'user' => sanitizeUser($user, $sessionToken),
    ]);
}

function handleCreateCommandFeedbackOverlaySession(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $overlayToken = bin2hex(random_bytes(24));
    $overlayTokenHash = hash('sha256', $overlayToken);
    $expiresAt = createExpiryTimestamp(60 * 24 * 30);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            overlay_token_hash,
            overlay_token_expires_at,
            command_feedback_json
        ) VALUES (
            :user_id,
            :overlay_token_hash,
            :overlay_token_expires_at,
            :command_feedback_json
        )
        ON DUPLICATE KEY UPDATE
            overlay_token_hash = VALUES(overlay_token_hash),
            overlay_token_expires_at = VALUES(overlay_token_expires_at),
            command_feedback_json = COALESCE(auth_user_overlay_state.command_feedback_json, VALUES(command_feedback_json))'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':overlay_token_hash' => $overlayTokenHash,
        ':overlay_token_expires_at' => $expiresAt,
        ':command_feedback_json' => json_encode(defaultCommandFeedbackOverlayState(), JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'url' => getSiteBaseUrl() . '/overlay/command-feedback.php?token=' . rawurlencode($overlayToken),
        'expiresAt' => $expiresAt,
        'user' => sanitizeUser($user, $sessionToken),
    ]);
}

function handleUpdateQueueOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeQueueOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            queue_state_json
        ) VALUES (
            :user_id,
            :queue_state_json
        )
        ON DUPLICATE KEY UPDATE
            queue_state_json = VALUES(queue_state_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':queue_state_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleUpdateCommandFeedbackOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeCommandFeedbackOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            command_feedback_json
        ) VALUES (
            :user_id,
            :command_feedback_json
        )
        ON DUPLICATE KEY UPDATE
            command_feedback_json = VALUES(command_feedback_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':command_feedback_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleGetQueueOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidQueueOverlayToken($pdo, trim((string) ($query['token'] ?? '')));
    $state = defaultQueueOverlayState();
    $decodedState = json_decode((string) ($overlayState['queue_state_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeQueueOverlayStatePayload($decodedState);
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'state' => $state,
        'updatedAt' => (string) ($overlayState['updated_at'] ?? ''),
    ]);
}

function handleGetCommandFeedbackOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidQueueOverlayToken($pdo, trim((string) ($query['token'] ?? '')));
    $state = defaultCommandFeedbackOverlayState();
    $decodedState = json_decode((string) ($overlayState['command_feedback_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeCommandFeedbackOverlayStatePayload($decodedState);
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'state' => $state,
        'updatedAt' => (string) ($overlayState['updated_at'] ?? ''),
    ]);
}

function handleBillingSession(PDO $pdo, array $config, array $input): void
{
    [$user] = requireValidBillingToken($pdo, $input);
    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'billing' => getBillingConfigPayload($config, $pdo),
        'paypal' => getPayPalPublicConfig($config),
    ]);
}

function handleBillingQuote(PDO $pdo, array $config, array $input): void
{
    [$user] = requireValidBillingToken($pdo, $input);
    $billing = getBillingConfigPayload($config, $pdo);
    $credits = validateRequestedCredits($input, ['billing' => [
        'minimum_credits' => $billing['minimumCredits'],
        'maximum_credits' => $billing['maximumCredits'],
    ]]);
    $pricing = applyPromoDiscount(
        formatCreditsAmount($credits, $billing['creditsPerGbp']),
        validatePromoCodeForCredits($pdo, (string) ($input['promoCode'] ?? ''), $credits)
    );

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'credits' => $credits,
        'currency' => $billing['currency'],
        'baseAmount' => $pricing['baseAmount'],
        'discountAmount' => $pricing['discountAmount'],
        'amount' => $pricing['finalAmount'],
        'promoCode' => $pricing['promoCode'],
        'promoLabel' => $pricing['promoLabel'],
    ]);
}

function handleCreatePayPalOrder(PDO $pdo, array $config, array $input): void
{
    [$user] = requireValidBillingToken($pdo, $input);
    $billing = getBillingConfigPayload($config, $pdo);
    $credits = validateRequestedCredits($input, ['billing' => [
        'minimum_credits' => $billing['minimumCredits'],
        'maximum_credits' => $billing['maximumCredits'],
    ]]);
    $pricing = applyPromoDiscount(
        formatCreditsAmount($credits, $billing['creditsPerGbp']),
        validatePromoCodeForCredits($pdo, (string) ($input['promoCode'] ?? ''), $credits)
    );

    $accessToken = getPayPalAccessToken($config);
    $order = paypalApiRequest(
        $config,
        $accessToken,
        'POST',
        '/v2/checkout/orders',
        [
            'intent' => 'CAPTURE',
            'purchase_units' => [[
                'reference_id' => 'credits-' . (int) $user['id'],
                'description' => sprintf('%d Stream Sync Pro LIVE credits', $credits),
                'amount' => [
                    'currency_code' => $billing['currency'],
                    'value' => $pricing['finalAmount'],
                ],
                'custom_id' => sprintf('user:%d;credits:%d;promo:%s', (int) $user['id'], $credits, $pricing['promoCode'] ?: 'none'),
            ]],
            'payment_source' => [
                'paypal' => [
                    'experience_context' => [
                        'brand_name' => (string) ($config['paypal']['brand_name'] ?? ($config['app']['name'] ?? 'Stream Sync Pro LIVE')),
                        'user_action' => 'PAY_NOW',
                    ],
                ],
            ],
        ]
    );

    $orderId = trim((string) ($order['id'] ?? ''));
    if ($orderId === '') {
        jsonResponse(502, ['ok' => false, 'error' => 'PayPal did not return an order id.']);
    }

    $statement = $pdo->prepare(
        'INSERT INTO auth_credit_transactions (
            user_id,
            provider,
            provider_order_id,
            requested_credits,
            amount_value,
            discount_amount,
            currency_code,
            status,
            metadata_json
         ) VALUES (
            :user_id,
            :provider,
            :provider_order_id,
            :requested_credits,
            :amount_value,
            :discount_amount,
            :currency_code,
            :status,
            :metadata_json
         )
         ON DUPLICATE KEY UPDATE
            requested_credits = VALUES(requested_credits),
            amount_value = VALUES(amount_value),
            discount_amount = VALUES(discount_amount),
            currency_code = VALUES(currency_code),
            status = VALUES(status),
            metadata_json = VALUES(metadata_json)'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':provider' => 'paypal',
        ':provider_order_id' => $orderId,
        ':requested_credits' => $credits,
        ':amount_value' => $pricing['finalAmount'],
        ':discount_amount' => $pricing['discountAmount'],
        ':currency_code' => $billing['currency'],
        ':status' => 'created',
        ':metadata_json' => json_encode([
            'paypalOrderStatus' => $order['status'] ?? '',
            'promoCode' => $pricing['promoCode'],
            'promoLabel' => $pricing['promoLabel'],
            'baseAmount' => $pricing['baseAmount'],
            'discountAmount' => $pricing['discountAmount'],
            'links' => $order['links'] ?? [],
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'orderId' => $orderId,
        'credits' => $credits,
        'amount' => $pricing['finalAmount'],
        'baseAmount' => $pricing['baseAmount'],
        'discountAmount' => $pricing['discountAmount'],
        'promoCode' => $pricing['promoCode'],
        'promoLabel' => $pricing['promoLabel'],
        'currency' => $billing['currency'],
        'paypal' => getPayPalPublicConfig($config),
    ]);
}

function handleCapturePayPalOrder(PDO $pdo, array $config, array $input): void
{
    [$user] = requireValidBillingToken($pdo, $input);
    $orderId = trim((string) ($input['orderId'] ?? ''));
    if ($orderId === '') {
        jsonResponse(400, ['ok' => false, 'error' => 'PayPal order id is required.']);
    }

    $transaction = findCreditTransactionByOrderId($pdo, 'paypal', $orderId);
    if (!$transaction || (int) $transaction['user_id'] !== (int) $user['id']) {
        jsonResponse(404, ['ok' => false, 'error' => 'No matching credit top-up transaction was found.']);
    }

    if (($transaction['status'] ?? '') === 'captured') {
        $freshUser = findUserById($pdo, (int) $user['id']) ?? $user;
        jsonResponse(200, [
            'ok' => true,
            'message' => 'This credit top-up was already completed.',
            'creditsAdded' => (int) $transaction['requested_credits'],
            'user' => sanitizeUser($freshUser),
        ]);
    }

    $accessToken = getPayPalAccessToken($config);
    $capture = paypalApiRequest($config, $accessToken, 'POST', '/v2/checkout/orders/' . rawurlencode($orderId) . '/capture', new stdClass());
    $status = strtoupper((string) ($capture['status'] ?? ''));
    if ($status !== 'COMPLETED') {
        jsonResponse(409, ['ok' => false, 'error' => 'PayPal has not completed this payment yet.']);
    }

    $captureId = '';
    if (!empty($capture['purchase_units'][0]['payments']['captures'][0]['id'])) {
        $captureId = (string) $capture['purchase_units'][0]['payments']['captures'][0]['id'];
    }

    $pdo->beginTransaction();
    try {
        $lockedTransaction = findCreditTransactionByOrderId($pdo, 'paypal', $orderId, true);
        if (!$lockedTransaction || (int) $lockedTransaction['user_id'] !== (int) $user['id']) {
            throw new RuntimeException('Unable to lock the credit transaction.');
        }

        if (($lockedTransaction['status'] ?? '') !== 'captured') {
            $creditStatement = $pdo->prepare('UPDATE auth_users SET credits = credits + :credits WHERE id = :id');
            $creditStatement->execute([
                ':credits' => (int) $lockedTransaction['requested_credits'],
                ':id' => (int) $user['id'],
            ]);

            $updateTransaction = $pdo->prepare(
                'UPDATE auth_credit_transactions
                 SET status = :status,
                     capture_id = :capture_id,
                     metadata_json = :metadata_json,
                     captured_at = :captured_at
                 WHERE id = :id'
            );
            $updateTransaction->execute([
                ':status' => 'captured',
                ':capture_id' => $captureId !== '' ? $captureId : null,
                ':metadata_json' => json_encode($capture, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                ':captured_at' => gmdate('Y-m-d H:i:s'),
                ':id' => (int) $lockedTransaction['id'],
            ]);

            $lockedMeta = json_decode((string) ($lockedTransaction['metadata_json'] ?? ''), true);
            $promoCode = strtoupper(trim((string) ($lockedMeta['promoCode'] ?? '')));
            if ($promoCode !== '') {
                $promoUseStatement = $pdo->prepare(
                    'UPDATE auth_promo_codes
                     SET redeemed_count = redeemed_count + 1
                     WHERE code = :code AND is_active = 1'
                );
                $promoUseStatement->execute([':code' => $promoCode]);
            }
        }

        $freshUser = findUserById($pdo, (int) $user['id']) ?? $user;
        logAuditEvent(
            $pdo,
            (int) $user['id'],
            'credits_topup',
            sprintf('Added %d credits via PayPal top-up.', (int) $lockedTransaction['requested_credits']),
            (int) ($freshUser['credits'] ?? 0),
            [
                'provider' => 'paypal',
                'orderId' => $orderId,
                'captureId' => $captureId,
                'creditsAdded' => (int) $lockedTransaction['requested_credits'],
                'amount' => (string) $lockedTransaction['amount_value'],
                'currency' => (string) $lockedTransaction['currency_code'],
            ]
        );

        $pdo->commit();

        jsonResponse(200, [
            'ok' => true,
            'message' => sprintf('%d credits added successfully.', (int) $lockedTransaction['requested_credits']),
            'creditsAdded' => (int) $lockedTransaction['requested_credits'],
            'user' => sanitizeUser($freshUser),
        ]);
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $exception;
    }
}

function requireValidBillingToken(PDO $pdo, array $input): array
{
    $billingToken = trim((string) ($input['billingToken'] ?? ''));
    if ($billingToken === '') {
        jsonResponse(401, ['ok' => false, 'error' => 'Your top-up session has expired. Return to the app and open it again.']);
    }

    $billingTokenHash = hash('sha256', $billingToken);
    $statement = $pdo->prepare(
        'SELECT * FROM auth_users
         WHERE billing_link_token_hash = :billing_link_token_hash
           AND billing_link_token_expires_at IS NOT NULL
         LIMIT 1'
    );
    $statement->execute([':billing_link_token_hash' => $billingTokenHash]);
    $user = $statement->fetch();
    if (!$user) {
        jsonResponse(401, ['ok' => false, 'error' => 'This top-up session is invalid. Return to the app and try again.']);
    }

    if (strtotime((string) ($user['billing_link_token_expires_at'] ?? '')) < time()) {
        jsonResponse(401, ['ok' => false, 'error' => 'This top-up session has expired. Return to the app and open it again.']);
    }

    if ((int) ($user['is_locked'] ?? 0) === 1) {
        jsonResponse(423, ['ok' => false, 'error' => 'This account is locked and cannot buy credits right now.']);
    }

    return [$user, $billingToken];
}

function validateRequestedCredits(array $input, array $config): int
{
    $credits = (int) ($input['credits'] ?? 0);
    $billingSettings = resolveBillingSettings($config);
    $minimumCredits = max(1, (int) ($billingSettings['minimum_credits'] ?? 1));
    $maximumCredits = max($minimumCredits, (int) ($billingSettings['maximum_credits'] ?? 5000));

    if ($credits < $minimumCredits || $credits > $maximumCredits) {
        jsonResponse(400, ['ok' => false, 'error' => sprintf('Choose between %d and %d credits.', $minimumCredits, $maximumCredits)]);
    }

    return $credits;
}

function getBillingConfigPayload(array $config, ?PDO $pdo = null): array
{
    $billingSettings = $pdo ? getBillingSettings($pdo, $config) : resolveBillingSettings($config);
    $creditsPerGbp = max(1, (int) ($billingSettings['credits_per_gbp'] ?? 10));
    return [
        'creditsPerGbp' => $creditsPerGbp,
        'gbpPerCredit' => number_format(1 / $creditsPerGbp, 2, '.', ''),
        'currency' => strtoupper((string) ($billingSettings['currency'] ?? 'GBP')),
        'minimumCredits' => max(1, (int) ($billingSettings['minimum_credits'] ?? 1)),
        'maximumCredits' => max(1, (int) ($billingSettings['maximum_credits'] ?? 5000)),
    ];
}

function resolveBillingSettings(array $config): array
{
    return [
        'credits_per_gbp' => max(1, (int) (($config['billing']['credits_per_gbp'] ?? 10))),
        'currency' => strtoupper((string) (($config['billing']['currency'] ?? 'GBP'))),
        'minimum_credits' => max(1, (int) (($config['billing']['minimum_credits'] ?? 1))),
        'maximum_credits' => max(1, (int) (($config['billing']['maximum_credits'] ?? 5000))),
        'topup_session_expiry_minutes' => max(5, (int) (($config['billing']['topup_session_expiry_minutes'] ?? 20))),
    ];
}

function seedDefaultBillingSettings(PDO $pdo, array $config): void
{
    foreach (resolveBillingSettings($config) as $key => $value) {
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

function getBillingSettings(PDO $pdo, array $config): array
{
    $settings = resolveBillingSettings($config);
    $statement = $pdo->query('SELECT setting_key, setting_value FROM auth_billing_settings');
    foreach ($statement->fetchAll() as $row) {
        $settings[(string) $row['setting_key']] = (string) $row['setting_value'];
    }

    $settings['credits_per_gbp'] = max(1, (int) ($settings['credits_per_gbp'] ?? 10));
    $settings['currency'] = strtoupper((string) ($settings['currency'] ?? 'GBP'));
    $settings['minimum_credits'] = max(1, (int) ($settings['minimum_credits'] ?? 1));
    $settings['maximum_credits'] = max((int) $settings['minimum_credits'], (int) ($settings['maximum_credits'] ?? 5000));
    $settings['signup_credits'] = max(0, (int) ($settings['signup_credits'] ?? 5));
    $settings['topup_session_expiry_minutes'] = max(5, (int) ($settings['topup_session_expiry_minutes'] ?? 20));

    return $settings;
}

function findPromoCode(PDO $pdo, string $code): ?array
{
    $normalizedCode = strtoupper(trim($code));
    if ($normalizedCode === '') {
        return null;
    }

    $statement = $pdo->prepare('SELECT * FROM auth_promo_codes WHERE code = :code LIMIT 1');
    $statement->execute([':code' => $normalizedCode]);
    $promo = $statement->fetch();
    return $promo ?: null;
}

function validatePromoCodeForCredits(PDO $pdo, ?string $promoCode, int $credits): ?array
{
    $normalizedCode = strtoupper(trim((string) $promoCode));
    if ($normalizedCode === '') {
        return null;
    }

    $promo = findPromoCode($pdo, $normalizedCode);
    if (!$promo) {
        jsonResponse(400, ['ok' => false, 'error' => 'Promo code not found.']);
    }

    if ((int) ($promo['is_active'] ?? 0) !== 1) {
        jsonResponse(400, ['ok' => false, 'error' => 'This promo code is not active.']);
    }

    $expiresAt = trim((string) ($promo['expires_at'] ?? ''));
    if ($expiresAt !== '' && strtotime($expiresAt) !== false && strtotime($expiresAt) < time()) {
        jsonResponse(400, ['ok' => false, 'error' => 'This promo code has expired.']);
    }

    if ($credits < max(1, (int) ($promo['minimum_credits'] ?? 1))) {
        jsonResponse(400, ['ok' => false, 'error' => sprintf('This promo code requires at least %d credits.', (int) $promo['minimum_credits'])]);
    }

    $maxRedemptions = $promo['maximum_redemptions'] !== null ? (int) $promo['maximum_redemptions'] : null;
    if ($maxRedemptions !== null && (int) ($promo['redeemed_count'] ?? 0) >= $maxRedemptions) {
        jsonResponse(400, ['ok' => false, 'error' => 'This promo code has reached its maximum number of uses.']);
    }

    return $promo;
}

function applyPromoDiscount(string $baseAmount, ?array $promo): array
{
    $base = (float) $baseAmount;
    if (!$promo) {
        return [
            'baseAmount' => number_format($base, 2, '.', ''),
            'discountAmount' => '0.00',
            'finalAmount' => number_format($base, 2, '.', ''),
            'promoCode' => '',
            'promoLabel' => '',
        ];
    }

    $discountType = (string) ($promo['discount_type'] ?? 'percent');
    $discountValue = (float) ($promo['discount_value'] ?? 0);
    $discount = 0.0;
    if ($discountType === 'fixed_gbp') {
        $discount = $discountValue;
    } else {
        $discount = $base * ($discountValue / 100);
    }

    $discount = min($base, max(0.0, $discount));
    $final = max(0.01, $base - $discount);

    return [
        'baseAmount' => number_format($base, 2, '.', ''),
        'discountAmount' => number_format($discount, 2, '.', ''),
        'finalAmount' => number_format($final, 2, '.', ''),
        'promoCode' => (string) ($promo['code'] ?? ''),
        'promoLabel' => $discountType === 'fixed_gbp'
            ? sprintf('£%s off', number_format($discountValue, 2, '.', ''))
            : sprintf('%s%% off', number_format($discountValue, 2, '.', '')),
    ];
}

function getPayPalPublicConfig(array $config): array
{
    return [
        'environment' => strtolower((string) (($config['paypal']['environment'] ?? 'live'))),
        'clientId' => (string) (($config['paypal']['client_id'] ?? '')),
        'brandName' => (string) (($config['paypal']['brand_name'] ?? ($config['app']['name'] ?? 'Stream Sync Pro LIVE'))),
    ];
}

function formatCreditsAmount(int $credits, int $creditsPerGbp): string
{
    return number_format($credits / $creditsPerGbp, 2, '.', '');
}

function getSiteBaseUrl(): string
{
    $https = !empty($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off';
    $scheme = $https ? 'https' : 'http';
    $host = (string) ($_SERVER['HTTP_HOST'] ?? 'localhost');
    return $scheme . '://' . $host;
}

function getPayPalBaseUrl(array $config): string
{
    $environment = strtolower((string) (($config['paypal']['environment'] ?? 'live')));
    return $environment === 'sandbox'
        ? 'https://api-m.sandbox.paypal.com'
        : 'https://api-m.paypal.com';
}

function getPayPalAccessToken(array $config): string
{
    $clientId = trim((string) (($config['paypal']['client_id'] ?? '')));
    $clientSecret = trim((string) (($config['paypal']['client_secret'] ?? '')));
    if ($clientId === '' || $clientSecret === '') {
        throw new RuntimeException('PayPal is not configured yet. Add your PayPal client id and secret to api/config.php.');
    }

    $response = paypalRawRequest(
        getPayPalBaseUrl($config) . '/v1/oauth2/token',
        'POST',
        [
            'Accept: application/json',
            'Accept-Language: en_US',
            'Authorization: Basic ' . base64_encode($clientId . ':' . $clientSecret),
            'Content-Type: application/x-www-form-urlencoded',
        ],
        'grant_type=client_credentials'
    );

    if ($response['status'] < 200 || $response['status'] >= 300) {
        throw new RuntimeException('Unable to authenticate with PayPal right now.');
    }

    $decoded = json_decode($response['body'], true);
    $accessToken = trim((string) ($decoded['access_token'] ?? ''));
    if ($accessToken === '') {
        throw new RuntimeException('PayPal access token was missing from the response.');
    }

    return $accessToken;
}

function paypalApiRequest(array $config, string $accessToken, string $method, string $path, $payload = null): array
{
    $body = $payload === null ? null : json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    $response = paypalRawRequest(
        getPayPalBaseUrl($config) . $path,
        $method,
        [
            'Accept: application/json',
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json',
            'PayPal-Request-Id: ' . bin2hex(random_bytes(12)),
        ],
        $body
    );

    $decoded = json_decode($response['body'], true);
    if ($response['status'] < 200 || $response['status'] >= 300) {
        $errorMessage = trim((string) ($decoded['message'] ?? $decoded['error_description'] ?? 'PayPal request failed.'));
        throw new RuntimeException($errorMessage);
    }

    return is_array($decoded) ? $decoded : [];
}

function paypalRawRequest(string $url, string $method, array $headers, ?string $body): array
{
    if (!function_exists('curl_init')) {
        throw new RuntimeException('PHP cURL is required for PayPal checkout.');
    }

    $handle = curl_init($url);
    curl_setopt_array($handle, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_TIMEOUT => 30,
    ]);

    $responseBody = curl_exec($handle);
    if ($responseBody === false) {
        $error = curl_error($handle);
        curl_close($handle);
        throw new RuntimeException('PayPal connection failed: ' . $error);
    }

    $statusCode = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
    curl_close($handle);

    return [
        'status' => $statusCode,
        'body' => (string) $responseBody,
    ];
}

function findCreditTransactionByOrderId(PDO $pdo, string $provider, string $orderId, bool $forUpdate = false): ?array
{
    $sql = 'SELECT * FROM auth_credit_transactions WHERE provider = :provider AND provider_order_id = :provider_order_id LIMIT 1';
    if ($forUpdate) {
        $sql .= ' FOR UPDATE';
    }

    $statement = $pdo->prepare($sql);
    $statement->execute([
        ':provider' => $provider,
        ':provider_order_id' => $orderId,
    ]);
    $transaction = $statement->fetch();

    return $transaction ?: null;
}

function requireValidConnectSession(PDO $pdo, array $input): array
{
    $sessionToken = trim((string) ($input['sessionToken'] ?? ''));
    $userId = max(0, (int) ($input['userId'] ?? 0));

    if ($sessionToken === '') {
        jsonResponse(401, ['ok' => false, 'error' => 'Please sign in again before connecting.']);
    }

    $sessionTokenHash = hash('sha256', $sessionToken);
    $user = findUserBySessionTokenHash($pdo, $sessionTokenHash);

    if (!$user) {
        $forcedLogoutUser = findUserByForcedLogoutTokenHash($pdo, $sessionTokenHash, $userId);
        if ($forcedLogoutUser) {
            $forcedLogoutPayload = buildForcedLogoutResponse($forcedLogoutUser);
            jsonResponse(401, [
                'ok' => false,
                'code' => $forcedLogoutPayload['code'],
                'error' => $forcedLogoutPayload['message'],
            ]);
        }
        jsonResponse(401, ['ok' => false, 'error' => 'Your session is invalid. Please sign in again.']);
    }

    if ((int) ($user['is_locked'] ?? 0) === 1) {
        $reason = trim((string) ($user['locked_reason'] ?? ''));
        $message = 'This account has been locked. Please contact admin.';
        if ($reason !== '') {
            $message .= ' Reason: ' . $reason;
        }
        clearUserActiveSession($pdo, (int) $user['id'], $sessionTokenHash, 'account_locked');
        jsonResponse(423, ['ok' => false, 'code' => 'account_locked', 'error' => $message]);
    }

    $expectedHash = (string) ($user['session_token_hash'] ?? '');
    $expectedExpiry = (string) ($user['session_token_expires_at'] ?? '');

    if ($expectedHash === '' || $expectedExpiry === '' || strtotime($expectedExpiry) < time()) {
        jsonResponse(401, ['ok' => false, 'error' => 'Your session has expired. Please sign in again.']);
    }

    if (!hash_equals($expectedHash, $sessionTokenHash)) {
        jsonResponse(401, ['ok' => false, 'error' => 'Your session is invalid. Please sign in again.']);
    }

    return [$user, $sessionToken];
}

function hasAnotherActiveConnection(array $user, string $sessionTokenHash): bool
{
    $activeConnectionTokenHash = (string) ($user['active_connection_token_hash'] ?? '');
    if ($activeConnectionTokenHash === '') {
        return false;
    }

    return !hash_equals($activeConnectionTokenHash, $sessionTokenHash);
}

function clearUserActiveSession(PDO $pdo, int $userId, string $sessionTokenHash = '', ?string $forcedLogoutReason = 'admin_forced_sign_out'): void
{
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
        ':forced_logout_token_hash' => $sessionTokenHash !== '' ? $sessionTokenHash : null,
        ':forced_logout_reason' => $sessionTokenHash !== '' ? $forcedLogoutReason : null,
        ':forced_logout_at' => gmdate('Y-m-d H:i:s'),
        ':id' => $userId,
    ]);
}

function buildForcedLogoutResponse(array $user): array
{
    $reason = trim((string) ($user['forced_logout_reason'] ?? ''));
    $lockedReason = trim((string) ($user['locked_reason'] ?? ''));

    return match ($reason) {
        'signed_in_elsewhere' => [
            'code' => 'signed_in_elsewhere',
            'message' => 'You were signed out because this account was signed in on another device.',
        ],
        'account_locked' => [
            'code' => 'account_locked',
            'message' => $lockedReason !== ''
                ? 'This account has been locked. Please contact admin. Reason: ' . $lockedReason
                : 'This account has been locked. Please contact admin.',
        ],
        default => [
            'code' => 'admin_forced_sign_out',
            'message' => 'Your session was ended by an administrator. The app will close now.',
        ],
    };
}

function handleForgotPassword(PDO $pdo, array $config, array $input): void
{
    $email = normalizeEmail((string) ($input['email'] ?? ''));

    if ($email === '') {
        jsonResponse(400, ['ok' => false, 'error' => 'Email is required.']);
    }

    $user = findUserByEmail($pdo, $email);

    if ($user) {
        $code = createNumericCode();
        $codeHash = hash('sha256', $code);
        $expiresAt = createExpiryTimestamp((int) (($config['app']['reset_expiry_minutes'] ?? 15)));

        $statement = $pdo->prepare(
            'UPDATE auth_users
             SET password_reset_code_hash = :password_reset_code_hash,
                 password_reset_expires_at = :password_reset_expires_at
             WHERE id = :id'
        );
        $statement->execute([
            ':password_reset_code_hash' => $codeHash,
            ':password_reset_expires_at' => $expiresAt,
            ':id' => (int) $user['id'],
        ]);
        logAuditEvent(
            $pdo,
            (int) $user['id'],
            'password_reset_requested',
            'Password reset requested.',
            (int) ($user['credits'] ?? 0)
        );

        sendCodeEmail(
            $config,
            $email,
            'Reset your password',
            'Use this code to reset your Stream Sync Pro LIVE password:',
            $code
        );
    }

    jsonResponse(200, [
        'ok' => true,
        'message' => 'If that email exists, a reset code has been sent.',
    ]);
}

function handleResetPassword(PDO $pdo, array $input): void
{
    $email = normalizeEmail((string) ($input['email'] ?? ''));
    $code = trim((string) ($input['code'] ?? ''));
    $newPassword = (string) ($input['newPassword'] ?? '');

    if ($email === '' || $code === '' || $newPassword === '') {
        jsonResponse(400, ['ok' => false, 'error' => 'Email, code, and new password are required.']);
    }

    if (strlen($newPassword) < 8) {
        jsonResponse(400, ['ok' => false, 'error' => 'Password must be at least 8 characters long.']);
    }

    $user = findUserByEmail($pdo, $email);

    if (!$user) {
        jsonResponse(404, ['ok' => false, 'error' => 'No account found for that email.']);
    }

    if (empty($user['password_reset_code_hash']) || empty($user['password_reset_expires_at'])) {
        jsonResponse(400, ['ok' => false, 'error' => 'No active reset code found.']);
    }

    if (strtotime((string) $user['password_reset_expires_at']) < time()) {
        jsonResponse(400, ['ok' => false, 'error' => 'Reset code has expired.']);
    }

    if (!hash_equals((string) $user['password_reset_code_hash'], hash('sha256', $code))) {
        jsonResponse(400, ['ok' => false, 'error' => 'Reset code is incorrect.']);
    }

    $statement = $pdo->prepare(
        'UPDATE auth_users
         SET password_hash = :password_hash,
             password_reset_code_hash = NULL,
             password_reset_expires_at = NULL
         WHERE id = :id'
    );
    $statement->execute([
        ':password_hash' => password_hash($newPassword, PASSWORD_DEFAULT),
        ':id' => (int) $user['id'],
    ]);
    logAuditEvent(
        $pdo,
        (int) $user['id'],
        'password_reset_completed',
        'Password reset completed.',
        (int) ($user['credits'] ?? 0)
    );

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Password reset successfully.',
    ]);
}

function handleContactSubmit(PDO $pdo, array $config, array $input): void
{
    $name = trim((string) ($input['name'] ?? ''));
    $email = normalizeEmail((string) ($input['email'] ?? ''));
    $topic = trim((string) ($input['topic'] ?? ''));
    $messageBody = trim((string) ($input['message'] ?? ''));

    $allowedTopics = [
        'general',
        'app_support',
        'billing',
        'account_help',
        'bug_report',
        'feature_request',
        'partnership',
        'other',
    ];

    if ($name === '' || $email === '' || $topic === '' || $messageBody === '') {
        jsonResponse(400, ['ok' => false, 'error' => 'Name, email, topic, and message are required.']);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(400, ['ok' => false, 'error' => 'Enter a valid email address.']);
    }

    if (!in_array($topic, $allowedTopics, true)) {
        jsonResponse(400, ['ok' => false, 'error' => 'Choose a valid contact topic.']);
    }

    if (mb_strlen($messageBody) < 10) {
        jsonResponse(400, ['ok' => false, 'error' => 'Please enter a fuller message so support can help properly.']);
    }

    $topicLabels = [
        'general' => 'General enquiry',
        'app_support' => 'App support',
        'billing' => 'Billing',
        'account_help' => 'Account help',
        'bug_report' => 'Bug report',
        'feature_request' => 'Feature request',
        'partnership' => 'Partnership',
        'other' => 'Other',
    ];
    $resolvedSubject = $topicLabels[$topic] ?? 'Website contact';

    $statement = $pdo->prepare(
        'INSERT INTO auth_contact_messages (
            name,
            email,
            topic,
            subject,
            message_body,
            ip_address
         ) VALUES (
            :name,
            :email,
            :topic,
            :subject,
            :message_body,
            :ip_address
         )'
    );
    $statement->execute([
        ':name' => mb_substr($name, 0, 120),
        ':email' => mb_substr($email, 0, 255),
        ':topic' => mb_substr($topic, 0, 80),
        ':subject' => mb_substr($resolvedSubject, 0, 255),
        ':message_body' => $messageBody,
        ':ip_address' => resolveClientIp(),
    ]);

    sendContactEmail($config, [
        'name' => $name,
        'email' => $email,
        'topic' => $topic,
        'subject' => $resolvedSubject,
        'message' => $messageBody,
    ]);

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Thanks, your message has been sent. We will review it as soon as possible.',
    ]);
}

function findUserByEmail(PDO $pdo, string $email): ?array
{
    $statement = $pdo->prepare('SELECT * FROM auth_users WHERE email = :email LIMIT 1');
    $statement->execute([':email' => $email]);
    $user = $statement->fetch();

    return $user ?: null;
}

function findUserById(PDO $pdo, int $id): ?array
{
    $statement = $pdo->prepare('SELECT * FROM auth_users WHERE id = :id LIMIT 1');
    $statement->execute([':id' => $id]);
    $user = $statement->fetch();

    return $user ?: null;
}

function findUserBySessionTokenHash(PDO $pdo, string $sessionTokenHash): ?array
{
    $statement = $pdo->prepare('SELECT * FROM auth_users WHERE session_token_hash = :session_token_hash LIMIT 1');
    $statement->execute([':session_token_hash' => $sessionTokenHash]);
    $user = $statement->fetch();

    return $user ?: null;
}

function findUserByForcedLogoutTokenHash(PDO $pdo, string $sessionTokenHash, int $userId = 0): ?array
{
    if ($userId > 0) {
        $statement = $pdo->prepare(
            'SELECT * FROM auth_users
             WHERE id = :id AND forced_logout_token_hash = :forced_logout_token_hash
             LIMIT 1'
        );
        $statement->execute([
            ':id' => $userId,
            ':forced_logout_token_hash' => $sessionTokenHash,
        ]);
        $user = $statement->fetch();
        if ($user) {
            return $user;
        }
    }

    $statement = $pdo->prepare(
        'SELECT * FROM auth_users
         WHERE forced_logout_token_hash = :forced_logout_token_hash
         LIMIT 1'
    );
    $statement->execute([':forced_logout_token_hash' => $sessionTokenHash]);
    $user = $statement->fetch();

    return $user ?: null;
}

function requireValidQueueOverlayToken(PDO $pdo, string $overlayToken): array
{
    if ($overlayToken === '') {
        jsonResponse(401, ['ok' => false, 'error' => 'Overlay token is missing. Reopen the overlay URL from the app.']);
    }

    $overlayTokenHash = hash('sha256', $overlayToken);
    $statement = $pdo->prepare(
        'SELECT
            s.*,
            u.id AS auth_user_id,
            u.email,
            u.display_name,
            u.is_verified,
            u.is_locked,
            u.credits,
            u.locked_reason
         FROM auth_user_overlay_state s
         INNER JOIN auth_users u ON u.id = s.user_id
         WHERE s.overlay_token_hash = :overlay_token_hash
           AND s.overlay_token_expires_at IS NOT NULL
         LIMIT 1'
    );
    $statement->execute([':overlay_token_hash' => $overlayTokenHash]);
    $overlayState = $statement->fetch();

    if (!$overlayState) {
        jsonResponse(401, ['ok' => false, 'error' => 'This overlay link is invalid or has expired.']);
    }

    if (strtotime((string) ($overlayState['overlay_token_expires_at'] ?? '')) < time()) {
        jsonResponse(401, ['ok' => false, 'error' => 'This overlay link has expired. Reopen it from the app.']);
    }

    $user = [
        'id' => (int) ($overlayState['auth_user_id'] ?? 0),
        'email' => (string) ($overlayState['email'] ?? ''),
        'display_name' => (string) ($overlayState['display_name'] ?? ''),
        'is_verified' => (int) ($overlayState['is_verified'] ?? 0),
        'is_locked' => (int) ($overlayState['is_locked'] ?? 0),
        'credits' => (int) ($overlayState['credits'] ?? 0),
        'locked_reason' => (string) ($overlayState['locked_reason'] ?? ''),
    ];

    if ((int) ($user['is_locked'] ?? 0) === 1) {
        jsonResponse(423, ['ok' => false, 'error' => 'This account is locked and its overlay is unavailable.']);
    }

    return [$user, $overlayState];
}

function defaultQueueOverlayState(): array
{
    return [
        'connected' => false,
        'username' => '',
        'queueCount' => 0,
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'items' => [],
    ];
}

function defaultCommandFeedbackOverlayState(): array
{
    return [
        'message' => '',
        'commandType' => '',
        'username' => '',
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'visibleUntil' => '',
        'durationMs' => 6000,
    ];
}

function sanitizeQueueOverlayStatePayload(array $payload): array
{
    $items = [];

    if (isset($payload['items']) && is_array($payload['items'])) {
        foreach (array_slice($payload['items'], 0, 20) as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $items[] = [
                'id' => trim((string) ($item['id'] ?? ('queue-item-' . $index))),
                'label' => trim((string) ($item['label'] ?? 'Queued action')) ?: 'Queued action',
                'queueId' => max(1, min(10, (int) ($item['queueId'] ?? 1))),
                'kind' => (($item['kind'] ?? '') === 'tts') ? 'tts' : 'action',
                'status' => (($item['status'] ?? '') === 'running') ? 'running' : 'queued',
            ];
        }
    }

    return [
        'connected' => !empty($payload['connected']),
        'username' => trim((string) ($payload['username'] ?? '')),
        'queueCount' => max(0, (int) ($payload['queueCount'] ?? count($items))),
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'items' => $items,
    ];
}

function sanitizeCommandFeedbackOverlayStatePayload(array $payload): array
{
    $durationMs = max(1000, (int) ($payload['durationMs'] ?? 6000));
    $visibleUntil = trim((string) ($payload['visibleUntil'] ?? ''));
    if ($visibleUntil === '') {
        $visibleUntil = gmdate('Y-m-d H:i:s', time() + (int) ceil($durationMs / 1000));
    }

    return [
        'message' => trim((string) ($payload['message'] ?? '')),
        'commandType' => trim((string) ($payload['commandType'] ?? '')),
        'username' => trim((string) ($payload['username'] ?? '')),
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'visibleUntil' => $visibleUntil,
        'durationMs' => $durationMs,
    ];
}

function normalizeEmail(string $email): string
{
    return strtolower(trim($email));
}

function createNumericCode(): string
{
    return (string) random_int(100000, 999999);
}

function createExpiryTimestamp(int $minutesFromNow): string
{
    return gmdate('Y-m-d H:i:s', time() + ($minutesFromNow * 60));
}

function verifyPassword(string $password, string $hash): bool
{
    if ($hash === '') {
        return false;
    }

    if (password_verify($password, $hash)) {
        return true;
    }

    if (str_starts_with($hash, '$2b$')) {
        return password_verify($password, '$2y$' . substr($hash, 4));
    }

    if (str_starts_with($hash, '$2y$')) {
        return password_verify($password, '$2b$' . substr($hash, 4));
    }

    return false;
}

function sanitizeUser(array $user, ?string $sessionToken = null): array
{
    $payload = [
        'id' => (int) $user['id'],
        'email' => (string) $user['email'],
        'displayName' => (string) $user['display_name'],
        'isVerified' => (int) $user['is_verified'] === 1,
        'isLocked' => (int) ($user['is_locked'] ?? 0) === 1,
        'debugEnabled' => (int) ($user['debug_enabled'] ?? 0) === 1,
        'credits' => (int) ($user['credits'] ?? 0),
        'createdAt' => (string) $user['created_at'],
    ];

    if ($sessionToken !== null) {
        $payload['sessionToken'] = $sessionToken;
    }

    return $payload;
}

function logAuditEvent(
    PDO $pdo,
    int $userId,
    string $eventType,
    string $eventDescription,
    ?int $remainingCredits = null,
    array $metadata = []
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
        ':metadata_json' => $metadata ? json_encode($metadata, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) : null,
        ':ip_address' => resolveClientIp(),
    ]);
}

function resolveClientIp(): ?string
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
        $value = trim((string) ($_SERVER[$key] ?? ''));
        if ($value === '') {
            continue;
        }

        if ($key === 'HTTP_X_FORWARDED_FOR') {
            $parts = array_map('trim', explode(',', $value));
            return $parts[0] !== '' ? $parts[0] : null;
        }

        return $value;
    }

    return null;
}

function sendCodeEmail(array $config, string $recipient, string $subject, string $intro, string $code): void
{
    $fromEmail = (string) ($config['mail']['from_email'] ?? '');
    $fromName = (string) ($config['mail']['from_name'] ?? 'Stream Sync Pro');
    $appName = (string) ($config['app']['name'] ?? 'Stream Sync Pro');

    if ($fromEmail === '') {
        throw new RuntimeException('Mail sender address is missing in config.php.');
    }

    $textBody = implode("\n\n", [
        $intro,
        $code,
        'If you did not request this, you can ignore this email.',
    ]);
    $htmlBody = renderBrandedEmailHtml($appName, [
        'eyebrow' => 'Account Security',
        'title' => $subject,
        'intro' => $intro,
        'code' => $code,
        'sections' => [],
        'footnote' => 'If you did not request this, you can safely ignore this email.',
    ]);

    $sent = sendBrandedEmail(
        $recipient,
        $subject,
        $textBody,
        $htmlBody,
        [
            'fromEmail' => $fromEmail,
            'fromName' => $fromName,
        ]
    );

    if (!$sent) {
        throw new RuntimeException('Email could not be sent. Your hosting mail() setup may need to be configured.');
    }
}

function sendContactEmail(array $config, array $payload): void
{
    $fromEmail = (string) ($config['mail']['from_email'] ?? '');
    $fromName = (string) ($config['mail']['from_name'] ?? 'Stream Sync Pro');
    $toEmail = (string) ($config['contact']['to_email'] ?? $fromEmail);
    $toName = (string) ($config['contact']['to_name'] ?? 'Stream Sync Pro Support');
    $appName = (string) ($config['app']['name'] ?? 'Stream Sync Pro');

    if ($fromEmail === '' || $toEmail === '') {
        throw new RuntimeException('Contact email routing is missing in config.php.');
    }

    $topicLabels = [
        'general' => 'General enquiry',
        'app_support' => 'App support',
        'billing' => 'Billing',
        'account_help' => 'Account help',
        'bug_report' => 'Bug report',
        'feature_request' => 'Feature request',
        'partnership' => 'Partnership',
        'other' => 'Other',
    ];
    $topic = (string) ($payload['topic'] ?? 'other');
    $topicLabel = $topicLabels[$topic] ?? 'Other';
    $senderName = (string) ($payload['name'] ?? '');
    $senderEmail = (string) ($payload['email'] ?? '');
    $messageText = (string) ($payload['message'] ?? '');

    $subject = sprintf('[%s] %s', $topicLabel, (string) ($payload['subject'] ?? 'Website contact'));
    $textBody = implode("\n", [
        'A new website contact form message has been submitted.',
        '',
        'Name: ' . $senderName,
        'Email: ' . $senderEmail,
        'Topic: ' . $topicLabel,
        '',
        'Message:',
        $messageText,
    ]);
    $htmlBody = renderBrandedEmailHtml($appName, [
        'eyebrow' => 'Website Contact',
        'title' => $subject,
        'intro' => 'A new contact form message has been submitted through your website.',
        'sections' => [
            ['label' => 'Name', 'value' => $senderName],
            ['label' => 'Email', 'value' => $senderEmail],
            ['label' => 'Topic', 'value' => $topicLabel],
            ['label' => 'Message', 'value' => $messageText, 'multiline' => true],
        ],
        'footnote' => 'Reply directly to this email to respond to the sender.',
    ]);

    $sent = sendBrandedEmail(
        $toEmail,
        $subject,
        $textBody,
        $htmlBody,
        [
            'toName' => $toName,
            'fromEmail' => $fromEmail,
            'fromName' => $fromName,
            'replyToEmail' => $senderEmail !== '' ? $senderEmail : $fromEmail,
            'replyToName' => $senderName !== '' ? $senderName : 'Website user',
        ]
    );

    if (!$sent) {
        throw new RuntimeException('Contact email could not be sent. Your hosting mail() setup may need to be configured.');
    }
}

function sendBrandedEmail(string $toEmail, string $subject, string $textBody, string $htmlBody, array $options = []): bool
{
    $toName = trim((string) ($options['toName'] ?? ''));
    $fromEmail = trim((string) ($options['fromEmail'] ?? ''));
    $fromName = trim((string) ($options['fromName'] ?? 'Stream Sync Pro'));
    $replyToEmail = trim((string) ($options['replyToEmail'] ?? ''));
    $replyToName = trim((string) ($options['replyToName'] ?? ''));

    $boundary = 'ssp_' . bin2hex(random_bytes(12));
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'From: ' . sprintf('%s <%s>', $fromName, $fromEmail),
        'X-Mailer: PHP/' . PHP_VERSION,
    ];

    if ($toName !== '') {
        $headers[] = 'To: ' . sprintf('%s <%s>', $toName, $toEmail);
    }

    if ($replyToEmail !== '') {
        $displayReplyName = $replyToName !== '' ? $replyToName : $replyToEmail;
        $headers[] = 'Reply-To: ' . sprintf('%s <%s>', $displayReplyName, $replyToEmail);
    }

    $body = implode("\r\n", [
        '--' . $boundary,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        '',
        $textBody,
        '',
        '--' . $boundary,
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        '',
        $htmlBody,
        '',
        '--' . $boundary . '--',
    ]);

    return mail($toEmail, $subject, $body, implode("\r\n", $headers));
}

function renderBrandedEmailHtml(string $appName, array $payload): string
{
    $eyebrow = htmlspecialchars((string) ($payload['eyebrow'] ?? 'Notification'), ENT_QUOTES, 'UTF-8');
    $title = htmlspecialchars((string) ($payload['title'] ?? $appName), ENT_QUOTES, 'UTF-8');
    $intro = nl2br(htmlspecialchars((string) ($payload['intro'] ?? ''), ENT_QUOTES, 'UTF-8'));
    $code = trim((string) ($payload['code'] ?? ''));
    $sections = is_array($payload['sections'] ?? null) ? $payload['sections'] : [];
    $footnote = htmlspecialchars((string) ($payload['footnote'] ?? ''), ENT_QUOTES, 'UTF-8');
    $safeAppName = htmlspecialchars($appName, ENT_QUOTES, 'UTF-8');
    $logoUrl = htmlspecialchars((string) ($payload['logoUrl'] ?? 'https://streamsyncpro.co.uk/assets/SSP.png'), ENT_QUOTES, 'UTF-8');

    $sectionsHtml = '';
    foreach ($sections as $section) {
        $label = htmlspecialchars((string) ($section['label'] ?? ''), ENT_QUOTES, 'UTF-8');
        $value = (string) ($section['value'] ?? '');
        $isMultiline = !empty($section['multiline']);
        $renderedValue = $isMultiline
            ? nl2br(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'))
            : htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
        $valueClass = $isMultiline ? 'email-detail-value email-detail-value--multiline' : 'email-detail-value';
        $sectionsHtml .= <<<HTML
          <div class="email-detail">
            <div class="email-detail-label">{$label}</div>
            <div class="{$valueClass}">{$renderedValue}</div>
          </div>
HTML;
    }

    $codeHtml = '';
    if ($code !== '') {
        $safeCode = htmlspecialchars($code, ENT_QUOTES, 'UTF-8');
        $codeHtml = <<<HTML
          <div class="email-code-wrap">
            <div class="email-code-label">Verification code</div>
            <div class="email-code">{$safeCode}</div>
          </div>
HTML;
    }

    $footnoteHtml = '';
    if ($footnote !== '') {
        $footnoteHtml = <<<HTML
          <p class="email-footnote">{$footnote}</p>
HTML;
    }

    return <<<HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{$title}</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background:
          radial-gradient(circle at top left, rgba(77, 231, 255, 0.12), transparent 32%),
          radial-gradient(circle at top right, rgba(144, 104, 255, 0.14), transparent 24%),
          linear-gradient(180deg, #081122 0%, #050915 45%, #02050d 100%);
        font-family: Inter, Arial, sans-serif;
        color: #eaf2ff;
      }
      .email-shell {
        width: 100%;
        padding: 32px 16px;
      }
      .email-card {
        max-width: 680px;
        margin: 0 auto;
        border: 1px solid rgba(97, 160, 255, 0.22);
        border-radius: 28px;
        background: rgba(8, 14, 28, 0.96);
        box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55);
        overflow: hidden;
      }
      .email-head {
        padding: 24px 28px 22px;
        border-bottom: 1px solid rgba(97, 160, 255, 0.18);
        background:
          radial-gradient(circle at top, rgba(18, 35, 68, 0.18), transparent 52%),
          linear-gradient(180deg, rgba(9, 17, 33, 0.98), rgba(7, 13, 24, 0.88));
      }
      .email-brand {
        display: flex;
        align-items: center;
        gap: 14px;
        font-family: "Space Grotesk", Inter, Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -0.02em;
        margin: 0 0 6px;
      }
      .email-brand-logo {
        width: 56px;
        height: 56px;
        object-fit: contain;
        display: block;
        filter: drop-shadow(0 0 14px rgba(77, 231, 255, 0.18));
      }
      .email-brand-name {
        display: block;
      }
      .email-eyebrow {
        margin: 0;
        color: #4de7ff;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .email-body {
        padding: 28px;
      }
      .email-title {
        margin: 0 0 12px;
        font-size: 28px;
        line-height: 1.12;
        letter-spacing: -0.03em;
      }
      .email-intro {
        margin: 0 0 22px;
        color: #a7b9d6;
        font-size: 16px;
        line-height: 1.75;
      }
      .email-code-wrap {
        margin: 0 0 22px;
        padding: 18px 20px;
        border: 1px solid rgba(89, 170, 255, 0.14);
        border-radius: 20px;
        background:
          linear-gradient(180deg, rgba(10, 17, 31, 0.88), rgba(8, 14, 25, 0.76));
      }
      .email-code-label {
        margin: 0 0 8px;
        color: #a7b9d6;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .email-code {
        font-family: "Space Grotesk", Inter, Arial, sans-serif;
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 0.12em;
        color: #ffffff;
      }
      .email-details {
        display: grid;
        gap: 12px;
      }
      .email-detail {
        padding: 16px 18px;
        border: 1px solid rgba(89, 170, 255, 0.13);
        border-radius: 18px;
        background:
          linear-gradient(180deg, rgba(10, 17, 31, 0.88), rgba(8, 14, 25, 0.76));
      }
      .email-detail-label {
        margin: 0 0 8px;
        color: #a7b9d6;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .email-detail-value {
        color: #eaf2ff;
        font-size: 15px;
        line-height: 1.65;
      }
      .email-detail-value--multiline {
        white-space: normal;
      }
      .email-footnote {
        margin: 22px 0 0;
        color: #a7b9d6;
        font-size: 14px;
        line-height: 1.7;
      }
      .email-footer {
        padding: 0 28px 26px;
        color: #7f96bb;
        font-size: 13px;
        line-height: 1.7;
      }
      @media only screen and (max-width: 640px) {
        .email-head,
        .email-body,
        .email-footer {
          padding-left: 20px;
          padding-right: 20px;
        }
        .email-brand-logo {
          width: 48px;
          height: 48px;
        }
        .email-title {
          font-size: 24px;
        }
        .email-code {
          font-size: 26px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-shell">
      <div class="email-card">
        <div class="email-head">
          <p class="email-eyebrow">{$eyebrow}</p>
          <h1 class="email-brand">
            <img class="email-brand-logo" src="{$logoUrl}" alt="{$safeAppName} logo" />
            <span class="email-brand-name">{$safeAppName}</span>
          </h1>
        </div>
        <div class="email-body">
          <h2 class="email-title">{$title}</h2>
          <p class="email-intro">{$intro}</p>
          {$codeHtml}
          <div class="email-details">{$sectionsHtml}</div>
          {$footnoteHtml}
        </div>
        <div class="email-footer">
          This message was sent by {$safeAppName}. If you need help, use the contact options on the website.
        </div>
      </div>
    </div>
  </body>
</html>
HTML;
}

function jsonResponse(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}
