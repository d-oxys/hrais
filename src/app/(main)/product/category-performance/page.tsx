'use client';
import React, { useEffect, useState } from 'react';
import { TableColumnsType } from 'antd';
import ProductTableComponent from '@root/app/components/Table/product';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { fetchSalesData } from '@root/libs/store/thunk/groupKategori';
import { SalesData } from '@root/libs/store/slices/groupKategori.slice';
import { formatRupiah } from '@root/libs/utils/formatCurrency';

interface DataType {
  key: React.Key;
  artikel: string;
  qty: number;
  brutto: number;
  discount: number;
  netto: number;
  percentageOfSales: number | null;
}

const KategoriPerformancePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sales, loading, error } = useAppSelector((state) => state.groupKategori);

  const [filteredData, setFilteredData] = useState<DataType[]>([]);

  useEffect(() => {
    const params = {
      group: 'kategori',
      kategori: '',
      awal: '2023-01-01',
      akhir: '2023-12-31',
      limit: 100,
    };

    dispatch(fetchSalesData(params));
  }, [dispatch]);

  useEffect(() => {
    if (sales) {
      const formattedData: DataType[] = sales.map((item, index) => ({
        key: index + 1,
        artikel: item.group,
        qty: item.qty,
        brutto: item.brutto,
        discount: item.disc || 0,
        netto: item.netto || 0,
        percentageOfSales: item.sales_percetange,
      }));

      setFilteredData(formattedData);
    }
  }, [sales]);

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Group',
      dataIndex: 'artikel',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
      key: 'artikel',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
      key: 'qty',
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
      render: (value) => formatRupiah(value),
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
      render: (value) => formatRupiah(value),
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
      render: (value) => formatRupiah(value),
    },
    {
      title: '% of Sales',
      dataIndex: 'percentageOfSales',
      key: 'percentageOfSales',
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
      render: (value) => `${value ? value.toFixed(2) : 0}%`,
    },
  ];

  const handleSearch = (value: string) => {};

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
      <ProductTableComponent
        loading={loading}
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

export default KategoriPerformancePage;
