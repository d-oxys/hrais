// src/libs/store/slices/groupKategori.slice.ts
import { createSlice } from '@reduxjs/toolkit';

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
  sales_percetange: number | null;
}

export interface GroupKategoriState {
  sales: SalesData[] | null;
  loading: boolean;
  error: unknown;
}

const initialState: GroupKategoriState = {
  sales: null,
  loading: false,
  error: null,
};

const groupKategoriSlice = createSlice({
  name: 'groupKategori',
  initialState,
  reducers: {
    setSales(state, action) {
      state.sales = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export the actions
export const { setSales, setLoading, setError } = groupKategoriSlice.actions;

// Export the reducer
export default groupKategoriSlice.reducer;
