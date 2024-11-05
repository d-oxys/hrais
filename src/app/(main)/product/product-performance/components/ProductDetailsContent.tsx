import React, { useEffect, useState } from "react";
import { Radio, RadioChangeEvent, Table } from "antd";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { fetchDetailPriceBySite } from "@root/libs/store/thunk/product";
import { formatRupiah } from "@root/libs/utils/formatCurrency";

interface ProductDetailsContentProps {
  loadingDetail: boolean;
  productsDetail: any;
  selectedRowData: any;
  sortOrderToko: "high" | "low";
  sortedBestToko: any[];
  handleSortTokoChange: (e: any) => void;
  awal: string;
  akhir: string;
}

const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({
  loadingDetail,
  productsDetail,
  selectedRowData,
  sortOrderToko,
  sortedBestToko,
  handleSortTokoChange,
  awal,
  akhir,
}) => {
  const dispatch = useAppDispatch();
  const [sortOrder, setSortOrder] = useState<"low" | "high">("high");
  const { productsDetailHargaBySite, attentionLoading } = useAppSelector(
    (state) => state.product
  );

  const sortedBestPrice = [...(productsDetailHargaBySite || [])].sort((a, b) =>
    sortOrder === "low" ? a.qty - b.qty : b.qty - a.qty
  );

  const handleSortChange = (e: RadioChangeEvent) => {
    setSortOrder(e.target.value);
  };

  const [expandedRowKey, setExpandedRowKey] = useState(null);

  const handleRowExpand = (expanded: boolean, record: any) => {
    if (expanded) {
      setExpandedRowKey(record.kdtoko);
      dispatch(
        fetchDetailPriceBySite({
          awal,
          akhir,
          kode_brg: selectedRowData.artikel,
          kdtoko: record.kdtoko,
        })
      );
    } else {
      setExpandedRowKey(null);
    }
  };

  if (loadingDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-h-[80vh] overflow-auto">
      <div className="grid grid-cols-2 gap-4 bg-[#394049] p-4 rounded-md text-white mb-8">
        <div>
          <div className="flex items-center mb-2">
            <div className="w-40 font-semibold">Name SKU</div>
            <div className="w-4">:</div>
            <div className="flex-1">{productsDetail?.sku[0].serial}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-40 font-semibold">Qty of sale</div>
            <div className="w-4">:</div>
            <div className="flex-1">{selectedRowData?.qty ?? "N/A"}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-40 font-semibold">% of sale</div>
            <div className="w-4">:</div>
            <div className="flex-1">
              {selectedRowData?.sales_percentage ?? "N/A"}%
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <div className="w-40 font-semibold">Tanggal</div>
            <div className="w-4">:</div>
            <div className="flex-1">
              {awal} - {akhir}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-40 font-semibold">Best price</div>
            <div className="w-4">:</div>
            <div className="flex-1">
              {formatRupiah(productsDetail?.bestPrice[0]?.brutto ?? 0) || "N/A"}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-40 font-semibold">Best Color</div>
            <div className="w-4">:</div>
            <div className="flex-1">
              {productsDetail?.bestColor[0]?.color ?? "N/A"}
            </div>
          </div>
        </div>
      </div>

      <Radio.Group
        onChange={handleSortTokoChange}
        value={sortOrderToko}
        className="mb   -4"
      >
        <Radio value="high">High to Low</Radio>
        <Radio value="low">Low to High</Radio>
      </Radio.Group>

      <Table
        dataSource={sortedBestToko}
        loading={attentionLoading}
        columns={[
          {
            title: "Store Code",
            dataIndex: "kdtoko",
            key: "kdtoko",
            width: 200,
          },
          {
            title: "Quantity",
            dataIndex: "qty",
            key: "qty",
            width: 200,
          },
          {
            title: "Brutto",
            dataIndex: "brutto",
            key: "brutto",
            width: 200,
            render: (value) => formatRupiah(value),
          },
          {
            title: "Discount",
            dataIndex: "disc",
            key: "disc",
            width: 200,
            render: (value) => formatRupiah(value),
          },
          {
            title: "Netto",
            dataIndex: "netto",
            key: "netto",
            width: 200,
            render: (value) => formatRupiah(value),
          },
          {
            title: "% of Sales",
            dataIndex: "sales_percentage",
            key: "sales_percentage",
            width: 200,
            render: (value) => `${value}%`,
          },
        ]}
        rowKey="kdtoko"
        pagination={false}
        scroll={{ y: 500 }}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <Table
                dataSource={sortedBestPrice.slice(0, 10)}
                columns={[
                  {
                    title: "",
                    dataIndex: "",
                    key: "placeholder",
                    render: () => null,
                    width: 200,
                  },
                  {
                    title: "Quantity",
                    dataIndex: "qty",
                    key: "qty",
                    width: 200,
                    sorter: (a, b) => a.qty - b.qty,
                  },
                  {
                    title: "Brutto",
                    dataIndex: "brutto",
                    key: "brutto",
                    width: 200,
                    render: (value) => formatRupiah(value),
                  },
                  {
                    title: "Discount",
                    dataIndex: "disc",
                    key: "disc",
                    width: 200,
                    render: (value) => formatRupiah(value),
                  },
                  {
                    title: "Netto",
                    dataIndex: "netto",
                    key: "netto",
                    width: 200,
                    render: (value) => formatRupiah(value),
                  },
                  {
                    title: "% of Sales",
                    dataIndex: "sales_percentage",
                    key: "sales_percentage",
                    width: 200,
                    render: (value) => `${value}%`,
                  },
                ]}
                rowKey="qty"
                pagination={false}
                showHeader={true}
              />
            );
          },
          onExpand: handleRowExpand,
          expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
        }}
      />
    </div>
  );
};

export default ProductDetailsContent;
