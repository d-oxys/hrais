import { createSlice } from "@reduxjs/toolkit";
import { DirectorateType } from "./directorate.slice";

export interface DivisionType {
  name?: string;
  id?: string;
  directorate?: DirectorateType;
}

export interface DivisionState {
  divisions: DivisionType[];
  division: DivisionType;
  loading: boolean;
  error: unknown;
}

const initialState = {
  divisions: [],
  division: {},
  loading: false,
  error: null,
};

const divisionSlice = createSlice({
  name: "division",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setDivision(state, action) {
      state.divisions = action.payload;
    },
    setDivisionDetail(state, action) {
      state.division = action.payload;
    },
  },
});

export const divisionActions = divisionSlice.actions;
export default divisionSlice.reducer;
