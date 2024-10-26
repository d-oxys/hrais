import React, { useState, Suspense, ReactNode } from 'react';
import { Button, Col, DatePicker, Dropdown, Input, Modal, Row, Table, Select, Menu, Pagination } from 'antd';
import { FilterOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import styles from './product.module.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface ProductTableComponentProps {
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
  onSearch?: (value: string) => void;
  onDateChange?: (dates: [Dayjs | null, Dayjs | null]) => void;
  onLimitChange?: (value: number) => void;
  onBrandChange?: (value: string) => void;
  onExport?: (fileType: string) => void;
  onFilterClick?: () => void;
  expandable?: any;
  isLoading?: boolean;
}

const ProductTableComponent: React.FC<ProductTableComponentProps> = ({
  columns,
  data,
  limitOptions = [10, 20, 50, 100],
  brandOptions = [],
  pagination,
  dateFilterOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'This Week', value: 'thisWeek' },
    { label: 'Last Week', value: 'lastWeek' },
    { label: 'Last 7 Days', value: 'last7Days' },
    { label: 'Last 14 Days', value: 'last14Days' },
    { label: 'Last 28 Days', value: 'last28Days' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Last Month', value: 'lastMonth' },
  ],
  onSearch,
  onDateChange,
  onLimitChange,
  onBrandChange,
  onExport,
  onFilterClick,
  expandable,
  isLoading = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [searchText, setSearchText] = useState('');
  const [limit, setLimit] = useState(limitOptions[0] || 10);

  const handleLimitChange = (value: number) => {
    setLimit(value);
    if (onLimitChange) onLimitChange(value);
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    setSelectedRange(dates);
    if (onDateChange) onDateChange(dates);
  };

  const quickSelect = (type: string) => {
    const today = dayjs();
    let range: [Dayjs, Dayjs];
    switch (type) {
      case 'today':
        range = [today, today];
        break;
      case 'yesterday':
        range = [today.subtract(1, 'day'), today.subtract(1, 'day')];
        break;
      case 'thisWeek':
        range = [today.startOf('week'), today.endOf('week')];
        break;
      case 'lastWeek':
        range = [today.subtract(1, 'week').startOf('week'), today.subtract(1, 'week').endOf('week')];
        break;
      case 'last7Days':
        range = [today.subtract(6, 'day'), today];
        break;
      case 'last14Days':
        range = [today.subtract(13, 'day'), today];
        break;
      case 'last28Days':
        range = [today.subtract(27, 'day'), today];
        break;
      case 'thisMonth':
        range = [today.startOf('month'), today.endOf('month')];
        break;
      case 'lastMonth':
        range = [today.subtract(1, 'month').startOf('month'), today.subtract(1, 'month').endOf('month')];
        break;
      default:
        return;
    }
    handleDateChange(range);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (onSearch && (e.target.value.length >= 3 || e.target.value.length === 0)) {
      onSearch(e.target.value);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Row className='mb-4 justify-between'>
        {/* Limit Selector */}
        <Col className='flex items-center space-x-2'>
          <span className='text-sm'>Show</span>
          <Select value={limit} onChange={handleLimitChange} className='w-20'>
            {limitOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
          <span className='text-sm'>entries</span>
        </Col>

        <Col className='flex items-center space-x-4'>
          {/* Date Range Filter */}
          <RangePicker
            value={selectedRange}
            onChange={handleDateChange}
            className={`w-52 ${styles.rangePickerPlaceholder}`}
            renderExtraFooter={() => (
              <div>
                <div className='flex space-x-2 mt-2'>
                  {dateFilterOptions.slice(0, 6).map((option) => (
                    <button key={option.value} onClick={() => quickSelect(option.value)} className='text-blue-500 rounded-sm px-2 py-1 border text-sm bg-blue-100 hover:underline'>
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className='flex space-x-2 mt-2'>
                  {dateFilterOptions.slice(6).map((option) => (
                    <button key={option.value} onClick={() => quickSelect(option.value)} className='text-blue-500 rounded-sm px-2 py-1 border text-sm bg-blue-100 hover:underline'>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          />

          {/* Brand Filter */}
          {brandOptions.length > 0 && (
            <Select placeholder='Select Brand' onChange={onBrandChange} className='w-52'>
              {brandOptions.map((brand) => (
                <Option key={brand.value} value={brand.value}>
                  {brand.label}
                </Option>
              ))}
            </Select>
          )}

          {/* Filter Button */}
          <Button icon={<FilterOutlined />} onClick={() => setIsModalVisible(true)}>
            Filter
          </Button>

          {/* Export Dropdown */}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key='csv' icon={<DownloadOutlined />} onClick={() => onExport && onExport('csv')}>
                  Export as CSV
                </Menu.Item>
                <Menu.Item key='pdf' icon={<DownloadOutlined />} onClick={() => onExport && onExport('pdf')}>
                  Export as PDF
                </Menu.Item>
              </Menu>
            }
          >
            <Button icon={<DownloadOutlined />}>Export</Button>
          </Dropdown>

          {/* Search Input */}
          <Input placeholder='Search by Name' prefix={<SearchOutlined />} value={searchText} onChange={handleSearchChange} className='w-52' allowClear />
        </Col>
      </Row>

      {/* Table Component */}
      <Table columns={columns} dataSource={data} loading={isLoading} expandable={expandable} pagination={pagination} />

      {/* Filter Modal */}
      <Modal title='Filter Options' visible={isModalVisible} onOk={onFilterClick} onCancel={() => setIsModalVisible(false)}>
        <p>Additional Filter Options</p>
      </Modal>
    </Suspense>
  );
};

export default ProductTableComponent;
