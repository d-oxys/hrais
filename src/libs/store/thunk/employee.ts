import { Http } from '@root/libs/http';
import { AppDispatch } from '..';
import { employeeActions } from '../slices/employee.slice';
import { AxiosError } from 'axios';
import { message } from 'antd';

interface APIEmployee {
  id: number;
  nip: string;
  name: string;
  email: string | null;
  img_profile: string | null;
  phone_number: string | null;
  jobrole_id: number | null;
  jobrole: string | null;
  section: string | null;
  department: string | null;
  jabatan: string | null;
  status: string;
  division: string;
}

interface TransformedEmployee {
  key: number;
  user: {
    name: string;
    email: string | null;
    phone: string | null;
    nip: string;
    status: string;
  };
  position: {
    name: string | null;
    team: {
      section: {
        name: string | null;
        department: {
          name: string | null;
          division: {
            name: string;
          };
        };
      };
    };
  };
}

export const getEmployees = (limit: number = 10, page: number = 1, name?: string, nip?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(employeeActions.setError(null));
    dispatch(employeeActions.setLoading(true));

    try {
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });
      if (name) queryParams.append('name', name);
      if (nip) queryParams.append('nip', nip);

      const resp = await new Http().get(`/api/v1/employee?${queryParams.toString()}`);
      const employees = resp.data.result.data;
      const pagination = resp.data.result.pagination;
      const transformedEmployees: TransformedEmployee[] = employees.map((emp: APIEmployee) => ({
        key: emp.id,
        user: {
          name: emp.name,
          email: emp.email,
          phone: emp.phone_number,
          nip: emp.nip,
          status: emp.status,
        },
        position: {
          name: emp.jobrole,
          team: {
            section: {
              name: emp.section,
              department: {
                name: emp.department,
                division: {
                  name: emp.division,
                },
              },
            },
          },
        },
      }));

      dispatch(employeeActions.setEmployees({ data: transformedEmployees }));
      dispatch(
        employeeActions.setPagination({
          total: pagination.total,
          perPage: pagination.per_page,
          currentPage: pagination.current_page,
          lastPage: pagination.last_page,
        })
      );
      dispatch(employeeActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(employeeActions.setError(err.response?.data?.message));
      } else {
        dispatch(employeeActions.setError('An unknown error occurred'));
      }
      dispatch(employeeActions.setLoading(false));
    }
  };
};

export const setEmployeeStatus = (id: number, status: 'Aktif' | 'Tidak Aktif') => {
  return async (dispatch: AppDispatch) => {
    dispatch(employeeActions.setError(null));
    dispatch(employeeActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/employee/set/${id}`, {
        status,
      });

      if (resp.data.meta.status === 'success') {
        message.success(resp.data.meta.message);
        dispatch(employeeActions.setEmployeeStatus({ id, status }));
        dispatch(employeeActions.setLoading(false));
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
      dispatch(employeeActions.setError(errorMessage));
      dispatch(employeeActions.setLoading(false));

      return { success: false, error: errorMessage };
    }
  };
};

export const getEmployeeDropdown = (search?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(employeeActions.setError(null));
    dispatch(employeeActions.setLoading(true));

    try {
      const queryParams = new URLSearchParams({
        limit: '10', // Sesuaikan limit jika diperlukan
        page: '1', // Anda bisa menambahkan pagination jika diinginkan
      });

      if (search) {
        queryParams.append('name', search); // Gunakan pencarian berdasarkan name (atau bisa nip jika dibutuhkan)
      }

      const resp = await new Http().get(`/api/v1/employee?${queryParams.toString()}`);
      const employees = resp.data.result.data;

      const transformedEmployees = employees.map((emp: APIEmployee) => ({
        user_id: emp.id, // Pastikan user_id ada di data employee
        user: {
          nip: emp.nip,
          name: emp.name,
        },
      }));

      dispatch(employeeActions.setEmployees({ data: transformedEmployees }));
      dispatch(employeeActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(employeeActions.setError(err.response?.data?.message));
      } else {
        dispatch(employeeActions.setError('An unknown error occurred'));
      }
      dispatch(employeeActions.setLoading(false));
    }
  };
};

export const getEmployeeByNIP = (nip: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(employeeActions.setError(null));
    try {
      const resp = await new Http().get(`/api/v1/employee${nip}`);
      dispatch(employeeActions.setData(resp.data.result.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(employeeActions.setError(err.response?.data?.message));
      }
    }
  };
};

export const createEmployee = (values: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(employeeActions.setError(null));
    dispatch(employeeActions.setLoading(true));

    try {
      const resp = await new Http().post(`/api/v1/employeecreate`, values);
      dispatch(employeeActions.setLoading(false));
      message.success('Create new employee success!');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(employeeActions.setError(err.response?.data?.message));
        dispatch(employeeActions.setLoading(false));
      }
    }
  };
};

export const updateEmployeeData = (values: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(employeeActions.setError(null));

    try {
      const resp = await new Http().put(`/api/v1/employee${values.nip}`, values);
      // dispatch(employeeActions.setData(resp.data.data));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(employeeActions.setError(err.response?.data?.message));
      }
    }
  };
};

export const searchEmployeeRole = (param: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(employeeActions.setError(null));

    try {
      const resp = await new Http().get(`/api/v1/role/seach/employee?search=${param}`);
      console.log('kesini');
      dispatch(employeeActions.setData(resp.data.data));
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof AxiosError) {
        dispatch(employeeActions.setError(err.response?.data?.message));
      }
    }
  };
};

export const getSubordinate = (search?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(employeeActions.setError(null));
    if (!search) dispatch(employeeActions.setLoading(true));

    try {
      const queryParams = search ? `?search=${search}` : '';
      const resp = await new Http().get(`/api/v1/subordinte${queryParams}`);
      dispatch(employeeActions.setEmployees(resp.data));
      dispatch(employeeActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(employeeActions.setError(err.response?.data?.message));
        dispatch(employeeActions.setLoading(false));
      }
    }
  };
};
