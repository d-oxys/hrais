import React, { Suspense, useState, useMemo } from "react";
import { Table, Modal, Input, Row, Col, Radio, Select } from "antd";
import { ColorData } from "@root/libs/store/slices/color.slice";
import { colorColumns, priceColumns } from "@root/libs/utils/tableColumns";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { fetchSalesDataDetailExtra } from "@root/libs/store/thunk/groupKategori";
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
  group: string | null;
}

const TableColorGroupPage: React.FC<TableColorPageProps> = ({
  colorData,
  priceData,
  loading,
  loadingPrice,
  kdtoko,
  awal,
  akhir,
  group,
}) => {
  const dispatch = useAppDispatch();
  const { salesDetail, loadingDetail } = useAppSelector(
    (state) => state.groupKategori
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"low" | "high">("low");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePrice, setCurrentPagePrice] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSizePrice, setPageSizePrice] = useState<number>(10);
  const [modalSortOrder, setModalSortOrder] = useState<"low" | "high">("low");
  const [modalSearchTerm, setModalSearchTerm] = useState("");

  const handleRowClick = (record: ColorData) => {
    setIsModalVisible(true);
    setSelectedColor(record.color);

    const params = {
      group: "kategori",
      kategori: group || "BAKCPACK",
      awal: awal,
      akhir: akhir,
      kdtoko: kdtoko,
      option: "color",
      value: record.color,
      limit: 1000,
    };

    dispatch(fetchSalesDataDetailExtra(params));
  };

  const handleRowClickPrice = (record: PriceData, index: number) => {
    setIsModalVisible(true);
    setSelectedPrice(record.group);

    const params = {
      group: "kategori",
      kategori: group || "BAKCPACK",
      awal: awal,
      akhir: akhir,
      kdtoko: kdtoko,
      option: "price",
      value: index?.toString(),
      limit: 1000,
    };

    dispatch(fetchSalesDataDetailExtra(params));
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedColor(null);
    setSelectedPrice(null);
    setModalSearchTerm("");
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const handlePageChangePrice = (page: number, pageSize?: number) => {
    setCurrentPagePrice(page);
    if (pageSize) setPageSizePrice(pageSize);
  };

  // Filter and Sort for Color Table
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

  const paginatedColorData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    return sortedColorData.slice(start, end);
  }, [sortedColorData, currentPage, pageSize]);

  // Filter and Sort for Price Table
  const filteredPriceData = useMemo(
    () =>
      priceData.filter((item) =>
        item.group?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [priceData, searchTerm]
  );

  const sortedPriceData = useMemo(() => {
    return [...filteredPriceData].sort((a, b) =>
      sortOrder === "low" ? a.brutto - b.brutto : b.brutto - a.brutto
    );
  }, [filteredPriceData, sortOrder]);

  const paginatedPriceData = useMemo(() => {
    const start = (currentPagePrice - 1) * pageSizePrice;
    const end = currentPagePrice * pageSizePrice;
    return sortedPriceData.slice(start, end);
  }, [sortedPriceData, currentPagePrice, pageSizePrice]);

  // Filter and Sort Data in Modal Table
  const sortedSalesDetail = useMemo(() => {
    const filteredDetails =
      salesDetail?.filter((item) =>
        item.artikel.toLowerCase().includes(modalSearchTerm.toLowerCase())
      ) || [];
    return [...filteredDetails].sort((a, b) =>
      modalSortOrder === "low" ? a.qty - b.qty : b.qty - a.qty
    );
  }, [salesDetail, modalSearchTerm, modalSortOrder]);

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
                onChange={(value) => setPageSize(value)}
              >
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={20}>20</Select.Option>
                <Select.Option value={50}>50</Select.Option>
                <Select.Option value={100}>100</Select.Option>
              </Select>
            </Col>
          </Row>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <Table
                columns={colorColumns}
                dataSource={paginatedColorData}
                rowKey="warna"
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: sortedColorData.length,
                  onChange: handlePageChange,
                }}
                loading={loading}
                scroll={{ x: "max-content" }}
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            </div>
            <div className="w-1/2">
              <Table
                columns={priceColumns}
                dataSource={paginatedPriceData}
                rowKey="group"
                pagination={{
                  current: currentPagePrice,
                  pageSize: pageSizePrice,
                  total: sortedPriceData.length,
                  onChange: handlePageChangePrice,
                }}
                loading={loadingPrice}
                scroll={{ x: "max-content" }}
                onRow={(record, index) => ({
                  onClick: () => handleRowClickPrice(record, index || 0),
                })}
              />
            </div>
          </div>
        </div>

        <Modal
          title={
            selectedColor
              ? `Sales Detail for Color ${selectedColor}`
              : `Sales Detail for Price ${selectedPrice}`
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
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col xs={24} md={12}>
              <Input
                placeholder="Search Artikel"
                value={modalSearchTerm}
                onChange={(e) => setModalSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={24} md={12}>
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
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content" }}
          />
        </Modal>
      </div>
    </Suspense>
  );
};

export default TableColorGroupPage;
