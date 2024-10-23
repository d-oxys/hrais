"use client";
import { Breadcrumb, Button, Popconfirm, Modal } from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TableComponent from "@root/app/components/Table";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import AddButton from "@root/app/components/AddButton";
import {
  deleteRelation,
  getRelationList,
  deleteRelationAll,
} from "@root/libs/store/thunk/relation";
import { RelationType } from "@root/libs/store/slices/relation.slice";
import PermissionWrapper from "@root/libs/hooks/PermissionWrapper";

const RelationPage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const {
    relations,
    loading,
    pagination,
  }: { relations: RelationType[]; loading: boolean; pagination: any } =
    useAppSelector((state) => state.relation);

  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<{ name?: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);

  const breadcrumb = [
    {
      href: "#",
      title: "Settings",
    },
    {
      href: "/settings/relation",
      title: "Relations",
    },
  ];

  useEffect(() => {
    dispatch(getRelationList(limit, currentPage, searchParams.name)).catch(
      (error) => {
        console.error("Error fetching relations:", error);
      }
    );
  }, [dispatch, limit, currentPage, searchParams]);

  useEffect(() => {
    setTotalPage(pagination.total);
  }, [pagination]);

  const handleDeleteKaryawan = (id: any) => {
    dispatch(deleteRelation(id))
      .then(() => {
        setShowModal(false);
        dispatch(getRelationList(limit, currentPage, searchParams.name));
      })
      .catch((error) => {
        console.error("Error deleting karyawan:", error);
      });
  };

  const handleDelete = (id: any) => {
    dispatch(getRelationList(limit, currentPage, searchParams.name));
    dispatch(deleteRelationAll(id));
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

  const handleView = (karyawans: any[]) => {
    setSelectedEmployees(karyawans);
    setShowModal(true);
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
      key: "superior",
      dataIndex: "atasan",
      title: "Superior",
      render: (text: string, record: RelationType) => {
        return `${record.atasan.nip} - ${record.atasan.name}`;
      },
    },
    {
      key: "view",
      dataIndex: "view",
      title: "View Employees",
      width: 150,
      render: (text: string, record: any) => {
        return (
          <div className="text-center flex justify-center w-full cursor-pointer">
            <PermissionWrapper
              moduleName="Settings"
              functionName="Relation"
              action="read"
            >
              <Button
                className="bg-primary/25 rounded-lg text-primary cursor-pointer"
                onClick={() => handleView(record.karyawans)}
              >
                <EyeOutlined />
              </Button>
            </PermissionWrapper>
          </div>
        );
      },
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
              functionName="Relation"
              action="create"
            >
              <Button
                className="bg-primary/25 rounded-lg text-primary cursor-pointer"
                onClick={() =>
                  route.push(`/settings/relation/add/${record.atasan.id}`)
                }
              >
                <PlusOutlined />
              </Button>
            </PermissionWrapper>

            <PermissionWrapper
              moduleName="Settings"
              functionName="Relation"
              action="delete"
            >
              <Popconfirm
                title="Delete data"
                description="Are you sure to delete this data?"
                onConfirm={() => handleDelete(record.atasan.id)}
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

  const employeeColumns = [
    {
      key: "index",
      title: "#",
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      key: "employee",
      title: "Employee",
      render: (text: string, record: any) =>
        `${record.karyawan.nip} - ${record.karyawan.name}`,
    },
    {
      key: "action",
      width: 170,
      title: "Action",
      dataIndex: null,
      render: (text: string, record: any) => {
        return (
          <div className="flex gap-2 justify-center">
            {/* Only render the Delete button for employee if the user has 'delete' permission for 'Relation' */}
            <PermissionWrapper
              moduleName="Settings"
              functionName="Relation"
              action="delete"
            >
              <Popconfirm
                title="Delete data"
                description="Are you sure to delete this data?"
                onConfirm={() => handleDeleteKaryawan(record.karyawan.id)}
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
              <p className="font-bold text-lg">Relations</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              {/* Only render the Add New Relation button if the user has 'create' permission for 'Relation' */}
              <PermissionWrapper
                moduleName="Settings"
                functionName="Relation"
                action="create"
              >
                <AddButton
                  label="Add New Relation"
                  destinationPage="/settings/relation/create"
                />
              </PermissionWrapper>
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
              dataSource={relations}
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

        {/* Modal untuk menampilkan karyawan */}
        <Modal
          title="Employees"
          visible={showModal}
          onCancel={() => setShowModal(false)}
          footer={null}
        >
          <TableComponent
            bordered
            columns={employeeColumns}
            dataSource={selectedEmployees}
            loading={false}
            rowKey={(record) => record.karyawan.nip}
            pagination={false}
            withExport={false}
            withLengthOption={false}
            tableOnly={true}
            className="max-h-[80vh] overflow-y-auto"
          />
        </Modal>
      </div>
    </Suspense>
  );
};

export default RelationPage;
