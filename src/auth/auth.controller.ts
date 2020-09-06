import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, LoginDto, ResetPasswordDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('email/register')
  async registerUser(@Body() dto: CreateUserDto) {
    // const { password, ...data } = dto;
    // // check for email uniqueness
    // if (await this.userService.isExist({ email: dto.email })) {
    //   throw new EmailTakenException();
    // }
    // // generate hash and create user
    // const hash = await generateHashedPassword(password);
    // const user = await this.userService.create({ ...data, hash });
    // // generate email verification token and send it via mail
    // const token = this.authService.createInMailToken(user);
    // // FIXME Remove in production
    // console.log({ token });
    // return new UserVm(user);
  }

  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() dto: LoginDto) {
    // const { email, password } = dto;
    // const user = await this.userService.findOne({ email });
    // // validate credentials
    // if (!user || !(await validPassword(password, user.hash))) {
    //   throw new InvalidCredentialsException();
    // }
    // // validate email verification
    // if (!user.emailVerified) {
    //   throw new ForbiddenException('please verify your email');
    // }
    // // generate token
    // const token = this.authService.createAuthenticationToken(user);
    // return new LoginVm({ token, user });
  }

  @Get('email/verify')
  async verifyEmail(@Param('token') token: string): Promise<string> {
    // validate the token
    // const payload = this.authService.validateInMailToken(token);

    // const user = await this.userService.findById(payload.id);
    // if (!user) {
    //   // send a new token mail
    //   const token = this.authService.createInMailToken(user);
    //   throw new InvalidTokenException();
    // }

    // if (user.emailVerified) {
    //   return 'your email is already verified';
    // }

    // user.emailVerified = true;
    // await user.save();

    return 'email verified';
  }

  @Post('password/reset')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    // const { token, password } = dto;

    // // validate the token
    // const payload = this.authService.validateInMailToken(token);

    // await this.userService.resetPassword(payload.id, password);

    return 'password reset successfully';
  }
}
