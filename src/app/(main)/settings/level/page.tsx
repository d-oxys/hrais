"use client";
import { Breadcrumb, Button, Popconfirm } from "antd";
import { FormOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "@root/app/components/Table";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import AddButton from "@root/app/components/AddButton";
import {
  deleteLevel,
  getLevelList,
  setLevelStatus,
} from "@root/libs/store/thunk/level";
import { LevelType, levelActions } from "@root/libs/store/slices/level.slice";
import { formatCurrency } from "@root/libs/utils/fomatter";
import DropdownStatus from "@root/app/components/DropdownStatus";
import PermissionWrapper from "@root/libs/hooks/PermissionWrapper";
import { capitalizeEachWord } from "@root/libs/utils";

const PositionPage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const {
    levels,
    loading,
    pagination,
  }: { levels: LevelType[]; loading: boolean; pagination: any } =
    useAppSelector((state) => state.level);

  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [updatedStatus, setUpdatedStatus] = useState<{ [key: number]: string }>(
    {}
  );
  const [searchParams, setSearchParams] = useState<{ name?: string }>({});

  // State untuk sorting
  const [sorter, setSorter] = useState<{
    field: string;
    order: "asc" | "desc" | null;
  }>({ field: "", order: null });

  const breadcrumb = [
    {
      href: "#",
      title: "Settings",
    },
    {
      href: "/settings/level",
      title: "Level",
    },
  ];

  useEffect(() => {
    dispatch(getLevelList(limit, currentPage, searchParams.name)).catch(
      (error) => {
        console.error("Error fetching levels:", error);
      }
    );
  }, [dispatch, limit, currentPage, searchParams]);

  useEffect(() => {
    setTotalPage(pagination.total);
  }, [pagination]);

  const handleDelete = (id: string) => {
    dispatch(deleteLevel(id));
    dispatch(getLevelList(limit, currentPage, searchParams.name));
  };

  const handleRowLengthChange = (value: number) => {
    setLimit(value);
  };

  const handleSearch = (value: string) => {
    setSearchParams({ name: value });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(1);
    setCurrentPage(page);
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const capitalizedStatus = capitalizeEachWord(status);
      const result = await dispatch(
        setLevelStatus(id, capitalizedStatus as "Aktif" | "Tidak Aktif")
      );

      if (result && result.success) {
        setUpdatedStatus((prev) => ({ ...prev, [id]: capitalizedStatus }));
        console.error("Failed to update status:", result.error);
      }
    } catch (error) {
      console.error("Error occurred during status change:", error);
    }
  };

  const handleSort = (field: string) => {
    let order: "asc" | "desc" = "asc";

    if (sorter.field === field && sorter.order === "asc") {
      order = "desc";
    }

    setSorter({ field, order });

    const sortedLevels = [...levels].sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });

    dispatch(levelActions.setLevel(sortedLevels));
  };

  const column = [
    {
      key: "rownum",
      dataIndex: "rownum",
      title: "#",
      render: (text: string, rec: any, index: number) =>
        (currentPage - 1) * limit + index + 1,
      sorter: true,
      width: 50,
    },
    {
      key: "grade",
      dataIndex: "grade",
      title: "Level A",
      width: 100,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("grade"),
      }),
    },
    {
      key: "level",
      dataIndex: "level",
      title: "Level N",
      width: 100,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("level"),
      }),
    },
    {
      key: "levelEm",
      dataIndex: "levelEm",
      title: "Level Em",
      width: 100,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("levelEm"),
      }),
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Group",
      width: 150,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("type"),
      }),
    },
    {
      key: "category",
      dataIndex: "category",
      title: "Specialist",
      width: 150,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("category"),
      }),
    },
    {
      key: "health_balance",
      dataIndex: "health_balance",
      title: "Health Allowance",
      width: 150,
      render: (text: number) => formatCurrency(text),
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("health_balance"),
      }),
    },
    {
      key: "meal_allowance",
      dataIndex: "meal_allowance",
      title: "Meal Allowance",
      width: 150,
      render: (text: number) => formatCurrency(text),
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("meal_allowance"),
      }),
    },
    {
      key: "transportation_fee",
      dataIndex: "transportation_fee",
      title: "Transportation Fee",
      width: 150,
      render: (text: number) => formatCurrency(text),
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("transportation_fee"),
      }),
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      width: 150,
      render: (value: string, record: any) => {
        return (
          <div className="flex justify-center">
            <DropdownStatus
              initialValue={updatedStatus[record.id] || record.status}
              id={record.id}
              statusOptions={[
                { value: "Tidak Aktif", label: "Tidak Aktif" },
                { value: "Aktif", label: "Aktif" },
              ]}
              onChangeStatus={handleStatusChange}
            />
          </div>
        );
      },
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("status"),
      }),
    },
    {
      key: "action",
      width: 170,
      title: "Action",
      dataIndex: null,
      render: (text: string, record: any) => {
        return (
          <div className="flex gap-2 justify-center">
            <PermissionWrapper
              moduleName="Settings"
              action="update"
              functionName="Level"
            >
              <Button
                className="bg-primary/25 rounded-lg text-primary cursor-pointer"
                onClick={() => route.push(`/settings/level/edit/${record.id}`)}
              >
                <FormOutlined />
              </Button>
            </PermissionWrapper>

            <PermissionWrapper
              moduleName="Settings"
              action="delete"
              functionName="Level"
            >
              <Popconfirm
                title="Delete data"
                description="Are you sure to delete this data?"
                onConfirm={(e) => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button className="bg-danger/25 rounded-lg text-danger cursor-pointer">
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </PermissionWrapper>
          </div>
        );
      },
    },
  ];

  return (
    <Suspense>
      <div>
        <div className="mb-5">
          <div className="flex mb-5 justify-between">
            <div>
              <p className="font-bold text-lg">Level</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <PermissionWrapper
                moduleName="Settings"
                action="create"
                functionName="Level"
              >
                <AddButton
                  label="Add Level"
                  destinationPage="/settings/level/create"
                />
              </PermissionWrapper>
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden">
            <TableComponent
              loading={loading}
              rowSelection={{
                type: "checkbox",
              }}
              bordered
              columns={column}
              dataSource={levels}
              withExport={false}
              withLengthOption={true}
              handleChangeRowLength={handleRowLengthChange}
              handleSearch={handleSearch}
              currentPage={currentPage}
              totalPage={totalPage}
              perPage={pagination.perPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default PositionPage;
