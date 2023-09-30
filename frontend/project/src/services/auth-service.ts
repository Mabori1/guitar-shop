import { APIRoute } from '../const';
import { api } from '../store';
import { UserData, UserLoginData, UserRegisterData } from '../types/user.types';

export const AuthService = {
  async register(userData: UserRegisterData): Promise<UserData | undefined> {
    const { data } = await api.post<UserData>(APIRoute.Register, userData);
    return data;
  },
  async checkAuth(): Promise<any | undefined> {
    return api.get<UserData>(APIRoute.Login);
  },
  async login(userData: UserLoginData): Promise<any | undefined> {
    const { data } = await api.post<UserData>(APIRoute.Login, userData);
    return data;
  },
};
