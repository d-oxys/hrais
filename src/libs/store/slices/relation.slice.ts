import { createSlice } from "@reduxjs/toolkit";

export interface RelationType {
  id: number;
  lead_id: number;
  employee_id: any;
  created_at: string;
  updated_at: string;
  atasan: Superior;
  karyawans: Employee[];
}

export interface Superior {
  id: number;
  name: string;
  nip: string;
  jobrole: {
    id: number;
    name: string;
  };
}

export interface Employee {
  karyawan: {
    id: number;
    name: string;
    nip: string;
    jobrole: {
      id: number;
      name: string;
    };
  };
}

export interface RelationState {
  relations: RelationType[];
  relation: RelationType;
  superiors: Superior[];
  loading: boolean;
  error: unknown;
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  };
}

const initialState: RelationState = {
  relations: [],
  relation: {} as RelationType,
  superiors: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
  },
};

const relationSlice = createSlice({
  name: "relation",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setRelation(state, action) {
      state.relations = action.payload;
    },
    setRelationDetail(state, action) {
      state.relation = action.payload;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
    setSuperiors(state, action) {
      state.superiors = action.payload;
    },
  },
});

export const relationActions = relationSlice.actions;
export default relationSlice.reducer;
