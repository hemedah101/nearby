import { INestApplication, ValidationPipe, Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimiter from 'express-rate-limit';
import { ConfigService } from './config/config.service';
import { RequestIdMiddleware } from './core/middleware';

export function configure(app: INestApplication, config: ConfigService): void {
  const logger = new Logger('ApplicationConfig');
  // Express middleware
  app.use(
    helmet(),
    compression(),
    rateLimiter({
      windowMs: 10 * 60 * 1000,
      max: config.rateLimit,
      message: 'Too many requests, please try again later.',
    }),
    RequestIdMiddleware,
  );

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );
  app.enableCors({ credentials: true });
  app.setGlobalPrefix(config.globalPrefix);

  logger.log('Application Configuration complete');
}
