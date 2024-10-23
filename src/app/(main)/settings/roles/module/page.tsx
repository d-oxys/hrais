"use client";
import { Breadcrumb, Button, Popconfirm, Input } from "antd";
import { FormOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "@root/app/components/Table";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  deleteModule,
  getModuleListWithoutFunctions,
  setModuleStatusUpdadate,
} from "@root/libs/store/thunk/module";
import AddButton from "@root/app/components/AddButton";
import DropdownStatus from "@root/app/components/DropdownStatus";
import EditButton from "@root/app/components/EditButton";
import router from "next/router";
import { capitalizeEachWord } from "@root/libs/utils";

const ModulePage = () => {
  const dispatch = useAppDispatch();
  const modules = useAppSelector((state) => state.module.modules);
  const loading = useAppSelector((state) => state.module.loading);
  const pagination = useAppSelector((state) => state.module.pagination);
  const route = useRouter();

  const [updatedStatus, setUpdatedStatus] = useState<{ [key: number]: string }>(
    {}
  );
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<{ name?: string }>({});

  useEffect(() => {
    dispatch(
      getModuleListWithoutFunctions(limit, currentPage, searchParams.name)
    ).catch((error) => {
      console.error("Error fetching modules:", error);
    });
  }, [dispatch, limit, currentPage, searchParams]);

  const breadcrumb = [
    {
      href: "#",
      title: "Settings",
    },
    {
      href: "/settings/module",
      title: "Module",
    },
  ];

  const handleDelete = (id: string) => {
    dispatch(deleteModule(id)).then(() => {
      window.location.reload();
    });
  };

  const handleSearch = (value: string) => {
    setSearchParams({ name: value });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(getModuleListWithoutFunctions(limit, page, searchParams.name));
  };

  const handleRowLengthChange = (value: number) => {
    setLimit(value);
    setCurrentPage(1);
    dispatch(getModuleListWithoutFunctions(value, 1, searchParams.name));
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const capitalizedStatus = capitalizeEachWord(status);
      const result = await dispatch(
        setModuleStatusUpdadate(
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
      sorter: true,
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
      key: "icon",
      dataIndex: "icon",
      title: "Icon",
      width: 100,
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      width: 100,
      render: (value: string, record: any) => {
        return (
          <DropdownStatus
            initialValue={updatedStatus[record.id] || value}
            id={record.id}
            statusOptions={[
              { value: "Tidak Aktif", label: "Tidak Aktif" },
              { value: "Aktif", label: "Aktif" },
            ]}
            onChangeStatus={handleStatusChange}
          />
        );
      },
    },
    {
      key: "action",
      width: 170,
      title: "Action",
      dataIndex: null,
      render: (text: string, record: any) => (
        <div className="flex gap-2 justify-center">
          <EditButton
            destinationPage={`/settings/roles/module/edit/${record.id}`}
          />
          <Popconfirm
            title="Delete module"
            description="Are you sure to delete this module?"
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
              <p className="font-bold text-lg">Modules</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <AddButton
                label="Add Module"
                destinationPage="/settings/roles/module/create"
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
              dataSource={modules}
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

export default ModulePage;
