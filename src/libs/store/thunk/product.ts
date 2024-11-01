import axios, { AxiosError } from "axios";
import { AppDispatch } from "..";
import { productActions } from "../slices/product.slice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchProductsParams {
  awal?: string;
  akhir?: string;
  artikel?: string;
  kdtoko?: string;
}

export const fetchProducts = (params: FetchProductsParams = {}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(productActions.setError(null));
    dispatch(productActions.setLoading(true));

    try {
      const queryParams = new URLSearchParams();

      if (params.awal) queryParams.append("awal", params.awal);
      if (params.akhir) queryParams.append("akhir", params.akhir);
      if (params.artikel) queryParams.append("artikel", params.artikel);
      if (params.kdtoko) queryParams.append("kdtoko", params.kdtoko);

      const response = await axios.get(
        `${API_URL}/api/sales/product/site/group/all?${queryParams.toString()}`
      );
      dispatch(productActions.setProducts(response.data.items));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(productActions.setError(err.response?.data?.message));
      } else {
        dispatch(productActions.setError("An unexpected error occurred"));
      }
    } finally {
      dispatch(productActions.setLoading(false));
    }
  };
};

export const analyzeProductAttention = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(productActions.setAttentionError(null));
    dispatch(productActions.setAttentionLoading(true));

    try {
      const response = await axios.get(
        `${API_URL}/api/sales/product/site/group/all?limit=100000000`
      );
      const products = response.data.items;

      const attentionNeeded = products.filter((product: any) => {
        const salesRatios = product.stores.map((store: any) =>
          parseFloat(store.sales_percentage)
        );
        const maxRatio = Math.max(...salesRatios);
        const minRatio = Math.min(...salesRatios);

        return maxRatio - minRatio > 1.0;
      });

      dispatch(productActions.setAttentionProducts(attentionNeeded));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(productActions.setAttentionError(err.response?.data?.message));
      } else {
        dispatch(
          productActions.setAttentionError("An unexpected error occurred")
        );
      }
    } finally {
      dispatch(productActions.setAttentionLoading(false));
    }
  };
};
