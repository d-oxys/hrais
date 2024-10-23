"use client";
import AddButton from "@root/app/components/AddButton";
import DeleteButton from "@root/app/components/DeleteButton";
import EditButton from "@root/app/components/EditButton";
import TableComponent from "@root/app/components/Table";
import { Avatar, Breadcrumb } from "antd";
import dayjs from "dayjs";
import { Suspense, useEffect, useState } from "react";
import MainLayoutLoading from "../../loading";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  approveAttendProblem,
  deleteAttendProblem,
  fetchAttendProblemApproval,
  fetchAttendProblems,
} from "@root/libs/store/thunk/attend-problem";
import ModalDetailEmployee from "../../employee/components/ModalDetailEmployee";
import ApproveButton from "@root/app/components/ApprovalButtons/ApproveButton";
import RejectButton from "@root/app/components/ApprovalButtons/RejectButton";

const Page = () => {
  const dispatch = useAppDispatch();
  const breadcrumb = [
    {
      href: "#",
      title: "Approvals",
    },
    {
      href: "/approvals/attend-problem",
      title: "Attend Problem",
    },
  ];

  const {
    attendProblems,
    loading,
    pagination: { currentPage, totalPage },
  } = useAppSelector((state) => state.attendProblem);

  const [params, setParams] = useState<{
    search?: string;
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>({});

  useEffect(() => {
    dispatch(fetchAttendProblemApproval(params));
  }, []);

  const handleDelete = async (id: string) => {
    await dispatch(deleteAttendProblem(id));
  };

  const handleApproval = async (status: number, id: string) => {
    await dispatch(
      approveAttendProblem({
        status: status,
        ids: [id],
      })
    );
    await dispatch(fetchAttendProblemApproval(params));
  };

  useEffect(() => {
    dispatch(fetchAttendProblemApproval(params));
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
      key: "created_at",
      dataIndex: "created_at",
      title: "Created",
      width: 200,
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
      width: 150,
      sorter: true,
      render: (text: string) => "Forgot Attend",
    },
    {
      key: "category",
      dataIndex: "category",
      title: "Category",
      width: 100,
      sorter: true,
    },
    {
      key: "from",
      dataIndex: "date",
      title: "From",
      width: 150,
      sorter: true,
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      key: "to",
      dataIndex: "date",
      title: "To",
      width: 150,
      sorter: true,
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      key: "is_supervisor_approved",
      dataIndex: "is_supervisor_approved",
      title: "Superior",
      render: (text: any) => {
        if (text == "1") {
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
      key: "is_personalia_approved",
      dataIndex: "is_personalia_approved",
      title: "Personalia",
      render: (text: any) => {
        if (text == "1") {
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
    <Suspense fallback={<MainLayoutLoading />}>
      <div>
        <div className="mb-5">
          <div className="flex mb-5 justify-between">
            <div>
              <p className="font-bold text-lg">Approval Attend Problem</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <div>
            <TableComponent
              rowSelection={{
                type: "checkbox",
              }}
              loading={loading}
              withLengthOption={true}
              withExport={false}
              columns={column}
              dataSource={attendProblems}
              scroll={{ x: 1500 }}
              bordered
              rowKey={(record) => record.id}
              multiSelect
              onApproval={{
                action: approveAttendProblem,
                callback: async () => {
                  await dispatch(fetchAttendProblemApproval(params));
                },
              }}
              currentPage={currentPage}
              totalPage={totalPage}
              handleSearch={(value: string) => {
                setParams({ ...params, search: value });
              }}
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
      <ModalDetailEmployee
        open={isOpenDetail}
        onCancel={() => setIsOpenDetail(false)}
        employeeData={selectedData}
      />
    </Suspense>
  );
};
export default Page;
