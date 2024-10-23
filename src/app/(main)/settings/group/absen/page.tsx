"use client";
import { Breadcrumb, Button, Popconfirm, Checkbox } from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import TableComponent from "@root/app/components/Table";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  deleteAbsentGroup,
  getAbsentGroupById,
  getAbsentGroupList,
  setGroupStatus,
} from "@root/libs/store/thunk/absentgroup";
import { AbsentGroupType } from "@root/libs/store/slices/absentgroup.slice";
import AddButton from "@root/app/components/AddButton";
import DropdownStatus from "@root/app/components/DropdownStatus";
import DynamicModal from "@root/app/components/DynamicModal";
import PermissionWrapper from "@root/libs/hooks/PermissionWrapper";
import { capitalizeEachWord } from "@root/libs/utils";

const AbsentGroupPage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedAbsentGroup, setSelectedAbsentGroup] =
    useState<AbsentGroupType | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<{ [key: number]: string }>(
    {}
  );
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<{ name?: string }>({});
  const [sortOrder, setSortOrder] = useState<{
    key: string;
    order: "asc" | "desc" | null;
  }>({ key: "", order: null });

  const {
    absentgroups,
    absentgroup,
    loading,
    pagination,
  }: {
    absentgroups: AbsentGroupType[];
    absentgroup: AbsentGroupType | null;
    loading: boolean;
    pagination: any;
  } = useAppSelector((state) => state.absentgroup);

  const breadcrumb = [
    {
      href: "#",
      title: "Settings",
    },
    {
      href: "/settings/group/absen",
      title: "Absent Group",
    },
  ];

  useEffect(() => {
    dispatch(getAbsentGroupList(limit, currentPage, searchParams.name)).catch(
      (error) => {
        console.error("Error fetching absent groups:", error);
      }
    );
  }, [dispatch, limit, currentPage, searchParams]);

  useEffect(() => {
    setTotalPage(pagination.total);
  }, [pagination]);

  const handleDelete = (id: string) => {
    dispatch(deleteAbsentGroup(id));
    dispatch(getAbsentGroupList(limit, currentPage, searchParams.name));
  };

  const handleEdit = (id: string) => {
    route.push(`/settings/group/absen/edit/${id}`);
  };

  const handleView = async (id: string) => {
    await dispatch(getAbsentGroupById(id));
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal && absentgroup) {
      setSelectedAbsentGroup(absentgroup);
    }
  }, [showModal, absentgroup]);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const capitalizedStatus = capitalizeEachWord(status);
      const result = await dispatch(
        setGroupStatus(id, capitalizedStatus as "Aktif" | "Tidak Aktif")
      );
      if (result && result.success) {
        setUpdatedStatus((prev) => ({ ...prev, [id]: capitalizedStatus }));
      } else {
        console.error("Failed to update status:", result.error);
      }
    } catch (error) {
      console.error("Error occurred during status change:", error);
    }
  };

  const handleRowLengthChange = (value: number) => {
    setCurrentPage(1);
    setLimit(value);
  };

  const handleSearch = (value: string) => {
    setSearchParams({ name: value });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: string) => {
    const order =
      sortOrder.key === key && sortOrder.order === "asc" ? "desc" : "asc";
    setSortOrder({ key, order });
  };

  const sortedAbsentGroups = [...absentgroups].sort((a, b) => {
    if (sortOrder.order === "asc") {
      return a[sortOrder.key] > b[sortOrder.key] ? 1 : -1;
    } else if (sortOrder.order === "desc") {
      return a[sortOrder.key] < b[sortOrder.key] ? 1 : -1;
    }
    return 0;
  });

  const isChecked = (day: string) =>
    selectedAbsentGroup?.daysOff?.includes(day);

  const column = [
    {
      key: "rownum",
      dataIndex: "rownum",
      title: "#",
      render: (_: string, __: any, index: number) => index + 1,
      sorter: true,
      width: 50,
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Absent Group Name",
      width: 200,
      sorter: true,
      onHeaderCell: () => ({ onClick: () => handleSort("name") }),
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Description",
      width: 300,
      sorter: true,
      onHeaderCell: () => ({ onClick: () => handleSort("description") }),
    },
    {
      key: "detail",
      dataIndex: "detail",
      title: "Detail",
      width: 300,
      render: (text: string, record: any) => (
        <div className="flex justify-center">
          <PermissionWrapper
            moduleName="Settings"
            functionName="Absent Group"
            action="read"
          >
            <Button
              className="bg-primary/25 rounded-lg text-primary cursor-pointer"
              onClick={() => handleView(record.id)}
            >
              <EyeOutlined />
            </Button>
          </PermissionWrapper>
        </div>
      ),
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      width: 100,
      render: (_: string, record: any) => (
        <div className="flex justify-center">
          <PermissionWrapper
            moduleName="Settings"
            functionName="Absent Group"
            action="update"
          >
            <DropdownStatus
              initialValue={updatedStatus[record.id] || record.status}
              id={record.id}
              statusOptions={[
                { value: "Tidak Aktif", label: "Tidak Aktif" },
                { value: "Aktif", label: "Aktif" },
              ]}
              onChangeStatus={handleStatusChange}
            />
          </PermissionWrapper>
        </div>
      ),
    },
    {
      key: "action",
      width: 170,
      title: "Action",
      dataIndex: null,
      render: (text: string, record: any) => (
        <div className="flex gap-2 justify-center">
          <PermissionWrapper
            moduleName="Settings"
            functionName="Absent Group"
            action="update"
          >
            <Button
              className="bg-primary/25 rounded-lg text-primary cursor-pointer"
              onClick={() => handleEdit(record.id)}
            >
              <FormOutlined />
            </Button>
          </PermissionWrapper>

          <PermissionWrapper
            moduleName="Settings"
            functionName="Absent Group"
            action="delete"
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
      ),
    },
  ];

  return (
    <Suspense>
      <div>
        <div className="mb-5">
          <div className="flex mb-5 justify-between">
            <div>
              <p className="font-bold text-lg">Absent Group</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <PermissionWrapper
                moduleName="Settings"
                functionName="Absent Group"
                action="create"
              >
                <AddButton
                  label="Add Absent Group"
                  destinationPage="/settings/group/absen/create"
                />
              </PermissionWrapper>
            </div>
          </div>
          <div>
            <TableComponent
              loading={loading}
              bordered
              columns={column}
              dataSource={sortedAbsentGroups} // Use the sorted data
              withExport={false}
              withLengthOption={true}
              handleChangeRowLength={handleRowLengthChange}
              handleSearch={handleSearch}
              currentPage={currentPage}
              totalPage={totalPage}
              perPage={pagination.perPage}
              handlePageChange={handlePageChange}
              rowSelection={{
                type: "checkbox",
              }}
            />
          </div>
        </div>
      </div>
      <DynamicModal
        isVisible={showModal}
        title="Absent Group Details"
        onHideModal={() => setShowModal(false)}
        footer={null}
        content={
          selectedAbsentGroup && (
            <div>
              <p>
                <strong>Days Off: {selectedAbsentGroup.name}</strong>
                <Checkbox.Group
                  value={selectedAbsentGroup.daysOff}
                  className="flex flex-col"
                >
                  <div
                    className={`flex justify-between mb-2 p-2 ${isChecked("Sunday") ? "bg-blue-100" : "bg-gray-100"}`}
                  >
                    <span>Sunday</span>
                    <Checkbox value="Sunday" />
                  </div>
                  <div
                    className={`flex justify-between mb-2 p-2 ${isChecked("Monday") ? "bg-blue-100" : "bg-gray-100"}`}
                  >
                    <span>Monday</span>
                    <Checkbox value="Monday" />
                  </div>
                  <div
                    className={`flex justify-between mb-2 p-2 ${isChecked("Tuesday") ? "bg-blue-100" : "bg-gray-100"}`}
                  >
                    <span>Tuesday</span>
                    <Checkbox value="Tuesday" />
                  </div>
                  <div
                    className={`flex justify-between mb-2 p-2 ${isChecked("Wednesday") ? "bg-blue-100" : "bg-gray-100"}`}
                  >
                    <span>Wednesday</span>
                    <Checkbox value="Wednesday" />
                  </div>
                  <div
                    className={`flex justify-between mb-2 p-2 ${isChecked("Thursday") ? "bg-blue-100" : "bg-gray-100"}`}
                  >
                    <span>Thursday</span>
                    <Checkbox value="Thursday" />
                  </div>
                  <div
                    className={`flex justify-between mb-2 p-2 ${isChecked("Friday") ? "bg-blue-100" : "bg-gray-100"}`}
                  >
                    <span>Friday</span>
                    <Checkbox value="Friday" />
                  </div>
                  <div
                    className={`flex justify-between mb-2 p-2 ${isChecked("Saturday") ? "bg-blue-100" : "bg-gray-100"}`}
                  >
                    <span>Saturday</span>
                    <Checkbox value="Saturday" />
                  </div>
                </Checkbox.Group>
              </p>
            </div>
          )
        }
      />
    </Suspense>
  );
};

export default AbsentGroupPage;
