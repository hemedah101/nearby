import { f } from '@marcj/marshal';

export class EnvConfig {
  @f
  NODE_ENV: 'production' | 'prod' | 'development' | 'dev' = 'development';

  @f
  PORT: number = 4000;

  @f
  GLOBAL_PREFIX: string = 'api';

  @f
  RATE_LIMIT: number = 1000;

  @f
  JWT_SECRET: string;

  @f
  JWT_EXPIRE: string = '30d';

  @f
  IN_MAIL_TOKEN_SECRET: string;

  @f
  DATABASE_URL: string;

  @f
  FIREBASE_PROJECT_ID: string;

  @f
  FIREBASE_CLIENT_EMAIL: string;

  @f
  FIREBASE_DATABASE_URL: string;

  @f
  FIREBASE_PRIVATE_KEY: string;
}
