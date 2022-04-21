import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiLogger } from './modules/shared/logger/logger.service';
import { HttpExceptionFilter } from './modules/shared/exceptionFilter/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new ApiLogger();

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    exposedHeaders: 'Content-Disposition',
  });

  app.useGlobalFilters(new HttpExceptionFilter(logger));

  await app.listen(process.env.API_PORT);
}
bootstrap();
