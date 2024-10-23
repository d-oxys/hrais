"use client";
import { Breadcrumb, Button, Popconfirm } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import TableComponent from "@root/app/components/Table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { deleteTeam, getTeamList } from "@root/libs/store/thunk/team";
import { TeamState } from "@root/libs/store/slices/team.slice";
import DropdownStatus from "@root/app/components/DropdownStatus/DropdownAbsen";
import EditButton from "@root/app/components/EditButton";
import DeleteButton from "@root/app/components/DeleteButton";
import styles from "./childtable.module.scss";

interface TeamTableProps {
  section_id: string;
  teams: TeamState[];
}

const TeamTable: React.FC<TeamTableProps> = ({ section_id, teams }) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  console.log("teams: ", teams);

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const handleExpandRow = (record: any) => {
    console.log(record);
    setExpandedRowKeys((prevKeys) =>
      prevKeys.includes(record.id)
        ? prevKeys.filter((key) => key !== record.id)
        : [...prevKeys, record.id]
    );
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTeam(id));
    dispatch(getTeamList(section_id));
  };

  const column = [
    {
      key: "title",
      dataIndex: null,
      width: 150,
      render: () => {
        return (
          <div className="border-l-[10px] border-[#FFA837] flex h-[100px] items-center rounded-[10px] justify-center">
            Team
          </div>
        );
      },
    },
    {
      key: "name",
      dataIndex: ["jobrole", "nameJobrole"],
      render: (text: string, record: any) => {
        return (
          <div className="flex pl-[50px] h-[100px] items-center cursor-pointer justify-between">
            <div className="flex w-1/2 gap-5">
              <div>{text}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: "status",
      dataIndex: "status",
      width: 170,
      render: (value: string) => {
        return (
          <div className="flex justify-center">
            <DropdownStatus initialValue={value} id={0} />
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
            <EditButton destinationPage={`/settings/team/edit/${record.id}`} />
            <DeleteButton handleDelete={() => handleDelete(record.id)} />
          </div>
        );
      },
    },
  ];

  return (
    <div className={`${styles["table-content-child"]} pl-[50px]`}>
      <TableComponent
        rowKey="id"
        loading={false}
        columns={column}
        dataSource={teams}
        tableOnly={true}
        withExport={false}
        showHeader={false}
        withSearch={false}
      />
    </div>
  );
};
export default TeamTable;
