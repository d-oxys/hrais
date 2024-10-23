import Http from '@root/libs/http';
import { message } from 'antd';
import { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { departmentActions } from '../slices/department.slice';

export const getDepartmentList = (division_id?: string, page?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(departmentActions.setError(null));
    dispatch(departmentActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/departments?division_id=${division_id}`);
      dispatch(departmentActions.setDepartment(resp.data.data));
      dispatch(departmentActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(departmentActions.setError(err.response?.data?.message));
        dispatch(departmentActions.setLoading(false));
      }
    }
  };
};

export const getDepartmentById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(departmentActions.setError(null));
    dispatch(departmentActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/department/${id}`);
      dispatch(departmentActions.setDepartmentDetail(resp.data.data));
      dispatch(departmentActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(departmentActions.setError(err.response?.data?.message));
        dispatch(departmentActions.setLoading(false));
      }
    }
  };
};

export const createDepartment = (data: { name: string; division_id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(departmentActions.setError(null));
    dispatch(departmentActions.setLoading(true));

    try {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-');
      const payload = { ...data, slug };

      await new Http().post(`/api/v1/settings/department/create`, payload);
      message.success('Create department success!');
      dispatch(departmentActions.setLoading(false));
      return { success: true };
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || 'Failed to create department';
        dispatch(departmentActions.setError(errorMessage));
      }

      message.error(errorMessage);
      dispatch(departmentActions.setLoading(false));
      return { success: false, error: errorMessage };
    }
  };
};

export const updateDepartment = (data: { name: string; id: string; division_id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(departmentActions.setError(null));
    dispatch(departmentActions.setLoading(true));

    try {
      await new Http().put(`/api/v1/department/${data.id}`, {
        name: data.name,
        division_id: data.division_id,
      });
      message.success('Update business unit success!');
      dispatch(departmentActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(departmentActions.setError(err.response?.data?.message));
        dispatch(departmentActions.setLoading(false));
      }
    }
  };
};

export const deleteDepartment = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(departmentActions.setError(null));
    dispatch(departmentActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/department/delete/${id}`);
      message.success('Department has been deleted!');
      dispatch(departmentActions.setLoading(false));
      return { success: true };
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || 'Failed to delete department';
        dispatch(departmentActions.setError(errorMessage));
      }
      message.error(errorMessage);
      dispatch(departmentActions.setLoading(false));
      return { success: false, error: errorMessage };
    }
  };
};

export const setDepartmentStatus = (id: number, status: 'Aktif' | 'Tidak Aktif') => {
  return async (dispatch: AppDispatch) => {
    dispatch(departmentActions.setError(null));
    dispatch(departmentActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/settings/department/set/${id}`, {
        status,
      });

      if (resp.data.meta.status === 'success') {
        message.success(resp.data.meta.message);
        dispatch(departmentActions.setLoading(false));
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
      dispatch(departmentActions.setError(errorMessage));
      dispatch(departmentActions.setLoading(false));

      return { success: false, error: errorMessage };
    }
  };
};
