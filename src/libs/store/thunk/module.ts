import Http from "@root/libs/http";
import { AxiosError } from "axios";
import { AppDispatch } from "..";
import {
  setModules,
  setFunctions,
  setLoading,
  setError,
  ModuleState,
  setPagination,
  setModuleDetail,
  setModuleStatus,
} from "../slices/module.slice";

import { message } from "antd";

export const getModuleById = (
  limit: number = 10,
  page: number = 1,
  search?: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });

      if (search) {
        queryParams.append("name=", search);
      }

      const resp = await new Http().get(
        `/api/v1/settings/roles/module?${queryParams.toString()}`
      );

      const modulesWithoutFunctions = resp.data.result.data.map((item: any) => {
        const { functions, ...moduleData } = item.module;
        return moduleData;
      });
      dispatch(setModuleDetail(modulesWithoutFunctions));

      return modulesWithoutFunctions;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          setError(err.response?.data?.message || "Failed to fetch modules")
        );
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getModuleListWithoutFunctions = (
  limit: number = 10,
  page: number = 1,
  search?: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });

      if (search) {
        queryParams.append("name", search);
      }

      const resp = await new Http().get(
        `/api/v1/settings/roles/module?${queryParams.toString()}`
      );

      const modulesWithoutFunctions = resp.data.result.data.map((item: any) => {
        const { functions, ...moduleData } = item.module;
        return moduleData;
      });

      console.log(modulesWithoutFunctions);

      dispatch(setModules(modulesWithoutFunctions));
      dispatch(setPagination(resp.data.result.pagination));

      return modulesWithoutFunctions;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          setError(err.response?.data?.message || "Failed to fetch modules")
        );
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getModuleListWithFunctions = (
  limit: number = 100,
  page: number = 1,
  search?: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });

      if (search) {
        queryParams.append("name", search);
      }

      const resp = await new Http().get(
        `/api/v1/settings/roles/module?${queryParams.toString()}`
      );

      const modulesWithFunctions = resp.data.result.data.map(
        (item: any) => item.module
      );

      console.log(modulesWithFunctions);

      dispatch(setModules(modulesWithFunctions));
      dispatch(setPagination(resp.data.result.pagination));

      return modulesWithFunctions;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          setError(err.response?.data?.message || "Failed to fetch modules")
        );
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getFunctionList = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const resp = await new Http().get(`/api/v1/settings/roles/function`);
      const functions = resp.data.result.data.map((item: any) => item.function);
      dispatch(setFunctions(functions));
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

export const createModule = (data: {
  name: string;
  url: string;
  icon: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const body = {
        name: data.name,
        url: data.url,
        icon: data.icon,
      };

      await new Http().post(`/api/v1/settings/roles/module/create`, body);
      message.success("Module created successfully!");
      dispatch(setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(setError(err.response?.data?.message));
        message.error("Failed to create module");
      }
      dispatch(setLoading(false));
    }
  };
};

export const updateModule = (
  id: number,
  data: { name: string; url: string; icon: string }
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const body = {
        name: data.name,
        url: data.url,
        icon: data.icon,
      };

      await new Http().post(`/api/v1/settings/roles/module/update/${id}`, body);
      message.success("Module updated successfully!");
      dispatch(setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(setError(err.response?.data?.message));
        message.error("Failed to update module");
      }
      dispatch(setLoading(false));
    }
  };
};

export const deleteModule = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/roles/module/delete/${id}`);
      message.success("Module has been deleted!");
      dispatch(setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(setError(err.response?.data?.message));
      }
      dispatch(setLoading(false));
    }
  };
};

export const setModuleStatusUpdadate = (
  id: number,
  status: "Aktif" | "Tidak Aktif"
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const resp = await new Http().post(
        `/api/v1/settings/roles/module/set/${id}`,
        {
          status,
        }
      );

      if (resp.data.meta.status === "success") {
        message.success(resp.data.meta.message);
        dispatch(setModuleStatus({ id, status }));
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
