"use client";
import { Breadcrumb } from "antd";
import FormAbsentGroup from "../components/FormAbsentGroup";
import { Suspense, useEffect, useState } from "react";
import { usePermissions } from "@root/libs/contexts/PermissionsContext";
import { useRouter } from "next/navigation";

const AddPositionPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const permissions = usePermissions();
  const router = useRouter();
  const breadcrumb = [
    {
      href: "#",
      title: "Settings",
    },
    {
      href: "/settings/absent-group",
      title: "Absent Group",
    },
    {
      href: "/settings/absent-group/create",
      title: "Create New Absent Group",
    },
  ];

  useEffect(() => {
    if (!permissions) {
      return;
    }

    if (
      !permissions["Settings"] ||
      !permissions["Settings"]["Absent Group"] ||
      permissions["Settings"]["Absent Group"]["create"] !== 1
    ) {
      router.replace("/unauthorized");
    } else {
      setIsLoading(false);
    }
  }, [permissions, router]);

  if (isLoading) {
    return null;
  }

  return (
    <Suspense>
      <div>
        <div className="mb-5">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg">Create New Absent Group</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <div className="mt-4 bg-white rounded-xl p-5">
            <div className="font-bold text-primary mb-5">Absent Group Data</div>
            <div className="border-2 border-primary mb-4"></div>
            <FormAbsentGroup />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AddPositionPage;
