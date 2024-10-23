import Http from "@root/libs/http";
import { AxiosError } from "axios";
import { AppDispatch } from "..";
import { permissionActions } from "../slices/permission.slice";
import { message } from "antd";

export const getPermissionList = (search?: string, page?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(permissionActions.setError(null));
    dispatch(permissionActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/permissions`);
      dispatch(permissionActions.setPermission(resp.data.data.data));
      dispatch(permissionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(permissionActions.setError(err.response?.data?.message));
        dispatch(permissionActions.setLoading(false));
      }
    }
  };
};

export const getApprovalPermissionList = (params: {
  search?: string;
  page: number;
  limit: number;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(permissionActions.setError(null));
    dispatch(permissionActions.setLoading(true));

    try {
      const resp = await new Http().get(
        `/api/v1/approval/permission/list`,
        params
      );
      dispatch(permissionActions.setPermission(resp.data.data.data));
      dispatch(permissionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(permissionActions.setError(err.response?.data?.message));
        dispatch(permissionActions.setLoading(false));
      }
    }
  };
};

export const getPermissionAsList = (search?: string, page?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(permissionActions.setError(null));
    dispatch(permissionActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/permissions-as`);
      dispatch(permissionActions.setPermission(resp.data.data.data));
      dispatch(permissionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(permissionActions.setError(err.response?.data?.message));
        dispatch(permissionActions.setLoading(false));
      }
    }
  };
};

export const createPermission = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(permissionActions.setError(null));
    dispatch(permissionActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/permission`, data);
      dispatch(permissionActions.setLoading(false));
      message.success(resp.data?.message);
      return true;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(permissionActions.setError(err.response?.data?.message));
        dispatch(permissionActions.setLoading(false));
      }
      return false;
    }
  };
};

// approval permission
export const createApprovalPermission = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(permissionActions.setError(null));
    dispatch(permissionActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/approval/permission`, data);
      dispatch(permissionActions.setLoading(false));
      message.success(resp.data?.message);
      return true;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(permissionActions.setError(err.response?.data?.message));
        dispatch(permissionActions.setLoading(false));
      }
      return false;
    }
  };
};
