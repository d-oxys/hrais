import FormItem from "@root/app/components/FormItem";
import UploadFile from "@root/app/components/Upload";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { createClaim } from "@root/libs/store/thunk/claim";
import { Form, Row, Col, Select, DatePicker, Input, Button } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HealthClaimForm = ({
  id,
  claimDetail,
}: {
  id?: string;
  claimDetail?: any;
}) => {
  const [form] = Form.useForm();
  const route = useRouter();
  const { data }: { data: any } = useSession();
  const dispatch = useAppDispatch();
  const { loading }: { loading: boolean } = useAppSelector(
    (state) => state.claim
  );
  const TYPE = "Health Claim";

  const category = ["Personal", "Child", "Parent"];

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
    values.type = TYPE;

    const submit = await dispatch(createClaim(values));
    if (submit) {
      route.push("/forms/claims");
    }
  };

  useEffect(() => {
    if (
      claimDetail &&
      claimDetail.type.toLowerCase().replace(" ", "-") === "health-claim"
    ) {
      form.setFieldsValue({
        date: dayjs(claimDetail.date),
        category: claimDetail.category,
        amount: claimDetail.amount,
      });
    }
  }, [claimDetail]);

  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="Date" required name="date">
              <DatePicker
                className="w-full"
                minDate={dayjs()}
                disabled={loading}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Category" required name="category">
              <Select disabled={loading}>
                {category.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Claim Amount" required name="amount">
              <Input disabled={loading} type="number" />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem label="Upload" required name="attachment">
              <UploadFile
                allowedFile={["PDF"]}
                maxSize={2048}
                onFileUpload={(file) => onFileUpload("attachment", file)}
                onFileDeleted={() => onFileDeleted("attachment")}
              />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24} className="text-end">
            <Button
              className="bg-positif/25 text-positif rounded-full"
              htmlType="submit"
              loading={loading}
            >
              {id ? "Update Form" : "Create Form"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default HealthClaimForm;
