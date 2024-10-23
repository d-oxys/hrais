'use client';
import { Breadcrumb, Button, Popconfirm } from 'antd';
import { EyeOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import TableComponent from '@root/app/components/Table';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { deleteRaSite, getRasiteGroupList } from '@root/libs/store/thunk/rasite';
import AddButton from '@root/app/components/AddButton';
import DropdownStatus from '@root/app/components/DropdownStatus';
import PermissionWrapper from '@root/libs/hooks/PermissionWrapper';

const RasiteGroupPage = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const { rasitegroups, loading, pagination } = useAppSelector((state) => state.rasiteGroup);

  const breadcrumb = [
    {
      href: '#',
      title: 'Settings',
    },
    {
      href: '/settings/ra-site',
      title: 'Rasite Group',
    },
  ];

  useEffect(() => {
    dispatch(getRasiteGroupList(limit, currentPage)).catch((error) => {
      console.error('Error fetching rasite groups:', error);
    });
  }, [dispatch, limit, currentPage]);

  useEffect(() => {
    setTotalPage(pagination.total);
  }, [pagination]);

  const handleDelete = (id: string) => {
    dispatch(deleteRaSite(id));
    dispatch(getRasiteGroupList(limit, currentPage));
  };

  const handleEdit = (id: number) => {
    route.push(`/settings/ra-site/edit/${id}`);
  };

  const handleView = (id: number) => {
    route.push(`/settings/rasite/group/view/${id}`);
  };

  const handleRowLengthChange = (value: number) => {
    setCurrentPage(1);
    setLimit(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      key: 'rownum',
      dataIndex: 'rownum',
      title: '#',
      render: (_: string, __: any, index: number) => index + 1,
      sorter: true,
      width: 50,
    },
    {
      key: 'user',
      dataIndex: 'user',
      title: 'User Name',
      render: (user: any) => user.name,
      width: 200,
    },
    {
      key: 'nip',
      dataIndex: 'user',
      title: 'NIP',
      render: (user: any) => user.nip,
      width: 150,
    },
    {
      key: 'site',
      dataIndex: 'site',
      title: 'Site',
      render: (site: any) => site.NameSite,
      width: 200,
    },
    {
      key: 'jobrole',
      dataIndex: 'jobrole',
      title: 'Job Role',
      render: (jobrole: any) => jobrole.name,
      width: 200,
    },
    {
      key: 'brand',
      dataIndex: 'brand',
      title: 'Brand',
      width: 100,
    },
    {
      key: 'action',
      width: 170,
      title: 'Action',
      dataIndex: null,
      render: (text: string, record: any) => (
        <div className='flex gap-2 justify-center'>
          <Button className='bg-primary/25 rounded-lg text-primary cursor-pointer' onClick={() => handleEdit(record.user.id)}>
            <FormOutlined />
          </Button>

          <Popconfirm title='Delete data' description='Are you sure to delete this data?' onConfirm={() => handleDelete(record.user.id)} okText='Yes' cancelText='No'>
            <Button className='bg-danger/25 rounded-lg text-danger cursor-pointer'>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
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
              <p className='font-bold text-lg'>Rasite Group</p>
              <Breadcrumb items={breadcrumb} />
            </div>
            <div>
              <AddButton label='Add Rasite Group' destinationPage='/settings/ra-site/create' />
            </div>
          </div>
          <div>
            <TableComponent
              loading={loading}
              bordered
              columns={columns}
              dataSource={rasitegroups}
              withExport={false}
              withLengthOption={true}
              handleChangeRowLength={handleRowLengthChange}
              currentPage={currentPage}
              totalPage={totalPage}
              perPage={pagination.perPage}
              handlePageChange={handlePageChange}
              rowSelection={{
                type: 'checkbox',
              }}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default RasiteGroupPage;
