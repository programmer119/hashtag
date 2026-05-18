import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

export const profilesProviders = [ProfilesService];
export const profilesControllers = [ProfilesController];

export class ProfilesModule {}
