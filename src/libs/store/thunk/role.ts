import Http from "@root/libs/http";
import { AppDispatch } from "..";
import { roleActions } from "../slices/role.slice";
import { AxiosError } from "axios";

export const getJobRoles = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(roleActions.setError(null));
    dispatch(roleActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/settings/jobrole`);
      dispatch(
        roleActions.setRoles(
          resp.data.result.data.map((item: any) => item.jobrole)
        )
      );
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(roleActions.setError(err.response?.data?.message));
      } else {
        dispatch(roleActions.setError("Unknown error occurred"));
      }
      dispatch(roleActions.setLoading(false));
    } finally {
      dispatch(roleActions.setLoading(false));
    }
  };
};

export const getModules = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(roleActions.setError(null));
    dispatch(roleActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/modules`);
      dispatch(roleActions.setModules(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(roleActions.setError(err.response?.data?.message));
        dispatch(roleActions.setLoading(false));
      }
    }
  };
};

export const getFunction = (module_id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(roleActions.setError(null));
    dispatch(roleActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/functions/${module_id}`);
      dispatch(roleActions.setFunctions(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(roleActions.setError(err.response?.data?.message));
        dispatch(roleActions.setLoading(false));
      }
    }
  };
};

export const getScopes = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(roleActions.setError(null));
    dispatch(roleActions.setLoading(true));

    try {
      const resp = await new Http().get(`/api/v1/master/scopes`);
      dispatch(roleActions.setScopes(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(roleActions.setError(err.response?.data?.message));
        dispatch(roleActions.setLoading(false));
      }
    }
  };
};

export const updateRole = (data: {
  user_id: string;
  function_id: string;
  scope_id: string;
  create: string;
  read: string;
  update: string;
  delete: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(roleActions.setError(null));
    dispatch(roleActions.setLoading(true));

    try {
      await new Http().post(`/api/v1/role`, data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(roleActions.setError(err.response?.data?.message));
        dispatch(roleActions.setLoading(false));
      }
    }
  };
};

// emacs api
export const getUserRole = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(roleActions.setError(null));
    dispatch(roleActions.setLoading(true));
    console.log("getUserRole telah di panggil");

    try {
      const resp = await new Http().get("/api/v1/jobrole?id=225");
      if (resp.status === 200) {
        console.log("Role:", resp.data.result.data.jobrole.id);
        dispatch(roleActions.setUserRoles(resp.data.result.data.jobrole.id));
      } else {
        console.log("Unexpected response status:", resp.status);
        dispatch(roleActions.setError("Unexpected response status"));
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error("Error during API call:", err);
        dispatch(
          roleActions.setError(
            err.response?.data?.message || "An error occurred"
          )
        );
      } else {
        console.error("Unknown error:", err);
        dispatch(roleActions.setError("An unknown error occurred"));
      }
    } finally {
      dispatch(roleActions.setLoading(false));
    }
  };

  // // putra api
  // export const getUserRole = () => {
  //   return async (dispatch: AppDispatch) => {
  //     dispatch(roleActions.setError(null));
  //     dispatch(roleActions.setLoading(true));

  //     try {
  //       const resp = await new Http().get(`/api/v1/user/role`);
  //       if (resp.status === 200) {
  //         console.log("Role:", resp.data);
  //         dispatch(roleActions.setUserRoles(resp.data.data));
  //       } else {
  //         console.log("Unexpected response status:", resp.status);
  //         dispatch(roleActions.setError("Unexpected response status"));
  //       }
  //     } catch (err: unknown) {
  //       if (err instanceof AxiosError) {
  //         console.error("Error during API call:", err);
  //         dispatch(
  //           roleActions.setError(
  //             err.response?.data?.message || "An error occurred"
  //           )
  //         );
  //       } else {
  //         console.error("Unknown error:", err);
  //         dispatch(roleActions.setError("An unknown error occurred"));
  //       }
  //     } finally {
  //       dispatch(roleActions.setLoading(false));
  //     }
  //   };
};
