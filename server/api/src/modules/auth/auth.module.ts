import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export const authProviders = [AuthService];
export const authControllers = [AuthController];

export class AuthModule {}
