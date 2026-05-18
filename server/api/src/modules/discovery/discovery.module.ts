import { DiscoveryController } from './discovery.controller';
import { DiscoveryService } from './discovery.service';

export const discoveryProviders = [DiscoveryService];
export const discoveryControllers = [DiscoveryController];

export class DiscoveryModule {}
