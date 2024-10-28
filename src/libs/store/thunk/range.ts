import { createAsyncThunk } from '@reduxjs/toolkit';
import { setSales, setLoading, setError, PriceData, setSalesDetail, setLoadingDetail } from '../slices/price.slice';

interface FetchRangeSalesParams {
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

const dummyPriceData: PriceData[] = [
  {
    range: '0 - 1000000',
    qty: 50,
    brutto: 50000000,
    disc: 5000000,
    netto: 45000000,
    sales_percentage: 10,
    sales_percetange: 10,
    salesData: [
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
        sales_percentage: 20,
        sales_percetange: 20,
      },
    ],
  },
  {
    range: '1000000 - 2000000',
    qty: 30,
    brutto: 45000000,
    disc: 3000000,
    netto: 42000000,
    sales_percentage: 8,
    sales_percetange: 8,
    salesData: [
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
        sales_percentage: 10,
        sales_percetange: 10,
      },
    ],
  },
  // Tambahkan lebih banyak data dummy sesuai kebutuhan
];

export const fetchRangeSalesData = createAsyncThunk('range/fetchRangeSalesData', async (params: FetchRangeSalesParams, { dispatch }) => {
  dispatch(setLoading(true));

  const { awal = '2023-01-01', akhir = '2023-12-10', artikel = '', kdtoko = [] } = params;

  const kdtokoParam = kdtoko.length > 0 ? `&kdtoko=${kdtoko.join(',')}` : '';
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
    console.error('Error fetching price sales data:', error);
    dispatch(setSales(dummyPriceData));
    dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
});

export const fetchPriceSalesDataDetail = createAsyncThunk('price/fetchPriceSalesDataDetail', async (params: FetchPriceSalesDetailParams, { dispatch }) => {
  dispatch(setLoadingDetail(true));

  const { awal, akhir, kdtoko = [], index } = params;
  const kdtokoParam = kdtoko.length > 0 ? `&kdtoko=${kdtoko.join(',')}` : '';
  const indexParam = index !== undefined ? `&index=${index}` : '';
  const url = `https://emacs-api.duapuluhtiga.com/api/sales/all/product/price/index?awal=${awal}&akhir=${akhir}${kdtokoParam}${indexParam}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch price sales data detail: ${errorMessage}`);
    }

    const data = await response.json();
    dispatch(setSalesDetail(data));
  } catch (error) {
    console.error('Error fetching price sales data detail:', error);
    dispatch(setSalesDetail(dummyPriceData));
    dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
  } finally {
    dispatch(setLoadingDetail(false));
  }
});
