import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import styles from './component.module.scss';
import AbsentForm from './AbsentForm';
import PermissionForm from './PermissionForm';
import { getLeaveHealthBalanceByUserId } from '@root/libs/store/thunk/health-leave-report';
import { useSession } from 'next-auth/react';
import { HealthAndLeaveBalanceType } from '@root/libs/types/leave-and-health';

const FormPermission = () => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<string>('absent');
  const { data }: { data: any } = useSession();

  const { healthAndLeaveBalance }: { healthAndLeaveBalance: HealthAndLeaveBalanceType } = 
    useAppSelector((state) => state.healthLeaveReport);

  const tabItems = [
    {
      label: 'Channel',
      key: 'absent',
      content: <AbsentForm />,
    },
    {
      label: 'Channel Form',
      key: 'permission',
      content: <PermissionForm />,
    },
  ];

  useEffect(() => {
    dispatch(getLeaveHealthBalanceByUserId(data?.user?.id));
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full gap-2">
        <div className="mt-4 bg-white rounded-xl px-4 sm:px-7 py-1">
          <div className={styles['permission-tab']}>
            <Tabs 
              tabPosition="top" 
              items={tabItems} 
              className="w-full mt-6 bg-white" 
              onChange={(activeKey) => setSelectedTab(activeKey)} 
              defaultActiveKey="absent"
            />
          </div>
        </div>
        <div className="rounded-xl">
          {tabItems.map((item) => {
            if (item.key === selectedTab) {
              return item.content;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default FormPermission;