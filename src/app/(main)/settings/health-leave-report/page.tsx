"use client";
import { Breadcrumb, Button, Popconfirm, message } from "antd";
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
import { deletePosition } from "@root/libs/store/thunk/position";
import { getHealthLeaveReportList } from "@root/libs/store/thunk/health-leave-report";
import dayjs from "dayjs";
import { now } from "lodash";
import RemainingLeaveModal from "./components/RemainingLeaveModal";
import { formatCurrency } from "@root/libs/utils/fomatter";

const HealthLeaveReportPage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const {
    healthLeaveReports,
    loading,
  }: { healthLeaveReports: any[]; loading: boolean } = useAppSelector(
    (state) => state.healthLeaveReport
  );

  const [selectedRecord, setSelectedRecord] = useState<any>();
  const [isOpenModalRLB, setIsOpenModalRLB] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [showModalFor, setShowModalFor] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  const breadcrumb = [
    {
      href: "#",
      title: "Settings",
    },
    {
      href: "/settings/health-leave-report",
      title: "Health & Leave Reports",
    },
  ];

  useEffect(() => {
    dispatch(getHealthLeaveReportList());
  }, []);

  const handleDelete = (id: string) => {
    dispatch(deletePosition(id));
    dispatch(getHealthLeaveReportList());
  };

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
      key: "nip",
      dataIndex: "nip",
      title: "NIP",
      render: (text: string, record: any) => {
        return record.user.nip;
      },
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render: (text: string, record: any) => {
        return record.user.name;
      },
    },
    {
      key: "department",
      dataIndex: "department",
      title: "Department",
      render: (text: string, record: any) => {
        return record?.position?.team?.section?.department?.name;
      },
    },
    {
      key: "jobroles",
      dataIndex: "jobroles",
      title: "Job Roles",
      render: (text: string, record: any) => {
        return record?.position?.name;
      },
    },
    {
      key: "leave_year_current",
      dataIndex: "leave_year_current",
      title: "Remaining Leave " + dayjs().format("YYYY"),
      render: (text: string, record: any) => {
        const year = parseInt(dayjs().format("YYYY")) - 1;
        const leave = record.leave_balance.filter(
          (leave: any) => leave.year === dayjs().format("YYYY")
        );
        return (
          <div className="flex justify-center items-center">
            <span
              className="bg-theme-gray text-white rounded-2xl text-center cursor-pointer px-7 py-1"
              onClick={() => {
                setIsOpenModalRLB(true);
                setSelectedRecord({
                  ...record,
                  remaining_leave: leave[0]?.leave_balance ?? 0,
                });
                setSelectedYear(dayjs().format("YYYY"));
                setShowModalFor("leave");
                setModalTitle(`Remaining Leave ${year}`);
              }}
            >
              {leave[0]?.leave_balance ?? "-"}
            </span>
          </div>
        );
      },
    },
    {
      key: "leave_year_before",
      dataIndex: "leave_year_before",
      title: "Remaining Leave " + (parseInt(dayjs().format("YYYY")) - 1),
      render: (text: string, record: any) => {
        const leave = record.leave_balance.filter(
          (leave: any) => leave.year === parseInt(dayjs().format("YYYY")) - 1
        );
        return (
          <div className="flex justify-center items-center">
            <span
              className="bg-theme-gray text-white rounded-2xl text-center cursor-pointer px-7 py-1"
              onClick={() => {
                const year = parseInt(dayjs().format("YYYY")) - 1;
                if (!leave[0]?.leave_balance) {
                  message.error(
                    "Employee doesn't have leave balance at " + year
                  );
                  return false;
                }
                setIsOpenModalRLB(true);
                setSelectedRecord({
                  ...record,
                  remaining_leave: leave[0]?.leave_balance ?? 0,
                });
                setSelectedYear(year.toString());
                setShowModalFor("leave");
                setModalTitle(`Remaining Leave ${year}`);
              }}
            >
              {leave[0]?.leave_balance ?? "-"}
            </span>
          </div>
        );
      },
    },
    {
      key: "health_insurance",
      dataIndex: "health_insurance",
      title: (
        <div>
          Remaining Health
          <br />
          Insurance Balance
        </div>
      ),
      render: (text: string, record: any) => {
        const balance = record.health_balance.filter(
          (balance: any) => balance.year === dayjs().format("YYYY")
        );
        return (
          <div
            className="bg-theme-gray text-white rounded-2xl text-center cursor-pointer px-7 py-1"
            onClick={() => {
              const year = parseInt(dayjs().format("YYYY"));
              if (!balance[0]?.health_balance) {
                message.error(
                  "Employee doesn't have health balance at " + year
                );
                return false;
              }
              setIsOpenModalRLB(true);
              setSelectedRecord({
                ...record,
                remaining_health: balance[0]?.health_balance,
              });
              setSelectedYear(year.toString());
              setShowModalFor("health");
              setModalTitle(`Remaining Health Insurance Balance`);
            }}
          >
            {formatCurrency(parseInt(balance[0]?.health_balance), "en-US") ??
              "-"}
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
              <p className="font-bold text-lg">Health & Leave Report</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div></div>
          </div>
          <div>
            <TableComponent
              loading={loading}
              bordered
              withLengthOption={true}
              withExport={false}
              columns={column}
              dataSource={healthLeaveReports}
            />
          </div>
        </div>
      </div>

      <RemainingLeaveModal
        open={isOpenModalRLB}
        title={modalTitle}
        data={selectedRecord}
        handleCancel={() => setIsOpenModalRLB(false)}
        modalType={showModalFor}
      />
    </Suspense>
  );
};
export default HealthLeaveReportPage;
