param(
  [Parameter(Mandatory = $true)]
  [string]$BotToken,

  [Parameter(Mandatory = $true)]
  [string]$ChatId
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")

[Environment]::SetEnvironmentVariable("TELEGRAM_BOT_TOKEN", $BotToken, "User")
[Environment]::SetEnvironmentVariable("TELEGRAM_CHAT_ID", $ChatId, "User")

$pollAction = New-ScheduledTaskAction `
  -Execute "powershell.exe" `
  -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$ProjectRoot\scripts\telegram\start-poll-loop.ps1`""

$reportAction = New-ScheduledTaskAction `
  -Execute "powershell.exe" `
  -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$ProjectRoot\scripts\telegram\start-report-loop.ps1`""

$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -RestartCount 3 `
  -RestartInterval (New-TimeSpan -Minutes 1)

Register-ScheduledTask `
  -TaskName "HashdateTelegramPollLoop" `
  -Action $pollAction `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Hashdate Telegram command poll loop at user logon" `
  -Force | Out-Null

Register-ScheduledTask `
  -TaskName "HashdateTelegramReportLoop" `
  -Action $reportAction `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Hashdate Telegram report loop at user logon" `
  -Force | Out-Null

Get-ScheduledTask -TaskName "HashdateTelegramPollLoop", "HashdateTelegramReportLoop" |
  Select-Object TaskName, State

