"use client";
import { Avatar, Breadcrumb, Button, Col, Popconfirm, Row } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import TableComponent from "@root/app/components/Table";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
// import { MyProfileType } from "@root/libs/store/slices/employee.slice";
import AddButton from "@root/app/components/AddButton";
import DropdownStatus from "@root/app/components/DropdownStatus";
import LoadingComponent from "@root/app/components/Loading";
import SuitcaseIcon from "@root/app/components/icons/suitcase";
import ProfileComponent from "@root/app/components/Profile";
import { useSession } from "next-auth/react";

const MyProfilePage = () => {
  const route = useRouter();
  const { data: user } = useSession() as any;
  const dispatch = useAppDispatch();
  const breadcrumb = [
    {
      href: "#",
      title: "Home",
    },
    {
      href: "/my-profile",
      title: "My Profile",
    },
  ];

  return (
    <Suspense fallback={<LoadingComponent />}>
      <div>
        <div className="mb-5">
          <div className="flex mb-5 justify-between">
            <div>
              <p className="font-bold text-lg">My Profile</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <ProfileComponent user_id={user.user.user.nip} />
        </div>
      </div>
    </Suspense>
  );
};
export default MyProfilePage;
