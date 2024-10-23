import Http from "@root/libs/http";
import { AxiosError } from "axios";
import { AppDispatch } from "..";
import { healthLeaveReportActions } from "../slices/health-leave-report.slice";

export const getHealthLeaveReportList = (search?: string, page?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(healthLeaveReportActions.setError(null));
    dispatch(healthLeaveReportActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/master-leave`);
      dispatch(
        healthLeaveReportActions.setHealthLeaveReport(resp.data.data.data)
      );
      dispatch(healthLeaveReportActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          healthLeaveReportActions.setError(err.response?.data?.message)
        );
        dispatch(healthLeaveReportActions.setLoading(false));
      }
    }
  };
};

export const updateLeaveBalance = (id: string, data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(healthLeaveReportActions.setError(null));
    dispatch(healthLeaveReportActions.setLoading(true));

    try {
      await new Http().put(`/api/v1/update/leave-balance/${id}`, data);
      dispatch(healthLeaveReportActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          healthLeaveReportActions.setError(err.response?.data?.message)
        );
        dispatch(healthLeaveReportActions.setLoading(false));
      }
    }
  };
};

export const updateHealthBalance = (id: string, data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(healthLeaveReportActions.setError(null));
    dispatch(healthLeaveReportActions.setLoading(true));

    try {
      await new Http().put(`/api/v1/update/health-balance/${id}`, data);
      dispatch(healthLeaveReportActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          healthLeaveReportActions.setError(err.response?.data?.message)
        );
        dispatch(healthLeaveReportActions.setLoading(false));
      }
    }
  };
};

export const getLeaveHealthBalanceByUserId = (user_id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(healthLeaveReportActions.setError(null));
    dispatch(healthLeaveReportActions.setLoading(true));

    try {
      const res = await new Http().get(
        `/api/v1/leave-health-balance/user/${user_id}`
      );
      dispatch(
        healthLeaveReportActions.setHealthAndLeaveBalance(res.data.data)
      );
      dispatch(healthLeaveReportActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          healthLeaveReportActions.setError(err.response?.data?.message)
        );
        dispatch(healthLeaveReportActions.setLoading(false));
      }
    }
  };
};
