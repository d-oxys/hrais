import { createSlice } from "@reduxjs/toolkit";
import { DivisionType } from "./division.slice";

export interface DepartmentType {
  id?: string;
  name?: string;
  division_id?: string;
  division?: DivisionType;
}

export interface DepartmentState {
  departments: DepartmentType[];
  department: DepartmentType;
  loading: boolean;
  error: unknown;
}

const initialState = {
  departments: [],
  department: {},
  loading: false,
  error: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setDepartment(state, action) {
      state.departments = action.payload;
    },
    setDepartmentDetail(state, action) {
      state.department = action.payload;
    },
  },
});

export const departmentActions = departmentSlice.actions;
export default departmentSlice.reducer;
