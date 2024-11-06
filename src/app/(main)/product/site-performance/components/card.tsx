import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { Col, Spin, Alert } from "antd";
import {
  fetchSalesDataGroup,
  fetchSalesDataKategori,
  fetchSalesDataSubKategori,
} from "@root/libs/store/thunk/sales";

interface CardProps {
  data: any;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const { productsDetail, loadingDetail } = useAppSelector(
    (state) => state.product
  );

  const {
    salesDataGroup,
    salesDataKategori,
    salesDataSubKategori,
    loading,
    error,
  } = useAppSelector((state) => state.sales);

  useEffect(() => {
    const awal = data.awal || "2023-01-01";
    const akhir = data.akhir || "2023-12-31";
    const group = productsDetail?.sku[0]?.group || "BAGS";
    const kategori = productsDetail?.sku[0]?.kategori || "BACKPACK";
    const subkategori =
      productsDetail?.sku[0]?.sub_kategori || "LAPTOP BACKPACK";

    dispatch(fetchSalesDataGroup(awal, akhir, data.kdtoko, group));
    dispatch(fetchSalesDataKategori(awal, akhir, data.kdtoko, kategori));
    dispatch(fetchSalesDataSubKategori(awal, akhir, data.kdtoko, kategori));
  }, [dispatch, data, productsDetail]);

  if (error) return <Alert message={`Error: ${error}`} type="error" />;
  if (!salesDataGroup || !salesDataKategori)
    return <Alert message="No data available" type="info" />;

  const {
    price_range: groupPriceRange,
    best_color: groupBestColor,
    sales_percentage: groupSalesPercentage,
  } = salesDataGroup;

  const {
    price_range: kategoriPriceRange,
    best_color: kategoriBestColor,
    sales_percentage: kategoriSalesPercentage,
  } = salesDataKategori;

  const {
    price_range: subkategoriPriceRange,
    best_color: subkategoriBestColor,
    sales_percentage: subkategoriSalesPercentage,
  } = salesDataKategori;

  const groupLostSalesPercentage =
    groupSalesPercentage !== null
      ? (100 - groupSalesPercentage).toFixed(2)
      : "N/A";
  const kategoriLostSalesPercentage =
    kategoriSalesPercentage !== null
      ? (100 - kategoriSalesPercentage).toFixed(2)
      : "N/A";

  return (
    <>
      {/* Group Card */}
      <Col xs={24} sm={12} lg={8}>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-[#394049] text-white text-center py-2">
            <h3 className="font-semibold text-lg">
              Group: {productsDetail?.sku[0].group}
            </h3>
          </div>
          <div className="p-4">
            {loading || loadingDetail ? (
              <div className="flex justify-center items-center h-full">
                <Spin />
              </div>
            ) : (
              <>
                <p>
                  <strong>Price Range:</strong> {groupPriceRange || "N/A"}
                </p>
                <p>
                  <strong>Best Color:</strong> {groupBestColor || "N/A"}
                </p>
                <p>
                  <strong>% of Sales:</strong>{" "}
                  {groupSalesPercentage !== null
                    ? `${groupSalesPercentage.toFixed(2)}%`
                    : "N/A"}
                </p>
                {/* <p>
                  <strong>% of Lost Sales:</strong> {groupLostSalesPercentage}%
                </p> */}
              </>
            )}
          </div>
        </div>
      </Col>

      {/* Category Card */}
      <Col xs={24} sm={12} lg={8}>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-[#394049] text-white text-center py-2">
            <h3 className="font-semibold text-lg">
              Category: {productsDetail?.sku[0]?.kategori}
            </h3>
          </div>
          <div className="p-4">
            {loading || loadingDetail ? (
              <div className="flex justify-center items-center h-full">
                <Spin />
              </div>
            ) : (
              <>
                <p>
                  <strong>Price Range:</strong> {kategoriPriceRange || "N/A"}
                </p>
                <p>
                  <strong>Best Color:</strong> {kategoriBestColor || "N/A"}
                </p>
                <p>
                  <strong>% of Sales:</strong>{" "}
                  {kategoriSalesPercentage !== null
                    ? `${kategoriSalesPercentage.toFixed(2)}%`
                    : "N/A"}
                </p>
                {/* <p>
                  <strong>% of Lost Sales:</strong>{" "}
                  {kategoriLostSalesPercentage}%
                </p> */}
              </>
            )}
          </div>
        </div>
      </Col>

      {/* Subcategory Card */}
      <Col xs={24} sm={12} lg={8}>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-[#394049] text-white text-center py-2">
            <h3 className="font-semibold text-lg">
              Sub Category: {productsDetail?.sku[0]?.sub_kategori}
            </h3>
          </div>
          <div className="p-4">
            {loading || loadingDetail ? (
              <div className="flex justify-center items-center h-full">
                <Spin />
              </div>
            ) : (
              <>
                <p>
                  <strong>Price Range:</strong> {subkategoriPriceRange || "N/A"}
                </p>
                <p>
                  <strong>Best Color:</strong> {subkategoriBestColor || "N/A"}
                </p>
                <p>
                  <strong>% of Sales:</strong>{" "}
                  {subkategoriSalesPercentage !== null
                    ? `${subkategoriSalesPercentage.toFixed(2)}%`
                    : "N/A"}
                </p>
                {/* <p>
                  <strong>% of Lost Sales:</strong>{" "}
                  {kategoriLostSalesPercentage}%
                </p> */}
              </>
            )}
          </div>
        </div>
      </Col>
    </>
  );
};

export default Card;
