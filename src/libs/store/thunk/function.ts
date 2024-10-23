import { AppDispatch } from "..";
import {
  setLoading,
  setError,
  setFunctions,
  setPagination,
  setFunctionDetail,
  setFunctionStatus,
} from "../slices/function.slice";
import { AxiosError } from "axios";
import Http from "@root/libs/http";
import { message } from "antd";

export const getFunctionList = (
  limit: number = 10,
  page: number = 1,
  search?: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });

      if (search) queryParams.append("name", search);

      const resp = await new Http().get(
        `/api/v1/settings/roles/function?${queryParams.toString()}`
      );

      const functions = resp.data.result.data.map((item: any) => item.function);
      const pagination = resp.data.result.pagination;

      dispatch(setFunctions(functions));
      dispatch(
        setPagination({
          total: pagination.total,
          perPage: pagination.per_page,
          currentPage: pagination.current_page,
          lastPage: pagination.last_page,
          from: pagination.from,
          to: pagination.to,
        })
      );
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          setError(err.response?.data?.message || "Failed to fetch functions")
        );
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getFunctionById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const resp = await new Http().get(
        `/api/v1/settings/roles/function?id=${id}`
      );

      const functionData = resp.data.result.data[0].function;

      dispatch(setFunctionDetail(functionData));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          setError(
            err.response?.data?.message || "Failed to fetch function details"
          )
        );
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const createFunction = (data: {
  name: string;
  url: string;
  module_id: number;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const formattedData = {
      name: data.name,
      url: data.url,
      module_id: data.module_id,
      read: data.read ? "1" : "0",
      create: data.create ? "1" : "0",
      update: data.update ? "1" : "0",
      delete: data.delete ? "1" : "0",
    };

    try {
      await new Http().post(
        `/api/v1/settings/roles/function/create`,
        formattedData
      );
      message.success("Create function success!");
      dispatch(setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          setError(err.response?.data?.message || "Failed to create function")
        );
      } else {
        dispatch(setError("An unknown error occurred"));
      }
      dispatch(setLoading(false));
    }
  };
};

export const updateFunction = (
  id: number,
  data: {
    name: string;
    url: string;
    module_id: number;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const formattedData = {
      name: data.name,
      url: data.url,
      module_id: data.module_id,
      read: data.read ? "1" : "0",
      create: data.create ? "1" : "0",
      update: data.update ? "1" : "0",
      delete: data.delete ? "1" : "0",
    };

    try {
      await new Http().post(
        `/api/v1/settings/roles/function/update/${id}`,
        formattedData
      );
      message.success("Function updated successfully!");
      dispatch(setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          setError(err.response?.data?.message || "Failed to update function")
        );
      } else {
        dispatch(setError("An unknown error occurred"));
      }
      dispatch(setLoading(false));
    }
  };
};

export const setFunctionUpdateStatus = (
  id: number,
  status: "Aktif" | "Tidak Aktif"
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const resp = await new Http().post(
        `/api/v1/settings/roles/function/set/${id}`,
        {
          status,
        }
      );

      if (resp.data.meta.status === "success") {
        message.success(resp.data.meta.message);
        dispatch(setFunctionStatus({ id, status }));
        dispatch(setLoading(false));
        return { success: true };
      } else {
        message.error(resp.data.meta.message);
        throw new Error(resp.data.meta.message);
      }
    } catch (err: unknown) {
      let errorMessage = "An unknown error occurred";

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.meta?.message || "An error occurred";
      }

      message.error(errorMessage);
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));

      return { success: false, error: errorMessage };
    }
  };
};

export const deleteFunction = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/roles/function/delete/${id}`);
      message.success("Function has been deleted!");
      dispatch(setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(setError(err.response?.data?.message));
      }
      dispatch(setLoading(false));
    }
  };
};
