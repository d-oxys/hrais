import { createSlice } from "@reduxjs/toolkit";

// Adjusted types to match the API response
export interface UserType {
  id: number;
  name: string;
  nip: string;
}

export interface SubChannelType {
  // New type for sub-channel
  kdShow: string;
  kdToko: string;
  nmToko: string;
}

export interface SiteType {
  kode: string; // Added kode property
  kdToko: string; // Added kode property
  nmToko: string; // Added kode property
  nama: string; // Added nama property
  category: string;
  ip: string;
  subChannel: SubChannelType[]; // Added subChannel property
}

export interface JobRoleType {
  id: number;
  name: string;
}

export interface RasiteDataType {
  user: UserType;
  site: SiteType;
  jobrole: JobRoleType;
  brand: string;
}

export interface RasiteGroupState {
  rasitegroups: RasiteDataType[];
  sitedata: SiteType[];
  loading: boolean;
  error: unknown;
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  };
}

const initialState: RasiteGroupState = {
  rasitegroups: [],
  sitedata: [], // Initial state to store Site data
  loading: false,
  error: null,
  pagination: {
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
  },
};

const rasitegroupSlice = createSlice({
  name: "rasitegroup",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setRasiteGroup(state, action) {
      state.rasitegroups = action.payload;
    },
    setSiteData(state, action) {
      state.sitedata = action.payload;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
    clearRasiteGroups(state) {
      state.rasitegroups = [];
    },
    clearSiteData(state) {
      state.sitedata = [];
    },
  },
});

// Export actions and reducer
export const rasitegroupActions = rasitegroupSlice.actions;
export default rasitegroupSlice.reducer;
