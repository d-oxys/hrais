import FormItem from "@root/app/components/FormItem";
import UploadFile from "@root/app/components/Upload";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { createPermission } from "@root/libs/store/thunk/permission";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SpecificPaidLeaveForm = () => {
  const [form] = Form.useForm();
  const { data }: { data: any } = useSession();
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { loading }: { loading: boolean } = useAppSelector(
    (state) => state.permission
  );
  const TYPE = "Specific Paid Leave";

  const absentType = [
    {
      value: "Employee Marriage",
      label: "Employee's Marriage (3 days)",
    },
    {
      value: "Wife Giving Birth",
      label: "Wife Giving Birth (2 days)",
    },
    {
      value: "Employee Giving Birth",
      label: "Employee's Giving Birth (90 days)",
    },
  ];

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
    values.date = dayjs(values.date).format("YYYY-MM-DD");
    values.type = TYPE;

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
            <FormItem label="Type" required name="category">
              <Select disabled={loading}>
                {absentType.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Date" required name="date">
              <DatePicker className="w-full" disabled={loading} />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem label="Upload" required name="proof">
              <UploadFile
                allowedFile={["JPG", "PNG", "JPEG"]}
                maxSize={2048}
                onFileUpload={(file) => onFileUpload("proof", file)}
                onFileDeleted={() => onFileDeleted("proof")}
                disabled={loading}
              />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24} className="text-end">
            <Button
              className="bg-positif/25 text-positif rounded-full"
              loading={loading}
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
export default SpecificPaidLeaveForm;
