import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class FirebaseService {
  constructor(private configService: ConfigService) {
    if (!firebaseAdmin.apps.length) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(this.configService.firebase),
        databaseURL: this.configService.firebaseDatabaseURL,
      });
    }
  }

  async Auth(): Promise<firebaseAdmin.auth.Auth> {
    return firebaseAdmin.auth();
  }

  async Firestore(): Promise<FirebaseFirestore.Firestore> {
    return firebaseAdmin.firestore();
  }

  /**
   * Update custom claims in firebase without overwriting all existing claims.
   * @param userId: string
   * @param upsertCustomClaims: Record<string, any>
   */
  async UpsertCustomClaims(
    uid: string,
    upsertCustomClaims: Record<string, any>,
  ): Promise<void> {
    const firebaseUser = await firebaseAdmin.auth().getUser(uid);
    const existingCustomClaims = firebaseUser.customClaims;

    // Merge upsertCustomClaims in to existingCustomClaims.
    const newCustomClaims = Object.assign(
      {},
      existingCustomClaims,
      upsertCustomClaims,
    );

    // Overwrite firebase custom claims with newCustomClaims.
    await firebaseAdmin.auth().setCustomUserClaims(uid, newCustomClaims);
  }

  /**
   * Delete custom claims in firebase without overwriting all existing claims.
   * @param uid: string
   * @param deleteCustomClaimKeys: Array<string>
   */
  async DeleteCustomClaims(
    uid: string,
    deleteCustomClaimKeys: Array<string>,
  ): Promise<void> {
    const firebaseUser = await firebaseAdmin.auth().getUser(uid);
    const existingCustomClaims = firebaseUser.customClaims;

    for (const customClaimKey of deleteCustomClaimKeys) {
      delete existingCustomClaims[customClaimKey];
    }

    // Create newCustomClaims from existingCustomClaims for more readability.
    const newCustomClaims = Object.assign({}, existingCustomClaims);

    // Overwrite firebase custom claims with newCustomClaims.
    await firebaseAdmin.auth().setCustomUserClaims(uid, newCustomClaims);
  }

  /**
   * Delete user in firebase auth.
   * @param uid: string
   */
  async DeleteFirebaseUser(uid: string): Promise<void> {
    await firebaseAdmin.auth().deleteUser(uid);
  }
}
