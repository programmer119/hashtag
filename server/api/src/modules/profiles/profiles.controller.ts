export class ProfilesController {
  readonly routes = [
    'GET /v1/profiles/me',
    'PUT /v1/profiles/me',
    'POST /v1/profiles/me/photos/upload-url',
    'POST /v1/profiles/me/photos',
    'GET /v1/profiles/:profileId',
    'POST /v1/profiles/:profileId/unlocks'
  ];
}
