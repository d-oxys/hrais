'use client';
import { PlusOutlined, RightOutlined, EyeOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Popconfirm } from 'antd';
import TableComponent from '@root/app/components/Table';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { deleteDirectorate, getDirectorateList, setBusinessUnitStatus } from '@root/libs/store/thunk/directorate';
import DropdownStatus from '@root/app/components/DropdownStatus';
import DivisionTable from './DivisionTable';
import styles from './childtable.module.scss';
import AddButtonList from '@root/app/components/AddButtonList';
import EditButton from '@root/app/components/EditButton';
import DeleteButton from '@root/app/components/DeleteButton';
import { getDivisionList } from '@root/libs/store/thunk/division';
import DynamicModal from '@root/app/components/DynamicModal';
import FormDivision from './FormDivision';
import { BusinessUnitState } from '@root/libs/types/company';
import { getCompanies } from '@root/libs/store/thunk/company';
import { capitalizeEachWord } from '@root/libs/utils';

interface BusinessUnitTableProps {
  companyId: string;
  businessUnits: BusinessUnitState[];
}

const BusinessUnitTable: React.FC<BusinessUnitTableProps> = ({ companyId, businessUnits }) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const path = usePathname();

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string>('');
  const [updatedStatus, setUpdatedStatus] = useState<{ [key: number]: string }>({}); // State untuk menyimpan status yang diubah

  const handleExpandRow = (record: any) => {
    setExpandedRowKeys((prevKeys) => (prevKeys.includes(record.businessUnit.idBusinessUnit) ? prevKeys.filter((key) => key !== record.businessUnit.idBusinessUnit) : [record.businessUnit.idBusinessUnit]));
  };

  const handleDelete = async (id: string) => {
    const result = await dispatch(deleteDirectorate(id));
    if (result && result.success) {
      await dispatch(getCompanies());
      route.refresh();
    } else {
      console.error('Failed to delete business unit');
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const capitalizedStatus = capitalizeEachWord(status);
      const result = await dispatch(setBusinessUnitStatus(id, capitalizedStatus as 'Aktif' | 'Tidak Aktif'));
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
        return <div className='border-l-[10px] border-[#FFDA39] flex h-[100px] items-center rounded-[10px] justify-center'>Business Unit</div>;
      },
    },
    {
      key: 'name',
      dataIndex: ['businessUnit', 'nameBusinessUnit'],
      render: (text: string, record: any) => {
        return (
          <div className='flex pl-[50px] h-[100px] items-center cursor-pointer justify-between'>
            <div
              className='flex w-1/2 gap-5'
              onClick={async () => {
                handleExpandRow(record);
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
      dataIndex: ['businessUnit', 'status'],
      width: 170,
      render: (value: string, record: any) => {
        return (
          <div className='flex justify-center'>
            <DropdownStatus
              initialValue={updatedStatus[record.businessUnit.idBusinessUnit] || value}
              id={record.businessUnit.idBusinessUnit}
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
            <EditButton destinationPage={`/settings/business-unit/edit/${record.businessUnit.idBusinessUnit}`} />
            <AddButtonList
              title='Add New Division'
              onClick={() => {
                setShowModalForm(true);
                setSelectedData(record.businessUnit.idBusinessUnit);
              }}
            />
            <DeleteButton handleDelete={() => handleDelete(record.businessUnit.idBusinessUnit)} />
          </div>
        );
      },
    },
  ];

  return (
    <div className={`${styles['table-content-child']} pl-[50px]`}>
      <TableComponent
        rowKey={(record) => record.businessUnit.idBusinessUnit}
        loading={false}
        showHeader={false}
        tableOnly={true}
        columns={column}
        dataSource={businessUnits}
        withExport={false}
        withSearch={false}
        expandable={{
          indentSize: 15,
          expandIconColumnIndex: -1,
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record) => {
            handleExpandRow(record);
          },
          expandedRowRender: (record) => <DivisionTable businessUnitId={record.businessUnit.idBusinessUnit} divisions={record.divisions} />,
        }}
      />
      <DynamicModal
        isVisible={showModalForm}
        title='Form Division'
        onHideModal={() => setShowModalForm(false)}
        footer={null}
        content={
          <FormDivision
            directorate_id={selectedData}
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
export default BusinessUnitTable;
