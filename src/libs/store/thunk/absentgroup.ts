import Http from '@root/libs/http';
import { message } from 'antd';
import { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { AbsentGroupType, absentgroupActions } from '../slices/absentgroup.slice';

export const getAbsentGroupList = (limit: number = 10, page: number = 1, search?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(absentgroupActions.setError(null));
    dispatch(absentgroupActions.setLoading(true));

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });
      if (search) queryParams.append('name', search);

      const resp = await new Http().get(`/api/v1/settings/group/absen?${queryParams.toString()}`);
      const absentGroups = resp.data.result.data.map((item: any) => item.group);
      const pagination = resp.data.result.pagination;

      dispatch(absentgroupActions.setAbsentGroup(absentGroups));
      dispatch(
        absentgroupActions.setPagination({
          total: pagination.total,
          perPage: pagination.per_page,
          currentPage: pagination.current_page,
          lastPage: pagination.last_page,
        })
      );
      dispatch(absentgroupActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(absentgroupActions.setError(err.response?.data?.message));
      } else {
        dispatch(absentgroupActions.setError('An unknown error occurred'));
      }
      dispatch(absentgroupActions.setLoading(false));
    }
  };
};

export const getAbsentGroupById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(absentgroupActions.setError(null));
    dispatch(absentgroupActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/settings/group/absen?id=${id}`);
      const groupData = resp.data.result.data[0]; // Ambil data pertama dari array
      const absentGroupDetail = {
        id: groupData.group.id,
        name: groupData.group.name,
        description: groupData.group.description,
        daysOff: [
          groupData.details.sundayOff === 'Y' ? 'Sunday' : '',
          groupData.details.mondayOff === 'Y' ? 'Monday' : '',
          groupData.details.thuesdayOff === 'Y' ? 'Tuesday' : '',
          groupData.details.wednesdayOff === 'Y' ? 'Wednesday' : '',
          groupData.details.thursdayOff === 'Y' ? 'Thursday' : '',
          groupData.details.fridayOff === 'Y' ? 'Friday' : '',
          groupData.details.saturdayOff === 'Y' ? 'Saturday' : '',
        ].filter(Boolean), // Filter untuk menghapus nilai kosong
      };

      dispatch(absentgroupActions.setAbsentGroupDetail(absentGroupDetail));
      dispatch(absentgroupActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(absentgroupActions.setError(err.response?.data?.message));
        dispatch(absentgroupActions.setLoading(false));
      }
    }
  };
};

export const createAbsentGroup = (data: AbsentGroupType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(absentgroupActions.setError(null));
    dispatch(absentgroupActions.setLoading(true));

    try {
      const slug = data.name?.toLowerCase().replace(/\s+/g, '-');
      const body = {
        name: data.name,
        slug: slug,
        description: data.description,
        sunOff: data.daysOff?.includes('Sunday') ? 'Y' : '',
        monOff: data.daysOff?.includes('Monday') ? 'Y' : '',
        tueOff: data.daysOff?.includes('Tuesday') ? 'Y' : '',
        wedOff: data.daysOff?.includes('Wednesday') ? 'Y' : '',
        thuOff: data.daysOff?.includes('Thursday') ? 'Y' : '',
        friOff: data.daysOff?.includes('Friday') ? 'Y' : '',
        satOff: data.daysOff?.includes('Saturday') ? 'Y' : '',
      };

      await new Http().post(`/api/v1/settings/group/absen/create`, body);
      message.success('Create absent group success!');
      dispatch(absentgroupActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(absentgroupActions.setError(err.response?.data?.message));
        message.error(' Failed To Create absent group');
        dispatch(absentgroupActions.setLoading(false));
      }
    }
  };
};

export const updateAbsentGroup = (data: AbsentGroupType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(absentgroupActions.setError(null));
    dispatch(absentgroupActions.setLoading(true));

    try {
      const slug = data.name?.toLowerCase().replace(/\s+/g, '-');
      const body = {
        name: data.name,
        slug: slug,
        description: data.description,
        sunOff: data.daysOff?.includes('Sunday') ? 'Y' : '',
        monOff: data.daysOff?.includes('Monday') ? 'Y' : '',
        tueOff: data.daysOff?.includes('Tuesday') ? 'Y' : '',
        wedOff: data.daysOff?.includes('Wednesday') ? 'Y' : '',
        thuOff: data.daysOff?.includes('Thursday') ? 'Y' : '',
        friOff: data.daysOff?.includes('Friday') ? 'Y' : '',
        satOff: data.daysOff?.includes('Saturday') ? 'Y' : '',
      };

      await new Http().post(`/api/v1/settings/group/absen/update/${data.id}`, body);
      message.success('Update absent group success!');
      dispatch(absentgroupActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(absentgroupActions.setError(err.response?.data?.message));
        message.error('Failed to update absent group');
        dispatch(absentgroupActions.setLoading(false));
      }
    }
  };
};

export const deleteAbsentGroup = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(absentgroupActions.setError(null));
    dispatch(absentgroupActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/group/absen/delete/${id}`);
      message.success('Absent Group has been deleted!');
      dispatch(absentgroupActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(absentgroupActions.setError(err.response?.data?.message));
        dispatch(absentgroupActions.setLoading(false));
      }
    }
  };
};

export const setGroupStatus = (id: number, status: 'Aktif' | 'Tidak Aktif') => {
  return async (dispatch: AppDispatch) => {
    dispatch(absentgroupActions.setError(null));
    dispatch(absentgroupActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/settings/group/absen/set/${id}`, {
        status,
      });

      if (resp.data.meta.status === 'success') {
        message.success(resp.data.meta.message);
        dispatch(absentgroupActions.setGroupStatus({ id, status }));
        dispatch(absentgroupActions.setLoading(false));
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
      dispatch(absentgroupActions.setError(errorMessage));
      dispatch(absentgroupActions.setLoading(false));

      return { success: false, error: errorMessage };
    }
  };
};
