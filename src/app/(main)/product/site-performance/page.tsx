"use client";
import { TableColumnsType, Menu, Popover } from "antd";
import React, { useState, useEffect } from "react";
import TableComponent from "./components/table";
import DetailModal from "./components/detailModal";
import FormPermission from "../components/FormPermission";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { fetchProducts } from "@root/libs/store/thunk/product";

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
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null);

  // State untuk Filter Params
  const [awal, setAwal] = useState<string | undefined>(undefined);
  const [akhir, setAkhir] = useState<string | undefined>(undefined);
  const [kdtoko, setKdtoko] = useState<string | undefined>(undefined);

  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts({ awal, akhir, kdtoko }));
  }, [awal, akhir, kdtoko, dispatch]);

  const handleRowClick = (record: DataType) => {
    setSelectedRow(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRow(null);
  };

  const uniqueKdtoko = Array.from(
    new Set(
      products.flatMap((product: DataType) =>
        product.stores.map((store: StoreData) => store.kdtoko)
      )
    )
  );

  const generateSiteColumns = (kdtoko: string): any => [
    {
      title: "Qty",
      dataIndex: ["stores"],
      key: `qty_${kdtoko}`,
      width: 100,
      render: (stores: StoreData[]) => {
        const store = stores.find((s) => s.kdtoko === kdtoko);
        return store ? store.qty : "-";
      },
    },
    {
      title: "% Of Sales",
      dataIndex: ["stores"],
      key: `salesPercentage_${kdtoko}`,
      width: 100,
      render: (stores: StoreData[]) => {
        const store = stores.find((s) => s.kdtoko === kdtoko);
        return store ? store.sales_percentage : "-";
      },
    },
    {
      title: "Lost Sales",
      dataIndex: ["stores"],
      key: `lostSales_${kdtoko}`,
      width: 100,
      render: (stores: StoreData[]) => {
        const store = stores.find((s) => s.kdtoko === kdtoko);
        return store ? store.total - store.brutto + store.disc_r : "-";
      },
    },
  ];

  const categoryMenu = (handleFilterClick: (filterValue: string) => void) => (
    <Menu>
      <Menu.SubMenu
        key="bags"
        title="BAGS"
        onTitleClick={() => handleFilterClick("BAGS")}
      >
        <Menu.Item key="backpack" onClick={() => handleFilterClick("BACKPACK")}>
          Backpack
        </Menu.Item>
        <Menu.Item
          key="messenger"
          onClick={() => handleFilterClick("MESSENGER")}
        >
          Messenger Bag
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="apparel"
        title="APPAREL"
        onTitleClick={() => handleFilterClick("APPAREL")}
      >
        <Menu.Item key="jackets" onClick={() => handleFilterClick("JACKETS")}>
          Jackets
        </Menu.Item>
        <Menu.Item key="t-shirts" onClick={() => handleFilterClick("T-SHIRTS")}>
          T-Shirts
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "No",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
      fixed: "left",
    },
    {
      title: "Artikel",
      dataIndex: "kode_brg",
      key: "kode_brg",
      width: 200,
      fixed: "left",
      filters: [
        {
          text: (
            <Popover
              content={categoryMenu(() => {})}
              trigger="hover"
              placement="rightTop"
            >
              <span>Category</span>
            </Popover>
          ),
          value: "ALL",
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
      <h1 className="text-2xl font-semibold mb-8">
        Article Performance on Store
      </h1>
      <TableComponent
        columns={columns}
        dataSource={products}
        onRowClick={handleRowClick}
        onBrandChange={(brand) => setKdtoko(brand)}
        onSearch={(searchTerm) => setKdtoko(searchTerm)}
        onDateChange={(dates) => {
          setAwal(dates[0]?.format("YYYY-MM-DD") || undefined);
          setAkhir(dates[1]?.format("YYYY-MM-DD") || undefined);
        }}
        filterContent={<FormPermission />}
      />
      <DetailModal
        visible={isModalVisible}
        onClose={handleModalClose}
        data={selectedRow}
      />
    </>
  );
};

export default App;
