import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';

export const matchesProviders = [MatchesService];
export const matchesControllers = [MatchesController];

export class MatchesModule {}
