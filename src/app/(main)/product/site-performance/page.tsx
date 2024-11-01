"use client";
import { Table, Menu, Popover, Tag, TableColumnsType, Button } from "antd";
import React, { useState } from "react";
import TableComponent from "./components/table";
import DetailModal from "./components/detailModal";
import dayjs from "dayjs";
import FormPermission from "../components/FormPermission";
import {
  FormOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  status: string[];
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
  salesPercentage1: number;
  lostSales1: number;
  salesPercentage2: number;
  lostSales2: number;
  salesPercentage3: number;
  lostSales3: number;
  salesPercentage4: number;
  lostSales4: number;
  brand: string;
  date: string;
}

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleRowClick = (record: DataType) => {
    setSelectedRow(record);
    setIsModalVisible(true);
  };

  const handleFilterClick = (filterValue: string) => {
    setSelectedFilter(filterValue);
    console.log("Selected filter:", filterValue);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRow(null);
  };

  const generateSiteColumns = (siteIndex: number): any => [
    {
      title: "qty",
      dataIndex: "age",
      key: `age${siteIndex}`,
      width: 100,
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: "% Of Sales",
      dataIndex: `salesPercentage${siteIndex}`,
      key: `salesPercentage${siteIndex}`,
      width: 100,
    },
    {
      title: "Lost Sales",
      dataIndex: `lostSales${siteIndex}`,
      key: `lostSales${siteIndex}`,
      width: 100,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 100,
      render: (status: string[]) => (
        <span>
          {status.map((tag) => (
            <Tag color={tag.length > 5 ? "geekblue" : "green"} key={tag}>
              {tag}
            </Tag>
          ))}
        </span>
      ),
    },
    {
      key: "view",
      dataIndex: "view",
      title: "View Detail",
      width: 150,
      render: (text: string, record: DataType) => (
        <div className="text-center flex justify-center w-full cursor-pointer">
          <Button
            className="bg-primary/25 rounded-lg text-primary cursor-pointer"
            onClick={() => handleRowClick(record)} // Passing record to open modal with data
          >
            <EyeOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const categoryMenu = (handleFilterClick: (filterValue: string) => void) => (
    <Menu>
      <Menu.SubMenu
        key="bags"
        title="BAGS"
        onTitleClick={() => handleFilterClick("BAGS")}
      >
        <Menu.Item key="backpack" onClick={() => handleFilterClick("BACKPACK")}>
          Backpack
        </Menu.Item>
        <Menu.Item
          key="messenger"
          onClick={() => handleFilterClick("MESSENGER")}
        >
          Messenger Bag
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="apparel"
        title="APPAREL"
        onTitleClick={() => handleFilterClick("APPAREL")}
      >
        <Menu.Item key="jackets" onClick={() => handleFilterClick("JACKETS")}>
          Jackets
        </Menu.Item>
        <Menu.Item key="t-shirts" onClick={() => handleFilterClick("T-SHIRTS")}>
          T-Shirts
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
      fixed: "left",
    },
    {
      title: "Artikel",
      dataIndex: "name",
      key: "name",
      width: 200,
      fixed: "left",
      filters: [
        {
          text: (
            <Popover
              content={categoryMenu(handleFilterClick)}
              trigger="hover"
              placement="rightTop"
            >
              <span>Category</span>
            </Popover>
          ),
          value: selectedFilter || "ALL",
        },
        { text: "CROSS BODY", value: "CROSS BODY" },
        { text: "MULTI WAYS CARRY", value: "MULTI WAYS CARRY" },
        { text: "TOTE BAG", value: "TOTE BAG" },
        { text: "POUCH", value: "POUCH" },
      ],
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    },
  ];

  const siteCount = 4;
  for (let i = 1; i <= siteCount; i++) {
    columns.push({
      title: `Site ${i}`,
      children: generateSiteColumns(i),
    });
  }

  const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
    key: i,
    name: `Artikel ${i + 1}`,
    age: Math.floor(Math.random() * 100) + 1,
    status: [Math.random() > 0.5 ? "TOP" : "LOW"],
    building: `Building ${Math.floor(Math.random() * 10) + 1}`,
    number: Math.floor(Math.random() * 10000),
    companyAddress: `Address ${i + 1}`,
    companyName: `Company ${i + 1}`,
    gender: Math.random() > 0.5 ? "M" : "F",
    salesPercentage1: Math.floor(Math.random() * 100),
    lostSales1: Math.floor(Math.random() * 100),
    salesPercentage2: Math.floor(Math.random() * 100),
    lostSales2: Math.floor(Math.random() * 100),
    salesPercentage3: Math.floor(Math.random() * 100),
    lostSales3: Math.floor(Math.random() * 100),
    salesPercentage4: Math.floor(Math.random() * 100),
    lostSales4: Math.floor(Math.random() * 100),
    brand: `Brand ${Math.ceil(Math.random() * 3)}`,
    date: dayjs()
      .subtract(Math.floor(Math.random() * 30), "day")
      .format("YYYY-MM-DD"),
  }));

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">
        Article Performance on Store
      </h1>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        onRowClick={handleRowClick}
        onBrandChange={() => {}}
        onSearch={() => {}}
        onDateChange={() => {}}
        filterContent={<FormPermission />}
      />
      <DetailModal
        visible={isModalVisible}
        onClose={handleModalClose}
        data={selectedRow}
      />
    </>
  );
};

export default App;
