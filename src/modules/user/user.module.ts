import { Module } from '@nestjs/common';
import { DatabaseModule } from '../shared/database/database.module';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { UserMapper } from './dto/user.mapper';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
