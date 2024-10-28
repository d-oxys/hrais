import React, { Suspense, useState } from 'react';
import { Table, Modal, Input, Row, Col, Radio, Select } from 'antd';
import { ColorData } from '@root/libs/store/slices/color.slice';
import { colorColumns, priceColumns } from '@root/libs/utils/tableColumns';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { fetchSalesDataDetail } from '@root/libs/store/thunk/groupKategori';
import { formatRupiah } from '@root/libs/utils/formatCurrency';
import { PriceData } from '@root/libs/store/slices/price.slice';

interface TableColorPageProps {
  colorData: ColorData[];
  priceData: PriceData[];
  loading: boolean;
  loadingPrice: boolean;
  kdtoko: string[];
  awal: string;
  akhir: string;
}

const TableColorPage: React.FC<TableColorPageProps> = ({ colorData, priceData, loading, loadingPrice, kdtoko, awal, akhir }) => {
  const dispatch = useAppDispatch();
  const { salesDetail, loadingDetail } = useAppSelector((state) => state.groupKategori);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<'color' | 'price' | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'low' | 'high'>('low');
  const [limit, setLimit] = useState<number>(10);

  const handleRowClick = (record: ColorData) => {
    setIsModalVisible(true);
    setSelectedType('color');

    const params = {
      group: 'color',
      kategori: record.color,
      awal: awal,
      akhir: akhir,
      kdtoko: kdtoko,
      limit: 1000,
    };

    dispatch(fetchSalesDataDetail(params));
  };

  const handleRowClickPrice = (record: PriceData) => {
    setIsModalVisible(true);

    const params = {
      group: 'price',
      kategori: record.range,
      awal: awal,
      akhir: akhir,
      kdtoko: kdtoko,
      limit: 1000,
    };

    dispatch(fetchSalesDataDetail(params));
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedType(null);
    setSelectedColor(null);
    setSearchTerm('');
  };

  // Filter and Sort Data
  const filteredColorData = colorData.filter((item) => item.warna.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredPriceData = priceData.filter((item) => item.range.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedColorData = [...filteredColorData].sort((a, b) => {
    if (sortOrder === 'low') {
      return a.qty - b.qty; // Sort by quantity ascending
    } else {
      return b.qty - a.qty; // Sort by quantity descending
    }
  });

  const sortedPriceData = [...filteredPriceData].sort((a, b) => {
    if (sortOrder === 'low') {
      return a.brutto - b.brutto; // Sort by brutto ascending
    } else {
      return b.brutto - a.brutto; // Sort by brutto descending
    }
  });

  // Apply limit
  const paginatedColorData = sortedColorData.slice(0, limit);
  const paginatedPriceData = sortedPriceData.slice(0, limit);

  return (
    <Suspense>
      <div>
        <div className='my-8 bg-white'>
          <Row gutter={[16, 16]} justify='space-between' align='middle'>
            <Col xs={24} md={12}>
              <Input placeholder='Search by Color' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginBottom: 16 }} />
            </Col>
            <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Radio.Group value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ marginRight: 16 }}>
                <Radio value='low'>Low to High</Radio>
                <Radio value='high'>High to Low</Radio>
              </Radio.Group>
              <Select defaultValue={10} style={{ width: 120 }} onChange={(value) => setLimit(value)}>
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={20}>20</Select.Option>
                <Select.Option value={50}>50</Select.Option>
                <Select.Option value={100}>100</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <h4 className='mb-4 text-lg text-black'>By Color Range</h4>
              <Table
                columns={colorColumns}
                dataSource={paginatedColorData}
                rowKey='warna'
                pagination={false}
                loading={loading}
                scroll={{ x: 'max-content' }}
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            </Col>
            <Col xs={24} md={12}>
              <h4 className='mb-4 text-lg text-black'>By Price Range</h4>
              <Table
                columns={priceColumns}
                dataSource={paginatedPriceData}
                rowKey='price'
                pagination={false}
                loading={loadingPrice}
                scroll={{ x: 'max-content' }}
                onRow={(record) => ({
                  onClick: () => handleRowClickPrice(record),
                })}
              />
            </Col>
          </Row>
        </div>
        <Modal
          title={selectedType === 'color' ? `Sales Detail for Color ${selectedColor}` : 'Sales Detail for Price Range'}
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
          width='85%'
          style={{
            maxHeight: '80vh',
            overflowY: 'auto',
            overflowX: 'auto',
          }}
        >
          <Input placeholder='Search Artikel' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginBottom: 16 }} />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Radio.Group value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ marginBottom: 16 }}>
                <Radio value='low'>Low to High</Radio>
                <Radio value='high'>High to Low</Radio>
              </Radio.Group>
            </Col>
            <Col span={12}>
              <Select defaultValue={10} style={{ width: 120, marginBottom: 16 }} onChange={(value) => setLimit(value)}>
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={20}>20</Select.Option>
                <Select.Option value={50}>50</Select.Option>
                <Select.Option value={100}>100</Select.Option>
              </Select>
            </Col>
          </Row>
          {(salesDetail?.length || 0) > 0 ? (
            <Table
              dataSource={salesDetail || []}
              loading={loadingDetail}
              columns={[
                { title: 'Artikel', dataIndex: 'artikel', key: 'artikel' },
                { title: 'Description', dataIndex: 'description', key: 'description' },
                { title: 'Qty', dataIndex: 'qty', key: 'qty' },
                { title: 'Brutto', dataIndex: 'brutto', key: 'brutto', render: (value) => formatRupiah(value) },
                { title: 'Discount', dataIndex: 'disc', key: 'disc', render: (value) => formatRupiah(value) },
                { title: 'Netto', dataIndex: 'netto', key: 'netto', render: (value) => formatRupiah(value) },
                { title: '% of Sales', dataIndex: 'sales_percentage', key: 'sales_percentage', render: (value) => `${value ? value.toFixed(2) : 0}%` },
              ]}
              rowKey='artikel'
              pagination={false}
              scroll={{ x: 'max-content' }}
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
