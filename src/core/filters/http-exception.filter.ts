import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { REQUEST_ID_TOKEN_HEADER } from '../constants';
import { AppLogger } from '../logger/logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private appLogger: AppLogger) {
    this.appLogger.setContext(HttpExceptionFilter.name);
  }

  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.headers[REQUEST_ID_TOKEN_HEADER];

    // Log the stack for HttpException errors
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorMessage = exception.getResponse() as HttpException;

      const responseObject = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        url: request.url,
        ...errorMessage,
      };

      this.appLogger.warn({ status, requestId, responseObject });
      return response.status(status).json(responseObject);
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const responseObject = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      url: request.url,
    };

    // Log the stack for non-HttpException errors
    if (exception instanceof Error) {
      this.appLogger.error(exception.message, exception.stack, exception.name);
      responseObject['error'] = exception.name;
      responseObject['message'] = exception.message;
    } else {
      this.appLogger.error(exception);
      responseObject['error'] = 'INTERNAL SERVER';
    }

    this.appLogger.warn({ status, requestId, responseObject });
    return response.status(status).json(responseObject);
  }
}
