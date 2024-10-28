// src/libs/store/thunk/groupKategori.slice.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setSales,
  setSalesDetail,
  setLoading,
  setError,
  setLoadingDetail,
} from "../slices/groupKategori.slice";

export const fetchSalesData = createAsyncThunk(
  "groupKategori/fetchSalesData",
  async (
    params: {
      awal: string;
      akhir: string;
      limit: number;
      group: string;
      kategori: string;
      kdtoko?: string[];
    },
    { dispatch }
  ) => {
    dispatch(setLoading(true));

    const awal = params.awal ?? "2023-01-01";
    const akhir = params.akhir ?? "2023-12-31";

    try {
      const kdtokoParam = params.kdtoko
        ? `&kdtoko=${params.kdtoko.join(",")}`
        : "";
      const url = `https://emacs-api.duapuluhtiga.com/api/sales/all/product/${params.group}/${params.kategori}?awal=${awal}&akhir=${akhir}&limit=${params.limit}${kdtokoParam}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch sales data: ${errorMessage}`);
      }

      const data = await response.json();
      dispatch(setSales(data));
    } catch (error) {
      console.error("Error fetching sales data:", error);
      dispatch(
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchSalesDataDetail = createAsyncThunk(
  "groupKategori/fetchSalesData",
  async (
    params: {
      awal: string;
      akhir: string;
      limit: number;
      group: string;
      kategori: string;
      kdtoko?: string[];
    },
    { dispatch }
  ) => {
    dispatch(setLoadingDetail(true));

    const awal = params.awal ?? "2023-01-01";
    const akhir = params.akhir ?? "2023-12-31";

    try {
      const kdtokoParam = params.kdtoko
        ? `&kdtoko=${params.kdtoko.join(",")}`
        : "";
      const url = `https://emacs-api.duapuluhtiga.com/api/sales/all/product/${params.group}/${params.kategori}?awal=${awal}&akhir=${akhir}&limit=${params.limit}${kdtokoParam}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch sales data: ${errorMessage}`);
      }

      const data = await response.json();
      dispatch(setSalesDetail(data));
    } catch (error) {
      console.error("Error fetching sales data:", error);
      dispatch(
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        )
      );
    } finally {
      dispatch(setLoadingDetail(false));
    }
  }
);
