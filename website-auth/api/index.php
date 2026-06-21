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
$localConfigPath = __DIR__ . '/config.local.php';

if (!file_exists($configPath)) {
    jsonResponse(500, [
        'ok' => false,
        'error' => 'Server auth config is missing. Copy config.sample.php to config.php first.',
    ]);
}

$config = require $configPath;
if (file_exists($localConfigPath)) {
    $localConfig = require $localConfigPath;
    if (is_array($localConfig)) {
        $config = array_replace_recursive($config, $localConfig);
    }
}

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
        jsonResponse(200, [
            'ok' => true,
            'service' => 'website-auth',
            'version' => (string) ($config['app']['version'] ?? ''),
        ]);
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/queue-state') {
        handleGetQueueOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/command-feedback-state') {
        handleGetCommandFeedbackOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/joke-state') {
        handleGetJokeOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/chat-state') {
        handleGetChatOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/gift-state') {
        handleGetGiftOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/likes-state') {
        handleGetLikesOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/viewer-stats-state') {
        handleGetViewerStatsOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/vote-state') {
        handleGetVoteOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/like-race-state') {
        handleGetLikeRaceOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/spin-wheel-state') {
        handleGetSpinWheelOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod === 'GET' && $requestPath === '/overlay/progress-bar-state') {
        handleGetProgressBarOverlayState($pdo, $_GET);
        return;
    }

    if ($requestMethod !== 'POST') {
        jsonResponse(404, ['ok' => false, 'error' => 'Not found']);
    }

    $input = isMultipartRequest() ? getMultipartInput() : getJsonInput();

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
        case '/auth/delete-account':
            handleDeleteAccount($pdo, $input);
            return;
        case '/auth/send-referral-email':
            handleSendReferralEmail($pdo, $config, $input);
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
            handleConsumeConnectCredit($pdo, $config, $input);
            return;
        case '/auth/live-connected':
            handleLiveConnectedNotification($pdo, $config, $input);
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
        case '/integrations/voicemod-client':
            handleVoicemodClientConfig($pdo, $config, $input);
            return;
        case '/auth/create-overlay-sessions':
            handleCreateOverlaySessions($pdo, $input);
            return;
        case '/auth/create-queue-overlay-session':
            handleCreateQueueOverlaySession($pdo, $input);
            return;
        case '/auth/create-command-feedback-overlay-session':
            handleCreateCommandFeedbackOverlaySession($pdo, $input);
            return;
        case '/auth/create-chat-overlay-session':
            handleCreateChatOverlaySession($pdo, $input);
            return;
        case '/auth/create-gift-overlay-session':
            handleCreateGiftOverlaySession($pdo, $input);
            return;
        case '/auth/create-likes-overlay-session':
            handleCreateLikesOverlaySession($pdo, $input);
            return;
        case '/auth/create-viewer-stats-overlay-session':
            handleCreateViewerStatsOverlaySession($pdo, $input);
            return;
        case '/contact/submit':
            handleContactSubmit($pdo, $config, $input);
            return;
        case '/feedback/submit':
            handleFeedbackSubmit($pdo, $config, $input);
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
        case '/overlay/update-joke-state':
            handleUpdateJokeOverlayState($pdo, $input);
            return;
        case '/overlay/update-chat-state':
            handleUpdateChatOverlayState($pdo, $input);
            return;
        case '/overlay/update-gift-state':
            handleUpdateGiftOverlayState($pdo, $input);
            return;
        case '/overlay/update-likes-state':
            handleUpdateLikesOverlayState($pdo, $input);
            return;
        case '/overlay/update-viewer-stats-state':
            handleUpdateViewerStatsOverlayState($pdo, $input);
            return;
        case '/overlay/update-vote-state':
            handleUpdateVoteOverlayState($pdo, $input);
            return;
        case '/overlay/update-like-race-state':
            handleUpdateLikeRaceOverlayState($pdo, $input);
            return;
        case '/overlay/update-spin-wheel-state':
            handleUpdateSpinWheelOverlayState($pdo, $input);
            return;
        case '/overlay/update-progress-bar-state':
            handleUpdateProgressBarOverlayState($pdo, $input);
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
            referral_code VARCHAR(32) NULL,
            referred_by_user_id INT UNSIGNED NULL,
            signup_promo_code VARCHAR(80) NULL,
            referral_reward_granted_at DATETIME NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uniq_user_referral_code (referral_code),
            INDEX idx_user_referred_by (referred_by_user_id)
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
            overlay_public_id VARCHAR(80) NULL,
            overlay_token_hash VARCHAR(255) NULL,
            overlay_token_expires_at DATETIME NULL,
            queue_state_json LONGTEXT NULL,
            command_feedback_json LONGTEXT NULL,
            joke_overlay_json LONGTEXT NULL,
            chat_overlay_json LONGTEXT NULL,
            gift_overlay_json LONGTEXT NULL,
            likes_overlay_json LONGTEXT NULL,
            viewer_stats_overlay_json LONGTEXT NULL,
            vote_overlay_json LONGTEXT NULL,
            like_race_overlay_json LONGTEXT NULL,
            spin_wheel_overlay_json LONGTEXT NULL,
            progress_bar_overlay_json LONGTEXT NULL,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_overlay_user FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE CASCADE,
            UNIQUE KEY uniq_overlay_public_id (overlay_public_id),
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

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS auth_beta_feedback_reports (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT UNSIGNED NULL,
            category VARCHAR(80) NOT NULL,
            severity VARCHAR(40) NOT NULL,
            contact VARCHAR(255) NULL,
            app_version VARCHAR(40) NULL,
            report_body LONGTEXT NOT NULL,
            diagnostics_json LONGTEXT NULL,
            status VARCHAR(40) NOT NULL DEFAULT "open",
            admin_notes TEXT NULL,
            ip_address VARCHAR(64) NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_feedback_status_created (status, created_at),
            INDEX idx_feedback_user_created (user_id, created_at),
            CONSTRAINT fk_feedback_user FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE SET NULL
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
    ensureColumn($pdo, 'auth_users', 'referral_code', 'ALTER TABLE auth_users ADD COLUMN referral_code VARCHAR(32) NULL AFTER billing_link_token_expires_at');
    ensureColumn($pdo, 'auth_users', 'referred_by_user_id', 'ALTER TABLE auth_users ADD COLUMN referred_by_user_id INT UNSIGNED NULL AFTER referral_code');
    ensureColumn($pdo, 'auth_users', 'signup_promo_code', 'ALTER TABLE auth_users ADD COLUMN signup_promo_code VARCHAR(80) NULL AFTER referred_by_user_id');
    ensureColumn($pdo, 'auth_users', 'referral_reward_granted_at', 'ALTER TABLE auth_users ADD COLUMN referral_reward_granted_at DATETIME NULL AFTER signup_promo_code');
    ensureColumn($pdo, 'auth_credit_transactions', 'discount_amount', 'ALTER TABLE auth_credit_transactions ADD COLUMN discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0 AFTER amount_value');
    ensureColumn($pdo, 'auth_user_overlay_state', 'overlay_public_id', 'ALTER TABLE auth_user_overlay_state ADD COLUMN overlay_public_id VARCHAR(80) NULL AFTER user_id');
    ensureColumn($pdo, 'auth_user_overlay_state', 'command_feedback_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN command_feedback_json LONGTEXT NULL AFTER queue_state_json');
    ensureColumn($pdo, 'auth_user_overlay_state', 'joke_overlay_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN joke_overlay_json LONGTEXT NULL AFTER command_feedback_json');
    ensureColumn($pdo, 'auth_user_overlay_state', 'chat_overlay_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN chat_overlay_json LONGTEXT NULL AFTER joke_overlay_json');
    ensureColumn($pdo, 'auth_user_overlay_state', 'gift_overlay_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN gift_overlay_json LONGTEXT NULL AFTER chat_overlay_json');
    ensureColumn($pdo, 'auth_user_overlay_state', 'likes_overlay_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN likes_overlay_json LONGTEXT NULL AFTER gift_overlay_json');
    ensureColumn($pdo, 'auth_user_overlay_state', 'viewer_stats_overlay_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN viewer_stats_overlay_json LONGTEXT NULL AFTER likes_overlay_json');
    ensureColumn($pdo, 'auth_user_overlay_state', 'vote_overlay_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN vote_overlay_json LONGTEXT NULL AFTER likes_overlay_json');
    ensureColumn($pdo, 'auth_user_overlay_state', 'like_race_overlay_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN like_race_overlay_json LONGTEXT NULL AFTER vote_overlay_json');
    ensureColumn($pdo, 'auth_user_overlay_state', 'spin_wheel_overlay_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN spin_wheel_overlay_json LONGTEXT NULL AFTER like_race_overlay_json');
    ensureColumn($pdo, 'auth_user_overlay_state', 'progress_bar_overlay_json', 'ALTER TABLE auth_user_overlay_state ADD COLUMN progress_bar_overlay_json LONGTEXT NULL AFTER spin_wheel_overlay_json');
    ensureColumn($pdo, 'auth_beta_feedback_reports', 'admin_notes', 'ALTER TABLE auth_beta_feedback_reports ADD COLUMN admin_notes TEXT NULL AFTER status');
    ensureIndex($pdo, 'auth_user_overlay_state', 'uniq_overlay_public_id', 'ALTER TABLE auth_user_overlay_state ADD UNIQUE KEY uniq_overlay_public_id (overlay_public_id)');
    ensureIndex($pdo, 'auth_users', 'uniq_user_referral_code', 'ALTER TABLE auth_users ADD UNIQUE KEY uniq_user_referral_code (referral_code)');
    ensureIndex($pdo, 'auth_users', 'idx_user_referred_by', 'ALTER TABLE auth_users ADD INDEX idx_user_referred_by (referred_by_user_id)');
    seedDefaultBillingSettings($pdo, $config ?? []);
    backfillMissingReferralCodes($pdo);
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

function ensureIndex(PDO $pdo, string $table, string $index, string $sql): void
{
    $statement = $pdo->prepare(
        'SELECT COUNT(*) FROM information_schema.STATISTICS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table_name AND INDEX_NAME = :index_name'
    );
    $statement->execute([
        ':table_name' => $table,
        ':index_name' => $index,
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

function isMultipartRequest(): bool
{
    $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? ''));
    return str_contains($contentType, 'multipart/form-data');
}

function getMultipartInput(): array
{
    $input = [];

    foreach ($_POST as $key => $value) {
        $input[$key] = is_string($value) ? $value : '';
    }

    if (!$input && !$_FILES && ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0)) > 0) {
        jsonResponse(413, [
            'ok' => false,
            'error' => 'The upload was rejected before it reached the API. Check the website PHP upload_max_filesize and post_max_size settings; attachments must be 10MB or smaller.',
        ]);
    }

    foreach (['diagnostics'] as $jsonField) {
        if (!array_key_exists($jsonField, $input) || trim((string) $input[$jsonField]) === '') {
            continue;
        }

        $decoded = json_decode((string) $input[$jsonField], true);
        if (!is_array($decoded)) {
            jsonResponse(400, ['ok' => false, 'error' => 'Invalid ' . $jsonField . ' payload']);
        }

        $input[$jsonField] = $decoded;
    }

    return $input;
}

function handleRegister(PDO $pdo, array $config, array $input): void
{
    $displayName = trim((string) ($input['displayName'] ?? ''));
    $email = normalizeEmail((string) ($input['email'] ?? ''));
    $password = (string) ($input['password'] ?? '');
    $promoCode = normalizeSignupCode((string) ($input['promoCode'] ?? ''));

    if ($displayName === '' || $email === '' || $password === '') {
        jsonResponse(400, ['ok' => false, 'error' => 'Display name, email, and password are required.']);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(400, ['ok' => false, 'error' => 'Enter a valid email address.']);
    }

    if (strlen($password) < 8) {
        jsonResponse(400, ['ok' => false, 'error' => 'Password must be at least 8 characters long.']);
    }

    $billingSettings = getBillingSettings($pdo, $config);
    $signupCredits = max(0, (int) ($billingSettings['signup_credits'] ?? 5));
    $signupCodeResult = resolveSignupPromoOrReferral($pdo, $billingSettings, $promoCode, $email);
    $totalSignupCredits = $signupCredits + (int) ($signupCodeResult['signupBonusCredits'] ?? 0);

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
                 referred_by_user_id = :referred_by_user_id,
                 signup_promo_code = :signup_promo_code,
                 referral_reward_granted_at = NULL,
                 verification_code_hash = :verification_code_hash,
                 verification_code_expires_at = :verification_code_expires_at
             WHERE id = :id'
        );
        $statement->execute([
            ':display_name' => $displayName,
            ':password_hash' => $passwordHash,
            ':credits' => $totalSignupCredits,
            ':referred_by_user_id' => $signupCodeResult['referrerUserId'] ?? null,
            ':signup_promo_code' => $signupCodeResult['appliedCode'] ?? null,
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
                referral_code,
                referred_by_user_id,
                signup_promo_code,
                verification_code_hash,
                verification_code_expires_at
             ) VALUES (
                :email,
                :display_name,
                :password_hash,
                :credits,
                :referral_code,
                :referred_by_user_id,
                :signup_promo_code,
                :verification_code_hash,
                :verification_code_expires_at
             )'
        );
        $statement->execute([
            ':email' => $email,
            ':display_name' => $displayName,
            ':password_hash' => $passwordHash,
            ':credits' => $totalSignupCredits,
            ':referral_code' => null,
            ':referred_by_user_id' => $signupCodeResult['referrerUserId'] ?? null,
            ':signup_promo_code' => $signupCodeResult['appliedCode'] ?? null,
            ':verification_code_hash' => $codeHash,
            ':verification_code_expires_at' => $expiresAt,
        ]);

        $newUserId = (int) $pdo->lastInsertId();
        $referralCode = generateUniqueReferralCode($pdo, $newUserId);
        $update = $pdo->prepare('UPDATE auth_users SET referral_code = :referral_code WHERE id = :id');
        $update->execute([
            ':referral_code' => $referralCode,
            ':id' => $newUserId,
        ]);
    }

    sendCodeEmail(
        $config,
        $email,
        'Verify your email',
        'Use this code to verify your Stream Sync Pro LIVE account:',
        $code
    );
    sendSignupNotificationEmailSafe($config, [
        'displayName' => $displayName,
        'email' => $email,
        'credits' => $totalSignupCredits,
        'isExistingUnverified' => (bool) $existingUser,
    ]);

    jsonResponse(200, [
        'ok' => true,
        'message' => $signupCodeResult['message']
            ? 'Registration started. ' . $signupCodeResult['message'] . ' Check your email for the verification code.'
            : 'Registration started. Check your email for the verification code.',
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

    $referralReward = grantReferralRewardIfNeeded($pdo, $user);

    jsonResponse(200, [
        'ok' => true,
        'message' => $referralReward['message'] ?? 'Email verified successfully.',
    ]);
}

function grantReferralRewardIfNeeded(PDO $pdo, array $newUser): array
{
    $referrerUserId = (int) ($newUser['referred_by_user_id'] ?? 0);
    if ($referrerUserId <= 0 || !empty($newUser['referral_reward_granted_at'])) {
        return ['ok' => false, 'message' => 'Email verified successfully.'];
    }

    $billingSettings = getBillingSettings($pdo, []);
    $rewardCredits = max(0, (int) ($billingSettings['referral_reward_credits'] ?? 5));
    if ($rewardCredits <= 0) {
        $mark = $pdo->prepare('UPDATE auth_users SET referral_reward_granted_at = :granted_at WHERE id = :id AND referral_reward_granted_at IS NULL');
        $mark->execute([
            ':granted_at' => gmdate('Y-m-d H:i:s'),
            ':id' => (int) $newUser['id'],
        ]);
        return ['ok' => true, 'message' => 'Email verified successfully.'];
    }

    $pdo->beginTransaction();
    try {
        $mark = $pdo->prepare('UPDATE auth_users SET referral_reward_granted_at = :granted_at WHERE id = :id AND referral_reward_granted_at IS NULL');
        $mark->execute([
            ':granted_at' => gmdate('Y-m-d H:i:s'),
            ':id' => (int) $newUser['id'],
        ]);

        if ($mark->rowCount() !== 1) {
            $pdo->commit();
            return ['ok' => false, 'message' => 'Email verified successfully.'];
        }

        $credit = $pdo->prepare('UPDATE auth_users SET credits = credits + :credits WHERE id = :id');
        $credit->execute([
            ':credits' => $rewardCredits,
            ':id' => $referrerUserId,
        ]);

        $referrer = findUserById($pdo, $referrerUserId);
        if ($referrer) {
            logAuditEvent(
                $pdo,
                $referrerUserId,
                'referral_reward',
                sprintf('Referral reward: %d credit%s added after %s verified their email.', $rewardCredits, $rewardCredits === 1 ? '' : 's', (string) ($newUser['email'] ?? 'a referred user')),
                (int) ($referrer['credits'] ?? 0) + $rewardCredits,
                [
                    'referredUserId' => (int) $newUser['id'],
                    'rewardCredits' => $rewardCredits,
                ]
            );
        }

        $pdo->commit();
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $exception;
    }

    return [
        'ok' => true,
        'message' => sprintf('Email verified successfully. Referral reward granted: %d credit%s added to the referrer.', $rewardCredits, $rewardCredits === 1 ? '' : 's'),
    ];
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

function handleDeleteAccount(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $requestedUserId = max(0, (int) ($input['userId'] ?? 0));
    $confirmation = strtoupper(trim((string) ($input['confirmation'] ?? '')));

    if ($confirmation !== 'DELETE') {
        jsonResponse(400, ['ok' => false, 'error' => 'Type DELETE to confirm account deletion.']);
    }

    if ($requestedUserId <= 0 || $requestedUserId !== (int) $user['id']) {
        jsonResponse(403, ['ok' => false, 'error' => 'You can only delete the account you are currently signed into.']);
    }

    $statement = $pdo->prepare('DELETE FROM auth_users WHERE id = :id LIMIT 1');
    $statement->execute([':id' => (int) $user['id']]);

    if ($statement->rowCount() !== 1) {
        jsonResponse(404, ['ok' => false, 'error' => 'Account could not be found or was already deleted.']);
    }

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Account deleted successfully.',
    ]);
}

function handleSendReferralEmail(PDO $pdo, array $config, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $friendEmail = normalizeEmail((string) ($input['friendEmail'] ?? ''));
    $referralCode = normalizeSignupCode((string) ($user['referral_code'] ?? ''));

    if ($friendEmail === '' || !filter_var($friendEmail, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(400, ['ok' => false, 'error' => 'Enter a valid friend email address.']);
    }

    if (normalizeEmail((string) ($user['email'] ?? '')) === $friendEmail) {
        jsonResponse(400, ['ok' => false, 'error' => 'You cannot send a referral invite to your own account email.']);
    }

    if ($referralCode === '') {
        $referralCode = generateUniqueReferralCode($pdo, (int) $user['id']);
        $statement = $pdo->prepare('UPDATE auth_users SET referral_code = :referral_code WHERE id = :id');
        $statement->execute([
            ':referral_code' => $referralCode,
            ':id' => (int) $user['id'],
        ]);
        $user['referral_code'] = $referralCode;
    }

    $referralLink = 'https://streamsyncpro.co.uk/?ref=' . rawurlencode($referralCode) . '#download';
    sendReferralInviteEmail($config, $user, $friendEmail, $referralCode, $referralLink);

    logAuditEvent(
        $pdo,
        (int) $user['id'],
        'referral_email_sent',
        'Referral email sent to ' . $friendEmail . '.',
        (int) ($user['credits'] ?? 0),
        [
            'friendEmail' => $friendEmail,
            'referralCode' => $referralCode,
        ]
    );

    $updatedUser = findUserById($pdo, (int) $user['id']) ?: $user;

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Referral email sent to ' . $friendEmail . '.',
        'user' => sanitizeUser($updatedUser, $sessionToken),
    ]);
}

function handleConsumeConnectCredit(PDO $pdo, array $config, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $sessionTokenHash = hash('sha256', $sessionToken);
    $tiktokUsername = trim((string) ($input['tiktokUsername'] ?? ''));
    $normalizedTiktokUsername = ltrim($tiktokUsername, '@');
    $profileImageUrl = trim((string) ($input['profileImageUrl'] ?? ''));
    $profileBio = trim((string) ($input['profileBio'] ?? ''));

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

    $liveNotification = null;
    if ($normalizedTiktokUsername !== '') {
        $liveNotification = sendLiveConnectedNotificationToDiscord($pdo, $config, $updatedUser ?: $user, $normalizedTiktokUsername, [
            'imageUrl' => $profileImageUrl,
            'bio' => $profileBio,
        ]);
    }

    jsonResponse(200, [
        'ok' => true,
        'message' => '1 credit used to connect.',
        'user' => sanitizeUser($updatedUser, $sessionToken),
        'liveNotification' => $liveNotification,
    ]);
}

function handleLiveConnectedNotification(PDO $pdo, array $config, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);

    $tiktokUsername = normalizeTikTokUsername((string) ($input['tiktokUsername'] ?? ''));
    if ($tiktokUsername === '') {
        jsonResponse(400, ['ok' => false, 'error' => 'TikTok username is required for the live connection notification.']);
    }

    $notification = sendLiveConnectedNotificationToDiscord($pdo, $config, $user, $tiktokUsername, [
        'imageUrl' => trim((string) ($input['profileImageUrl'] ?? '')),
        'bio' => trim((string) ($input['profileBio'] ?? '')),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'message' => $notification['message'] ?? 'Live connected notification handled.',
        'notification' => $notification,
    ]);
}

function sendLiveConnectedNotificationToDiscord(PDO $pdo, array $config, array $user, string $tiktokUsername, array $profileMeta = []): array
{
    $discordConfig = is_array($config['discord'] ?? null) ? $config['discord'] : [];
    $webhookUrl = trim((string) ($discordConfig['live_connected_webhook_url'] ?? ''));
    if ($webhookUrl === '') {
        return [
            'ok' => false,
            'message' => 'Live connected notification webhook is not configured.',
        ];
    }

    $profileUrl = 'https://www.tiktok.com/@' . rawurlencode($tiktokUsername);
    $liveUrl = $profileUrl . '/live';
    $fetchedProfileMeta = fetchTikTokProfileMetadata($profileUrl);
    $profileMeta = [
        'imageUrl' => trim((string) ($profileMeta['imageUrl'] ?? '')) ?: ($fetchedProfileMeta['imageUrl'] ?? ''),
        'bio' => trim((string) ($profileMeta['bio'] ?? '')) ?: ($fetchedProfileMeta['bio'] ?? ''),
    ];

    try {
        postJsonToDiscordWebhook($webhookUrl, buildLiveConnectedDiscordPayload([
            'user' => $user,
            'tiktokUsername' => $tiktokUsername,
            'profileUrl' => $profileUrl,
            'liveUrl' => $liveUrl,
            'profileImageUrl' => $profileMeta['imageUrl'] ?? '',
            'profileBio' => $profileMeta['bio'] ?? '',
            'createdAt' => gmdate('c'),
        ]));

        logAuditEvent(
            $pdo,
            (int) $user['id'],
            'live_connected_notification',
            sprintf('Posted TikTok LIVE URL for @%s to Discord.', $tiktokUsername),
            (int) ($user['credits'] ?? 0),
            [
                'tiktokUsername' => $tiktokUsername,
                'profileUrl' => $profileUrl,
                'liveUrl' => $liveUrl,
                'profileImageFound' => !empty($profileMeta['imageUrl']),
                'profileBioFound' => !empty($profileMeta['bio']),
            ]
        );

        return [
            'ok' => true,
            'message' => 'Live connected notification sent.',
            'profileUrl' => $profileUrl,
            'liveUrl' => $liveUrl,
            'profileImageFound' => !empty($profileMeta['imageUrl']),
            'profileBioFound' => !empty($profileMeta['bio']),
        ];
    } catch (Throwable $exception) {
        logAuditEvent(
            $pdo,
            (int) $user['id'],
            'live_connected_notification_failed',
            sprintf('Failed to post TikTok LIVE URL for @%s to Discord: %s', $tiktokUsername, $exception->getMessage()),
            (int) ($user['credits'] ?? 0),
            [
                'tiktokUsername' => $tiktokUsername,
                'profileUrl' => $profileUrl,
                'liveUrl' => $liveUrl,
                'error' => $exception->getMessage(),
            ]
        );

        return [
            'ok' => false,
            'message' => 'Live connected notification failed: ' . $exception->getMessage(),
            'profileUrl' => $profileUrl,
            'liveUrl' => $liveUrl,
        ];
    }
}

function normalizeTikTokUsername(string $username): string
{
    $username = trim($username);
    $username = ltrim($username, '@');
    $username = preg_replace('/[^A-Za-z0-9._-]/', '', $username) ?? '';

    return mb_substr($username, 0, 64);
}

function fetchTikTokProfileMetadata(string $profileUrl): array
{
    $html = fetchRemoteText($profileUrl, 6);
    if ($html === '') {
        return [];
    }

    $metadata = [
        'imageUrl' => extractHtmlMetaContent($html, 'property', 'og:image'),
        'bio' => extractHtmlMetaContent($html, 'name', 'description'),
    ];

    if ($metadata['bio'] === '') {
        $metadata['bio'] = extractHtmlMetaContent($html, 'property', 'og:description');
    }

    $jsonMetadata = extractTikTokProfileMetadataFromJsonState($html);
    if ($metadata['imageUrl'] === '') {
        $metadata['imageUrl'] = $jsonMetadata['imageUrl'] ?? '';
    }
    if ($metadata['bio'] === '') {
        $metadata['bio'] = $jsonMetadata['bio'] ?? '';
    }

    $metadata['imageUrl'] = trim(html_entity_decode($metadata['imageUrl'], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    $metadata['bio'] = trim(html_entity_decode($metadata['bio'], ENT_QUOTES | ENT_HTML5, 'UTF-8'));

    return array_filter($metadata, static fn($value) => is_string($value) && trim($value) !== '');
}

function extractTikTokProfileMetadataFromJsonState(string $html): array
{
    foreach (['SIGI_STATE', '__UNIVERSAL_DATA_FOR_REHYDRATION__'] as $scriptId) {
        $json = extractScriptJsonById($html, $scriptId);
        if ($json === '') {
            continue;
        }

        $decoded = json_decode(html_entity_decode($json, ENT_QUOTES | ENT_HTML5, 'UTF-8'), true);
        if (!is_array($decoded)) {
            continue;
        }

        $metadata = findTikTokProfileMetadataInDecodedState($decoded);
        if ($metadata) {
            return $metadata;
        }
    }

    return [];
}

function extractScriptJsonById(string $html, string $scriptId): string
{
    $pattern = '/<script\b(?=[^>]*\bid\s*=\s*["\']' . preg_quote($scriptId, '/') . '["\'])[^>]*>(.*?)<\/script>/is';
    if (!preg_match($pattern, $html, $matches)) {
        return '';
    }

    return trim((string) ($matches[1] ?? ''));
}

function findTikTokProfileMetadataInDecodedState(array $state): array
{
    $visited = [];
    $best = [];

    $visit = static function ($value) use (&$visit, &$visited, &$best): void {
        if (!is_array($value)) {
            return;
        }

        $hash = md5(json_encode(array_slice($value, 0, 8), JSON_PARTIAL_OUTPUT_ON_ERROR) ?: spl_object_id((object) $value));
        if (isset($visited[$hash])) {
            return;
        }
        $visited[$hash] = true;

        $bio = trim((string) ($value['signature'] ?? $value['bio'] ?? $value['desc'] ?? $value['description'] ?? ''));
        $imageUrl = extractTikTokProfileImageCandidate($value);
        if (($bio !== '' || $imageUrl !== '') && (empty($best['bio']) || empty($best['imageUrl']))) {
            $best = [
                'bio' => $bio ?: ($best['bio'] ?? ''),
                'imageUrl' => $imageUrl ?: ($best['imageUrl'] ?? ''),
            ];
        }

        foreach ($value as $child) {
            $visit($child);
        }
    };

    $visit($state);

    return array_filter($best, static fn($value) => is_string($value) && trim($value) !== '');
}

function extractTikTokProfileImageCandidate(array $value): string
{
    $candidateKeys = [
        'avatarLarger',
        'avatarMedium',
        'avatarThumb',
        'avatar_larger',
        'avatar_medium',
        'avatar_thumb',
        'profilePictureUrl',
        'image',
    ];

    foreach ($candidateKeys as $key) {
        if (!array_key_exists($key, $value)) {
            continue;
        }

        $url = extractUrlFromMixedValue($value[$key]);
        if ($url !== '') {
            return $url;
        }
    }

    return '';
}

function extractUrlFromMixedValue(mixed $value): string
{
    if (is_string($value)) {
        return preg_match('/^https?:\/\//i', $value) ? preg_replace('/^http:\/\//i', 'https://', $value) : '';
    }

    if (!is_array($value)) {
        return '';
    }

    foreach (['url', 'uri', 'urlList', 'url_list', 0] as $key) {
        if (array_key_exists($key, $value)) {
            $url = extractUrlFromMixedValue($value[$key]);
            if ($url !== '') {
                return $url;
            }
        }
    }

    foreach ($value as $child) {
        $url = extractUrlFromMixedValue($child);
        if ($url !== '') {
            return $url;
        }
    }

    return '';
}

function fetchRemoteText(string $url, int $timeoutSeconds = 8): string
{
    if (function_exists('curl_init')) {
        $handle = curl_init($url);
        curl_setopt_array($handle, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 3,
            CURLOPT_CONNECTTIMEOUT => $timeoutSeconds,
            CURLOPT_TIMEOUT => $timeoutSeconds,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; StreamSyncPro/1.0)',
            CURLOPT_HTTPHEADER => [
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language: en-GB,en;q=0.9',
            ],
        ]);

        $body = curl_exec($handle);
        $statusCode = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
        curl_close($handle);

        return is_string($body) && $statusCode >= 200 && $statusCode < 400 ? $body : '';
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => "User-Agent: Mozilla/5.0 (compatible; StreamSyncPro/1.0)\r\nAccept: text/html\r\n",
            'timeout' => $timeoutSeconds,
            'ignore_errors' => true,
        ],
    ]);
    $body = file_get_contents($url, false, $context);

    return is_string($body) ? $body : '';
}

function extractHtmlMetaContent(string $html, string $attributeName, string $attributeValue): string
{
    $attributeName = preg_quote($attributeName, '/');
    $attributeValue = preg_quote($attributeValue, '/');
    $pattern = '/<meta\b(?=[^>]*\b' . $attributeName . '\s*=\s*["\']' . $attributeValue . '["\'])(?=[^>]*\bcontent\s*=\s*(["\'])(.*?)\1)[^>]*>/is';

    if (!preg_match($pattern, $html, $matches)) {
        return '';
    }

    return (string) ($matches[2] ?? '');
}

function buildLiveConnectedDiscordPayload(array $payload): array
{
    $user = is_array($payload['user'] ?? null) ? $payload['user'] : [];
    $tiktokUsername = trim((string) ($payload['tiktokUsername'] ?? ''));
    $profileUrl = trim((string) ($payload['profileUrl'] ?? ''));
    $liveUrl = trim((string) ($payload['liveUrl'] ?? ''));
    $profileImageUrl = trim((string) ($payload['profileImageUrl'] ?? ''));
    $profileBio = trim((string) ($payload['profileBio'] ?? ''));
    $createdAt = trim((string) ($payload['createdAt'] ?? gmdate('c')));
    if ($profileUrl === '' && $tiktokUsername !== '') {
        $profileUrl = 'https://www.tiktok.com/@' . rawurlencode($tiktokUsername);
    }

    $embed = [
        'title' => 'TikTok LIVE Connected',
        'url' => $liveUrl,
        'color' => 0x4de7ff,
        'fields' => [
            [
                'name' => 'TikTok LIVE',
                'value' => sprintf('[Watch LIVE](%s)', $liveUrl),
                'inline' => false,
            ],
            [
                'name' => 'TikTok Profile',
                'value' => sprintf('[View Profile](%s)', $profileUrl),
                'inline' => false,
            ],
            [
                'name' => 'Username',
                'value' => '@' . $tiktokUsername,
                'inline' => true,
            ],
            [
                'name' => 'App User',
                'value' => truncateDiscordText((string) ($user['display_name'] ?? 'Unknown'), 1024),
                'inline' => true,
            ],
            [
                'name' => 'Created',
                'value' => truncateDiscordText($createdAt, 1024),
                'inline' => true,
            ],
        ],
    ];

    if ($profileBio !== '') {
        array_splice($embed['fields'], 2, 0, [[
            'name' => 'Bio',
            'value' => truncateDiscordText($profileBio, 1024),
            'inline' => false,
        ]]);
    }

    if ($profileImageUrl !== '') {
        $embed['thumbnail'] = ['url' => $profileImageUrl];
    }

    return [
        'username' => 'Stream Sync Pro LIVE',
        'content' => sprintf('[View TikTok Profile](%s) | [Watch LIVE](%s)', $profileUrl, $liveUrl),
        'embeds' => [$embed],
        'allowed_mentions' => ['parse' => []],
    ];
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

function handleVoicemodClientConfig(PDO $pdo, array $config, array $input): void
{
    requireValidConnectSession($pdo, $input);

    $clientKey = trim((string) ($config['integrations']['voicemod_client_key'] ?? ''));
    if ($clientKey === '') {
        jsonResponse(500, [
            'ok' => false,
            'error' => 'Voicemod server integration is not configured.',
        ]);
    }

    jsonResponse(200, [
        'ok' => true,
        'clientKey' => $clientKey,
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

        if (hash_equals((string) ($user['active_connection_token_hash'] ?? ''), $sessionTokenHash)) {
            $heartbeatStatement = $pdo->prepare(
                'UPDATE auth_users
                 SET active_connection_started_at = :active_connection_started_at
                 WHERE id = :id'
            );
            $heartbeatStatement->execute([
                ':active_connection_started_at' => gmdate('Y-m-d H:i:s'),
                ':id' => (int) $user['id'],
            ]);
            $user['active_connection_started_at'] = gmdate('Y-m-d H:i:s');
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

function createOverlaySessionBundle(PDO $pdo, array $user, ?string $sessionToken = null): array
{
    $existingState = findOverlayStateByUserId($pdo, (int) $user['id']);
    $overlayPublicId = trim((string) ($existingState['overlay_public_id'] ?? ''));
    if ($overlayPublicId === '') {
        $overlayPublicId = 'ovl_' . bin2hex(random_bytes(12));
    }

    $overlayToken = bin2hex(random_bytes(24));
    $overlayTokenHash = hash('sha256', $overlayToken);
    $expiresAt = createExpiryTimestamp(60 * 24 * 30);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            overlay_public_id,
            overlay_token_hash,
            overlay_token_expires_at,
            queue_state_json,
            command_feedback_json,
            joke_overlay_json,
            chat_overlay_json,
            gift_overlay_json,
            likes_overlay_json,
            viewer_stats_overlay_json,
            vote_overlay_json,
            like_race_overlay_json,
            spin_wheel_overlay_json,
            progress_bar_overlay_json
        ) VALUES (
            :user_id,
            :overlay_public_id,
            :overlay_token_hash,
            :overlay_token_expires_at,
            :queue_state_json,
            :command_feedback_json,
            :joke_overlay_json,
            :chat_overlay_json,
            :gift_overlay_json,
            :likes_overlay_json,
            :viewer_stats_overlay_json,
            :vote_overlay_json,
            :like_race_overlay_json,
            :spin_wheel_overlay_json,
            :progress_bar_overlay_json
        )
        ON DUPLICATE KEY UPDATE
            overlay_public_id = COALESCE(auth_user_overlay_state.overlay_public_id, VALUES(overlay_public_id)),
            overlay_token_hash = COALESCE(auth_user_overlay_state.overlay_token_hash, VALUES(overlay_token_hash)),
            overlay_token_expires_at = COALESCE(auth_user_overlay_state.overlay_token_expires_at, VALUES(overlay_token_expires_at)),
            queue_state_json = COALESCE(auth_user_overlay_state.queue_state_json, VALUES(queue_state_json)),
            command_feedback_json = COALESCE(auth_user_overlay_state.command_feedback_json, VALUES(command_feedback_json)),
            joke_overlay_json = COALESCE(auth_user_overlay_state.joke_overlay_json, VALUES(joke_overlay_json)),
            chat_overlay_json = COALESCE(auth_user_overlay_state.chat_overlay_json, VALUES(chat_overlay_json)),
            gift_overlay_json = COALESCE(auth_user_overlay_state.gift_overlay_json, VALUES(gift_overlay_json)),
            likes_overlay_json = COALESCE(auth_user_overlay_state.likes_overlay_json, VALUES(likes_overlay_json)),
            viewer_stats_overlay_json = COALESCE(auth_user_overlay_state.viewer_stats_overlay_json, VALUES(viewer_stats_overlay_json)),
            vote_overlay_json = COALESCE(auth_user_overlay_state.vote_overlay_json, VALUES(vote_overlay_json)),
            like_race_overlay_json = COALESCE(auth_user_overlay_state.like_race_overlay_json, VALUES(like_race_overlay_json)),
            spin_wheel_overlay_json = COALESCE(auth_user_overlay_state.spin_wheel_overlay_json, VALUES(spin_wheel_overlay_json)),
            progress_bar_overlay_json = COALESCE(auth_user_overlay_state.progress_bar_overlay_json, VALUES(progress_bar_overlay_json))'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':overlay_public_id' => $overlayPublicId,
        ':overlay_token_hash' => $overlayTokenHash,
        ':overlay_token_expires_at' => $expiresAt,
        ':queue_state_json' => json_encode(defaultQueueOverlayState(), JSON_UNESCAPED_SLASHES),
        ':command_feedback_json' => json_encode(defaultCommandFeedbackOverlayState(), JSON_UNESCAPED_SLASHES),
        ':joke_overlay_json' => json_encode(defaultJokeOverlayState(), JSON_UNESCAPED_SLASHES),
        ':chat_overlay_json' => json_encode(defaultChatOverlayState(), JSON_UNESCAPED_SLASHES),
        ':gift_overlay_json' => json_encode(defaultGiftOverlayState(), JSON_UNESCAPED_SLASHES),
        ':likes_overlay_json' => json_encode(defaultLikesOverlayState(), JSON_UNESCAPED_SLASHES),
        ':viewer_stats_overlay_json' => json_encode(defaultViewerStatsOverlayState(), JSON_UNESCAPED_SLASHES),
        ':vote_overlay_json' => json_encode(defaultVoteOverlayState(), JSON_UNESCAPED_SLASHES),
        ':like_race_overlay_json' => json_encode(defaultLikeRaceOverlayState(), JSON_UNESCAPED_SLASHES),
        ':spin_wheel_overlay_json' => json_encode(defaultSpinWheelOverlayState(), JSON_UNESCAPED_SLASHES),
        ':progress_bar_overlay_json' => json_encode(defaultProgressBarOverlayState(), JSON_UNESCAPED_SLASHES),
    ]);

    $publicIdParam = rawurlencode($overlayPublicId);
    $siteBaseUrl = getSiteBaseUrl();
    $payload = [
        'ok' => true,
        'queueUrl' => $siteBaseUrl . '/overlay/queue.php?id=' . $publicIdParam . '&v=20260617-queue-media',
        'commandFeedbackUrl' => $siteBaseUrl . '/overlay/command-feedback.php?id=' . $publicIdParam,
        'jokeUrl' => $siteBaseUrl . '/overlay/joke.php?id=' . $publicIdParam,
        'chatUrl' => $siteBaseUrl . '/overlay/chat.php?id=' . $publicIdParam,
        'giftUrl' => $siteBaseUrl . '/overlay/gift.php?id=' . $publicIdParam,
        'likesUrl' => $siteBaseUrl . '/overlay/likes.php?id=' . $publicIdParam,
        'viewerStatsUrl' => $siteBaseUrl . '/overlay/viewer-stats.php?id=' . $publicIdParam,
        'voteUrl' => $siteBaseUrl . '/overlay/vote.php?id=' . $publicIdParam,
        'likeRaceUrl' => $siteBaseUrl . '/overlay/like-race.php?id=' . $publicIdParam . '&v=20260522-usernamesize',
        'spinWheelUrl' => $siteBaseUrl . '/overlay/spin-wheel.php?id=' . $publicIdParam . '&v=20260617-spin-style',
        'progressBarUrl' => $siteBaseUrl . '/overlay/progress-bar.php?id=' . $publicIdParam,
        'publicId' => $overlayPublicId,
        'expiresAt' => $expiresAt,
    ];

    if ($sessionToken !== null) {
        $payload['user'] = sanitizeUser($user, $sessionToken);
    }

    return $payload;
}

function handleCreateOverlaySessions(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    jsonResponse(200, createOverlaySessionBundle($pdo, $user, $sessionToken));
}

function handleCreateQueueOverlaySession(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $bundle = createOverlaySessionBundle($pdo, $user, $sessionToken);
    jsonResponse(200, [
        'ok' => true,
        'url' => $bundle['queueUrl'],
        'expiresAt' => $bundle['expiresAt'],
        'user' => $bundle['user'],
    ]);
}

function handleCreateCommandFeedbackOverlaySession(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $bundle = createOverlaySessionBundle($pdo, $user, $sessionToken);
    jsonResponse(200, [
        'ok' => true,
        'url' => $bundle['commandFeedbackUrl'],
        'expiresAt' => $bundle['expiresAt'],
        'user' => $bundle['user'],
    ]);
}

function handleCreateChatOverlaySession(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $bundle = createOverlaySessionBundle($pdo, $user, $sessionToken);
    jsonResponse(200, [
        'ok' => true,
        'url' => $bundle['chatUrl'],
        'expiresAt' => $bundle['expiresAt'],
        'user' => $bundle['user'],
    ]);
}

function handleCreateGiftOverlaySession(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $bundle = createOverlaySessionBundle($pdo, $user, $sessionToken);
    jsonResponse(200, [
        'ok' => true,
        'url' => $bundle['giftUrl'],
        'expiresAt' => $bundle['expiresAt'],
        'user' => $bundle['user'],
    ]);
}

function handleCreateLikesOverlaySession(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $bundle = createOverlaySessionBundle($pdo, $user, $sessionToken);
    jsonResponse(200, [
        'ok' => true,
        'url' => $bundle['likesUrl'],
        'expiresAt' => $bundle['expiresAt'],
        'user' => $bundle['user'],
    ]);
}

function handleCreateViewerStatsOverlaySession(PDO $pdo, array $input): void
{
    [$user, $sessionToken] = requireValidConnectSession($pdo, $input);
    $bundle = createOverlaySessionBundle($pdo, $user, $sessionToken);
    jsonResponse(200, [
        'ok' => true,
        'url' => $bundle['viewerStatsUrl'],
        'expiresAt' => $bundle['expiresAt'],
        'user' => $bundle['user'],
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

function handleUpdateJokeOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeJokeOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            joke_overlay_json
        ) VALUES (
            :user_id,
            :joke_overlay_json
        )
        ON DUPLICATE KEY UPDATE
            joke_overlay_json = VALUES(joke_overlay_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':joke_overlay_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleUpdateChatOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeChatOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            chat_overlay_json
        ) VALUES (
            :user_id,
            :chat_overlay_json
        )
        ON DUPLICATE KEY UPDATE
            chat_overlay_json = VALUES(chat_overlay_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':chat_overlay_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleUpdateGiftOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeGiftOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            gift_overlay_json
        ) VALUES (
            :user_id,
            :gift_overlay_json
        )
        ON DUPLICATE KEY UPDATE
            gift_overlay_json = VALUES(gift_overlay_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':gift_overlay_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleUpdateLikesOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeLikesOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            likes_overlay_json
        ) VALUES (
            :user_id,
            :likes_overlay_json
        )
        ON DUPLICATE KEY UPDATE
            likes_overlay_json = VALUES(likes_overlay_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':likes_overlay_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleUpdateViewerStatsOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeViewerStatsOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            viewer_stats_overlay_json
        ) VALUES (
            :user_id,
            :viewer_stats_overlay_json
        )
        ON DUPLICATE KEY UPDATE
            viewer_stats_overlay_json = VALUES(viewer_stats_overlay_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':viewer_stats_overlay_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleUpdateVoteOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeVoteOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            vote_overlay_json
        ) VALUES (
            :user_id,
            :vote_overlay_json
        )
        ON DUPLICATE KEY UPDATE
            vote_overlay_json = VALUES(vote_overlay_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':vote_overlay_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleUpdateLikeRaceOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeLikeRaceOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            like_race_overlay_json
        ) VALUES (
            :user_id,
            :like_race_overlay_json
        )
        ON DUPLICATE KEY UPDATE
            like_race_overlay_json = VALUES(like_race_overlay_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':like_race_overlay_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleUpdateSpinWheelOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeSpinWheelOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            spin_wheel_overlay_json
        ) VALUES (
            :user_id,
            :spin_wheel_overlay_json
        )
        ON DUPLICATE KEY UPDATE
            spin_wheel_overlay_json = VALUES(spin_wheel_overlay_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':spin_wheel_overlay_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleUpdateProgressBarOverlayState(PDO $pdo, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);
    $state = sanitizeProgressBarOverlayStatePayload($input);

    $statement = $pdo->prepare(
        'INSERT INTO auth_user_overlay_state (
            user_id,
            progress_bar_overlay_json
        ) VALUES (
            :user_id,
            :progress_bar_overlay_json
        )
        ON DUPLICATE KEY UPDATE
            progress_bar_overlay_json = VALUES(progress_bar_overlay_json),
            updated_at = CURRENT_TIMESTAMP'
    );
    $statement->execute([
        ':user_id' => (int) $user['id'],
        ':progress_bar_overlay_json' => json_encode($state, JSON_UNESCAPED_SLASHES),
    ]);

    jsonResponse(200, [
        'ok' => true,
        'state' => $state,
    ]);
}

function handleGetQueueOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
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
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
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

function handleGetJokeOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
    $state = defaultJokeOverlayState();
    $decodedState = json_decode((string) ($overlayState['joke_overlay_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeJokeOverlayStatePayload($decodedState);
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'state' => $state,
        'updatedAt' => (string) ($overlayState['updated_at'] ?? ''),
    ]);
}

function handleGetChatOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
    $state = defaultChatOverlayState();
    $decodedState = json_decode((string) ($overlayState['chat_overlay_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeChatOverlayStatePayload($decodedState);
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'state' => $state,
        'updatedAt' => (string) ($overlayState['updated_at'] ?? ''),
    ]);
}

function handleGetGiftOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
    $state = defaultGiftOverlayState();
    $decodedState = json_decode((string) ($overlayState['gift_overlay_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeGiftOverlayStatePayload($decodedState);
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'state' => $state,
        'updatedAt' => (string) ($overlayState['updated_at'] ?? ''),
    ]);
}

function handleGetLikesOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
    $state = defaultLikesOverlayState();
    $decodedState = json_decode((string) ($overlayState['likes_overlay_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeLikesOverlayStatePayload($decodedState);
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'state' => $state,
        'updatedAt' => (string) ($overlayState['updated_at'] ?? ''),
    ]);
}

function handleGetViewerStatsOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
    $state = defaultViewerStatsOverlayState();
    $decodedState = json_decode((string) ($overlayState['viewer_stats_overlay_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeViewerStatsOverlayStatePayload($decodedState);
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'state' => $state,
        'updatedAt' => (string) ($overlayState['updated_at'] ?? ''),
    ]);
}

function handleGetVoteOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
    $state = defaultVoteOverlayState();
    $decodedState = json_decode((string) ($overlayState['vote_overlay_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeVoteOverlayStatePayload($decodedState);
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'state' => $state,
        'updatedAt' => (string) ($overlayState['updated_at'] ?? ''),
    ]);
}

function handleGetLikeRaceOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
    $state = defaultLikeRaceOverlayState();
    $decodedState = json_decode((string) ($overlayState['like_race_overlay_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeLikeRaceOverlayStatePayload($decodedState);
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'state' => $state,
        'updatedAt' => (string) ($overlayState['updated_at'] ?? ''),
    ]);
}

function handleGetSpinWheelOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
    $state = defaultSpinWheelOverlayState();
    $decodedState = json_decode((string) ($overlayState['spin_wheel_overlay_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeSpinWheelOverlayStatePayload($decodedState);
    }

    jsonResponse(200, [
        'ok' => true,
        'user' => sanitizeUser($user),
        'state' => $state,
        'updatedAt' => (string) ($overlayState['updated_at'] ?? ''),
    ]);
}

function handleGetProgressBarOverlayState(PDO $pdo, array $query): void
{
    [$user, $overlayState] = requireValidOverlayAccess($pdo, $query);
    $state = defaultProgressBarOverlayState();
    $decodedState = json_decode((string) ($overlayState['progress_bar_overlay_json'] ?? ''), true);
    if (is_array($decodedState)) {
        $state = sanitizeProgressBarOverlayStatePayload($decodedState);
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
        'signup_credits' => max(0, (int) (($config['billing']['signup_credits'] ?? 5))),
        'signup_promo_code' => strtoupper(trim((string) (($config['billing']['signup_promo_code'] ?? '')))),
        'signup_promo_credits' => max(0, (int) (($config['billing']['signup_promo_credits'] ?? 0))),
        'referral_reward_credits' => max(0, (int) (($config['billing']['referral_reward_credits'] ?? 5))),
        'referred_signup_bonus_credits' => max(0, (int) (($config['billing']['referred_signup_bonus_credits'] ?? 5))),
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

function backfillMissingReferralCodes(PDO $pdo): void
{
    $statement = $pdo->query('SELECT id FROM auth_users WHERE referral_code IS NULL OR referral_code = ""');
    foreach ($statement->fetchAll() as $row) {
        $code = generateUniqueReferralCode($pdo, (int) $row['id']);
        $update = $pdo->prepare('UPDATE auth_users SET referral_code = :referral_code WHERE id = :id');
        $update->execute([
            ':referral_code' => $code,
            ':id' => (int) $row['id'],
        ]);
    }
}

function generateUniqueReferralCode(PDO $pdo, int $userId): string
{
    $prefix = 'SSP' . max(1, $userId);

    for ($attempt = 0; $attempt < 8; $attempt += 1) {
        $code = strtoupper($prefix . substr(bin2hex(random_bytes(3)), 0, 6));
        $statement = $pdo->prepare('SELECT COUNT(*) FROM auth_users WHERE referral_code = :referral_code');
        $statement->execute([':referral_code' => $code]);
        if ((int) $statement->fetchColumn() === 0) {
            return $code;
        }
    }

    return strtoupper('SSP' . bin2hex(random_bytes(8)));
}

function findUserByReferralCode(PDO $pdo, string $code): ?array
{
    $normalizedCode = normalizeSignupCode($code);
    if ($normalizedCode === '') {
        return null;
    }

    $statement = $pdo->prepare('SELECT * FROM auth_users WHERE referral_code = :referral_code LIMIT 1');
    $statement->execute([':referral_code' => $normalizedCode]);
    $user = $statement->fetch();

    return $user ?: null;
}

function normalizeSignupCode(string $code): string
{
    return strtoupper(preg_replace('/[^A-Z0-9_-]/i', '', trim($code)) ?? '');
}

function resolveSignupPromoOrReferral(PDO $pdo, array $billingSettings, string $promoCode, string $email): array
{
    $empty = [
        'appliedCode' => null,
        'referrerUserId' => null,
        'signupBonusCredits' => 0,
        'message' => '',
    ];

    if ($promoCode === '') {
        return $empty;
    }

    $signupPromoCode = normalizeSignupCode((string) ($billingSettings['signup_promo_code'] ?? ''));
    $signupPromoCredits = max(0, (int) ($billingSettings['signup_promo_credits'] ?? 0));
    if ($signupPromoCode !== '' && hash_equals($signupPromoCode, $promoCode)) {
        return [
            'appliedCode' => $promoCode,
            'referrerUserId' => null,
            'signupBonusCredits' => $signupPromoCredits,
            'message' => $signupPromoCredits > 0
                ? sprintf('Promo code applied: %d bonus credit%s added.', $signupPromoCredits, $signupPromoCredits === 1 ? '' : 's')
                : 'Promo code applied.',
        ];
    }

    $referrer = findUserByReferralCode($pdo, $promoCode);
    if (!$referrer) {
        jsonResponse(400, ['ok' => false, 'error' => 'That promo or referral code was not found.']);
    }

    if (normalizeEmail((string) ($referrer['email'] ?? '')) === $email) {
        jsonResponse(400, ['ok' => false, 'error' => 'You cannot use your own referral code.']);
    }

    $bonusCredits = max(0, (int) ($billingSettings['referred_signup_bonus_credits'] ?? 5));

    return [
        'appliedCode' => $promoCode,
        'referrerUserId' => (int) $referrer['id'],
        'signupBonusCredits' => $bonusCredits,
        'message' => $bonusCredits > 0
            ? sprintf('Referral code applied: %d bonus credit%s added.', $bonusCredits, $bonusCredits === 1 ? '' : 's')
            : 'Referral code applied.',
    ];
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
    $settings['signup_promo_code'] = strtoupper(trim((string) ($settings['signup_promo_code'] ?? '')));
    $settings['signup_promo_credits'] = max(0, (int) ($settings['signup_promo_credits'] ?? 0));
    $settings['referral_reward_credits'] = max(0, (int) ($settings['referral_reward_credits'] ?? 5));
    $settings['referred_signup_bonus_credits'] = max(0, (int) ($settings['referred_signup_bonus_credits'] ?? 5));
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

function handleFeedbackSubmit(PDO $pdo, array $config, array $input): void
{
    [$user] = requireValidConnectSession($pdo, $input);

    $category = trim((string) ($input['category'] ?? 'Bug'));
    $severity = trim((string) ($input['severity'] ?? 'Normal'));
    $contact = trim((string) ($input['contact'] ?? ''));
    $appVersion = trim((string) ($input['appVersion'] ?? ''));
    $reportBody = trim((string) ($input['report'] ?? ''));
    $publicMessage = trim((string) ($input['message'] ?? ''));
    $diagnostics = $input['diagnostics'] ?? null;

    $allowedCategories = ['Bug', 'Feature request', 'UI feedback', 'Performance', 'Question'];
    $allowedSeverities = ['Low', 'Normal', 'High', 'Blocking'];

    if (!in_array($category, $allowedCategories, true)) {
        $category = 'Bug';
    }

    if (!in_array($severity, $allowedSeverities, true)) {
        $severity = 'Normal';
    }

    if ($reportBody === '' || mb_strlen($reportBody) < 10) {
        jsonResponse(400, ['ok' => false, 'error' => 'Please enter a fuller feedback report before sending.']);
    }

    $attachment = resolveFeedbackAttachment($input);

    sendBugReportToDiscord($config, [
        'user' => $user,
        'category' => $category,
        'severity' => $severity,
        'contact' => $contact,
        'appVersion' => $appVersion,
        'reportBody' => $reportBody,
        'publicMessage' => $publicMessage !== '' ? $publicMessage : $reportBody,
        'diagnostics' => is_array($diagnostics) ? $diagnostics : null,
        'attachment' => $attachment,
        'ipAddress' => resolveClientIp(),
    ]);

    logAuditEvent(
        $pdo,
        (int) $user['id'],
        'bug_report_submitted',
        sprintf('Submitted Discord bug report: %s / %s.', $category, $severity),
        (int) ($user['credits'] ?? 0),
        [
            'category' => $category,
            'severity' => $severity,
        ]
    );

    jsonResponse(200, [
        'ok' => true,
        'message' => 'Thanks, your report was sent to Discord successfully.',
    ]);
}

function resolveFeedbackAttachment(array $input = []): ?array
{
    $jsonAttachment = is_array($input['attachment'] ?? null) ? $input['attachment'] : null;
    if ($jsonAttachment) {
        return resolveJsonFeedbackAttachment($jsonAttachment);
    }

    if (!isset($_FILES['attachment']) || !is_array($_FILES['attachment'])) {
        return null;
    }

    $file = $_FILES['attachment'];
    $error = (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE);
    if ($error === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    if ($error !== UPLOAD_ERR_OK) {
        jsonResponse(400, ['ok' => false, 'error' => 'The attachment could not be uploaded. Please try again.']);
    }

    $maxBytes = 10 * 1024 * 1024;
    $size = (int) ($file['size'] ?? 0);
    if ($size <= 0) {
        jsonResponse(400, ['ok' => false, 'error' => 'The selected attachment is empty.']);
    }

    if ($size > $maxBytes) {
        jsonResponse(400, ['ok' => false, 'error' => 'Attachments must be 10MB or smaller.']);
    }

    $tmpName = (string) ($file['tmp_name'] ?? '');
    if ($tmpName === '' || !is_uploaded_file($tmpName)) {
        jsonResponse(400, ['ok' => false, 'error' => 'The attachment upload was not valid.']);
    }

    $originalName = basename((string) ($file['name'] ?? 'stream-sync-pro-report-attachment'));
    $mimeType = trim((string) ($file['type'] ?? ''));

    return [
        'path' => $tmpName,
        'name' => $originalName !== '' ? $originalName : 'stream-sync-pro-report-attachment',
        'type' => $mimeType !== '' ? $mimeType : 'application/octet-stream',
        'size' => $size,
    ];
}

function resolveJsonFeedbackAttachment(array $attachment): ?array
{
    $name = basename((string) ($attachment['name'] ?? 'stream-sync-pro-report-attachment'));
    $mimeType = trim((string) ($attachment['type'] ?? ''));
    $declaredSize = (int) ($attachment['size'] ?? 0);
    $contentBase64 = trim((string) ($attachment['contentBase64'] ?? ''));

    if ($contentBase64 === '') {
        return null;
    }

    $maxBytes = 10 * 1024 * 1024;
    if ($declaredSize > $maxBytes) {
        jsonResponse(400, ['ok' => false, 'error' => 'Attachments must be 10MB or smaller.']);
    }

    $content = base64_decode($contentBase64, true);
    if ($content === false || $content === '') {
        jsonResponse(400, ['ok' => false, 'error' => 'The selected attachment could not be decoded.']);
    }

    $actualSize = strlen($content);
    if ($actualSize > $maxBytes) {
        jsonResponse(400, ['ok' => false, 'error' => 'Attachments must be 10MB or smaller.']);
    }

    $tempPath = tempnam(sys_get_temp_dir(), 'ssp-feedback-');
    if ($tempPath === false || file_put_contents($tempPath, $content) === false) {
        jsonResponse(500, ['ok' => false, 'error' => 'The server could not prepare the attachment for Discord.']);
    }

    return [
        'path' => $tempPath,
        'name' => $name !== '' ? $name : 'stream-sync-pro-report-attachment',
        'type' => $mimeType !== '' ? $mimeType : 'application/octet-stream',
        'size' => $actualSize,
        'temporary' => true,
    ];
}

function sendBugReportToDiscord(array $config, array $payload): void
{
    $user = is_array($payload['user'] ?? null) ? $payload['user'] : [];
    $category = trim((string) ($payload['category'] ?? 'Bug'));

    $severity = trim((string) ($payload['severity'] ?? 'Normal'));
    $contact = trim((string) ($payload['contact'] ?? ''));
    $appVersion = trim((string) ($payload['appVersion'] ?? ''));
    $reportBody = trim((string) ($payload['reportBody'] ?? ''));
    $publicMessage = trim((string) ($payload['publicMessage'] ?? $reportBody));
    $diagnostics = is_array($payload['diagnostics'] ?? null) ? $payload['diagnostics'] : null;
    $attachment = is_array($payload['attachment'] ?? null) ? $payload['attachment'] : null;
    $ipAddress = trim((string) ($payload['ipAddress'] ?? ''));
    $diagnosticsText = $diagnostics
        ? json_encode($diagnostics, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
        : '';
    $createdAt = gmdate('c');

    $publicWebhookUrl = resolveDiscordPublicFeedbackWebhookUrl($config, $category);
    if ($publicWebhookUrl !== '') {
        postJsonToDiscordWebhook($publicWebhookUrl, buildPublicDiscordFeedbackPayload([
            'createdAt' => $createdAt,
            'category' => $category,
            'severity' => $severity,
            'appVersion' => $appVersion,
            'reportBody' => $publicMessage,
        ]));
    }

    $privateWebhookUrl = resolveDiscordPrivateFeedbackWebhookUrl($config, $category);
    $privatePayload = buildPrivateDiscordFeedbackPayload([
        'createdAt' => $createdAt,
        'user' => $user,
        'category' => $category,
        'severity' => $severity,
        'contact' => $contact,
        'appVersion' => $appVersion,
        'reportBody' => $reportBody,
        'diagnosticsText' => $diagnosticsText,
        'attachment' => $attachment,
        'ipAddress' => $ipAddress,
    ]);

    if ($attachment) {
        try {
            postMultipartToDiscordWebhook($privateWebhookUrl, $privatePayload, $attachment);
            return;
        } finally {
            if (!empty($attachment['temporary']) && !empty($attachment['path']) && is_string($attachment['path']) && file_exists($attachment['path'])) {
                @unlink($attachment['path']);
            }
        }
    }

    postJsonToDiscordWebhook($privateWebhookUrl, $privatePayload);
}

function buildPublicDiscordFeedbackPayload(array $payload): array
{
    $createdAt = trim((string) ($payload['createdAt'] ?? gmdate('c')));
    $category = trim((string) ($payload['category'] ?? 'Bug'));
    $severity = trim((string) ($payload['severity'] ?? 'Normal'));
    $appVersion = trim((string) ($payload['appVersion'] ?? ''));
    $summary = summarizePublicFeedbackReport((string) ($payload['reportBody'] ?? ''));

    return [
        'username' => 'Stream Sync Pro Public Feedback',
        'embeds' => [[
            'color' => resolveDiscordSeverityColor($severity),
            'fields' => [
                [
                    'name' => 'Created',
                    'value' => truncateDiscordText($createdAt, 1024),
                    'inline' => true,
                ],
                [
                    'name' => 'Category',
                    'value' => truncateDiscordText($category, 1024),
                    'inline' => true,
                ],
                [
                    'name' => 'Severity',
                    'value' => truncateDiscordText($severity, 1024),
                    'inline' => true,
                ],
                [
                    'name' => 'Version',
                    'value' => truncateDiscordText($appVersion !== '' ? $appVersion : 'Unknown', 1024),
                    'inline' => true,
                ],
                [
                    'name' => 'Message',
                    'value' => truncateDiscordText($summary, 1024),
                    'inline' => false,
                ],
            ],
        ]],
        'allowed_mentions' => ['parse' => []],
    ];
}

function buildPrivateDiscordFeedbackPayload(array $payload): array
{
    $createdAt = trim((string) ($payload['createdAt'] ?? gmdate('c')));
    $user = is_array($payload['user'] ?? null) ? $payload['user'] : [];
    $category = trim((string) ($payload['category'] ?? 'Bug'));
    $severity = trim((string) ($payload['severity'] ?? 'Normal'));
    $contact = trim((string) ($payload['contact'] ?? ''));
    $appVersion = trim((string) ($payload['appVersion'] ?? ''));
    $reportBody = trim((string) ($payload['reportBody'] ?? ''));
    $diagnosticsText = trim((string) ($payload['diagnosticsText'] ?? ''));
    $attachment = is_array($payload['attachment'] ?? null) ? $payload['attachment'] : null;
    $ipAddress = trim((string) ($payload['ipAddress'] ?? ''));

    $embed = [
        'title' => 'Stream Sync Pro Full ' . $category . ' Report',
        'description' => truncateDiscordText($reportBody, 3800),
        'color' => resolveDiscordSeverityColor($severity),
        'timestamp' => gmdate('c'),
        'fields' => [
            [
                'name' => 'Created',
                'value' => truncateDiscordText($createdAt, 1024),
                'inline' => true,
            ],
            [
                'name' => 'Category',
                'value' => truncateDiscordText($category, 1024),
                'inline' => true,
            ],
            [
                'name' => 'Severity',
                'value' => truncateDiscordText($severity, 1024),
                'inline' => true,
            ],
            [
                'name' => 'App Version',
                'value' => truncateDiscordText($appVersion !== '' ? $appVersion : 'Unknown', 1024),
                'inline' => true,
            ],
            [
                'name' => 'Account',
                'value' => truncateDiscordText(sprintf(
                    '%s <%s> (ID %s)',
                    (string) ($user['display_name'] ?? 'Unknown'),
                    (string) ($user['email'] ?? 'unknown'),
                    (string) ($user['id'] ?? 'unknown')
                ), 1024),
                'inline' => false,
            ],
            [
                'name' => 'Contact',
                'value' => truncateDiscordText($contact !== '' ? $contact : 'Not provided', 1024),
                'inline' => true,
            ],
            [
                'name' => 'IP Address',
                'value' => truncateDiscordText($ipAddress !== '' ? $ipAddress : 'Unknown', 1024),
                'inline' => true,
            ],
        ],
        'footer' => [
            'text' => 'Private full report. Do not repost publicly.',
        ],
    ];

    if ($diagnosticsText !== '') {
        $embed['fields'][] = [
            'name' => 'Diagnostics',
            'value' => '```json' . "\n" . truncateDiscordText($diagnosticsText, 950) . "\n" . '```',
            'inline' => false,
        ];
    }

    if ($attachment) {
        $embed['fields'][] = [
            'name' => 'Attachment',
            'value' => truncateDiscordText(sprintf(
                '%s (%s, %s)',
                (string) ($attachment['name'] ?? 'attachment'),
                formatBytes((int) ($attachment['size'] ?? 0)),
                (string) ($attachment['type'] ?? 'application/octet-stream')
            ), 1024),
            'inline' => false,
        ];
    }

    return [
        'username' => 'Stream Sync Pro Private Reports',
        'content' => sprintf('Private full %s report received: **%s**', $category, $severity),
        'embeds' => [$embed],
        'allowed_mentions' => ['parse' => []],
    ];
}

function formatBytes(int $bytes): string
{
    if ($bytes >= 1024 * 1024) {
        return round($bytes / (1024 * 1024), 2) . 'MB';
    }

    if ($bytes >= 1024) {
        return round($bytes / 1024, 1) . 'KB';
    }

    return $bytes . 'B';
}

function resolveDiscordPrivateFeedbackWebhookUrl(array $config, string $category): string
{
    $discordConfig = is_array($config['discord'] ?? null) ? $config['discord'] : [];
    $categoryKey = match ($category) {
        'Feature request' => 'private_feature_request_webhook_url',
        'UI feedback' => 'private_ui_feedback_webhook_url',
        'Performance' => 'private_performance_webhook_url',
        'Question' => 'private_question_webhook_url',
        default => 'private_bug_report_webhook_url',
    };

    $webhookUrl = trim((string) ($discordConfig[$categoryKey] ?? ''));
    if ($webhookUrl === '') {
        $webhookUrl = trim((string) ($discordConfig['private_feedback_webhook_url'] ?? ''));
    }

    if ($webhookUrl === '') {
        throw new RuntimeException('Private Discord feedback webhook is not configured.');
    }

    return $webhookUrl;
}

function resolveDiscordPublicFeedbackWebhookUrl(array $config, string $category): string
{
    $discordConfig = is_array($config['discord'] ?? null) ? $config['discord'] : [];
    $categoryKey = match ($category) {
        'Feature request' => 'feature_request_webhook_url',
        'UI feedback' => 'ui_feedback_webhook_url',
        'Performance' => 'performance_webhook_url',
        'Question' => 'question_webhook_url',
        default => 'bug_report_webhook_url',
    };

    return trim((string) ($discordConfig[$categoryKey] ?? ''));
}

function resolveDiscordSeverityColor(string $severity): int
{
    return match ($severity) {
        'Blocking' => 0xff315d,
        'High' => 0xff9f1c,
        'Low' => 0x4de7ff,
        default => 0x9068ff,
    };
}

function summarizePublicFeedbackReport(string $reportBody): string
{
    $summary = preg_replace('/[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}/i', '[email removed]', $reportBody);
    $summary = preg_replace('/\b(?:\d{1,3}\.){3}\d{1,3}\b/', '[ip removed]', (string) $summary);
    $summary = preg_replace('/https?:\/\/\S+|www\.\S+/i', '[link removed]', (string) $summary);
    $summary = preg_replace('/(?<!\w)@\w{2,32}\b/', '[handle removed]', (string) $summary);
    $summary = preg_replace('/\b(?:\+?\d[\d\s().-]{7,}\d)\b/', '[phone removed]', (string) $summary);
    $summary = preg_replace('/\b(contact|email|e-mail|phone|ip address|username|account)\s*:\s*[^\r\n]+/i', '$1: [removed]', (string) $summary);
    $summary = preg_replace('/\s+/', ' ', (string) $summary);
    $summary = trim((string) $summary);

    if ($summary === '') {
        return 'A new issue was reported. Private details were removed from the public summary.';
    }

    return truncateDiscordText($summary, 900);
}

function truncateDiscordText(string $value, int $maxLength): string
{
    $value = trim($value);
    if ($value === '') {
        return 'Not provided';
    }

    if (mb_strlen($value) <= $maxLength) {
        return $value;
    }

    return mb_substr($value, 0, max(0, $maxLength - 3)) . '...';
}

function postJsonToDiscordWebhook(string $webhookUrl, array $payload): void
{
    $body = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($body === false) {
        throw new RuntimeException('Unable to encode Discord bug report payload.');
    }

    if (function_exists('curl_init')) {
        $handle = curl_init($webhookUrl);
        curl_setopt_array($handle, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_TIMEOUT => 15,
        ]);

        $responseBody = curl_exec($handle);
        if ($responseBody === false) {
            $error = curl_error($handle);
            curl_close($handle);
            throw new RuntimeException('Discord bug report webhook failed: ' . $error);
        }

        $statusCode = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
        curl_close($handle);

        if ($statusCode < 200 || $statusCode >= 300) {
            throw new RuntimeException('Discord bug report webhook returned status ' . $statusCode . '.');
        }

        return;
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $body,
            'timeout' => 15,
            'ignore_errors' => true,
        ],
    ]);
    $response = file_get_contents($webhookUrl, false, $context);
    $statusLine = is_array($http_response_header ?? null) ? ($http_response_header[0] ?? '') : '';

    if ($response === false || !preg_match('/\s2\d\d\s/', $statusLine)) {
        throw new RuntimeException('Discord bug report webhook failed.');
    }
}

function postMultipartToDiscordWebhook(string $webhookUrl, array $payload, array $attachment): void
{
    $payloadJson = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($payloadJson === false) {
        throw new RuntimeException('Unable to encode Discord bug report payload.');
    }

    $filePath = (string) ($attachment['path'] ?? '');
    $fileName = (string) ($attachment['name'] ?? 'stream-sync-pro-report-attachment');
    $mimeType = (string) ($attachment['type'] ?? 'application/octet-stream');

    if ($filePath === '' || !is_readable($filePath)) {
        throw new RuntimeException('Feedback attachment is not readable.');
    }

    if (function_exists('curl_init') && class_exists('CURLFile')) {
        $handle = curl_init($webhookUrl);
        curl_setopt_array($handle, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => [
                'payload_json' => $payloadJson,
                'files[0]' => new CURLFile($filePath, $mimeType, $fileName),
            ],
            CURLOPT_TIMEOUT => 30,
        ]);

        $responseBody = curl_exec($handle);
        if ($responseBody === false) {
            $error = curl_error($handle);
            curl_close($handle);
            throw new RuntimeException('Discord bug report webhook failed: ' . $error);
        }

        $statusCode = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
        curl_close($handle);

        if ($statusCode < 200 || $statusCode >= 300) {
            throw new RuntimeException('Discord bug report webhook returned status ' . $statusCode . '.');
        }

        return;
    }

    [$body, $contentType] = buildMultipartBody([
        'payload_json' => $payloadJson,
    ], [
        [
            'field' => 'files[0]',
            'path' => $filePath,
            'name' => $fileName,
            'type' => $mimeType,
        ],
    ]);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: {$contentType}\r\n",
            'content' => $body,
            'timeout' => 30,
            'ignore_errors' => true,
        ],
    ]);
    $response = file_get_contents($webhookUrl, false, $context);
    $statusLine = is_array($http_response_header ?? null) ? ($http_response_header[0] ?? '') : '';

    if ($response === false || !preg_match('/\s2\d\d\s/', $statusLine)) {
        throw new RuntimeException('Discord bug report webhook failed.');
    }
}

function buildMultipartBody(array $fields, array $files): array
{
    $boundary = '----StreamSyncPro' . bin2hex(random_bytes(12));
    $body = '';

    foreach ($fields as $name => $value) {
        $body .= "--{$boundary}\r\n";
        $body .= 'Content-Disposition: form-data; name="' . addcslashes((string) $name, "\"\\") . "\"\r\n\r\n";
        $body .= (string) $value . "\r\n";
    }

    foreach ($files as $file) {
        $content = file_get_contents((string) ($file['path'] ?? ''));
        if ($content === false) {
            throw new RuntimeException('Feedback attachment is not readable.');
        }

        $body .= "--{$boundary}\r\n";
        $body .= 'Content-Disposition: form-data; name="' . addcslashes((string) ($file['field'] ?? 'file'), "\"\\") . '"; filename="' . addcslashes((string) ($file['name'] ?? 'attachment'), "\"\\") . "\"\r\n";
        $body .= 'Content-Type: ' . ((string) ($file['type'] ?? 'application/octet-stream')) . "\r\n\r\n";
        $body .= $content . "\r\n";
    }

    $body .= "--{$boundary}--\r\n";

    return [$body, 'multipart/form-data; boundary=' . $boundary];
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

function findOverlayStateByUserId(PDO $pdo, int $userId): ?array
{
    $statement = $pdo->prepare('SELECT * FROM auth_user_overlay_state WHERE user_id = :user_id LIMIT 1');
    $statement->execute([':user_id' => $userId]);
    $overlayState = $statement->fetch();

    return is_array($overlayState) ? $overlayState : null;
}

function requireValidOverlayAccess(PDO $pdo, array $query): array
{
    $overlayPublicId = trim((string) ($query['id'] ?? ''));
    if ($overlayPublicId !== '') {
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
             WHERE s.overlay_public_id = :overlay_public_id
             LIMIT 1'
        );
        $statement->execute([':overlay_public_id' => $overlayPublicId]);
        $overlayState = $statement->fetch();

        if (!$overlayState) {
            jsonResponse(401, ['ok' => false, 'error' => 'This overlay link is invalid. Reopen it from the app.']);
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

    $overlayToken = trim((string) ($query['token'] ?? ''));
    if ($overlayToken === '') {
        jsonResponse(401, ['ok' => false, 'error' => 'Overlay id is missing. Reopen the overlay URL from the app.']);
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
        'designerTemplate' => null,
        'items' => [],
    ];
}

function defaultCommandFeedbackOverlayState(): array
{
    return [
        'message' => '',
        'commandType' => '',
        'username' => '',
        'title' => 'Viewer Feedback',
        'accentColor' => '#53dcff',
        'sourceType' => 'command',
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'visibleUntil' => '',
        'durationMs' => 6000,
        'designerTemplate' => null,
    ];
}

function defaultJokeOverlayState(): array
{
    return [
        'visible' => false,
        'joke' => '',
        'setup' => '',
        'punchline' => '',
        'username' => '',
        'sourceType' => 'command',
        'title' => 'Joke Time',
        'accentColor' => '#ffd166',
        'backgroundColor' => '#071322',
        'textColor' => '#fff7e6',
        'fontFamily' => 'Segoe UI',
        'fontSize' => 34,
        'borderRadius' => 24,
        'displayMode' => 'card',
        'marqueeSpeed' => 70,
        'durationMs' => 8000,
        'visibleUntil' => '',
        'updatedAt' => gmdate('Y-m-d H:i:s'),
    ];
}

function defaultChatOverlayState(): array
{
    return [
        'connected' => false,
        'username' => '',
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'designerTemplate' => null,
        'items' => [],
    ];
}

function defaultGiftOverlayState(): array
{
    return [
        'connected' => false,
        'username' => '',
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'designerTemplate' => null,
        'items' => [],
    ];
}

function defaultLikesOverlayState(): array
{
    return [
        'connected' => false,
        'username' => '',
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'designerTemplate' => null,
        'items' => [],
    ];
}

function defaultViewerStatsOverlayState(): array
{
    return [
        'connected' => false,
        'username' => '',
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'filterAudience' => 'everyone',
        'filterUsername' => '',
        'designerTemplate' => null,
        'items' => [],
    ];
}

function defaultVoteOverlayState(): array
{
    return [
        'active' => false,
        'phase' => 'idle',
        'connected' => false,
        'username' => '',
        'orientation' => 'horizontal',
        'question' => '',
        'countdownSeconds' => 0,
        'countdownEndsAt' => '',
        'totalVotes' => 0,
        'instructions' => 'Type !vote [number] in chat to vote.',
        'options' => [],
        'startedBy' => '',
        'winningOptionIndex' => 0,
        'winningOptionLabel' => '',
        'spinEndsAt' => '',
        'resultVisibleUntil' => '',
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'designerTemplate' => null,
    ];
}

function defaultLikeRaceOverlayState(): array
{
    return [
        'raceEnabled' => false,
        'raceStatus' => 'idle',
        'countdownSeconds' => 10,
        'countdownEndsAt' => '',
        'totalSpaces' => 1000,
        'likeMultiplier' => 1,
        'giftMultiplier' => 5,
        'racers' => [],
        'leaderboard' => [],
        'currentLeader' => null,
        'previousLeader' => null,
        'winner' => null,
        'lastRaceWinner' => null,
        'commentaryQueue' => [],
        'centreMessage' => null,
        'middleContentVisibleUntil' => '',
        'overlayVisibleUntil' => '',
        'ttsSettings' => [],
        'overlaySettings' => [],
        'stats' => [],
        'updatedAt' => gmdate('Y-m-d H:i:s'),
    ];
}

function defaultSpinWheelOverlayState(): array
{
    return [
        'visible' => false,
        'phase' => 'idle',
        'spinId' => '',
        'selectedIndex' => 0,
        'durationMs' => 5200,
        'resultDurationMs' => 6000,
        'arrowPosition' => 'right',
        'fontSize' => 24,
        'borderThickness' => 4,
        'centerSize' => 118,
        'centerNameSize' => 20,
        'triggeredBy' => '',
        'triggerUser' => null,
        'segments' => [
            ['label' => 'Action 1', 'color' => '#11b76a'],
            ['label' => 'Action 2', 'color' => '#9bd400'],
            ['label' => 'Action 3', 'color' => '#ffd027'],
            ['label' => 'Action 4', 'color' => '#1598e8'],
            ['label' => 'Action 5', 'color' => '#7a35b4'],
            ['label' => 'Action 6', 'color' => '#d61e11'],
        ],
        'updatedAt' => gmdate('Y-m-d H:i:s'),
    ];
}

function defaultProgressBarOverlayState(): array
{
    return [
        'connected' => false,
        'username' => '',
        'bars' => [],
        'updatedAt' => gmdate('Y-m-d H:i:s'),
    ];
}

function sanitizeOverlayDesignerTemplatePayload($payload): ?array
{
    if (!is_array($payload)) {
        return null;
    }

    $elements = [];
    if (isset($payload['elements']) && is_array($payload['elements'])) {
        foreach (array_slice($payload['elements'], 0, 60) as $index => $element) {
            if (!is_array($element)) {
                continue;
            }

            $color = trim((string) ($element['color'] ?? '#f6fbff'));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $color)) {
                $color = '#f6fbff';
            }
            $glowColor = trim((string) ($element['glowColor'] ?? '#53dcff'));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $glowColor)) {
                $glowColor = '#53dcff';
            }
            $backgroundColor = trim((string) ($element['backgroundColor'] ?? '#10243d'));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $backgroundColor)) {
                $backgroundColor = '#10243d';
            }
            $borderColor = trim((string) ($element['borderColor'] ?? '#2a466b'));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $borderColor)) {
                $borderColor = '#2a466b';
            }

            $elements[] = [
                'id' => trim((string) ($element['id'] ?? ('overlay-element-' . $index))),
                'type' => trim((string) ($element['type'] ?? 'text')) ?: 'text',
                'name' => trim((string) ($element['name'] ?? 'Overlay Element')) ?: 'Overlay Element',
                'content' => (string) ($element['content'] ?? ''),
                'source' => trim((string) ($element['source'] ?? '')),
                'x' => max(0, (float) ($element['x'] ?? 0)),
                'y' => max(0, (float) ($element['y'] ?? 0)),
                'width' => max(40, (float) ($element['width'] ?? 220)),
                'height' => max(40, (float) ($element['height'] ?? 72)),
                'rotation' => max(-360, min(360, (float) ($element['rotation'] ?? 0))),
                'opacity' => max(0, min(1, (float) ($element['opacity'] ?? 1))),
                'fontFamily' => trim((string) ($element['fontFamily'] ?? 'Poppins, Segoe UI, sans-serif')) ?: 'Poppins, Segoe UI, sans-serif',
                'fontSize' => max(10, (int) ($element['fontSize'] ?? 28)),
                'fontWeight' => max(100, min(900, (int) ($element['fontWeight'] ?? 700))),
                'letterSpacing' => max(-4, min(24, (float) ($element['letterSpacing'] ?? 0))),
                'color' => $color,
                'glowColor' => $glowColor,
                'backgroundColor' => $backgroundColor,
                'backgroundOpacity' => max(0, min(1, (float) ($element['backgroundOpacity'] ?? 0))),
                'borderColor' => $borderColor,
                'borderWidth' => max(0, min(24, (float) ($element['borderWidth'] ?? 0))),
                'borderRadius' => max(0, min(240, (float) ($element['borderRadius'] ?? 18))),
                'blur' => max(0, min(40, (float) ($element['blur'] ?? 0))),
                'animation' => trim((string) ($element['animation'] ?? 'none')) ?: 'none',
                'binding' => trim((string) ($element['binding'] ?? '')),
                'visible' => !isset($element['visible']) || !empty($element['visible']),
                'locked' => !empty($element['locked']),
                'zIndex' => max(1, (int) ($element['zIndex'] ?? ($index + 1))),
            ];
        }
    }

    $backgroundColor = trim((string) ($payload['backgroundColor'] ?? '#08111f'));
    if (!preg_match('/^#[0-9a-fA-F]{6}$/', $backgroundColor)) {
        $backgroundColor = '#08111f';
    }

    return [
        'id' => trim((string) ($payload['id'] ?? 'designer-template')) ?: 'designer-template',
        'name' => trim((string) ($payload['name'] ?? 'Overlay Template')) ?: 'Overlay Template',
        'width' => max(320, (int) ($payload['width'] ?? 1920)),
        'height' => max(320, (int) ($payload['height'] ?? 1080)),
        'backgroundColor' => $backgroundColor,
        'backgroundOpacity' => max(0, min(1, (float) ($payload['backgroundOpacity'] ?? 0.45))),
        'backgroundImage' => trim((string) ($payload['backgroundImage'] ?? '')),
        'backgroundVideo' => trim((string) ($payload['backgroundVideo'] ?? '')),
        'autoLoad' => trim((string) ($payload['autoLoad'] ?? '')),
        'elements' => $elements,
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

            $media = null;
            if (isset($item['media']) && is_array($item['media'])) {
                $mediaUrl = trim((string) ($item['media']['url'] ?? ''));
                if ($mediaUrl !== '') {
                    $mediaType = (($item['media']['type'] ?? '') === 'video') ? 'video' : 'image';
                    $media = [
                        'type' => $mediaType,
                        'url' => $mediaUrl,
                        'name' => mb_substr(trim((string) ($item['media']['name'] ?? 'Queue media')), 0, 160),
                        'durationMs' => max(1000, min(60000, (int) ($item['media']['durationMs'] ?? 6000))),
                    ];
                }
            }

            $source = null;
            if (isset($item['source']) && is_array($item['source'])) {
                $source = [
                    'user' => mb_substr(trim((string) ($item['source']['user'] ?? '')), 0, 120),
                    'displayName' => mb_substr(trim((string) ($item['source']['displayName'] ?? '')), 0, 160),
                    'profilePictureUrl' => mb_substr(trim((string) ($item['source']['profilePictureUrl'] ?? '')), 0, 1024),
                ];
            }

            $items[] = [
                'id' => trim((string) ($item['id'] ?? ('queue-item-' . $index))),
                'label' => trim((string) ($item['label'] ?? 'Queued action')) ?: 'Queued action',
                'queueId' => max(1, min(10, (int) ($item['queueId'] ?? 1))),
                'kind' => (($item['kind'] ?? '') === 'tts') ? 'tts' : 'action',
                'status' => (($item['status'] ?? '') === 'running') ? 'running' : 'queued',
                'source' => $source,
                'media' => $media,
            ];
        }
    }

    return [
        'connected' => !empty($payload['connected']),
        'username' => trim((string) ($payload['username'] ?? '')),
        'queueCount' => max(0, (int) ($payload['queueCount'] ?? count($items))),
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'designerTemplate' => sanitizeOverlayDesignerTemplatePayload($payload['designerTemplate'] ?? null),
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

    $accentColor = trim((string) ($payload['accentColor'] ?? ''));
    if (!preg_match('/^#[0-9a-fA-F]{6}$/', $accentColor)) {
        $accentColor = '#53dcff';
    }

    return [
        'message' => trim((string) ($payload['message'] ?? '')),
        'commandType' => trim((string) ($payload['commandType'] ?? '')),
        'username' => trim((string) ($payload['username'] ?? '')),
        'title' => trim((string) ($payload['title'] ?? '')) ?: 'Viewer Feedback',
        'accentColor' => $accentColor,
        'sourceType' => trim((string) ($payload['sourceType'] ?? '')) ?: 'command',
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'visibleUntil' => $visibleUntil,
        'durationMs' => $durationMs,
        'designerTemplate' => sanitizeOverlayDesignerTemplatePayload($payload['designerTemplate'] ?? null),
    ];
}

function sanitizeJokeOverlayStatePayload(array $payload): array
{
    $durationMs = max(1000, min(60000, (int) ($payload['durationMs'] ?? 8000)));
    $visibleUntil = trim((string) ($payload['visibleUntil'] ?? ''));
    if ($visibleUntil === '' && !empty($payload['visible'])) {
        $visibleUntil = gmdate('Y-m-d H:i:s', time() + (int) ceil($durationMs / 1000));
    }

    $accentColor = trim((string) ($payload['accentColor'] ?? ''));
    if (!preg_match('/^#[0-9a-fA-F]{6}$/', $accentColor)) {
        $accentColor = '#ffd166';
    }
    $backgroundColor = trim((string) ($payload['backgroundColor'] ?? ''));
    if (!preg_match('/^#[0-9a-fA-F]{6}$/', $backgroundColor)) {
        $backgroundColor = '#071322';
    }
    $textColor = trim((string) ($payload['textColor'] ?? ''));
    if (!preg_match('/^#[0-9a-fA-F]{6}$/', $textColor)) {
        $textColor = '#fff7e6';
    }

    $setup = trim((string) ($payload['setup'] ?? ''));
    $punchline = trim((string) ($payload['punchline'] ?? ''));
    $joke = trim((string) ($payload['joke'] ?? implode(' ', array_filter([$setup, $punchline]))));

    return [
        'visible' => !empty($payload['visible']),
        'joke' => mb_substr($joke, 0, 1200),
        'setup' => mb_substr($setup, 0, 800),
        'punchline' => mb_substr($punchline, 0, 800),
        'username' => mb_substr(trim((string) ($payload['username'] ?? '')), 0, 120),
        'sourceType' => mb_substr(trim((string) ($payload['sourceType'] ?? 'command')) ?: 'command', 0, 80),
        'title' => mb_substr(trim((string) ($payload['title'] ?? 'Joke Time')) ?: 'Joke Time', 0, 120),
        'accentColor' => $accentColor,
        'backgroundColor' => $backgroundColor,
        'textColor' => $textColor,
        'fontFamily' => mb_substr(trim((string) ($payload['fontFamily'] ?? 'Segoe UI')) ?: 'Segoe UI', 0, 160),
        'fontSize' => max(14, min(120, (int) ($payload['fontSize'] ?? 34))),
        'borderRadius' => max(0, min(80, (int) ($payload['borderRadius'] ?? 24))),
        'displayMode' => trim((string) ($payload['displayMode'] ?? '')) === 'marquee' ? 'marquee' : 'card',
        'marqueeSpeed' => max(20, min(140, (int) ($payload['marqueeSpeed'] ?? 70))),
        'durationMs' => $durationMs,
        'visibleUntil' => $visibleUntil,
        'updatedAt' => gmdate('Y-m-d H:i:s'),
    ];
}

function sanitizeChatOverlayStatePayload(array $payload): array
{
    $items = [];

    if (isset($payload['items']) && is_array($payload['items'])) {
        foreach (array_slice($payload['items'], 0, 20) as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $message = trim((string) ($item['message'] ?? ''));
            if ($message === '') {
                continue;
            }

            $items[] = [
                'id' => trim((string) ($item['id'] ?? ('chat-item-' . $index))),
                'username' => trim((string) ($item['username'] ?? '')),
                'message' => $message,
                'originalMessage' => trim((string) ($item['originalMessage'] ?? '')),
            ];
        }
    }

    return [
        'connected' => !empty($payload['connected']),
        'username' => trim((string) ($payload['username'] ?? '')),
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'designerTemplate' => sanitizeOverlayDesignerTemplatePayload($payload['designerTemplate'] ?? null),
        'items' => $items,
    ];
}

function sanitizeGiftOverlayStatePayload(array $payload): array
{
    $items = [];

    if (isset($payload['items']) && is_array($payload['items'])) {
        foreach (array_slice($payload['items'], 0, 20) as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $items[] = [
                'id' => trim((string) ($item['id'] ?? ('gift-item-' . $index))),
                'username' => trim((string) ($item['username'] ?? '')),
                'nickname' => trim((string) ($item['nickname'] ?? $item['displayName'] ?? $item['username'] ?? '')),
                'displayName' => trim((string) ($item['displayName'] ?? $item['nickname'] ?? $item['username'] ?? '')),
                'giftName' => trim((string) ($item['giftName'] ?? 'Gift')) ?: 'Gift',
                'giftImageUrl' => preg_replace('/^http:\/\//i', 'https://', trim((string) ($item['giftImageUrl'] ?? ''))),
                'giftCount' => max(1, (int) ($item['giftCount'] ?? 1)),
                'totalCoins' => max(0, (int) ($item['totalCoins'] ?? 0)),
                'message' => trim((string) ($item['message'] ?? '')),
            ];
        }
    }

    return [
        'connected' => !empty($payload['connected']),
        'username' => trim((string) ($payload['username'] ?? '')),
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'designerTemplate' => sanitizeOverlayDesignerTemplatePayload($payload['designerTemplate'] ?? null),
        'items' => $items,
    ];
}

function sanitizeLikesOverlayStatePayload(array $payload): array
{
    $items = [];

    if (isset($payload['items']) && is_array($payload['items'])) {
        foreach (array_slice($payload['items'], 0, 20) as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $username = trim((string) ($item['username'] ?? ''));
            $likes = max(0, (int) ($item['likes'] ?? 0));
            if ($username === '' || $likes <= 0) {
                continue;
            }

            $items[] = [
                'rank' => max(1, (int) ($item['rank'] ?? ($index + 1))),
                'username' => $username,
                'likes' => $likes,
            ];
        }
    }

    usort($items, static function (array $left, array $right): int {
        $likesComparison = ($right['likes'] ?? 0) <=> ($left['likes'] ?? 0);
        if ($likesComparison !== 0) {
            return $likesComparison;
        }

        return strcmp((string) ($left['username'] ?? ''), (string) ($right['username'] ?? ''));
    });

    foreach ($items as $index => &$item) {
        $item['rank'] = $index + 1;
    }
    unset($item);

    return [
        'connected' => !empty($payload['connected']),
        'username' => trim((string) ($payload['username'] ?? '')),
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'designerTemplate' => sanitizeOverlayDesignerTemplatePayload($payload['designerTemplate'] ?? null),
        'items' => array_slice($items, 0, 10),
    ];
}

function sanitizeViewerStatsOverlayStatePayload(array $payload): array
{
    $items = [];

    if (isset($payload['items']) && is_array($payload['items'])) {
        foreach (array_slice($payload['items'], 0, 10) as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $username = trim((string) ($item['username'] ?? ''));
            if ($username === '') {
                continue;
            }

            $displayName = trim((string) ($item['displayName'] ?? $username));
            $likes = max(0, (int) ($item['likes'] ?? 0));
            $comments = max(0, (int) ($item['comments'] ?? 0));
            $shares = max(0, (int) ($item['shares'] ?? 0));
            $follows = max(0, (int) ($item['follows'] ?? 0));
            $coins = max(0, (int) ($item['coins'] ?? 0));
            $gifts = max(0, (int) ($item['gifts'] ?? 0));
            $totalScore = max(0, (int) ($item['totalScore'] ?? ($likes + $comments + $shares + $follows + $gifts + $coins)));
            $rankScore = max(0, (float) ($item['rankScore'] ?? (($likes * 0.01) + $gifts + $comments + $shares + $coins)));
            $allTimeLikes = max(0, (int) ($item['allTimeLikes'] ?? 0));
            $allTimeComments = max(0, (int) ($item['allTimeComments'] ?? 0));
            $allTimeShares = max(0, (int) ($item['allTimeShares'] ?? 0));
            $allTimeFollows = max(0, (int) ($item['allTimeFollows'] ?? 0));
            $allTimeCoins = max(0, (int) ($item['allTimeCoins'] ?? 0));
            $allTimeGifts = max(0, (int) ($item['allTimeGifts'] ?? 0));
            $allTimeTotalScore = max(
                0,
                (int) ($item['allTimeTotalScore'] ?? ($allTimeLikes + $allTimeComments + $allTimeShares + $allTimeFollows + $allTimeGifts + $allTimeCoins))
            );
            $allTimeRankScore = max(
                0,
                (float) ($item['allTimeRankScore'] ?? (($allTimeLikes * 0.01) + $allTimeGifts + $allTimeComments + $allTimeShares + $allTimeCoins))
            );

            $items[] = [
                'rank' => $index + 1,
                'username' => $username,
                'displayName' => $displayName !== '' ? $displayName : $username,
                'isSubscriber' => !empty($item['isSubscriber']),
                'isModerator' => !empty($item['isModerator']),
                'likes' => $likes,
                'comments' => $comments,
                'shares' => $shares,
                'follows' => $follows,
                'coins' => $coins,
                'gifts' => $gifts,
                'totalScore' => $totalScore,
                'rankScore' => $rankScore,
                'allTimeLikes' => $allTimeLikes,
                'allTimeComments' => $allTimeComments,
                'allTimeShares' => $allTimeShares,
                'allTimeFollows' => $allTimeFollows,
                'allTimeCoins' => $allTimeCoins,
                'allTimeGifts' => $allTimeGifts,
                'allTimeTotalScore' => $allTimeTotalScore,
                'allTimeRankScore' => $allTimeRankScore,
            ];
        }
    }

    $filterAudience = trim(strtolower((string) ($payload['filterAudience'] ?? 'everyone')));
    if (!in_array($filterAudience, ['everyone', 'subscriber', 'moderator', 'username'], true)) {
        $filterAudience = 'everyone';
    }

    return [
        'connected' => !empty($payload['connected']),
        'username' => trim((string) ($payload['username'] ?? '')),
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'filterAudience' => $filterAudience,
        'filterUsername' => trim((string) ($payload['filterUsername'] ?? '')),
        'designerTemplate' => sanitizeOverlayDesignerTemplatePayload($payload['designerTemplate'] ?? null),
        'items' => $items,
    ];
}

function sanitizeVoteOverlayStatePayload(array $payload): array
{
    $options = [];

    if (isset($payload['options']) && is_array($payload['options'])) {
        foreach (array_slice($payload['options'], 0, 12) as $index => $item) {
            if (!is_array($item)) {
                continue;
            }

            $label = trim((string) ($item['label'] ?? ''));
            if ($label === '') {
                continue;
            }

            $options[] = [
                'index' => max(1, (int) ($item['index'] ?? ($index + 1))),
                'label' => $label,
                'votes' => max(0, (int) ($item['votes'] ?? 0)),
                'percent' => max(0, min(100, (int) ($item['percent'] ?? 0))),
            ];
        }
    }

    return [
        'active' => !empty($payload['active']),
        'phase' => in_array(($payload['phase'] ?? ''), ['open', 'spinning', 'result', 'idle'], true) ? (string) $payload['phase'] : 'idle',
        'connected' => !empty($payload['connected']),
        'username' => trim((string) ($payload['username'] ?? '')),
        'orientation' => (($payload['orientation'] ?? '') === 'vertical') ? 'vertical' : 'horizontal',
        'question' => trim((string) ($payload['question'] ?? '')),
        'countdownSeconds' => max(0, (int) ($payload['countdownSeconds'] ?? 0)),
        'countdownEndsAt' => trim((string) ($payload['countdownEndsAt'] ?? '')),
        'totalVotes' => max(0, (int) ($payload['totalVotes'] ?? 0)),
        'instructions' => trim((string) ($payload['instructions'] ?? '')) ?: 'Type !vote [number] in chat to vote.',
        'options' => $options,
        'startedBy' => trim((string) ($payload['startedBy'] ?? '')),
        'winningOptionIndex' => max(0, (int) ($payload['winningOptionIndex'] ?? 0)),
        'winningOptionLabel' => trim((string) ($payload['winningOptionLabel'] ?? '')),
        'spinEndsAt' => trim((string) ($payload['spinEndsAt'] ?? '')),
        'resultVisibleUntil' => trim((string) ($payload['resultVisibleUntil'] ?? '')),
        'updatedAt' => gmdate('Y-m-d H:i:s'),
        'designerTemplate' => sanitizeOverlayDesignerTemplatePayload($payload['designerTemplate'] ?? null),
    ];
}

function sanitizeLikeRaceRacerPayload($payload, int $fallbackRank = 1): ?array
{
    if (!is_array($payload)) {
        return null;
    }

    $username = trim((string) ($payload['username'] ?? ''));
    $userId = trim((string) ($payload['userId'] ?? $username));
    if ($userId === '' && $username === '') {
        return null;
    }

    $displayName = trim((string) ($payload['displayName'] ?? $username));
    $spacesMoved = max(0, (float) ($payload['spacesMoved'] ?? 0));
    $progressPercent = max(0, min(100, (float) ($payload['progressPercent'] ?? 0)));

    return [
        'userId' => $userId !== '' ? mb_substr($userId, 0, 120) : mb_substr($username, 0, 120),
        'username' => mb_substr($username !== '' ? $username : $userId, 0, 120),
        'displayName' => mb_substr($displayName !== '' ? $displayName : ($username !== '' ? $username : $userId), 0, 160),
        'profilePictureUrl' => mb_substr(trim((string) ($payload['profilePictureUrl'] ?? '')), 0, 1024),
        'spacesMoved' => $spacesMoved,
        'progressPercent' => $progressPercent,
        'trackPosition' => max(0, min(1, (float) ($payload['trackPosition'] ?? ($progressPercent / 100)))),
        'likesReceived' => max(0, (int) ($payload['likesReceived'] ?? 0)),
        'giftsReceived' => max(0, (int) ($payload['giftsReceived'] ?? 0)),
        'giftCoinsReceived' => max(0, (int) ($payload['giftCoinsReceived'] ?? 0)),
        'lastActionTime' => max(0, (int) ($payload['lastActionTime'] ?? 0)),
        'isInactive' => !empty($payload['isInactive']),
        'hasTriggeredInactiveCommentary' => !empty($payload['hasTriggeredInactiveCommentary']),
        'currentRank' => max(1, (int) ($payload['currentRank'] ?? $fallbackRank)),
        'previousRank' => max(1, (int) ($payload['previousRank'] ?? $fallbackRank)),
        'speechBubble' => mb_substr(trim((string) ($payload['speechBubble'] ?? '')), 0, 180),
    ];
}

function sanitizeLikeRaceNullableRacerPayload($payload): ?array
{
    return is_array($payload) ? sanitizeLikeRaceRacerPayload($payload) : null;
}

function sanitizeLikeRaceOverlayStatePayload(array $payload): array
{
    $racers = [];
    if (isset($payload['racers']) && is_array($payload['racers'])) {
        foreach (array_slice($payload['racers'], 0, 100) as $index => $racer) {
            $sanitized = sanitizeLikeRaceRacerPayload($racer, $index + 1);
            if ($sanitized !== null) {
                $racers[] = $sanitized;
            }
        }
    }

    $leaderboard = [];
    if (isset($payload['leaderboard']) && is_array($payload['leaderboard'])) {
        foreach (array_slice($payload['leaderboard'], 0, 100) as $index => $racer) {
            $sanitized = sanitizeLikeRaceRacerPayload($racer, $index + 1);
            if ($sanitized !== null) {
                $leaderboard[] = $sanitized;
            }
        }
    }

    if (!$leaderboard) {
        $leaderboard = $racers;
    }

    $commentaryQueue = [];
    if (isset($payload['commentaryQueue']) && is_array($payload['commentaryQueue'])) {
        foreach (array_slice($payload['commentaryQueue'], -12) as $index => $item) {
            if (!is_array($item)) {
                continue;
            }
            $commentaryQueue[] = [
                'id' => mb_substr(trim((string) ($item['id'] ?? ('commentary-' . $index))), 0, 120),
                'eventType' => mb_substr(trim((string) ($item['eventType'] ?? 'commentary')), 0, 80),
                'text' => mb_substr(trim((string) ($item['text'] ?? '')), 0, 240),
                'priority' => max(0, (int) ($item['priority'] ?? 0)),
                'createdAt' => max(0, (int) ($item['createdAt'] ?? 0)),
            ];
        }
    }

    $status = (string) ($payload['raceStatus'] ?? 'idle');
    if (!in_array($status, ['idle', 'lobby', 'countdown', 'running', 'finished'], true)) {
        $status = 'idle';
    }

    $centreMessage = null;
    if (isset($payload['centreMessage']) && is_array($payload['centreMessage'])) {
        $centreMessage = [
            'text' => mb_substr(trim((string) ($payload['centreMessage']['text'] ?? '')), 0, 220),
            'visibleUntil' => trim((string) ($payload['centreMessage']['visibleUntil'] ?? '')),
        ];
    }

    return [
        'raceEnabled' => !empty($payload['raceEnabled']),
        'raceStatus' => $status,
        'countdownSeconds' => max(0, min(600, (int) ($payload['countdownSeconds'] ?? 10))),
        'countdownEndsAt' => trim((string) ($payload['countdownEndsAt'] ?? '')),
        'totalSpaces' => max(1, min(1000000, (int) ($payload['totalSpaces'] ?? 1000))),
        'likeMultiplier' => max(0, min(1000, (float) ($payload['likeMultiplier'] ?? 1))),
        'giftMultiplier' => max(0, min(1000, (float) ($payload['giftMultiplier'] ?? 5))),
        'racers' => $racers,
        'leaderboard' => $leaderboard,
        'currentLeader' => sanitizeLikeRaceNullableRacerPayload($payload['currentLeader'] ?? null),
        'previousLeader' => sanitizeLikeRaceNullableRacerPayload($payload['previousLeader'] ?? null),
        'winner' => sanitizeLikeRaceNullableRacerPayload($payload['winner'] ?? null),
        'lastRaceWinner' => sanitizeLikeRaceNullableRacerPayload($payload['lastRaceWinner'] ?? null),
        'commentaryQueue' => $commentaryQueue,
        'centreMessage' => $centreMessage,
        'middleContentVisibleUntil' => trim((string) ($payload['middleContentVisibleUntil'] ?? '')),
        'overlayVisibleUntil' => trim((string) ($payload['overlayVisibleUntil'] ?? '')),
        'ttsSettings' => is_array($payload['ttsSettings'] ?? null) ? array_slice($payload['ttsSettings'], 0, 80, true) : [],
        'overlaySettings' => is_array($payload['overlaySettings'] ?? null) ? array_slice($payload['overlaySettings'], 0, 40, true) : [],
        'stats' => is_array($payload['stats'] ?? null) ? array_slice($payload['stats'], 0, 100, true) : [],
        'updatedAt' => gmdate('Y-m-d H:i:s'),
    ];
}

function sanitizeSpinWheelOverlayStatePayload(array $payload): array
{
    $segments = [];
    if (isset($payload['segments']) && is_array($payload['segments'])) {
        foreach (array_slice($payload['segments'], 0, 16) as $index => $segment) {
            if (!is_array($segment)) {
                continue;
            }

            $label = mb_substr(trim((string) ($segment['label'] ?? ('Action ' . ($index + 1)))), 0, 80);
            if ($label === '') {
                $label = 'Action ' . ($index + 1);
            }

            $color = trim((string) ($segment['color'] ?? ''));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $color)) {
                $fallbackColors = ['#11b76a', '#9bd400', '#ffd027', '#1598e8', '#7a35b4', '#d61e11'];
                $color = $fallbackColors[$index % count($fallbackColors)];
            }

            $segments[] = [
                'label' => $label,
                'color' => $color,
            ];
        }
    }

    if (!$segments) {
        $segments = defaultSpinWheelOverlayState()['segments'];
    }

    $phase = trim((string) ($payload['phase'] ?? 'idle'));
    if (!in_array($phase, ['idle', 'spinning', 'result'], true)) {
        $phase = 'idle';
    }

    $arrowPosition = trim(strtolower((string) ($payload['arrowPosition'] ?? 'right')));
    if (!in_array($arrowPosition, ['right', 'left', 'top', 'bottom'], true)) {
        $arrowPosition = 'right';
    }

    $triggerUser = null;
    if (isset($payload['triggerUser']) && is_array($payload['triggerUser'])) {
        $triggerUser = [
            'username' => mb_substr(trim((string) ($payload['triggerUser']['username'] ?? '')), 0, 120),
            'displayName' => mb_substr(trim((string) ($payload['triggerUser']['displayName'] ?? '')), 0, 160),
            'profilePictureUrl' => mb_substr(trim((string) ($payload['triggerUser']['profilePictureUrl'] ?? '')), 0, 1024),
        ];
    }

    return [
        'visible' => !empty($payload['visible']),
        'phase' => $phase,
        'spinId' => mb_substr(trim((string) ($payload['spinId'] ?? '')), 0, 120),
        'selectedIndex' => max(0, min(count($segments) - 1, (int) ($payload['selectedIndex'] ?? 0))),
        'durationMs' => max(1000, min(30000, (int) ($payload['durationMs'] ?? 5200))),
        'resultDurationMs' => max(1000, min(30000, (int) ($payload['resultDurationMs'] ?? 6000))),
        'arrowPosition' => $arrowPosition,
        'fontSize' => max(14, min(48, (int) ($payload['fontSize'] ?? 24))),
        'borderThickness' => max(1, min(10, (float) ($payload['borderThickness'] ?? 4))),
        'centerSize' => max(72, min(240, (int) ($payload['centerSize'] ?? 118))),
        'centerNameSize' => max(12, min(40, (int) ($payload['centerNameSize'] ?? 20))),
        'triggeredBy' => mb_substr(trim((string) ($payload['triggeredBy'] ?? '')), 0, 160),
        'triggerUser' => $triggerUser,
        'segments' => $segments,
        'updatedAt' => gmdate('Y-m-d H:i:s'),
    ];
}

function sanitizeProgressBarOverlayStatePayload(array $payload): array
{
    $bars = [];
    $allowedProgressBarFonts = [
        'Segoe UI',
        'Arial',
        'Verdana',
        'Tahoma',
        'Trebuchet MS',
        'Georgia',
        'Impact',
        'Courier New',
        'Poppins',
        'Montserrat',
        'Oswald',
        'Bebas Neue',
    ];
    if (isset($payload['bars']) && is_array($payload['bars'])) {
        foreach (array_slice($payload['bars'], 0, 25) as $index => $bar) {
            if (!is_array($bar)) {
                continue;
            }

            $metric = trim((string) ($bar['metric'] ?? 'likes'));
            if (!in_array($metric, ['likes', 'shares', 'follows', 'coins'], true)) {
                $metric = 'likes';
            }

            $goal = max(1, (int) ($bar['goal'] ?? 1));
            $value = max(0, (float) ($bar['value'] ?? 0));
            $behavior = trim((string) ($bar['goalReachedBehavior'] ?? 'increase'));
            if (!in_array($behavior, ['double', 'increase', 'hide'], true)) {
                $behavior = 'increase';
            }
            $goalAnimation = trim((string) ($bar['goalAnimation'] ?? 'pulse'));
            if (!in_array($goalAnimation, ['none', 'pulse', 'flash', 'bounce', 'sparkle', 'confetti'], true)) {
                $goalAnimation = 'pulse';
            }

            $titleColor = trim((string) ($bar['titleColor'] ?? '#f2fbff'));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $titleColor)) {
                $titleColor = '#f2fbff';
            }
            $textColor = trim((string) ($bar['textColor'] ?? '#f2fbff'));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $textColor)) {
                $textColor = '#f2fbff';
            }
            $mutedColor = trim((string) ($bar['mutedColor'] ?? '#a7bfdd'));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $mutedColor)) {
                $mutedColor = '#a7bfdd';
            }
            $barStartColor = trim((string) ($bar['barStartColor'] ?? '#53dcff'));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $barStartColor)) {
                $barStartColor = '#53dcff';
            }
            $barEndColor = trim((string) ($bar['barEndColor'] ?? '#b266ff'));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $barEndColor)) {
                $barEndColor = '#b266ff';
            }
            $backgroundColor = trim((string) ($bar['backgroundColor'] ?? '#091226'));
            if (!preg_match('/^#[0-9a-fA-F]{6}$/', $backgroundColor)) {
                $backgroundColor = '#091226';
            }
            $fontFamily = trim((string) ($bar['fontFamily'] ?? 'Segoe UI'));
            if (!in_array($fontFamily, $allowedProgressBarFonts, true)) {
                $fontFamily = 'Segoe UI';
            }
            $textPosition = trim((string) ($bar['textPosition'] ?? 'above'));
            if (!in_array($textPosition, ['above', 'below', 'inside'], true)) {
                $textPosition = 'above';
            }

            $bars[] = [
                'id' => mb_substr(trim((string) ($bar['id'] ?? ('progress-bar-' . ($index + 1)))), 0, 120),
                'title' => mb_substr(trim((string) ($bar['title'] ?? ('Progress Goal ' . ($index + 1)))), 0, 140),
                'eyebrowText' => mb_substr(trim((string) ($bar['eyebrowText'] ?? 'Live Goal')), 0, 80) ?: 'Live Goal',
                'metric' => $metric,
                'value' => $value,
                'goal' => $goal,
                'percent' => max(0, min(100, (float) ($bar['percent'] ?? (($value / $goal) * 100)))),
                'visible' => !isset($bar['visible']) || !empty($bar['visible']),
                'hideBackground' => !empty($bar['hideBackground']),
                'hideText' => !empty($bar['hideText']),
                'textPosition' => $textPosition,
                'goalIncreasePercent' => max(1, min(1000, (int) ($bar['goalIncreasePercent'] ?? 25))),
                'titleColor' => $titleColor,
                'textColor' => $textColor,
                'mutedColor' => $mutedColor,
                'barStartColor' => $barStartColor,
                'barEndColor' => $barEndColor,
                'backgroundColor' => $backgroundColor,
                'fontFamily' => $fontFamily,
                'eyebrowFontSize' => max(8, min(72, (int) ($bar['eyebrowFontSize'] ?? 12))),
                'titleFontSize' => max(12, min(140, (int) ($bar['titleFontSize'] ?? 44))),
                'metricFontSize' => max(8, min(72, (int) ($bar['metricFontSize'] ?? 12))),
                'labelFontSize' => max(8, min(96, (int) ($bar['labelFontSize'] ?? 15))),
                'footerFontSize' => max(8, min(72, (int) ($bar['footerFontSize'] ?? 13))),
                'goalReachedBehavior' => $behavior,
                'goalAnimation' => $goalAnimation,
                'goalAnimationNonce' => mb_substr(trim((string) ($bar['goalAnimationNonce'] ?? '')), 0, 120),
                'goalAnimationAt' => mb_substr(trim((string) ($bar['goalAnimationAt'] ?? '')), 0, 80),
                'actionRuleId' => mb_substr(trim((string) ($bar['actionRuleId'] ?? '')), 0, 160),
                'reachedCount' => max(0, (int) ($bar['reachedCount'] ?? 0)),
                'updatedAt' => mb_substr(trim((string) ($bar['updatedAt'] ?? '')), 0, 80),
            ];
        }
    }

    return [
        'connected' => !empty($payload['connected']),
        'username' => mb_substr(trim((string) ($payload['username'] ?? '')), 0, 120),
        'bars' => $bars,
        'updatedAt' => gmdate('Y-m-d H:i:s'),
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
        'referralCode' => (string) ($user['referral_code'] ?? ''),
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

function sendSignupNotificationEmailSafe(array $config, array $payload): void
{
    try {
        sendSignupNotificationEmail($config, $payload);
    } catch (Throwable $exception) {
        error_log('Signup notification email failed: ' . $exception->getMessage());
    }
}

function sendSignupNotificationEmail(array $config, array $payload): void
{
    $fromEmail = (string) ($config['mail']['from_email'] ?? '');
    $fromName = (string) ($config['mail']['from_name'] ?? 'Stream Sync Pro');
    $toEmail = (string) ($config['contact']['to_email'] ?? 'info@streamsyncpro.co.uk');
    $toName = (string) ($config['contact']['to_name'] ?? 'Stream Sync Pro Support');
    $appName = (string) ($config['app']['name'] ?? 'Stream Sync Pro');

    if ($fromEmail === '' || $toEmail === '') {
        throw new RuntimeException('Signup notification email routing is missing in config.php.');
    }

    $displayName = trim((string) ($payload['displayName'] ?? ''));
    $email = normalizeEmail((string) ($payload['email'] ?? ''));
    $credits = max(0, (int) ($payload['credits'] ?? 0));
    $isExistingUnverified = !empty($payload['isExistingUnverified']);
    $signupTime = gmdate('Y-m-d H:i:s') . ' UTC';
    $ipAddress = resolveClientIp() ?? 'Unknown';
    $subject = '[New Signup] Stream Sync Pro LIVE';
    $textBody = implode("\n", [
        'A new Stream Sync Pro LIVE signup has started.',
        '',
        'Display name: ' . ($displayName !== '' ? $displayName : 'Not provided'),
        'Email: ' . $email,
        'Signup credits: ' . $credits,
        'Signup type: ' . ($isExistingUnverified ? 'Existing unverified account updated' : 'New account'),
        'IP address: ' . $ipAddress,
        'Time: ' . $signupTime,
    ]);
    $htmlBody = renderBrandedEmailHtml($appName, [
        'eyebrow' => 'New Signup',
        'title' => 'New Stream Sync Pro LIVE signup',
        'intro' => 'A new user has started registration and has been sent their verification code.',
        'sections' => [
            ['label' => 'Display name', 'value' => $displayName !== '' ? $displayName : 'Not provided'],
            ['label' => 'Email', 'value' => $email],
            ['label' => 'Signup credits', 'value' => (string) $credits],
            ['label' => 'Signup type', 'value' => $isExistingUnverified ? 'Existing unverified account updated' : 'New account'],
            ['label' => 'IP address', 'value' => $ipAddress],
            ['label' => 'Time', 'value' => $signupTime],
        ],
        'footnote' => 'This is an automatic signup notification from Stream Sync Pro LIVE.',
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
            'replyToEmail' => $email !== '' ? $email : $fromEmail,
            'replyToName' => $displayName !== '' ? $displayName : 'New signup',
        ]
    );

    if (!$sent) {
        throw new RuntimeException('Signup notification email could not be sent. Your hosting mail() setup may need to be configured.');
    }
}

function sendReferralInviteEmail(array $config, array $referrer, string $friendEmail, string $referralCode, string $referralLink): void
{
    $fromEmail = (string) ($config['mail']['from_email'] ?? '');
    $fromName = (string) ($config['mail']['from_name'] ?? 'Stream Sync Pro');
    $appName = (string) ($config['app']['name'] ?? 'Stream Sync Pro');

    if ($fromEmail === '') {
        throw new RuntimeException('Mail sender address is missing in config.php.');
    }

    $referrerName = trim((string) ($referrer['display_name'] ?? 'A Stream Sync Pro user'));
    $safeReferrerName = $referrerName !== '' ? $referrerName : 'A Stream Sync Pro user';
    $subject = $safeReferrerName . ' invited you to Stream Sync Pro LIVE';
    $textBody = implode("\n\n", [
        $safeReferrerName . ' has invited you to try Stream Sync Pro LIVE.',
        'Your referral code is: ' . $referralCode,
        'Step 1: Open the referral page: ' . $referralLink,
        'Step 2: Download and install Stream Sync Pro LIVE.',
        'Step 3: Open the app, choose Register, and enter this code in the Promo or referral code field.',
        'Step 4: Verify your email address to activate the account and any available referral reward credits.',
        'If you were not expecting this invite, you can ignore this email.',
    ]);
    $htmlBody = renderBrandedEmailHtml($appName, [
        'eyebrow' => 'Referral Invite',
        'title' => 'You have been invited to Stream Sync Pro LIVE',
        'intro' => $safeReferrerName . ' thinks Stream Sync Pro LIVE could help you level up your TikTok LIVE streams. Follow the steps below to create your account with their referral code.',
        'sections' => [
            ['label' => 'Referral code', 'value' => $referralCode],
            ['label' => 'Step 1', 'value' => 'Open your referral page: ' . $referralLink],
            ['label' => 'Step 2', 'value' => 'Download and install Stream Sync Pro LIVE for Windows.'],
            ['label' => 'Step 3', 'value' => 'Open the app, select Register, and paste the referral code into the Promo or referral code field.'],
            ['label' => 'Step 4', 'value' => 'Verify your email address to activate your account and apply any available referral reward credits.'],
        ],
        'footnote' => 'Referral rewards depend on the current Stream Sync Pro LIVE beta settings. If you were not expecting this invite, you can safely ignore this email.',
    ]);

    $sent = sendBrandedEmail(
        $friendEmail,
        $subject,
        $textBody,
        $htmlBody,
        [
            'fromEmail' => $fromEmail,
            'fromName' => $fromName,
            'replyToEmail' => (string) ($referrer['email'] ?? $fromEmail),
            'replyToName' => $safeReferrerName,
        ]
    );

    if (!$sent) {
        throw new RuntimeException('Referral email could not be sent. Your hosting mail() setup may need to be configured.');
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
