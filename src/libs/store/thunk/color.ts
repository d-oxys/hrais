import { createAsyncThunk } from '@reduxjs/toolkit';
import { setSales, setLoading, setError, ColorData, setSalesDetail, setLoadingDetail } from '../slices/color.slice';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

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
  },
  {
    warna: 'Biru',
    color: 'Blue',
    qty: 150,
    brutto: 15000000,
    disc: 2000000,
    netto: 13000000,
    sales_percentage: 15,
  },
];

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchColorSalesData = createAsyncThunk(
  'color/fetchColorSalesData',
  async (
    params: {
      awal: string;
      akhir: string;
      artikel?: string;
      brand?: string;
      kdtoko?: string[];
    },
    { dispatch }
  ) => {
    dispatch(setLoading(true));

    const { awal = '2023-01-01', akhir = '2023-12-10', artikel = '', brand = '', kdtoko } = params;
    const kdtokoParam = kdtoko ? `&kdtoko=${kdtoko.join(',')}` : '';
    const url = `${apiUrl}/api/sales/all/product/color?awal=${awal}&akhir=${akhir}&artikel=${artikel}&brand=${brand}${kdtokoParam}`;

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

export const fetchColorSalesGroupData = createAsyncThunk(
  'color/fetchColorSalesGroupData',
  async (
    params: {
      group: string;
      kategori: string;
      awal: string;
      akhir: string;
      limit?: string;
      artikel?: string;
      kdtoko?: string[];
    },
    { dispatch }
  ) => {
    dispatch(setLoading(true));

    const { awal = '2023-01-01', akhir = '2023-12-10', artikel = '', limit = '', kdtoko, group = '', kategori = '' } = params;
    const kdtokoParam = kdtoko ? `&kdtoko=${kdtoko.join(',')}` : '';
    const url = `${apiUrl}/api/sales/all/product/${group}/${kategori}/color?awal=${awal}&akhir=${akhir}&limit=${limit}&artikel=${artikel}${kdtokoParam}`;

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
      limit: string;
    },
    { dispatch }
  ) => {
    dispatch(setLoadingDetail(true));

    const { awal, akhir, kdtoko, color, limit } = params;
    const kdtokoParam = kdtoko ? `&kdtoko=${kdtoko}` : '';
    const url = `${apiUrl}/api/sales/all/product/color/${color}?awal=${awal}&akhir=${akhir}${kdtokoParam}&limit=${limit}`;
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
