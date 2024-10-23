import { createSlice } from '@reduxjs/toolkit';
import {
  BankState,
  CityState,
  DepartmentListState,
  DistrictState,
  DriverLicenseTypeState,
  LevelListState,
  MaritalStatusState,
  OfficePlaceListState,
  PositionListState,
  ProvinceState,
  ReligionState,
  SectionListState,
  SubdistrictState,
  DivisionListState,
  TeamsListState,
  VillageState,
} from '@root/libs/types/masterdata';

export interface MasterDataState {
  province: ProvinceState[];
  city: CityState[];
  district: DistrictState[];
  subdistrict: SubdistrictState[];
  village: VillageState[];
  bloodtype: { name: string }[];
  religion: ReligionState[];
  maritalstatus: MaritalStatusState[];
  bank: BankState[];
  driverlicensetype: DriverLicenseTypeState[];
  department: DepartmentListState[];
  position: PositionListState[];
  level: LevelListState[];
  section: SectionListState[];
  officeplace: OfficePlaceListState[];
  division: DivisionListState[];
  teams: TeamsListState[];
  loading: boolean;
  error: unknown;
}

const initialState: MasterDataState = {
  province: [],
  city: [],
  district: [],
  subdistrict: [],
  village: [],
  bloodtype: [],
  religion: [],
  maritalstatus: [],
  bank: [],
  driverlicensetype: [],
  department: [],
  position: [],
  level: [],
  section: [],
  officeplace: [],
  division: [],
  teams: [],
  loading: false,
  error: null,
};

const masterdataSlice = createSlice({
  name: 'masterdata',
  initialState,
  reducers: {
    setDataProvince(state, action) {
      state.province = action.payload;
    },
    setDataCity(state, action) {
      state.city = action.payload;
    },
    setDataDistrict(state, action) {
      state.district = action.payload;
    },
    setDataVillage(state, action) {
      state.village = action.payload;
    },
    setDataSubdistrict(state, action) {
      state.subdistrict = action.payload;
    },
    setBloodType(state, action) {
      state.bloodtype = action.payload;
    },
    setReligion(state, action) {
      state.religion = action.payload;
    },
    setMaritalStatus(state, action) {
      state.maritalstatus = action.payload;
    },
    setBank(state, action) {
      state.bank = action.payload;
    },
    setDriverLicenseType(state, action) {
      state.driverlicensetype = action.payload;
    },
    setDepartment(state, action) {
      state.department = action.payload;
    },
    setSection(state, action) {
      state.section = action.payload;
    },
    setLevel(state, action) {
      state.level = action.payload;
    },
    setOfficePlace(state, action) {
      state.officeplace = action.payload;
    },
    setPosition(state, action) {
      state.position = action.payload;
    },
    setDivision(state, action) {
      state.division = action.payload;
    },
    setTeams(state, action) {
      state.teams = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const masterdataActions = masterdataSlice.actions;
export default masterdataSlice.reducer;
