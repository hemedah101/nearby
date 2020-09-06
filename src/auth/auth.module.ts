import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from 'src/config/config.module';
import { FirebaseNormalUserValidateStrategy } from './strategies';

@Module({
  imports: [ConfigModule.Deferred, UserModule],
  providers: [AuthService, FirebaseNormalUserValidateStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
