import { createSlice } from "@reduxjs/toolkit";
import { TeamType } from "./team.slice";

export interface PositionType {
  name?: string;
  id?: string;
  team_id?: string;
  team?: TeamType;
}

export interface PositionState {
  positions: PositionType[];
  position: PositionType;
  loading: boolean;
  error: unknown;
}

const initialState = {
  positions: [],
  position: {},
  loading: false,
  error: null,
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setPosition(state, action) {
      state.positions = action.payload;
    },
    setPositionDetail(state, action) {
      state.position = action.payload;
    },
  },
});

export const positionActions = positionSlice.actions;
export default positionSlice.reducer;
