import React, { useState, Suspense, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Input,
  Modal,
  Radio,
  Row,
  Table,
  Select,
  Menu,
  TableProps,
  RadioChangeEvent,
} from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  DownloadOutlined,
  ShoppingCartOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import styles from "./product.module.scss";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface ProductTableComponentProps extends TableProps<any> {
  columns: any[];
  data: any[];
  limitOptions?: number[];
  dateFilterOptions?: { label: string; value: string }[];
  brandOptions?: { label: string; value: string }[];
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize?: number) => void;
  };
  onRow?: (record: any, index?: number) => React.HTMLAttributes<any>;
  onSearch?: (value: string) => void;
  onDateChange?: (dates: [Dayjs | null, Dayjs | null]) => void;
  onLimitChange?: (value: number) => void;
  onBrandChange?: (value: string) => void;
  onExport?: (fileType: string) => void;
  onFilterClick?: () => void;
  expandedRowRender?: (record: any) => React.ReactNode;
  expandable?: any;
  isLoading?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  filterContent?: React.ReactNode;
}

const ProductTableComponent: React.FC<ProductTableComponentProps> = ({
  columns,
  data,
  limitOptions = [10, 20, 50, 100],
  brandOptions = [],
  pagination,
  expandedRowRender,
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
  onSearch,
  onDateChange,
  onLimitChange,
  onBrandChange,
  onExport,
  onFilterClick,
  expandable,
  isLoading = false,
  showFilters = true,
  showPagination = true,
  filterContent,
  onRow,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [searchText, setSearchText] = useState("");
  const [limit, setLimit] = useState(limitOptions[0] || 10);
  const [radioValue, setRadioValue] = useState<string>("mid");
  const [selectedBrand, setSelectedBrand] = useState<string>("All Brands");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    if (onLimitChange) onLimitChange(limit);
  }, [limit, onLimitChange]);

  const handleLimitChange = (value: number) => {
    setLimit(value);
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (
      onSearch &&
      (e.target.value.length >= 3 || e.target.value.length === 0)
    ) {
      onSearch(e.target.value);
    }
  };

  const handleFilterClick = () => {
    if (onFilterClick) onFilterClick();
    setIsModalVisible(false);
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const handleBrandChange = (brand: string, icon: string) => {
    setSelectedBrand(brand);
    setSelectedIcon(icon);
    if (onBrandChange) onBrandChange(brand);
  };

  const handleExpand = (expanded: boolean, record: any) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {showFilters && (
        <Row className="mb-4 justify-between">
          <Col className="flex items-center space-x-2">
            <span className="text-sm">Show</span>
            <Select value={limit} onChange={handleLimitChange} className="w-20">
              {limitOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
            <span className="text-sm">entries</span>
          </Col>

          <Col className="flex items-center space-x-4">
            <RangePicker
              value={selectedRange}
              onChange={handleDateChange}
              className={`w-64 ${styles.rangePickerPlaceholder}`}
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
                      handleBrandChange(
                        "Bodypack",
                        "/assets/images/logo-bp.jpeg"
                      )
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
            >
              Pilih Site
            </Button>

            <Input
              placeholder="Search by Name"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearchChange}
              className="w-52"
              allowClear
            />
          </Col>
        </Row>
      )}

      <Table
        columns={columns}
        dataSource={data.slice(0, limit)}
        loading={isLoading}
        expandable={{ expandedRowRender }}
        expandedRowKeys={expandedRowKeys}
        onExpand={handleExpand}
        pagination={showPagination ? pagination : false}
        onRow={onRow}
        onHeaderRow={() => ({
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        })}
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
    </Suspense>
  );
};

export default ProductTableComponent;
