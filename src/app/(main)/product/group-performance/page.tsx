'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Table, TableColumnsType, Modal } from 'antd';
import ProductTableComponent from '@root/app/components/Table/product';
import { InfoCircleOutlined, TagOutlined, MoneyCollectOutlined, PercentageOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { fetchSalesData } from '@root/libs/store/thunk/groupKategori';
import { SalesData } from '@root/libs/store/slices/groupKategori.slice';
import FormPermission from '../components/FormPermission';
import { formatRupiah } from '@root/libs/utils/formatCurrency';
import dayjs, { Dayjs } from 'dayjs';

const GrooupPerformancePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sales, loading, error } = useAppSelector((state) => state.groupKategori);
  const [filteredData, setFilteredData] = useState<SalesData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const selectedSites = useAppSelector((state) => state.selectedSites.sites);
  const [selectedRange, setSelectedRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  useEffect(() => {
    const awal = Array.isArray(selectedRange) && selectedRange.length > 0 && selectedRange[0] ? selectedRange[0].format('YYYY-MM-DD') : '2023-01-01';
    const akhir = Array.isArray(selectedRange) && selectedRange.length > 1 && selectedRange[1] ? selectedRange[1].format('YYYY-MM-DD') : '2023-12-31';
    const params = {
      group: 'group',
      kategori: '',
      awal,
      akhir,
      limit: 100,
    };

    dispatch(fetchSalesData(params));
  }, [dispatch, selectedRange]);

  useEffect(() => {
    if (sales) {
      setFilteredData(sales);
    }
  }, [sales]);

  const columns: TableColumnsType<SalesData> = [
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      render: (text, record) => (
        <div>
          <div className='text-base font-semibold'>{record.group}</div>
        </div>
      ),
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
      render: (value) => formatRupiah(value),
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
    },
    {
      title: 'Discount',
      dataIndex: 'disc',
      key: 'discount',
      render: (value) => formatRupiah(value),
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
      render: (value) => formatRupiah(value),
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
    },
    {
      title: '% of Sales',
      dataIndex: 'sales_percetange',
      key: 'percentageOfSales',
      render: (value) => `${value ? value.toFixed(2) : 0}%`,
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      }),
    },
  ];

  const handleSearch = (value: string) => {};

  const handleArticleClick = (record: any) => {
    setSelectedArticle(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedArticle(null);
  };

  const handleModalOk = () => {
    console.log(selectedSites);
    const awal = Array.isArray(selectedRange) && selectedRange.length > 0 && selectedRange[0] ? selectedRange[0].format('YYYY-MM-DD') : '2023-01-01';
    const akhir = Array.isArray(selectedRange) && selectedRange.length > 1 && selectedRange[1] ? selectedRange[1].format('YYYY-MM-DD') : '2023-12-31';
    const params = {
      group: 'group',
      kategori: '',
      awal,
      akhir,
      limit: 100,
      kdtoko: selectedSites.join(','),
    };

    dispatch(fetchSalesData(params));
    setIsModalVisible(false);
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    setSelectedRange(dates);
  };

  return (
    <Suspense>
      <ProductTableComponent isLoading={loading} columns={columns} data={filteredData} onFilterClick={handleModalOk} onSearch={handleSearch} onDateChange={handleDateChange} showPagination={false} filterContent={<FormPermission />} />
    </Suspense>
  );
};

export default GrooupPerformancePage;
