import { createSlice } from "@reduxjs/toolkit";

export interface SalesData {
  kategori: string;
  group: string;
  subkategori: string;
  artikel: string;
  description: string;
  qty: number;
  brutto: number;
  disc: number | null;
  total: number;
  netto: number | null;
  dpp: number | null;
  ppn: number | null;
  sales_percentage: number | null;
  sales_percetange: number | null;
}

export interface PriceData {
  range: string;
  qty: number;
  brutto: number;
  disc: number;
  netto: number;
  sales_percentage: number;
  sales_percetange: number;
  salesData: SalesData[];
}

export interface PriceState {
  sales: PriceData[] | null;
  salesDetail: PriceData[] | null;
  loading: boolean;
  loadingDetail: boolean;
  error: unknown;
}

const initialState: PriceState = {
  sales: null,
  salesDetail: null,
  loading: false,
  loadingDetail: false,
  error: null,
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setSales(state, action) {
      state.sales = action.payload;
    },
    setSalesDetail(state, action) {
      state.salesDetail = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLoadingDetail(state, action) {
      state.loadingDetail = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setSales,
  setLoading,
  setError,
  setSalesDetail,
  setLoadingDetail,
} = priceSlice.actions;

export default priceSlice.reducer;
