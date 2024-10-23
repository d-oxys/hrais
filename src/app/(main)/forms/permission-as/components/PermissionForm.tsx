import FormItem from "@root/app/components/FormItem";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { getSubordinate } from "@root/libs/store/thunk/employee";
import { createPermission } from "@root/libs/store/thunk/permission";
import {
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Button,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const PermissionForm = () => {
  const { data }: { data: any } = useSession();
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const { loading }: { loading: boolean } = useAppSelector(
    (state) => state.permission
  );
  // get employees from employee slice
  const {
    employees,
    loading: employeeLoading,
  }: { employees: any; loading: boolean } = useAppSelector(
    (state) => state.employee
  );

  const [employeeData, setEmployeeData] = useState<any>([]);

  const permissionType = [
    {
      value: "Late Arrival",
      label: "Late Arrival",
    },
    {
      value: "Permission to Leave",
      label: "Permission to Leave",
    },
    {
      value: "Business Trip",
      label: "Business Trip",
    },
  ];
  const TYPE = "Permission";

  const handleSubmit = async (values: any) => {
    values.type = TYPE;
    values.date = dayjs(values.date).format("YYYY-MM-DD");
    values.time = dayjs(values.time).format("HH:mm");
    values.fromdatetime = dayjs(values.fromdatetime).format("YYYY-MM-DD HH:mm");
    values.todatetime = dayjs(values.todatetime).format("YYYY-MM-DD HH:mm");

    const submit = await dispatch(createPermission(values));
    if (submit) {
      route.push("/forms/permissions");
    }
  };

  useEffect(() => {
    dispatch(getSubordinate());
  }, []);

  // listen employees data, if data change, set employeeData state
  useEffect(() => {
    setEmployeeData(employees);
  }, [employees]);

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
            <FormItem label="Type" required name="category">
              <Select disabled={loading}>
                {permissionType.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Date Time From" required name="fromdatetime">
              <DatePicker
                showTime
                className="w-full"
                format="YYYY-MM-DD HH:mm"
              />
            </FormItem>
          </Col>
          <Col span={8}>
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
            <FormItem label="Reason" required name="reason">
              <Input disabled={loading} />
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
export default PermissionForm;
