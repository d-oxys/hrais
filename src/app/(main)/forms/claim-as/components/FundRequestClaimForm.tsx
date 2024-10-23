import FormItem from "@root/app/components/FormItem";
import UploadFile from "@root/app/components/Upload";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { createClaim } from "@root/libs/store/thunk/claim";
import { getSubordinate } from "@root/libs/store/thunk/employee";
import { Form, Row, Col, DatePicker, Input, Button, Select } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FundRequestClaimForm = () => {
  const [form] = Form.useForm();
  const route = useRouter();
  const { data }: { data: any } = useSession();
  const dispatch = useAppDispatch();
  const { loading }: { loading: boolean } = useAppSelector(
    (state) => state.healthLeaveReport
  );
  const TYPE = "Fund Request Claim";

  const {
    employees,
    loading: employeeLoading,
  }: { employees: any; loading: boolean } = useAppSelector(
    (state) => state.employee
  );

  const [employeeData, setEmployeeData] = useState<any>([]);

  useEffect(() => {
    setEmployeeData(employees);
  }, [employees]);

  useEffect(() => {
    dispatch(getSubordinate());
  }, []);

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
    values.date = dayjs().format("YYYY-MM-DD");
    values.type = TYPE;

    const submit = await dispatch(createClaim(values));
    if (submit) {
      route.push("/forms/claims");
    }
  };

  // create onchange function for user_id field, so when user type more than 3 char in user_id option select, it will call getSubordinate function
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
          <Col span={24}>
            <FormItem label="Employee" required name="user_id">
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
              Create Form
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default FundRequestClaimForm;
