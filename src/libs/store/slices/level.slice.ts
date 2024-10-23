import { createSlice } from '@reduxjs/toolkit';

export interface LevelType {
  id?: number;
  level?: string;
  grade?: string;
  levelEm?: string;
  type?: string;
  category?: string;
  health_balance?: number;
  meal_allowance?: number;
  transportation_fee?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

const initialState = {
  levels: [] as LevelType[],
  level: {} as LevelType,
  levelCategory: [] as LevelType[],
  levelEmacs: [] as LevelType[],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
  },
};

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLevel(state, action) {
      state.levels = action.payload;
    },
    setLevelDetail(state, action) {
      state.level = action.payload;
    },
    setLevelCategory(state, action) {
      state.levelCategory = action.payload;
    },
    setLevelEM(state, action) {
      state.levelEmacs = action.payload;
    },
    setLevelStatus(state, action) {
      state.level = action.payload;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
  },
});

export const levelActions = levelSlice.actions;
export default levelSlice.reducer;
