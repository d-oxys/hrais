import FormItem from "@root/app/components/FormItem";
import { useAppDispatch } from "@root/libs/store";
import {
  getHealthLeaveReportList,
  updateHealthBalance,
  updateLeaveBalance,
} from "@root/libs/store/thunk/health-leave-report";
import { Button, Col, Form, Input, Modal, ModalProps, Row, Select } from "antd";
import { useEffect } from "react";

interface RemainingLeaveModalProps extends ModalProps {
  modalType: string;
  data: any;
  handleCancel: () => void;
}
const RemainingLeaveModal = (props: RemainingLeaveModalProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const adjustTypeOption = [
    {
      label: "Subtraction",
      value: "subtraction",
    },
    {
      label: "Addition",
      value: "addition",
    },
  ];

  useEffect(() => {
    if (props.data) {
      form.setFieldValue(
        "remaining_leave",
        props.modalType === "leave"
          ? props.data.remaining_leave
          : props.data.remaining_health
      );
    }
  }, [props.data]);

  const handleSubmit = async (values: any) => {
    if (props.modalType === "leave") {
      const data_leave_balance = {
        ...props.data.leave_balance[0],
        ...values,
      };
      await dispatch(
        updateLeaveBalance(data_leave_balance.id, data_leave_balance)
      );
    } else {
      const data_leave_balance = {
        ...props.data.health_balance[0],
        ...values,
      };
      await dispatch(
        updateHealthBalance(data_leave_balance.id, data_leave_balance)
      );
    }
    await dispatch(getHealthLeaveReportList());
    form.resetFields();
    props.handleCancel();
  };

  return (
    <Modal
      title={props.title}
      open={props.open}
      onCancel={props.handleCancel}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <FormItem label={props.title} name="remaining_leave">
          <Input readOnly />
        </FormItem>

        <FormItem label="Type Adjust" required name="adjust_type">
          <Select>
            {adjustTypeOption.map((item: any) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <Row className="my-2">
          <Col span={24}>
            <div>
              <div className="italic">{`* Subtraction => Withdrawal`}</div>
              <div className="italic">{`* Addition => Balance Top-Up`}</div>
            </div>
          </Col>
        </Row>

        <FormItem label="Adjust Balance" name="adjust_balance" required>
          <Input type="number" />
        </FormItem>

        <Row>
          <Col span={24} className="text-end">
            <Button
              type="default"
              className="bg-theme-gray text-white"
              htmlType="submit"
            >
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default RemainingLeaveModal;
