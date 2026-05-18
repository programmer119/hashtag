import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

export const adminProviders = [AdminService];
export const adminControllers = [AdminController];

export class AdminModule {}
