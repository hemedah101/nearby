import { NotFoundException } from '@nestjs/common';

const message = ' not found';
export class RecordNotFoundException extends NotFoundException {
  constructor(record: string) {
    super(record + message);
  }
}
