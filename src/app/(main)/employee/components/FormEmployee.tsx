import FormItem from "@root/app/components/FormItem";
import { EMPLOYEE_STATUS } from "@root/libs/constants/staticdata";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  createEmployee,
  getEmployeeDropdown,
} from "@root/libs/store/thunk/employee";
import { getLevelDropdown } from "@root/libs/store/thunk/level";
import { getPositionProfile } from "@root/libs/store/thunk/position";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FormEmployee = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const route = useRouter();

  const { positions }: { positions: any } = useAppSelector(
    (state) => state.position
  );

  const { levels }: { levels: any } = useAppSelector((state) => state.level);
  const { employees, loading }: { employees: any; loading: boolean } =
    useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getPositionProfile());
    dispatch(getLevelDropdown());
    dispatch(getEmployeeDropdown());
  }, []);

  const handleSubmit = async (values: any) => {
    const value = {
      ...values,
      contract_start_date: dayjs(values.contract_start_date).format(
        "YYYY-MM-DD"
      ),
      contract_end_date: dayjs(values.contract_end_date).format("YYYY-MM-DD"),
      join_date: dayjs(values.join_date).format("YYYY-MM-DD"),
      fixed_date: dayjs(values.fixed_date).format("YYYY-MM-DD"),
    };
    await dispatch(createEmployee(value));
    route.push("/employee/employee");
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={24}>
        <Col span={12}>
          <FormItem label="Name" required name="name">
            <Input disabled={loading} />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="Employee Status" required name="employment_status">
            <Select placeholder="Select Employee Status" disabled={loading}>
              {EMPLOYEE_STATUS.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem label="Phone Number" required name="phone">
            <Input disabled={loading} />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="Personal Email" required name="email">
            <Input type="email" disabled={loading} />
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <FormItem label="Position" required name="position_id">
            <Select
              disabled={loading}
              placeholder="Comp : PT. DUA PULUH TIGA | Dir : DUA PULUH TIGA | Div : SHARED OPERATION | Dept :  ICT | Sec  : ICT | Team : SYSTEM ANALYST SPECIALIST | Position : SYSTEM ANALYST"
            >
              {positions?.map((item: any) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.position}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <FormItem label="Level" required name="level_id">
            <Select placeholder="Select Level" disabled={loading}>
              {levels?.map((item: any) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.level}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem label="Superior 1" required name="superior_1">
            <Select placeholder="Select Superior 1" disabled={loading}>
              {employees?.map((item: any) => (
                <Select.Option value={item?.user_id} key={item?.user_id}>
                  {item?.user?.nip} - {item?.user?.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <FormItem label="Join Date" required name="join_date">
            <DatePicker
              className="w-full"
              format="DD-MM-YYYY"
              disabled={loading}
            />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem
            label="Contract Start Date"
            required
            name="contract_start_date"
          >
            <DatePicker
              className="w-full"
              format="DD-MM-YYYY"
              disabled={loading}
            />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Contract End Date" required name="contract_end_date">
            <DatePicker
              className="w-full"
              format="DD-MM-YYYY"
              disabled={loading}
            />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="Fixed Date" required name="fixed_date">
            <DatePicker
              className="w-full"
              format="DD-MM-YYYY"
              disabled={loading}
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24" className="text-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default FormEmployee;
