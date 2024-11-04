import React, { Suspense, useState, useMemo } from "react";
import { Table, Modal, Input, Row, Col, Radio, Select } from "antd";
import { ColorData } from "@root/libs/store/slices/color.slice";
import { colorColumns, priceColumns } from "@root/libs/utils/tableColumns";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { fetchSalesDataDetail } from "@root/libs/store/thunk/groupKategori";
import { formatRupiah } from "@root/libs/utils/formatCurrency";
import { PriceData } from "@root/libs/store/slices/price.slice";

interface TableColorPageProps {
  colorData: ColorData[];
  priceData: PriceData[];
  loading: boolean;
  loadingPrice: boolean;
  kdtoko: string[];
  awal: string;
  akhir: string;
}

const TableColorPage: React.FC<TableColorPageProps> = ({
  colorData,
  priceData,
  loading,
  loadingPrice,
  kdtoko,
  awal,
  akhir,
}) => {
  const dispatch = useAppDispatch();
  const { salesDetail, loadingDetail } = useAppSelector(
    (state) => state.groupKategori
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<"color" | "price" | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"low" | "high">("low");
  const [limit, setLimit] = useState<number>(10);
  const [modalSortOrder, setModalSortOrder] = useState<"low" | "high">("low");
  const [modalSearchTerm, setModalSearchTerm] = useState("");

  const handleRowClick = (record: ColorData) => {
    setIsModalVisible(true);
    setSelectedType("color");

    const params = {
      group: "color",
      kategori: record.color,
      awal: awal,
      akhir: akhir,
      kdtoko: kdtoko,
      limit: 1000,
    };

    dispatch(fetchSalesDataDetail(params));
  };

  const handleRowClickPrice = (record: PriceData, index: number) => {
    setIsModalVisible(true);
    setSelectedType("price");

    const params = {
      group: "price",
      kategori: index.toString(),
      awal: awal,
      akhir: akhir,
      kdtoko: kdtoko,
      limit: 1000,
    };

    console.log(params);

    dispatch(fetchSalesDataDetail(params));
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedType(null);
    setModalSearchTerm("");
  };

  // Filter and Sort Data for Main Tables
  const filteredColorData = useMemo(
    () =>
      colorData.filter((item) =>
        item.color.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [colorData, searchTerm]
  );

  const sortedColorData = useMemo(() => {
    return [...filteredColorData].sort((a, b) =>
      sortOrder === "low" ? a.qty - b.qty : b.qty - a.qty
    );
  }, [filteredColorData, sortOrder]);

  const paginatedColorData = sortedColorData.slice(0, limit);

  // const filteredPriceData = useMemo(
  //   () =>
  //     priceData.filter((item) =>
  //       item.group.toLowerCase().includes(searchTerm.toLowerCase())
  //     ),
  //   [priceData, searchTerm]
  // );

  // const sortedPriceData = useMemo(() => {
  //   return [...filteredPriceData].sort((a, b) =>
  //     sortOrder === "low" ? a.brutto - b.brutto : b.brutto - a.brutto
  //   );
  // }, [filteredPriceData, sortOrder]);

  // const paginatedPriceData = sortedPriceData.slice(0, limit);

  // Filter and Sort Data for Modal Table
  const filteredSalesDetail = useMemo(
    () =>
      salesDetail?.filter((item) =>
        item.artikel.toLowerCase().includes(modalSearchTerm.toLowerCase())
      ) || [],
    [salesDetail, modalSearchTerm]
  );

  const sortedSalesDetail = useMemo(() => {
    return [...filteredSalesDetail].sort((a, b) =>
      modalSortOrder === "low" ? a.qty - b.qty : b.qty - a.qty
    );
  }, [filteredSalesDetail, modalSortOrder]);

  return (
    <Suspense>
      <div>
        <div className="my-8 bg-white">
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col
              xs={24}
              md={24}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Radio.Group
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ marginRight: 16 }}
              >
                <Radio value="low">Low to High</Radio>
                <Radio value="high">High to Low</Radio>
              </Radio.Group>
              <Select
                defaultValue={10}
                style={{ width: 120 }}
                onChange={(value) => setLimit(value)}
              >
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={20}>20</Select.Option>
                <Select.Option value={50}>50</Select.Option>
                <Select.Option value={100}>100</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <h4 className="mb-4 text-lg text-black">By Color Range</h4>
              <Table
                columns={[
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
                          <div className="text-base font-semibold">
                            {record.color}
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
                    sorter: (a, b) =>
                      (a.sales_percentage || 0) - (b.sales_percentage || 0),
                    onHeaderCell: () => ({
                      style: {
                        backgroundColor: "#ffffff",
                        color: "#000000",
                      },
                    }),
                  },
                ]}
                dataSource={paginatedColorData}
                rowKey="color"
                pagination={false}
                loading={loading}
                scroll={{ x: "max-content" }}
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            </Col>
            <Col xs={24} md={12}>
              <h4 className="mb-4 text-lg text-black">By Price Range</h4>
              <Table
                columns={[
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
                    dataIndex: "price_group",
                    key: "price_group",
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
                    onHeaderCell: () => ({
                      style: {
                        backgroundColor: "#ffffff",
                        color: "#000000",
                      },
                    }),
                    render: (value) => `${value ? value.toFixed(2) : 0}%`,
                  },
                ]}
                dataSource={priceData}
                rowKey="price"
                pagination={false}
                loading={loadingPrice}
                scroll={{ x: "max-content" }}
                onRow={(record, index) => ({
                  onClick: () => handleRowClickPrice(record, index || 0),
                })}
              />
            </Col>
          </Row>
        </div>
        <Modal
          title={
            selectedType === "color"
              ? "Sales Detail for Color"
              : "Sales Detail for Price Range"
          }
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
            value={modalSearchTerm}
            onChange={(e) => setModalSearchTerm(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Radio.Group
                value={modalSortOrder}
                onChange={(e) => setModalSortOrder(e.target.value)}
                style={{ marginBottom: 16 }}
              >
                <Radio value="low">Low to High</Radio>
                <Radio value="high">High to Low</Radio>
              </Radio.Group>
            </Col>
          </Row>
          {sortedSalesDetail.length > 0 ? (
            <Table
              dataSource={sortedSalesDetail}
              loading={loadingDetail}
              columns={[
                { title: "Artikel", dataIndex: "artikel", key: "artikel" },
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
              rowKey="artikel"
              pagination={false}
              scroll={{ x: "min-w-screen" }}
            />
          ) : (
            <p>No details available.</p>
          )}
        </Modal>
      </div>
    </Suspense>
  );
};

export default TableColorPage;
