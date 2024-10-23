'use client';
import AddButton from '@root/app/components/AddButton';
import { RightOutlined } from '@ant-design/icons';
import DeleteButton from '@root/app/components/DeleteButton';
import EditButton from '@root/app/components/EditButton';
import TableComponent from '@root/app/components/Table';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { DepartmentState } from '@root/libs/store/slices/department.slice';
import {
  deleteDepartment,
  getDepartmentList,
  setDepartmentStatus, // Pastikan ini diimport
} from '@root/libs/store/thunk/department';
import { Breadcrumb } from 'antd';
import { Suspense, useEffect, useState } from 'react';
import DropdownStatus from '@root/app/components/DropdownStatus';
import SectionTable from './SectionTable';
import styles from './childtable.module.scss';
import AddButtonList from '@root/app/components/AddButtonList';
import { getSectionList } from '@root/libs/store/thunk/section';
import DynamicModal from '@root/app/components/DynamicModal';
import FormSection from './FormSection';
import { getCompanies } from '@root/libs/store/thunk/company';
import { useRouter } from 'next/navigation';
import { capitalizeEachWord } from '@root/libs/utils';

interface DepartmentTableProps {
  divisionId: string;
  departments: DepartmentState[];
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ divisionId, departments }) => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string>('');

  const handleExpandRow = (record: any) => {
    setExpandedRowKeys((prevKeys) => (prevKeys.includes(record.department.idDepartment) ? prevKeys.filter((key) => key !== record.department.idDepartment) : [record.department.idDepartment]));
  };

  const handleDelete = async (id: string) => {
    const result = await dispatch(deleteDepartment(id));
    if (result && result.success) {
      await dispatch(getCompanies());
      route.refresh();
    } else {
      console.error('Failed to delete department');
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const capitalizedStatus = capitalizeEachWord(status);
      const result = await dispatch(setDepartmentStatus(id, capitalizedStatus as 'Aktif' | 'Tidak Aktif'));
      console.log(id, capitalizedStatus);

      if (result && result.success) {
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
        return <div className='border-l-[10px] border-[#D5D5D5] flex h-[100px] items-center rounded-[10px] justify-center'>Department</div>;
      },
    },
    {
      key: 'name',
      dataIndex: ['department', 'nameDepartment'],
      render: (text: string, record: any) => {
        return (
          <div className='flex pl-[50px] h-[100px] items-center cursor-pointer justify-between'>
            <div
              className='flex w-1/2 gap-5'
              onClick={async () => {
                handleExpandRow(record);
                await dispatch(getSectionList(record.department.idDepartment));
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
      dataIndex: ['department', 'status'],
      width: 170,
      render: (value: string, record: any) => {
        return (
          <div className='flex justify-center'>
            <DropdownStatus
              initialValue={value}
              id={record.department.idDepartment}
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
      title: 'Action',
      dataIndex: null,
      render: (text: string, record: any) => {
        return (
          <div className='flex gap-2 justify-center'>
            <EditButton destinationPage={`/settings/department/edit/${record.department.idDepartment}`} />
            <AddButtonList
              title='Add Section'
              onClick={() => {
                setShowModalForm(true);
                setSelectedData(record.department.idDepartment);
              }}
            />
            {(!record.sections || record.sections?.length === 0) && <DeleteButton handleDelete={() => handleDelete(record.department.idDepartment)} />}
          </div>
        );
      },
    },
  ];

  return (
    <div className={`${styles['table-content-child']} pl-[50px]`}>
      <TableComponent
        rowKey={(record) => record.department.idDepartment}
        loading={false}
        columns={column}
        dataSource={departments}
        tableOnly={true}
        withExport={false}
        showHeader={false}
        withSearch={false}
        expandable={{
          indentSize: 15,
          expandIconColumnIndex: -1,
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record) => handleExpandRow(record),
          expandedRowRender: (record) => <SectionTable department_id={record.department.idDepartment} sections={record.sections} />,
        }}
      />
      <DynamicModal
        isVisible={showModalForm}
        title='Form Section'
        onHideModal={() => setShowModalForm(false)}
        footer={null}
        content={
          <FormSection
            department_id={selectedData}
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

export default DepartmentTable;
