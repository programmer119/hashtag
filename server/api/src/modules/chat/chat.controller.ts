export class ChatController {
  readonly routes = [
    'GET /v1/chat/rooms',
    'GET /v1/chat/rooms/:roomId/messages',
    'POST /v1/chat/rooms/:roomId/messages',
    'POST /v1/chat/rooms/:roomId/read'
  ];
}
