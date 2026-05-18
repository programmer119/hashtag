import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

export const paymentsProviders = [PaymentsService];
export const paymentsControllers = [PaymentsController];

export class PaymentsModule {}
