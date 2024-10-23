import FormItem from '@root/app/components/FormItem';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { DepartmentType, departmentActions } from '@root/libs/store/slices/department.slice';
import { createDepartment, getDepartmentById, updateDepartment } from '@root/libs/store/thunk/department';
import { Button, Col, Form, Input, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface FormDepartmentProps {
  id?: string;
  division_id: string;
  callback?: () => void;
}

const FormDepartment = (props: FormDepartmentProps) => {
  const { id, division_id, callback } = props;
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const { loading, department }: { loading: boolean; department: DepartmentType } = useAppSelector((state) => state.department);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getDepartmentById(id));
  //   } else {
  //     dispatch(departmentActions.setDepartmentDetail({}));
  //   }
  // }, [id, dispatch]);

  useEffect(() => {
    if (department) {
      form.setFieldsValue({ name: department.name });
    }
  }, [department, form]);

  const submitData = async (values: { name: string }) => {
    const slug = values.name.toLowerCase().replace(/\s+/g, '-');
    const payload = { ...values, slug, division_id };

    try {
      if (id) {
        // await dispatch(updateDepartment({ ...payload, id }));
      } else {
        await dispatch(createDepartment(payload));
      }
      form.resetFields();
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className='p-2'>
      <Form form={form} layout='vertical' onFinish={submitData}>
        <FormItem required label='Department Name' name='name' rules={[{ required: true, message: 'Please enter department name' }]}>
          <Input />
        </FormItem>
        <Row>
          <Col span='24' className='text-end'>
            <Button type='primary' htmlType='submit' loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormDepartment;
