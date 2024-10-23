import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Module {
  id: number;
  name: string;
  url: string;
  icon: string;
  status: string;
}

export interface FunctionType {
  id: number;
  name: string;
  url: string;
  orderby: number;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  status: string;
  module: Module;
}

export interface FunctionState {
  functions: FunctionType[];
  functionDetail: FunctionType | null;
  modules: Module[];
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

// Inisialisasi state awal
const initialState: FunctionState = {
  functions: [],
  functionDetail: null,
  modules: [],
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

const functionSlice = createSlice({
  name: 'function',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<unknown>) {
      state.error = action.payload;
    },
    setFunctions(state, action: PayloadAction<FunctionType[]>) {
      state.functions = action.payload;
    },
    setModules(state, action: PayloadAction<Module[]>) {
      state.modules = action.payload;
    },
    setFunctionDetail(state, action: PayloadAction<FunctionType>) {
      state.functionDetail = action.payload;
    },
    setFunctionStatus(state, action: PayloadAction<{ id: number; status: string }>) {
      const { id, status } = action.payload;
      const functionItem = state.functions.find((func) => func.id === id);
      if (functionItem) {
        functionItem.status = status;
      }
    },
    setPagination(state, action: PayloadAction<FunctionState['pagination']>) {
      state.pagination = action.payload;
    },
  },
});

// Ekspor actions dan reducer
export const { setLoading, setError, setFunctions, setModules, setFunctionDetail, setPagination, setFunctionStatus } = functionSlice.actions;

export default functionSlice.reducer;
