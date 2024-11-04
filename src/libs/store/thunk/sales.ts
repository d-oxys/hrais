import Http from "@root/libs/http";
import { AxiosError } from "axios";
import { AppDispatch } from "..";
import { salesActions } from "../slices/sales.slice";
import { message } from "antd";

export const fetchSalesDataGroup = (
  awal: string,
  akhir: string,
  kdtoko: string,
  group: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(salesActions.setError(null));
    dispatch(salesActions.setLoading(true));

    try {
      const http = new Http();
      const [groupResp, colorResp, rangeResp] = await Promise.all([
        http.get(
          `/api/sales/all/product/group?awal=${awal}&akhir=${akhir}&kdtoko=${kdtoko}`
        ),
        http.get(
          `/api/sales/all/product/group/${group}/color?awal=${awal}&akhir=${akhir}&kdtoko=${kdtoko}`
        ),
        http.get(
          `/api/sales/all/product/group/${group}/price?awal=${awal}&akhir=${akhir}&kdtoko=${kdtoko}`
        ),
      ]);

      const groupData = groupResp.data.find(
        (item: any) => item.group === group
      );

      const bestColorData = colorResp.data[0];

      const bestRangeData = rangeResp.data[0];

      const consolidatedData = {
        price_range: bestRangeData?.group || null,
        best_color: bestColorData?.color || null,
        sales_percentage: groupData?.sales_percentage || null,
      };

      console.log(consolidatedData);

      dispatch(salesActions.setSalesDataGroup(consolidatedData));
      dispatch(salesActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          salesActions.setError(
            err.response?.data?.message || "Failed to fetch sales data"
          )
        );
        dispatch(salesActions.setLoading(false));
      }
    }
  };
};

export const fetchSalesDataKategori = (
  awal: string,
  akhir: string,
  kdtoko: string,
  kategori: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(salesActions.setError(null));
    dispatch(salesActions.setLoading(true));

    try {
      const http = new Http();
      const [groupResp, colorResp, rangeResp] = await Promise.all([
        http.get(
          `/api/sales/all/product/kategori?awal=${awal}&akhir=${akhir}&kdtoko=${kdtoko}`
        ),
        http.get(
          `/api/sales/all/product/kategori/${kategori}/color?awal=${awal}&akhir=${akhir}&kdtoko=${kdtoko}`
        ),
        http.get(
          `/api/sales/all/product/kategori/${kategori}/price?awal=${awal}&akhir=${akhir}&kdtoko=${kdtoko}`
        ),
      ]);

      const groupData = groupResp.data.find(
        (item: any) => item.kategori === kategori
      );

      const bestColorData = colorResp.data[0];

      const bestRangeData = rangeResp.data[0];

      const consolidatedData = {
        price_range: bestRangeData?.group || null,
        best_color: bestColorData?.color || null,
        sales_percentage: groupData?.sales_percentage || null,
      };

      console.log(consolidatedData);

      dispatch(salesActions.setSalesDataKategori(consolidatedData));
      dispatch(salesActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          salesActions.setError(
            err.response?.data?.message || "Failed to fetch sales data"
          )
        );
        dispatch(salesActions.setLoading(false));
      }
    }
  };
};

export const fetchSalesDataSubKategori = (
  awal: string,
  akhir: string,
  kdtoko: string,
  subkategori: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(salesActions.setError(null));
    dispatch(salesActions.setLoading(true));

    try {
      const http = new Http();
      const [groupResp, colorResp, rangeResp] = await Promise.all([
        http.get(
          `/api/sales/all/product/subkategori?awal=${awal}&akhir=${akhir}&kdtoko=${kdtoko}`
        ),
        http.get(
          `/api/sales/all/product/subkategori/${subkategori}/color?awal=${awal}&akhir=${akhir}&kdtoko=${kdtoko}`
        ),
        http.get(
          `/api/sales/all/product/subkategori/${subkategori}/price?awal=${awal}&akhir=${akhir}&kdtoko=${kdtoko}`
        ),
      ]);

      const groupData = groupResp.data.find(
        (item: any) => item.subkategori === subkategori
      );

      const bestColorData = colorResp.data[0];

      const bestRangeData = rangeResp.data[0];

      const consolidatedData = {
        price_range: bestRangeData?.group || null,
        best_color: bestColorData?.color || null,
        sales_percentage: groupData?.sales_percentage || null,
      };

      console.log(consolidatedData);

      dispatch(salesActions.setSalesDataSubKategori(consolidatedData));
      dispatch(salesActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(
          salesActions.setError(
            err.response?.data?.message || "Failed to fetch sales data"
          )
        );
        dispatch(salesActions.setLoading(false));
      }
    }
  };
};
