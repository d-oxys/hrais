'use client';
import { Breadcrumb, Avatar, Pagination } from 'antd';
import TableComponent from '@root/app/components/Table';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { getEmployees, setEmployeeStatus } from '@root/libs/store/thunk/employee';
import AddButton from '@root/app/components/AddButton';
import DropdownStatus from '@root/app/components/DropdownStatus';
import ModalDetailEmployee from './components/ModalDetailEmployee';
import { capitalizeEachWord } from '@root/libs/utils';

const EmployeePage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const { employees, loading, pagination } = useAppSelector((state) => state.employee);
  const [updatedStatus, setUpdatedStatus] = useState<{ [key: number]: string }>({});
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>({});
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<{
    name?: string;
    nip?: string;
  }>({});

  const breadcrumb = [
    { href: '#', title: 'Employee' },
    { href: '/employee/employee', title: 'All Employee' },
  ];

  useEffect(() => {
    dispatch(getEmployees(limit, currentPage, searchParams.name, searchParams.nip)).catch((error) => {
      console.error('Error fetching employees:', error);
    });
  }, [dispatch, limit, currentPage, searchParams]);

  useEffect(() => {
    setTotalPage(pagination.total);
  }, [pagination]);

  const handleRowLengthChange = (value: number) => {
    setCurrentPage(1);
    setLimit(value);
  };

  const handleSearch = (value: string) => {
    const [name, nip] = value.split(' ');
    setSearchParams({ name, nip });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const capitalizedStatus = capitalizeEachWord(status);
      const result = await dispatch(setEmployeeStatus(id, capitalizedStatus as 'Aktif' | 'Tidak Aktif'));

      if (result && result.success) {
        setUpdatedStatus((prev) => ({ ...prev, [id]: capitalizedStatus }));
      } else {
        console.error('Failed to update status:', result.error);
      }
    } catch (error) {
      console.error('Error occurred during status update:', error);
    }
  };

  const column = [
    {
      key: 'rownum',
      dataIndex: 'rownum',
      title: '#',
      render: (_: string, __: any, index: number) => index + 1,
      sorter: true,
      width: 10,
    },
    {
      key: 'profile',
      dataIndex: 'profile',
      title: 'Profile',
      width: 200,
      render: (_: string, record: any) => (
        <div
          className='flex gap-3 cursor-pointer'
          onClick={() => {
            setIsOpenDetail(true);
            setSelectedData(record);
          }}
        >
          <Avatar size={50} />
          <div>
            <div className='font-bold'>{record?.user?.name}</div>
            <div>{record?.user?.email}</div>
            <div>{record?.user?.phone}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'nip',
      dataIndex: 'nip',
      title: 'NIP',
      width: 100,
      render: (_: string, record: any) => record.user.nip,
    },
    {
      key: 'division',
      dataIndex: 'division',
      title: 'Division',
      width: 170,
      render: (_: string, record: any) => record?.position?.team?.section?.department?.division?.name,
    },
    {
      key: 'department',
      dataIndex: 'department',
      title: 'Department',
      width: 170,
      render: (_: string, record: any) => record?.position?.team?.section?.department?.name,
    },
    {
      key: 'section',
      dataIndex: 'section',
      title: 'Section',
      width: 170,
      render: (_: string, record: any) => record?.position?.team?.section?.name,
    },
    {
      key: 'position',
      dataIndex: 'position',
      title: 'Position',
      width: 170,
      render: (_: string, record: any) => record?.position?.name,
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Status',
      width: 170,
      render: (_: string, record: any) => (
        <div className='flex justify-center'>
          <DropdownStatus
            initialValue={updatedStatus[record.id] || record.user.status}
            id={record.key}
            statusOptions={[
              { value: 'Tidak Aktif', label: 'Tidak Aktif' },
              { value: 'Aktif', label: 'Aktif' },
            ]}
            onChangeStatus={handleStatusChange}
          />
        </div>
      ),
    },
  ];

  return (
    <Suspense>
      <div>
        <div className='mb-5'>
          <div className='flex mb-5 justify-between'>
            <div>
              <p className='font-bold text-lg'>Employee</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <AddButton label='Add Employee' destinationPage='/employee/employee/create' />
            </div>
          </div>
          <div>
            <TableComponent
              loading={loading}
              bordered
              rowSelection={{ type: 'checkbox' }}
              withLengthOption={true}
              withExport={false}
              columns={column}
              dataSource={employees}
              handleChangeRowLength={handleRowLengthChange}
              handleSearch={handleSearch}
              currentPage={currentPage}
              totalPage={totalPage}
              perPage={pagination.perPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <ModalDetailEmployee open={isOpenDetail} onCancel={() => setIsOpenDetail(false)} employeeData={selectedData} />
    </Suspense>
  );
};

export default EmployeePage;
