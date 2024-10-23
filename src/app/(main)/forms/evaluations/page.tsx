"use client";
import AddButton from "@root/app/components/AddButton";
import { ExportOutlined } from "@ant-design/icons";
import TableComponent from "@root/app/components/Table";
import { Avatar, Breadcrumb, Button } from "antd";
import { Suspense, useEffect } from "react";
import MainLayoutLoading from "../../loading";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { fetchEvaluationData } from "@root/libs/store/thunk/evaluation";

const Page = () => {
  const dispatch = useAppDispatch();
  const breadcrumb = [
    {
      href: "#",
      title: "Forms",
    },
    {
      href: "/forms/evaluations",
      title: "Evaluations",
    },
  ];

  const { evaluations, loading } = useAppSelector((state) => state.evaluation);

  useEffect(() => {
    // Function to fetch evaluation data
    dispatch(fetchEvaluationData());
  }, []);

  // create 5 json data with field photo, name, join date, start contract date, end contract date, fixed date
  const datas = [
    {
      photo: "photo1.jpg",
      name: "John Doe",
      joinDate: "2023-01-10",
      startContractDate: "2023-01-15",
      endContractDate: "2024-01-14",
      fixedDate: "2023-01-10",
    },
    {
      photo: "photo2.jpg",
      name: "Jane Smith",
      joinDate: "2023-02-20",
      startContractDate: "2023-02-25",
      endContractDate: "2024-02-24",
      fixedDate: "2023-02-20",
    },
    {
      photo: "photo3.jpg",
      name: "Ahmed Khan",
      joinDate: "2023-03-15",
      startContractDate: "2023-03-20",
      endContractDate: "2024-03-19",
      fixedDate: "2023-03-15",
    },
    {
      photo: "photo4.jpg",
      name: "Maria Garcia",
      joinDate: "2023-04-10",
      startContractDate: "2023-04-15",
      endContractDate: "2024-04-14",
      fixedDate: "2023-04-10",
    },
    {
      photo: "photo5.jpg",
      name: "Chen Wei",
      joinDate: "2023-05-05",
      startContractDate: "2023-05-10",
      endContractDate: "2024-05-09",
      fixedDate: "2023-05-05",
    },
  ];

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
      key: "name",
      dataIndex: "name",
      title: "Name",
      width: 200,
      render: (value: string, record: any) => {
        return (
          <div className="flex gap-3 items-center cursor-pointer">
            <div className="flex items-center justify-center">
              <Avatar size={50} />
            </div>
            <div>
              <div>{value}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: "joinDate",
      dataIndex: "joinDate",
      title: "Join",
      width: 100,
      sorter: true,
    },
    {
      key: "startContractDate",
      dataIndex: "startContractDate",
      title: "Start Contract",
      width: 100,
      sorter: true,
    },
    {
      key: "endContractDate",
      dataIndex: "endContractDate",
      title: "End Contract",
      width: 100,
      sorter: true,
    },
    {
      key: "fixedDate",
      dataIndex: "fixedDate",
      title: "Fixed Date",
      width: 100,
      sorter: true,
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
      render: () => {
        return (
          <div className="flex justify-center items-center gap-2">
            <Button className="bg-[#1572A140] rounded-lg text-[#1572A1] cursor-pointer">
              <ExportOutlined />
            </Button>
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
              <p className="font-bold text-lg">Evaluations</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <AddButton
                label="Add New Evaluations"
                destinationPage="/forms/evaluations/create"
              />
            </div>
          </div>
          <div>
            <TableComponent
              loading={loading}
              withLengthOption={true}
              withExport={true}
              columns={column}
              dataSource={datas}
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
