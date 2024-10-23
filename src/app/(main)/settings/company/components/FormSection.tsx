import FormItem from '@root/app/components/FormItem';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { SectionType, sectionActions } from '@root/libs/store/slices/section.slice';
import { createSection, getSectionById, updateSection } from '@root/libs/store/thunk/section';
import { Button, Col, Form, Input, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DepartmentType } from '@root/libs/store/slices/department.slice';

interface FormSectionProps {
  id?: string;
  department_id: string;
  callback?: () => void;
}

const FormSection = (props: FormSectionProps) => {
  const { id, department_id, callback } = props;
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const { loading, section }: { loading: boolean; section: SectionType } = useAppSelector((state) => state.section);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getSectionById(id));
  //   } else {
  //     dispatch(sectionActions.setSectionDetail({}));
  //   }
  // }, [id, dispatch]);

  useEffect(() => {
    if (section) {
      form.setFieldsValue({
        name: section.name,
      });
    }
  }, [section]);

  const submitData = async (values: { name: string }) => {
    const slug = values.name.toLowerCase().replace(/\s+/g, '-');
    const payload = {
      ...values,
      slug,
      department_id,
    };

    try {
      if (id) {
        // await dispatch(updateSection({ ...payload, id })); // Update jika id ada
      } else {
        await dispatch(createSection(payload));
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
        <FormItem required label='Section Name' name='name'>
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

export default FormSection;
