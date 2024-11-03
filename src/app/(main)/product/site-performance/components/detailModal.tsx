import React, { useEffect } from 'react';
import { Modal, Table, Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Card from './card';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { fetchProductDetail } from '@root/libs/store/thunk/product';

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
  const dispatch = useAppDispatch();
  const { productsDetail, loadingDetail, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (visible && data?.kdbarang && data?.kdtoko) {
      dispatch(
        fetchProductDetail({
          awal: data.awal,
          akhir: data.akhir,
          kode_brg: data.kdbarang,
          kdtoko: data.kdtoko,
        })
      );
    }
  }, [visible, data, dispatch]);

  console.log(data);
  console.log(productsDetail);

  const colorData = productsDetail?.bestColor
    ? productsDetail.bestColor.slice(0, 3).map((item, index) => ({
        key: index + 1,
        color: item.color,
        qty: item.qty,
        sales: `${item.sales_percentage}%`,
      }))
    : table1Data;

  const priceData = productsDetail?.bestPrice
    ? productsDetail.bestPrice.slice(0, 3).map((item, index) => ({
        key: index + 1,
        priceRange: `$${item.brutto - item.disc} - $${item.brutto}`,
        qty: item.qty,
        sales: `${item.sales_percentage}%`,
      }))
    : table2Data;

  const lostSales = productsDetail?.detailTransaction.reduce((total, item) => total + item.brutto - item.netto, 0) || 0;
  const isPositiveSales = data?.sales_percentage > 1;

  return (
    <Modal title='Detail Artikel Performance' visible={visible} onCancel={onClose} footer={null} width='70%' style={{ top: 20 }} bodyStyle={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
      {data && (
        <div className='grid grid-cols-2 gap-4 bg-[#394049] p-4 rounded-md text-white mb-8'>
          <div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>Name SKU</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{data.kdbarang}</div>
            </div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>Qty of sale</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{data.qty}</div>
            </div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>% of sale</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{data.sales_percentage}%</div>
            </div>
          </div>
          <div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>Site</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{data.kdtoko}</div>
            </div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>Best price range</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{productsDetail?.bestPrice[0]?.brutto ?? 'N/A'}</div>
            </div>
            <div className='flex items-center mb-2'>
              <div className='w-40 font-semibold'>Best Color</div>
              <div className='w-4'>:</div>
              <div className='flex-1'>{productsDetail?.bestColor[0]?.color ?? 'N/A'}</div>
            </div>
          </div>
        </div>
      )}

      <div className='grid grid-cols-2 gap-4'>
        <Table columns={table1Columns} loading={loadingDetail} dataSource={colorData} pagination={false} bordered title={() => <strong>Table 1: Color Sales in SKU {data.kdbarang}</strong>} />
        <Table columns={table2Columns} loading={loadingDetail} dataSource={priceData} pagination={false} bordered title={() => <strong>Table 2: Price Range Sales in SKU {data.kdbarang}</strong>} />
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
        {isPositiveSales ? (
          // Jika penjualan positif
          <>
            <p className='block capitalize'>
              Artikel <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.sku[0]?.description || 'N/A'}</span> berhasil menyumbang penjualan signifikan sebesar{' '}
              <span className='p-1 rounded-lg bg-slate-100'>{data?.sales_percentage}%</span> pada SKU <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.sku[0]?.artikel || 'N/A'}</span> di toko{' '}
              <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.bestToko[0]?.kdtoko || 'N/A'}</span>. Warna artikel <span className='p-1 rounded-lg bg-neutral-200'>{productsDetail?.sku[0]?.warna || 'N/A'}</span> turut
              berkontribusi terhadap <span className='p-1 rounded-lg bg-slate-100'>{data?.sales_percentage}%</span> penjualan.
            </p>
            <p className='block capitalize mt-4'>Artikel tersebut menunjukkan performa yang baik dan disarankan untuk dipertahankan di lokasi saat ini untuk menjaga stabilitas penjualan.</p>
          </>
        ) : (
          // Jika penjualan negatif
          <>
            <p className='block capitalize'>
              Artikel <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.sku[0]?.description || 'N/A'}</span> belum mencapai target, hanya menyumbang <span className='p-1 rounded-lg bg-slate-100'>{data?.sales_percentage}%</span>{' '}
              penjualan dari SKU <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.sku[0]?.artikel || 'N/A'}</span> di toko <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.bestToko[0]?.kdtoko || 'N/A'}</span>.
              Hal ini mungkin karena range harga yang dianggap terlalu mahal.
            </p>
            <p className='block capitalize mt-4'>
              Berdasarkan analisis performa inventory, terdapat lost sales sebesar <span className='p-1 rounded-lg bg-slate-100'>{lostSales}</span>. Disarankan untuk mempertimbangkan penyesuaian harga atau strategi alokasi ulang ke lokasi{' '}
              <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.bestToko[1]?.kdtoko || 'N/A'}</span> yang memiliki potensi pasar lebih baik.
            </p>
          </>
        )}
      </div>

      {/* <div className='mt-8'>
        <p className='block capitalize'>
          Artikel <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.sku[0]?.description || 'N/A'}</span> menyumbang % of sales dari SKU{' '}
          <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.sku[0]?.artikel || 'N/A'}</span> dan menyumbang % of sales untuk site{' '}
          <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.bestToko[0]?.kdtoko || 'N/A'}</span> warna artikel <span className='p-1 rounded-lg bg-neutral-200'>{productsDetail?.sku[0]?.warna || 'N/A'}</span> menyumbang % of
          sales <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.bestColor[0]?.sales_percentage || '0'}%</span>
        </p>
        <p className='block capitalize mt-4'>
          Artikel tersebut bisa menyumbang <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.bestPrice[0]?.sales_percentage || '0'}%</span> % of Sales, maka artikel tersebut dapat di suggest dialihkan ke{' '}
          <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.bestToko[1]?.kdtoko || 'N/A'}</span> agar lebih cocok dan jadi Top Performance
        </p>
        <p className='block capitalize'>
          Berdasarkan performance tersebut dirasa kurang perform karena range harga terlalu mahal dan berdasarkan inventory performance, artikel tersebut terdapat lost sales sebesar{' '}
          <span className='p-1 rounded-lg bg-slate-100'>{productsDetail?.detailTransaction.reduce((total, item) => total + item.brutto - item.netto, 0) || '0'}</span>
        </p>
      </div> */}
    </Modal>
  );
};

export default DetailModal;
