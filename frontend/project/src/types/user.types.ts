import { AuthStatus } from '../const';

export type UserRegisterData = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginData = {
  email: string;
  password: string;
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  token: string;
};

export type AuthData = {
  password: string;
  login: string;
};

export type UserType = {
  id?: string;
  name: string;
  email: string;
  token: string;
};

export type UserSlice = {
  userData: UserType | null;
  authStatus: AuthStatus;
};
