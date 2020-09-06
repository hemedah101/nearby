import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateUserDto } from './dto';
import { User } from './models';

@Injectable()
export class UsersRepository {
  private readonly firestoreDB: Promise<firebaseAdmin.firestore.Firestore>;

  constructor(private firebaseService: FirebaseService) {
    this.firestoreDB = this.firebaseService.Firestore();
  }

  async createOne(dto: CreateUserDto, uid: string): Promise<void> {
    const user = new User({ ...dto, uid });
    await (await this.firestoreDB)
      .collection('users')
      .doc(user.uid)
      .set({ ...user });
  }

  async findOneUserById(uid: string): Promise<User | undefined> {
    const getDoc = await (await this.firestoreDB)
      .collection('users')
      .doc(uid)
      .get();
    return getDoc.data() as User;
  }
}
