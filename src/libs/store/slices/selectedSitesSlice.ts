import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedSitesState {
  sites: string[];
  ham: boolean;
}

const initialState: SelectedSitesState = {
  sites: [],
  ham: false,
};

const selectedSitesSlice = createSlice({
  name: "selectedSites",
  initialState,
  reducers: {
    setSelectedSites: (state, action: PayloadAction<string[]>) => {
      state.sites = action.payload;
    },
    setSelectedHam: (state, action: PayloadAction<boolean>) => {
      state.ham = action.payload;
    },
  },
});

export const { setSelectedSites, setSelectedHam } = selectedSitesSlice.actions;

export default selectedSitesSlice.reducer;
