import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MongoServerError } from 'mongoose/node_modules/mongodb';
import { ApiLogger } from '../logger/logger.service';

@Catch()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly _logger: ApiLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this._logger.error(exception);

    let message = 'Internal Server Error';
    let name = 'HttpException';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      name = (exception as any).name;
      message = (exception as any).response?.message;
      status = (exception as any).status;
    }

    switch (exception.constructor) {
      case MongooseError.ValidationError:
        message = (exception as any).message;
        status = HttpStatus.BAD_REQUEST;
        name = 'ValidationError';
        break;

      case MongoServerError:
        switch ((exception as any).code) {
          case 11000:
            const fields = Object.keys((exception as any).keyValue);

            message = `There is already a record in the database with the '${fields}' provided`;
            status = HttpStatus.CONFLICT;
            name = 'DatabaseError';

            break;

          default:
            break;
        }

        break;

      default:
        break;
    }

    response.status(status).json({
      name,
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
