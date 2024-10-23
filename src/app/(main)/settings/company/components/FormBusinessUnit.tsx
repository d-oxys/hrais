import FormItem from '@root/app/components/FormItem';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { DirectorateType, directorateActions } from '@root/libs/store/slices/directorate.slice';
import { getCompany } from '@root/libs/store/thunk/company';
import { createBusinessUnit, getDirectorateById, updateDirectorate } from '@root/libs/store/thunk/directorate';
import { CompanyState } from '@root/libs/types/company';
import { Button, Col, Form, Input, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface FormBusinessUnitProps {
  id?: string;
  company_id: string;
  callback?: () => void;
}

const FormBusinessUnit = (props: FormBusinessUnitProps) => {
  const { id, company_id, callback } = props;
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();

  const { loading, directorate }: { loading: boolean; directorate: DirectorateType } = useAppSelector((state) => state.directorate);

  useEffect(() => {
    if (directorate) {
      form.setFieldValue('name', directorate.name);
    }
  }, [directorate, form]);

  const submitData = async (values: { name: string }) => {
    const slug = values.name.toLowerCase().replace(/\s+/g, '-');
    try {
      let result;
      if (id) {
        result = await dispatch(
          updateDirectorate({
            ...values,
            company_id: company_id,
            id: id,
          })
        );
      } else {
        result = await dispatch(
          createBusinessUnit({
            ...values,
            slug,
            company_id: company_id,
          })
        );
      }

      if (result && result.success) {
        form.resetFields();
        callback && callback();
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error occurred during submission:', error);
    }
  };

  return (
    <div className='p-2'>
      <Form form={form} layout='vertical' onFinish={submitData}>
        <FormItem required label='Business Unit Name' name='name' rules={[{ required: true, message: 'Please enter business unit name' }]}>
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
export default FormBusinessUnit;
