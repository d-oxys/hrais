'use client';
import { PlusOutlined, RightOutlined, EyeOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Popconfirm } from 'antd';
import TableComponent from '@root/app/components/Table';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import DropdownStatus from '@root/app/components/DropdownStatus';
import { deleteDivision, getDivisionList, setDivisionStatus } from '@root/libs/store/thunk/division';
import { DivisionState, DivisionType } from '@root/libs/store/slices/division.slice';
import DepartmentTable from './DepartmentTable';
import styles from './childtable.module.scss';
import EditButton from '@root/app/components/EditButton';
import AddButtonList from '@root/app/components/AddButtonList';
import DeleteButton from '@root/app/components/DeleteButton';
import { getDepartmentList } from '@root/libs/store/thunk/department';
import DynamicModal from '@root/app/components/DynamicModal';
import FormDepartment from './FormDepartment';
import { getCompanies } from '@root/libs/store/thunk/company';
import { capitalizeEachWord } from '@root/libs/utils';

interface DivisionTableProps {
  businessUnitId: string;
  divisions: DivisionState[];
}

const DivisionTable: React.FC<DivisionTableProps> = ({ businessUnitId, divisions }) => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string>('');
  const [updatedStatus, setUpdatedStatus] = useState<{ [key: number]: string }>({});

  const handleExpandRow = (record: any) => {
    setExpandedRowKeys((prevKeys) => (prevKeys.includes(record.division.idDivision) ? prevKeys.filter((key) => key !== record.division.idDivision) : [record.division.idDivision]));
  };

  const handleDelete = async (id: string) => {
    const result = await dispatch(deleteDivision(id));
    if (result && result.success) {
      await dispatch(getCompanies());
      route.refresh();
    } else {
      console.error('Failed to delete division');
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const capitalizedStatus = capitalizeEachWord(status);
      const result = await dispatch(setDivisionStatus(id, capitalizedStatus as 'Aktif' | 'Tidak Aktif'));

      console.log(id, capitalizedStatus);

      if (result && result.success) {
        setUpdatedStatus((prev) => ({ ...prev, [id]: capitalizedStatus }));
        await dispatch(getCompanies());
        route.refresh();
      } else if (result && result.error) {
        console.error('Failed to update status:', result.error);
      }
    } catch (error) {
      console.error('Error occurred during status update:', error);
    }
  };

  const column = [
    {
      key: 'title',
      dataIndex: null,
      width: 150,
      render: () => {
        return <div className='border-l-[10px] border-[#01A037] flex h-[100px] items-center rounded-[10px] justify-center'>Division</div>;
      },
    },
    {
      key: 'name',
      dataIndex: ['division', 'nameDivision'],
      render: (text: string, record: any) => {
        return (
          <div className='flex pl-[50px] h-[100px] items-center cursor-pointer justify-between'>
            <div
              className='flex w-1/2 gap-5'
              onClick={async () => {
                handleExpandRow(record);
                await dispatch(getDepartmentList(record.division.idDivision));
              }}
            >
              <div>
                <RightOutlined />
              </div>
              <div>{text}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'status',
      dataIndex: ['division', 'status'],
      width: 170,
      render: (value: string, record: any) => {
        return (
          <div className='flex justify-center'>
            <DropdownStatus
              initialValue={updatedStatus[record.division.idDivision] || value}
              id={record.division.idDivision}
              statusOptions={[
                { value: 'Tidak Aktif', label: 'Tidak Aktif' },
                { value: 'Aktif', label: 'Aktif' },
              ]}
              onChangeStatus={handleStatusChange}
            />
          </div>
        );
      },
    },
    {
      key: 'action',
      width: 170,
      dataIndex: null,
      render: (text: string, record: any) => {
        return (
          <div className='flex gap-2 justify-center'>
            <EditButton destinationPage={`/settings/division/edit/${record.division.idDivision}`} />
            <AddButtonList
              title='Add Department'
              onClick={() => {
                setShowModalForm(true);
                setSelectedData(record.division.idDivision);
              }}
            />
            {(!record.departments || record.departments?.length === 0) && <DeleteButton handleDelete={() => handleDelete(record.division.idDivision)} />}
          </div>
        );
      },
    },
  ];

  return (
    <div className={`${styles['table-content-child']} pl-[50px]`}>
      <TableComponent
        rowKey={(record) => record.division.idDivision}
        loading={false}
        columns={column}
        dataSource={divisions}
        tableOnly={true}
        withExport={false}
        showHeader={false}
        withSearch={false}
        expandable={{
          indentSize: 15,
          expandIconColumnIndex: -1,
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record) => handleExpandRow(record),
          expandedRowRender: (record) => <DepartmentTable divisionId={record.division.idDivision} departments={record.departments} />,
        }}
      />
      <DynamicModal
        isVisible={showModalForm}
        title='Form Department'
        onHideModal={() => setShowModalForm(false)}
        footer={null}
        content={
          <FormDepartment
            division_id={selectedData}
            callback={async () => {
              await dispatch(getCompanies());
              setShowModalForm(false);
            }}
          />
        }
      />
    </div>
  );
};
export default DivisionTable;
