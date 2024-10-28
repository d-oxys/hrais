// src/libs/store/thunk/groupKategori.slice.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setSales, setSalesDetail, setLoading, setError, setLoadingDetail } from '../slices/groupKategori.slice';

const dummySalesData = [
  {
    kategori: 'Elektronik',
    group: 'Smartphone',
    subkategori: 'Android',
    artikel: 'Artikel Dummy 1',
    description: 'Deskripsi produk 1',
    qty: 10,
    brutto: 5000000,
    disc: 500000,
    total: 4500000,
    netto: 4500000,
    dpp: 4000000,
    ppn: 500000,
    sales_percetange: 20,
    sales_percentage: 20,
  },
  {
    kategori: 'Pakaian',
    group: 'Atasan',
    subkategori: 'Kaos',
    artikel: 'Artikel Dummy 2',
    description: 'Deskripsi produk 2',
    qty: 20,
    brutto: 2000000,
    disc: 200000,
    total: 1800000,
    netto: 1800000,
    dpp: 1600000,
    ppn: 200000,
    sales_percetange: 10,
    sales_percentage: 10,
  },
];

export const fetchSalesData = createAsyncThunk(
  'groupKategori/fetchSalesData',
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

    const awal = params.awal ?? '2023-01-01';
    const akhir = params.akhir ?? '2023-12-31';

    try {
      const kdtokoParam = params.kdtoko ? `&kdtoko=${params.kdtoko.join(',')}` : '';
      const url = `https://emacs-api.duapuluhtiga.com/api/sales/all/product/${params.group}/${params.kategori}?awal=${awal}&akhir=${akhir}&limit=${params.limit}${kdtokoParam}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch sales data: ${errorMessage}`);
      }

      const data = await response.json();
      dispatch(setSales(data));
    } catch (error) {
      console.error('Error fetching sales data:', error);
      dispatch(setSales(dummySalesData));
      dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Modifikasi fetchSalesDataDetail thunk
export const fetchSalesDataDetail = createAsyncThunk(
  'groupKategori/fetchSalesDataDetail',
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

    const awal = params.awal ?? '2023-01-01';
    const akhir = params.akhir ?? '2023-12-31';

    try {
      const kdtokoParam = params.kdtoko ? `&kdtoko=${params.kdtoko.join(',')}` : '';
      const url = `https://emacs-api.duapuluhtiga.com/api/sales/all/product/${params.group}/${params.kategori}?awal=${awal}&akhir=${akhir}&limit=${params.limit}${kdtokoParam}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch sales data detail: ${errorMessage}`);
      }

      const data = await response.json();
      dispatch(setSalesDetail(data));
    } catch (error) {
      console.error('Error fetching sales data detail:', error);
      dispatch(setSalesDetail(dummySalesData));
      dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
    } finally {
      dispatch(setLoadingDetail(false));
    }
  }
);
