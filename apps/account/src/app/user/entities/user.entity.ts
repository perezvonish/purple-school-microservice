import {IUser, UserRole} from "@./interfaces";
import * as bcrypt from 'bcrypt';

export class UserEntity implements IUser {
  _id: string;
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  constructor(user: IUser) {
    this._id = user._id
    this.displayName = user.displayName
    this.email = user.email
    this.passwordHash = user.passwordHash
    this.role = user.role
  }

  public async setPassword(password: string) {
    this.passwordHash = await bcrypt.hashSync(password, 10);
    return this;
  }

  public validatePassword(password: string) {
    return bcrypt.compare(password, this.passwordHash)
  }
}
