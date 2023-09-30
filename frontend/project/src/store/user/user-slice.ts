import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../const';
import { UserData } from '../../types/user.types';
import { checkAuthAction, loginAction, logoutAction } from './api-actions';

export type UserSlice = {
  authStatus: AuthStatus;
  userData: UserData | null;
};

const initialState: UserSlice = {
  authStatus: AuthStatus.Unknown,
  userData: null,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.authStatus = AuthStatus.Loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  },
});
