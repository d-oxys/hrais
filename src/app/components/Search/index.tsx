"use client";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./search.module.scss";
import { SearchProps } from "antd/es/input";

interface SearchComponentProps extends SearchProps {
  placeholder?: string;
  onClick?: any;
}

const Search = (props: SearchComponentProps) => {
  const { placeholder, onClick, ...rest } = props;
  return (
    <div className={`${styles["search-input"]}`}>
      <Input.Search
        prefix={<SearchOutlined className="mx-2 rounded-full" />}
        placeholder={placeholder}
        size="large"
        allowClear
        className="text-sm"
        enterButton={<Button className="cursor-pointer text-sm">Search</Button>}
        {...rest}
      />
    </div>
  );
};
export default Search;
