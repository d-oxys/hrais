import {
  Button,
  Col,
  Input,
  Pagination,
  Radio,
  Row,
  Select,
  Table,
  TableProps,
} from "antd";
import {
  SearchOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import styles from "./table.module.scss";
import { useCallback, useState } from "react";
import ModalConfirmation from "../ModalConfirmation";
import { useAppDispatch } from "@root/libs/store";
import _ from "lodash";

interface TableComponentProps extends TableProps {
  withExport?: boolean;
  withSearch?: boolean;
  withLengthOption?: boolean;
  multiSelect?: boolean;
  multiSelectKey?: string;
  onApproval?: any;
  currentPage?: number;
  totalPage?: number;
  perPage?: number;
  handleSearch?: any;
  handlePageChange?: any;
  handleChangeRowLength?: any;
  floatingButton?: {
    approveButton: boolean;
    rejectButton: boolean;
  };
  tableOnly?: boolean;
}

const TableComponent = (props: TableComponentProps) => {
  const {
    tableOnly = false,
    withExport = true,
    withSearch = true,
    withLengthOption = false,
    multiSelect = false,
    multiSelectKey,
    onApproval,
    currentPage,
    totalPage,
    perPage,
    handleSearch,
    handleChangeRowLength,
    handlePageChange,
    floatingButton = {
      approveButton: false,
      rejectButton: false,
    },
    ...rest
  } = props;

  const dispatch = useAppDispatch();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(1);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const clearSelection = () => {
    setSelectedRowKeys([]);
  };

  const actionApproval = async () => {
    await dispatch(
      onApproval.action({
        ids: selectedRowKeys,
        status: approvalStatus,
      })
    );
    onApproval.callback();
    setOpenConfirmation(false);
    clearSelection();
  };

  const debouncedSearch = useCallback(
    _.debounce((value) => {
      handleSearch(value);
    }, 1000),
    []
  );

  return (
    <>
      {tableOnly === false ? (
        <div className="relative">
          <Row justify="space-between">
            <Col>
              {withExport && (
                <div className="mb-2">
                  <Radio.Group
                    className="rounded-full"
                    disabled={props.loading as boolean}
                  >
                    <Radio.Button value="copy">Copy</Radio.Button>
                    <Radio.Button value="csv">CSV</Radio.Button>
                    <Radio.Button value="excel">Excel</Radio.Button>
                    <Radio.Button value="pdf">PDF</Radio.Button>
                    <Radio.Button value="print">Print</Radio.Button>
                  </Radio.Group>
                </div>
              )}

              {withLengthOption && (
                <div>
                  Show
                  <Select
                    defaultValue={10}
                    style={{ width: "70px", margin: "0 5px" }}
                    disabled={props.loading as boolean}
                    onChange={(value) => handleChangeRowLength(value)}
                  >
                    <Select.Option key={10} selected value="10">
                      10
                    </Select.Option>
                    <Select.Option key={20} value="20">
                      20
                    </Select.Option>
                    <Select.Option key={30} value="30">
                      30
                    </Select.Option>
                    <Select.Option key={40} value="40">
                      40
                    </Select.Option>
                    <Select.Option key={50} value="50">
                      50
                    </Select.Option>
                  </Select>
                  Entries
                </div>
              )}
            </Col>
            <Col>
              {withSearch && (
                <Input
                  style={{ width: 200 }}
                  className="rounded-full"
                  prefix={<SearchOutlined />}
                  placeholder="Search"
                  disabled={props.loading as boolean}
                  onChange={(e) => {
                    if (
                      e.target.value.length >= 3 ||
                      e.target.value.length === 0
                    ) {
                      debouncedSearch(e.target.value);
                    }
                  }}
                  allowClear
                />
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col span={24} className={styles["table-content"]}>
              <Table
                {...rest}
                pagination={false}
                rowSelection={
                  multiSelect
                    ? {
                        // type: "checkbox",
                        selectedRowKeys,
                        onChange: onSelectChange,
                      }
                    : undefined
                }
              />
              {selectedRowKeys.length > 0 && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 shadow-2xl rounded">
                  <div className="flex gap-2 bg-white items-center h-[50px]">
                    <div className="bg-hbr-secondary text-white relative h-full w-[50px] items-center justify-center flex">
                      {selectedRowKeys.length}
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="mr-7">item selected</div>
                      {floatingButton.approveButton && (
                        <div
                          className="cursor-pointer justify-center text-center"
                          onClick={() => {
                            setOpenConfirmation(true);
                            setApprovalStatus(1);
                          }}
                        >
                          <CheckOutlined />
                          <div className="text-xs">Approved</div>
                        </div>
                      )}
                      {floatingButton.rejectButton && (
                        <div
                          className="cursor-pointer justify-center text-center"
                          onClick={() => {
                            setOpenConfirmation(true);
                            setApprovalStatus(2);
                          }}
                        >
                          <CloseOutlined />
                          <div className="text-xs">Rejected</div>
                        </div>
                      )}
                      <div
                        className="px-5 py-4 cursor-pointer"
                        onClick={() => clearSelection()}
                      >
                        <CloseOutlined />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <Row justify="space-between" className="mt-4">
                <Col></Col>
                <Col>
                  <Pagination
                    current={currentPage}
                    total={totalPage}
                    pageSize={perPage}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    pageSizeOptions={["10", "20", "30", "40", "50"]}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <ModalConfirmation
            visible={openConfirmation}
            onOk={() => actionApproval()}
            onCancel={() => setOpenConfirmation(false)}
          />
        </div>
      ) : (
        <Table
          {...rest}
          pagination={false}
          rowSelection={
            multiSelect
              ? {
                  // type: "checkbox",
                  selectedRowKeys,
                  onChange: onSelectChange,
                }
              : undefined
          }
        />
      )}
    </>
  );
};

export default TableComponent;
