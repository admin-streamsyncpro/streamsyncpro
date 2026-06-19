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
    'app' => [
        'name' => 'Stream Sync Pro LIVE',
        'version' => '1.0.18',
        'verification_expiry_minutes' => 15,
        'reset_expiry_minutes' => 15,
    ],
    'billing' => [
        'credits_per_gbp' => 10,
        'currency' => 'GBP',
        'minimum_credits' => 1,
        'maximum_credits' => 5000,
        'signup_credits' => 5,
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
