import FormItem from "@root/app/components/FormItem";
import UploadFile from "@root/app/components/Upload";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { createPermission } from "@root/libs/store/thunk/permission";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SickLeaveForm = () => {
  const [form] = Form.useForm();
  const { data }: { data: any } = useSession();
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { loading }: { loading: boolean } = useAppSelector(
    (state) => state.permission
  );
  const TYPE = "Sick Leave";

  const onFileUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      form.setFieldValue(field, base64String);
    };
  };

  const onFileDeleted = (field: string) => {
    form.setFieldValue(field, undefined);
  };

  const handleSubmit = async (values: any) => {
    values.user_id = data?.user?.id;
    values.date = dayjs().format("YYYY-MM-DD");
    values.fromdatetime = dayjs(values.fromdatetime).format("YYYY-MM-DD");
    values.todatetime = dayjs(values.todatetime).format("YYYY-MM-DD");
    values.type = TYPE;
    values.category = TYPE;

    const submit = await dispatch(createPermission(values));
    if (submit) {
      route.push("/forms/permissions");
    }
  };

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="Diagnosis" required name="diagnosis">
              <Input disabled={loading} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Hospital Name" required name="hospital_name">
              <Input disabled={loading} />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="Upload" required name="proof">
              <UploadFile
                allowedFile={["JPG, JPEG, PNG"]}
                maxSize={2048}
                onFileUpload={(file) => onFileUpload("proof", file)}
                onFileDeleted={() => onFileDeleted("proof")}
                disabled={loading}
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="From Date" required name="fromdatetime">
              <DatePicker className="w-full" disabled={loading} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="To Date" required name="todatetime">
              <DatePicker className="w-full" disabled={loading} />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24} className="text-end">
            <Button
              className="bg-positif/25 text-positif rounded-full"
              htmlType="submit"
            >
              Create Form
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default SickLeaveForm;
