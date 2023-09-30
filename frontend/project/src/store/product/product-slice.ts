import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsAction } from './api-actions';
import { FetchStatus, NameSpace } from '../../const';
import { Products } from '../../types/types';

export type ProductsData = {
  products: Products;
  productsStatus: FetchStatus;
};

const initialState: ProductsData = {
  products: [],
  productsStatus: FetchStatus.Idle,
};

export const productSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.productsStatus = FetchStatus.Loading;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.productsStatus = FetchStatus.Success;
        state.products = action.payload;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.productsStatus = FetchStatus.Failed;
      });
  },
});
