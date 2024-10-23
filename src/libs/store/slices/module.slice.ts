import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Module {
  id: number;
  name: string;
  url: string;
  icon: string;
  status: string; // Status harus sesuai dengan yang ada di API
  functions: FunctionType[];
}

export interface FunctionType {
  id: number;
  name: string;
  url: string;
  read: number;
  create: number;
  update: number;
  delete: number;
  status: string;
}

export interface ModuleState {
  modules: Module[];
  moduleDetail: Module | null;
  functions: FunctionType[];
  loading: boolean;
  error: unknown;
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
  };
}

const initialState: ModuleState = {
  modules: [],
  moduleDetail: null,
  functions: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
    from: 1,
    to: 1,
  },
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<unknown>) {
      state.error = action.payload;
    },
    setModules(state, action: PayloadAction<Module[]>) {
      state.modules = action.payload;
    },
    setFunctions(state, action: PayloadAction<any[]>) {
      state.functions = action.payload;
    },
    setModuleDetail(state, action: PayloadAction<Module>) {
      state.moduleDetail = action.payload;
    },
    setModuleStatus(
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) {
      const { id, status } = action.payload;
      const module = state.modules.find((module) => module.id === id);
      if (module) {
        module.status = status;
      }
    },
    setPagination(state, action: PayloadAction<ModuleState["pagination"]>) {
      state.pagination = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setModules,
  setFunctions,
  setModuleDetail,
  setPagination,
  setModuleStatus,
} = moduleSlice.actions;

export default moduleSlice.reducer;
