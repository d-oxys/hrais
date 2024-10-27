// src/libs/store/thunk/groupKategori.slice.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setSales, setLoading, setError } from '../slices/groupKategori.slice';

export const fetchSalesData = createAsyncThunk('groupKategori/fetchSalesData', async (params: { awal: string; akhir: string; limit: number; group: string; kategori: string }, { dispatch }) => {
  dispatch(setLoading(true));

  const awal = params.awal ?? '2023-01-01';
  const akhir = params.akhir ?? '2023-12-31';

  try {
    const response = await fetch(`https://emacs-api.duapuluhtiga.com/api/sales/all/product/${params.group}/${params.kategori}?awal=${awal}&akhir=${akhir}&limit=${params.limit}`);

    if (!response.ok) {
      throw new Error('Failed to fetch sales data');
    }

    const data = await response.json();
    dispatch(setSales(data));
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
});
