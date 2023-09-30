import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { productSlice } from './product/product-slice';
import { userSlice } from './user/user-slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Products]: productSlice.reducer,
});
