# Stream Sync Pro Auth Server

Start the auth API locally:

```powershell
npm run auth:start
```

Default API URL:

`http://127.0.0.1:8787`

What it provides:

- user registration
- email verification by code
- sign in
- forgot password
- password reset by code

Database:

- host: `sdb-56.hosting.stackcp.net`
- database: `StreamSyncPro-35303133f7d7`

SMTP email sending:

Set these environment variables on the machine running the auth server:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM` optional

If SMTP is not configured, the server still works in preview mode and prints verification/reset codes to the server console.
