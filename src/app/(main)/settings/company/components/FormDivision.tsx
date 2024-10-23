import FormItem from '@root/app/components/FormItem';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { DirectorateType } from '@root/libs/store/slices/directorate.slice';
import { DivisionType, divisionActions } from '@root/libs/store/slices/division.slice';
import { getDirectorateList } from '@root/libs/store/thunk/directorate';
import { createDivision, getDivisionById, updateDivision } from '@root/libs/store/thunk/division';
import { Button, Col, Form, Input, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface FormDivisionProps {
  id?: string;
  directorate_id: string;
  callback?: () => void;
}

const FormDivision = (props: FormDivisionProps) => {
  const { id, directorate_id, callback } = props;
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const { loading, division }: { loading: boolean; division: DivisionType } = useAppSelector((state) => state.division);
  const { directorates }: { directorates: DirectorateType[] } = useAppSelector((state) => state.directorate);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getDivisionById(id));
  //   } else {
  //     dispatch(divisionActions.setDivisionDetail({}));
  //   }
  // }, [id, dispatch]);

  // useEffect(() => {
  //   if (division) {
  //     form.setFieldsValue({ name: division.name });
  //   }
  // }, [division, form]);

  const submitData = async (values: { name: string }) => {
    const slug = values.name.toLowerCase().replace(/\s+/g, '-');
    const payload = { ...values, slug, busines_id: directorate_id };

    try {
      if (id) {
        // await dispatch(updateDivision({ ...payload, id }));
      } else {
        await dispatch(createDivision(payload));
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
        <FormItem required label='Division Name' name='name' rules={[{ required: true, message: 'Please enter division name' }]}>
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

export default FormDivision;
