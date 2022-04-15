import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, FileModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
