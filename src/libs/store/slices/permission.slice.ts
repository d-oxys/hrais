import { createSlice } from "@reduxjs/toolkit";
import { FunctionType, ModuleType } from "@root/libs/types/role";

export interface PermissionState {
  permissions: any;
  pagination: {
    totalPage: number;
    currentPage: number;
  };
  loading: boolean;
  error: unknown;
}

const initialState = {
  permissions: [],
  pagination: {
    totalPage: 1,
    currentPage: 1,
  },
  loading: false,
  error: null,
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setPermission(state, action) {
      state.permissions = action.payload;
      state.pagination.totalPage = action.payload.total;
      state.pagination.currentPage = action.payload.current_page;
    },
  },
});

export const permissionActions = permissionSlice.actions;
export default permissionSlice.reducer;
