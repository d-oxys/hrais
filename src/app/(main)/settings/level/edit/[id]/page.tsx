"use client";
import { Breadcrumb } from "antd";
import FormLevel from "../../components/FormLevel";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePermissions } from "@root/libs/contexts/PermissionsContext";

const UpdateLevelPage = () => {
  const params = useParams();
  const router = useRouter();
  const permissions = usePermissions();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!permissions) {
      return;
    }

    if (
      !permissions["Settings"] ||
      !permissions["Settings"]["Level"] ||
      permissions["Settings"]["Level"]["update"] !== 1
    ) {
      router.replace("/unauthorized");
    } else {
      setIsLoading(false);
    }
  }, [permissions, router]);

  if (isLoading) {
    return null;
  }

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
      href: "/settings/level/edit" + params.id,
      title: "Update Level",
    },
  ];

  return (
    <div>
      <div className="mb-5">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-lg">Update Level</p>
            <Breadcrumb items={breadcrumb} />
          </div>
        </div>
        <div className="mt-4 bg-white rounded-xl p-5">
          <div className="font-bold text-primary mb-5">Level Data</div>
          <div className="border-2 border-primary mb-4"></div>
          <FormLevel id={params.id.toString()} />
        </div>
      </div>
    </div>
  );
};

export default UpdateLevelPage;
