import { ForbiddenException } from '@nestjs/common';

const message = 'invalid token';
export class InvalidTokenException extends ForbiddenException {
  constructor() {
    super(message);
  }
}
