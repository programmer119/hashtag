import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

export const reportsProviders = [ReportsService];
export const reportsControllers = [ReportsController];

export class ReportsModule {}
