import { FetchStatus, NameSpace } from '../../const';
import { createSelector } from '@reduxjs/toolkit';
import { Products, State } from '../../types/types';

export const getProducts = (state: State): Products =>
  state[NameSpace.Products].products;
export const getStatus = (state: State): FetchStatus =>
  state[NameSpace.Products].productsStatus;

export const getProductsStatus = createSelector([getStatus], (status) => ({
  isLoading: [FetchStatus.Idle, FetchStatus.Loading].includes(status),
  isSuccess: status === FetchStatus.Success,
  isError: status === FetchStatus.Failed,
}));
