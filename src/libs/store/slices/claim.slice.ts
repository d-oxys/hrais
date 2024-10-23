import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claims: [],
  pagination: {
    totalPage: 1,
    currentPage: 1,
  },
  claimDetail: null,
  loading: false,
  error: null,
};

const claimSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setClaims(state, action) {
      state.claims = action.payload;
    },
    setClaimDetail(state, action) {
      state.claimDetail = action.payload;
      state.pagination.totalPage = action.payload.total;
      state.pagination.currentPage = action.payload.current_page;
    },
  },
});

export const claimActions = claimSlice.actions;
export default claimSlice.reducer;
