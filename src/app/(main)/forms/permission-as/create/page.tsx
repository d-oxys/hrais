"use client";
import { Breadcrumb, Button } from "antd";
import { Suspense } from "react";
import MainLayoutLoading from "@root/app/(main)/loading";
import FormPermission from "../components/FormPermission";

const AddPermissionPage = () => {
  const breadcrumb = [
    {
      href: "#",
      title: "Forms",
    },
    {
      href: "/forms/permissions",
      title: "Permission",
    },
    {
      href: "/forms/permissions/create",
      title: "Create New Permission",
    },
  ];
  return (
    <Suspense fallback={<MainLayoutLoading />}>
      <div>
        <div className="mb-5">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg">Create New Permission</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <FormPermission />
        </div>
      </div>
    </Suspense>
  );
};
export default AddPermissionPage;
