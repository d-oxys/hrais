import React, { useState, Suspense, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Input,
  Modal,
  Row,
  Table,
  Select,
  Menu,
  TableProps,
  Space,
  Radio,
} from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  DownloadOutlined,
  MenuOutlined,
  ZoomInOutlined,
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
  onSortChange?: (order: "low" | "high") => void;
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
  onFilterClick,
  onSortChange,
  expandable,
  isLoading = false,
  showFilters = true,
  showPagination = true,
  filterContent,
  onRow,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [searchText, setSearchText] = useState("");
  const [limit, setLimit] = useState(limitOptions[0] || 10);
  const [selectedBrand, setSelectedBrand] = useState<string>("All Brands");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [sortOrder, setSortOrder] = useState<"low" | "high">("high");

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

  const renderQuickSelectButtons = () => (
    <div className={styles.quickSelectContainer}>
      <div className={styles.quickSelectRow}>
        {dateFilterOptions.slice(0, 6).map((option) => (
          <button
            key={option.value}
            onClick={() => quickSelect(option.value)}
            className={styles.quickSelectButton}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className={styles.quickSelectRow}>
        {dateFilterOptions.slice(6).map((option) => (
          <button
            key={option.value}
            onClick={() => quickSelect(option.value)}
            className={styles.quickSelectButton}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (
      onSearch &&
      (e.target.value.length >= 3 || e.target.value.length === 0)
    ) {
      onSearch(e.target.value);
    }
  };

  const handleBrandChange = (brand: string, icon: string) => {
    setSelectedBrand(brand);
    setSelectedIcon(icon);
    if (onBrandChange) onBrandChange(brand);
  };

  const handleSortChange = (e: any) => {
    const order = e.target.value;
    setSortOrder(order);
    if (onSortChange) onSortChange(order);
  };

  const renderFilters = () => (
    <div className={styles.filterContainer}>
      <Row gutter={[16, 16]} align="middle">
        <Col className={styles.showEntriesCol}>
          <Space align="center" className={styles.showEntriesSpace}>
            <span>Show</span>
            <Select
              value={limit}
              onChange={handleLimitChange}
              className={styles.limitSelect}
              style={{ width: 70 }}
            >
              {limitOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
            <span>entries</span>
          </Space>
        </Col>
        <Col xs={24} md={8} style={{ display: "flex", alignItems: "center" }}>
          <Radio.Group onChange={handleSortChange} value={sortOrder}>
            <Radio value="low">Low to High</Radio>
            <Radio value="high">High to Low</Radio>
          </Radio.Group>
        </Col>

        <Col flex="auto">
          <Row gutter={[16, 16]} justify="end" align="middle">
            <Col>
              <RangePicker
                value={selectedRange}
                onChange={handleDateChange}
                className={styles.datePicker}
                style={{ width: 280 }}
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
            </Col>

            <Col>
              <Dropdown
                overlay={
                  <Menu className={styles.brandMenu}>
                    <Menu.Item
                      key="all"
                      onClick={() => handleBrandChange("All Brands", "")}
                    >
                      <Space>
                        <ZoomInOutlined />
                        <span>All Brands</span>
                      </Space>
                    </Menu.Item>
                    <Menu.Item
                      key="bodypack"
                      onClick={() =>
                        handleBrandChange(
                          "Bodypack",
                          "/assets/images/logo-bp.jpeg"
                        )
                      }
                    >
                      <Space>
                        <img
                          src="/assets/images/logo-bp.jpeg"
                          alt="Bodypack Logo"
                          style={{ width: 20, height: 20 }}
                        />
                        <span>Bodypack</span>
                      </Space>
                    </Menu.Item>
                    <Menu.Item
                      key="exsport"
                      onClick={() =>
                        handleBrandChange(
                          "Exsport",
                          "/assets/images/exsport-logo.jpg"
                        )
                      }
                    >
                      <Space>
                        <img
                          src="/assets/images/exsport-logo.jpg"
                          alt="Exsport Logo"
                          style={{ width: 20, height: 20 }}
                        />
                        <span>Exsport</span>
                      </Space>
                    </Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
              >
                <Button className={styles.brandButton}>
                  <Space>
                    {selectedIcon ? (
                      <img
                        src={selectedIcon}
                        alt="Brand Icon"
                        style={{ width: 20, height: 20 }}
                      />
                    ) : (
                      <ZoomInOutlined />
                    )}
                    <span>{selectedBrand}</span>
                  </Space>
                </Button>
              </Dropdown>
            </Col>

            <Col>
              <Button
                icon={<FilterOutlined />}
                onClick={() => setIsModalVisible(true)}
                className={styles.filterButton}
              >
                Pilih Site
              </Button>
            </Col>

            <Col>
              <Input
                placeholder="Search by Artikel"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearchChange}
                className={styles.searchInput}
                style={{ width: 200 }}
                allowClear
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className={styles.tableContainer}>
      {showFilters && (
        <>
          <div className={styles.desktopFilters}>{renderFilters()}</div>
          <div className={styles.mobileFilters}>
            <Button
              icon={<MenuOutlined />}
              onClick={() => setIsMobileFiltersVisible(true)}
              className={styles.mobileFilterButton}
            >
              Filters
            </Button>
          </div>
        </>
      )}

      <Table
        columns={columns}
        dataSource={data.slice(0, limit)}
        loading={isLoading}
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand: (expanded, record) =>
            setExpandedRowKeys(expanded ? [record.key] : []),
        }}
        pagination={showPagination ? pagination : false}
        onRow={onRow}
        className={styles.responsiveTable}
        scroll={{ x: true }}
      />

      <Modal
        title="Filter Options"
        visible={isModalVisible}
        onOk={() => {
          if (onFilterClick) onFilterClick();
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
        className={styles.filterModal}
      >
        {filterContent || <p>Additional Filter Options</p>}
      </Modal>

      <Modal
        title="Filters"
        visible={isMobileFiltersVisible}
        onCancel={() => setIsMobileFiltersVisible(false)}
        footer={null}
        className={styles.mobileFilterModal}
      >
        {renderFilters()}
      </Modal>
    </div>
  );
};

export default ProductTableComponent;
