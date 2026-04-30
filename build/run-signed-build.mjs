import { spawn } from "node:child_process";

const hasPrimarySigningVars = Boolean(process.env.CSC_LINK && process.env.CSC_KEY_PASSWORD);
const hasWindowsSigningVars = Boolean(process.env.WIN_CSC_LINK && process.env.WIN_CSC_KEY_PASSWORD);
const shouldPublish = process.argv.includes("--publish");

if (!hasPrimarySigningVars && !hasWindowsSigningVars) {
  console.error("");
  console.error("Signed build aborted.");
  console.error("Set one of these environment variable pairs first:");
  console.error("  CSC_LINK + CSC_KEY_PASSWORD");
  console.error("  WIN_CSC_LINK + WIN_CSC_KEY_PASSWORD");
  console.error("");
  console.error("Examples:");
  console.error('  $env:CSC_LINK="C:\\\\certs\\\\streamsyncpro.pfx"');
  console.error('  $env:CSC_KEY_PASSWORD="your_certificate_password"');
  console.error("");
  process.exit(1);
}

const builderArgs = ["electron-builder", "--win", "nsis"];
if (shouldPublish) {
  builderArgs.push("--publish", "always");
}

const child = spawn("npx.cmd", builderArgs, {
  stdio: "inherit",
  shell: true,
  env: process.env
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});

