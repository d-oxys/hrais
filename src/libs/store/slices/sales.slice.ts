import { createSlice } from "@reduxjs/toolkit";

export interface SalesState {
  salesDataGroup: {
    price_range: string | null;
    best_color: string | null;
    sales_percentage: number | null;
  };
  salesDataKategori: {
    price_range: string | null;
    best_color: string | null;
    sales_percentage: number | null;
  };
  salesDataSubKategori: {
    price_range: string | null;
    best_color: string | null;
    sales_percentage: number | null;
  };
  loading: boolean;
  error: unknown;
}

const initialState: SalesState = {
  salesDataGroup: {
    price_range: null,
    best_color: null,
    sales_percentage: null,
  },
  salesDataKategori: {
    price_range: null,
    best_color: null,
    sales_percentage: null,
  },
  salesDataSubKategori: {
    price_range: null,
    best_color: null,
    sales_percentage: null,
  },
  loading: false,
  error: null,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSalesDataGroup(state, action) {
      state.salesDataGroup = action.payload;
    },
    setSalesDataKategori(state, action) {
      state.salesDataKategori = action.payload;
    },
    setSalesDataSubKategori(state, action) {
      state.salesDataSubKategori = action.payload;
    },
  },
});

export const salesActions = salesSlice.actions;
export default salesSlice.reducer;
