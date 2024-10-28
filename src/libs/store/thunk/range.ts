import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSales, setLoading, setError } from "../slices/price.slice";

interface FetchRangeSalesParams {
  awal?: string;
  akhir?: string;
  artikel?: string;
  kdtoko?: string[];
}

export const fetchRangeSalesData = createAsyncThunk(
  "range/fetchRangeSalesData",
  async (params: FetchRangeSalesParams, { dispatch }) => {
    dispatch(setLoading(true));

    const {
      awal = "2023-01-01",
      akhir = "2023-12-10",
      artikel = "",
      kdtoko = [],
    } = params;

    const kdtokoParam = kdtoko.length > 0 ? `&kdtoko=${kdtoko.join(",")}` : "";
    const url = `https://emacs-api.duapuluhtiga.com/api/sales/all/product/price?awal=${awal}&akhir=${akhir}&artikel=${artikel}${kdtokoParam}`;

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
