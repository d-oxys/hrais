"use client";
import { Breadcrumb, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import FormEmployee from "../components/FormEmployee";
import { Suspense } from "react";
import MainLayoutLoading from "@root/app/(main)/loading";

const AddEmployeePage = () => {
  const breadcrumb = [
    {
      href: "#",
      title: "Employee",
    },
    {
      href: "/employee/employee",
      title: "All Employee",
    },
    {
      href: "/employee/employee/create",
      title: "Create New Employee",
    },
  ];
  return (
    <Suspense fallback={<MainLayoutLoading />}>
      <div>
        <div className="mb-5">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg">Create New Employee</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <Button type="primary" className="rounded-full my-auto">
                <span>Get Data From Candidate List</span> <RightOutlined />
              </Button>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-xl p-5">
            <div className="font-bold text-primary mb-5">Employee Data</div>
            <div className="border-2 border-primary mb-4"></div>
            <FormEmployee />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default AddEmployeePage;
