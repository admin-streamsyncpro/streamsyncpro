import crypto from "node:crypto";
import express from "express";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

const app = express();
const port = Number(process.env.AUTH_PORT || 8787);

const dbConfig = {
  host: process.env.DB_HOST || "sdb-56.hosting.stackcp.net",
  user: process.env.DB_USER || "StreamSyncPro-35303133f7d7",
  password: process.env.DB_PASSWORD || "ut7dg7jn6s",
  database: process.env.DB_NAME || "StreamSyncPro-35303133f7d7",
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

function hashCode(code) {
  return crypto.createHash("sha256").update(String(code)).digest("hex");
}

function createNumericCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getExpiryDate(minutesFromNow) {
  return new Date(Date.now() + minutesFromNow * 60_000);
}

async function ensureSchema() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS auth_users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      display_name VARCHAR(120) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      is_verified TINYINT(1) NOT NULL DEFAULT 0,
      verification_code_hash VARCHAR(255) NULL,
      verification_code_expires_at DATETIME NULL,
      password_reset_code_hash VARCHAR(255) NULL,
      password_reset_expires_at DATETIME NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

async function getMailer() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

async function sendEmailCode({ email, subject, headline, code }) {
  const mailer = await getMailer();

  if (!mailer) {
    console.log(`[Auth email preview] ${subject} for ${email}: ${code}`);
    return {
      deliveryMode: "console"
    };
  }

  await mailer.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject,
    text: `${headline}\n\nYour code is: ${code}\n`,
    html: `
      <div style="font-family:Segoe UI,Arial,sans-serif;background:#071124;color:#ecf6ff;padding:24px;">
        <div style="max-width:520px;margin:0 auto;background:#0b1732;border:1px solid rgba(96,184,255,0.25);border-radius:18px;padding:24px;">
          <h2 style="margin:0 0 16px;">${headline}</h2>
          <p style="margin:0 0 16px;">Use the code below to continue:</p>
          <div style="font-size:32px;font-weight:700;letter-spacing:0.2em;color:#3bddff;margin:12px 0 18px;">${code}</div>
          <p style="margin:0;color:#b9d6ff;">If you did not request this, you can ignore this email.</p>
        </div>
      </div>
    `
  });

  return {
    deliveryMode: "smtp"
  };
}

async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    "SELECT * FROM auth_users WHERE email = ? LIMIT 1",
    [normalizeEmail(email)]
  );

  return rows[0] ?? null;
}

function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.display_name,
    isVerified: Boolean(user.is_verified)
  };
}

app.get("/api/health", async (_req, res) => {
  res.json({
    ok: true
  });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const displayName = String(req.body?.displayName || "").trim();
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");

    if (!displayName || !email || !password) {
      res.status(400).json({ message: "Display name, email, and password are required." });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ message: "Password must be at least 8 characters long." });
      return;
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: "An account with that email already exists." });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationCode = createNumericCode();
    const verificationCodeHash = hashCode(verificationCode);
    const verificationExpiresAt = getExpiryDate(15);

    await pool.execute(
      `
        INSERT INTO auth_users (
          email,
          display_name,
          password_hash,
          verification_code_hash,
          verification_code_expires_at
        ) VALUES (?, ?, ?, ?, ?)
      `,
      [email, displayName, passwordHash, verificationCodeHash, verificationExpiresAt]
    );

    const delivery = await sendEmailCode({
      email,
      subject: "Verify your Stream Sync Pro account",
      headline: "Verify your account",
      code: verificationCode
    });

    res.status(201).json({
      message: "Registration successful. Check your email for the verification code.",
      deliveryMode: delivery.deliveryMode
    });
  } catch (error) {
    console.error("Register failed", error);
    res.status(500).json({ message: "Registration failed." });
  }
});

app.post("/api/auth/verify-email", async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const code = String(req.body?.code || "").trim();

    if (!email || !code) {
      res.status(400).json({ message: "Email and verification code are required." });
      return;
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "Account not found." });
      return;
    }

    const expiry = user.verification_code_expires_at ? new Date(user.verification_code_expires_at) : null;
    const matches = user.verification_code_hash && hashCode(code) === user.verification_code_hash;

    if (!matches || !expiry || expiry.getTime() < Date.now()) {
      res.status(400).json({ message: "That verification code is invalid or expired." });
      return;
    }

    await pool.execute(
      `
        UPDATE auth_users
        SET is_verified = 1,
            verification_code_hash = NULL,
            verification_code_expires_at = NULL
        WHERE id = ?
      `,
      [user.id]
    );

    res.json({
      message: "Email verified successfully."
    });
  } catch (error) {
    console.error("Verify failed", error);
    res.status(500).json({ message: "Email verification failed." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    if (!user.is_verified) {
      res.status(403).json({
        message: "Verify your email before signing in.",
        requiresVerification: true
      });
      return;
    }

    res.json({
      message: "Signed in successfully.",
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ message: "Login failed." });
  }
});

app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    if (!email) {
      res.status(400).json({ message: "Email is required." });
      return;
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.json({ message: "If that email exists, a reset code has been sent." });
      return;
    }

    const resetCode = createNumericCode();
    const resetCodeHash = hashCode(resetCode);
    const resetExpiresAt = getExpiryDate(15);

    await pool.execute(
      `
        UPDATE auth_users
        SET password_reset_code_hash = ?,
            password_reset_expires_at = ?
        WHERE id = ?
      `,
      [resetCodeHash, resetExpiresAt, user.id]
    );

    const delivery = await sendEmailCode({
      email,
      subject: "Reset your Stream Sync Pro password",
      headline: "Reset your password",
      code: resetCode
    });

    res.json({
      message: "If that email exists, a reset code has been sent.",
      deliveryMode: delivery.deliveryMode
    });
  } catch (error) {
    console.error("Forgot password failed", error);
    res.status(500).json({ message: "Password reset request failed." });
  }
});

app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const code = String(req.body?.code || "").trim();
    const newPassword = String(req.body?.newPassword || "");

    if (!email || !code || !newPassword) {
      res.status(400).json({ message: "Email, reset code, and new password are required." });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({ message: "New password must be at least 8 characters long." });
      return;
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "Account not found." });
      return;
    }

    const expiry = user.password_reset_expires_at ? new Date(user.password_reset_expires_at) : null;
    const matches = user.password_reset_code_hash && hashCode(code) === user.password_reset_code_hash;

    if (!matches || !expiry || expiry.getTime() < Date.now()) {
      res.status(400).json({ message: "That reset code is invalid or expired." });
      return;
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await pool.execute(
      `
        UPDATE auth_users
        SET password_hash = ?,
            password_reset_code_hash = NULL,
            password_reset_expires_at = NULL
        WHERE id = ?
      `,
      [passwordHash, user.id]
    );

    res.json({
      message: "Password updated successfully."
    });
  } catch (error) {
    console.error("Reset password failed", error);
    res.status(500).json({ message: "Password reset failed." });
  }
});

ensureSchema()
  .then(() => {
    app.listen(port, () => {
      console.log(`Stream Sync Pro auth server listening on http://127.0.0.1:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start auth server", error);
    process.exit(1);
  });
