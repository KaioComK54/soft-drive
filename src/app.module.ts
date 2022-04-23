import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiLoggerMiddleware } from './modules/shared/middlewares/logger.middleware';
import { LoggerModule } from './modules/shared/logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env.LIMIT_OF_TIME),
      limit: parseInt(process.env.LIMIT_OF_REQUESTS),
    }),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    FileModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ApiLoggerMiddleware).forRoutes('*');
  }
}
