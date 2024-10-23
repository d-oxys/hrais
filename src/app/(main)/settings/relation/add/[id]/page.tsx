"use client";
import { Breadcrumb } from "antd";
import FormRelation from "../../components/FormRelation";
import { Suspense, useEffect, useState } from "react";
import { usePermissions } from "@root/libs/contexts/PermissionsContext";
import { useRouter, useParams } from "next/navigation";

const AddRelationPage = () => {
  const params = useParams();
  const permissions = usePermissions();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!permissions) {
      return;
    }

    if (
      !permissions["Settings"] ||
      !permissions["Settings"]["Relation"] ||
      permissions["Settings"]["Relation"]["create"] !== 1
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
      href: "/settings/relation",
      title: "Relation",
    },
    {
      href: "/settings/relation/create",
      title: "Create New Relation",
    },
  ];

  return (
    <Suspense>
      <div>
        <div className="mb-5">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg">Create New Relation</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <div className="mt-4 bg-white rounded-xl p-5">
            <div className="font-bold text-primary mb-5">Relation Data</div>
            <div className="border-2 border-primary mb-4"></div>
            <FormRelation id={params.id.toString()} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AddRelationPage;
