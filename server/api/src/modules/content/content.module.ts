import { ContentController } from './content.controller';
import { ContentService } from './content.service';

export class ContentModule {
  readonly controllers = [ContentController];
  readonly providers = [ContentService];
}
