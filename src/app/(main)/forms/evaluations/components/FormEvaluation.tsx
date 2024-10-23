import { Button, Tabs } from "antd";
import { useEffect, useState } from "react";
import styles from "./evaluation.module.scss";
import { useParams } from "next/navigation";
import Evaluations from "./Evaluation";

const FormEvaluation = () => {
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState<string>("work-motivation");
  const [evaluationData, setEvaluationData] = useState<any>({
    "work-motivation": {},
    "understanding-of-instruction": {},
    "work-initiatives": {},
    "work-rhythm": {},
    disciplinary: {},
    obedience: {},
    "work-performance": {},
    "team-work": {},
    "social-relations": {},
  });
  const [evaluationForm, setEvaluationForm] = useState<any>({
    "work-motivation": 0,
    "understanding-of-instruction": 0,
    "work-initiatives": 0,
    "work-rhythm": 0,
    disciplinary: 0,
    obedience: 0,
    "work-performance": 0,
    "team-work": 0,
    "social-relations": 0,
  });

  useEffect(() => {
    // Function to fetch evaluation data
    const fetchEvaluationData = async () => {
      try {
        const response = await fetch("/datas/evaluation.json");
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const data = await response.json();
        setEvaluationData(data);
      } catch (error) {
        console.error("Error fetching evaluation data:", error);
      }
    };

    fetchEvaluationData();
  }, []);

  const tabItems = [
    {
      label: "Work Motivation",
      key: "work-motivation",
    },
    {
      label: "Understanding of Instruction",
      key: "understanding-of-instruction",
    },
    {
      label: "Work Initiatives",
      key: "work-initiatives",
    },
    {
      label: "Work Rhythm",
      key: "work-rhythm",
    },
    {
      label: "Disciplinary",
      key: "disciplinary",
    },
    {
      label: "Obedience",
      key: "obedience",
    },
    {
      label: "Work Performance",
      key: "work-performance",
    },
    {
      label: "Team Work",
      key: "team-work",
    },
    {
      label: "Social Relations",
      key: "social-relations",
    },
  ];

  const onSelectScore = (e: any) => {
    setEvaluationForm({
      ...evaluationForm,
      [selectedTab]: e.target.value,
    });
  };

  const submitEvaluationForm = () => {
    // submit form
  };

  return (
    <div>
      <div className="flex gap-4 w-full">
        <div className="w-1/4">
          <div className="mt-4 bg-white rounded-xl p-7 w-full">
            <div className="font-bold text-lg">Type</div>
            <div className={styles["evaluation-tab"]}>
              <Tabs
                tabPosition="left"
                items={tabItems}
                className="w-full mt-6"
                onChange={(activeKey) => {
                  setSelectedTab(activeKey);
                }}
                defaultActiveKey={selectedTab}
              />
            </div>
          </div>

          <div className="mt-4">
            <Button
              className="bg-positif/25 text-positif rounded-full"
              onClick={submitEvaluationForm}
              // loading={loading}
            >
              Create Evaluation
            </Button>
          </div>
        </div>
        <div className="mt-4 w-3/4">
          <div className="bg-white rounded-xl p-7 w-full">
            <Evaluations
              name="understanding-of-instruction-evaluation-form"
              options={evaluationData[selectedTab]}
              onSelectScore={onSelectScore}
              defaultValue={evaluationForm[selectedTab]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormEvaluation;
