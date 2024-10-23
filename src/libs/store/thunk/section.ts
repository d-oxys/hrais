import Http from '@root/libs/http';
import { message } from 'antd';
import { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { sectionActions } from '../slices/section.slice';

export const getSectionList = (search?: string, page?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sectionActions.setError(null));
    dispatch(sectionActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/sections`);
      dispatch(sectionActions.setSection(resp.data.data.data));
      dispatch(sectionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(sectionActions.setError(err.response?.data?.message));
        dispatch(sectionActions.setLoading(false));
      }
    }
  };
};

export const getSectionById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sectionActions.setError(null));
    dispatch(sectionActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/section/${id}`);
      dispatch(sectionActions.setSectionDetail(resp.data.data));
      dispatch(sectionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(sectionActions.setError(err.response?.data?.message));
        dispatch(sectionActions.setLoading(false));
      }
    }
  };
};

export const createSection = (data: { name: string; department_id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sectionActions.setError(null));
    dispatch(sectionActions.setLoading(true));

    try {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-');
      const payload = { ...data, slug };

      await new Http().post(`/api/v1/settings/section/create`, payload);
      message.success('Create section success!');
      dispatch(sectionActions.setLoading(false));
      return { success: true };
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || 'Failed to create section';
        dispatch(sectionActions.setError(errorMessage));
      }
      message.error(errorMessage);
      dispatch(sectionActions.setLoading(false));
      return { success: false, error: errorMessage };
    }
  };
};

export const updateSection = (data: { name: string; id: string; department_id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sectionActions.setError(null));
    dispatch(sectionActions.setLoading(true));

    try {
      await new Http().put(`/api/v1/section/${data.id}`, {
        name: data.name,
        department_id: data.department_id,
      });
      message.success('Update section success!');
      dispatch(sectionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(sectionActions.setError(err.response?.data?.message));
        dispatch(sectionActions.setLoading(false));
      }
    }
  };
};

export const deleteSection = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sectionActions.setError(null));
    dispatch(sectionActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/section/delete/${id}`);
      message.success('Section has been deleted!');
      dispatch(sectionActions.setLoading(false));
      return { success: true };
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || 'Failed to delete Section';
        dispatch(sectionActions.setError(errorMessage));
      }
      message.error(errorMessage);
      dispatch(sectionActions.setLoading(false));
      return { success: false, error: errorMessage };
    }
  };
};

export const setSectionStatus = (id: number, status: 'Aktif' | 'Tidak Aktif') => {
  return async (dispatch: AppDispatch) => {
    dispatch(sectionActions.setError(null));
    dispatch(sectionActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/settings/section/set/${id}`, {
        status,
      });

      if (resp.data.meta.status === 'success') {
        message.success(resp.data.meta.message);
        dispatch(sectionActions.setLoading(false));
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
      dispatch(sectionActions.setError(errorMessage));
      dispatch(sectionActions.setLoading(false));

      return { success: false, error: errorMessage };
    }
  };
};
