'use client';
import { useRouter, useParams } from 'next/navigation';
import ProductLayout from '../layout';

const ProductTabPage = () => {
  const router = useRouter();
  const params = useParams();
  const tab = params.tab;

  const renderContent = () => {
    switch (tab) {
      case 'product-performance':
        return <h1>Product Performance Content</h1>;
      case 'group-performance':
        return <h1>Group Performance Content</h1>;
      case 'category-performance':
        return <h1>Category Performance Content</h1>;
      case 'sub-category-performance':
        return <h1>Sub Category Performance Content</h1>;
      default:
        return <h1>Product Performance Content</h1>;
    }
  };

  return <ProductLayout>{renderContent()}</ProductLayout>;
};

export default ProductTabPage;
