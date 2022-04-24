import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiLogger } from './modules/shared/logger/logger.service';
import { HttpExceptionFilter } from './modules/shared/exceptionFilter/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new ApiLogger();

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    exposedHeaders: ['Content-Disposition', 'FileName'],
    origin: '*',
  });

  app.useGlobalFilters(new HttpExceptionFilter(logger));

  await app.listen(process.env.PORT || process.env.API_PORT);
}
bootstrap();
