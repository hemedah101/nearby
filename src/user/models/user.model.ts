import * as moment from 'moment-timezone';
import { Moment } from 'moment-timezone';

export class User {
  uid: string;
  email: string;
  name: string;
  deviceToken: String[];
  emailVerified: boolean;
  enabled: boolean;
  createdAt: Moment;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
    this.emailVerified = false;
    this.enabled = true;
    this.createdAt = moment.utc();
  }
}
