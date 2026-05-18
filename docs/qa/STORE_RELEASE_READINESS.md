# Store Release Readiness Checklist

Owner: Admin + QA Release Agent

Scope: App Store and Google Play MVP submission readiness.

## Evidence Rule

Each checked item must link or point to evidence: store console value, legal URL, screenshot asset, build number, provider dashboard entry, test log, or repo document path. If evidence is controlled outside the repo, track it in `docs/qa/EXTERNAL_OWNER_BLOCKERS.md` until the owner provides confirmation.

## App Identity

- [ ] App name finalized.
- [ ] Bundle ID and package name finalized.
- [ ] App icon prepared in required sizes.
- [ ] Splash screen prepared.
- [ ] App category selected.
- [ ] Age rating questionnaire drafted.

## Store Assets

- [ ] Short description drafted.
- [ ] Full description drafted.
- [ ] Keywords drafted for App Store.
- [ ] Android feature graphic prepared if required.
- [ ] iPhone screenshots prepared.
- [ ] Android phone screenshots prepared.
- [ ] Optional preview video decision made.

## Legal and Policy

- [ ] Privacy policy URL available.
- [ ] Terms of service URL available.
- [ ] Community guidelines URL or in-app page available.
- [ ] User-generated content moderation policy documented.
- [ ] Report and block flow available in app.
- [ ] Account deletion request flow available or documented.
- [ ] Data retention policy drafted.
- [ ] Sensitive document handling is either out of MVP or explicitly described.

## Privacy and Permissions

- [ ] iOS privacy nutrition labels drafted.
- [ ] Google Play data safety form drafted.
- [ ] Photo library permission purpose string reviewed.
- [ ] Camera permission purpose string reviewed if camera capture is enabled.
- [ ] Push notification permission copy reviewed if notifications are enabled.
- [ ] Tracking permission is not requested unless explicitly required.
- [ ] No real identity document uploads are enabled in MVP unless security review is complete.

## Authentication and Review Access

- [ ] Store review account created.
- [ ] Review account profile is pre-approved.
- [ ] Review account has enough diamonds for paid unlock testing.
- [ ] Review account has seeded match and chat partner.
- [ ] Admin-only features are not required for store reviewer to use the app.
- [ ] Demo instructions include how to reach swipe, match, chat, report, and wallet screens.

## Payments

- [ ] Payment strategy for MVP confirmed: sandbox only, production IAP, or deferred.
- [ ] Apple in-app purchase products configured if paid diamonds are enabled.
- [ ] Google Play products configured if paid diamonds are enabled.
- [ ] Receipt validation plan documented.
- [ ] Refund and balance correction support process documented.
- [ ] Wallet ledger reconciliation tested.

## Safety and Moderation

- [ ] User report flow tested.
- [ ] User block or safety fallback tested.
- [ ] Admin report queue tested.
- [ ] Admin suspension flow tested.
- [ ] Reinstatement flow tested.
- [ ] Audit log tested for moderation actions.
- [ ] Public-facing content can be removed or hidden by operations.

## Technical Release

- [ ] Release build created for Android.
- [ ] Release build created for iOS.
- [ ] Version and build numbers incremented.
- [ ] Environment points to staging for review or production for launch decision.
- [ ] Crash reporting configured or explicitly deferred.
- [ ] Basic analytics configured or explicitly deferred.
- [ ] API health check passes.
- [ ] Database migration plan reviewed.
- [ ] Rollback plan drafted.

## Admin and Operations

- [ ] Admin login works in staging.
- [ ] Review queue works with seeded pending users.
- [ ] Approve, reject, suspend, reinstate actions are tested.
- [ ] Wallet lookup works for review account.
- [ ] Audit log records admin actions.
- [ ] Support escalation contact is assigned.

## Go or No-Go

- [ ] All P0 QA cases passed.
- [ ] No open S0/S1 defects.
- [ ] Release owner approved submission.
- [ ] Store credentials and 2FA access are available to the submitting owner.
- [ ] Post-submission monitoring owner assigned.

## External Owner Gate Summary

- Apple gates: developer account access, final app identity, Sign in with Apple decision, IAP product setup if paid diamonds are enabled.
- Google gates: Play Console access, final package/signing setup, data safety form approval, billing products if paid diamonds are enabled.
- Payment gates: production payment strategy, receipt validation, refund and balance correction support process.
- Identity gates: real identity verification vendor, retention/deletion proof, test credentials, review account setup.
- Legal gates: approved privacy policy, terms, moderation/community guidelines, account deletion and retention language.
