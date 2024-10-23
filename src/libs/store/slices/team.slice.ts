import { createSlice } from "@reduxjs/toolkit";

export interface TeamType {
  name?: string;
  level_id?: string;
}

export interface TeamState {
  teams: TeamType[];
  team: TeamType;
  loading: boolean;
  error: unknown;
}

const initialState = {
  teams: [],
  team: {},
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setTeam(state, action) {
      state.teams = action.payload;
    },
    setTeamDetail(state, action) {
      state.team = action.payload;
    },
  },
});

export const teamActions = teamSlice.actions;
export default teamSlice.reducer;
