import { InternalServerErrorException } from '@nestjs/common';
import { Exclude, Transform } from 'class-transformer';
import { Types } from 'mongoose';
export class BaseVm {
  @Transform((val: Types.ObjectId) => val.toHexString())
  _id: string;
  @Exclude()
  id;
  @Exclude()
  __v;

  constructor(partial: Partial<any>) {
    try {
      if (partial.toJSON) {
        Object.assign(this, partial.toJSON());
      } else {
        Object.assign(this, partial);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'database conflict, please check database for outdated models',
      );
    }
  }
}
