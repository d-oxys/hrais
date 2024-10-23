'use client';
import { Breadcrumb, Button } from 'antd';
import { PlusOutlined, RightOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import TableComponent from '@root/app/components/Table';
import { useEffect, useState } from 'react';
import { deleteCompany, getCompanies, setCompanyStatus } from '@root/libs/store/thunk/company';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { CompanyState } from '@root/libs/types/company';
import styles from './company.module.scss';
import DropdownStatus from '@root/app/components/DropdownStatus';
import { useRouter } from 'next/navigation';
import BusinessUnitTable from './components/BusinessUnitTable';
import DynamicModal from '@root/app/components/DynamicModal';
import FormBusinessUnit from './components/FormBusinessUnit';
import { getDirectorateList } from '@root/libs/store/thunk/directorate';
import DeleteButton from '@root/app/components/DeleteButton';
import AddButtonList from '@root/app/components/AddButtonList';
import EditButton from '@root/app/components/EditButton';
import { capitalizeEachWord } from '@root/libs/utils';

const CompanyPage = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();

  const { companies, loading }: { companies: CompanyState[]; loading: boolean } = useAppSelector((state) => state.company);

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [showModalBU, setShowModalBU] = useState<boolean>(false);
  const [updatedStatus, setUpdatedStatus] = useState<{ [key: number]: string }>({});

  const handleExpandRow = (record: any) => {
    setExpandedRowKeys((prevKeys) => (prevKeys.includes(record.company.id) ? prevKeys.filter((key) => key !== record.company.id) : [record.company.id]));
  };

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const handleDeleteCompany = async (company_id: string) => {
    const result = await dispatch(deleteCompany(company_id));
    if (result && result.success) {
      await dispatch(getCompanies());
      route.refresh();
    } else {
      console.error('Failed to delete business unit');
    }
  };

  const breadcrumb = [
    { href: '#', title: 'Settings' },
    { href: '/settings/company', title: 'Company' },
  ];

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const capitalizedStatus = capitalizeEachWord(status);
      const result = await dispatch(setCompanyStatus(id, capitalizedStatus as 'Aktif' | 'Tidak Aktif'));
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
      width: 100,
      render: () => {
        return <div className='border-l-[10px] border-[#387AFF] flex h-[100px] items-center rounded-[10px] justify-center'>Company</div>;
      },
    },
    {
      key: 'name',
      dataIndex: ['company', 'name'],
      render: (text: string, record: any) => {
        return (
          <div className='flex pl-[50px] h-[100px] items-center cursor-pointer justify-between'>
            <div className='flex w-1/2 gap-5' onClick={() => handleExpandRow(record)}>
              <div>
                <RightOutlined />
              </div>
              <div>{text}</div>
            </div>
            <div className='pl-[50px] flex w-1/2'>
              <EyeOutlined />
            </div>
          </div>
        );
      },
    },
    {
      key: 'status',
      dataIndex: ['company', 'status'],
      width: 170,
      render: (value: string, record: any) => {
        return (
          <div className='flex justify-center'>
            <DropdownStatus
              initialValue={updatedStatus[record.company.id] || value}
              id={record.company.id}
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
            <EditButton destinationPage={`/settings/company/edit/${record.company.id}`} />
            <AddButtonList
              title='Add New Business Unit'
              onClick={() => {
                setSelectedCompanyId(record.company.id);
                setShowModalBU(true);
              }}
            />
            {(!record.directorate || record.directorate.length === 0) && <DeleteButton handleDelete={() => handleDeleteCompany(record.company.id)} />}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className='mb-5'>
        <div className='flex justify-between'>
          <div>
            <p className='font-bold text-lg'>Company</p>
            <Breadcrumb items={breadcrumb} />
          </div>
          <div>
            <Button onClick={() => route.push('/settings/company/create')} type='primary' className='rounded-full'>
              Add Company <PlusOutlined />
            </Button>
          </div>
        </div>
        <div className={`mt-4 ${styles['table-company']}`}>
          <TableComponent
            loading={loading}
            rowKey={(record) => record.company.id}
            columns={column}
            showHeader={false}
            dataSource={Array.isArray(companies) ? companies : []}
            withSearch={false}
            expandable={{
              indentSize: 15,
              expandIconColumnIndex: -1,
              expandedRowKeys: expandedRowKeys,
              onExpand: (expanded, record) => {
                handleExpandRow(record);
              },
              expandedRowRender: (record) => <BusinessUnitTable companyId={record.company.id} businessUnits={record.company.businessUnits} />,
            }}
          />
        </div>
      </div>
      <DynamicModal
        isVisible={showModalBU}
        title='Form Business Unit'
        onHideModal={() => setShowModalBU(false)}
        footer={null}
        content={
          <FormBusinessUnit
            company_id={selectedCompanyId}
            callback={async () => {
              await dispatch(getCompanies());
              setShowModalBU(false);
            }}
          />
        }
      />
    </div>
  );
};

export default CompanyPage;
