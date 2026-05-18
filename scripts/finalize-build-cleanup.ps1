$ErrorActionPreference = 'Stop'

$workspace = Split-Path -Parent $PSScriptRoot
$targets = @(
  'dist-clean',
  'dist-cooldown',
  'dist-overlay-custom',
  'dist-overlay-custom2',
  'dist-overlay-designer',
  'dist-overlay-scroll',
  'dist-overlay-scroll2',
  'dist-overlay-vote-template',
  'dist-viewer-stats',
  'dist-viewer-stats-fix',
  'dist-vote',
  'dist-vote-test'
)

foreach ($name in $targets) {
  $path = Join-Path $workspace $name
  if (Test-Path $path) {
    Remove-Item -LiteralPath $path -Recurse -Force
    Write-Output "Removed $name"
  }
}

Write-Output 'Build cleanup complete.'
