import Http from "@root/libs/http";
import { AppDispatch } from "..";
import { attendProblemActions } from "../slices/attend-problem.slice";
import { message } from "antd";

export const fetchAttendProblems = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(attendProblemActions.setLoading(true));
    try {
      const { data } = await new Http().get("/api/v1/attend-problems");
      dispatch(attendProblemActions.setAttendProblem(data.data.data));
    } catch (error) {
      dispatch(attendProblemActions.setError(error));
    } finally {
      dispatch(attendProblemActions.setLoading(false));
    }
  };
};

// fetch attend problem by id
export const fetchAttendProblemById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(attendProblemActions.setLoading(true));
    try {
      const { data } = await new Http().get(`/api/v1/attend-problem/${id}`);
      dispatch(attendProblemActions.setAttendProblemDetail(data.data));
    } catch (error) {
      dispatch(attendProblemActions.setError(error));
    } finally {
      dispatch(attendProblemActions.setLoading(false));
    }
  };
};

export const createAttendProblem = (payload: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(attendProblemActions.setLoading(true));
    try {
      await new Http().post("/api/v1/attend-problem", payload);
      dispatch(fetchAttendProblems());
    } catch (error) {
      dispatch(attendProblemActions.setError(error));
      return false;
    } finally {
      dispatch(attendProblemActions.setLoading(false));
    }
  };
};

export const updateAttendProblem = (payload: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(attendProblemActions.setLoading(true));
    try {
      await new Http().put(`/api/v1/attend-problem/${payload.id}`, payload);
      dispatch(fetchAttendProblems());
    } catch (error) {
      dispatch(attendProblemActions.setError(error));
      return false;
    } finally {
      dispatch(attendProblemActions.setLoading(false));
    }
  };
};

export const deleteAttendProblem = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(attendProblemActions.setLoading(true));
    try {
      await new Http().remove(`/api/v1/attend-problem/${id}`);
      dispatch(fetchAttendProblems());
    } catch (error) {
      dispatch(attendProblemActions.setError(error));
      return false;
    } finally {
      dispatch(attendProblemActions.setLoading(false));
    }
  };
};

export const fetchAttendProblemApproval = (params: {
  search?: string;
  page: number;
  limit: number;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(attendProblemActions.setLoading(true));
    try {
      const { data } = await new Http().get(
        "/api/v1/approval/attend-problem/list",
        params
      );
      dispatch(attendProblemActions.setAttendProblem(data.data.data));
    } catch (error) {
      dispatch(attendProblemActions.setError(error));
    } finally {
      dispatch(attendProblemActions.setLoading(false));
    }
  };
};

export const approveAttendProblem = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(attendProblemActions.setLoading(true));
    try {
      await new Http().post(`/api/v1/approval/attend-problem`, data);
      message.success("Attend Problem approved successfully");
    } catch (error) {
      dispatch(attendProblemActions.setError(error));
      return false;
    } finally {
      dispatch(attendProblemActions.setLoading(false));
    }
  };
};
