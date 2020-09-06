import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [ConfigModule.Deferred],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
