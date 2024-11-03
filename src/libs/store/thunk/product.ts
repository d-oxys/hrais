import axios, { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { productActions } from '../slices/product.slice';
import promoData from '@root/libs/constants/promo.json';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchProductsParams {
  awal?: string;
  akhir?: string;
  artikel?: string;
  kdtoko?: string[];
  brand?: string;
  kode_brg?: string;
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    params: {
      awal?: string;
      akhir?: string;
      artikel?: string;
      brand?: string;
      kdtoko?: string[];
    },
    { dispatch }
  ) => {
    dispatch(productActions.setLoading(true));

    const { awal = '2024-01-01', akhir = '2024-10-10', artikel = '', brand = '', kdtoko } = params;
    const kdtokoParam = kdtoko ? `&kdtoko=${kdtoko.join(',')}` : '';
    const url = `${API_URL}/api/sales/product/site/kategori/all?awal=${awal}&akhir=${akhir}&artikel=${artikel}&limit=10000000&brand=${brand}${kdtokoParam}`;

    try {
      const response = await axios.get(url);
      dispatch(productActions.setProducts(response.data.items));
    } catch (error) {
      console.error('Error fetching products:', error);

      // Gunakan data dari promoData jika API gagal
      dispatch(productActions.setProducts(promoData.items || []));
      dispatch(productActions.setError(error instanceof Error ? error.message : 'An unknown error occurred'));
    } finally {
      dispatch(productActions.setLoading(false));
    }
  }
);

export const fetchProductDetail = createAsyncThunk('product/fetchProductDetail', async (params: FetchProductsParams, { dispatch, rejectWithValue }) => {
  dispatch(productActions.setLoadingDetail(true));
  dispatch(productActions.setError(null));

  try {
    const { awal, akhir, kode_brg, kdtoko } = params;
    const response = await axios.get(`${API_URL}/api/sales/product/site/kategori/all/detail`, { params: { awal, akhir, kode_brg, kdtoko } });
    console.log(response.data);
    dispatch(productActions.setProductsDetail(response.data));
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return rejectWithValue(err.response?.data?.message || 'An error occurred');
    } else {
      return rejectWithValue('An unexpected error occurred');
    }
  } finally {
    dispatch(productActions.setLoadingDetail(false));
  }
});

export const analyzeProductAttention = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(productActions.setAttentionError(null));
    dispatch(productActions.setAttentionLoading(true));

    try {
      const response = await axios.get(`${API_URL}/api/sales/product/site/group/all?limit=100000000`);
      const products = response.data.items;

      const attentionNeeded = products.filter((product: any) => {
        const salesRatios = product.stores.map((store: any) => parseFloat(store.sales_percentage));
        const maxRatio = Math.max(...salesRatios);
        const minRatio = Math.min(...salesRatios);

        return maxRatio - minRatio > 1.0;
      });

      dispatch(productActions.setAttentionProducts(attentionNeeded));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(productActions.setAttentionError(err.response?.data?.message));
      } else {
        dispatch(productActions.setAttentionError('An unexpected error occurred'));
      }
    } finally {
      dispatch(productActions.setAttentionLoading(false));
    }
  };
};
