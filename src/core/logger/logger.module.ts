import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { AppLogger } from './logger.service';

@Module({
  imports: [ConfigModule.Deferred],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
