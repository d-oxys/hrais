"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Table, TableColumnsType, Modal } from "antd";
import ProductTableComponent from "@root/app/components/Table/product";
import {
  InfoCircleOutlined,
  TagOutlined,
  MoneyCollectOutlined,
  PercentageOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  fetchSalesData,
  fetchSalesDataDetail,
} from "@root/libs/store/thunk/groupKategori";
import { SalesData } from "@root/libs/store/slices/groupKategori.slice";
import FormPermission from "../components/FormPermission";
import { formatRupiah } from "@root/libs/utils/formatCurrency";
import dayjs, { Dayjs } from "dayjs";

const SubKategoriPerformancePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sales, salesDetail, loading, error, loadingDetail } = useAppSelector(
    (state) => state.groupKategori
  );
  const [filteredData, setFilteredData] = useState<SalesData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
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
      group: "subkategori",
      kategori: "",
      awal,
      akhir,
      limit: 1000,
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
      title: "Sub Kategori",
      dataIndex: "subkategori",
      key: "subkategori",
      render: (text, record) => (
        <div>
          <div className="text-base font-semibold">{record.subkategori}</div>
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
      dataIndex: "sales_percetange",
      key: "percentageOfSales",
      render: (value) => `${value ? value.toFixed(2) : 0}%`,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
  ];

  const handleRowClick = (record: SalesData) => {
    setSelectedGroup(record.subkategori);
    setIsModalVisible(true);
    dispatch(
      fetchSalesDataDetail({
        awal: selectedRange[0]
          ? selectedRange[0].format("YYYY-MM-DD")
          : "2023-01-01",
        akhir: selectedRange[1]
          ? selectedRange[1].format("YYYY-MM-DD")
          : "2023-12-31",
        limit: 100,
        group: "subkategori",
        kategori: record.subkategori,
        kdtoko: selectedSites,
      })
    );
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedGroup(null);
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    setSelectedRange(dates);
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
      group: "subkategori",
      kategori: "",
      awal,
      akhir,
      limit: 1000,
      kdtoko: selectedSites,
    };

    dispatch(fetchSalesData(params));
    setIsModalVisible(false);
  };

  return (
    <Suspense>
      <ProductTableComponent
        isLoading={loading}
        columns={columns}
        data={filteredData}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        onFilterClick={handleModalOk}
        onDateChange={handleDateChange}
        showPagination={false}
        filterContent={<FormPermission />}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title={`Sales Detail for Group ${selectedGroup}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width="85%"
        style={{
          maxHeight: "80vh",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        {salesDetail && salesDetail.length > 0 ? (
          <Table
            dataSource={salesDetail}
            loading={loadingDetail}
            columns={[
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
                      <div className="text-base font-semibold">
                        {record.description}
                      </div>
                      <div className="text-sm">{record.artikel}</div>
                    </div>
                  </div>
                ),
              },
              {
                title: "Description",
                dataIndex: "description",
                key: "description",
              },
              { title: "Qty", dataIndex: "qty", key: "qty" },
              {
                title: "Brutto",
                dataIndex: "brutto",
                key: "brutto",
                render: (value) => formatRupiah(value),
              },
              {
                title: "Discount",
                dataIndex: "disc",
                key: "disc",
                render: (value) => formatRupiah(value),
              },
              {
                title: "Netto",
                dataIndex: "netto",
                key: "netto",
                render: (value) => formatRupiah(value),
              },
              {
                title: "% of Sales",
                dataIndex: "sales_percentage",
                key: "sales_percentage",
                render: (value) => `${value ? value.toFixed(2) : 0}%`,
              },
            ]}
            rowKey="kode_brg"
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </Suspense>
  );
};

export default SubKategoriPerformancePage;
