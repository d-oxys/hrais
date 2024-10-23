import Http from "@root/libs/http";
import { message } from "antd";
import { AxiosError } from "axios";
import { AppDispatch } from "..";
import { teamActions } from "../slices/team.slice";

export const getTeamList = (section_id?: string, page?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(teamActions.setError(null));
    dispatch(teamActions.setLoading(true));

    try {
      const resp = await new Http().get(
        `/api/v1/teams?section_id=${section_id}&page=${page}`
      );
      dispatch(teamActions.setTeam(resp.data.data));
      dispatch(teamActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(teamActions.setError(err.response?.data?.message));
        dispatch(teamActions.setLoading(false));
      }
    }
  };
};

export const getTeamById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(teamActions.setError(null));
    dispatch(teamActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/team/${id}`);
      dispatch(teamActions.setTeamDetail(resp.data.data));
      dispatch(teamActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(teamActions.setError(err.response?.data?.message));
        dispatch(teamActions.setLoading(false));
      }
    }
  };
};

export const createJobRole = (data: {
  name: string;
  slug: string;
  section_id: string;
  level_id: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(teamActions.setError(null));
    dispatch(teamActions.setLoading(true));

    try {
      await new Http().post(`/api/v1/settings/jobrole/create`, data);
      message.success("Create job role success!");
      dispatch(teamActions.setLoading(false));
    } catch (err: unknown) {
      dispatch(teamActions.setLoading(false));

      if (err instanceof AxiosError && err.response) {
        const backendMessage = err.response.data?.meta?.message;
        const displayMessage = backendMessage || "An unexpected error occurred";
        message.error(displayMessage);
        dispatch(teamActions.setError(displayMessage));
      } else {
        const generalError = "An unexpected error occurred";
        message.error(generalError);
        dispatch(teamActions.setError(generalError));
      }
    }
  };
};

export const updateTeam = (data: {
  name: string;
  id: string;
  section_id: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(teamActions.setError(null));
    dispatch(teamActions.setLoading(true));

    try {
      await new Http().put(`/api/v1/team/${data.id}`, { name: data.name });
      message.success("Update team success!");
      dispatch(teamActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(teamActions.setError(err.response?.data?.message));
        dispatch(teamActions.setLoading(false));
      }
    }
  };
};

export const deleteTeam = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(teamActions.setError(null));
    dispatch(teamActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/team/${id}`);
      message.success("Team has been deleted!");
      dispatch(teamActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(teamActions.setError(err.response?.data?.message));
        dispatch(teamActions.setLoading(false));
      }
    }
  };
};
