export class ContentController {
  readonly routes = [
    'GET /v1/content/legal-documents',
    'GET /v1/content/legal-documents/:documentKey',
    'GET /v1/content/notices',
    'GET /v1/content/notices/:noticeId',
    'GET /v1/content/faqs',
    'GET /v1/content/homepage'
  ];
}
