import { DistrictState } from "./masterdata";

// export interface CompanyState {
//   id?: string;
//   name?: string;
//   alamat?: string;
//   district_id?: number;
//   status?: number;
//   created_at?: string;
//   updated_at?: any;
//   district?: DistrictState;
// }

export interface CompanyState {
  id?: string;
  name?: string;
  status?: string;
  businessUnits?: BusinessUnitState[];
  created_at?: string;
  updated_at?: any;
}

export interface BusinessUnitState {
  businessUnit: {
    idBusinessUnit: string;
    nameBusinessUnit: string;
    slug: string;
    companyId: string;
  };
  divisions?: DivisionState[];
}

export interface DivisionState {
  division: {
    idDivision: string;
    nameDivision: string;
    slug: string;
  };
  departments?: DepartmentState[];
}

export interface DepartmentState {
  department: {
    idDepartment: string;
    nameDepartment: string;
    slug: string;
  };
  sections?: SectionState[];
}

export interface SectionState {
  section: {
    idSection: string;
    nameSection: string;
    slug: string;
  };
  jobroles?: JobroleState[];
}

export interface JobroleState {
  jobrole: {
    idJobrole: string;
    nameJobrole: string;
    slug: string;
  };
}

export interface CompanySavePayload {
  name: string;
  logo: string;
  address: string;
  province_id: string;
  city_id: string;
  district_id: string;
  subdistrict_id: string;
  rt: string;
  rw: string;
}
