import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loadProducts,
  requireAuthorization,
  setError,
  setProductLoadingStatus,
} from './actions';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AppDispatch, Products } from '../types/types';
import { State } from '../types/types';
import { AuthData, UserData } from '../types/user.types';
import { store } from '.';

export const clearErrorAction = createAsyncThunk('data/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchProductsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchProducts', async (_arg, { dispatch, extra: api }) => {
  dispatch(setProductLoadingStatus(true));
  const { data } = await api.get<Products>(APIRoute.Products);
  dispatch(setProductLoadingStatus(false));
  dispatch(loadProducts(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthStatus.NoAuth));
});
