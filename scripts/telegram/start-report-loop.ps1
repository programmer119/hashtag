$ErrorActionPreference = "Stop"

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $ProjectRoot

if (-not $env:TELEGRAM_BOT_TOKEN -or -not $env:TELEGRAM_CHAT_ID) {
  Add-Content -Path "docs\telegram\REPORT_LOOP_LOG.md" -Value "`n- $(Get-Date -Format o) report loop not started: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID`n"
  exit 1
}

node scripts\telegram\report-loop.mjs

