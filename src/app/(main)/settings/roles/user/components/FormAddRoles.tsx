import FormItem from "@root/app/components/FormItem";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { getFunctionList } from "@root/libs/store/thunk/function";
import { Button, Col, Form, Input, Row, Checkbox, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FormModuleProps {
  id?: string;
}

const FormRoles = (props: FormModuleProps) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const loading = useAppSelector((state) => state.function.loading);
  const functions = useAppSelector((state) => state.function.functions);
  const [functionOptions, setFunctionOptions] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(100);

  const submitData = async (values: any) => {
    console.log("Form submitted with values:", values);
    // Implementasikan logika untuk mengirim data form di sini
  };

  useEffect(() => {
    const fetchFunctions = async () => {
      await dispatch(getFunctionList(limit));
    };

    fetchFunctions();
  }, [dispatch]);

  useEffect(() => {
    if (functions && functions.length > 0) {
      setFunctionOptions(functions);
    }
  }, [functions]);

  return (
    <div className="p-2">
      <Form form={form} layout="vertical" onFinish={submitData}>
        <FormItem
          required
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </FormItem>

        <FormItem label="">
          <div className="flex flex-wrap">
            {functionOptions.map((item, index) => (
              <div
                className={`w-1/2 p-2 ${index % 2 === 0 ? "border-rrr" : ""}`}
                key={item.id}
              >
                <span className="block font-bold mb-2">{item.name}</span>
                <Checkbox.Group
                  className="flex space-x-8 mb-4"
                  name={`functionPermissions[${item.id}]`}
                >
                  <Checkbox value="create">Create</Checkbox>
                  <Checkbox value="read">Read</Checkbox>
                  <Checkbox value="update">Update</Checkbox>
                  <Checkbox value="delete">Delete</Checkbox>
                </Checkbox.Group>
              </div>
            ))}
          </div>
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

export default FormRoles;
