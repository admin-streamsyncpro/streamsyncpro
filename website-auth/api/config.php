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
    'contact' => [
        'to_email' => 'info@streamsyncpro.co.uk',
        'to_name' => 'Stream Sync Pro Support',
    ],
    'discord' => [
        'private_feedback_webhook_url' => 'https://discord.com/api/webhooks/1518024253658632383/LovM1XYZZKyC4SDmDYkh4WoVvIzbQ_bxrg_O6Gj4euERgb0H4o_VmfVEgHZVhKh_k0PE',
        'private_bug_report_webhook_url' => 'https://discord.com/api/webhooks/1518024253658632383/LovM1XYZZKyC4SDmDYkh4WoVvIzbQ_bxrg_O6Gj4euERgb0H4o_VmfVEgHZVhKh_k0PE',
        'private_feature_request_webhook_url' => 'https://discord.com/api/webhooks/1518029223892353084/xxfRibjutp3tmbIv5AyrQ7qDo_PpcnlauYt3fTQq7YHJ_J1edSJQq_V74gmLvzB3nlDe',
        'private_ui_feedback_webhook_url' => 'https://discord.com/api/webhooks/1518028724522717295/lI9iReUylFdDTKdcmt1W-OoJ_pOK4mnXhHJtNLi17ztgeQpPvbGeZ9b4JMNfGgFTERPY',
        'private_performance_webhook_url' => 'https://discord.com/api/webhooks/1518028946485153873/ppHqvy0nuVMxDF21iuwdl91E1CNKdBzS1KrLL29xJs-0yMlZeAxRAi85-gsy39juo06m',
        'private_question_webhook_url' => 'https://discord.com/api/webhooks/1518028381508079686/KZjfL6Rw0POnACyqqEJhi4--UAegvgUjoeNLXVdqhIHfcxNbZjFs0IaZH6IxWJAjtnZ9',
        'bug_report_webhook_url' => 'https://discord.com/api/webhooks/1518011359604903946/dacKuM7NDaIWQhxwBSrQ7Fiz7s4tVhgf2SefJhg4vgIKVhqDCWOPQj_RRhfoFQb1edVS',
        'feature_request_webhook_url' => 'https://discord.com/api/webhooks/1518011695052882081/RhOfdHXxu-u5wTmxnwzj82rhBKJ8ea1KxSLTuLwTAvfcUap7Dy6IWYjJ_bZKzPTniqE6',
        'ui_feedback_webhook_url' => '',
        'performance_webhook_url' => '',
        'question_webhook_url' => 'https://discord.com/api/webhooks/1518013834193801226/BkTafWFtBxQm_Uy3flfItl7tmMupmYhndtdf_oCa1UMs3dyYW1yBQQhXGDacm1f9ZP1m',
        'live_connected_webhook_url' => 'https://discord.com/api/webhooks/1518032277366636635/N1UcVcIXd2tmTQvsOjssyToFPuIa0hk2lrf_3yo9QeJp7BySIsQqUhccHa0ETq8Byeur',
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
        'environment' => 'live',
        'client_id' => 'Ad6pz7sP1traQ0OODPhI53am3buI3edQfaZujeeTuLAQKLy4LIE_pVLvHvZg6zM9zxKVA3mHAgAtfGao',
        'client_secret' => 'EHRLIGaqnztoZErZIN55y5b3YBjci9TlnSpdUR-_R2b3e5j7YpKSVDlubEdCHH8w6NXvDKecdZcefhTO',
        'brand_name' => 'Stream Sync Pro LIVE',
    ],
    'integrations' => [
        'voicemod_client_key' => '', // Keep the real key in config.local.php or server-only environment/config.
    ],
    'admin' => [
        'username' => 'admin',
        'password_hash' => '$2y$12$hq/5d/jESo055Nj3.2chJ.B8TBETCJZeklWuZGI8xZqZeDwLLSwUS',
    ],
];
