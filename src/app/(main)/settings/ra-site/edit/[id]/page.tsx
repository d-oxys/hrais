'use client';
import { Breadcrumb } from 'antd';
import FormAbsentGroup from '../../components/FormRaSite';
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { usePermissions } from '@root/libs/contexts/PermissionsContext';
import { useRouter } from 'next/navigation';

const UpdateAbsentGroupPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const permissions = usePermissions();
  const router = useRouter();

  const breadcrumb = [
    {
      href: '#',
      title: 'Settings',
    },
    {
      href: '/settings/group/absen/create',
      title: 'Absent Group',
    },
    {
      href: '/settings/group/absen/edit/' + params.id,
      title: 'Update Absent Group',
    },
  ];

  useEffect(() => {
    if (!permissions) {
      return;
    }

    if (!permissions['Settings'] || !permissions['Settings']['Absent Group'] || permissions['Settings']['Absent Group']['update'] !== 1) {
      router.replace('/unauthorized');
    } else {
      setIsLoading(false);
    }
  }, [permissions, router]);

  if (isLoading) {
    return null;
  }

  return (
    <Suspense>
      <div>
        <div className='mb-5'>
          <div className='flex justify-between'>
            <div>
              <p className='font-bold text-lg'>Update Absent Group</p>
              <Breadcrumb items={breadcrumb} />
            </div>
          </div>
          <div className='mt-4 bg-white rounded-xl p-5'>
            <div className='font-bold text-primary mb-5'>Absent Group Data</div>
            <div className='border-2 border-primary mb-4'></div>
            <FormAbsentGroup id={params.id.toString()} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default UpdateAbsentGroupPage;
