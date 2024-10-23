"use client";
import AddButton from "@root/app/components/AddButton";
import DeleteButton from "@root/app/components/DeleteButton";
import EditButton from "@root/app/components/EditButton";
import TableComponent from "@root/app/components/Table";
import { Breadcrumb } from "antd";
import dayjs from "dayjs";
import { Suspense, useEffect } from "react";
import MainLayoutLoading from "../../loading";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  deleteAttendProblem,
  fetchAttendProblems,
} from "@root/libs/store/thunk/attend-problem";

const Page = () => {
  const dispatch = useAppDispatch();
  const breadcrumb = [
    {
      href: "#",
      title: "Forms",
    },
    {
      href: "/forms/attend-problem",
      title: "Attend Problem",
    },
  ];

  const { attendProblems, loading } = useAppSelector(
    (state) => state.attendProblem
  );

  useEffect(() => {
    dispatch(fetchAttendProblems());
  }, []);

  const handleDelete = async (id: string) => {
    await dispatch(deleteAttendProblem(id));
  };

  const column = [
    {
      key: "created_at",
      dataIndex: "created_at",
      title: "Created",
      width: 10,
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
      width: 100,
      sorter: true,
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      key: "to",
      dataIndex: "date",
      title: "To",
      width: 100,
      sorter: true,
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      key: "is_supervisor_approved",
      dataIndex: "is_supervisor_approved",
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
      key: "is_personalia_approved",
      dataIndex: "is_personalia_approved",
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
      key: "action",
      dataIndex: "action",
      title: "Action",
      render: (text: string, rec: any) => {
        return (
          <div className="flex justify-center items-center gap-2">
            <EditButton
              destinationPage={`/forms/attend-problem/edit/${rec.id}`}
            />
            <DeleteButton handleDelete={() => handleDelete(rec.id)} />
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
              <p className="font-bold text-lg">Attend Problem</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <AddButton
                label="Add New Attend Problem"
                destinationPage="/forms/attend-problem/create"
              />
            </div>
          </div>
          <div>
            <TableComponent
              rowSelection={{
                type: "checkbox",
              }}
              loading={loading}
              withLengthOption={true}
              withExport={true}
              columns={column}
              dataSource={attendProblems}
              scroll={{ x: "auto" }}
              bordered
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default Page;
