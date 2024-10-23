"use client";
import { Avatar, Breadcrumb, Button } from "antd";
import TableComponent from "@root/app/components/Table";
import { useRouter } from "next/navigation";
import { ExportOutlined } from "@ant-design/icons";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  approvalClaim,
  getClaimApprovalList,
} from "@root/libs/store/thunk/claim";
import { ClaimType } from "@root/libs/types/claim";
import DynamicModal from "@root/app/components/DynamicModal";
import ModalDetailEmployee from "../../employee/components/ModalDetailEmployee";
import ApproveButton from "@root/app/components/ApprovalButtons/ApproveButton";
import RejectButton from "@root/app/components/ApprovalButtons/RejectButton";

const ApprovalClaimPage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const {
    claims,
    loading,
    pagination: { totalPage, currentPage },
  }: {
    claims: ClaimType[];
    loading: boolean;
    pagination: {
      totalPage: number;
      currentPage: number;
    };
  } = useAppSelector((state) => state.claim);

  const [showModal, setShowModal] = useState(false);
  const [fileAttachment, setFileAttachment] = useState<string | null>(null);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>({});
  const [params, setParams] = useState<{
    search?: string;
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });

  const breadcrumb = [
    {
      href: "#",
      title: "Approval",
    },
    {
      href: "/approvals/claims",
      title: "Claims",
    },
  ];

  useEffect(() => {
    dispatch(getClaimApprovalList(params));
  }, []);

  const handleApproval = async (status: number, id: string) => {
    await dispatch(
      approvalClaim({
        status: status,
        ids: [id],
      })
    );
    await dispatch(getClaimApprovalList(params));
  };

  const handleSearch = (param: string) => {
    setParams({ ...params, search: param });
  };

  useEffect(() => {
    dispatch(getClaimApprovalList(params));
  }, [params]);

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
      key: "attachment",
      dataIndex: "attachments",
      title: "Attachment",
      width: 50,
      render: (text: string, record: any) => {
        if (record.attachments !== null) {
          return (
            <div className="flex justify-center items-center gap-2">
              <Button
                onClick={() => {
                  setFileAttachment(record.attachments?.attachment);
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
      dataIndex: "is_approve_supervisor",
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
      dataIndex: "is_approve_personalia",
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
      dataIndex: "is_approve_fa",
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
            <ApproveButton handleApprove={() => handleApproval(1, rec.id)} />
            <RejectButton handleReject={() => handleApproval(2, rec.id)} />
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
              <p className="font-bold text-lg">Approval Claims</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <div>
            <TableComponent
              rowKey={(record) => record.id}
              withExport={false}
              withLengthOption={true}
              loading={loading}
              columns={column}
              dataSource={claims}
              scroll={{ x: 1000 }}
              bordered
              multiSelect
              onApproval={{
                action: approvalClaim,
                callback: async () => {
                  await dispatch(getClaimApprovalList(params));
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
export default ApprovalClaimPage;
