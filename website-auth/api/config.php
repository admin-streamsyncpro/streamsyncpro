<?php

return [
    'db' => [
        'host' => 'sdb-56.hosting.stackcp.net',
        'port' => 3306,
        'name' => 'StreamSyncPro-35303133f7d7',
        'user' => 'StreamSyncPro-35303133f7d7',
        'password' => 'JF:gNduPd@=S',
        'charset' => 'utf8mb4',
    ],
    'mail' => [
        'from_email' => 'noreply@streamsyncpro.co.uk',
        'from_name' => 'Stream Sync Pro',
    ],
    'app' => [
        'name' => 'Stream Sync Pro LIVE',
        'verification_expiry_minutes' => 15,
        'reset_expiry_minutes' => 15,
    ],
    'billing' => [
        'credits_per_gbp' => 10,
        'currency' => 'GBP',
        'minimum_credits' => 1,
        'maximum_credits' => 5000,
        'topup_session_expiry_minutes' => 20,
    ],
    'paypal' => [
        'environment' => 'live',
        'client_id' => '',
        'client_secret' => '',
        'brand_name' => 'Stream Sync Pro LIVE',
    ],
    'admin' => [
        'username' => 'admin',
        'password_hash' => '$2y$12$hq/5d/jESo055Nj3.2chJ.B8TBETCJZeklWuZGI8xZqZeDwLLSwUS',
    ],
];
