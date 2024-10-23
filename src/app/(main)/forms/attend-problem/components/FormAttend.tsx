import FormItem from "@root/app/components/FormItem";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  createAttendProblem,
  fetchAttendProblemById,
  updateAttendProblem,
} from "@root/libs/store/thunk/attend-problem";
import { Form, Row, Col, DatePicker, Select, Input, Button } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FormAttend = ({ id }: { id: string }) => {
  const [form] = Form.useForm();
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { data }: { data: any } = useSession();
  const options = ["Attend In", "Attend Out"];

  const { loading, attendProblem }: { loading: boolean; attendProblem: any } =
    useAppSelector((state) => state.attendProblem);

  useEffect(() => {
    if (id) {
      dispatch(fetchAttendProblemById(id));
    }
  }, [id]);

  useEffect(() => {
    if (attendProblem) {
      form.setFieldsValue({
        date: dayjs(attendProblem.date),
        category: attendProblem.category,
      });
    }
  }, [attendProblem]);

  const handleSubmit = async (values: any) => {
    const datas = {
      user_id: data?.user?.id,
      category: values.category,
      date: dayjs(values.date).format("YYYY-MM-DD"),
      type: "Forgot Attend",
    };
    if (id) {
      await dispatch(updateAttendProblem({ ...datas, id }));
    } else {
      await dispatch(createAttendProblem(datas));
    }
    route.push("/forms/attend-problem");
  };

  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="Date" required name="date">
              <DatePicker
                className="w-full"
                maxDate={dayjs()}
                disabled={loading}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Category" required name="category">
              <Select disabled={loading}>
                {options.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
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
              {id ? `Update Form` : `Create Form`}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default FormAttend;
