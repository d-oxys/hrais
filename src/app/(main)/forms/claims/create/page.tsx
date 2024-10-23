"use client";
import { Breadcrumb, Button } from "antd";
import { Suspense } from "react";
import MainLayoutLoading from "@root/app/(main)/loading";
import FormClaim from "../components/FormClaim";

const AddPermissionPage = () => {
  const breadcrumb = [
    {
      href: "#",
      title: "Forms",
    },
    {
      href: "/forms/claims",
      title: "Claims",
    },
    {
      href: "/forms/claims/create",
      title: "Create New Claim",
    },
  ];
  return (
    <Suspense fallback={<MainLayoutLoading />}>
      <div>
        <div className="mb-5">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg">Create New Claim</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <FormClaim />
        </div>
      </div>
    </Suspense>
  );
};
export default AddPermissionPage;
