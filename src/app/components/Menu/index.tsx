'use client';

import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { MenuOutlined, HomeFilled } from '@ant-design/icons';
import OutlineBulletIcon from '../icons/outline-bullet';
import { usePathname, useRouter } from 'next/navigation'; // Corrected import
import menuIcon from '@root/libs/utils/menuIcon';

interface MenuComponentProps {
  menus: any;
}

const MenuComponent = (props: MenuComponentProps) => {
  const route = useRouter();
  const path = usePathname();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const findActiveMenu = () => {
      let activeKeys: string[] = [];
      let openMenuKeys: string[] = [];

      // Check for direct menu items
      if (path === '/home') {
        activeKeys.push('menu-home');
      } else {
        props.menus.forEach((menu: any) => {
          if (menu.url === path) {
            activeKeys.push(`${menu.id}-${menu.name}-menu`);
          } else if (menu.functions.length > 0) {
            menu.functions.forEach((sub: any) => {
              if (sub.url === path) {
                activeKeys.push(`${sub.id}-${menu.name}-submenu-children`);
                openMenuKeys.push(`${menu.id}-${menu.name}-submenu-parent`);
              }
            });
          }
        });
      }

      setSelectedKeys(activeKeys);
      setOpenKeys(openMenuKeys);
    };

    findActiveMenu();
  }, [path]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Menu mode='inline' selectedKeys={selectedKeys} openKeys={openKeys} onOpenChange={onOpenChange}>
      <Menu.Item className='bg-white mb-5' key='menu-menu' icon={<MenuOutlined />}>
        Menu
      </Menu.Item>

      {/* Manually define Home menu item */}
      <Menu.Item className='bg-white' key='menu-home' icon={<HomeFilled />} onClick={() => route.push('/home')}>
        Home
      </Menu.Item>

      {props?.menus?.map((menu: any, index: number) => {
        if (menu.name === 'Home') {
          return null;
        }

        if (menu.functions.length < 1) {
          return (
            <Menu.Item
              className='bg-white'
              key={`${menu.id}-${menu.name}-menu`}
              icon={menuIcon(menu.icon)} // Use dynamic icon for other menus
              onClick={() => route.push(menu.url)}
            >
              {menu.name}
            </Menu.Item>
          );
        } else {
          return (
            <Menu.SubMenu className='bg-white' key={`${menu.id}-${menu.name}-submenu-parent`} icon={<div className='mr-1'>{menuIcon(menu.icon)}</div>} title={menu.name}>
              {menu?.functions?.map((sub: any, index: number) => (
                <Menu.Item className='bg-white' key={`${sub.id}-${menu.name}-submenu-children`} icon={<OutlineBulletIcon />} onClick={() => route.push(sub.url)}>
                  {sub.name}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        }
      })}
    </Menu>
  );
};
export default MenuComponent;
