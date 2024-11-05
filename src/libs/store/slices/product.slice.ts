import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "..";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SkuDetail {
  description: string;
  artikel: string;
  generic: string;
  brand: string;
  group: string;
  kategori: string;
  sub_kategori: string;
  harga_jual: number;
  hpp: number;
  bobot: string;
  dimensi: string;
  size: string;
  warna: string;
  age: string;
  serial: string;
  gender: string;
}

interface BestTokoDetail {
  kdtoko: string;
  qty: number;
  brutto: number;
  disc: number;
  netto: number;
  sales_percentage: number;
}

interface BestArtikelDetail {
  kode_brg: string;
  qty: number;
  brutto: number;
  disc: number;
  netto: number;
  sales_percentage: number;
}

interface BestColorDetail {
  color: string;
  qty: number;
  brutto: number;
  disc: number;
  netto: number;
  sales_percentage: number;
}

interface BestPriceDetail {
  qty: number;
  brutto: number;
  disc: number;
  netto: number;
  sales_percentage: number;
}

interface DetailTransaction {
  kdtoko: string;
  kode_brg: string;
  brutto: number;
  disc: number;
  netto: number;
  qty: number;
  start_periode: string;
  end_periode: string;
  durasi: number;
}

export interface ProductDetail {
  sku: SkuDetail[];
  bestToko: BestTokoDetail[];
  bestArtikel: BestArtikelDetail[];
  bestColor: BestColorDetail[];
  bestPrice: BestPriceDetail[];
  detailTransaction: DetailTransaction[];
}

interface FetchProductsParams {
  awal?: string;
  akhir?: string;
  artikel?: string;
  kdtoko?: string;
}

interface ProductState {
  products: any[];
  productsDetail: ProductDetail | null;
  productsDetailHargaBySite: BestPriceDetail[] | null;
  loading: boolean;
  loadingDetail: boolean;
  error: unknown;
}

interface ProductAttentionState {
  attentionProducts: any[];
  attentionLoading: boolean;
  attentionError: unknown;
}

const initialState: ProductState & ProductAttentionState = {
  products: [],
  productsDetail: null,
  productsDetailHargaBySite: null,
  loading: false,
  loadingDetail: false,
  error: null,
  attentionProducts: [],
  attentionLoading: false,
  attentionError: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLoadingDetail(state, action: PayloadAction<boolean>) {
      state.loadingDetail = action.payload;
    },
    setError(state, action: PayloadAction<unknown>) {
      state.error = action.payload;
    },
    setProducts(state, action: PayloadAction<any[]>) {
      state.products = action.payload;
    },
    setProductsDetail(state, action: PayloadAction<ProductDetail | null>) {
      state.productsDetail = action.payload;
    },
    setDetailHargaBySite: (
      state,
      action: PayloadAction<BestPriceDetail[] | null>
    ) => {
      state.productsDetailHargaBySite = action.payload;
    },

    setAttentionLoading(state, action: PayloadAction<boolean>) {
      state.attentionLoading = action.payload;
    },
    setAttentionError(state, action: PayloadAction<unknown>) {
      state.attentionError = action.payload;
    },
    setAttentionProducts(state, action: PayloadAction<any[]>) {
      state.attentionProducts = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
