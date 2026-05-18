import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export const usersProviders = [UsersService];
export const usersControllers = [UsersController];

export class UsersModule {}
