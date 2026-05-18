import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

export const likesProviders = [LikesService];
export const likesControllers = [LikesController];

export class LikesModule {}
