# Poincare Worklist

Owner: Poincare / Mobile App Agent

Scope: `apps/mobile` only.

Progress rule: count only tangible, reviewable artifacts in this folder. Flutter dependency installation and generated project files require lead approval.

## Current Progress

22%

## Done

- Flutter-ready mobile implementation plan.
- Core route and API boundary placeholders.
- Feature README files for auth, profile, discovery, matches, chat, wallet, and settings.
- Single mock app skeleton registry for generated Flutter flow handoff.
- Dependency-free mock screen placeholder specs for auth, onboarding/profile, review pending, discovery swipe, profile detail/unlock, matches, chat, wallet, settings, and report/block.
- Mobile mock data documentation for personas, profile fixtures, discovery deck, matches, chat, wallet, settings, and safety.

## Now

- Preserve this no-dependency scaffold until the generated Flutter project location is approved.
- Keep new mobile work inside route, API, mock repository, and feature boundaries.
- Convert placeholder screen specs into Flutter widgets after project generation.

## Next

- Generate Flutter project in `apps/mobile` after approval.
- Add app shell, theme tokens, bottom tabs, and declarative navigation.
- Add mock repositories backed by `docs/MOCK_DATA.md`.
- Build clickable auth, onboarding, approval gate, discovery, match, chat, wallet, settings, and safety flows.
- Add smoke tests for routing and optimistic state transitions.

## Blocked

- Flutter project generation and dependency install require lead approval.
- Final login method, diamond package ids, and unlock costs remain owner-controlled decisions.
