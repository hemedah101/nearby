import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateUserDto } from './dto';
import { User } from './models';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UsersRepository,
    private firebaseService: FirebaseService,
  ) {}

  createOneUser(user: CreateUserDto, uid: string): Promise<void> {
    return this.usersRepository.createOne(user, uid);
  }

  async findOneUserById(userId: string): Promise<User | undefined> {
    return this.usersRepository.findOneUserById(userId);
  }
}
