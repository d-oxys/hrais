import Http from '@root/libs/http';
import { AppDispatch } from '..';
import { masterdataActions } from '../slices/masterdata.slice';
import { AxiosError } from 'axios';
import { BLOOD_TYPES, RELIGIONS } from '@root/libs/constants/staticdata';

export const getDepartment = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/departments`);
      dispatch(masterdataActions.setDepartment(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy departments if fetch fails
      const dummyDepartments = [
        { id: 1, name: 'Dummy Department 1' },
        { id: 2, name: 'Dummy Department 2' },
        { id: 3, name: 'Dummy Department 3' },
      ];
      dispatch(masterdataActions.setDepartment(dummyDepartments));
    }
  };
};

export const getDivisions = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/divisions`);
      dispatch(masterdataActions.setDivision(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy divisions if fetch fails
      const dummyDivisions = [
        { id: 1, name: 'Dummy Division 1' },
        { id: 2, name: 'Dummy Division 2' },
        { id: 3, name: 'Dummy Division 3' },
      ];
      dispatch(masterdataActions.setDivision(dummyDivisions));
    }
  };
};

export const getTeams = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/teams`);
      dispatch(masterdataActions.setTeams(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy teams if fetch fails
      const dummyTeams = [
        { id: 1, name: 'Dummy Team 1' },
        { id: 2, name: 'Dummy Team 2' },
        { id: 3, name: 'Dummy Team 3' },
      ];
      dispatch(masterdataActions.setTeams(dummyTeams));
    }
  };
};

export const getSection = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/sections`);
      dispatch(masterdataActions.setSection(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy sections if fetch fails
      const dummySections = [
        { id: 1, name: 'Dummy Section 1' },
        { id: 2, name: 'Dummy Section 2' },
        { id: 3, name: 'Dummy Section 3' },
      ];
      dispatch(masterdataActions.setSection(dummySections));
    }
  };
};

export const getLevel = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/levels`);
      dispatch(masterdataActions.setLevel(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy levels if fetch fails
      const dummyLevels = [
        { id: 1, name: 'Dummy Level 1' },
        { id: 2, name: 'Dummy Level 2' },
        { id: 3, name: 'Dummy Level 3' },
      ];
      dispatch(masterdataActions.setLevel(dummyLevels));
    }
  };
};

export const getPosition = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/positions`);
      dispatch(masterdataActions.setPosition(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy positions if fetch fails
      const dummyPositions = [
        { id: 1, name: 'Dummy Position 1' },
        { id: 2, name: 'Dummy Position 2' },
        { id: 3, name: 'Dummy Position 3' },
      ];
      dispatch(masterdataActions.setPosition(dummyPositions));
    }
  };
};

export const getOfficePlace = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/office-places`);
      dispatch(masterdataActions.setOfficePlace(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy office places if fetch fails
      const dummyOfficePlaces = [
        { id: 1, name: 'Dummy Office Place 1' },
        { id: 2, name: 'Dummy Office Place 2' },
        { id: 3, name: 'Dummy Office Place 3' },
      ];
      dispatch(masterdataActions.setOfficePlace(dummyOfficePlaces));
    }
  };
};

export const getProvince = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/indonesia/provinces`);
      dispatch(masterdataActions.setDataProvince(resp.data.result.provinces));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy provinces if fetch fails
      const dummyProvinces = [
        { id: 1, name: 'Dummy Province 1' },
        { id: 2, name: 'Dummy Province 2' },
        { id: 3, name: 'Dummy Province 3' },
      ];
      dispatch(masterdataActions.setDataProvince(dummyProvinces));
    }
  };
};

export const getCity = (province_code: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));
    console.log('get city telah di panggil');
    console.log('province_code', province_code);
    try {
      const resp = await new Http().get(`/api/v1/indonesia/cities?province_code=${province_code}`);
      dispatch(masterdataActions.setDataCity(resp.data.result.cities));
      console.log(resp.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy cities if fetch fails
      const dummyCities = [
        { id: 1, name: 'Dummy City 1' },
        { id: 2, name: 'Dummy City 2' },
        { id: 3, name: 'Dummy City 3' },
      ];
      dispatch(masterdataActions.setDataCity(dummyCities));
    }
  };
};

export const getDistrict = (city_code: String) => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));
    console.log('get district telah di panggil');
    console.log('city_code', city_code);
    try {
      const resp = await new Http().get(`/api/v1/indonesia/districts?city_code=${city_code}`);
      dispatch(masterdataActions.setDataDistrict(resp.data.result.districts));
      console.log(resp.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy districts if fetch fails
      const dummyDistricts = [
        { id: 1, name: 'Dummy District 1' },
        { id: 2, name: 'Dummy District 2' },
        { id: 3, name: 'Dummy District 3' },
      ];
      dispatch(masterdataActions.setDataDistrict(dummyDistricts));
    }
  };
};

export const getVillage = (district_code: String) => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));
    console.log('get village telah di panggil');
    console.log('district_code', district_code);
    try {
      const resp = await new Http().get(`/api/v1/indonesia/villages?district_code=${district_code}`);
      dispatch(masterdataActions.setDataVillage(resp.data.result.villages));
      console.log(resp.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy villages if fetch fails
      const dummyVillages = [
        { id: 1, name: 'Dummy Village 1' },
        { id: 2, name: 'Dummy Village 2' },
        { id: 3, name: 'Dummy Village 3' },
      ];
      dispatch(masterdataActions.setDataVillage(dummyVillages));
    }
  };
};

export const getBloodType = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));
    try {
      const bloodTypes = BLOOD_TYPES.map((type, index) => ({ id: index + 1, name: type }));
      dispatch(masterdataActions.setBloodType(bloodTypes));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(masterdataActions.setError(err.message));
      }
      const dummyBloodTypes = [
        { id: 1, name: 'Dummy Blood Type 1' },
        { id: 2, name: 'Dummy Blood Type 2' },
        { id: 3, name: 'Dummy Blood Type 3' },
      ];
      dispatch(masterdataActions.setBloodType(dummyBloodTypes));
    }
  };
};

export const getReligion = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));
    try {
      const religions = RELIGIONS.map((religion, index) => ({ id: index + 1, name: religion }));
      dispatch(masterdataActions.setReligion(religions));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(masterdataActions.setError(err.message));
      }
      const dummyReligions = [
        { id: 1, name: 'Dummy Religion 1' },
        { id: 2, name: 'Dummy Religion 2' },
        { id: 3, name: 'Dummy Religion 3' },
      ];
      dispatch(masterdataActions.setReligion(dummyReligions));
    }
  };
};

export const getMaritalStatus = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/marital-statuses`);
      dispatch(masterdataActions.setMaritalStatus(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy marital statuses if fetch fails
      const dummyMaritalStatuses = [
        { id: 1, name: 'Dummy Marital Status 1' },
        { id: 2, name: 'Dummy Marital Status 2' },
        { id: 3, name: 'Dummy Marital Status 3' },
      ];
      dispatch(masterdataActions.setMaritalStatus(dummyMaritalStatuses));
    }
  };
};

export const getBank = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/banks`);
      dispatch(masterdataActions.setBank(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy banks if fetch fails
      const dummyBanks = [
        { id: 1, name: 'Dummy Bank 1' },
        { id: 2, name: 'Dummy Bank 2' },
        { id: 3, name: 'Dummy Bank 3' },
      ];
      dispatch(masterdataActions.setBank(dummyBanks));
    }
  };
};

export const getDriverLicenseType = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(masterdataActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/driver-license-types`);
      dispatch(masterdataActions.setDriverLicenseType(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(masterdataActions.setError(err.response?.data?.message));
      }
      // Set dummy driver license types if fetch fails
      const dummyDriverLicenseTypes = [
        { id: 1, name: 'Dummy Driver License Type 1' },
        { id: 2, name: 'Dummy Driver License Type 2' },
        { id: 3, name: 'Dummy Driver License Type 3' },
      ];
      dispatch(masterdataActions.setDriverLicenseType(dummyDriverLicenseTypes));
    }
  };
};
