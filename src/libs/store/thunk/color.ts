import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSales, setLoading, setError } from "../slices/color.slice";
import {
  setLoadingDetail,
  setSalesDetail,
} from "../slices/groupKategori.slice";

export const fetchColorSalesData = createAsyncThunk(
  "color/fetchColorSalesData",
  async (
    params: {
      awal: string;
      akhir: string;
      artikel?: string;
      kdtoko?: string[];
    },
    { dispatch }
  ) => {
    dispatch(setLoading(true));

    const {
      awal = "2023-01-01",
      akhir = "2023-12-10",
      artikel = "",
      kdtoko,
    } = params;

    const kdtokoParam = kdtoko ? `&kdtoko=${kdtoko.join(",")}` : "";
    const url = `https://emacs-api.duapuluhtiga.com/api/sales/all/product/color?awal=${awal}&akhir=${akhir}&artikel=${artikel}${kdtokoParam}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch color sales data: ${errorMessage}`);
      }

      const data = await response.json();
      dispatch(setSales(data));
    } catch (error) {
      console.error("Error fetching color sales data:", error);
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

export const fetchColorSalesDataDetail = createAsyncThunk(
  "color/fetchColorSalesDataDetail",
  async (
    params: {
      awal: string;
      akhir: string;
      artikel?: string;
      kdtoko?: string[];
      color: string;
    },
    { dispatch }
  ) => {
    dispatch(setLoadingDetail(true));

    const {
      awal = "2023-01-01",
      akhir = "2023-12-10",
      artikel = "",
      kdtoko,
      color,
    } = params;

    const kdtokoParam = kdtoko ? `&kdtoko=${kdtoko.join(",")}` : "";
    const url = `https://emacs-api.duapuluhtiga.com/api/sales/all/product/color/${color}?awal=${awal}&akhir=${akhir}&artikel=${artikel}${kdtokoParam}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch color sales data: ${errorMessage}`);
      }

      const data = await response.json();
      dispatch(setSalesDetail(data));
    } catch (error) {
      console.error("Error fetching color sales data:", error);
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
