"use client";
import { Breadcrumb } from "antd";
import FormModule from "../components/FormAddRolesNew";
import { Suspense, useEffect, useState } from "react";
import { usePermissions } from "@root/libs/contexts/PermissionsContext";
import { useRouter } from "next/navigation";

const AddRolesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const permissions = usePermissions();
  const router = useRouter();
  const breadcrumb = [
    {
      href: "#",
      title: "Settings",
    },
    {
      href: "/settings/roles/user",
      title: "Roles User",
    },
    {
      href: "/settings/roles/user/create",
      title: "Create New Roles User",
    },
  ];

  return (
    <Suspense>
      <div>
        <div className="mb-5">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg">Create New Roles</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <div className="mt-4 bg-white rounded-xl p-5">
            <div className="font-bold text-primary mb-5">Add Roles</div>
            <div className="border-2 border-primary mb-4"></div>
            <FormModule />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AddRolesPage;
