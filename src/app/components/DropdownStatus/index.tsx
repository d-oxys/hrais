import { Select } from 'antd';
import styles from './dropdownstatus.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@root/libs/store';

interface DropdownStatusProps {
  initialValue?: string;
  id: number;
  statusOptions: { value: string; label: string }[];
  onChangeStatus: (id: number, status: string) => void;
}

const DropdownStatus = (props: DropdownStatusProps) => {
  const { initialValue, id, statusOptions, onChangeStatus } = props;
  const dispatch = useDispatch<AppDispatch>();

  const [selected, setSelected] = useState<string>(initialValue?.toLowerCase() ?? statusOptions[0].value.toLowerCase());

  useEffect(() => {
    setSelected(initialValue?.toLowerCase() ?? statusOptions[0].value.toLowerCase());
  }, [initialValue, statusOptions]);

  const handleChange = (value: string) => {
    setSelected(value.toLowerCase());
    onChangeStatus(id, value);
  };

  return (
    <div className={styles['dropdown-status']}>
      <Select value={selected} className={selected === 'aktif' ? 'active' : 'not-active'} onChange={handleChange}>
        {statusOptions.map((item) => (
          <Select.Option key={item.value.toLowerCase()} value={item.value.toLowerCase()}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default DropdownStatus;
