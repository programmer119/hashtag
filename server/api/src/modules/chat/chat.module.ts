import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

export const chatProviders = [ChatService];
export const chatControllers = [ChatController];

export class ChatModule {}
