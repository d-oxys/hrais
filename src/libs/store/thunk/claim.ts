import Http from "@root/libs/http";
import { AxiosError } from "axios";
import { AppDispatch } from "..";
import { claimActions } from "../slices/claim.slice";
import { message } from "antd";

export const getClaim = (params: {
  search?: string;
  page: number;
  limit: number;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(claimActions.setError(null));
    dispatch(claimActions.setLoading(true));

    try {
      let url = `/api/v1/claims`;

      const resp = await new Http().get(url, params);
      dispatch(claimActions.setClaims(resp.data.data.data));
      dispatch(claimActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(claimActions.setError(err.response?.data?.message));
        dispatch(claimActions.setLoading(false));
      }
    }
  };
};

// get claim by id
export const getClaimById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(claimActions.setError(null));
    dispatch(claimActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/claim/${id}`);
      dispatch(claimActions.setClaimDetail(resp.data.data));
      dispatch(claimActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(claimActions.setError(err.response?.data?.message));
        dispatch(claimActions.setLoading(false));
      }
    }
  };
};

export const getClaimAs = (
  search?: string,
  page?: number,
  pageSize?: number
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(claimActions.setError(null));
    dispatch(claimActions.setLoading(true));

    try {
      let url = `/api/v1/claim-as`;
      if (search || page || pageSize) {
        url += "?";
        if (search) {
          url += `search=${search}&`;
        }
        if (page) {
          url += `page=${page}&`;
        }
        if (pageSize) {
          url += `pageSize=${pageSize}&`;
        }
        url = url.slice(0, -1); // Remove the trailing "&"
      }

      const resp = await new Http().get(url);
      dispatch(claimActions.setClaims(resp.data.data.data));
      dispatch(claimActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(claimActions.setError(err.response?.data?.message));
        dispatch(claimActions.setLoading(false));
      }
    }
  };
};

export const createClaim = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(claimActions.setError(null));
    dispatch(claimActions.setLoading(true));

    try {
      const resp = await new Http().post("/api/v1/claim", data);
      dispatch(claimActions.setLoading(false));
      message.success("Claim created successfully");
      return resp.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(claimActions.setError(err.response?.data?.message));
        dispatch(claimActions.setLoading(false));
      }
    }
  };
};

export const updateClaim = (id: string, data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(claimActions.setError(null));
    dispatch(claimActions.setLoading(true));

    try {
      const resp = await new Http().put(`/api/v1/claim/${id}`, data);
      dispatch(claimActions.setLoading(false));
      message.success("Claim updated successfully");
      return resp.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(claimActions.setError(err.response?.data?.message));
        dispatch(claimActions.setLoading(false));
      }
    }
  };
};

export const getClaimApprovalList = (params: {
  search?: string;
  page: number;
  limit: number;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(claimActions.setError(null));
    dispatch(claimActions.setLoading(true));

    try {
      let url = `/api/v1/approval/claim/list`;

      const resp = await new Http().get(url, params);
      dispatch(claimActions.setClaims(resp.data.data.data));
      dispatch(claimActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(claimActions.setError(err.response?.data?.message));
        dispatch(claimActions.setLoading(false));
      }
    }
  };
};

export const approvalClaim = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(claimActions.setError(null));
    dispatch(claimActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/approval/claim`, data);
      dispatch(claimActions.setLoading(false));
      message.success("Approve claim successfully");
      return resp.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(claimActions.setError(err.response?.data?.message));
        dispatch(claimActions.setLoading(false));
      }
    }
  };
};
