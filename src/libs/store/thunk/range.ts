import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setSales,
  setLoading,
  setError,
  PriceData,
  setSalesDetail,
  setLoadingDetail,
} from "../slices/price.slice";
import { group } from "console";

interface FetchRangeSalesParams {
  awal?: string;
  akhir?: string;
  brand?: string;
  artikel?: string;
  kdtoko?: string[];
}

interface FetchRangeSalesParamsExpand {
  group?: string;
  kategori?: string;
  awal?: string;
  akhir?: string;
  artikel?: string;
  kdtoko?: string[];
}

interface FetchPriceSalesDetailParams {
  awal: string;
  akhir: string;
  kdtoko?: string[];
  index?: number;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchRangeSalesData = createAsyncThunk(
  "range/fetchRangeSalesData",
  async (params: FetchRangeSalesParams, { dispatch }) => {
    dispatch(setLoading(true));

    const {
      awal = "2023-01-01",
      akhir = "2023-12-10",
      artikel = "",
      brand = "",
      kdtoko = [],
    } = params;

    const kdtokoParam = kdtoko.length > 0 ? `&kdtoko=${kdtoko.join(",")}` : "";
    const url = `${apiUrl}/api/sales/all/product/price?awal=${awal}&akhir=${akhir}&artikel=${artikel}&brand=${brand}${kdtokoParam}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch price sales data: ${errorMessage}`);
      }

      const data = await response.json();
      dispatch(setSales(data));
    } catch (error) {
      console.error("Error fetching price sales data:", error);
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

export const fetchRangeSalesDataGroupAll = createAsyncThunk(
  "range/fetchRangeSalesDataGroupAll",
  async (params: FetchRangeSalesParamsExpand, { dispatch }) => {
    dispatch(setLoading(true));

    const {
      group = "",
      kategori = "",
      awal = "2023-01-01",
      akhir = "2023-12-10",
      artikel = "",
      kdtoko = [],
    } = params;

    const kdtokoParam = kdtoko.length > 0 ? `&kdtoko=${kdtoko.join(",")}` : "";
    const url = `${apiUrl}/api/sales/all/product/${group}/${kategori}/price?awal=${awal}&akhir=${akhir}&artikel=${artikel}${kdtokoParam}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch price sales data: ${errorMessage}`);
      }

      const data = await response.json();
      dispatch(setSales(data));
    } catch (error) {
      console.error("Error fetching price sales data:", error);
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

export const fetchPriceSalesDataDetail = createAsyncThunk(
  "price/fetchPriceSalesDataDetail",
  async (params: FetchPriceSalesDetailParams, { dispatch }) => {
    dispatch(setLoadingDetail(true));

    const { awal, akhir, kdtoko = [], index } = params;
    const kdtokoParam = kdtoko.length > 0 ? `&kdtoko=${kdtoko.join(",")}` : "";
    const indexParam = index !== undefined ? `&index=${index}` : "";
    const url = `${apiUrl}/api/sales/all/product/price/index?awal=${awal}&akhir=${akhir}${kdtokoParam}${indexParam}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Failed to fetch price sales data detail: ${errorMessage}`
        );
      }

      const data = await response.json();
      dispatch(setSalesDetail(data));
    } catch (error) {
      console.error("Error fetching price sales data detail:", error);
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
