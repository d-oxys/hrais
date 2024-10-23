import FormItem from '@root/app/components/FormItem';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { AbsentGroupType, absentgroupActions } from '@root/libs/store/slices/absentgroup.slice';
import { getCompany } from '@root/libs/store/thunk/company';
import { createAbsentGroup, getAbsentGroupById, updateAbsentGroup } from '@root/libs/store/thunk/absentgroup';
import { Button, Col, Form, Input, Row, Checkbox } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface FormAbsentGroupProps {
  id?: string;
}

const FormAbsentGroup = (props: FormAbsentGroupProps) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const { loading, absentgroup }: { loading: boolean; absentgroup: AbsentGroupType } = useAppSelector((state) => state.absentgroup);

  useEffect(() => {
    dispatch(getCompany());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getAbsentGroupById(id));
    } else {
      dispatch(absentgroupActions.setAbsentGroupDetail({}));
    }
  }, [id]);

  useEffect(() => {
    if (absentgroup) {
      form.setFieldsValue({
        name: absentgroup.name,
        description: absentgroup.description,
        daysOff: absentgroup.daysOff,
      });
    }
  }, [absentgroup]);

  const submitData = (values: { name: string; description: string; daysOff: string[] }) => {
    if (id) {
      dispatch(
        updateAbsentGroup({
          ...values,
          id: id,
        })
      );
    } else {
      dispatch(createAbsentGroup(values));
    }
    route.push('/settings/group/absen');
  };

  return (
    <div className='p-2'>
      <Form form={form} layout='vertical' onFinish={submitData}>
        <FormItem required label='Absent Group Name' name='name'>
          <Input />
        </FormItem>
        <FormItem label='Days Off' name='daysOff'>
          <Checkbox.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Checkbox value='Sunday'>Sunday</Checkbox>
              <Checkbox value='Monday'>Monday</Checkbox>
              <Checkbox value='Tuesday'>Tuesday</Checkbox>
              <Checkbox value='Wednesday'>Wednesday</Checkbox>
              <Checkbox value='Thursday'>Thursday</Checkbox>
              <Checkbox value='Friday'>Friday</Checkbox>
              <Checkbox value='Saturday'>Saturday</Checkbox>
            </div>
          </Checkbox.Group>
        </FormItem>
        <FormItem label='Description' name='description'>
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
export default FormAbsentGroup;
