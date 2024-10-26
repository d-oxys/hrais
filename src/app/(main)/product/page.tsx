'use client';
import React, { useState, Suspense } from 'react';
import { Avatar, Breadcrumb, Button, Col, DatePicker, Dropdown, Input, Modal, Row, Table, TableColumnsType, Select, Pagination, Menu } from 'antd';
import { FormOutlined, DeleteOutlined, FilterOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import TableComponent from '@root/app/components/Table';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@root/libs/store';
import LoadingComponent from '@root/app/components/Loading';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  description: string;
  children?: DataType[];
}

const ProductPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [brand, setBrand] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const route = useRouter();
  const dispatch = useAppDispatch();

  const columns: TableColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    },
  ];

  const data: DataType[] = [
    // Sample data here
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  const handleDateChange = (dates: any) => {
    setDateFilter(dates);
    // Additional date filtering logic here
  };

  const handleBrandChange = (value: any) => {
    setBrand(value);
    // Additional brand filtering logic here
  };

  const handleExport = (fileType: any) => {
    if (fileType === 'csv') {
      // Logika ekspor CSV di sini
    } else if (fileType === 'pdf') {
      // Logika ekspor PDF di sini
    }
  };

  const handlePaginationChange = (page: any, pageSize: any) => {
    setPagination({ current: page, pageSize });
    // Pagination logic can be further customized if needed
  };

  const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) && (!dateFilter || /* Logic to filter by date range if applicable */ true) && (!brand || /* Logic to filter by selected brand */ true));

  const showFilterModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Row justify='space-between' style={{ marginBottom: '16px' }}>
        <Col>
          <Breadcrumb
            items={[
              { href: '#', title: 'Home' },
              { href: '/my-profile', title: 'My Profile' },
            ]}
          />
        </Col>
        <Col>
          <Input placeholder='Search by Name' prefix={<SearchOutlined />} value={searchText} onChange={handleSearchChange} style={{ width: 200, marginRight: '16px' }} />
          <RangePicker onChange={handleDateChange} style={{ marginRight: '16px' }} />
          <Button icon={<FilterOutlined />} onClick={showFilterModal} style={{ marginRight: '16px' }}>
            Filter
          </Button>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key='1' icon={<DownloadOutlined />} onClick={() => handleExport('csv')}>
                  Export as CSV
                </Menu.Item>
                <Menu.Item key='2' icon={<DownloadOutlined />} onClick={() => handleExport('pdf')}>
                  Export as PDF
                </Menu.Item>
              </Menu>
            }
          >
            <Button icon={<DownloadOutlined />}>Export</Button>
          </Dropdown>
        </Col>
        <Col>
        <Select placeholder='Select Brand' onChange={handleBrandChange} style={{ width: '100%', marginBottom: '16px' }}>
          <Option value='brand1'>Brand 1</Option>
          <Option value='brand2'>Brand 2</Option>
          <Option value='brand3'>Brand 3</Option>
        </Select>
        </Col>
      </Row>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (record.children ? <Table columns={columns} dataSource={record.children} pagination={false} showHeader={false} /> : <p style={{ margin: 0 }}>{record.description}</p>),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={filteredData}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          onChange: handlePaginationChange,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
      />
      <Modal title='Filter Options' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Additional Filter Options:</p>
      </Modal>
    </Suspense>
  );
};

export default ProductPage;
