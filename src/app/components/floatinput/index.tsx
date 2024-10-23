import { Input } from "antd";
import { useState } from "react";
import styles from "./floatinput.module.scss";

interface FloatInputProps {
  label: string | any;
  value?: string;
  placeholder?: string;
  type: string;
  required: boolean;
  onChange?: any;
}

const FloatInput = (props: FloatInputProps) => {
  const [focus, setFocus] = useState(false);
  let { label, value, placeholder, type, required } = props;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  const labelClass = isOccupied ? `${styles['label']} ${styles['as-label']}` : `${styles['label']} ${styles['as-placeholder']}`;

  const requiredMark = required ? <span className={styles['text-danger']}>*</span> : null;

  return (
    <div
      className={styles['float-label']}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
      onChange={() => setFocus(true)}
    >
      <Input onChange={props.onChange} type={type} defaultValue={value} autoComplete="false" />
      <label className={labelClass}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
}
export default FloatInput;