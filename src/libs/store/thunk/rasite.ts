import Http from "@root/libs/http";
import { message } from "antd";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "..";
import { rasitegroupActions } from "../slices/rasite.slice";

export const getRasiteGroupList = (limit: number = 10, page: number = 1) => {
  return async (dispatch: AppDispatch) => {
    dispatch(rasitegroupActions.setError(null));
    dispatch(rasitegroupActions.setLoading(true));

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });

      const resp = await new Http().get(
        `/api/v1/employee/ra/site?${queryParams.toString()}`
      );
      const rasiteGroups = resp.data.result.data;
      const pagination = resp.data.result.pagination;

      console.log("response", resp.data);
      console.log("pagination", pagination);

      // Dispatch untuk menyimpan data dan pagination ke store
      dispatch(rasitegroupActions.setRasiteGroup(rasiteGroups));
      dispatch(
        rasitegroupActions.setPagination({
          total: pagination.total,
          perPage: pagination.per_page,
          currentPage: pagination.current_page,
          lastPage: pagination.last_page,
        })
      );
      dispatch(rasitegroupActions.setLoading(false));
    } catch (err: unknown) {
      dispatch(rasitegroupActions.setLoading(false));
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || "An error occurred";
        dispatch(rasitegroupActions.setError(errorMessage));
        message.error(errorMessage);
      } else {
        const genericErrorMessage = "An unknown error occurred";
        dispatch(rasitegroupActions.setError(genericErrorMessage));
        message.error(genericErrorMessage);
      }
    }
  };
};

export const getSiteData = (
  store?: string,
  code?: string,
  limit: number = 100,
  brand?: string,
  offset?: number
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(rasitegroupActions.setError(null));
    dispatch(rasitegroupActions.setLoading(true));

    try {
      // Buat query parameters berdasarkan input
      const queryParams = new URLSearchParams();
      if (store) queryParams.append("store", store);
      if (code) queryParams.append("code", code);
      queryParams.append("limit", limit.toString());
      if (brand) queryParams.append("brand", brand);
      if (offset !== undefined) queryParams.append("offset", offset.toString());

      // Menggunakan Axios untuk request API EMACS
      const resp = await axios.get(
        `https://emacs-api.duapuluhtiga.com/api/store/all?${queryParams.toString()}`
      );
      const siteData = resp.data;

      // Dispatch data ke state
      dispatch(rasitegroupActions.setSiteData(siteData));
      dispatch(rasitegroupActions.setLoading(false));
    } catch (err: unknown) {
      dispatch(rasitegroupActions.setLoading(false));
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || "An error occurred";
        dispatch(rasitegroupActions.setError(errorMessage));
        message.error(errorMessage);
      } else {
        const genericErrorMessage = "An unknown error occurred";
        dispatch(rasitegroupActions.setError(genericErrorMessage));
        message.error(genericErrorMessage);
      }
    }
  };
};

export const createRaSiteRelation = (user_id: string, site: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(rasitegroupActions.setError(null));
    dispatch(rasitegroupActions.setLoading(true));

    try {
      // Data yang akan dikirim ke API
      const data = {
        user_id: user_id,
        sites: site,
      };

      // Mengirim request POST ke API
      const resp = await new Http().post(
        `/api/v1/employee/ra/site/create`,
        data
      );

      // Menangani respons sukses
      if (resp.data) {
        message.success("RA Site relation created successfully!");
        dispatch(rasitegroupActions.setLoading(false));
      }
    } catch (err: unknown) {
      dispatch(rasitegroupActions.setLoading(false));
      if (err instanceof Error) {
        dispatch(rasitegroupActions.setError(err.message));
        message.error("Failed to create RA Site relation");
      }
    }
  };
};

export const deleteRaSite = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(rasitegroupActions.setError(null));
    dispatch(rasitegroupActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/employee/ra/site/delete/${id}`);
      message.success("RA has been deleted!");
      dispatch(rasitegroupActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(rasitegroupActions.setError(err.response?.data?.message));
        dispatch(rasitegroupActions.setLoading(false));
      }
    }
  };
};
