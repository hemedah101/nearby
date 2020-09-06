import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  @Transform((val: string) => val.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
