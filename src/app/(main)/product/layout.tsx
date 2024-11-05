"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

interface ProductLayoutProps {
  children: React.ReactNode;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { key: "product-performance", label: "Product Performance" },
    { key: "group-performance", label: "Group Performance" },
    { key: "category-performance", label: "Category Performance" },
    { key: "sub-category-performance", label: "Sub Category Performance" },
    { key: "site-performance", label: "Site Performance" },
  ];

  const handleMenuClick = (key: string) => {
    router.push(`/product/${key}`);
    setIsExpanded(false);
  };

  // Get current active menu item
  const activeItem =
    menuItems.find((item) => pathname === `/product/${item.key}`)?.label ||
    "Select Performance View";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 rounded-t-md">
        {/* Web Version*/}
        <div className="hidden lg:block">
          <div
            className="flex items-center justify-between p-4 text-white cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="font-medium">{activeItem}</span>
            {isExpanded ? (
              <ArrowUpOutlined className="text-lg" />
            ) : (
              <ArrowDownOutlined className="text-lg" />
            )}
          </div>

          <div
            className={`
            ${isExpanded ? "block" : "hidden"}
            transition-all duration-300 ease-in-out
          `}
          >
            {menuItems.map((item) => (
              <button
                key={item.key}
                className={`
                  w-full
                  ${
                    pathname === `/product/${item.key}`
                      ? "bg-white text-black font-bold"
                      : "text-white"
                  }
                  rounded-md transition px-6 py-3 text-left hover:bg-gray-800
                `}
                onClick={() => handleMenuClick(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Version */}
        <nav className="lg:hidden flex flex-row py-0.5 px-0.5 space-x-1">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`
                ${
                  pathname === `/product/${item.key}`
                    ? "bg-white text-black font-bold"
                    : "text-white"
                }
                rounded-t-sm transition px-6 py-3 text-left hover:bg-white hover:text-black hover:font-bold lg:w-16
              `}
              onClick={() => handleMenuClick(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="p-6 bg-white flex-1">{children}</main>
    </div>
  );
};

export default ProductLayout;
