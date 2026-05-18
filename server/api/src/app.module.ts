import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { ContentModule } from './modules/content/content.module';
import { DiscoveryModule } from './modules/discovery/discovery.module';
import { LikesModule } from './modules/likes/likes.module';
import { MatchesModule } from './modules/matches/matches.module';
import { ModerationModule } from './modules/moderation/moderation.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SupportModule } from './modules/support/support.module';
import { UsersModule } from './modules/users/users.module';
import { WalletModule } from './modules/wallet/wallet.module';

export const appModules = [
  AuthModule,
  UsersModule,
  ProfilesModule,
  ModerationModule,
  DiscoveryModule,
  LikesModule,
  MatchesModule,
  ChatModule,
  WalletModule,
  PaymentsModule,
  ReportsModule,
  SupportModule,
  ContentModule,
  AdminModule
];

export class AppModule {}
