"use client";
import React, { useEffect, useState } from "react";
import { Table, TableColumnsType, Modal, Select } from "antd";
import ProductTableComponent from "@root/app/components/Table/product";
import originalData from "@root/libs/constants/staticdata";
import {
  InfoCircleOutlined,
  TagOutlined,
  MoneyCollectOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { getSiteData } from "@root/libs/store/thunk/rasite";
import _ from "lodash";

const { Option } = Select;

const ProductPerformancePage: React.FC = () => {
  const [filteredData, setFilteredData] = useState(originalData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const dispatch = useAppDispatch();
  const { loading: relationLoading }: { loading: boolean } = useAppSelector(
    (state) => state.relation
  );

  // Define filter options
  const channelOptions = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
    // Add more channels as needed
  ];

  const subCategoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
    // Add more subcategories as needed
  ];

  const [siteOptions, setSiteOptions] = useState<any>([]);
  const {
    sitedata,
    loading: siteLoading,
  }: { sitedata: any; loading: boolean } = useAppSelector(
    (state) => state.rasiteGroup
  );

  const categoryOptions = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
    // Add more categories as needed
  ];

  const groupOptions = [
    { value: "group1", label: "Group 1" },
    { value: "group2", label: "Group 2" },
    // Add more groups as needed
  ];

  const columns: TableColumnsType<any> = [
    {
      title: "Artikel",
      dataIndex: "artikel",
      key: "artikel",
      render: (text, record) => (
        <a onClick={() => handleArticleClick(record)}>{text}</a>
      ),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Brutto",
      dataIndex: "brutto",
      key: "brutto",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Netto",
      dataIndex: "netto",
      key: "netto",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "% of Sales",
      dataIndex: "percentageOfSales",
      key: "percentageOfSales",
      render: (value) => `${value}%`,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
  ];

  const secondaryColumns: TableColumnsType<any> = [
    {
      title: "Index",
      dataIndex: "key",
      key: "key",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Color",
      dataIndex: "details",
      key: "headerColor",
      render: (_, record) =>
        record.details.map((detail: any) => detail.headerColor).join(", "),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      }),
    },
  ];

  const expandedRowRender = (record: any) => (
    <Table
      columns={columns}
      dataSource={[record]}
      pagination={false}
      rowClassName={() => "expanded-row"}
    />
  );

  useEffect(() => {
    dispatch(getSiteData());
  }, [dispatch]);

  useEffect(() => {
    setSiteOptions(sitedata);
  }, [sitedata]);

  const handleSearch = (value: string) => {
    if (value.trim() === "") {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter((item) =>
        item.artikel.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleArticleClick = (record: any) => {
    setSelectedArticle(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedArticle(null);
  };

  const debouncedSearchSite = _.debounce(async (e: string) => {
    await dispatch(getSiteData(e, undefined, 100));
  }, 300);

  const handleSearchSite = (e: string) => {
    debouncedSearchSite(e);
  };

  const handleClearSite = async () => {
    await dispatch(getSiteData());
  };

  return (
    <div>
      <ProductTableComponent
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        showPagination={false}
        filterContent={
          <div>
            <h4>Filter by Channel</h4>
            <Select
              placeholder="Select Channel"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {channelOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>

            <h4>Filter by Sub Category</h4>
            <Select
              placeholder="Select Sub Category"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {subCategoryOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>

            <h4>Filter by Site</h4>
            <Select
              placeholder="Select Site"
              showSearch
              onSearch={handleSearchSite}
              allowClear
              onClear={handleClearSite}
              filterOption={false}
              loading={siteLoading}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {siteOptions.map((item: any) => (
                <Select.Option
                  key={item.site}
                  value={item.site}
                  disabled={siteLoading || relationLoading}
                >
                  {item.site} - {item.name} ({item.category})
                </Select.Option>
              ))}
            </Select>

            <h4>Filter by Category</h4>
            <Select
              placeholder="Select Category"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {categoryOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>

            <h4>Filter by Group</h4>
            <Select
              placeholder="Select Group"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {groupOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        }
      />
      <Modal
        title="Article Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedArticle && (
          <div>
            <p>
              <InfoCircleOutlined /> <strong>Artikel:</strong>{" "}
              {selectedArticle.artikel}
            </p>
            <p>
              <TagOutlined /> <strong>Qty:</strong> {selectedArticle.qty}
            </p>
            <p>
              <MoneyCollectOutlined /> <strong>Brutto:</strong>{" "}
              {selectedArticle.brutto}
            </p>
            <p>
              <TagOutlined /> <strong>Discount:</strong>{" "}
              {selectedArticle.discount}
            </p>
            <p>
              <MoneyCollectOutlined /> <strong>Netto:</strong>{" "}
              {selectedArticle.netto}
            </p>
            <p>
              <PercentageOutlined /> <strong>% of Sales:</strong>{" "}
              {selectedArticle.percentageOfSales}%
            </p>
          </div>
        )}
      </Modal>
      <div className="my-8 flex space-x-4 bg-white">
        <div className="w-1/2">
          <h4 className="mb-4 text-lg text-black">Top 20 Color</h4>
          <ProductTableComponent
            columns={secondaryColumns}
            data={filteredData}
            showPagination={false}
            showFilters={false}
            expandable={{
              expandedRowRender,
              rowExpandable: (record: any) => record.details.length > 0,
            }}
          />
        </div>
        <div className="w-1/2">
          <h4 className="mb-4 text-lg text-black">By Price Range</h4>
          <ProductTableComponent
            columns={secondaryColumns}
            data={filteredData}
            showPagination={false}
            showFilters={false}
            expandable={{
              expandedRowRender,
              rowExpandable: (record: any) => record.details.length > 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPerformancePage;
