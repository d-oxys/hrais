"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Layout, Dropdown, Menu, Space } from "antd";
import { useRouter } from "next/navigation";
import { SessionProvider, signOut, getSession } from "next-auth/react";
import AuthProvider from "@root/libs/contexts/authContext";
import MenuComponent from "../components/Menu";
import LoadingComponent from "../components/Loading";
import axios from "axios";
import Image from "next/image";
import {
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
  MailOutlined,
  CalendarOutlined,
  BellOutlined,
} from "@ant-design/icons";
import styles from "./layout.module.scss";
import { PermissionsProvider } from "@root/libs/contexts/PermissionsContext";
import Navigation from "../components/navigation";

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
      key: "1",
      label: <div onClick={() => route.push("/my-profile")}>Profile</div>,
    },
    {
      key: "2",
      label: <div onClick={() => route.push("")}>Change Password</div>,
    },
    {
      key: "3",
      label: (
        <div
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Logout
        </div>
      ),
    },
  ];

  const navItems = [
    { key: "sales", label: "Sales", hasSubmenu: true },
    { key: "finance", label: "Finance & Accounting", hasSubmenu: true },
    { key: "warehouse", label: "Warehouse", hasSubmenu: true },
    { key: "audit", label: "Audit", hasSubmenu: true },
    { key: "purchasing", label: "Purchasing", hasSubmenu: true },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins",
          colorText: "#5C6880",
        },
      }}
    >
      <SessionProvider>
        <AuthProvider>
          {!loading ? (
            <PermissionsProvider value={permissions}>
              <Layout style={{ minHeight: "100vh" }} className="font-Poppins">
                <Header className="bg-white p-0 sticky top-0 z-40">
                  <Navigation />
                </Header>
                <Layout className="bg-[#EEEEEE]">
                  <Content style={{ margin: "16px", background: "#EEEEEE" }}>
                    {children}
                  </Content>
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
