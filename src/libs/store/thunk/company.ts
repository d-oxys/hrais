import axios from 'axios';
import { AppDispatch } from '..';
import { companyActions } from '../slices/company.slice';
import { AxiosError } from 'axios';
import { message } from 'antd';
import Http from '@root/libs/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSession } from 'next-auth/react';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/settings/company/create`;

export const getCompanies = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(companyActions.setError(null));
    dispatch(companyActions.setLoading(true));

    try {
      const response = await new Http().get('/api/v1/settings/company');
      dispatch(companyActions.setCompanies(response.data.result.data));
      dispatch(companyActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(companyActions.setError(err.response?.data?.message));
        dispatch(companyActions.setLoading(false));
      }
    }
  };
};

export const getCompany = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(companyActions.setError(null));
    dispatch(companyActions.setLoading(true));

    try {
      const response = await new Http().get('/api/v1/settings/company/get');
      dispatch(companyActions.setCompanies(response.data.result.data));
      dispatch(companyActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(companyActions.setError(err.response?.data?.message));
        dispatch(companyActions.setLoading(false));
      }
    }
  };
};

export const setCompanyStatus = (id: number, status: 'Aktif' | 'Tidak Aktif') => {
  return async (dispatch: AppDispatch) => {
    dispatch(companyActions.setError(null));
    dispatch(companyActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/settings/company/set/${id}`, {
        status,
      });

      if (resp.data.meta.status === 'success') {
        message.success(resp.data.meta.message);
        dispatch(companyActions.setCompanyStatus({ id, status }));
        dispatch(companyActions.setLoading(false));
        return { success: true };
      } else {
        message.error(resp.data.meta.message);
        throw new Error(resp.data.meta.message);
      }
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.meta?.message || 'An error occurred';
      }

      message.error(errorMessage);
      dispatch(companyActions.setError(errorMessage));
      dispatch(companyActions.setLoading(false));

      return { success: false, error: errorMessage };
    }
  };
};

export const deleteCompany = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(companyActions.setError(null));
    dispatch(companyActions.setLoading(true));

    try {
      await new Http().remove(`/api/v1/settings/company/delete/${id}`);
      message.success('Company has been deleted!');
      dispatch(companyActions.setLoading(false));
      return { success: true };
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.meta?.message || 'Failed to delete company';
        dispatch(companyActions.setError(errorMessage));
      } else {
        dispatch(companyActions.setError('An unexpected error occurred'));
      }
      dispatch(companyActions.setLoading(false));
      message.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };
};

export const createCompany = createAsyncThunk('company/createCompany', async (formData: FormData, { dispatch, rejectWithValue }) => {
  try {
    dispatch(companyActions.setLoading(true));

    console.log('Data to be sent to the backend:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    const session: any = await getSession();
    const token = session?.accessToken;

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(companyActions.setLoading(false));
    return response.data;
  } catch (error: unknown) {
    dispatch(companyActions.setLoading(false));

    let errorMessage = 'An unknown error occurred';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    dispatch(companyActions.setError(errorMessage));
    return rejectWithValue(errorMessage);
  }
});
