import { BadRequestException } from '@nestjs/common';

const message = 'invalid email or password';
export class InvalidCredentialsException extends BadRequestException {
  constructor() {
    super(message);
  }
}
