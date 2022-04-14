import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../shared/jwt/jwt.strategy';
import { DatabaseModule } from '../shared/database/database.module';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { UserMapper } from './dto/user.mapper';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRATION),
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserMapper,
    ...userProviders,
    JwtStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}
