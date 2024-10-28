"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Table, TableColumnsType, Modal } from "antd";
import ProductTableComponent from "@root/app/components/Table/product";
import {
  InfoCircleOutlined,
  TagOutlined,
  MoneyCollectOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { fetchSalesData } from "@root/libs/store/thunk/groupKategori";
import { SalesData } from "@root/libs/store/slices/groupKategori.slice";
import FormPermission from "../components/FormPermission";
import { formatRupiah } from "@root/libs/utils/formatCurrency";
import dayjs, { Dayjs } from "dayjs";
import { EyeOutlined } from "@ant-design/icons";
import TableColorPage from "../components/colorTable";
import { fetchColorSalesData } from "@root/libs/store/thunk/color";
import { fetchRangeSalesData } from "@root/libs/store/thunk/range";

const ProductPerformancePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sales, loading, error } = useAppSelector(
    (state) => state.groupKategori
  );
  const { sales: colorSales, loading: colorLoading } = useAppSelector(
    (state) => state.color
  );
  const { sales: priceSales, loading: priceLoading } = useAppSelector(
    (state) => state.price
  );
  const [filteredData, setFilteredData] = useState<SalesData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [limit, setLimit] = useState(10);
  const selectedSites = useAppSelector((state) => state.selectedSites.sites);
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  useEffect(() => {
    const awal =
      Array.isArray(selectedRange) &&
      selectedRange.length > 0 &&
      selectedRange[0]
        ? selectedRange[0].format("YYYY-MM-DD")
        : "2023-01-01";
    const akhir =
      Array.isArray(selectedRange) &&
      selectedRange.length > 1 &&
      selectedRange[1]
        ? selectedRange[1].format("YYYY-MM-DD")
        : "2023-12-31";
    const params = {
      group: "kategori",
      kategori: "all",
      awal,
      akhir,
      limit: 1000,
    };
    const paramsColor = {
      awal,
      akhir,
      kdtoko: selectedSites,
    };
    const paramsPrice = {
      awal,
      akhir,
      kdtoko: selectedSites,
    };

    dispatch(fetchColorSalesData(paramsColor));
    dispatch(fetchRangeSalesData(paramsPrice));
    dispatch(fetchSalesData(params));
  }, [dispatch, selectedRange]);

  useEffect(() => {
    if (sales) {
      setFilteredData(sales);
    }
  }, [sales]);

  const columns: TableColumnsType<SalesData> = [
    {
      title: "Artikel",
      dataIndex: "artikel",
      key: "artikel",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Artikel Image"
            className="w-12 h-12 mr-3 rounded-md"
          />
          <div className="flex-1">
            <div className="text-base font-semibold">{record.description}</div>
            <div className="text-sm">{record.artikel}</div>
          </div>
        </div>
      ),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center">
          <EyeOutlined className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2" />
        </div>
      ),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Brutto",
      dataIndex: "brutto",
      key: "brutto",
      render: (value) => formatRupiah(value),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Discount",
      dataIndex: "disc",
      key: "discount",
      render: (value) => formatRupiah(value),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Netto",
      dataIndex: "netto",
      key: "netto",
      render: (value) => formatRupiah(value),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "% of Sales",
      dataIndex: "sales_percentage",
      key: "sales_percentage",
      render: (value) => `${value ? value.toFixed(2) : 0}%`,
      sorter: (a, b) => (a.sales_percentage || 0) - (b.sales_percentage || 0),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
  ];

  const handleSearch = (value: string) => {};

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedArticle(null);
  };
  const handleModalOk = () => {
    console.log(selectedSites);
    const awal =
      Array.isArray(selectedRange) &&
      selectedRange.length > 0 &&
      selectedRange[0]
        ? selectedRange[0].format("YYYY-MM-DD")
        : "2023-01-01";
    const akhir =
      Array.isArray(selectedRange) &&
      selectedRange.length > 1 &&
      selectedRange[1]
        ? selectedRange[1].format("YYYY-MM-DD")
        : "2023-12-31";
    const params = {
      group: "kategori",
      kategori: "all",
      awal,
      akhir,
      limit: 1000,
      kdtoko: selectedSites,
    };

    const paramsColor = {
      awal,
      akhir,
      kdtoko: selectedSites,
      limit: 1000,
    };

    dispatch(fetchColorSalesData(paramsColor));
    dispatch(fetchSalesData(params));
    setIsModalVisible(false);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    setSelectedRange(dates);
  };

  return (
    <Suspense>
      <ProductTableComponent
        isLoading={loading}
        columns={columns}
        data={filteredData}
        onFilterClick={handleModalOk}
        onSearch={handleSearch}
        onDateChange={handleDateChange}
        showPagination={false}
        onLimitChange={handleLimitChange}
        filterContent={<FormPermission />}
      />
      <TableColorPage
        salesData={(colorSales || []).slice(0, limit)}
        priceData={(priceSales || []).slice(0, limit)}
        loading={colorLoading}
        loadingPrice={priceLoading}
      />

      <Modal
        title="Article Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedArticle && (
          <div>
            <p>
              <InfoCircleOutlined /> <strong>Artikel:</strong>{" "}
              {selectedArticle.kategori}
            </p>
            <p>
              <TagOutlined /> <strong>Qty:</strong> {selectedArticle.qty}
            </p>
            <p>
              <MoneyCollectOutlined /> <strong>Brutto:</strong>{" "}
              {formatRupiah(selectedArticle.brutto)}
            </p>
            <p>
              <TagOutlined /> <strong>Discount:</strong>{" "}
              {formatRupiah(selectedArticle.disc)}
            </p>
            <p>
              <MoneyCollectOutlined /> <strong>Netto:</strong>{" "}
              {formatRupiah(selectedArticle.netto)}
            </p>
            <p>
              <PercentageOutlined /> <strong>% of Sales:</strong>{" "}
              {selectedArticle.sales_percetange}%
            </p>
          </div>
        )}
      </Modal>
    </Suspense>
  );
};

export default ProductPerformancePage;
