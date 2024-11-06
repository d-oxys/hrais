"use client";
import React, { Suspense, useEffect, useState } from "react";
import { TableColumnsType, Modal, Table } from "antd";
import ProductTableComponent from "@root/app/components/Table/product";
import { EyeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  fetchSalesData,
  fetchSalesDataDetail,
} from "@root/libs/store/thunk/groupKategori";
import { SalesData } from "@root/libs/store/slices/groupKategori.slice";
import FormPermission from "../components/FormPermission";
import { formatRupiah } from "@root/libs/utils/formatCurrency";
import dayjs, { Dayjs } from "dayjs";
import { resetPriceSales } from "@root/libs/store/slices/price.slice";
import { resetColorSales } from "@root/libs/store/slices/color.slice";
import { fetchColorSalesGroupData } from "@root/libs/store/thunk/color";
import { fetchRangeSalesDataGroupAll } from "@root/libs/store/thunk/range";
import TableColorPage from "../components/colorTableSubKategori";

const SubKategoriPerformancePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sales, salesDetail, loading, loadingDetail } = useAppSelector(
    (state) => state.groupKategori
  );
  const { sales: colorSales, loading: colorLoading } = useAppSelector(
    (state) => state.color
  );
  const { sales: priceSales, loading: priceLoading } = useAppSelector(
    (state) => state.price
  );
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [filteredData, setFilteredData] = useState<SalesData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const selectedSites = useAppSelector((state) => state.selectedSites.sites);
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(resetPriceSales());
    dispatch(resetColorSales());
  }, [dispatch, selectedSites, selectedRange, selectedBrand]);

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
      brand: selectedBrand,
    };

    dispatch(fetchSalesData(params));
  }, [dispatch, selectedRange]);

  useEffect(() => {
    if (sales) {
      setFilteredData(sales);
      setCurrentPage(1); // Reset to page 1 when new data is loaded
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
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center">
          <EyeOutlined className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2" />
        </div>
      ),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Brutto",
      dataIndex: "brutto",
      key: "brutto",
      render: (value) => formatRupiah(value),
    },
    {
      title: "Discount",
      dataIndex: "disc",
      key: "discount",
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
      key: "percentageOfSales",
      render: (value) => `${value ? value.toFixed(2) : 0}%`,
    },
  ];

  const handleRowClick = (record: SalesData) => {
    setSelectedGroup(record.subkategori);
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
    const paramsColor = {
      group: "subkategori",
      kategori: record.subkategori,
      awal,
      akhir,
      kdtoko: selectedSites,
      limit: "1000",
      brand: selectedBrand,
    };
    const paramsPrice = {
      group: "subkategori",
      kategori: record.subkategori,
      awal,
      akhir,
      kdtoko: selectedSites,
      limit: 1000,
      brand: selectedBrand,
    };

    dispatch(fetchColorSalesGroupData(paramsColor));
    dispatch(fetchRangeSalesDataGroupAll(paramsPrice));
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

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize !== limit) {
      setLimit(pageSize || 10);
    }
  };

  const totalData = filteredData.length;
  const currentData = filteredData.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);

    const awal =
      Array.isArray(selectedRange) && selectedRange[0]
        ? selectedRange[0].format("YYYY-MM-DD")
        : "2023-01-01";
    const akhir =
      Array.isArray(selectedRange) && selectedRange[1]
        ? selectedRange[1].format("YYYY-MM-DD")
        : "2023-12-31";

    const params = {
      group: "subkategori",
      kategori: "",
      awal,
      akhir,
      limit: 1000,
      kdtoko: selectedSites,
      brand: brand,
    };

    dispatch(fetchSalesData(params));
  };

  const handleModalOk = () => {
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
      brand: selectedBrand,
    };

    dispatch(fetchSalesData(params));
    setIsModalVisible(false);
  };
  return (
    <Suspense>
      <h1 className="text-2xl font-semibold mb-8">
        {selectedSites.length > 0 ? `Sites: ${selectedSites}` : "All Site"}
      </h1>
      <ProductTableComponent
        isLoading={loading}
        columns={columns}
        data={currentData}
        limitOptions={[10, 20, 50, 100]}
        onLimitChange={(value) => setLimit(value)}
        onDateChange={handleDateChange}
        onBrandChange={handleBrandChange}
        onFilterClick={handleModalOk}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={{
          current: currentPage,
          pageSize: limit,
          total: totalData,
          onChange: handlePageChange,
        }}
        showPagination={true}
        filterContent={<FormPermission />}
        scroll={{ x: "max-content" }}
      />

      <TableColorPage
        colorData={colorSales || []}
        priceData={priceSales || []}
        loading={colorLoading}
        loadingPrice={priceLoading}
        group={selectedGroup || ""}
        kdtoko={selectedSites}
        awal={
          Array.isArray(selectedRange) &&
          selectedRange.length > 0 &&
          selectedRange[0]
            ? selectedRange[0].format("YYYY-MM-DD")
            : "2023-01-01"
        }
        akhir={
          Array.isArray(selectedRange) &&
          selectedRange.length > 1 &&
          selectedRange[1]
            ? selectedRange[1].format("YYYY-MM-DD")
            : "2023-12-31"
        }
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
