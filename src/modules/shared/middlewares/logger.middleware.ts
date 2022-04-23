import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiLogger } from '../logger/logger.service';

@Injectable()
export class ApiLoggerMiddleware implements NestMiddleware {
  constructor(private readonly _logger: ApiLogger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const message = `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`;

      switch (true) {
        case statusCode >= 400 && statusCode <= 599:
          this._logger.error(message);
          break;

        default:
          this._logger.log(message);
          break;
      }
    });

    next();
  }
}
