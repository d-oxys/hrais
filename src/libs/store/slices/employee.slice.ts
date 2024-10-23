import { createSlice } from "@reduxjs/toolkit";
import { EmployeeDataFull } from "@root/libs/types/employee";

export interface EmployeeState {
  employees: any;
  employee: EmployeeDataFull;
  form?: {
    employeeData: any;
  };
  loading: boolean;
  error: unknown;
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  };
}

const initialState: EmployeeState = {
  employees: [],
  employee: {
    employee: {
      id: 0,
      nip: "",
      name: "",
      phoneNumber: "",
      emailKantor: "",
      emailPribadi: "",
    },
    personal_data: {
      ktp: "",
      npwp: "",
      noKK: 0,
      noBPJS: 0,
      noBPJSK: 0,
      gender: "",
      religion: "",
      nationality: "",
      blood_type: "",
      weight: 0,
      height: 0,
      address: {
        addressKTP: "",
        RtRwKTP: null,
        provinceKTP: {
          code: "",
          name: "",
        },
        cityKTP: {
          code: "",
          name: "",
        },
        districtKTP: {
          code: "",
          name: "",
        },
        subdistrictKTP: {
          code: "",
          name: "",
        },
        addressDomisili: "",
        RtRwDomisili: "",
        provinceDomisili: {
          code: "",
          name: "",
        },
        cityDomisili: {
          code: "",
          name: "",
        },
        districtDomisili: {
          code: "",
          name: "",
        },
        subdistrictDomisili: {
          code: "",
          name: "",
        },
      },
      birth: {
        place_of_birth_code: "",
        place_of_birth: "",
        date_of_birth: "",
      },
      statusKaryawan: "",
      status: "",
      date_contract: {
        in_date: "",
        start_date: "",
        end_date: "",
        fixed_date: "",
      },
      balance: {
        health: 0,
        leave_annual: 0,
        leave_expire: 0,
        leave_birthday: 0,
      },
      superior: {
        nip: "",
        name: "",
      },
      sim_card: {
        type_sim_1: "",
        number_sim_1: 0,
        type_sim_2: "",
        number_sim_2: 0,
      },
      education_history: {
        last_education: "",
        major: "",
        institution_name: "",
      },
    },
    contact_data: {
      emergency_number: "",
      emergency_name: "",
      emergency_relationship: "",
    },
    bank: {
      bank_name: "",
      bank_account_number: "",
    },
    family_data: {
      relationship_name: null,
      relationship_ktp: null,
      relationship_birth: {
        code: "",
        name: "",
      },
      relationship_date: null,
      number_of_children: null,
      father_name: "",
      father_birth: "",
      mother_name: "",
      mother_birth: "",
    },
    image: {
      imgPhoto: "",
      imgKtp: "",
      imgKK: "",
      imgNPWP: "",
      imgBPJS: "",
      imgBPJSK: "",
      imgIjazah: "",
      imgVerklaring: "",
      imgHealthCertificate: "",
    },
    jobrole: {
      id: 0,
      name: "",
    },
    jabatan: {
      levelApp: "",
      templevelA: "",
      templevelN: "",
      tempGolongan: "",
    },
    section: {
      id: 0,
      name: "",
    },
    department: {
      id: 0,
      name: "",
    },
    division: {
      id: 0,
      name: "",
    },
    directorate: {
      id: 0,
      name: "",
    },
    company: {
      id: 0,
      name: "",
    },
  },
  form: {
    employeeData: {},
  },
  loading: false,
  error: null,
  pagination: {
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 0,
  },
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload.data;
    },
    setData(state, action) {
      state.employee = action.payload;
    },
    setFormEmployeeData(state, action) {
      state.form = state.form || { employeeData: {} }; // Pastikan state.form terdefinisi
      state.form.employeeData = {
        ...state.form.employeeData,
        ...action.payload,
      };
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
    setEmployeeStatus(state, action) {
      const { id, status } = action.payload;
      const employee = state.employees.find((emp: any) => emp.key === id);
      if (employee) {
        employee.user.status = status;
      }
    },
  },
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice.reducer;
