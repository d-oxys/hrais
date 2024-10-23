"use client";
import { Breadcrumb, Button } from "antd";
import { Suspense } from "react";
import MainLayoutLoading from "@root/app/(main)/loading";
import FormAttendProblem from "../components/FormAttendProblem";

const AddAttendProblemPage = () => {
  const breadcrumb = [
    {
      href: "#",
      title: "Forms",
    },
    {
      href: "/forms/attend-problem",
      title: "Attend Problem",
    },
    {
      href: "/forms/attend-problem/create",
      title: "Create New Attend Problem",
    },
  ];
  return (
    <Suspense fallback={<MainLayoutLoading />}>
      <div>
        <div className="mb-5">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg">Create New Attend Problem</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <FormAttendProblem />
        </div>
      </div>
    </Suspense>
  );
};
export default AddAttendProblemPage;
