import { Form, FormItemProps } from "antd";

interface FormItemComponentProps extends FormItemProps {
  children: any;
}

const FormItem = (props: FormItemComponentProps) => {
  const { children } = props;
  const label = props.label && (
    <span className="font-bold">
      {props.label}{" "}
      {props.required && <span className="text-danger font-bold">*</span>}
    </span>
  );
  return (
    <Form.Item
      {...props}
      required={false}
      label={label}
      rules={[{ required: props.required, message: "This field is required" }]}
    >
      {children}
    </Form.Item>
  );
};
export default FormItem;
