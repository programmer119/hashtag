# Hashdate

Premium hybrid dating platform MVP.

## Goal

Build a launchable iOS/Android dating app with a focused MVP:

- Verified member onboarding
- Profile creation and moderation
- Swipe-based matching
- Likes and mutual matches
- 1:1 chat
- Diamond wallet and paid profile unlocks
- Admin review and abuse controls

## First Principle

Hashdate must cover all visible benchmark features, pages, menus, and UX surfaces from the SkyPeople-style premium dating category, plus all client-requested functions. Benchmark coverage must be implemented with original branding, visual design, copy, and interaction details.

## Progress

Progress is tracked in `docs/PROGRESS.md` by the Lead Architect, with QA/release review by Carver.

## Workspace

```text
hashtag/
  apps/
    mobile/      Flutter iOS/Android app
    admin/       Admin web app
  server/
    api/         Backend API
  docs/
    product/     Product scope, policies, flows
    architecture/ System architecture and data model
    qa/          QA and release checklists
    agents/      Agent role briefs and task boundaries
```

## Operating Rule

The project is run as a coordinated monorepo. Each role owns a clear area, and the lead architect integrates decisions across app, server, admin, QA, and release.
