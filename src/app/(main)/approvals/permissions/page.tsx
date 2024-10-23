"use client";
import { Avatar, Breadcrumb, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import TableComponent from "@root/app/components/Table";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { deletePosition } from "@root/libs/store/thunk/position";
import AddButton from "@root/app/components/AddButton";
import {
  createApprovalPermission,
  getApprovalPermissionList,
  getPermissionList,
} from "@root/libs/store/thunk/permission";
import dayjs from "dayjs";
import DynamicModal from "@root/app/components/DynamicModal";
import ApproveButton from "@root/app/components/ApprovalButtons/ApproveButton";
import RejectButton from "@root/app/components/ApprovalButtons/RejectButton";
import ModalDetailEmployee from "../../employee/components/ModalDetailEmployee";

const ApprovalPermissionPage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const {
    permissions,
    loading,
    pagination: { currentPage, totalPage },
  }: {
    permissions: any[];
    loading: boolean;
    pagination: {
      currentPage: number;
      totalPage: number;
    };
  } = useAppSelector((state) => state.permission);

  const [fileAttachment, setFileAttachment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>({});
  const [params, setParams] = useState<{
    page: number;
    limit: number;
    search?: string;
  }>({
    page: 1,
    limit: 10,
  });

  const breadcrumb = [
    {
      href: "#",
      title: "Forms",
    },
    {
      href: "/forms/permissions",
      title: "Permissions",
    },
  ];

  useEffect(() => {
    dispatch(getApprovalPermissionList(params));
  }, []);

  const handleDelete = (id: string) => {
    dispatch(deletePosition(id));
    dispatch(getPermissionList());
  };

  const handleApprove = async (status: number, id: string) => {
    await dispatch(
      createApprovalPermission({
        status: status,
        ids: [id],
      })
    );
    await dispatch(getApprovalPermissionList(params));
  };

  const handleSearch = async (param: string) => {
    setParams({ ...params, search: param });
  };

  useEffect(() => {
    dispatch(getApprovalPermissionList(params));
  }, [params]);

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
      key: "id",
      dataIndex: "id",
      title: "ID",
      sorter: true,
      width: 50,
    },
    {
      key: "nip",
      dataIndex: "nip",
      title: "NIP",
      render: (text: string, rec: any, index: number) => rec.user?.nip,
      sorter: true,
      width: 50,
    },

    {
      key: "user",
      dataIndex: "user",
      title: "User",
      // render: (text: string, record: any) => record.user.name,
      render: (value: string, record: any) => {
        return (
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={() => {
              setIsOpenDetail(!isOpenDetail);
              setSelectedData(record);
            }}
          >
            <div className="flex items-center justify-center">
              <Avatar size={50} />
            </div>
            <div>
              <div>{record?.user?.name}</div>
            </div>
          </div>
        );
      },
      width: 250,
      sorter: true,
    },
    {
      key: "status",
      dataIndex: "status",
      title: (
        <div className="w-[15px] h-[15px] rounded-full border border-2-black"></div>
      ),
      width: 10,
      render: (text: string, record: any) => {
        if (
          record.supervisor_approval == "0" ||
          record.personalia_approval == "0" ||
          record.fa_approval == "0"
        ) {
          return (
            <div
              className={`w-[15px] h-[15px] rounded-full border border-2-black bg-[#5C6880]`}
            ></div>
          );
        } else if (
          record.supervisor_approval == "1" &&
          record.personalia_approval == "1" &&
          record.fa_approval == "1"
        ) {
          return (
            <div
              className={`w-[15px] h-[15px] rounded-full border border-2-black bg-[#01A037]`}
            ></div>
          );
        } else if (
          record.supervisor_approval == "2" ||
          record.personalia_approval == "2" ||
          record.fa_approval == "2"
        ) {
          return (
            <div
              className={`w-[15px] h-[15px] rounded-full border border-2-black bg-danger`}
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
        dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      key: "from_date",
      dataIndex: "from_date",
      title: "From Date",
      width: 200,
      render: (text: string, record: any) =>
        dayjs(record.permission_date?.fromdatetime).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
    },
    {
      key: "to_date",
      dataIndex: "to_date",
      title: "To Date",
      width: 200,
      render: (text: string, record: any) =>
        dayjs(record.permission_date?.todatetime).format("YYYY-MM-DD HH:mm:ss"),
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
    {
      key: "attachment",
      dataIndex: "attachments",
      title: "Attachment",
      width: 50,
      render: (text: string, record: any) => {
        if (record.permission_document !== null) {
          return (
            <div className="flex justify-center items-center gap-2">
              <Button
                onClick={() => {
                  setFileAttachment(record.permission_document?.file);
                  setShowModal(true);
                }}
                className="bg-[#1572A140] rounded-lg text-[#1572A1] cursor-pointer"
              >
                <ExportOutlined />
              </Button>
            </div>
          );
        }
      },
    },
    {
      key: "superior",
      dataIndex: "supervisor_approval",
      title: "Superior",
      render: (text: any) => {
        if (text == 1) {
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
      dataIndex: "personalia_approval",
      title: "Personalia",
      render: (text: any) => {
        if (text == 1) {
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
      dataIndex: "fa_approval",
      title: "FnA",
      render: (text: any) => {
        if (text == 1) {
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
            <ApproveButton handleApprove={() => handleApprove(1, rec.id)} />
            <RejectButton handleReject={() => handleApprove(2, rec.id)} />
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
              <p className="font-bold text-lg">Permission</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <div>
            <TableComponent
              rowKey={(record) => record.id}
              columns={column}
              dataSource={permissions}
              withExport={false}
              withLengthOption={true}
              loading={loading}
              scroll={{ x: 2500 }}
              bordered
              multiSelect
              onApproval={{
                action: createApprovalPermission,
                callback: async () => {
                  await dispatch(getApprovalPermissionList(params));
                },
              }}
              currentPage={currentPage}
              totalPage={totalPage}
              handleSearch={handleSearch}
              handleChangeRowLength={(value: number) => {
                setParams({ ...params, limit: value });
              }}
              floatingButton={{
                approveButton: true,
                rejectButton: true,
              }}
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
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${String(fileAttachment)}`}
          />
        }
        onHideModal={() => setShowModal(false)}
      />
      <ModalDetailEmployee
        open={isOpenDetail}
        onCancel={() => setIsOpenDetail(false)}
        employeeData={selectedData}
      />
    </Suspense>
  );
};
export default ApprovalPermissionPage;
