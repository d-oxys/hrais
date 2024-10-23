import { Tabs } from "antd";
import { useState } from "react";
import styles from "./formattend.module.scss";
import FormAttend from "./FormAttend";
import { useParams } from "next/navigation";

const FormAttendProblem = () => {
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState<string>("forgot-attend");

  const tabItems = [
    {
      label: "Forgot Attend",
      key: "forgot-attend",
      content: <FormAttend id={String(params.id)} />,
    },
  ];

  return (
    <div>
      <div className="flex gap-4 w-full">
        <div className="mt-4 bg-white rounded-xl p-7 w-1/4">
          <div className="font-bold text-lg">Type</div>
          <div className={styles["attend-problem-tab"]}>
            <Tabs
              tabPosition="left"
              items={tabItems}
              className="w-full mt-6"
              onChange={(activeKey) => setSelectedTab(activeKey)}
              defaultActiveKey="forgot-attend"
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
export default FormAttendProblem;
