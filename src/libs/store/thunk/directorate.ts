import Http from '@root/libs/http';
import { message } from 'antd';
import { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { directorateActions } from '../slices/directorate.slice';

export const getDirectorateList = (companyId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(directorateActions.setError(null));
    dispatch(directorateActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/settings/directorates?company_id=${companyId}`);
      dispatch(directorateActions.setDirectorate(resp.data.data));
      dispatch(directorateActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(directorateActions.setError(err.response?.data?.message));
        dispatch(directorateActions.setLoading(false));
      }
    }
  };
};

export const getDirectorateById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(directorateActions.setError(null));
    dispatch(directorateActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/settings/directorate/${id}`);
      dispatch(directorateActions.setDirectorateDetail(resp.data.data));
      dispatch(directorateActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(directorateActions.setError(err.response?.data?.message));
        dispatch(directorateActions.setLoading(false));
      }
    }
  };
};

export const createBusinessUnit = (data: { name: string; slug: string; company_id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(directorateActions.setError(null));
    dispatch(directorateActions.setLoading(true));

    console.log(data);

    try {
      const resp = await new Http().post(`/api/v1/settings/bussines/create`, data);

      if (resp.data.meta.status === 'success') {
        message.success('Create business unit success!');
        dispatch(directorateActions.setLoading(false));
        return { success: true };
      } else {
        message.error(resp.data.meta.message || 'Failed to create business unit.');
        throw new Error(resp.data.meta.message);
      }
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || 'An error occurred';
      }

      message.error(errorMessage);
      dispatch(directorateActions.setError(errorMessage));
      dispatch(directorateActions.setLoading(false));

      return { success: false, error: errorMessage };
    }
  };
};

export const updateDirectorate = (data: { name: string; id: string; company_id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(directorateActions.setError(null));
    dispatch(directorateActions.setLoading(true));

    try {
      await new Http().put(`/api/v1/settings/directorate/${data.id}`, {
        name: data.name,
        company_id: data.company_id,
      });
      message.success('Update business unit success!');
      dispatch(directorateActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(directorateActions.setError(err.response?.data?.message));
        dispatch(directorateActions.setLoading(false));
      }
    }
  };
};

export const deleteDirectorate = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(directorateActions.setError(null));
    dispatch(directorateActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/bussines/delete/${id}`);
      message.success('Business Unit has been deleted!');
      dispatch(directorateActions.setLoading(false));
      return { success: true };
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || 'Failed to delete';
        dispatch(directorateActions.setError(errorMessage));
      }
      dispatch(directorateActions.setLoading(false));
      message.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };
};

export const setBusinessUnitStatus = (id: number, status: 'Aktif' | 'Tidak Aktif') => {
  return async (dispatch: AppDispatch) => {
    dispatch(directorateActions.setError(null));
    dispatch(directorateActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/settings/bussines/set/${id}`, {
        status,
      });

      if (resp.data.meta.status === 'success') {
        message.success(resp.data.meta.message);
        dispatch(directorateActions.setLoading(false));
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
      dispatch(directorateActions.setError(errorMessage));
      dispatch(directorateActions.setLoading(false));

      return { success: false, error: errorMessage };
    }
  };
};
