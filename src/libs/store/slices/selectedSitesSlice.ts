import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedSitesState {
  sites: string[];
}

const initialState: SelectedSitesState = {
  sites: [],
};

const selectedSitesSlice = createSlice({
  name: 'selectedSites',
  initialState,
  reducers: {
    setSelectedSites: (state, action: PayloadAction<string[]>) => {
      state.sites = action.payload;
    },
  },
});

export const { setSelectedSites } = selectedSitesSlice.actions;

export default selectedSitesSlice.reducer;
