import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

export const walletProviders = [WalletService];
export const walletControllers = [WalletController];

export class WalletModule {}
