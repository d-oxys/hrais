import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import styles from "./component.module.scss";
import AbsentForm from "./AbsentForm";
import PermissionForm from "./PermissionForm";
import SickLeaveForm from "./SickLeaveForm";
import SpecificPaidLeaveForm from "./SpecificPaidLeaveForm";
import { getLeaveHealthBalanceByUserId } from "@root/libs/store/thunk/health-leave-report";
import { useSession } from "next-auth/react";
import { HealthAndLeaveBalanceType } from "@root/libs/types/leave-and-health";
import dayjs from "dayjs";
import { formatCurrency } from "@root/libs/utils/fomatter";
import OvertimeForm from "./OvertimeForm";

const FormPermission = () => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<string>("absent");
  const { data }: { data: any } = useSession();

  const {
    healthAndLeaveBalance,
  }: { healthAndLeaveBalance: HealthAndLeaveBalanceType } = useAppSelector(
    (state) => state.healthLeaveReport
  );

  const tabItems = [
    {
      label: "Absent",
      key: "absent",
      content: <AbsentForm />,
    },
    {
      label: "Permission",
      key: "permission",
      content: <PermissionForm />,
    },
    {
      label: "Sick Leave",
      key: "sick-leave",
      content: <SickLeaveForm />,
    },
    {
      label: "Specific Paid Leave",
      key: "specific-paid-leave",
      content: <SpecificPaidLeaveForm />,
    },
    {
      label: "Overtime",
      key: "overtime",
      content: <OvertimeForm />,
    },
  ];

  useEffect(() => {
    dispatch(getLeaveHealthBalanceByUserId(data?.user?.id));
  }, []);

  return (
    <div>
      <div className="mt-4 bg-white rounded-xl p-7">
        <div className="flex mb-2 text-primary justify-between">
          <div>Total Paid Leave 2024</div>
          <div>
            {healthAndLeaveBalance.leave_balance?.map((item) => {
              if (item.year === dayjs().format("YYYY")) {
                return (
                  <span key={`leave-${item.id}`}>{item.total_balance}</span>
                );
              }
            })}
          </div>
        </div>
        <div className="flex mb-2 text-primary justify-between">
          <div>Total Paid Leave 2023 / Special Birthday Leave</div>
          <div>
            {healthAndLeaveBalance.leave_balance?.map((item) => {
              let el = <span>-</span>;
              if (
                parseInt(item.year!) ===
                parseInt(dayjs().format("YYYY")) - 1
              ) {
                el = <span key={`leave-${item.id}`}>{item.total_balance}</span>;
              }
              return el;
            })}
          </div>
        </div>
        <div className="flex mb-2 text-primary justify-between">
          <div>Health Balance Remaining</div>
          <div>
            IDR{" "}
            {formatCurrency(
              parseInt(
                healthAndLeaveBalance.health_balance?.health_balance?.toString() ??
                  "0"
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <div className="mt-4 bg-white rounded-xl p-7 w-1/4">
          <div className="font-bold text-lg">Type</div>
          <div className={styles["permission-tab"]}>
            <Tabs
              tabPosition="left"
              items={tabItems}
              className="w-full mt-6"
              onChange={(activeKey) => setSelectedTab(activeKey)}
              defaultActiveKey="absent"
            />
          </div>
        </div>
        <div className="mt-4 bg-white rounded-xl p-7 w-3/4">
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
