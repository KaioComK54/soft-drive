import { LoggerService, Logger, Injectable } from '@nestjs/common';

@Injectable()
export class ApiLogger implements LoggerService {
  private readonly _logger = new Logger();

  log(message: any) {
    this._logger.log(message);
  }

  error(message: any) {
    this._logger.error(message);
  }

  warn(message: any) {
    this._logger.warn(message);
  }

  debug?(message: any) {
    this._logger.debug(message);
  }

  verbose?(message: any) {
    this._logger.verbose(message);
  }
}
