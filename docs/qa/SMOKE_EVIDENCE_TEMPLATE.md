# Smoke Evidence Template

Owner: Carver / QA Release

Purpose: standard capture format for every Hashdate preview, internal-test, and release-candidate smoke pass. A smoke pass is not counted as verified unless each applicable row has an artifact path, command output, screenshot path, API response sample, or blocker ID.

## Run Metadata

| Field | Value |
| --- | --- |
| Run ID | `YYYYMMDD-HHMM-surface` |
| Date/time |  |
| Tester |  |
| Build label |  |
| Environment | Local / Staging / Store sandbox / Production |
| Code/artifact reference |  |
| Result | Pass / Fail / Blocked Internal / Blocked External |

## Surface Checklist

| Surface | Required Evidence | Result | Artifact / Notes |
| --- | --- | --- | --- |
| Homepage | URL, viewport, HTTP status, screenshot or render log | Not Run |  |
| Mobile app | Platform, build number, device/emulator/simulator, screen evidence | Not Run |  |
| Backend API | Command/API call, status code, response sample | Not Run |  |
| Admin web | Route, role, seeded record ID, screenshot or action log | Not Run |  |
| Telegram ops | Command text, queue/result state, send result or env blocker | Not Run |  |

## P0 Flow Evidence

| Flow | Expected Evidence | Result | Artifact / Notes |
| --- | --- | --- | --- |
| Account entry | Auth screen or API response | Not Run |  |
| Profile setup | Pending review state | Not Run |  |
| Admin approval/rejection | Operator action and reason/state | Not Run |  |
| Discovery like/pass | Action result and next profile state | Not Run |  |
| Match/chat | Message appears in order | Not Run |  |
| Wallet unlock | One deduction and repeat no double charge | Not Run |  |
| Safety report | Report appears in admin queue | Not Run |  |
| Suspension | User blocked and report actioned | Not Run |  |

## Defects And Blockers

| ID | Severity | Type | Owner | Description | Release Impact |
| --- | --- | --- | --- | --- | --- |
|  | S0/S1/S2/S3 | Defect / Internal blocker / External blocker |  |  |  |

## Completion Rule

- Mark `Pass` only when evidence is attached in the row.
- Mark `Blocked External` only for Apple, Google, payment, SMS/identity, legal identity, or owner-controlled credential/account gaps.
- Store generated screenshots under `docs/qa/evidence/<run-id>/`.
- Store API samples in `docs/qa/API_RESPONSE_SAMPLES.md` or a linked run-specific file.
