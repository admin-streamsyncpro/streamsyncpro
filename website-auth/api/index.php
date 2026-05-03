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
    ensureSchema($pdo);
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
            active_connection_token_hash VARCHAR(255) NULL,
            active_connection_started_at DATETIME NULL,
            forced_logout_token_hash VARCHAR(255) NULL,
            forced_logout_at DATETIME NULL,
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
    ensureColumn($pdo, 'auth_users', 'active_connection_token_hash', 'ALTER TABLE auth_users ADD COLUMN active_connection_token_hash VARCHAR(255) NULL AFTER session_token_expires_at');
    ensureColumn($pdo, 'auth_users', 'active_connection_started_at', 'ALTER TABLE auth_users ADD COLUMN active_connection_started_at DATETIME NULL AFTER active_connection_token_hash');
    ensureColumn($pdo, 'auth_users', 'forced_logout_token_hash', 'ALTER TABLE auth_users ADD COLUMN forced_logout_token_hash VARCHAR(255) NULL AFTER active_connection_started_at');
    ensureColumn($pdo, 'auth_users', 'forced_logout_at', 'ALTER TABLE auth_users ADD COLUMN forced_logout_at DATETIME NULL AFTER forced_logout_token_hash');
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
            ':credits' => 5,
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
            ':credits' => 5,
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

    $sessionToken = bin2hex(random_bytes(32));
    $sessionTokenHash = hash('sha256', $sessionToken);
    $sessionTokenExpiresAt = createExpiryTimestamp(60 * 24 * 30);

    $statement = $pdo->prepare(
        'UPDATE auth_users
         SET session_token_hash = :session_token_hash,
             session_token_expires_at = :session_token_expires_at,
             forced_logout_token_hash = NULL,
             forced_logout_at = NULL
         WHERE id = :id'
    );
    $statement->execute([
        ':session_token_hash' => $sessionTokenHash,
        ':session_token_expires_at' => $sessionTokenExpiresAt,
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
    logAuditEvent(
        $pdo,
        (int) $user['id'],
        'connect',
        'Connected to TikTok LIVE.',
        (int) ($updatedUser['credits'] ?? 0)
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
        jsonResponse(200, [
            'ok' => true,
            'active' => false,
            'code' => 'admin_forced_sign_out',
            'message' => 'Your session was ended by an administrator. The app will close now.',
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

    logAuditEvent(
        $pdo,
        (int) $user['id'],
        $eventType,
        $allowedEvents[$eventType],
        (int) ($user['credits'] ?? 0)
    );

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Audit event recorded.',
        'user' => sanitizeUser($user, $sessionToken),
    ]);
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
            jsonResponse(401, [
                'ok' => false,
                'code' => 'admin_forced_sign_out',
                'error' => 'Your session was ended by an administrator. The app will close now.',
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
        jsonResponse(423, ['ok' => false, 'error' => $message]);
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

    if ($fromEmail === '') {
        throw new RuntimeException('Mail sender address is missing in config.php.');
    }

    $body = $intro . "\n\n" . $code . "\n\nIf you did not request this, you can ignore this email.";
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/plain; charset=UTF-8',
        'From: ' . sprintf('%s <%s>', $fromName, $fromEmail),
    ];

    $sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

    if (!$sent) {
        throw new RuntimeException('Email could not be sent. Your hosting mail() setup may need to be configured.');
    }
}

function jsonResponse(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}
