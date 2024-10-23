export interface ModuleType {
  id?: string;
  name?: string;
  url?: string;
  functions?: FunctionType[];
}

export interface FunctionType {
  id?: string;
  id_module?: string;
  name?: string;
  url?: string;
  role?: Role;
}

export interface Role {
  id?: number;
  user_id?: number;
  function_id?: number;
  scope_id?: number;
  create?: number;
  read?: number;
  update?: number;
  delete?: number;
  created_at?: string;
  updated_at?: string;
  scope?: Scope;
}

export interface Scope {
  id?: number;
  name?: string;
}

export interface UpdateRolePayload {
  user_id: string;
  function_id: string;
  scope_id: string;
  create: string;
  read: string;
  update: string;
  delete: string;
}
