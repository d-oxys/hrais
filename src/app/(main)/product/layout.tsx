"use client";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

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
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 rounded-t-md">
        <nav className="flex justify-start py-0.5 mx-0.5 space-x-8">
          <button
            className={`${pathname === "/product/product-performance" ? "bg-white text-black font-bold" : "text-white"} rounded-t-md transition p-4`}
            onClick={() => handleMenuClick("product-performance")}
          >
            Product Performance
          </button>
          <button
            className={`${pathname === "/product/group-performance" ? "bg-white text-black font-bold" : "text-white"} rounded-t-md transition p-4`}
            onClick={() => handleMenuClick("group-performance")}
          >
            Group Performance
          </button>
          <button
            className={`${pathname === "/product/category-performance" ? "bg-white text-black font-bold" : "text-white"} rounded-t-md transition p-4`}
            onClick={() => handleMenuClick("category-performance")}
          >
            Category Performance
          </button>
          <button
            className={`${pathname === "/product/sub-category-performance" ? "bg-white text-black font-bold" : "text-white"} rounded-t-md transition p-4`}
            onClick={() => handleMenuClick("sub-category-performance")}
          >
            Sub Category Performance
          </button>
          <button
            className={`${pathname === "/product/site-performance" ? "bg-white text-black font-bold" : "text-white"} rounded-t-md transition p-4`}
            onClick={() => handleMenuClick("site-performance")}
          >
            Site Performance
          </button>
        </nav>
      </header>
      <main className="p-6 bg-white flex-1">{children}</main>
    </div>
  );
};

export default ProductLayout;
