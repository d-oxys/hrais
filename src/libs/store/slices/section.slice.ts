import { createSlice } from "@reduxjs/toolkit";
import { DepartmentType } from "./department.slice";

export interface SectionType {
  name?: string;
  id?: string;
  department_id?: string;
  department?: DepartmentType;
}

export interface SectionState {
  sections: SectionType[];
  section: SectionType;
  loading: boolean;
  error: unknown;
}

const initialState = {
  sections: [],
  section: {},
  loading: false,
  error: null,
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSection(state, action) {
      state.sections = action.payload;
    },
    setSectionDetail(state, action) {
      state.section = action.payload;
    },
  },
});

export const sectionActions = sectionSlice.actions;
export default sectionSlice.reducer;
