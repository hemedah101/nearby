import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmailDto {
  @IsEmail()
  @Transform((val: string) => val.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
