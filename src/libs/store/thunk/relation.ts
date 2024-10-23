import Http from '@root/libs/http';
import { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { relationActions } from '../slices/relation.slice';
import { message } from 'antd';

export const getRelationList = (limit: number = 10, page: number = 1, search?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(relationActions.setError(null));
    dispatch(relationActions.setLoading(true));

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });
      if (search) queryParams.append('name', search);

      const resp = await new Http().get(`/api/v1/settings/relation?${queryParams.toString()}`);
      const relations = resp.data.result.data;
      const pagination = resp.data.result.pagination;

      dispatch(relationActions.setRelation(relations));
      dispatch(
        relationActions.setPagination({
          total: pagination.total,
          perPage: pagination.per_page,
          currentPage: pagination.current_page,
          lastPage: pagination.last_page,
        })
      );
      dispatch(relationActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(relationActions.setError(err.response?.data?.message));
      } else {
        dispatch(relationActions.setError('An unknown error occurred'));
      }
      dispatch(relationActions.setLoading(false));
    }
  };
};

export const createRelation = (data: { atasan_id: string; karyawan_id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(relationActions.setError(null));
    dispatch(relationActions.setLoading(true));

    try {
      await new Http().post(`/api/v1/settings/relation/create`, data);
      message.success('Relation created successfully!');
      dispatch(relationActions.setLoading(false));
      return { success: true };
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(relationActions.setError(err.response?.data?.message));
      } else {
        dispatch(relationActions.setError('An unknown error occurred'));
      }
      dispatch(relationActions.setLoading(false));
      return { success: false, error: err };
    }
  };
};

export const getSuperiors = (limit: number = 10, page: number = 1, search?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(relationActions.setError(null));
    dispatch(relationActions.setLoading(true));

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });
      if (search) queryParams.append('name', search);

      const resp = await new Http().get(`/api/v1/settings/relation?${queryParams.toString()}`);
      const relations = resp.data.result.data;
      const superiors = relations.map((relation: any) => ({
        atasan_id: relation.atasan.id,
        name: relation.atasan.name,
        nip: relation.atasan.nip,
      }));

      dispatch(relationActions.setSuperiors(superiors));
      dispatch(relationActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(relationActions.setError(err.response?.data?.message || 'Failed to fetch superiors'));
      } else {
        dispatch(relationActions.setError('An unknown error occurred'));
      }
      dispatch(relationActions.setLoading(false));
    }
  };
};

export const deleteRelation = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(relationActions.setError(null));
    dispatch(relationActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/relation/delete/${id}`);
      message.success('Relation deleted successfully!');
      dispatch(getRelationList());
      dispatch(relationActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(relationActions.setError(err.response?.data?.message));
      } else {
        dispatch(relationActions.setError('An unknown error occurred'));
      }
      dispatch(relationActions.setLoading(false));
    }
  };
};

export const deleteRelationAll = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(relationActions.setError(null));
    dispatch(relationActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/relation/delete/atasan/${id}`);
      message.success('Relation deleted successfully!');
      dispatch(getRelationList());
      dispatch(relationActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(relationActions.setError(err.response?.data?.message));
      } else {
        dispatch(relationActions.setError('An unknown error occurred'));
      }
      dispatch(relationActions.setLoading(false));
    }
  };
};
