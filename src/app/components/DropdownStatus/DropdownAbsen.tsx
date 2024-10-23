import { Select } from "antd";
import styles from "./dropdownstatus.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@root/libs/store";
import { setGroupStatus } from "@root/libs/store/thunk/absentgroup";

interface DropdownStatusProps {
  initialValue?: string;
  id: number;
}

const DropdownStatusAbsen = (props: DropdownStatusProps) => {
  const { initialValue, id } = props;
  const dispatch = useDispatch<AppDispatch>();

  const status = [
    {
      value: "Tidak Aktif",
      label: "Tidak Aktif",
    },
    {
      value: "Aktif",
      label: "Aktif",
    },
  ];

  const [selected, setSelected] = useState<string>(
    initialValue ?? "Tidak Aktif"
  );

  useEffect(() => {
    setSelected(initialValue === "Aktif" ? "Aktif" : "Tidak Aktif");
  }, [initialValue]);

  const handleChange = (value: string) => {
    setSelected(value);
    dispatch(setGroupStatus(id, value as "Aktif" | "Tidak Aktif"));
    console.log("key row", id);
  };

  return (
    <div className={styles["dropdown-status"]}>
      <Select
        value={selected}
        className={selected === "Aktif" ? "active" : "not-active"}
        onChange={handleChange}
      >
        {status.map((item) => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default DropdownStatusAbsen;
