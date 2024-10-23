import { createSlice } from "@reduxjs/toolkit";

// make slice for evaluation based on company.slice.ts
const evaluationSlice = createSlice({
  name: "evaluation",
  initialState: {
    evaluations: [],
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
    setEvaluation(state, action) {
      state.evaluations = action.payload;
    },
  },
});
export const evaluationActions = evaluationSlice.actions;
export default evaluationSlice.reducer;
