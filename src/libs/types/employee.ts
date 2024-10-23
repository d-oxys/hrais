import { User } from "./user";

export interface EmployeeData {
  id?: number;
  fullname?: string;
  name?: string;
  nip?: string;
  phone_number?: string;
  self_photo?: File;
  office_place_id?: number;
  department_id?: number;
  section_id?: number;
  position_id?: number;
  level_id?: number;
  created_at?: string;
  updated_at?: string;
  place_office?: PlaceOffice;
  department?: Department;
  section?: Section;
  position?: Position;
  level?: Level;
  superior?: Superior;
  address?: EmployeeAddressData;
  gender?: string;
  weight?: string;
  height?: string;
  blood_type?: string;
  personal_data?: EmployeePersonalData;
  role_assigned?: number;
  function?: string[];
  roles?: any;
  user?: User;
}

export interface Superior {
  id: number;
  nip: string;
  fullname: string;
}

export interface PlaceOffice {
  id: number;
  code: string;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: number;
  department_id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: number;
  department_id: number;
  section_id: number;
  level_id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Level {
  id: number;
  code: string;
  name: string;
  created_at: any;
  updated_at: any;
}

export interface EmployeeAddressData {
  id?: number;
  nip?: string;
  identity_number?: string;
  address?: string;
  province_id?: string;
  city_id?: string;
  district_id?: string;
  subdistrict_id?: string;
  rt?: string;
  rw?: string;
  is_according_ktp?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  province?: Province;
  city?: City;
  district?: District;
  subdistrict?: Subdistrict;
}

export interface Province {
  id?: number;
  name?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface City {
  id?: number;
  province_id?: string;
  name?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface District {
  id?: number;
  city_id?: string;
  name?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Subdistrict {
  id?: number;
  district_id?: string;
  name?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface EmployeePersonalData {
  id?: number;
  nip?: string;
  gender?: string;
  weight?: string;
  height?: string;
  bloodtype?: string;
  placeofbirth?: string;
  dateofbirth?: string;
  religion?: number;
  nationality?: string;
  biological_father_dob?: string;
  biological_mother_dob?: string;
  created_at?: any;
  updated_at?: any;
}

export interface EmployeeDataFull {
  employee: {
    id: number;
    nip: string;
    name: string;
    phoneNumber: string;
    emailKantor: string;
    emailPribadi: string;
  };
  personal_data: {
    ktp: string;
    npwp: string;
    noKK: number;
    noBPJS: number;
    noBPJSK: number;
    gender: string;
    religion: string;
    nationality: string;
    blood_type: string;
    weight: number;
    height: number;
    address: {
      addressKTP: string;
      RtRwKTP: string | null;
      provinceKTP: {
        code: string;
        name: string;
      };
      cityKTP: {
        code: string;
        name: string;
      };
      districtKTP: {
        code: string;
        name: string;
      };
      subdistrictKTP: {
        code: string;
        name: string;
      };
      addressDomisili: string;
      RtRwDomisili: string;
      provinceDomisili: {
        code: string;
        name: string;
      };
      cityDomisili: {
        code: string;
        name: string;
      };
      districtDomisili: {
        code: string;
        name: string;
      };
      subdistrictDomisili: {
        code: string;
        name: string;
      };
    };
    birth: {
      place_of_birth_code: string;
      place_of_birth: string;
      date_of_birth: string;
    };
    statusKaryawan: string;
    status: string;
    date_contract: {
      in_date: string;
      start_date: string;
      end_date: string;
      fixed_date: string;
    };
    balance: {
      health: number;
      leave_annual: number;
      leave_expire: number;
      leave_birthday: number;
    };
    superior: {
      nip: string;
      name: string;
    };
    sim_card: {
      type_sim_1: string;
      number_sim_1: number;
      type_sim_2: string;
      number_sim_2: number;
    };
    education_history: {
      last_education: string;
      major: string;
      institution_name: string;
    };
  };
  contact_data: {
    emergency_number: string;
    emergency_name: string;
    emergency_relationship: string;
  };
  bank: {
    bank_name: string;
    bank_account_number: string;
  };
  family_data: {
    relationship_name: string | null;
    relationship_ktp: string | null;
    relationship_birth: {
      code: string;
      name: string;
    };
    relationship_date: string | null;
    number_of_children: number | null;
    father_name: string;
    father_birth: string;
    mother_name: string;
    mother_birth: string;
  };
  image: {
    imgPhoto: string;
    imgKtp: string;
    imgKK: string;
    imgNPWP: string;
    imgBPJS: string;
    imgBPJSK: string;
    imgIjazah: string;
    imgVerklaring: string;
    imgHealthCertificate: string;
  };
  jobrole: {
    id: number;
    name: string;
  };
  jabatan: {
    levelApp: string;
    templevelA: string;
    templevelN: string;
    tempGolongan: string;
  };
  section: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
  division: {
    id: number;
    name: string;
  };
  directorate: {
    id: number;
    name: string;
  };
  company: {
    id: number;
    name: string;
  };
}
