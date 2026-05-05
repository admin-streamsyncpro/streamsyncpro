<?php

declare(strict_types=1);

date_default_timezone_set('UTC');

$configPath = __DIR__ . '/../api/config.php';

if (!file_exists($configPath)) {
    http_response_code(500);
    echo 'Missing API config.php. Upload and configure website-auth/api/config.php first.';
    exit;
}

$config = require $configPath;
$pageError = '';
$user = null;
$billingToken = trim((string) ($_GET['token'] ?? ''));

try {
    $pdo = createBillingPdo($config['db'] ?? []);
    ensureBillingSchema($pdo);

    if ($billingToken === '') {
        throw new RuntimeException('This top-up link is missing its session token. Open the top-up page again from the app.');
    }

    $user = findUserByBillingToken($pdo, $billingToken);
    if (!$user) {
        throw new RuntimeException('This top-up link is invalid or has expired. Please reopen it from the app.');
    }
} catch (Throwable $exception) {
    $pageError = $exception->getMessage();
}

$billing = getBillingPageConfig($config, $pdo ?? null);
$paypal = [
    'clientId' => (string) (($config['paypal']['client_id'] ?? '')),
    'environment' => strtolower((string) (($config['paypal']['environment'] ?? 'live'))),
    'brandName' => (string) (($config['paypal']['brand_name'] ?? ($config['app']['name'] ?? 'Stream Sync Pro LIVE'))),
];
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Top Up Credits | Stream Sync Pro LIVE</title>
    <style>
      :root {
        --bg: #071124;
        --panel: #0d1830;
        --panel-soft: rgba(255, 255, 255, 0.03);
        --titlebar: linear-gradient(180deg, #08111f 0%, #0d1730 100%);
        --text: #edf3ff;
        --muted: #9cb1d9;
        --cyan: #58dcff;
        --magenta: #cf64ff;
        --border: rgba(88, 220, 255, 0.3);
        --danger: #ff7ca8;
        --success: #6ff2bc;
        --shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(88, 220, 255, 0.14), transparent 30%),
          radial-gradient(circle at top right, rgba(207, 100, 255, 0.18), transparent 26%),
          linear-gradient(180deg, #060d1d 0%, var(--bg) 100%);
        color: var(--text);
        display: grid;
        place-items: center;
        padding: 28px;
      }

      .shell {
        width: min(940px, 100%);
        border-radius: 28px;
        background: rgba(8, 18, 38, 0.94);
        box-shadow: var(--shadow);
        border: 1px solid rgba(88, 220, 255, 0.22);
        overflow: hidden;
        position: relative;
      }

      .shell::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 2px;
        background: conic-gradient(from 0deg, rgba(88,220,255,0.9), rgba(207,100,255,0.85), rgba(88,220,255,0.9));
        mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
        pointer-events: none;
        animation: border-travel 10s linear infinite;
      }

      @keyframes border-travel {
        from { filter: hue-rotate(0deg); }
        to { filter: hue-rotate(360deg); }
      }

      .titlebar {
        padding: 18px 24px;
        background: var(--titlebar);
        border-bottom: 1px solid rgba(88, 220, 255, 0.18);
      }

      .titlebar p {
        margin: 0;
        font-size: 0.78rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #d45eff;
        font-weight: 700;
      }

      .content {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
        gap: 24px;
        padding: 28px;
      }

      .card {
        border-radius: 24px;
        border: 1px solid rgba(88, 220, 255, 0.14);
        background: rgba(255, 255, 255, 0.02);
        overflow: hidden;
      }

      .card-head {
        padding: 16px 20px;
        background: linear-gradient(180deg, rgba(4, 10, 20, 0.96), rgba(10, 18, 33, 0.96));
        border-bottom: 1px solid rgba(88, 220, 255, 0.16);
      }

      .card-head h2, .card-head h3 {
        margin: 0;
        font-size: 1rem;
      }

      .card-body {
        padding: 20px;
      }

      .eyebrow {
        margin: 0 0 8px;
        color: #ff68d7;
        font-size: 0.75rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        font-weight: 700;
      }

      h1 {
        margin: 0 0 12px;
        font-size: clamp(2.4rem, 4vw, 3.5rem);
        line-height: 0.94;
      }

      .lead, .helper {
        color: var(--muted);
        line-height: 1.7;
      }

      .status {
        margin: 0 0 18px;
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px solid rgba(88, 220, 255, 0.16);
        background: rgba(255, 255, 255, 0.03);
      }

      .status.error {
        color: #ffd9e7;
        border-color: rgba(255, 124, 168, 0.4);
        background: rgba(78, 15, 34, 0.46);
      }

      .status.success {
        color: #d5ffef;
        border-color: rgba(111, 242, 188, 0.35);
        background: rgba(12, 58, 46, 0.42);
      }

      .summary-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        margin-top: 18px;
      }

      .summary-item {
        padding: 16px;
        border-radius: 18px;
        border: 1px solid rgba(88, 220, 255, 0.14);
        background: var(--panel-soft);
      }

      .summary-item span {
        display: block;
        color: var(--muted);
        font-size: 0.85rem;
        margin-bottom: 6px;
      }

      .summary-item strong {
        font-size: 1.1rem;
      }

      .field {
        display: grid;
        gap: 8px;
        margin-bottom: 18px;
      }

      .field span {
        font-weight: 600;
      }

      input[type="number"] {
        width: 100%;
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px solid rgba(88, 220, 255, 0.18);
        background: rgba(4, 10, 20, 0.84);
        color: var(--text);
        font: inherit;
      }

      .inline-action {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
        align-items: end;
      }

      .inline-action button {
        height: 50px;
        border: none;
        border-radius: 16px;
        padding: 0 18px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        background: linear-gradient(135deg, #1f2f57, #2a3f70);
        color: var(--text);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
      }

      .calculation {
        display: grid;
        gap: 10px;
        padding: 16px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(88, 220, 255, 0.14);
        margin-bottom: 20px;
      }

      .calculation-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        color: var(--muted);
      }

      .calculation-row.total {
        color: var(--text);
        font-size: 1.05rem;
        font-weight: 700;
      }

      #paypal-button-container {
        min-height: 46px;
      }

      .muted {
        color: var(--muted);
        font-size: 0.9rem;
      }

      .hidden {
        display: none !important;
      }

      @media (max-width: 860px) {
        .content {
          grid-template-columns: 1fr;
        }

        .summary-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <div class="titlebar">
        <p>Credit Top Up</p>
      </div>

      <div class="content">
        <section class="card">
          <div class="card-head">
            <h2>Buy credits</h2>
          </div>
          <div class="card-body">
            <p class="eyebrow">Stream Sync Pro LIVE</p>
            <h1>Top up your credits</h1>
            <p class="lead">Choose the number of credits you want to buy and we’ll calculate the total automatically at the current rate.</p>

            <?php if ($pageError !== ''): ?>
              <p class="status error"><?= htmlspecialchars($pageError, ENT_QUOTES, 'UTF-8') ?></p>
            <?php else: ?>
              <p id="billing-status" class="status">Ready to top up credits for <strong><?= htmlspecialchars((string) ($user['display_name'] ?? $user['email']), ENT_QUOTES, 'UTF-8') ?></strong>.</p>

              <label class="field">
                <span>Credits to buy</span>
                <input
                  id="credits-input"
                  type="number"
                  min="<?= (int) $billing['minimumCredits'] ?>"
                  max="<?= (int) $billing['maximumCredits'] ?>"
                  step="1"
                  value="<?= max(20, (int) $billing['minimumCredits']) ?>"
                />
                <small class="muted">Choose between <?= (int) $billing['minimumCredits'] ?> and <?= (int) $billing['maximumCredits'] ?> credits.</small>
              </label>

              <div class="field">
                <span>Promo code</span>
                <div class="inline-action">
                  <input id="promo-code-input" type="text" placeholder="Optional discount code" autocomplete="off" />
                  <button type="button" id="apply-promo-button">Apply</button>
                </div>
                <small class="muted">If you have a promo code, enter it here and apply it before paying.</small>
              </div>

              <div class="calculation">
                <div class="calculation-row">
                  <span>Rate</span>
                  <strong id="rate-label">£<?= htmlspecialchars((string) $billing['gbpPerCredit'], ENT_QUOTES, 'UTF-8') ?> per credit</strong>
                </div>
                <div class="calculation-row">
                  <span>Credits</span>
                  <strong id="credits-preview">20</strong>
                </div>
                <div class="calculation-row">
                  <span>Promo</span>
                  <strong id="promo-preview">No promo applied</strong>
                </div>
                <div class="calculation-row">
                  <span>Discount</span>
                  <strong id="discount-preview">£0.00</strong>
                </div>
                <div class="calculation-row total">
                  <span>Total</span>
                  <strong id="cost-preview">£2.00</strong>
                </div>
              </div>

              <div id="paypal-button-container"></div>
              <p id="paypal-config-note" class="status error hidden">PayPal is not configured yet. Add your PayPal client id and secret to the website auth config first.</p>
              <p class="muted">Credits are only added after PayPal confirms the payment capture successfully.</p>
            <?php endif; ?>
          </div>
        </section>

        <aside class="card">
          <div class="card-head">
            <h3>Account snapshot</h3>
          </div>
          <div class="card-body">
            <div class="summary-grid">
              <div class="summary-item">
                <span>Signed in as</span>
                <strong><?= htmlspecialchars((string) (($user['display_name'] ?? $user['email']) ?: 'Unknown user'), ENT_QUOTES, 'UTF-8') ?></strong>
              </div>
              <div class="summary-item">
                <span>Current credits</span>
                <strong id="current-credits"><?= (int) (($user['credits'] ?? 0)) ?></strong>
              </div>
              <div class="summary-item">
                <span>Currency</span>
                <strong><?= htmlspecialchars((string) $billing['currency'], ENT_QUOTES, 'UTF-8') ?></strong>
              </div>
            </div>
            <p class="helper">This secure page was opened from your desktop app using a short-lived billing session. If it expires, just reopen the credit top-up page from the app.</p>
          </div>
        </aside>
      </div>
    </main>

    <?php if ($pageError === ''): ?>
      <script>
        const BILLING_TOKEN = <?= json_encode($billingToken, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;
        const BILLING_CONFIG = <?= json_encode($billing, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;
        const PAYPAL_CONFIG = <?= json_encode($paypal, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;
      </script>
      <script>
        const creditsInput = document.getElementById("credits-input");
        const promoCodeInput = document.getElementById("promo-code-input");
        const applyPromoButton = document.getElementById("apply-promo-button");
        const creditsPreview = document.getElementById("credits-preview");
        const costPreview = document.getElementById("cost-preview");
        const promoPreview = document.getElementById("promo-preview");
        const discountPreview = document.getElementById("discount-preview");
        const currentCreditsLabel = document.getElementById("current-credits");
        const billingStatus = document.getElementById("billing-status");
        const paypalNote = document.getElementById("paypal-config-note");
        let lastCreatedPricing = null;

        const clampCredits = (value) => {
          const numeric = Math.max(BILLING_CONFIG.minimumCredits, Math.min(BILLING_CONFIG.maximumCredits, Number(value) || 0));
          return Math.round(numeric);
        };

        const calculateTotal = (credits) => (credits / BILLING_CONFIG.creditsPerGbp).toFixed(2);

        const updateSummary = () => {
          const credits = clampCredits(creditsInput.value);
          creditsInput.value = String(credits);
          creditsPreview.textContent = String(credits);
          if (!lastCreatedPricing) {
            costPreview.textContent = `£${calculateTotal(credits)}`;
            promoPreview.textContent = "No promo applied";
            discountPreview.textContent = "£0.00";
          }
          return credits;
        };

        const setStatus = (message, type = "info") => {
          billingStatus.textContent = message;
          billingStatus.className = `status ${type === "success" ? "success" : type === "error" ? "error" : ""}`.trim();
        };

        const applyPricingPreview = (result) => {
          lastCreatedPricing = result;
          promoPreview.textContent = result.promoCode ? `${result.promoCode} (${result.promoLabel})` : "No promo applied";
          discountPreview.textContent = `£${result.discountAmount || "0.00"}`;
          costPreview.textContent = `£${result.amount}`;
        };

        creditsInput.addEventListener("input", () => {
          lastCreatedPricing = null;
          updateSummary();
        });
        promoCodeInput.addEventListener("input", () => {
          lastCreatedPricing = null;
          updateSummary();
        });
        updateSummary();

        async function postJson(path, payload) {
          const response = await fetch(`/api${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok || result.ok === false) {
            throw new Error(result.error || "Request failed.");
          }
          return result;
        }

        async function applyPromoCode() {
          const credits = updateSummary();
          const promoCode = promoCodeInput.value.trim();

          if (!promoCode) {
            lastCreatedPricing = null;
            updateSummary();
            setStatus("Enter a promo code first, or leave it blank if you do not want to use one.", "info");
            return;
          }

          setStatus(`Checking promo code ${promoCode}...`);
          const result = await postJson("/billing/quote", {
            billingToken: BILLING_TOKEN,
            credits,
            promoCode,
          });
          applyPricingPreview(result);
          setStatus(`Promo code ${result.promoCode} applied successfully.`, "success");
        }

        function renderPayPalButtons() {
          if (!window.paypal) {
            setStatus("PayPal did not load. Please refresh the page and try again.", "error");
            return;
          }

          window.paypal.Buttons({
            style: {
              layout: "vertical",
              shape: "pill",
              label: "paypal",
            },
            createOrder: async () => {
              const credits = updateSummary();
              setStatus(`Creating a PayPal order for ${credits} credits...`);
              const result = await postJson("/billing/create-paypal-order", {
                billingToken: BILLING_TOKEN,
                credits,
                promoCode: promoCodeInput.value.trim(),
              });
              applyPricingPreview(result);
              setStatus(`PayPal order created for ${credits} credits. Complete the checkout to finish the top up.`);
              return result.orderId;
            },
            onApprove: async (data) => {
              setStatus("Capturing your PayPal payment...");
              const result = await postJson("/billing/capture-paypal-order", {
                billingToken: BILLING_TOKEN,
                orderId: data.orderID,
              });
              currentCreditsLabel.textContent = String(result.user?.credits ?? currentCreditsLabel.textContent);
              setStatus(result.message || "Credits added successfully.", "success");
            },
            onCancel: () => {
              setStatus("The PayPal checkout was cancelled. No credits were added.", "error");
            },
            onError: (error) => {
              const message = error?.message || "PayPal could not complete the payment.";
              setStatus(message, "error");
            },
          }).render("#paypal-button-container");
        }

        applyPromoButton.addEventListener("click", () => {
          applyPromoCode().catch((error) => {
            setStatus(error.message || "Unable to apply this promo code.", "error");
          });
        });

        if (!PAYPAL_CONFIG.clientId) {
          paypalNote.classList.remove("hidden");
        } else {
          const script = document.createElement("script");
          script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL_CONFIG.clientId)}&currency=${encodeURIComponent(BILLING_CONFIG.currency)}&components=buttons`;
          script.dataset.sdkIntegrationSource = "stream-sync-pro-live";
          script.onload = renderPayPalButtons;
          script.onerror = () => setStatus("Unable to load the PayPal checkout script.", "error");
          document.head.appendChild(script);
        }
      </script>
    <?php endif; ?>
  </body>
</html>
<?php

function createBillingPdo(array $db): PDO
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

    return new PDO(
        sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $host, $port, $name, $charset),
        $user,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
}

function ensureBillingSchema(PDO $pdo): void
{
    ensureBillingColumn($pdo, 'auth_users', 'billing_link_token_hash', 'ALTER TABLE auth_users ADD COLUMN billing_link_token_hash VARCHAR(255) NULL AFTER forced_logout_at');
    ensureBillingColumn($pdo, 'auth_users', 'billing_link_token_expires_at', 'ALTER TABLE auth_users ADD COLUMN billing_link_token_expires_at DATETIME NULL AFTER billing_link_token_hash');
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS auth_billing_settings (
            setting_key VARCHAR(80) NOT NULL PRIMARY KEY,
            setting_value VARCHAR(255) NOT NULL,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );
}

function ensureBillingColumn(PDO $pdo, string $table, string $column, string $sql): void
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

function findUserByBillingToken(PDO $pdo, string $billingToken): ?array
{
    $billingTokenHash = hash('sha256', trim($billingToken));
    $statement = $pdo->prepare(
        'SELECT * FROM auth_users
         WHERE billing_link_token_hash = :billing_link_token_hash
           AND billing_link_token_expires_at IS NOT NULL
         LIMIT 1'
    );
    $statement->execute([':billing_link_token_hash' => $billingTokenHash]);
    $user = $statement->fetch();
    if (!$user) {
        return null;
    }

    $expiresAt = strtotime((string) ($user['billing_link_token_expires_at'] ?? ''));
    if ($expiresAt === false || $expiresAt < time()) {
        return null;
    }

    return $user ?: null;
}

function getBillingPageConfig(array $config, ?PDO $pdo = null): array
{
    $defaults = [
        'credits_per_gbp' => max(1, (int) (($config['billing']['credits_per_gbp'] ?? 10))),
        'currency' => strtoupper((string) (($config['billing']['currency'] ?? 'GBP'))),
        'minimum_credits' => max(1, (int) (($config['billing']['minimum_credits'] ?? 1))),
        'maximum_credits' => max(1, (int) (($config['billing']['maximum_credits'] ?? 5000))),
    ];

    if ($pdo) {
        $statement = $pdo->query('SELECT setting_key, setting_value FROM auth_billing_settings');
        foreach ($statement->fetchAll() as $row) {
            $defaults[(string) $row['setting_key']] = (string) $row['setting_value'];
        }
    }

    $creditsPerGbp = max(1, (int) ($defaults['credits_per_gbp'] ?? 10));
    return [
        'creditsPerGbp' => $creditsPerGbp,
        'gbpPerCredit' => number_format(1 / $creditsPerGbp, 2, '.', ''),
        'currency' => strtoupper((string) ($defaults['currency'] ?? 'GBP')),
        'minimumCredits' => max(1, (int) ($defaults['minimum_credits'] ?? 1)),
        'maximumCredits' => max(1, (int) ($defaults['maximum_credits'] ?? 5000)),
    ];
}
