import { AppDispatch } from "..";
import {
  setLoading,
  setError,
  setRoles,
  setPagination,
  setRoleDetail,
  setRoleStatus,
  setRoleUsers,
  setRoleDetailMenu,
} from "../slices/user-role.slice";
import { AxiosError } from "axios";
import Http from "@root/libs/http";
import { message } from "antd";

export interface CreateRolePayload {
  name: string;
  function_id: string[];
  respon: string[];
}

export const getRoleList = (
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

      if (search) {
        queryParams.append("name", search);
      }

      const resp = await new Http().get(
        `/api/v1/settings/roles/list?${queryParams.toString()}`
      );

      const roles = resp.data.result.data.map((item: any) => item.role);
      const roleUsers = resp.data.result.data.flatMap((item: any) =>
        item.role.role_users.map((user: any) => user.user)
      );
      const pagination = resp.data.result.pagination;

      dispatch(setRoles(roles));
      dispatch(setRoleUsers(roleUsers));
      dispatch(
        setPagination({
          total: pagination.total,
          per_page: pagination.per_page,
          current_page: pagination.current_page,
          last_page: pagination.last_page,
          from: pagination.from,
          to: pagination.to,
        })
      );
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.meta?.message || "Failed to fetch roles";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
      } else {
        const errorMessage = "An unknown error occurred";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchRoleDetail = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const response = await new Http().get(
        `/api/v1/settings/roles/list?id=${id}`
      );
      const roleDetail = response.data.result.data[0].role;
      dispatch(setRoleDetail(roleDetail));
      dispatch(setRoleDetailMenu(roleDetail));
      message.success("Role detail fetched successfully!");
    } catch (err: unknown) {
      dispatch(setLoading(false));

      if (err instanceof AxiosError && err.response) {
        const backendMessage =
          err.response.data?.meta?.message || "An unexpected error occurred";
        message.error(backendMessage);
        dispatch(setError(backendMessage));
      } else {
        const generalError = "An unexpected error occurred";
        message.error(generalError);
        dispatch(setError(generalError));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchRoleDetailMenu = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const response = await new Http().get(
        `/api/v1/settings/roles/list?id=${id}`
      );
      const roleDetail = response.data.result.data[0].role;
      dispatch(setRoleDetailMenu(roleDetail));
      message.success("Role detail fetched successfully!");
    } catch (err: unknown) {
      dispatch(setLoading(false));

      if (err instanceof AxiosError && err.response) {
        const backendMessage =
          err.response.data?.meta?.message || "An unexpected error occurred";
        message.error(backendMessage);
        dispatch(setError(backendMessage));
      } else {
        const generalError = "An unexpected error occurred";
        message.error(generalError);
        dispatch(setError(generalError));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const addUserToRole = (roleId: string, userIds: string[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const payload = {
        role_id: roleId,
        user_id: userIds,
      };

      const resp = await new Http().post(
        "/api/v1/settings/roles/create/user",
        payload
      );

      if (resp.data.meta.code === 200 && resp.data.meta.status === "success") {
        message.success("User added to role successfully");
        return { success: true };
      } else {
        const errorMessage =
          resp.data.meta.message || "Failed to add user to role";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.meta?.message || "Failed to add user to role";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
        return { success: false, error: errorMessage };
      } else {
        const errorMessage = "An unknown error occurred";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const createRole = (data: CreateRolePayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const body = {
        name: data.name,
        function_id: data.function_id,
        respon: data.respon,
      };

      await new Http().post(`/api/v1/settings/roles/create`, body);
      message.success("Role created successfully!");

      // Return success status
      return { success: true };
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          setError(err.response?.data?.message || "Failed to create role")
        );
        message.error(err.response?.data?.message || "Failed to create role");
      }
      // Return failure status
      return { success: false, error: err };
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateRole = (id: number, data: CreateRolePayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const body = {
        name: data.name,
        function_id: data.function_id,
        respon: data.respon,
      };

      await new Http().post(`/api/v1/settings/roles/update/${id}`, body);
      message.success("Role updated successfully!");

      // Return success status
      return { success: true };
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          setError(err.response?.data?.meta?.message || "Failed to update role")
        );
        message.error(
          err.response?.data?.meta?.message || "Failed to update role"
        );
      } else {
        const generalError = "An unexpected error occurred";
        dispatch(setError(generalError));
        message.error(generalError);
      }
      // Return failure status
      return { success: false, error: err };
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const setRolesStatus = (id: number, status: "Aktif" | "Tidak Aktif") => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/settings/roles/set/${id}`, {
        status,
      });

      if (resp.data.meta.status === "success") {
        message.success(resp.data.meta.message);
        dispatch(setRoleStatus({ id, status }));
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

export const deleteUserFromRole = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const resp = await new Http().remove(
        `/api/v1/settings/roles/delete/user/${id}`
      );

      if (resp.data.meta.code === 200 && resp.data.meta.status === "success") {
        message.success(resp.data.meta.message || "User has been deleted!");
        return { success: true };
      } else {
        const errorMessage = resp.data.meta.message || "Failed to delete user";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.meta?.message || "Failed to delete user";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
        return { success: false, error: errorMessage };
      } else {
        const errorMessage = "An unknown error occurred";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const deleteRole = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const resp = await new Http().remove(
        `/api/v1/settings/roles/delete/${id}`
      );
      if (resp.data.meta.code === 200 && resp.data.meta.status === "success") {
        message.success("Role has been deleted!");
        return { success: true };
      } else {
        const errorMessage = resp.data.meta.message || "Failed to delete role";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.meta?.message || "Failed to delete role";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
        return { success: false, error: errorMessage };
      } else {
        const errorMessage = "An unknown error occurred";
        dispatch(setError(errorMessage));
        message.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};
