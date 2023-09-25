import { User } from '../../types/user.type.js';
import typegoose, {
  defaultClasses,
  getModelForClass,
} from '@typegoose/typegoose';
import { createSHA256 } from '../../core/helpers/index.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, default: '' })
  public name = '';

  @prop({ unique: true, required: true })
  public email = '';

  @prop({ required: true, default: '' })
  private password?: string;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
