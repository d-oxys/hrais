import FormItem from '@root/app/components/FormItem';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { createFunction, updateFunction, getFunctionById } from '@root/libs/store/thunk/function';
import { getModuleListWithoutFunctions } from '@root/libs/store/thunk/module';
import { Button, Col, Form, Input, Row, Select, Checkbox } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FormFunctionProps {
  id?: string;
}

const FormFunction = (props: FormFunctionProps) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const loading = useAppSelector((state) => state.function.loading);
  const functionDetail = useAppSelector((state) => state.function.functionDetail);
  const modules = useAppSelector((state) => state.module.modules);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    dispatch(getModuleListWithoutFunctions(10, 1)).catch((error) => {
      console.error('Failed to fetch module list:', error);
    });

    if (id) {
      form.resetFields();

      dispatch(getFunctionById(Number(id))).catch((error) => {
        console.error('Failed to fetch function details:', error);
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (functionDetail) {
      form.setFieldsValue({
        name: functionDetail.name,
        url: functionDetail.url,
        listModule: functionDetail.module.id,
        read: functionDetail.read,
        create: functionDetail.create,
        update: functionDetail.update,
        delete: functionDetail.delete,
      });
    }
  }, [functionDetail, form]);

  // Function to handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    dispatch(getModuleListWithoutFunctions(100, 1, value)).catch((error) => {
      console.error('Failed to fetch module list:', error);
    });
  };

  const submitData = async (values: { name: string; url: string; listModule: string; read: boolean; create: boolean; update: boolean; delete: boolean }) => {
    const functionData = {
      name: values.name,
      url: values.url,
      module_id: Number(values.listModule),
      read: values.read,
      create: values.create,
      update: values.update,
      delete: values.delete,
    };

    try {
      if (id) {
        await dispatch(updateFunction(Number(id), functionData));
      } else {
        await dispatch(createFunction(functionData));
      }
      window.location.href = '/settings/roles/function';
    } catch (error) {
      console.error('Failed to submit function:', error);
    }
  };

  return (
    <div className='p-2'>
      <Form form={form} layout='vertical' onFinish={submitData}>
        <FormItem required label='Function Name' name='name'>
          <Input />
        </FormItem>
        <FormItem required label='URL' name='url'>
          <Input />
        </FormItem>
        <FormItem required label='List Module' name='listModule'>
          <Select
            showSearch
            placeholder='Select a module'
            optionFilterProp='children'
            onSearch={handleSearch}
            filterOption={false}
            options={modules.map((module) => ({
              label: module.name,
              value: module.id,
            }))}
          />
        </FormItem>

        <Row gutter={[16, 16]}>
          <Col span={6}>
            <FormItem name='read' valuePropName='checked'>
              <Checkbox>Read</Checkbox>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem name='create' valuePropName='checked'>
              <Checkbox>Create</Checkbox>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem name='update' valuePropName='checked'>
              <Checkbox>Update</Checkbox>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem name='delete' valuePropName='checked'>
              <Checkbox>Delete</Checkbox>
            </FormItem>
          </Col>
        </Row>

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

export default FormFunction;
