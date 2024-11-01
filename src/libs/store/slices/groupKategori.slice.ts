// src/libs/store/slices/groupKategori.slice.ts
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
  sales_percentage: number | null;
}

export interface GroupKategoriState {
  sales: SalesData[] | null;
  salesDetail: SalesData[] | null;
  loading: boolean;
  loadingDetail: boolean;
  error: unknown;
}

const initialState: GroupKategoriState = {
  sales: null,
  salesDetail: null,
  loading: false,
  loadingDetail: false,
  error: null,
};

const groupKategoriSlice = createSlice({
  name: "groupKategori",
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

// Export the actions
export const {
  setSales,
  setLoading,
  setError,
  setSalesDetail,
  setLoadingDetail,
} = groupKategoriSlice.actions;

// Export the reducer
export default groupKategoriSlice.reducer;
