import React, { useEffect, useState } from 'react';
import { Radio, Table } from 'antd';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { productActions } from '@root/libs/store/slices/product.slice';
import { fetchDetailPriceBySite } from '@root/libs/store/thunk/product';
import { formatRupiah } from '@root/libs/utils/formatCurrency';
import ExpandedTable from './ExpandedTable';

interface ProductDetailsContentProps {
  loadingDetail: boolean;
  productsDetail: any;
  selectedRowData: any;
  sortOrderToko: 'high' | 'low';
  sortedBestToko: any[];
  handleSortTokoChange: (e: any) => void;
  awal: string;
  akhir: string;
}

const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({ loadingDetail, productsDetail, selectedRowData, sortOrderToko, sortedBestToko, handleSortTokoChange, awal, akhir }) => {
  const dispatch = useAppDispatch();
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null);
  const { productsDetailHargaBySite, attentionLoading } = useAppSelector((state) => state.product);
  const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);
  const [sortedExpandedData, setSortedExpandedData] = useState(productsDetailHargaBySite || []);

  const handleRowExpand = (expanded: boolean, record: any) => {
    if (expanded) {
      dispatch(productActions.clearDetailHargaBySite());
      setExpandedRowKey(`${record.kdtoko}_${record.qty}`);
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

  // Sorting function to update the sorted data for ExpandedTable
  const handleSortExpandData = (sortOrder: 'ascend' | 'descend' | null) => {
    const sortedData = [...(productsDetailHargaBySite || [])].sort((a, b) => {
      if (sortOrder === 'ascend') {
        return a.qty - b.qty;
      } else if (sortOrder === 'descend') {
        return b.qty - a.qty;
      }
      return 0;
    });
    setSortedExpandedData(sortedData);
  };

  // Trigger sorting whenever productsDetailHargaBySite or sortOrder changes
  useEffect(() => {
    handleSortExpandData(sortOrder);
  }, [productsDetailHargaBySite, sortOrder]);

  useEffect(() => {
    if (!expandedRowKey) {
      dispatch(productActions.clearDetailHargaBySite());
    }
  }, [expandedRowKey, dispatch]);

  if (loadingDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className='max-h-[80vh] overflow-auto'>
      <div className='grid grid-cols-2 gap-4 bg-[#394049] p-4 rounded-md text-white mb-8'>{/* Tampilkan informasi produk */}</div>

      {/* Main Table with sorting button in Quantity column */}
      <Table
        dataSource={sortedBestToko}
        loading={attentionLoading}
        columns={[
          {
            title: 'Store Code',
            dataIndex: 'kdtoko',
            key: 'kdtoko',
            width: 200,
          },
          {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
            width: 200,
            sorter: true, // Enable sorting in main table
            sortOrder: sortOrder, // Control sort order from state
            onHeaderCell: () => ({
              onClick: () => {
                const newSortOrder = sortOrder === 'ascend' ? 'descend' : 'ascend';
                setSortOrder(newSortOrder);
                handleSortExpandData(newSortOrder); // Apply sort to ExpandedTable data
              },
            }),
          },
          {
            title: 'Brutto',
            dataIndex: 'brutto',
            key: 'brutto',
            width: 200,
            render: (value) => formatRupiah(value),
          },
          {
            title: 'Discount',
            dataIndex: 'disc',
            key: 'disc',
            width: 200,
            render: (value) => formatRupiah(value),
          },
          {
            title: 'Netto',
            dataIndex: 'netto',
            key: 'netto',
            width: 200,
            render: (value) => formatRupiah(value),
          },
          {
            title: '% of Sales',
            dataIndex: 'sales_percentage',
            key: 'sales_percentage',
            width: 200,
            render: (value) => `${value}%`,
          },
        ]}
        rowKey={(record) => `${record.kdtoko}_${record.qty}`}
        pagination={false}
        scroll={{ y: 500 }}
        expandable={{
          expandedRowRender: () => <ExpandedTable dataSource={sortedExpandedData.slice(0, 10)} />,
          onExpand: handleRowExpand,
          expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
        }}
      />
    </div>
  );
};

export default ProductDetailsContent;
