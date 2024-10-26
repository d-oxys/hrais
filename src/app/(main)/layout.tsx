// File: layout.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { ConfigProvider, Layout, Dropdown, Menu, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { SessionProvider, signOut, getSession } from 'next-auth/react';
import AuthProvider from '@root/libs/contexts/authContext';
import MenuComponent from '../components/Menu';
import LoadingComponent from '../components/Loading';
import axios from 'axios';
import Image from 'next/image';
import { CaretDownOutlined, LeftOutlined, RightOutlined, MailOutlined, CalendarOutlined, BellOutlined } from '@ant-design/icons';
import styles from './layout.module.scss';
import { PermissionsProvider } from '@root/libs/contexts/PermissionsContext';

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }: { children: any }) => {
  const route = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [menu, setMenu] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<any>(null);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // Fetch roles data with access token
  // useEffect(() => {
  //   const fetchRolesData = async () => {
  //     try {
  //       const session: any = await getSession();
  //       const accessToken = session?.accessToken;

  //       if (!accessToken) {
  //         throw new Error('Access token is not available');
  //       }

  //       const response = await axios.get('https://apps-api-dev.duapuluhtiga.com/api/v1/settings/roles/module', {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const data = response.data;

  //       const filteredData = data.result.data
  //         .filter((module: any) => module.module.status.toLowerCase() === 'aktif')
  //         .map((module: any) => ({
  //           id: module.module.id,
  //           name: module.module.name,
  //           url: module.module.url,
  //           icon: module.module.icon,
  //           functions: module.module.functions
  //             .filter((func: any) => func.function.status.toLowerCase() === 'aktif') // Hanya function aktif
  //             .map((func: any) => ({
  //               id: func.function.id,
  //               name: func.function.name,
  //               url: `${module.module.url}${func.function.url}`,
  //             })),
  //         }));

  //       const permissionsData = filteredData.reduce((acc: any, module: any) => {
  //         module.functions.forEach((func: any) => {
  //           acc[module.name] = acc[module.name] || {};
  //           acc[module.name][func.name] = {
  //             read: func.read,
  //             create: func.create,
  //             update: func.update,
  //             delete: func.delete,
  //           };
  //         });
  //         return acc;
  //       }, {});

  //       setMenu(filteredData);
  //       setPermissions(permissionsData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Failed to fetch roles data:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchRolesData();
  // }, []);

  const items = [
    {
      key: '1',
      label: <div onClick={() => route.push('/my-profile')}>Profile</div>,
    },
    {
      key: '2',
      label: (
        <div
          onClick={() =>
            signOut({
              callbackUrl: '/',
            })
          }
        >
          Logout
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Poppins',
          colorText: '#5C6880',
        },
      }}
    >
      <SessionProvider>
        <AuthProvider>
          {!loading ? (
            <PermissionsProvider value={permissions}>
              {' '}
              {/* Tambahkan PermissionsProvider */}
              <Layout style={{ minHeight: '100vh' }} className='font-Poppins'>
                <Header className='bg-white flex border border-b-[#5B5B5B]/25' style={{ padding: 0, position: 'sticky', top: 0, zIndex: 1 }}>
                  <div className='min-w-[200px] px-5'>
                    <div className='flex gap-4 cursor-pointer items-center justify-center'>
                      <Image src='/assets/images/23-apps-header-logo.svg' width={100} height={40} alt='Logo Header' />
                      <div>
                        <CaretDownOutlined />
                      </div>
                    </div>
                  </div>
                  {/* <div className='flex justify-between w-full'>
                    <div className='flex gap-7 px-6'>
                      <div>
                        <LeftOutlined />
                      </div>
                      <div>
                        <RightOutlined />
                      </div>
                    </div>
                    <div className='flex px-6 justify-center gap-6'>
                      <div className='flex gap-2'>
                        <div>
                          <MailOutlined className='rounded-full border border-[#5B5B5B]/25 p-2 cursor-pointer' />
                        </div>
                        <div>
                          <CalendarOutlined className='rounded-full border border-[#5B5B5B]/25 p-2 cursor-pointer' />
                        </div>
                        <div className='flex'>
                          <div className='absolute -top-3 ml-4'>
                            <span className='bg-red-500 text-white p-1 rounded-full text-xs'>9+</span>
                          </div>
                          <div>
                            <BellOutlined className='rounded-full border border-[#5B5B5B]/25 p-2 cursor-pointer' />
                          </div>
                        </div>
                      </div>
                      <div className='flex'>
                        <Dropdown menu={{ items }}>
                          <a onClick={(e) => e.preventDefault()}>
                            <Space className='bg-blue-200 rounded-full m-3 h-[30px] w-[30px] flex justify-center text-center'>A</Space>
                          </a>
                        </Dropdown>
                      </div>
                    </div>
                  </div> */}
                </Header>
                <Layout className='bg-[#EEEEEE]'>
                  {/* <Sider trigger={null} collapsible={true} collapsed={collapsed} theme='light'>
                    <div className='flex flex-col justify-between h-full'>
                      <div className={styles['menu-list']}>
                        <MenuComponent menus={menu} />
                      </div>
                    </div>
                  </Sider> */}
                  <Content style={{ margin: '16px', background: '#EEEEEE' }}>{children}</Content>
                </Layout>
              </Layout>
            </PermissionsProvider>
          ) : (
            <LoadingComponent />
          )}
        </AuthProvider>
      </SessionProvider>
    </ConfigProvider>
  );
};

export default DashboardLayout;
