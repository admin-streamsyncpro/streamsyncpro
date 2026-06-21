<?php

return [
    'db' => [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'your_database_name',
        'user' => 'your_database_user',
        'password' => 'your_database_password',
        'charset' => 'utf8mb4',
    ],
    'mail' => [
        'from_email' => 'noreply@your-domain.com',
        'from_name' => 'Stream Sync Pro',
    ],
    'contact' => [
        // Contact form and signup notifications are sent here.
        'to_email' => 'info@your-domain.com',
        'to_name' => 'Stream Sync Pro Support',
    ],
    'discord' => [
        // Full app feedback reports with private details are posted here.
        'private_feedback_webhook_url' => '',
        'private_bug_report_webhook_url' => '',
        'private_feature_request_webhook_url' => '',
        'private_ui_feedback_webhook_url' => '',
        'private_performance_webhook_url' => '',
        'private_question_webhook_url' => '',
        // Public category webhooks receive a privacy-safe summary only.
        'bug_report_webhook_url' => '',
        'feature_request_webhook_url' => '',
        'ui_feedback_webhook_url' => '',
        'performance_webhook_url' => '',
        'question_webhook_url' => '',
        // Successful TikTok LIVE connection notifications are posted here.
        'live_connected_webhook_url' => '',
    ],
    'app' => [
        'name' => 'Stream Sync Pro LIVE',
        'version' => '1.0.20',
        'verification_expiry_minutes' => 15,
        'reset_expiry_minutes' => 15,
    ],
    'billing' => [
        'credits_per_gbp' => 10,
        'currency' => 'GBP',
        'minimum_credits' => 1,
        'maximum_credits' => 5000,
        'signup_credits' => 5,
        'signup_promo_code' => '',
        'signup_promo_credits' => 0,
        'referral_reward_credits' => 5,
        'referred_signup_bonus_credits' => 5,
        'topup_session_expiry_minutes' => 20,
    ],
    'paypal' => [
        'environment' => 'live', // or "sandbox"
        'client_id' => 'YOUR_PAYPAL_CLIENT_ID',
        'client_secret' => 'YOUR_PAYPAL_CLIENT_SECRET',
        'brand_name' => 'Stream Sync Pro LIVE',
    ],
    'integrations' => [
        'voicemod_client_key' => '', // Keep the real key in config.local.php or server-only environment/config.
    ],
    'admin' => [
        'username' => 'admin',
        'password_hash' => '$2b$10$8kRwidVrYS2KZ/HTWCu48./AFJ9oYRrvAcnzo7mgqmvPKwtRVxmV.',
    ],
];
