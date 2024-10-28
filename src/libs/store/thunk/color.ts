import { createAsyncThunk } from '@reduxjs/toolkit';
import { setSales, setLoading, setError, ColorData, setSalesDetail, setLoadingDetail } from '../slices/color.slice';

// Data dummy untuk ColorData
const dummyColorData: ColorData[] = [
  {
    warna: 'Merah',
    color: 'Red',
    qty: 100,
    brutto: 10000000,
    disc: 1000000,
    netto: 9000000,
    sales_percentage: 20,
    sales_percetange: 20,
  },
  {
    warna: 'Biru',
    color: 'Blue',
    qty: 150,
    brutto: 15000000,
    disc: 2000000,
    netto: 13000000,
    sales_percentage: 15,
    sales_percetange: 15,
  },
];

export const fetchColorSalesData = createAsyncThunk(
  'color/fetchColorSalesData',
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

    const { awal = '2023-01-01', akhir = '2023-12-10', artikel = '', kdtoko } = params;
    const kdtokoParam = kdtoko ? `&kdtoko=${kdtoko.join(',')}` : '';
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
      console.error('Error fetching color sales data:', error);
      // Gunakan data dummy ketika ada error
      dispatch(setSales(dummyColorData));
      dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchColorSalesDataDetail = createAsyncThunk(
  'color/fetchColorSalesDataDetail',
  async (
    params: {
      awal: string;
      akhir: string;
      kdtoko?: string[];
      color: string;
    },
    { dispatch }
  ) => {
    dispatch(setLoadingDetail(true));

    const { awal, akhir, kdtoko, color } = params;
    const kdtokoParam = kdtoko ? `&kdtoko=${kdtoko}` : '';
    const url = `https://emacs-api.duapuluhtiga.com/api/sales/all/product/color/${color}?awal=${awal}&akhir=${akhir}${kdtokoParam}`;
    console.log(url);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch color sales data detail: ${errorMessage}`);
      }

      const data = await response.json();
      dispatch(setSalesDetail(data));
    } catch (error) {
      console.error('Error fetching color sales data detail:', error);
      dispatch(setSalesDetail(dummyColorData));
      dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
    } finally {
      dispatch(setLoadingDetail(false));
    }
  }
);
