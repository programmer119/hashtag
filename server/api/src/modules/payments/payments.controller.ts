export class PaymentsController {
  readonly routes = [
    'GET /v1/payments/products',
    'POST /v1/payments/apple/verify',
    'POST /v1/payments/google/verify'
  ];
}
