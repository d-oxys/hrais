'use client';
import React, { useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import ProductTableComponent from '@root/app/components/Table/product';
import dayjs from 'dayjs';
import originalData from '@root/libs/constants/staticdata';
import styles from '../product.module.scss';

const ProductPerformancePage: React.FC = () => {
  const [filteredData, setFilteredData] = useState(originalData);

  const columns: TableColumnsType<any> = [
    {
      title: 'Artikel',
      dataIndex: 'artikel',
      key: 'artikel',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
    },
    {
      title: 'Brutto',
      dataIndex: 'brutto',
      key: 'brutto',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
    },
    {
      title: 'Netto',
      dataIndex: 'netto',
      key: 'netto',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
    },
    {
      title: '% of Sales',
      dataIndex: 'percentageOfSales',
      key: 'percentageOfSales',
      render: (value) => `${value}%`,
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
    },
  ];

  const secondaryColumns: TableColumnsType<any> = [
    { title: 'Index', dataIndex: 'key', key: 'key' },
    {
      title: 'Color',
      dataIndex: 'details',
      key: 'headerColor',
      render: (_, record) => record.details.map((detail: any) => detail.headerColor).join(', '),
    },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
  ];

  const expandedRowRender = (record: any) => <Table columns={columns} dataSource={[record]} pagination={false} />;

  const handleSearch = (value: string) => {
    if (value.trim() === '') {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter((item) => item.artikel.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      <ProductTableComponent columns={columns} data={filteredData} onSearch={handleSearch} showPagination={false} />
      <div className='my-8 flex space-x-4 bg-white'>
        <div className='w-1/2'>
          <ProductTableComponent
            columns={secondaryColumns}
            data={filteredData}
            showPagination={false}
            showFilters={false}
            expandable={{
              expandedRowRender,
              rowExpandable: (record: any) => record.details.length > 0,
            }}
          />
        </div>
        <div className='w-1/2'>
          <ProductTableComponent
            columns={secondaryColumns}
            data={filteredData}
            showPagination={false}
            showFilters={false}
            expandable={{
              expandedRowRender,
              rowExpandable: (record: any) => record.details.length > 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPerformancePage;
