import FormItem from "@root/app/components/FormItem";
import UploadFile from "@root/app/components/Upload";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { createClaim, updateClaim } from "@root/libs/store/thunk/claim";
import { getSubordinate } from "@root/libs/store/thunk/employee";
import { Form, Row, Col, DatePicker, Input, Button, Select } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReceiptForm = ({
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
  const TYPE = "Receipt";

  const {
    employees,
    loading: employeeLoading,
  }: { employees: any; loading: boolean } = useAppSelector(
    (state) => state.employee
  );

  const [employeeData, setEmployeeData] = useState<any>([]);

  useEffect(() => {
    dispatch(getSubordinate());
  }, []);

  // listen employees data, if data change, set employeeData state
  useEffect(() => {
    setEmployeeData(employees);
  }, [employees]);

  useEffect(() => {
    if (
      claimDetail &&
      claimDetail.type.toLowerCase().replace(" ", "-") === "receipt"
    ) {
      form.setFieldsValue({
        date: dayjs(claimDetail.date),
        amount: claimDetail.amount,
        description: claimDetail.description,
        user_receiver_id: claimDetail.user_receiver_id,
      });
    }
  }, [claimDetail]);

  const handleSubmit = async (values: any) => {
    values.user_id = data?.user?.id;
    values.date = dayjs().format("YYYY-MM-DD");
    values.type = TYPE;

    let submit;
    if (id) {
      submit = await dispatch(updateClaim(id, values));
    } else {
      submit = await dispatch(createClaim(values));
    }
    if (submit) {
      route.push("/forms/claims");
    }
  };

  const handleSearch = (value: string) => {
    if (value.length > 3) {
      dispatch(getSubordinate(value));
    }
  };

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
            <FormItem label="Amount" required name="amount">
              <Input disabled={loading} type="number" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Description" required name="description">
              <Input disabled={loading} />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem label="Receiver" required name="user_receiver_id">
              {/* create select option by employees data */}
              <Select
                disabled={employeeLoading}
                onSearch={handleSearch}
                onClear={() => dispatch(getSubordinate())}
                allowClear
                showSearch
              >
                {employeeData?.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.nip} - {item.name}
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
              {id ? "Update Form" : "Create Form"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default ReceiptForm;
