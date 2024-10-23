"use client";
import { Breadcrumb, Button } from "antd";
import { Suspense } from "react";
import MainLayoutLoading from "@root/app/(main)/loading";
import FormEvaluation from "../components/FormEvaluation";

const AddEvaluationForm = () => {
  const breadcrumb = [
    {
      href: "#",
      title: "Forms",
    },
    {
      href: "/forms/evaluations",
      title: "Evaluation",
    },
    {
      href: "/forms/evaluations/create",
      title: "Create New Evaluation",
    },
  ];
  return (
    <Suspense fallback={<MainLayoutLoading />}>
      <div>
        <div className="mb-5">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg">Create New Evaluation</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <FormEvaluation />
        </div>
      </div>
    </Suspense>
  );
};
export default AddEvaluationForm;
