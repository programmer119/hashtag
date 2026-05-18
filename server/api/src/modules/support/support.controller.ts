export class SupportController {
  readonly routes = [
    'POST /v1/support/requests',
    'GET /v1/support/requests/me',
    'GET /v1/support/requests/:requestId'
  ];
}
