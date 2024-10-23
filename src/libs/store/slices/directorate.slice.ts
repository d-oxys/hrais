import { createSlice } from '@reduxjs/toolkit';
import { CompanyState } from '@root/libs/types/company';

export interface DirectorateType {
  id?: string;
  name?: string;
  slug?: string;
  company_id?: string;
  company?: CompanyState;
}

export interface DirectorateState {
  directorates: DirectorateType[];
  directorate: DirectorateType;
  loading: boolean;
  error: unknown;
}

const initialState: DirectorateState = {
  directorates: [],
  directorate: {},
  loading: false,
  error: null,
};

const directorateSlice = createSlice({
  name: 'directorate',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setDirectorate(state, action) {
      state.directorates = action.payload;
    },
    setDirectorateDetail(state, action) {
      state.directorate = action.payload;
    },
  },
});

export const directorateActions = directorateSlice.actions;
export default directorateSlice.reducer;
