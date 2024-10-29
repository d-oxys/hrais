// types/tableColumns.tsx

import { TableColumnsType } from "antd";
import { ColorData } from "@root/libs/store/slices/color.slice";
import { PriceData } from "@root/libs/store/slices/price.slice";
import { formatRupiah } from "@root/libs/utils/formatCurrency";

// Define columns for ColorData
export const colorColumns: TableColumnsType<ColorData> = [
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

// Define columns for PriceData
export const priceColumns: TableColumnsType<PriceData> = [
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
          <div className="text-base font-semibold">
            {record.group || record.price_group}
          </div>
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
