import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "..";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchProductsParams {
  awal?: string;
  akhir?: string;
  artikel?: string;
  kdtoko?: string;
}

interface ProductState {
  products: any[];
  loading: boolean;
  error: unknown;
}

interface ProductAttentionState {
  attentionProducts: any[];
  attentionLoading: boolean;
  attentionError: unknown;
}

const initialState: ProductState & ProductAttentionState = {
  products: [],
  loading: false,
  error: null,
  attentionProducts: [],
  attentionLoading: false,
  attentionError: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<unknown>) {
      state.error = action.payload;
    },
    setProducts(state, action: PayloadAction<any[]>) {
      state.products = action.payload;
    },
    setAttentionLoading(state, action: PayloadAction<boolean>) {
      state.attentionLoading = action.payload;
    },
    setAttentionError(state, action: PayloadAction<unknown>) {
      state.attentionError = action.payload;
    },
    setAttentionProducts(state, action: PayloadAction<any[]>) {
      state.attentionProducts = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
