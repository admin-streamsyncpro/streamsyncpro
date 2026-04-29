## Stream Sync Pro Website Auth API

This package is designed for shared hosting that supports PHP and MySQL, including StackCP-style hosting where Node.js is not available on shared plans.

It provides these endpoints:

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/verify-email`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

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
```

### Setup steps

1. Copy `config.sample.php` to `config.php`.
2. Fill in your real database settings in `config.php`.
3. Set your sender email address in `config.php`.
4. Upload the `api` folder and `admin/index.php` to your website root.
5. Visit `https://your-domain.com/api/health`
6. If it returns JSON with `"ok": true`, the API is live.

### Admin dashboard

Upload:

- `website-auth/admin/index.php`

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
- update the admin password from the dashboard
- update user credit balances
- lock accounts
- unlock accounts
- delete accounts

For the in-dashboard admin password update to work, `api/config.php` must be writable by your hosting PHP process.

If it is not writable, the dashboard will show an error and you can still update the hash manually in:

- [website-auth/api/config.php](C:\Users\deano\Documents\Codex\2026-04-23-create-a-desktop-application-which-can\website-auth\api\config.php)

Locked accounts will receive this app-facing message on login:

- `This account has been locked. Please contact admin.`

### Credits

Each user account now has a `credits` balance.

The desktop app deducts:

- `1 credit` only after TikTok LIVE connects successfully

Before the connection starts, the website auth API checks that the account has at least `1` credit available.

If the account has no credits left, the app will show a message telling the user they do not have enough credits and should contact admin.

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
