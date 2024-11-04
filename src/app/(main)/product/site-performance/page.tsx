"use client";
import { TableColumnsType, Menu, Popover, Button } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import TableComponent from "./components/table";
import DetailModal from "./components/detailModal";
import FormPermission from "../components/FormPermission";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { fetchProducts } from "@root/libs/store/thunk/product";
import { productActions } from "@root/libs/store/slices/product.slice";
import {
  FormOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Dayjs } from "dayjs";

interface StoreData {
  kdtoko: string;
  qty: number;
  brutto: number;
  disc_r: number;
  total: number;
  sales_percentage: string;
  status: string[];
  kdbarang?: string;
  awal?: string;
  akhir?: string;
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
  const [selectedStoreData, setSelectedStoreData] = useState<StoreData | null>(
    null
  );
  const [awal, setAwal] = useState<string | undefined>(undefined);
  const [akhir, setAkhir] = useState<string | undefined>(undefined);
  const [kdtoko, setKdtoko] = useState<string | undefined>(undefined);
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [artikel, setArtikel] = useState<string | undefined>(undefined);
  const [sortedData, setSortedData] = useState<DataType[]>([]);
  const [sortOrder, setSortOrder] = useState<"low" | "high">("low");
  const { products, loading, error } = useAppSelector((state) => state.product);
  const selectedSites = useAppSelector((state) => state.selectedSites.sites);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = useCallback(() => {
    setIsFetching(true);
    dispatch(
      fetchProducts({ awal, akhir, kdtoko: selectedSites, brand, artikel })
    ).finally(() => setIsFetching(false));
  }, [awal, akhir, selectedSites, brand, artikel, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedStoreData(null);
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    setAwal(dates && dates[0] ? dates[0].format("YYYY-MM-DD") : undefined);
    setAkhir(dates && dates[1] ? dates[1].format("YYYY-MM-DD") : undefined);
  };

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      const totalPercentageA = a.stores.reduce(
        (total: number, store: StoreData) => {
          return total + parseFloat(store.sales_percentage || "0");
        },
        0
      );
      const totalPercentageB = b.stores.reduce(
        (total: number, store: StoreData) => {
          return total + parseFloat(store.sales_percentage || "0");
        },
        0
      );
      return sortOrder === "low"
        ? totalPercentageA - totalPercentageB
        : totalPercentageB - totalPercentageA;
    });
    setSortedData(sortedProducts);
  }, [products, sortOrder]);

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
    // {
    //   title: 'Lost Sales',
    //   dataIndex: ['stores'],
    //   key: `lostSales_${kdtoko}`,
    //   width: 100,
    //   render: (stores: StoreData[]) => {
    //     const store = stores.find((s) => s.kdtoko === kdtoko);
    //     return store ? store.total - store.brutto + store.disc_r : '-';
    //   },
    // },
    {
      key: "view",
      dataIndex: "view",
      title: "View Detail",
      width: 150,
      render: (text: string, record: DataType) => (
        <div className="text-center flex justify-center w-full cursor-pointer">
          {record.stores.map(
            (store) =>
              store.kdtoko === kdtoko && (
                <Button
                  key={store.kdtoko}
                  className="bg-primary/25 rounded-lg text-primary cursor-pointer"
                  onClick={() => {
                    setSelectedStoreData({
                      ...store,
                      kdbarang: record.kode_brg,
                      awal,
                      akhir,
                    });
                    setIsModalVisible(true);
                  }}
                >
                  <EyeOutlined />
                </Button>
              )
          )}
        </div>
      ),
    },
  ];

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
        dataSource={sortedData}
        onSortChange={(order) => setSortOrder(order)}
        onBrandChange={(brand) => setBrand(brand)}
        onSearch={(searchTerm) => setArtikel(searchTerm)}
        onDateChange={handleDateChange}
        isLoading={loading || isFetching}
        filterContent={<FormPermission />}
      />

      <DetailModal
        visible={isModalVisible}
        onClose={handleModalClose}
        data={selectedStoreData}
      />
    </>
  );
};

export default App;
