import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FirebaseNormalUserValidateGuard } from 'src/core/guards/firebase-normal-user-validate.guard';
import { NoResponseBodyInterceptor } from 'src/core/interceptors';
import { NoResponseBody } from 'src/core/shared';
import { CreateUserDto } from './dto';
import { User } from './models';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(NoResponseBodyInterceptor)
@UseGuards(FirebaseNormalUserValidateGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createOneBase(
    @Request() req,
    @Body() dto: CreateUserDto,
  ): Promise<NoResponseBody> {
    const uid = req.user.uid;
    await this.userService.createOneUser(dto, uid);
    return {};
  }

  @Get('/me/profile')
  async getMeProfile(@Request() req): Promise<User> {
    const uid = req.user.uid;
    const user = await this.userService.findOneUserById(uid);
    return user;
  }
}
