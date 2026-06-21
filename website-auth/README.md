## Stream Sync Pro Website Auth API

This package is designed for shared hosting that supports PHP and MySQL, including StackCP-style hosting where Node.js is not available on shared plans.

It provides these endpoints:

- `GET /api/health`
- `POST /api/contact/submit`
- `POST /api/auth/register`
- `POST /api/auth/verify-email`
- `POST /api/auth/login`
- `POST /api/auth/delete-account`
- `POST /api/auth/send-referral-email`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `POST /api/auth/create-topup-session`
- `POST /api/auth/create-overlay-sessions`
- `POST /api/feedback/submit`
- `POST /api/billing/create-paypal-order`
- `POST /api/billing/capture-paypal-order`
- `POST /api/overlay/update-queue-state`
- `POST /api/overlay/update-command-feedback-state`
- `POST /api/overlay/update-joke-state`
- `POST /api/overlay/update-chat-state`
- `POST /api/overlay/update-gift-state`
- `POST /api/overlay/update-likes-state`
- `POST /api/overlay/update-viewer-stats-state`
- `POST /api/overlay/update-vote-state`
- `POST /api/overlay/update-like-race-state`
- `POST /api/overlay/update-spin-wheel-state`
- `POST /api/overlay/update-progress-bar-state`
- `GET /api/overlay/queue-state?id=...`
- `GET /api/overlay/command-feedback-state?id=...`
- `GET /api/overlay/joke-state?id=...`
- `GET /api/overlay/chat-state?id=...`
- `GET /api/overlay/gift-state?id=...`
- `GET /api/overlay/likes-state?id=...`
- `GET /api/overlay/viewer-stats-state?id=...`
- `GET /api/overlay/vote-state?id=...`
- `GET /api/overlay/like-race-state?id=...`
- `GET /api/overlay/spin-wheel-state?id=...`
- `GET /api/overlay/progress-bar-state?id=...`

These paths match the Electron desktop app's existing auth flow.

### Files to upload

Upload the contents of `website-auth/api` into your website's public web root as an `api` folder.

Example target layout on your hosting:

```text
public_html/
  api/
    .htaccess
    index.php
    config.php
  admin/
    index.php
  billing/
    index.php
  overlay/
    queue.php
    command-feedback.php
    joke.php
    chat.php
    gift.php
    likes.php
    viewer-stats.php
    vote.php
    like-race.php
    spin-wheel.php
    progress-bar.php
    designer-runtime.js
```

### Setup steps

1. Copy `config.sample.php` to `config.php`.
2. Fill in your real database settings in `config.php`.
3. Set your sender email address in `config.php`.
4. Add your PayPal settings in `config.php`:
   - `paypal.client_id`
   - `paypal.client_secret`
   - `paypal.environment`
5. For server-only integration secrets such as the Voicemod client key, create `api/config.local.php` on the server. This file is intentionally ignored by Git.
6. Upload the `api` folder, `admin/index.php`, `billing/index.php`, and every file inside `website-auth/overlay/` to your website root.
7. If you want website contact messages routed to a specific inbox, set `contact.to_email` and `contact.to_name` in `config.php`.
8. Set the `discord.*_webhook_url` values in `config.php` so app feedback categories post to your Discord channels.
9. Visit `https://your-domain.com/api/health`
10. If it returns JSON with `"ok": true`, the API is live.

### Discord feedback reports

The desktop app's `Send to Discord` button posts to `POST /api/feedback/submit`.

The Discord webhook URLs are kept server-side in [website-auth/api/config.php](C:\Users\deano\Documents\Codex\2026-04-23-create-a-desktop-application-which-can\website-auth\api\config.php) under:

```php
'discord' => [
    'private_feedback_webhook_url' => 'https://discord.com/api/webhooks/private-fallback',
    'private_bug_report_webhook_url' => 'https://discord.com/api/webhooks/private-bugs',
    'private_feature_request_webhook_url' => 'https://discord.com/api/webhooks/private-features',
    'private_ui_feedback_webhook_url' => 'https://discord.com/api/webhooks/private-ui-feedback',
    'private_performance_webhook_url' => 'https://discord.com/api/webhooks/private-performance',
    'private_question_webhook_url' => 'https://discord.com/api/webhooks/private-questions',
    'bug_report_webhook_url' => 'https://discord.com/api/webhooks/public-bugs',
    'feature_request_webhook_url' => 'https://discord.com/api/webhooks/public-features',
    'ui_feedback_webhook_url' => 'https://discord.com/api/webhooks/public-ui-feedback',
    'performance_webhook_url' => 'https://discord.com/api/webhooks/public-performance',
    'question_webhook_url' => 'https://discord.com/api/webhooks/public-questions',
    'live_connected_webhook_url' => 'https://discord.com/api/webhooks/live-connected',
],
```

The public category webhooks receive only:

- Created
- Category
- Severity
- Version
- Message

The public message is sanitised for awareness only and is built from the user's typed message, not the full diagnostic report. It does not receive contact details, account details, IP addresses, diagnostics, attachments, or app/user metadata.

The private category webhooks receive the full report, private diagnostics, system details, system performance, and optional attachments up to 10MB. If a private category webhook is blank, the API falls back to `private_feedback_webhook_url`. If a public category webhook is blank, the API skips the public summary for that category but still sends the full report privately.

The live connected webhook receives a post when a signed-in app user successfully connects to a TikTok LIVE session. The message includes the direct TikTok LIVE URL generated from the connected TikTok username.

This prevents the webhook from being exposed inside the Electron app.

### Admin dashboard

Upload:

- `website-auth/admin/index.php`
- `website-auth/billing/index.php`
- every file inside `website-auth/overlay/`

Then open:

- `https://your-domain.com/admin/`

Default admin login:

- username: `admin`
- password: `change-me-now`

The admin password is now stored as a bcrypt hash in `api/config.php`.

Change those values in [website-auth/api/config.php](C:\Users\deano\Documents\Codex\2026-04-23-create-a-desktop-application-which-can\website-auth\api\config.php) before going live.

The admin dashboard lets you:

- view registered users
- search by email or display name
- filter by active, locked, verified, or pending users
- enable or disable per-user debug logging
- update the admin password from the dashboard
- update user credit balances
- change the live credit pricing settings used by the billing page
- configure sign-up promo and referral reward credits
- create, activate, deactivate, and delete promo codes
- lock accounts
- unlock accounts
- delete accounts

When per-user debug logging is enabled, the desktop app can push deeper timing traces into that user's audit trail. This is useful for diagnosing issues like delayed TTS playback, queue backlog, or provider-specific synthesis slowdowns without capturing verbose diagnostics for every user all the time.

For the in-dashboard admin password update to work, `api/config.php` must be writable by your hosting PHP process.

If it is not writable, the dashboard will show an error and you can still update the hash manually in:

- [website-auth/api/config.php](C:\Users\deano\Documents\Codex\2026-04-23-create-a-desktop-application-which-can\website-auth\api\config.php)

Locked accounts will receive this app-facing message on login:

- `This account has been locked. Please contact admin.`

### Credits

Each user account now has a `credits` balance.

New accounts created through app registration use the live `Credits granted on sign-up` value from the admin billing settings. The default fallback is `5` credits until you change it in admin.

Users can optionally enter a sign-up promo code or another user's referral code during registration. A matching sign-up promo code grants the configured `Sign-up promo credits`. A referral code grants the new user the configured `Friend sign-up bonus credits`, then awards the referrer the configured `Referrer reward credits` after the new user verifies their email.

The desktop app deducts:

- `1 credit` only after TikTok LIVE connects successfully

Before the connection starts, the website auth API checks that the account has at least `1` credit available.

If the account has no credits left, the app will show a message telling the user they do not have enough credits and should contact admin.

### PayPal credit top-up

The app can now open a secure website billing page where a signed-in user chooses how many credits to buy.

The current default billing rate is:

- `10 credits = £1.00`
- `20 credits = £2.00`
- `1 credit = £0.10`

The website calculates the GBP total from the requested credit amount, creates a PayPal order on the server, captures the payment, and only then adds credits to the user account.

Promo codes can now also be created in the admin dashboard and applied on the billing page.

The billing panel in admin also lets you control:

- credits per GBP
- min/max credits per purchase
- credits granted automatically on new sign-up

The top-up page uses a short-lived billing token generated from the app, so the user's main auth session token does not have to be exposed in the browser URL.

### Hosted overlays

The app can create stable per-user hosted overlay URLs on your website instead of relying on a local IP address.

How it works:

- the signed-in app requests hosted overlay sessions
- the API returns public `id=...` URLs that do not change every app launch
- the app keeps publishing overlay state back to the website auth API
- each overlay page reads that hosted state through its matching `/api/overlay/...-state?id=...` endpoint

Examples:

- `https://streamsyncpro.co.uk/overlay/queue.php?id=...&queue=2&mode=compact`
- `https://streamsyncpro.co.uk/overlay/command-feedback.php?id=...`
- `https://streamsyncpro.co.uk/overlay/joke.php?id=...`
- `https://streamsyncpro.co.uk/overlay/progress-bar.php?id=...`
- `https://streamsyncpro.co.uk/overlay/spin-wheel.php?id=...`

### Email delivery

By default this package uses PHP's built-in `mail()` function.

If your hosting account can send mail with `mail()`, verification and reset emails should work immediately.

If not, we can switch this to SMTP next.

### Database table

The API auto-creates this table if it does not exist:

- `auth_users`

### Desktop app connection

The desktop app should use your website base URL as its auth API base.

Example:

- `https://your-domain.com`

The app will then call:

- `https://your-domain.com/api/health`
- `https://your-domain.com/api/auth/login`

### Important

Do not upload database credentials into public frontend JavaScript or HTML.

Keep them only in `config.php` on the server.
