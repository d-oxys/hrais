"use client";
import { Breadcrumb } from "antd";
import FormLevel from "../components/FormLevel";
import { Suspense, useEffect, useState } from "react";
import { usePermissions } from "@root/libs/contexts/PermissionsContext";
import { useRouter } from "next/navigation";

const AddLevelPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const permissions = usePermissions();
  const router = useRouter();
  const breadcrumb = [
    {
      href: "#",
      title: "Settings",
    },
    {
      href: "/settings/level",
      title: "Level",
    },
    {
      href: "/settings/level/create",
      title: "Create New Level",
    },
  ];

  useEffect(() => {
    if (!permissions) {
      return;
    }

    if (
      !permissions["Settings"] ||
      !permissions["Settings"]["Level"] ||
      permissions["Settings"]["Level"]["create"] !== 1
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
              <p className="font-bold text-lg">Create New Level</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <div className="mt-4 bg-white rounded-xl p-5">
            <div className="font-bold text-primary mb-5">Level Data</div>
            <div className="border-2 border-primary mb-4"></div>
            <FormLevel />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AddLevelPage;
