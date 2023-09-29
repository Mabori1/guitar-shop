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
  email: string;
  token: string;
};

export type AuthData = {
  password: string;
  login: string;
};
