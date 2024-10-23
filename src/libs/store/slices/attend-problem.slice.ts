import { createSlice } from "@reduxjs/toolkit";

// make slice for attendProblem based on company.slice.ts
const attendProblemSlice = createSlice({
  name: "attendProblem",
  initialState: {
    attendProblems: [],
    pagination: {
      totalPage: 1,
      currentPage: 1,
    },
    attendProblem: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setAttendProblem(state, action) {
      state.attendProblems = action.payload;
      state.pagination.totalPage = action.payload.total;
      state.pagination.currentPage = action.payload.current_page;
    },
    setAttendProblemDetail(state, action) {
      state.attendProblem = action.payload;
    },
  },
});
export const attendProblemActions = attendProblemSlice.actions;
export default attendProblemSlice.reducer;
