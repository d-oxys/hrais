"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Table, TableColumnsType, Modal, Input } from "antd";
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
import TableColorPage from "../components/colorTableGroup";
import {
  fetchColorSalesData,
  fetchColorSalesGroupData,
} from "@root/libs/store/thunk/color";
import {
  fetchRangeSalesData,
  fetchRangeSalesDataGroupAll,
} from "@root/libs/store/thunk/range";
import { group } from "console";
import { resetPriceSales } from "@root/libs/store/slices/price.slice";
import { resetColorSales } from "@root/libs/store/slices/color.slice";

const GrooupPerformancePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sales, salesDetail, loading, error, loadingDetail } = useAppSelector(
    (state) => state.groupKategori
  );
  const [filteredData, setFilteredData] = useState<SalesData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const selectedSites = useAppSelector((state) => state.selectedSites.sites);
  const { sales: colorSales, loading: colorLoading } = useAppSelector(
    (state) => state.color
  );
  const { sales: priceSales, loading: priceLoading } = useAppSelector(
    (state) => state.price
  );
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(colorSales);

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
      group: "group",
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
    }
  }, [sales]);

  const columns: TableColumnsType<SalesData> = [
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      render: (text, record) => (
        <div className="flex items-center">
          <div className="flex-1">
            <div className="text-base font-semibold">{record.group}</div>
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
    setSelectedGroup(record.group);
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
      group: "group",
      kategori: record.group,
      awal,
      akhir,
      kdtoko: selectedSites,
      limit: "1000",
      brand: selectedBrand,
    };
    const paramsPrice = {
      group: "group",
      kategori: record.group,
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
        group: "group",
        kategori: record.group,
        kdtoko: selectedSites,
      })
    );
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedGroup(null);
    setSearchTerm("");
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    setSelectedRange(dates);
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
      group: "group",
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

  const filteredSalesDetail = salesDetail?.filter((item) =>
    item.artikel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
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
      group: "group",
      kategori: "",
      awal,
      akhir,
      limit: 1000,
      kdtoko: selectedSites,
      brand: brand,
    };
    dispatch(fetchSalesData(params));
  };

  return (
    <Suspense>
      <h1 className="text-2xl font-semibold mb-8">
        {selectedSites.length > 0 ? `Sites: ${selectedSites}` : "All Site"}
      </h1>
      <div>
        <ProductTableComponent
          isLoading={loading}
          columns={columns}
          data={filteredData}
          onBrandChange={handleBrandChange}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          onFilterClick={handleModalOk}
          onDateChange={handleDateChange}
          showPagination={false}
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
          <Input
            placeholder="Search Artikel"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          {filteredSalesDetail && filteredSalesDetail.length > 0 ? (
            <Table
              dataSource={filteredSalesDetail}
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
                  sorter: (a, b) =>
                    (a.sales_percentage || 0) - (b.sales_percentage || 0),
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
      </div>
    </Suspense>
  );
};

export default GrooupPerformancePage;
