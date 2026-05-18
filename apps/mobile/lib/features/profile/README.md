# Profile Feature

Owns profile setup, photo selection/upload handoff, lifestyle tags, review submission, and pending approval UI.

First screens:

- `ProfileBasicsScreen`
- `ProfilePhotosScreen`
- `ProfileTagsScreen`
- `ProfileSubmitScreen`
- `ReviewPendingScreen`

State:

- `ProfileDraftController`
- `MyProfileController`
- `ProfileRepository`

API:

- `GET /me/profile`
- `PATCH /me/profile`
- `POST /me/photos/upload-url`
- `POST /me/profile/submit-review`
