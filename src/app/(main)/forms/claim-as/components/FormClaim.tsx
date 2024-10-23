import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { getLeaveHealthBalanceByUserId } from "@root/libs/store/thunk/health-leave-report";
import { HealthAndLeaveBalanceType } from "@root/libs/types/leave-and-health";
import { formatCurrency } from "@root/libs/utils/fomatter";
import { Tabs } from "antd";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import styles from "./claim.module.scss";
import FundRequestClaimForm from "./FundRequestClaimForm";
import HealthClaimForm from "./HealthClaimForm";
import ReceiptForm from "./ReceiptForm";

const FormClaim = () => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<string>("health-claim");
  const { data }: { data: any } = useSession();

  const {
    healthAndLeaveBalance,
  }: { healthAndLeaveBalance: HealthAndLeaveBalanceType } = useAppSelector(
    (state) => state.healthLeaveReport
  );

  const tabItems = [
    {
      label: "Health Claim",
      key: "health-claim",
      content: <HealthClaimForm />,
    },
    {
      label: "Fund Request Claim",
      key: "fund-request-claim",
      content: <FundRequestClaimForm />,
    },
    {
      label: "Receipt",
      key: "receipt",
      content: <ReceiptForm />,
    },
  ];

  useEffect(() => {
    dispatch(getLeaveHealthBalanceByUserId(data?.user?.id));
  }, []);

  return (
    <div>
      <div className="mt-4 bg-white rounded-xl p-7">
        <div className="flex text-primary justify-between">
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
          <div className={styles["claim-tab"]}>
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
export default FormClaim;
