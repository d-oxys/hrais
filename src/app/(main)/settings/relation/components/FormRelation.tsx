import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { getEmployeeDropdown } from '@root/libs/store/thunk/employee';
import { getSuperiors, createRelation } from '@root/libs/store/thunk/relation';
import { Form, Select, Row, Col, Button } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import _ from 'lodash';

interface FormRelationProps {
  id?: string;
}

const FormRelation = (props: FormRelationProps) => {
  const { id } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const route = useRouter();

  const [employeeOptions, setEmployeeOptions] = useState<any>([]);
  const [superiorOptions, setSuperiorOptions] = useState<any>([]);

  const { employees, loading: employeeLoading }: { employees: any; loading: boolean } = useAppSelector((state) => state.employee);
  const { superiors, loading: superiorLoading }: { superiors: any; loading: boolean } = useAppSelector((state) => state.relation);
  const { loading: relationLoading }: { loading: boolean } = useAppSelector((state) => state.relation);

  useEffect(() => {
    dispatch(getEmployeeDropdown());
    dispatch(getSuperiors());
  }, [dispatch]);

  useEffect(() => {
    setEmployeeOptions(employees);
  }, [employees]);

  useEffect(() => {
    setSuperiorOptions(superiors);
  }, [superiors]);

  useEffect(() => {
    if (id) {
      form.setFieldsValue({ atasan_id: id });
    }
  }, [id, form]);

  const submitData = async (values: { lead_id: string; atasan_id?: string }) => {
    const { lead_id, atasan_id } = values;

    const dataToSend = {
      karyawan_id: lead_id,
      atasan_id: id || atasan_id || '',
    };
    const result = await dispatch(createRelation(dataToSend));
    if (result && result.success) {
      route.push('/settings/relation');
    } else {
      console.error('Failed to create relation:', result?.error);
    }
  };

  const debouncedSearchEmployee = _.debounce(async (e: string) => {
    await dispatch(getEmployeeDropdown(e));
  }, 300);

  const handleSearchEmployee = (e: string) => {
    debouncedSearchEmployee(e);
  };

  const handleClearEmployee = async () => {
    await dispatch(getEmployeeDropdown());
  };

  const debouncedSearchSuperior = _.debounce(async (e: string) => {
    await dispatch(getSuperiors(10, 1, e));
  }, 300);

  const handleSearchSuperior = (e: string) => {
    debouncedSearchSuperior(e);
  };

  const handleClearSuperior = async () => {
    await dispatch(getSuperiors());
  };

  return (
    <div className='p-2'>
      <Form form={form} layout='vertical' onFinish={submitData}>
        <FormItem required label='Employee' name='lead_id'>
          <Select showSearch onSearch={handleSearchEmployee} allowClear onClear={handleClearEmployee} filterOption={false} loading={employeeLoading}>
            {employeeOptions.map((item: any) => (
              <Select.Option key={item.user_id} value={item.user_id} disabled={employeeLoading || relationLoading}>
                {item.user.nip} - {item.user.name}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        {/* Dropdown untuk Superior, sembunyikan jika id ada */}
        {!id && (
          <FormItem required label='Superior' name='atasan_id'>
            <Select showSearch onSearch={handleSearchSuperior} allowClear onClear={handleClearSuperior} filterOption={false} loading={superiorLoading}>
              {superiorOptions.map((item: any) => (
                <Select.Option key={item.atasan_id} value={item.atasan_id} disabled={superiorLoading || relationLoading}>
                  {item.nip} - {item.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        )}

        <Row>
          <Col span='24' className='text-end'>
            <Button type='primary' htmlType='submit' loading={relationLoading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormRelation;
