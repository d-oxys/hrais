import React, { Suspense } from "react";
import { Table, TableColumnsType } from "antd";
import { ColorData } from "@root/libs/store/slices/color.slice";
import { formatRupiah } from "@root/libs/utils/formatCurrency";
import { PriceData } from "@root/libs/store/slices/price.slice";

interface TableColorPageProps {
  salesData: ColorData[];
  priceData: PriceData[];
  loading: boolean;
  loadingPrice: boolean;
}

const TableColorPage: React.FC<TableColorPageProps> = ({
  salesData,
  priceData,
  loading,
  loadingPrice,
}) => {
  const columns: TableColumnsType<ColorData> = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) => index + 1,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Warna",
      dataIndex: "color",
      key: "warna",
      render: (text, record) => (
        <div className="flex items-center">
          <div className="flex-1">
            <div className="text-base font-semibold">{record.color}</div>
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
      key: "sales_percetange",
      render: (value) => `${value ? value.toFixed(2) : 0}%`,
      sorter: (a, b) => (a.sales_percetange || 0) - (b.sales_percetange || 0),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
  ];

  const SecondColumns: TableColumnsType<PriceData> = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) => index + 1,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Range",
      dataIndex: "range",
      key: "range",
      render: (text, record) => (
        <div className="flex items-center">
          <div className="flex-1">
            <div className="text-base font-semibold">{record.range}</div>
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
    // {
    //   title: "Brutto",
    //   dataIndex: "brutto",
    //   key: "brutto",
    //   render: (value) => formatRupiah(value),
    //   onHeaderCell: () => ({
    //     style: {
    //       backgroundColor: "#ffffff",
    //       color: "#000000",
    //     },
    //   }),
    // },
    // {
    //   title: "Discount",
    //   dataIndex: "disc",
    //   key: "discount",
    //   render: (value) => formatRupiah(value),
    //   onHeaderCell: () => ({
    //     style: {
    //       backgroundColor: "#ffffff",
    //       color: "#000000",
    //     },
    //   }),
    // },
    // {
    //   title: "Netto",
    //   dataIndex: "netto",
    //   key: "netto",
    //   render: (value) => formatRupiah(value),
    //   onHeaderCell: () => ({
    //     style: {
    //       backgroundColor: "#ffffff",
    //       color: "#000000",
    //     },
    //   }),
    // },
    {
      title: "% of Sales",
      dataIndex: "sales_percetange",
      key: "sales_percetange",
      render: (value) => `${value ? value.toFixed(2) : 0}%`,
      sorter: (a, b) => (a.sales_percetange || 0) - (b.sales_percetange || 0),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
  ];

  return (
    <Suspense>
      <div className="my-8 flex space-x-4 bg-white">
        {salesData.length > 0 && (
          <div className="w-1/2">
            <h4 className="mb-4 text-lg text-black">By Color Range</h4>
            <Table
              columns={columns}
              dataSource={salesData}
              rowKey="warna"
              pagination={false}
              loading={loading}
            />
          </div>
        )}
        {priceData.length > 0 && (
          <div className="w-1/2">
            <h4 className="mb-4 text-lg text-black">By Price Range</h4>
            <Table
              columns={SecondColumns}
              dataSource={priceData}
              rowKey="price"
              pagination={false}
              loading={loadingPrice}
            />
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default TableColorPage;
