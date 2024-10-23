"use client";
import { Breadcrumb, Button, Popconfirm, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import TableComponent from "@root/app/components/Table";
import { useEffect, useState, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  deleteFunction,
  getFunctionList,
  setFunctionUpdateStatus,
} from "@root/libs/store/thunk/function";
import AddButton from "@root/app/components/AddButton";
import DropdownStatus from "@root/app/components/DropdownStatus";
import EditButton from "@root/app/components/EditButton";
import { capitalizeEachWord } from "@root/libs/utils";

const FunctionPage = () => {
  const dispatch = useAppDispatch();
  const functions = useAppSelector((state) => state.function.functions);
  const loading = useAppSelector((state) => state.function.loading);
  const pagination = useAppSelector((state) => state.function.pagination);

  const [updatedStatus, setUpdatedStatus] = useState<{ [key: number]: string }>(
    {}
  );
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<{ name?: string }>({});
  const breadcrumb = [
    {
      href: "#",
      title: "Settings",
    },
    {
      href: "/settings/roles/function",
      title: "Function",
    },
  ];
  useEffect(() => {
    dispatch(getFunctionList(limit, currentPage, searchParams.name)).catch(
      (error) => {
        console.error("Error fetching functions:", error);
      }
    );
  }, [dispatch, limit, currentPage, searchParams]);

  const handleDelete = (id: string) => {
    dispatch(deleteFunction(id)).then(() => {
      window.location.reload();
    });
  };

  const handleSearch = (value: string) => {
    setSearchParams({ name: value });
    setCurrentPage(1);
    dispatch(getFunctionList(limit, 1, value));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(getFunctionList(limit, page, searchParams.name));
  };

  const handleRowLengthChange = (value: number) => {
    setLimit(value);
    setCurrentPage(1);
    dispatch(getFunctionList(value, 1, searchParams.name));
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const capitalizedStatus = capitalizeEachWord(status);
      const result = await dispatch(
        setFunctionUpdateStatus(
          id,
          capitalizedStatus as "Aktif" | "Tidak Aktif"
        )
      );
      if (result && result.success) {
        setUpdatedStatus((prev) => ({ ...prev, [id]: capitalizedStatus }));
        window.location.reload();
      } else {
        console.error("Failed to update status:", result.error);
      }
    } catch (error) {
      console.error("Error occurred during status update:", error);
    }
  };

  const column = [
    {
      key: "rownum",
      dataIndex: "rownum",
      title: "#",
      render: (_: string, __: any, index: number) =>
        (currentPage - 1) * limit + index + 1,
      width: 50,
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      width: 200,
    },
    {
      key: "url",
      dataIndex: "url",
      title: "URL",
      width: 200,
    },
    {
      key: "module",
      title: "Module",
      render: (text: string, record: any) => record.module?.name || "N/A",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      render: (value: string, record: any) => (
        <DropdownStatus
          initialValue={updatedStatus[record.id] || value}
          id={record.id}
          statusOptions={[
            { value: "Tidak Aktif", label: "Tidak Aktif" },
            { value: "Aktif", label: "Aktif" },
          ]}
          onChangeStatus={handleStatusChange}
        />
      ),
    },
    {
      key: "action",
      width: 170,
      title: "Action",
      render: (text: string, record: any) => (
        <div className="flex gap-2 justify-center">
          <EditButton
            destinationPage={`/settings/roles/function/edit/${record.id}`}
          />
          <Popconfirm
            title="Delete function"
            description="Are you sure to delete this function?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="bg-danger/25 rounded-lg text-danger cursor-pointer">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Suspense>
      <div>
        <div className="mb-5">
          <div className="flex mb-5 justify-between">
            <div>
              <p className="font-bold text-lg">Functions</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <AddButton
                label="Add Function"
                destinationPage="/settings/roles/function/create"
              />
            </div>
          </div>
          <div>
            <TableComponent
              loading={loading}
              rowSelection={{
                type: "checkbox",
              }}
              bordered
              columns={column}
              dataSource={functions}
              withExport={false}
              withLengthOption={true}
              handleChangeRowLength={handleRowLengthChange}
              handleSearch={handleSearch}
              currentPage={currentPage}
              totalPage={pagination.total}
              perPage={limit}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default FunctionPage;
