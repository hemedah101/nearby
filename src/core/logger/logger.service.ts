import { LoggerService, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { createLogger, format, Logger, transports } from 'winston';

// We inject a transient instance of the Logger into our feature modules
// so that each one has its own custom context.

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private context?: string;
  private winstonLogger: Logger;

  public setContext(context: string) {
    this.context = context;
  }

  constructor(private readonly configService: ConfigService) {
    //
    // As of winston@3, the default logging format is JSON.
    //
    const options = this.configService.isProd
      ? [new transports.File({ filename: 'logs/combined.log' })]
      : [new transports.Console({ format: format.prettyPrint() })];

    this.winstonLogger = createLogger({ transports: options });
  }

  log(message: any, context?: string) {
    return this.winstonLogger.info(message, {
      context: context || this.context,
    });
  }

  error(message: any, trace?: string, context?: string): any {
    return this.winstonLogger.error(message, {
      trace,
      context: context || this.context,
    });
  }

  warn(message: any, context?: string): any {
    return this.winstonLogger.warn(message, {
      context: context || this.context,
    });
  }

  debug(message: any, context?: string): any {
    return this.winstonLogger.debug(message, {
      context: context || this.context,
    });
  }

  verbose(message: any, context?: string): any {
    return this.winstonLogger.verbose(message, {
      context: context || this.context,
    });
  }
}
