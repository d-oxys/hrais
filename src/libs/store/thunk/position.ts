import Http from "@root/libs/http";
import { message } from "antd";
import { AxiosError } from "axios";
import { AppDispatch } from "..";
import { positionActions } from "../slices/position.slice";

export const getPositionList = (search?: string, page?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(positionActions.setError(null));
    dispatch(positionActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/positions`);
      dispatch(positionActions.setPosition(resp.data.data.data));
      dispatch(positionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(positionActions.setError(err.response?.data?.message));
        dispatch(positionActions.setLoading(false));
      }
    }
  };
};

export const getPositionById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(positionActions.setError(null));
    dispatch(positionActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/position/${id}`);
      dispatch(positionActions.setPositionDetail(resp.data.data));
      dispatch(positionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(positionActions.setError(err.response?.data?.message));
        dispatch(positionActions.setLoading(false));
      }
    }
  };
};

export const createPosition = (data: { name: string; team_id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(positionActions.setError(null));
    dispatch(positionActions.setLoading(true));

    try {
      await new Http().post(`/api/v1/position`, data);
      message.success("Create position success!");
      dispatch(positionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(positionActions.setError(err.response?.data?.message));
        dispatch(positionActions.setLoading(false));
      }
    }
  };
};

export const updatePosition = (data: {
  name: string;
  id: string;
  team_id: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(positionActions.setError(null));
    dispatch(positionActions.setLoading(true));

    try {
      await new Http().put(`/api/v1/position/${data.id}`, {
        name: data.name,
        team_id: data.team_id,
      });
      message.success("Update position success!");
      dispatch(positionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(positionActions.setError(err.response?.data?.message));
        dispatch(positionActions.setLoading(false));
      }
    }
  };
};

export const deletePosition = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(positionActions.setError(null));
    dispatch(positionActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/position/${id}`);
      message.success("Position has been deleted!");
      dispatch(positionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(positionActions.setError(err.response?.data?.message));
        dispatch(positionActions.setLoading(false));
      }
    }
  };
};

export const getPositionProfile = (search?: string, page?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(positionActions.setError(null));
    dispatch(positionActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/position/employee/dropdown`);

      const data = resp?.data?.data?.map((item: any) => ({
        id: item.id,
        position: `Comp : ${item?.team?.section?.department?.division?.directorate?.company?.name} | 
          Dir : ${item?.team?.section?.department?.division?.directorate?.name} | 
          Div : ${item?.team?.section?.department?.division?.name} |
          Dept : ${item?.team?.section?.department?.name} | 
          Sec : ${item?.team?.section?.name} | 
          Team : ${item?.team?.name}
        `,
      }));

      dispatch(positionActions.setPosition(data));
      dispatch(positionActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(positionActions.setError(err.response?.data?.message));
        dispatch(positionActions.setLoading(false));
      }
    }
  };
};
