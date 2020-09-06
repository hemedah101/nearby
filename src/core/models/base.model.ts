import { Document, Types } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({})
export class BaseModel extends Document {
  @Prop({ type: Date })
  createdAt: Date;
  @Prop({ type: Date })
  updatedAt: Date;
  @Prop({ type: Number, select: false })
  __v: number;
}

export const toHexString = (val: Types.ObjectId) => val.toHexString();
export const toObjectId = (val: string) => Types.ObjectId(val);
