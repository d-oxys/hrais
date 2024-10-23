import { createSlice } from "@reduxjs/toolkit";
import { User } from "@root/libs/types/user";

export interface UserState {
  user: User | null;
  loading: boolean;
  error: unknown;
}

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
