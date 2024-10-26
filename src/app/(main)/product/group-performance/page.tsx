'use client';
import React, { useState } from 'react';
import { TableColumnsType } from 'antd';
import ProductTableComponent from '@root/app/components/Table/product';
import dayjs from 'dayjs';

interface DataType {
  key: React.Key;
  artikel: string;
  qty: number;
  brutto: number;
  discount: number;
  netto: number;
  percentageOfSales: number;
}

const ProductPerformancePage: React.FC = () => {
  const originalData: DataType[] = [
    {
      key: 1,
      artikel: 'Product A',
      qty: 120,
      brutto: 1200,
      discount: 200,
      netto: 1000,
      percentageOfSales: 25,
    },
    {
      key: 2,
      artikel: 'Product B',
      qty: 80,
      brutto: 800,
      discount: 100,
      netto: 700,
      percentageOfSales: 17.5,
    },
    {
      key: 3,
      artikel: 'Product C',
      qty: 60,
      brutto: 600,
      discount: 50,
      netto: 550,
      percentageOfSales: 13.75,
    },
    {
      key: 4,
      artikel: 'Product D',
      qty: 50,
      brutto: 500,
      discount: 80,
      netto: 420,
      percentageOfSales: 10.5,
    },
  ];

  const [filteredData, setFilteredData] = useState<DataType[]>(originalData);

  const columns: TableColumnsType<DataType> = [
    { title: 'Artikel', dataIndex: 'artikel', key: 'artikel' },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
    { title: 'Brutto', dataIndex: 'brutto', key: 'brutto' },
    { title: 'Discount', dataIndex: 'discount', key: 'discount' },
    { title: 'Netto', dataIndex: 'netto', key: 'netto' },
    {
      title: '% of Sales',
      dataIndex: 'percentageOfSales',
      key: 'percentageOfSales',
      render: (value) => `${value}%`,
    },
  ];

  const handleSearch = (value: string) => {
    if (value.trim() === '') {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter((item) => item.artikel.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(filtered);
    }
  };

  const handleDateChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => {
    console.log('Selected date range:', dates);
  };

  const handleLimitChange = (value: number) => {
    console.log('Selected limit:', value);
  };

  const handleBrandChange = (value: string) => {
    console.log('Selected brand:', value);
  };

  const handleExport = (fileType: string) => {
    console.log(`Exporting as ${fileType}`);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    console.log('Pagination changed to:', page, pageSize);
  };

  return (
    <div>
      <h1>group performance</h1>
      <ProductTableComponent
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        onDateChange={handleDateChange}
        onLimitChange={handleLimitChange}
        onBrandChange={handleBrandChange}
        onExport={handleExport}
        pagination={{
          current: 1,
          pageSize: 10,
          total: filteredData.length,
          onChange: handlePaginationChange,
        }}
      />
    </div>
  );
};

export default ProductPerformancePage;
