# Smoke Evidence

Owner: Carver / QA Release

Last updated: 2026-05-17T02:42Z

## Local Preview Smoke Pass

| Surface | URL or Command | Result | Evidence | Notes |
| --- | --- | --- | --- | --- |
| Homepage status | `GET http://localhost:3000/work-status` | Pass | HTTP 200 via `Invoke-WebRequest` | Dependency-free preview server |
| Admin dashboard | `GET http://localhost:4301/dashboard` | Pass | HTTP 200 via `Invoke-WebRequest` | Dependency-free preview server |
| Mobile discovery | `GET http://localhost:4302/discover` | Pass | HTTP 200 via `Invoke-WebRequest` | Browser preview of mobile IA |
| Backend discovery API | `GET http://localhost:4318/v1/discovery/swipe-deck` | Pass | HTTP 200 via `Invoke-WebRequest` | Dependency-free API preview |
| Backend report/suspension API | `POST /v1/reports`, then `POST /v1/admin/users/u_1003/suspensions` on `http://localhost:4321` | Pass | Returned `reportId=r_9002`, `suspensionId=sus_0001`, `actionedReportCount=2` | Dependency-free API preview |
| Mobile action preview | `GET /discover`, `/unlock`, `/chat`, `/profile`, `/safety` on `http://localhost:4322` | Pass | All returned HTTP 200 and included `primary-action` controls | Dependency-free mobile preview |

## Interpretation

This smoke pass verifies that the current preview surfaces are reachable. It does not verify production framework builds, database persistence, native mobile behavior, Apple/Google review readiness, payment correctness, or identity verification.

## Next Smoke Pass

- Add screenshots for homepage/admin/mobile preview surfaces.
- Capture additional response samples for support/deletion endpoints.
- Add screenshot evidence for the admin reports and mobile safety preview surfaces.

## Payload Evidence

Backend preview payload samples are tracked in:

```text
docs/qa/API_RESPONSE_SAMPLES.md
```
