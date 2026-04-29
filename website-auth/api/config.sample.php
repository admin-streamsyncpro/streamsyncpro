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
    'app' => [
        'name' => 'Stream Sync Pro LIVE',
        'verification_expiry_minutes' => 15,
        'reset_expiry_minutes' => 15,
    ],
    'admin' => [
        'username' => 'admin',
        'password_hash' => '$2b$10$8kRwidVrYS2KZ/HTWCu48./AFJ9oYRrvAcnzo7mgqmvPKwtRVxmV.',
    ],
];
