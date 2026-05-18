# Auth Feature

Owns welcome, phone/email entry, verification code, session restore, logout trigger, and approval-aware redirect decisions.

First screens:

- `WelcomeScreen`
- `PhoneEntryScreen`
- `EmailEntryScreen`
- `VerificationCodeScreen`

State:

- `SessionController`
- `AuthRepository`

API:

- `POST /auth/login/start`
- `POST /auth/login/verify`
- `POST /auth/refresh`
- `POST /auth/logout`
