"use client";
import { Breadcrumb, Button } from "antd";
import TableComponent from "@root/app/components/Table";
import { useRouter } from "next/navigation";
import { ExportOutlined } from "@ant-design/icons";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { deletePosition } from "@root/libs/store/thunk/position";
import AddButton from "@root/app/components/AddButton";
import { getPermissionAsList } from "@root/libs/store/thunk/permission";
import dayjs from "dayjs";
import { getClaim } from "@root/libs/store/thunk/claim";
import { ClaimType } from "@root/libs/types/claim";
import { formatCurrency } from "@root/libs/utils/fomatter";
import EditButton from "@root/app/components/EditButton";
import DeleteButton from "@root/app/components/DeleteButton";
import DynamicModal from "@root/app/components/DynamicModal";

const PermissionPage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const { claims, loading }: { claims: ClaimType[]; loading: boolean } =
    useAppSelector((state) => state.claim);

  const [showModal, setShowModal] = useState(false);

  const [param, setParam] = useState({
    page: 1,
    limit: 10,
  });

  const breadcrumb = [
    {
      href: "#",
      title: "Forms",
    },
    {
      href: "/forms/claims",
      title: "Claims",
    },
  ];

  useEffect(() => {
    dispatch(getClaim(param));
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
      render: (text: string, rec: any, index: number) => index + 1,
      width: 50,
      sorter: true,
    },
    {
      key: "status",
      dataIndex: "status",
      title: (
        <div className="w-[15px] h-[15px] rounded-full border border-2-black"></div>
      ),
      width: 10,
      render: (text: string, rec: ClaimType) => {
        if (
          rec.is_approve_supervisor === 0 &&
          rec.is_approve_personalia === 0 &&
          rec.is_approve_fa === 0
        ) {
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
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
      width: 250,
      sorter: true,
    },
    {
      key: "user",
      dataIndex: "user",
      title: "User",
      render: (text: string, record: any) => record.user.name,
      width: 150,
      sorter: true,
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
      width: 100,
      sorter: true,
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
      width: 100,
      sorter: true,
    },
    {
      key: "category",
      dataIndex: "category",
      title: "Category",
      width: 100,
      sorter: true,
    },
    {
      key: "amount",
      dataIndex: "amount",
      title: "Amount",
      render: (text: number) => formatCurrency(text, "IDR"),
      width: 100,
      sorter: true,
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Description",
      width: 200,
      sorter: true,
    },
    {
      key: "attachment",
      dataIndex: "attachments",
      title: "Attachment",
      render: (text: string, record: any) => {
        if (record.attachments !== null) {
          return (
            <div className="flex justify-center items-center gap-2">
              <Button
                onClick={() => setShowModal(true)}
                className="bg-[#1572A140] rounded-lg text-[#1572A1] cursor-pointer"
              >
                <ExportOutlined />
              </Button>
            </div>
          );
        }
      },
      width: 200,
    },
    {
      key: "superior",
      dataIndex: "is_approve_supervisor",
      title: "Superior",
      render: (text: boolean) => {
        if (text === true) {
          return (
            <div className="flex gap-2 text-[#01A037] items-center">
              <div
                className={`w-[15px] h-[15px] rounded-full border border-2-black bg-[#01A037]`}
              ></div>
              <span>Approved</span>
            </div>
          );
        } else {
          return (
            <div className="flex gap-2 text-[#5C6880] items-center">
              <div
                className={`w-[15px] h-[15px] rounded-full border border-2-black bg-[#5C6880]`}
              ></div>
              <span>Pending</span>
            </div>
          );
        }
      },
      width: 100,
      sorter: true,
    },
    {
      key: "personalia",
      dataIndex: "is_approve_personalia",
      title: "Personalia",
      render: (text: boolean) => {
        if (text === true) {
          return (
            <div className="flex gap-2 text-[#01A037] items-center">
              <div
                className={`w-[15px] h-[15px] rounded-full border border-2-black bg-[#01A037]`}
              ></div>
              <span>Approved</span>
            </div>
          );
        } else {
          return (
            <div className="flex gap-2 text-[#5C6880] items-center">
              <div
                className={`w-[15px] h-[15px] rounded-full border border-2-black bg-[#5C6880]`}
              ></div>
              <span>Pending</span>
            </div>
          );
        }
      },
      width: 100,
      sorter: true,
    },
    {
      key: "fna",
      dataIndex: "is_approve_fa",
      title: "FnA",
      render: (text: boolean) => {
        if (text === true) {
          return (
            <div className="flex gap-2 text-[#01A037] items-center">
              <div
                className={`w-[15px] h-[15px] rounded-full border border-2-black bg-[#01A037]`}
              ></div>
              <span>Approved</span>
            </div>
          );
        } else {
          return (
            <div className="flex gap-2 text-[#5C6880] items-center">
              <div
                className={`w-[15px] h-[15px] rounded-full border border-2-black bg-[#5C6880]`}
              ></div>
              <span>Pending</span>
            </div>
          );
        }
      },
      width: 100,
      sorter: true,
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
      render: (text: string, rec: any) => {
        return (
          <div className="flex justify-center items-center gap-2">
            <EditButton destinationPage={`/forms/claims/edit/${rec.id}`} />
            <DeleteButton handleDelete={() => handleDelete(rec.id)} />
          </div>
        );
      },
      width: 100,
      sorter: true,
    },
  ];

  return (
    <Suspense>
      <div>
        <div className="mb-5">
          <div className="flex mb-5 justify-between">
            <div>
              <p className="font-bold text-lg">Claims</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <AddButton
                label="Add Claim"
                destinationPage="/forms/claims/create"
              />
            </div>
          </div>
          <div>
            <TableComponent
              loading={loading}
              columns={column}
              dataSource={claims}
              scroll={{ x: 1000 }}
              bordered
            />
          </div>
        </div>
      </div>
      <DynamicModal
        isVisible={showModal}
        title="Attachment"
        width={1000}
        onCancel={() => setShowModal(false)}
        content={
          <iframe
            className="w-full h-[500px]"
            src="https://pii.or.id/uploads/dummies.pdf"
          />
        }
        onHideModal={() => setShowModal(false)}
      />
    </Suspense>
  );
};
export default PermissionPage;
