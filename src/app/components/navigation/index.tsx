import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Popconfirm, message } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@root/libs/store';
import { setSelectedHam } from '@root/libs/store/slices/selectedSitesSlice';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface SubmenuItem {
  label: string;
  href: string;
}

interface NavItem {
  key: string;
  label: string;
  items?: SubmenuItem[];
}

const navItems: NavItem[] = [
  {
    key: 'sales',
    label: 'Sales',
    items: [
      { label: 'Sales Monitoring', href: '/sales/sales-monitoring' },
      { label: 'Dashboard Pareto', href: '/sales/dashboard-pareto' }
    ]
  },
  {
    key: 'finance',
    label: 'Finance & Accounting',
    items: [
      { label: 'Discount Monitoring', href: '#' },
      { label: 'Profit & Loss', href: '#' },
      { label: 'Pos & Ho', href: '#' },
      { label: 'Hutang Piutang', href: '#' },
      { label: 'Kas', href: '#' },
      { label: 'Cash Flow', href: '#' },
      { label: 'Budget per Dept', href: '#' },
      { label: 'Jurnal Report', href: '#' }
    ]
  },
  {
    key: 'warehouse',
    label: 'Warehouse',
    items: [
      { label: 'GI GR Recap Detail', href: '#' },
      { label: 'Throughput', href: '#' },
      { label: 'Store Occupancy', href: '/store-occupancy' },
      { label: 'Inbound Pending', href: '#' },
      { label: 'Outbound Pending', href: '#' },
      { label: 'Create PR Barang Jadi', href: '/create-pr' },
      { label: 'PR Request', href: '/pr-request' },
      { label: 'Tracking Stock', href: '/tracking-stock' }
    ]
  },
  {
    key: 'audit',
    label: 'Audit',
    items: [
      { label: 'Internal Audits', href: '#' },
      { label: 'External Audits', href: '#' },
      { label: 'Audit Reports', href: '#' },
      { label: 'Audit Tools', href: '#' },
      { label: 'Compliance', href: '#' },
      { label: 'Audit Logs', href: '#' }
    ]
  },
  {
    key: 'purchasing',
    label: 'Purchasing',
    items: [
      { label: 'Dashboard', href: '/purchasing-dash' },
      { label: 'Purchasing Request', href: '/purchasing-request' },
      { label: 'Bukti Penerimaan Barang', href: '/bukti-penerimaan' },
      { label: 'Master Supplier', href: '/master-supplier' },
      { label: 'Orders', href: '#' },
      { label: 'Payments', href: '#' }
    ]
  },
  {
    key: 'product',
    label: 'Product Performance',
    items: [
      { label: 'Product Performance', href: '/product/product-performance' },
      { label: 'Group Performance', href: '/product/group-performance' },
      { label: 'Category Performance', href: '/product/category-performance' },
      { label: 'Sub Category Performance', href: '/product/sub-category-performance' },
      { label: 'Site Performance', href: '/product/site-performance' }
    ]
  }
];

const Navigation: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedHam = useAppSelector((state) => state.selectedSites.ham);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleSidebar = () => {
    const newSidebarState = !isSidebarOpen;
    setIsSidebarOpen(newSidebarState);
    dispatch(setSelectedHam(newSidebarState));
  };

  const handleLogout = () => {
    message.info('Logging out...');
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white shadow-lg z-50 h-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            
            {/* Left Section: Logo */}
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-gray-600 focus:outline-none"
                >
                  <MenuOutlined className="text-xl" />
                </button>
              )}
              <Link href="/">
                <Image
                  src="/assets/images/23-Emacs-Logo.png"
                  width={128}
                  height={40}
                  alt="Logo"
                  className="mr-8 p-4"
                />
              </Link>
            </div>

            {/* Center Section: Navigation Items */}
            {!isMobile && (
              <div className="flex-grow flex justify-start space-x-4">
                {navItems.map((item) => (
                  <div key={item.key} className="relative group">
                    <button className="px-3 py-2 text-[#9095A1] hover:text-[#361C73] hover:font-bold text-sm flex items-center justify-start">
                      {item.label}
                      <MdKeyboardArrowDown className='ml-2'/>
                    </button>
                    <div className="absolute left-0 hidden group-hover:block w-48 bg-white shadow-lg rounded-md">
                      <div className="py-1">
                        {item.items?.map((subItem, index) => (
                          <Link
                            key={index}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-bold hover:text-[#361C73]"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Right Section: Log Out Button */}
            {!isMobile && (
              <div className="flex items-center">
                <Popconfirm
                  title="Log Out"
                  description="Are you sure you want to log out?"
                  onConfirm={handleLogout}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="px-3 py-2 text-gray-700 hover:text-red-500 text-sm">
                    Log Out
                  </button>
                </Popconfirm>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleSidebar}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Sidebar Header */}
            <div className="relative flex items-center justify-center p-4 border-b">
              <Image
                src="/assets/images/23-Emacs-Logo.png"
                width={100}
                height={32}
                alt="Logo"
                className=""
              />
              <button
                onClick={toggleSidebar}
                className="absolute right-4 text-gray-500 hover:text-red-500"
              >
                <CloseOutlined className="text-xl hover:text-red-500" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {navItems.map((item) => (
                <div key={item.key} className="border-b">
                  <button
                    onClick={() =>
                      setExpandedItems((prev) =>
                        prev.includes(item.key)
                          ? prev.filter((key) => key !== item.key)
                          : [...prev, item.key]
                      )
                    }
                    className="w-full flex justify-between items-center p-4 text-gray-700 hover:bg-gray-50"
                  >
                    <span>{item.label}</span>
                    {expandedItems.includes(item.key) ? (
                      <MdKeyboardArrowUp className="w-4 h-4" />
                    ) : (
                      <MdKeyboardArrowDown className="w-4 h-4" /> 
                    )}
                  </button>
                  {expandedItems.includes(item.key) && (
                    <div className="bg-gray-50">
                      {item.items?.map((subItem, index) => (
                        <Link
                          key={index}
                          href={subItem.href}
                          className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-100"
                          onClick={toggleSidebar}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Sidebar Footer with Logout */}
              <div className="p-4 border-t mt-auto">
                <Popconfirm
                  title="Log Out"
                  description="Are you sure you want to log out?"
                  onConfirm={handleLogout}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-md">
                    Log Out
                  </button>
                </Popconfirm>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;