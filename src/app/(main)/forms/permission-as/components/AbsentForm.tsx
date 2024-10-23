import FormItem from "@root/app/components/FormItem";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { getSubordinate } from "@root/libs/store/thunk/employee";
import { createPermission } from "@root/libs/store/thunk/permission";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AbsentForm = () => {
  const { data }: { data: any } = useSession();
  const dispatch = useAppDispatch();
  const route = useRouter();
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

  const absentType = [
    {
      value: "Leave",
      label: "Leave",
    },
    {
      value: "Leave of Absent",
      label: "Leave of Absent",
    },
    {
      value: "Work From Home",
      label: "Work From Home",
    },
  ];

  useEffect(() => {
    dispatch(getSubordinate());
  }, []);

  // listen employees data, if data change, set employeeData state
  useEffect(() => {
    setEmployeeData(employees);
  }, [employees]);

  const handleSubmit = async (values: any) => {
    values.category = values.type;
    values.type = "absent";
    values.date = dayjs(values.date).format("YYYY-MM-DD");
    values.fromdatetime = dayjs(values.fromdatetime).format("YYYY-MM-DD");
    values.todatetime = dayjs(values.todatetime).format("YYYY-MM-DD");

    const submit = await dispatch(createPermission(values));
    if (submit) {
      route.push("/forms/permissions");
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
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="Type" required name="type">
              <Select disabled={loading}>
                {absentType.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="From Date" required name="fromdatetime">
              <DatePicker className="w-full" disabled={loading} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="To Date" required name="todatetime">
              <DatePicker className="w-full" disabled={loading} />
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
export default AbsentForm;
