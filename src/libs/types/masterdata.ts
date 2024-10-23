export interface ProvinceState {
  id?: number;
  code?: string;
  name?: string;
  meta?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CityState {
  id?: number;
  code?: string;
  province_code?: string;
  name?: string;
  meta?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DistrictState {
  id?: number;
  code?: string;
  city_code?: string;
  name?: string;
  meta?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SubdistrictState {
  id?: number;
  code?: string;
  district_code?: string;
  name?: string;
  meta?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VillageState {
  id?: number;
  code?: string;
  district_code?: string;
  name?: string;
  meta?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReligionState {
  id?: number;
  name?: string;
}

export interface MaritalStatusState {
  id?: number;
  name?: string;
}

export interface BankState {
  id?: number;
  kode?: string;
  name?: string;
}

export interface DriverLicenseTypeState {
  id?: number;
  name?: string;
}

export interface DepartmentListState {
  id?: number;
  code?: string;
  name?: string;
}

export interface PositionListState {
  id?: number;
  department_id?: number;
  level_id?: number;
  section_id?: number;
  code?: string;
  name?: string;
}

export interface LevelListState {
  id?: number;
  code?: string;
  name?: string;
}

export interface SectionListState {
  id?: number;
  department_id?: number;
  code?: string;
  name?: string;
}

export interface OfficePlaceListState {
  id?: number;
  code?: string;
  name?: string;
  address?: string;
}

export interface DivisionListState {
  id?: number;
  code?: string;
  name?: string;
}

export interface TeamsListState {
  id?: number;
  code?: string;
  name?: string;
}
