'use client';
import { TableColumnsType, Menu, Popover, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import TableComponent from './components/table';
import DetailModal from './components/detailModal';
import FormPermission from '../components/FormPermission';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { fetchProducts } from '@root/libs/store/thunk/product';
import { FormOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

interface StoreData {
  kdtoko: string;
  qty: number;
  brutto: number;
  disc_r: number;
  total: number;
  sales_percentage: string;
  status: string[];
}

interface DataType {
  key: number;
  kode_brg: string;
  name: string;
  stores: StoreData[];
}

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStoreData, setSelectedStoreData] = useState<StoreData | null>(null);
  const [awal, setAwal] = useState<string | undefined>(undefined);
  const [akhir, setAkhir] = useState<string | undefined>(undefined);
  const [kdtoko, setKdtoko] = useState<string | undefined>(undefined);
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [artikel, setArtikel] = useState<string | undefined>(undefined);
  const { products, loading, error } = useAppSelector((state) => state.product);
  const selectedSites = useAppSelector((state) => state.selectedSites.sites);

  useEffect(() => {
    dispatch(fetchProducts({ awal, akhir, kdtoko: selectedSites, brand, artikel }));
  }, [awal, akhir, selectedSites, brand, artikel, dispatch]);

  const handleRowClick = (store: StoreData) => {
    setSelectedStoreData(store);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedStoreData(null);
  };

  const uniqueKdtoko = Array.from(new Set(products.flatMap((product: DataType) => product.stores.map((store: StoreData) => store.kdtoko))));

  const generateSiteColumns = (kdtoko: string): any => [
    {
      title: 'Qty',
      dataIndex: ['stores'],
      key: `qty_${kdtoko}`,
      width: 100,
      render: (stores: StoreData[]) => {
        const store = stores.find((s) => s.kdtoko === kdtoko);
        return store ? store.qty : '-';
      },
    },
    {
      title: '% Of Sales',
      dataIndex: ['stores'],
      key: `salesPercentage_${kdtoko}`,
      width: 100,
      render: (stores: StoreData[]) => {
        const store = stores.find((s) => s.kdtoko === kdtoko);
        return store ? store.sales_percentage : '-';
      },
    },
    {
      title: 'Lost Sales',
      dataIndex: ['stores'],
      key: `lostSales_${kdtoko}`,
      width: 100,
      render: (stores: StoreData[]) => {
        const store = stores.find((s) => s.kdtoko === kdtoko);
        return store ? store.total - store.brutto + store.disc_r : '-';
      },
    },
    {
      key: 'view',
      dataIndex: 'view',
      title: 'View Detail',
      width: 150,
      render: (text: string, record: DataType) => (
        <div className='text-center flex justify-center w-full cursor-pointer'>
          {record.stores.map(
            (store) =>
              store.kdtoko === kdtoko && (
                <Button key={store.kdtoko} className='bg-primary/25 rounded-lg text-primary cursor-pointer' onClick={() => handleRowClick(store)}>
                  <EyeOutlined />
                </Button>
              )
          )}
        </div>
      ),
    },
  ];

  const categoryMenu = (handleFilterClick: (filterValue: string) => void) => (
    <Menu>
      <Menu.SubMenu key='bags' title='BAGS' onTitleClick={() => handleFilterClick('BAGS')}>
        <Menu.Item key='backpack' onClick={() => handleFilterClick('BACKPACK')}>
          Backpack
        </Menu.Item>
        <Menu.Item key='messenger' onClick={() => handleFilterClick('MESSENGER')}>
          Messenger Bag
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key='apparel' title='APPAREL' onTitleClick={() => handleFilterClick('APPAREL')}>
        <Menu.Item key='jackets' onClick={() => handleFilterClick('JACKETS')}>
          Jackets
        </Menu.Item>
        <Menu.Item key='t-shirts' onClick={() => handleFilterClick('T-SHIRTS')}>
          T-Shirts
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: 50,
      fixed: 'left',
    },
    {
      title: 'Artikel',
      dataIndex: 'kode_brg',
      key: 'kode_brg',
      width: 200,
      fixed: 'left',
      filters: [
        {
          text: (
            <Popover content={categoryMenu(() => {})} trigger='hover' placement='rightTop'>
              <span>Category</span>
            </Popover>
          ),
          value: 'ALL',
        },
      ],
    },
  ];

  uniqueKdtoko.forEach((kdtoko) => {
    columns.push({
      title: `Store ${kdtoko}`,
      children: generateSiteColumns(kdtoko),
    });
  });

  return (
    <>
      <h1 className='text-2xl font-semibold mb-8'>Article Performance on Store</h1>
      <TableComponent
        columns={columns}
        dataSource={products}
        // onBrandChange={(brand) => setKdtoko(brand)}
        onBrandChange={(brand) => setBrand(brand)}
        onSearch={(searchTerm) => setArtikel(searchTerm)}
        onDateChange={(dates) => {
          setAwal(dates[0]?.format('YYYY-MM-DD') || undefined);
          setAkhir(dates[1]?.format('YYYY-MM-DD') || undefined);
        }}
        isLoading={loading}
        filterContent={<FormPermission />}
      />
      <DetailModal visible={isModalVisible} onClose={handleModalClose} data={selectedStoreData} />
    </>
  );
};

export default App;
