import { ModerationController } from './moderation.controller';
import { ModerationService } from './moderation.service';

export const moderationProviders = [ModerationService];
export const moderationControllers = [ModerationController];

export class ModerationModule {}
