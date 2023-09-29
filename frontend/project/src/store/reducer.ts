import { Filters, Products, User } from '../types/types';
import { AuthStatus, LIMIT_PAGE } from '../const';
import { createReducer } from '@reduxjs/toolkit';
import {
  changeFilter,
  changePage,
  loadProducts,
  requireAuthorization,
  setError,
  setProductLoadingStatus,
} from './actions';

type InitialState = {
  products: Products;
  pages: number | null;
  limit: number;
  currentPage: number;
  filters: Filters;
  sort: {
    sortField: 'price' | 'createdAt';
    sortDir: 1 | -1;
  };
  authStatus: AuthStatus;
  user: User | undefined;
  error: string | null;
  isDataLoading: boolean;
};

const initialState: InitialState = {
  products: [] as Products,
  pages: LIMIT_PAGE,
  limit: LIMIT_PAGE,
  currentPage: 1,
  filters: {
    acoustic: false,
    electric: false,
    ukulele: false,
    strings4: false,
    strings6: false,
    strings7: false,
    strings12: false,
  },
  sort: {
    sortField: 'price',
    sortDir: 1,
  },
  authStatus: AuthStatus.Unknown,
  user: undefined,
  error: null,
  isDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changePage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(changeFilter, (state, action) => {
      state.filters = action.payload;
    })
    .addCase(loadProducts, (state, action) => {
      state.products = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setProductLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
