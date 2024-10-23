'use client';
import { Breadcrumb } from 'antd';
import FormModule from '../components/FormFunction';
import { Suspense, useEffect, useState } from 'react';
import { usePermissions } from '@root/libs/contexts/PermissionsContext';
import { useRouter } from 'next/navigation';

const AddFunctioPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const permissions = usePermissions();
  const router = useRouter();
  const breadcrumb = [
    {
      href: '#',
      title: 'Settings',
    },
    {
      href: '/settings/roles/function',
      title: 'Function',
    },
    {
      href: '/settings/roles/function/create',
      title: 'Create New Function',
    },
  ];

  return (
    <Suspense>
      <div>
        <div className='mb-5'>
          <div className='flex justify-between'>
            <div>
              <p className='font-bold text-lg'>Create New Function</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <div className='mt-4 bg-white rounded-xl p-5'>
            <div className='font-bold text-primary mb-5'>Function Data</div>
            <div className='border-2 border-primary mb-4'></div>
            <FormModule />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AddFunctioPage;
