"use client";
import { Breadcrumb } from "antd";
import TableComponent from "@root/app/components/Table";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { deletePosition } from "@root/libs/store/thunk/position";
import AddButton from "@root/app/components/AddButton";
import { getPermissionAsList } from "@root/libs/store/thunk/permission";
import dayjs from "dayjs";

const PermissionPage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const { permissions }: { permissions: any[] } = useAppSelector(
    (state) => state.permission
  );

  const breadcrumb = [
    {
      href: "#",
      title: "Forms",
    },
    {
      href: "/forms/permission-as",
      title: "Permission As",
    },
  ];

  useEffect(() => {
    dispatch(getPermissionAsList());
  }, []);

  const handleDelete = (id: string) => {
    dispatch(deletePosition(id));
    dispatch(getPermissionAsList());
  };

  const column = [
    {
      key: "rownum",
      dataIndex: "rownum",
      title: "#",
      render: (text: string, rec: any, index: number) =>
        (1 - 1) * 10 + index + 1,
      sorter: true,
      width: 10,
    },
    {
      key: "status",
      dataIndex: "status",
      title: (
        <div className="w-[15px] h-[15px] rounded-full border border-2-black"></div>
      ),
      width: 10,
      render: (text: string) => {
        if (text === "0") {
          return (
            <div
              className={`w-[15px] h-[15px] rounded-full border border-2-black bg-[#5C6880]`}
            ></div>
          );
        }
      },
    },
    {
      key: "created",
      dataIndex: "created_at",
      title: "Created",
      width: 200,
      render: (text: string, record: any) =>
        dayjs(text).format("DD MMM YYYY HH:mm:ss"),
    },
    {
      key: "from_date",
      dataIndex: "from_date",
      title: "From Date",
      width: 200,
      render: (text: string, record: any) =>
        dayjs(record.permission_date?.fromdatetime).format(
          "DD MMM YYYY HH:mm:ss"
        ),
    },
    {
      key: "to_date",
      dataIndex: "to_date",
      title: "To Date",
      width: 200,
      render: (text: string, record: any) =>
        dayjs(record.permission_date?.todatetime).format(
          "DD MMM YYYY HH:mm:ss"
        ),
    },
    {
      key: "date_diff",
      dataIndex: "date_diff",
      title: "Date Diff",
      width: 120,
      render: (text: string, record: any) => record.permission_date?.datediff,
    },
    {
      key: "form_type",
      dataIndex: "type",
      title: "Form Type",
      width: 200,
    },
    {
      key: "category",
      dataIndex: "category",
      title: "Category",
      width: 200,
    },
    {
      key: "reason",
      dataIndex: "reason",
      title: "Reason",
      width: 200,
    },
  ];

  return (
    <Suspense>
      <div>
        <div className="mb-5">
          <div className="flex mb-5 justify-between">
            <div>
              <p className="font-bold text-lg">Permission As</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <AddButton
                label="Add Permission As"
                destinationPage="/forms/permission-as/create"
              />
            </div>
          </div>
          <div>
            <TableComponent columns={column} dataSource={permissions} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default PermissionPage;
