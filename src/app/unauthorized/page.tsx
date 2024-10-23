'use client';

import { Button } from 'antd';

export default function Unauthorized() {
  const handleClick = () => {
    window.location.href = '/home';
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-10 rounded-lg shadow-lg'>
        <h1 className='text-4xl font-bold text-red-500'>403 - Unauthorized</h1>
        <p className='text-gray-700 mt-4'>Sorry, you don't have access to this page.</p>
        <Button type='primary' className='mt-6' onClick={handleClick}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
