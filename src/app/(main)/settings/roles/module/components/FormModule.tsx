import FormItem from "@root/app/components/FormItem";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  createModule,
  updateModule,
  getModuleById,
} from "@root/libs/store/thunk/module";
import { Button, Col, Form, Input, Row } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface FormModuleProps {
  id?: string;
}

const FormModule = (props: FormModuleProps) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const loading = useAppSelector((state) => state.module.loading);
  const moduleDetails = useAppSelector((state) =>
    state.module.modules.find((module) => module.id === Number(id))
  );

  useEffect(() => {
    if (id) {
      dispatch(getModuleById(10, 1, id))
        .then(() => {
          if (moduleDetails) {
            form.setFieldsValue({
              name: moduleDetails.name,
              url: moduleDetails.url,
              icon: moduleDetails.icon,
            });
          }
        })
        .catch((error) => {
          console.error("Failed to fetch module details:", error);
        });
    }
  }, [id, dispatch, moduleDetails]);

  const submitData = (values: { name: string; url: string; icon: string }) => {
    if (id) {
      dispatch(updateModule(Number(id), values)).then(() => {
        window.location.href = "/settings/roles/module";
      });
    } else {
      dispatch(createModule(values)).then(() => {
        window.location.href = "/settings/roles/module";
      });
    }
  };

  return (
    <div className="p-2">
      <Form form={form} layout="vertical" onFinish={submitData}>
        <FormItem required label="Module Name" name="name">
          <Input />
        </FormItem>
        <FormItem required label="URL" name="url">
          <Input />
        </FormItem>
        <FormItem required label="Icon" name="icon">
          <Input />
        </FormItem>
        <Row>
          <Col span="24" className="text-end">
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormModule;
