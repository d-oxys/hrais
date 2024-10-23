import Http from '@root/libs/http';
import { message } from 'antd';
import { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { LevelType, levelActions } from '../slices/level.slice';

export const getLevelList = (limit: number = 10, page: number = 1, search?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(levelActions.setError(null));
    dispatch(levelActions.setLoading(true));

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });
      if (search) queryParams.append('name', search);

      const resp = await new Http().get(`/api/v1/settings/level?${queryParams.toString()}`);
      const levels = resp.data.result.data;
      const pagination = resp.data.result.pagination;

      dispatch(levelActions.setLevel(levels));
      dispatch(
        levelActions.setPagination({
          total: pagination.total,
          perPage: pagination.per_page,
          currentPage: pagination.current_page,
          lastPage: pagination.last_page,
        })
      );
      dispatch(levelActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(levelActions.setError(err.response?.data?.message));
      } else {
        dispatch(levelActions.setError('An unknown error occurred'));
      }
      dispatch(levelActions.setLoading(false));
    }
  };
};

export const getLevelById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(levelActions.setError(null));
    dispatch(levelActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/settings/level?id=${id}`);
      const levelData = resp.data.result.data[0];
      dispatch(levelActions.setLevelDetail(levelData));
      dispatch(levelActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(levelActions.setError(err.response?.data?.message));
        dispatch(levelActions.setLoading(false));
      }
    }
  };
};

export const createLevel = (data: LevelType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(levelActions.setError(null));
    dispatch(levelActions.setLoading(true));
    console.log(data);

    try {
      await new Http().post(`/api/v1/settings/level/create`, data);
      message.success('Create level success!');
      dispatch(levelActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(levelActions.setError(err.response?.data?.message));
        dispatch(levelActions.setLoading(false));
      }
    }
  };
};

export const updateLevel = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(levelActions.setError(null));
    dispatch(levelActions.setLoading(true));

    const payload = data;
    // delete payload.id;
    try {
      await new Http().post(`/api/v1/settings/level/update/${data.id}`, payload);
      message.success('Update level success!');
      dispatch(levelActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(levelActions.setError(err.response?.data?.message));
        dispatch(levelActions.setLoading(false));
      }
    }
  };
};

export const deleteLevel = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(levelActions.setError(null));
    dispatch(levelActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/level/delete/${id}`);
      message.success('Level has been deleted!');
      dispatch(levelActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(levelActions.setError(err.response?.data?.message));
        dispatch(levelActions.setLoading(false));
      }
    }
  };
};

export const getLevelDropdown = (search?: string, page?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(levelActions.setError(null));
    dispatch(levelActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/settings/level/career`);
      dispatch(
        levelActions.setLevel(
          resp.data.result?.map((item: any) => ({
            id: item.id,
            level: `${item.level}`,
          }))
        )
      );
      dispatch(levelActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(levelActions.setError(err.response?.data?.message));
        dispatch(levelActions.setLoading(false));
      }
    }
  };
};

export const getLevelCategory = (levelId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(levelActions.setError(null));
    dispatch(levelActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/settings/level/category/${levelId}`);
      dispatch(levelActions.setLevelCategory(resp.data.result));
      dispatch(levelActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(levelActions.setError(err.response?.data?.message));
        dispatch(levelActions.setLoading(false));
      }
    }
  };
};

export const getLevelEmacs = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(levelActions.setError(null));
    dispatch(levelActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/settings/level/emacs`);
      const levelEmacs = resp.data.result;

      dispatch(levelActions.setLevelEM(levelEmacs));
      dispatch(levelActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(levelActions.setError(err.response?.data?.message));
      } else {
        dispatch(levelActions.setError('An unknown error occurred'));
      }
      dispatch(levelActions.setLoading(false));
    }
  };
};

export const setLevelStatus = (id: number, status: 'Aktif' | 'Tidak Aktif') => {
  return async (dispatch: AppDispatch) => {
    dispatch(levelActions.setError(null));
    dispatch(levelActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/settings/level/set/${id}`, {
        status,
      });

      if (resp.data.meta.status === 'success') {
        message.success(resp.data.meta.message);
        dispatch(levelActions.setLevelStatus({ id, status }));
        dispatch(levelActions.setLoading(false));
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
      dispatch(levelActions.setError(errorMessage));
      dispatch(levelActions.setLoading(false));

      return { success: false, error: errorMessage };
    }
  };
};
