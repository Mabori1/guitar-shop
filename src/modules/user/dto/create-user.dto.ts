import { IsEmail, IsString, Length } from 'class-validator';
import { USER_VALIDATION_DATA } from '../user.constant.js';

const { NAME, EMAIL, PASSWORD } = USER_VALIDATION_DATA;

export class CreateUserDto {
  @IsString({ message: NAME.MessageRequired })
  @Length(NAME.Min, NAME.Max, { message: NAME.MessageValid })
  public name!: string;

  @IsEmail({}, { message: EMAIL.MessageValid })
  public email!: string;

  @IsString({ message: PASSWORD.MessageRequired })
  @Length(PASSWORD.Min, PASSWORD.Max, { message: PASSWORD.MessageValid })
  public password!: string;
}
