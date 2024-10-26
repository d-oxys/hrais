// layouts/ProductLayout.tsx
'use client';
import { Layout, Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const { Header, Content } = Layout;

interface ProductLayoutProps {
  children: ReactNode;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (key: string) => {
    router.push(`/product/${key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['product-performance']}
          selectedKeys={[pathname.replace('/product/', '') || 'product-performance']}
          onClick={(e) => handleMenuClick(e.key)}
          items={[
            { label: 'Product Performance', key: 'product-performance' },
            { label: 'Group Performance', key: 'group-performance' },
            { label: 'Category Performance', key: 'category-performance' },
            { label: 'Sub Category Performance', key: 'sub-category-performance' },
          ]}
        />
      </Header>
      <Content style={{ padding: '24px', background: '#fff' }}>{children}</Content>
    </Layout>
  );
};

export default ProductLayout;
