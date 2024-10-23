import { createSlice } from '@reduxjs/toolkit';

// Menyesuaikan tipe untuk mencocokkan respons API
export interface UserType {
  id: number;
  name: string;
  nip: string;
}

export interface SiteType {
  site: string;
  name: string;
  category: string;
  ip: string;
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
  sitedata: SiteType[]; // Tambahkan state untuk menyimpan data Site
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
  sitedata: [], // State awal untuk menyimpan data Site
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
  name: 'rasitegroup',
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

// Ekspor action dan reducer
export const rasitegroupActions = rasitegroupSlice.actions;
export default rasitegroupSlice.reducer;
