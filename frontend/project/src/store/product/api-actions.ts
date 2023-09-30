import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { Products, AppDispatch, State } from '../../types/types';

export const fetchProductsAction = createAsyncThunk<
  Products,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  try {
    const { data } = await api.get<Products>(APIRoute.Products);
    return data;
  } catch (err) {
    throw err;
  }
});
