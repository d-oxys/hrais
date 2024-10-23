'use client';

import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import AuthProvider from '@root/libs/contexts/authContext';

const AuthLayout = ({ children }: { children: React.ReactElement }) => {
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
        <AuthProvider>{children}</AuthProvider>
      </SessionProvider>
    </ConfigProvider>
  );
};

export default AuthLayout;
