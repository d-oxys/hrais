"use client";
import React, { useState } from "react";
import {
  Table,
  Row,
  Col,
  Input,
  Dropdown,
  Button,
  Menu,
  DatePicker,
  Radio,
  Modal,
} from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  DownloadOutlined,
  ShoppingCartOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import type { TableColumnsType, TableProps } from "antd";
import styles from "../site.module.scss";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface StoreData {
  kdtoko: string;
  qty: number;
  brutto: number;
  disc_r: number;
  total: number;
  salesPercentage: string;
  status: string[];
}

interface DataType {
  key: number;
  kode_brg: string;
  name: string;
  stores: StoreData[];
}

interface TableComponentProps extends TableProps<any> {
  columns: TableColumnsType<any>;
  dataSource: any[];
  onRowClick?: (record: any) => void;
  onBrandChange: (value: string) => void;
  onSearch: (value: string) => void;
  onDateChange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => void;
  onFilterClick?: () => void;
  onSortChange?: (order: "low" | "high") => void;
  filterContent?: React.ReactNode;
  dateFilterOptions?: { label: string; value: string }[];
  isLoading?: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  dataSource,
  onRowClick,
  onBrandChange,
  onSearch,
  onDateChange,
  onFilterClick,
  filterContent,
  onSortChange,
  isLoading = false,
  dateFilterOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Week", value: "thisWeek" },
    { label: "Last Week", value: "lastWeek" },
    { label: "Last 7 Days", value: "last7Days" },
    { label: "Last 14 Days", value: "last14Days" },
    { label: "Last 28 Days", value: "last28Days" },
    { label: "This Month", value: "thisMonth" },
    { label: "Last Month", value: "lastMonth" },
  ],
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>("All Brands");
  const [sortOrder, setSortOrder] = useState<"low" | "high">("high");

  const handleSortChange = (e: any) => {
    const order = e.target.value;
    setSortOrder(order);
    if (onSortChange) onSortChange(order);
  };

  const handleFilterClick = () => {
    if (onFilterClick) onFilterClick();
    setIsModalVisible(false);
  };

  const handleBrandChange = (brand: string, icon: string) => {
    setSelectedBrand(brand);
    setSelectedIcon(icon);
    if (onBrandChange) onBrandChange(brand);
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    console.log("Selected Dates:", dates);
    setSelectedRange(dates);
    if (onDateChange) onDateChange(dates);
  };

  const quickSelect = (type: string) => {
    const today = dayjs();
    let range: [Dayjs, Dayjs];
    switch (type) {
      case "today":
        range = [today, today];
        break;
      case "yesterday":
        range = [today.subtract(1, "day"), today.subtract(1, "day")];
        break;
      case "thisWeek":
        range = [today.startOf("week"), today.endOf("week")];
        break;
      case "lastWeek":
        range = [
          today.subtract(1, "week").startOf("week"),
          today.subtract(1, "week").endOf("week"),
        ];
        break;
      case "last7Days":
        range = [today.subtract(6, "day"), today];
        break;
      case "last14Days":
        range = [today.subtract(13, "day"), today];
        break;
      case "last28Days":
        range = [today.subtract(27, "day"), today];
        break;
      case "thisMonth":
        range = [today.startOf("month"), today.endOf("month")];
        break;
      case "lastMonth":
        range = [
          today.subtract(1, "month").startOf("month"),
          today.subtract(1, "month").endOf("month"),
        ];
        break;
      default:
        return;
    }
    handleDateChange(range);
  };

  return (
    <>
      <Row
        gutter={[24, 24]}
        style={{ marginBottom: 16 }}
        justify="space-between"
      >
        <Col xs={24} md={8} style={{ display: "flex", alignItems: "center" }}>
          <Radio.Group onChange={handleSortChange} value={sortOrder}>
            <Radio value="low">Low to High</Radio>
            <Radio value="high">High to Low</Radio>
          </Radio.Group>
        </Col>
        <Col
          xs={24}
          md={16}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <RangePicker
            value={selectedRange}
            onChange={handleDateChange}
            className={`w-64 mr-2 ${styles.rangePickerPlaceholder}`}
            renderExtraFooter={() => (
              <div className="my-4">
                <div className="flex space-x-2 mt-2">
                  {dateFilterOptions.slice(0, 6).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => quickSelect(option.value)}
                      className="text-blue-500 rounded-sm px-2 py-1 border text-sm bg-blue-100 hover:underline"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-2 mt-2">
                  {dateFilterOptions.slice(6).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => quickSelect(option.value)}
                      className="text-blue-500 rounded-sm px-2 py-1 border text-sm bg-blue-100 hover:underline"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="all"
                  onClick={() => handleBrandChange("", "")}
                  className="w-full"
                >
                  <div className="flex">
                    <DownloadOutlined style={{ marginRight: 8 }} />
                    <div>All Brands</div>
                  </div>
                </Menu.Item>
                <Menu.Item
                  key="bodypack"
                  onClick={() =>
                    handleBrandChange("Bodypack", "/assets/images/logo-bp.jpeg")
                  }
                  className="w-full"
                >
                  <div className="flex">
                    <img
                      src="/assets/images/logo-bp.jpeg"
                      alt="Bodypack Logo"
                      style={{ width: 20, height: 20, marginRight: 8 }}
                    />
                    <div>Bodypack</div>
                  </div>
                </Menu.Item>
                <Menu.Item
                  key="exsport"
                  onClick={() =>
                    handleBrandChange(
                      "Exsport",
                      "/assets/images/exsport-logo.jpg"
                    )
                  }
                  className="w-full"
                >
                  <div className="flex">
                    <img
                      src="/assets/images/exsport-logo.jpg"
                      alt="Exsport Logo"
                      style={{ width: 20, height: 20, marginRight: 8 }}
                    />
                    <div>Exsport</div>
                  </div>
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              className="flex items-center"
              icon={
                selectedIcon ? (
                  <img
                    src={selectedIcon}
                    alt="Brand Icon"
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <DownloadOutlined />
                )
              }
            >
              {selectedBrand}
            </Button>
          </Dropdown>

          <Button
            icon={<FilterOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{ marginLeft: 8 }}
          >
            Pilih Site
          </Button>
          <Input
            placeholder="Search Artikel"
            style={{ width: "100%", maxWidth: 150, marginLeft: 8 }}
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Col>
      </Row>

      <Table<DataType>
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        bordered
        size="middle"
        rowClassName={(record, index) => (index % 2 === 0 ? "bg-blue-50" : "")}
        scroll={{ x: "calc(700px + 50%)", y: 50 * 10 }}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record),
        })}
        loading={isLoading}
      />
      <Modal
        title="Filter Options"
        visible={isModalVisible}
        onOk={handleFilterClick}
        onCancel={() => setIsModalVisible(false)}
        className="w-[70%] h-[80%]"
      >
        {filterContent || <p>Additional Filter Options</p>}
      </Modal>
    </>
  );
};

export default TableComponent;
