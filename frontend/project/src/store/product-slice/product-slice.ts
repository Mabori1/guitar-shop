import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchProductsAction } from '../api-actions';
import { ProductsSlice } from '../../types/types';

const initialState: ProductsSlice = {
  products: [],
  isProductsDataLoading: false,
  hasError: false,
};

export const productSlice = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsDataLoading = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsDataLoading = false;
      });
  },
});
