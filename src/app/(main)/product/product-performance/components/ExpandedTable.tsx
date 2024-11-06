// ExpandedTable.tsx
import React from 'react';
import { Table } from 'antd';
import { formatRupiah } from '@root/libs/utils/formatCurrency';

interface ExpandedTableProps {
  dataSource: any[];
}

const ExpandedTable: React.FC<ExpandedTableProps> = ({ dataSource }) => {
  console.log('Rendered ExpandedTable with dataSource:', dataSource); // Debug log untuk memastikan data yang diterima

  return (
    <Table
      dataSource={dataSource}
      columns={[
        {
          title: '',
          dataIndex: '',
          key: 'placeholder',
          render: () => null,
          width: 200,
        },
        {
          title: 'Quantity',
          dataIndex: 'qty',
          key: 'qty',
          width: 200,
          sorter: (a, b) => a.qty - b.qty,
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
      rowKey={(record, index) => `${record.kdtoko || 'default'}_${record.qty}_${index}`}
      pagination={false}
      showHeader={false}
    />
  );
};

export default ExpandedTable;
