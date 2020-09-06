import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
}
