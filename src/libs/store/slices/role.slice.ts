import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FunctionType, ModuleType } from "@root/libs/types/role";

// Definisi RoleType
export interface RoleType {
  id: number;
  name: string;
  slug: string;
  status: string;
  level?: {
    level: string | null;
    grade: string | null;
    levelEm: string | null;
    type: string | null;
    category: string | null;
    health_balance: string | null;
    meal_allowance: string | null;
    transportation_fee: string | null;
  };
}

// Definisi state untuk role
export interface RoleState {
  modules: ModuleType[];
  functions: FunctionType[];
  scopes: { id?: string; name?: string }[];
  roles: RoleType[]; // Ubah tipe roles menjadi RoleType[]
  role: RoleType | null;
  userRoles: any;
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  modules: [],
  role: null,
  functions: [],
  scopes: [],
  roles: [], // Sesuaikan initialState untuk roles
  userRoles: [],
  loading: false,
  error: null,
};

// Slice untuk role
const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setModules(state, action: PayloadAction<ModuleType[]>) {
      state.modules = action.payload;
    },
    setFunctions(state, action: PayloadAction<FunctionType[]>) {
      state.functions = action.payload;
    },
    setScopes(state, action: PayloadAction<{ id?: string; name?: string }[]>) {
      state.scopes = action.payload;
    },
    setUserRoles(state, action: PayloadAction<any>) {
      state.userRoles = action.payload;
    },
    setRoles(state, action: PayloadAction<RoleType[]>) {
      // Ubah setRoles untuk RoleType[]
      state.roles = action.payload;
    },
  },
});

export const roleActions = roleSlice.actions;
export default roleSlice.reducer;
