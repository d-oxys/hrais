import React from 'react';
import { Modal, Table, Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Card from './card';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  status: string[];
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
}

interface DetailModalProps {
  visible: boolean;
  onClose: () => void;
  data: any;
}

const table1Data = [
  { key: 1, color: 'Red', qty: 120, sales: '30%' },
  { key: 2, color: 'Blue', qty: 80, sales: '20%' },
  { key: 3, color: 'Green', qty: 50, sales: '12.5%' },
];

const table2Data = [
  { key: 1, priceRange: '$10-$20', qty: 100, sales: '25%' },
  { key: 2, priceRange: '$21-$30', qty: 60, sales: '15%' },
  { key: 3, priceRange: '$31-$40', qty: 40, sales: '10%' },
];

const salesData = [
  { priceRange: '$10-$20', sales: 100 },
  { priceRange: '$21-$30', sales: 150 },
  { priceRange: '$31-$40', sales: 200 },
  { priceRange: '$41-$50', sales: 80 },
  { priceRange: '$51-$60', sales: 80 },
  { priceRange: '$61-$70', sales: 180 },
];

const cardData = [
  { title: 'Group', priceRange: '$10-$20', bestColor: 'Red', salesPercentage: 30, lostSalesPercentage: 5 },
  { title: 'Category', priceRange: '$20-$30', bestColor: 'Blue', salesPercentage: 25, lostSalesPercentage: 10 },
  { title: 'Sub Category', priceRange: '$15-$25', bestColor: 'Green', salesPercentage: 20, lostSalesPercentage: 8 },
];

const table1Columns: ColumnsType<{
  key: number;
  color: string;
  qty: number;
  sales: string;
}> = [
  { title: '#', dataIndex: 'key', key: 'key' },
  { title: 'Color', dataIndex: 'color', key: 'color' },
  { title: 'Qty', dataIndex: 'qty', key: 'qty' },
  { title: '% of Sales', dataIndex: 'sales', key: 'sales' },
];

const table2Columns: ColumnsType<{
  key: number;
  priceRange: string;
  qty: number;
  sales: string;
}> = [
  { title: '#', dataIndex: 'key', key: 'key' },
  { title: 'Price Range', dataIndex: 'priceRange', key: 'priceRange' },
  { title: 'Qty', dataIndex: 'qty', key: 'qty' },
  { title: '% of Sales', dataIndex: 'sales', key: 'sales' },
];

const DetailModal: React.FC<DetailModalProps> = ({ visible, onClose, data }) => {
  console.log(data);
  return (
    <Modal title='Detail Artikel Performance' visible={visible} onCancel={onClose} footer={null} width='70%' style={{ top: 20 }} bodyStyle={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
      {data && (
        <div className='grid grid-cols-2 gap-4 bg-[#394049] p-4 rounded-md text-white mb-8'>
          <div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>Name SKU</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{data.name}</div>
            </div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>Qty of sale</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{data.age}</div>
            </div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>% of sale</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{Array.isArray(data.status) ? data.status.join(', ') : 'N/A'}</div>
            </div>
          </div>
          <div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>Site</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{data.gender}</div>
            </div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>Best price range</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{data.building}</div>
            </div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>Best Color</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{data.companyAddress}</div>
            </div>
          </div>
        </div>
      )}

      <div className='grid grid-cols-2 gap-4'>
        <Table columns={table1Columns} dataSource={table1Data} pagination={false} bordered title={() => <strong>Table 1: Color Sales in SKU $sku</strong>} />
        <Table columns={table2Columns} dataSource={table2Data} pagination={false} bordered title={() => <strong>Table 2: Price Range Sales in SKU $sku</strong>} />
      </div>

      {/* Dynamic Card Display */}
      <Row gutter={[16, 16]} className='mt-4'>
        {cardData.map((card, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card {...card} />
          </Col>
        ))}
      </Row>

      <div className='mt-8'>
        <div className='mt-8'>
          <p className='block capitalize'>
            Artikel <span className='p-1 rounded-lg bg-slate-100'>$description</span> menyumbang % of sales dari SKU <span className='p-1 rounded-lg bg-slate-100'>$artikel</span> dan menyumbang % of sales untuk site{' '}
            <span className='p-1 rounded-lg bg-slate-100'>$nmSite</span> warna artikel <span className='p-1 rounded-lg bg-neutral-200'>$warna</span> menyumbang % of sales <span className='p-1 rounded-lg bg-slate-100'>75%</span>
          </p>
          <p className='block capitalize mt-4'>
            Artikel tersebut bisa menyumbang <span className='p-1 rounded-lg bg-slate-100'>$percent</span> % of Sales, maka artikel tersebut dapat di suggest dialihkan ke <span className='p-1 rounded-lg bg-slate-100'>$Site</span> agar lebih
            cocok dan jadi Top Performance
          </p>
          <p className='block capitalize'>
            Berdasarkan performance tersebut dirasa kurang perform karena range harga terlalu mahal dan berdasarkan inventory performance, artikel tersebut terdapat lost sales sebesar{' '}
            <span className='p-1 rounded-lg bg-slate-100'>$totalLostSales</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
