"use client";
import { Breadcrumb, Button } from "antd";
import { Suspense } from "react";
import MainLayoutLoading from "@root/app/(main)/loading";
import { useParams } from "next/navigation";
import FormClaim from "../../components/FormClaim";

const AddPermissionPage = () => {
  const params = useParams();
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
      href: `/forms/claims/edit/${params.id}`,
      title: "Edit Claim",
    },
  ];
  return (
    <Suspense fallback={<MainLayoutLoading />}>
      <div>
        <div className="mb-5">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg">Edit Claim</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <FormClaim id={params.id.toString()} />
        </div>
      </div>
    </Suspense>
  );
};
export default AddPermissionPage;
