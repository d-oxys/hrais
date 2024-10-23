import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    loading: false,
    error: null,
    uploadedFile: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setUploadedFile(state, action) {
      state.uploadedFile = action.payload;
    },
  },
});

export const uploadActions = uploadSlice.actions;
export default uploadSlice.reducer;
