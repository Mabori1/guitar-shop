import { Expose } from 'class-transformer';

export default class LoggedUserRdo {
  @Expose()
  public token!: string;

  @Expose()
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public name!: string;
}
