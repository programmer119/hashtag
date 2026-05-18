export class UsersController {
  readonly routes = [
    'GET /v1/users/me',
    'PATCH /v1/users/me',
    'POST /v1/users/me/deactivate',
    'POST /v1/users/me/deletion-requests'
  ];
}
