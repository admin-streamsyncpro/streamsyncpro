param(
  [string]$OutputPath = "website-public\downloads\xtts-runtime.zip"
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$venvPath = Join-Path $repoRoot ".venv-xtts"
$toolsPath = Join-Path $repoRoot "tools"
$pythonPath = Join-Path $venvPath "Scripts\python.exe"
$servicePath = Join-Path $toolsPath "xtts_v2_service.py"
$resolvedOutputPath = Join-Path $repoRoot $OutputPath
$stagingRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("stream-sync-pro-xtts-runtime-package-" + [System.Guid]::NewGuid().ToString("N"))

if (-not (Test-Path -LiteralPath $pythonPath)) {
  throw "Cannot package XTTS runtime because .venv-xtts\Scripts\python.exe was not found."
}

if (-not (Test-Path -LiteralPath $servicePath)) {
  throw "Cannot package XTTS runtime because tools\xtts_v2_service.py was not found."
}

try {
  New-Item -ItemType Directory -Force -Path $stagingRoot | Out-Null
  Copy-Item -LiteralPath $venvPath -Destination (Join-Path $stagingRoot ".venv-xtts") -Recurse -Force
  New-Item -ItemType Directory -Force -Path (Join-Path $stagingRoot "tools") | Out-Null
  Copy-Item -LiteralPath $servicePath -Destination (Join-Path $stagingRoot "tools\xtts_v2_service.py") -Force

  $outputDirectory = Split-Path -Parent $resolvedOutputPath
  New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
  if (Test-Path -LiteralPath $resolvedOutputPath) {
    Remove-Item -LiteralPath $resolvedOutputPath -Force
  }

  Compress-Archive -LiteralPath (Join-Path $stagingRoot ".venv-xtts"), (Join-Path $stagingRoot "tools") -DestinationPath $resolvedOutputPath -CompressionLevel Optimal
  Write-Host "Created XTTS runtime package: $resolvedOutputPath"
} finally {
  if (Test-Path -LiteralPath $stagingRoot) {
    Remove-Item -LiteralPath $stagingRoot -Recurse -Force
  }
}
