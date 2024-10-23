import { createSlice } from '@reduxjs/toolkit';

export interface AbsentGroupType {
  name?: string;
  id?: string;
  description?: string;
  daysOff?: string[];
  [key: string]: any;
}

export interface AbsentGroupState {
  absentgroups: AbsentGroupType[];
  absentgroup: AbsentGroupType;
  loading: boolean;
  error: unknown;
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  };
}

const initialState: AbsentGroupState = {
  absentgroups: [],
  absentgroup: {
    description: '',
    daysOff: [],
  },
  loading: false,
  error: null,
  pagination: {
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
  },
};

const absentgroupSlice = createSlice({
  name: 'absentgroup',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setAbsentGroup(state, action) {
      state.absentgroups = action.payload;
    },
    setAbsentGroupDetail(state, action) {
      state.absentgroup = action.payload;
    },
    setGroupStatus(state, action) {
      state.absentgroup = action.payload;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
  },
});

export const absentgroupActions = absentgroupSlice.actions;
export default absentgroupSlice.reducer;
