import { AuthStatus, NameSpace } from '../../const';
import { State } from '../../types/types';
import { UserData } from '../../types/user.types';

export const getAuthStatus = (state: State): AuthStatus =>
  state[NameSpace.User].authStatus;

export const getIsAuthorized = (state: State): boolean =>
  state[NameSpace.User].authStatus === AuthStatus.Auth;

export const getIsUserLoading = (state: State): boolean =>
  state[NameSpace.User].authStatus === AuthStatus.Loading;

export const getUserData = (state: State): UserData | null =>
  state[NameSpace.User].userData;
