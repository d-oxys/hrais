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
import { fetchSalesData } from "@root/libs/store/thunk/groupKategori";
import { SalesData } from "@root/libs/store/slices/groupKategori.slice";
import FormPermission from "../components/FormPermission";
import { formatRupiah } from "@root/libs/utils/formatCurrency";
import dayjs, { Dayjs } from "dayjs";
import TableColorPage from "../components/colorTable";
import { fetchColorSalesData } from "@root/libs/store/thunk/color";
import { fetchRangeSalesData } from "@root/libs/store/thunk/range";
import { fetchProductDetail } from "@root/libs/store/thunk/product";

const ProductPerformancePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sales, loading } = useAppSelector((state) => state.groupKategori);
  const { sales: colorSales, loading: colorLoading } = useAppSelector(
    (state) => state.color
  );
  const { sales: priceSales, loading: priceLoading } = useAppSelector(
    (state) => state.price
  );
  const { productsDetail, loadingDetail, error } = useAppSelector(
    (state) => state.product
  );

  const [filteredData, setFilteredData] = useState<SalesData[]>([]);
  const [sortedFilteredData, setSortedFilteredData] = useState<SalesData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const selectedSites = useAppSelector((state) => state.selectedSites.sites);
  const [sortOrder, setSortOrder] = useState<"low" | "high">("high");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const awal =
    Array.isArray(selectedRange) && selectedRange[0]
      ? selectedRange[0].format("YYYY-MM-DD")
      : "2023-01-01";
  const akhir =
    Array.isArray(selectedRange) && selectedRange[1]
      ? selectedRange[1].format("YYYY-MM-DD")
      : "2023-12-31";

  useEffect(() => {
    const params = {
      group: "kategori",
      kategori: "all",
      awal,
      akhir,
      limit: 10000,
      kdtoko: selectedSites,
      brand: selectedBrand,
    };
    const paramsColor = {
      awal,
      akhir,
      kdtoko: selectedSites,
      brand: selectedBrand,
    };
    const paramsPrice = {
      awal,
      akhir,
      kdtoko: selectedSites,
      brand: selectedBrand,
    };

    dispatch(fetchColorSalesData(paramsColor));
    dispatch(fetchRangeSalesData(paramsPrice));
    dispatch(fetchSalesData(params));
  }, [dispatch, selectedRange, selectedBrand, selectedSites]);

  useEffect(() => {
    if (sales) {
      setFilteredData(sales);
      setTotalData(sales.length);
      sortAndSetData(sales, sortOrder);
    }
  }, [sales, sortOrder]);

  const sortAndSetData = (data: SalesData[], order: "low" | "high") => {
    const sortedData = [...data].sort((a, b) => {
      const percentageA = a.sales_percentage ?? 0;
      const percentageB = b.sales_percentage ?? 0;
      return order === "high"
        ? percentageB - percentageA
        : percentageA - percentageB;
    });
    setSortedFilteredData(sortedData);
  };

  const handleSearch = (value: string) => {
    if (sales && Array.isArray(sales)) {
      const filtered = sales.filter((item) =>
        item.artikel?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
      setTotalData(filtered.length);
      setCurrentPage(1);
      sortAndSetData(filtered, sortOrder);
    }
  };

  const handleSortChange = (order: "low" | "high") => {
    setSortOrder(order);
    sortAndSetData(filteredData, order);
  };

  const handleRowClick = () => {
    dispatch(
      fetchProductDetail({
        awal: awal,
        akhir: akhir,
        kode_brg: "",
        kdtoko: [""],
      })
    );
  };

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
          <div>
            <div className="text-base font-semibold">{record.description}</div>
            <div className="text-sm">{record.artikel}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center">
          <EyeOutlined
            className="text-gray-500 hover:text-gray-700 cursor-pointer ml-2"
            onClick={() => {
              setSelectedArticle(record);
              setIsModalVisible(true);
            }}
          />
        </div>
      ),
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
      key: "sales_percentage",
      render: (value) => `${value ? value.toFixed(2) : 0}%`,
    },
  ];

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setLimit(pageSize || 10);
  };

  const currentData = sortedFilteredData.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <Suspense>
      <h1 className="text-2xl font-semibold mb-8">
        {selectedSites.length > 0 ? `Sites: ${selectedSites}` : "All Sites"}
      </h1>

      <ProductTableComponent
        isLoading={loading}
        columns={columns}
        data={currentData}
        onFilterClick={() => console.log("Filter clicked")}
        onSearch={handleSearch}
        onDateChange={setSelectedRange}
        showPagination={true}
        onLimitChange={(value) => setLimit(value)}
        onBrandChange={(brand) => setSelectedBrand(brand)}
        onSortChange={handleSortChange}
        pagination={{
          current: currentPage,
          pageSize: limit,
          total: totalData,
          onChange: handlePageChange,
        }}
        filterContent={<FormPermission />}
      />

      <TableColorPage
        colorData={colorSales || []}
        priceData={priceSales || []}
        loading={colorLoading}
        loadingPrice={priceLoading}
        kdtoko={selectedSites}
        awal={awal}
        akhir={akhir}
      />

      <Modal
        title="Article Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
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
              {selectedArticle.sales_percentage}%
            </p>
          </div>
        )}
      </Modal>
    </Suspense>
  );
};

export default ProductPerformancePage;
