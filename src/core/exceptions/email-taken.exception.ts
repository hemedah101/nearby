import { BadRequestException } from '@nestjs/common';

const message = 'Email is already registered';
export class EmailTakenException extends BadRequestException {
  constructor() {
    super(message);
  }
}
