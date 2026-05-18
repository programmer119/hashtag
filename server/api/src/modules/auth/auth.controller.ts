export class AuthController {
  readonly routes = [
    'POST /v1/auth/phone/start',
    'POST /v1/auth/phone/verify',
    'POST /v1/auth/refresh',
    'POST /v1/auth/logout'
  ];
}
