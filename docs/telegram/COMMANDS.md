# Telegram Commands

## Direct Status Commands

- `/help`: show available commands
- `/status`: show overall progress
- `/progress`: show area progress
- `/workers`: show worker progress
- `/worklist`: show current worker next actions
- `/blockers`: show external owner blockers
- `/links`: show important local project links

## Codex Queue Commands

- `/codex <task>`: run Codex immediately for project work
- `/decide <decision>`: run Codex immediately to record/apply an owner decision
- `/priority <item>`: run Codex immediately to apply a priority change

Codex commands receive two Telegram messages:

1. Immediate bot acknowledgment that Codex is processing now.
2. Final Codex result from `codex exec`.

Simple arithmetic sent through `/codex`, such as `/codex 1+3?`, is answered immediately by the Telegram poll loop and recorded as completed.

## Examples

```text
/status
/workers
/codex 관리자 페이지 먼저 실행 가능하게 만들어
/priority 모바일 앱 클릭 가능한 목업 우선
```

## Safety

The bot must not accept production secrets, payment credentials, Apple/Google credentials, identity verification keys, or legal identity documents through Telegram commands.
