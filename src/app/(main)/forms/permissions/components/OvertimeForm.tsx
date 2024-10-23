import FormItem from "@root/app/components/FormItem";
import UploadFile from "@root/app/components/Upload";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { createPermission } from "@root/libs/store/thunk/permission";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const OvertimeForm = () => {
  const [form] = Form.useForm();
  const { data }: { data: any } = useSession();
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { loading }: { loading: boolean } = useAppSelector(
    (state) => state.permission
  );
  const TYPE = "Overtime";

  const overtimeCategory = [
    {
      value: "Meal Allowance",
      label: "Meal Allowance",
    },
    {
      value: "Overtime",
      label: "Overtime",
    },
  ];

  const overtimeSubCat = [
    {
      value: "Weekend",
      label: "Weekend",
    },
    {
      value: "Weekday",
      label: "Weekday",
    },
  ];

  const handleSubmit = async (values: any) => {
    values.user_id = data?.user?.id;
    values.date = dayjs(values.date).format("YYYY-MM-DD");
    values.time_from = dayjs(values.time_from).format("HH:mm");
    values.time_to = dayjs(values.time_to).format("HH:mm");
    values.fromdatetime = dayjs(values.fromdatetime).format("YYYY-MM-DD HH:mm");
    values.todatetime = dayjs(values.todatetime).format("YYYY-MM-DD HH:mm");
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
                {overtimeCategory.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Category" required name="subcategory">
              <Select disabled={loading}>
                {overtimeSubCat.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="Date Time From" required name="fromdatetime">
              <DatePicker
                showTime
                className="w-full"
                format="YYYY-MM-DD HH:mm"
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Date Time To" required name="todatetime">
              <DatePicker
                showTime
                className="w-full"
                format="YYYY-MM-DD HH:mm"
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem label="Description" required name="reason">
              <Input />
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
export default OvertimeForm;
