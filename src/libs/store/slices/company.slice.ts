import { createSlice } from "@reduxjs/toolkit";

export interface CompanyState {
  companies: any[];
  loading: boolean;
  error: unknown;
}

const initialState: CompanyState = {
  companies: [],
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setCompanies(state, action) {
      state.companies = action.payload;
    },
    setCompanyStatus(state, action) {
      state.companies = action.payload;
    },
  },
});

export const companyActions = companySlice.actions;
export default companySlice.reducer;
