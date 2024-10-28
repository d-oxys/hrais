'use client';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';

interface ProductLayoutProps {
  children: ReactNode;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  const menuItems = [
    { key: 'product-performance', label: 'Product Performance' },
    { key: 'group-performance', label: 'Group Performance' },
    { key: 'category-performance', label: 'Category Performance' },
    { key: 'sub-category-performance', label: 'Sub Category Performance' },
  ];

  const handleMenuClick = (key: string) => {
    router.push(`/product/${key}`);
    setIsDesktopMenuOpen(false);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-gray-800 rounded-t-md'>
        {/* Mobile Navigation (Horizontal Tabs) */}
        <nav className='md:hidden'>
          <div className='overflow-x-auto'>
            <div className='flex whitespace-nowrap py-0.5 mx-0.5'>
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  className={`
                    ${pathname === `/product/${item.key}` ? 'bg-white text-black font-bold' : 'text-white'}
                    rounded-t-md transition p-4 text-sm
                    hover:bg-gray-700 hover:text-white
                  `}
                  onClick={() => handleMenuClick(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Desktop Navigation (Dropdown) */}
        <div className='hidden md:block'>
          <div className='relative'>
            <div className='flex items-center justify-between p-4'>
              <button
                onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
                className='text-white hover:bg-gray-700 p-2 rounded-md flex items-center gap-2'
              >
                <Menu size={24} />
                <span className='font-medium'>
                  {menuItems.find(item => pathname === `/product/${item.key}`)?.label || 'Menu'}
                </span>
              </button>
            </div>

            {/* Desktop Dropdown Menu */}
            {isDesktopMenuOpen && (
              <div className='absolute z-50 left-0 top-full w-64 bg-gray-800 border border-gray-700 rounded-b-md shadow-lg'>
                <div className='flex flex-col py-2'>
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      className={`
                        ${pathname === `/product/${item.key}` 
                          ? 'bg-white text-black font-bold' 
                          : 'text-white hover:bg-gray-700'
                        }
                        p-4 text-left transition
                      `}
                      onClick={() => handleMenuClick(item.key)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className='p-6 bg-white flex-1'>
        <div className='max-w-7xl mx-auto'>
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProductLayout;