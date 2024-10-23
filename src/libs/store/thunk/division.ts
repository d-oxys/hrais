import Http from '@root/libs/http';
import { message } from 'antd';
import { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { divisionActions } from '../slices/division.slice';

export const getDivisionList = (businessUnitId?: string, page?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(divisionActions.setError(null));
    dispatch(divisionActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/division?businessUnitId=${businessUnitId}`);
      dispatch(divisionActions.setDivision(resp.data.data));
      dispatch(divisionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(divisionActions.setError(err.response?.data?.message));
        dispatch(divisionActions.setLoading(false));
      }
    }
  };
};

export const getDivisionById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(divisionActions.setError(null));
    dispatch(divisionActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/division/${id}`);
      dispatch(divisionActions.setDivisionDetail(resp.data.data));
      dispatch(divisionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(divisionActions.setError(err.response?.data?.message));
        dispatch(divisionActions.setLoading(false));
      }
    }
  };
};

export const createDivision = (data: { name: string; busines_id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(divisionActions.setError(null));
    dispatch(divisionActions.setLoading(true));

    try {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-');
      const payload = { ...data, slug };
      console.log(payload);

      await new Http().post(`/api/v1/settings/division/create`, payload);
      message.success('Create division success!');
      dispatch(divisionActions.setLoading(false));
      return { success: true };
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || 'Failed to create division';
        dispatch(divisionActions.setError(errorMessage));
      }

      message.error(errorMessage);
      dispatch(divisionActions.setLoading(false));
      return { success: false, error: errorMessage };
    }
  };
};

export const updateDivision = (data: { name: string; id: string; directorate_id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(divisionActions.setError(null));
    dispatch(divisionActions.setLoading(true));

    try {
      await new Http().put(`/api/v1/division/${data.id}`, {
        name: data.name,
        directorate_id: data.directorate_id,
      });
      message.success('Update division success!');
      dispatch(divisionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(divisionActions.setError(err.response?.data?.message));
        dispatch(divisionActions.setLoading(false));
      }
    }
  };
};

export const deleteDivision = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(divisionActions.setError(null));
    dispatch(divisionActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/division/delete/${id}`);
      message.success('Division has been deleted!');
      dispatch(divisionActions.setLoading(false));
      return { success: true };
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || 'Failed to delete division';
        dispatch(divisionActions.setError(errorMessage));
      }
      message.error(errorMessage);
      dispatch(divisionActions.setLoading(false));
      return { success: false, error: errorMessage };
    }
  };
};

export const setDivisionStatus = (id: number, status: 'Aktif' | 'Tidak Aktif') => {
  return async (dispatch: AppDispatch) => {
    dispatch(divisionActions.setError(null));
    dispatch(divisionActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/settings/division/set/${id}`, {
        status,
      });

      if (resp.data.meta.status === 'success') {
        message.success(resp.data.meta.message);
        dispatch(divisionActions.setLoading(false));
        return { success: true };
      } else {
        message.error(resp.data.meta.message);
        throw new Error(resp.data.meta.message);
      }
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.meta?.message || 'An error occurred';
      }

      message.error(errorMessage);
      dispatch(divisionActions.setError(errorMessage));
      dispatch(divisionActions.setLoading(false));

      return { success: false, error: errorMessage };
    }
  };
};
