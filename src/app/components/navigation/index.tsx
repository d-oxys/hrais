"use client";
import React, { useState } from "react";
import { Dropdown, message, Popconfirm, Space } from "antd";
import Image from "next/image";
import {
  CaretDownOutlined,
  MenuOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavItem {
  key: string;
  label: string;
  hasSubmenu?: boolean;
  submenuItems?: {
    label: string;
    href: string;
  }[];
}

const navItems: NavItem[] = [];

const Navigation = () => {
  const route = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubmenu = (key: string) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleLogout = () => {
    message.info("Logging out...");
    signOut({ callbackUrl: "/login" });
  };

  const profileItems = [
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

  return (
    <nav className="w-full bg-white border-b border-[#5B5B5B]/25">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex items-center gap-4 cursor-pointer">
              <Image
                src="/assets/images/23-apps-header-logo.svg"
                width={100}
                height={40}
                alt="Logo Header"
              />
              {/* <CaretDownOutlined className="text-theme-gray" /> */}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="md:hidden items-center flex-1 px-4">
            <div className="flex space-x-6 my-4">
              {navItems.map((item) => (
                <div key={item.key} className="relative group">
                  <button className="flex items-center space-x-1 text-theme-gray hover:text-primary py-2">
                    <span className="text-sm">{item.label}</span>
                    {/* {item.hasSubmenu && (
                    //   <CaretDownOutlined className="text-xs" />
                    )} */}
                  </button>
                  {item.hasSubmenu && (
                    <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-md mt-1 z-50">
                      <div className="py-1">
                        {item.submenuItems?.map((subitem, index) => (
                          <Link
                            key={index}
                            href={subitem.href}
                            className="block px-4 py-2 text-sm text-theme-gray hover:bg-gray-100"
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Profile & Settings */}
          {/* <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <SettingOutlined className="text-3xl text-theme-gray rounded-full cursor-pointer" />
            </div>
            <Dropdown menu={{ items: profileItems }} placement="bottomRight">
              <a onClick={(e) => e.preventDefault()}>
                <Space className="bg-blue-200 rounded-full h-8 w-8 flex items-center justify-center">
                  <span className="text-blue-600">A</span>
                </Space>
              </a>
            </Dropdown> */}

          <div className="lg:hidden flex items-center">
            <Popconfirm
              title="Log Out"
              description="Are you sure you want to log out?"
              onConfirm={handleLogout}
              okText="Yes"
              cancelText="No"
            >
              <button className="hover:text-red-500 text-black my-2 font-bold w-auto px-8 rounded-lg">
                Log Out
              </button>
            </Popconfirm>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="hidden md-flex">
          <div className="bg-white shadow-lg">
            {navItems.map((item) => (
              <div
                key={item.key}
                className="border-b border-gray-100 last:border-0"
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-theme-gray hover:text-primary hover:bg-gray-50"
                  onClick={() => {
                    if (item.hasSubmenu) {
                      toggleSubmenu(item.key);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.hasSubmenu && (
                    <span
                      className={`transform transition-transform duration-200 ${
                        expandedItems.includes(item.key) ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </button>

                {item.hasSubmenu && expandedItems.includes(item.key) && (
                  <div className="bg-gray-50">
                    {item.submenuItems?.map((subitem, index) => (
                      <Link
                        key={index}
                        href={subitem.href}
                        className="block py-2 px-8 text-sm text-theme-gray hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
