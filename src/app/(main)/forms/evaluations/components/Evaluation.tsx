import FormItem from "@root/app/components/FormItem";
import { Form, Row, Col, Button, Radio, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Evaluations = ({
  id,
  name,
  options,
  onSelectScore,
  defaultValue,
}: {
  id?: string;
  name: string;
  options?: any;
  onSelectScore: any;
  defaultValue?: any;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [options]);

  return (
    <div>
      <Form layout="vertical" form={form}>
        <Row gutter={24}>
          <Col span={24}>
            <FormItem label="" required name={`score_${name}`}>
              <Radio.Group onChange={onSelectScore} defaultValue={defaultValue}>
                <Space direction="vertical">
                  <Radio key={`radio1_${name}`} value={1}>
                    <div>Score 1:</div>
                    <div>{options?.score1}</div>
                  </Radio>
                  <Radio key={`radio2_${name}`} value={2}>
                    <div>Score 2:</div>
                    <div>{options?.score2}</div>
                  </Radio>
                  <Radio key={`radio3_${name}`} value={3}>
                    <div>Score 3:</div>
                    <div>{options?.score3}</div>
                  </Radio>
                  <Radio key={`radio4_${name}`} value={4}>
                    <div>Score 4:</div>
                    <div>{options?.score4}</div>
                  </Radio>
                </Space>
              </Radio.Group>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Evaluations;
