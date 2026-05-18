import { SupportController } from './support.controller';
import { SupportService } from './support.service';

export class SupportModule {
  readonly controllers = [SupportController];
  readonly providers = [SupportService];
}
