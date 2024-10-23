'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../style.module.scss';
import AlertErrorIcon from '@root/app/components/icons/alert-error';
import { Button, message, UploadFile } from 'antd';
import { useRouter } from 'next/navigation';
import ImageUpload from '@root/app/components/UploadImage';
import { useAppDispatch } from '@root/libs/store/';
import { useSession } from 'next-auth/react';

const Page = () => {
  const route = useRouter();
  const { data: user } = useSession() as any;
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<{ [key: string]: UploadFile | null }>({});

  const handleFileChange = (storageKey: string, file: UploadFile | null) => {
    setFiles((prevFiles) => ({ ...prevFiles, [storageKey]: file }));
  };

  const handleSubmit = () => {
    const requiredKeys = ['transcripts'];

    const allRequiredFilesPresent = requiredKeys.every((key) => files[key] !== null);

    if (allRequiredFilesPresent) {
      route.push('/complete-profile');
    } else {
      message.error('Please upload all required documents.');
    }
  };

  return (
    <div className={`${styles.page2} flex h-screen overflow-auto`}>
      <div className='bg-white min-h-[200vh] h-fit my-16 w-[55%] m-auto rounded-2xl p-16 flex flex-col'>
        <div>
          <Image src='/assets/images/23-logo.png' width={214} height={99} alt='23 Logo' />
        </div>
        <div className='border-4 border-primary rounded my-6'></div>
        <div className='text-xl'>Documents Preparation v2</div>
        <div className='text-negative flex gap-2 text-sm mt-1'>
          <AlertErrorIcon /> <span>Before proceeding, please prepare the documents below</span>
        </div>
        {/* form tambah file*/}
        <ImageUpload label='Kartu BPJS Kesehatan' required={false} storageKey='bpjsk_card' recommendedSize='300 x 200' onFileChange={handleFileChange} nip={user.user.user.nip} />
        <ImageUpload label='Ijazah / Surat Keterangan Lulus' required={false} storageKey='ijazah' recommendedSize='300 x 200' onFileChange={handleFileChange} nip={user.user.user.nip} />
        <ImageUpload label='Transkrip Nilai' required={true} recommendedSize='300 x 200' storageKey='transcript' onFileChange={handleFileChange} nip={user.user.user.nip} />
        <ImageUpload label='Surat Paklaring' required={false} recommendedSize='300 x 200' storageKey='verklaring' onFileChange={handleFileChange} nip={user.user.user.nip} />
        <ImageUpload label='Sertifikat Pelatihan' required={false} recommendedSize='300 x 200' storageKey='training' onFileChange={handleFileChange} nip={user.user.user.nip} />
        <ImageUpload label='Surat Keterangan Sehat' required={false} recommendedSize='300 x 200' storageKey='health_certificate' onFileChange={handleFileChange} nip={user.user.user.nip} />
        <div className='mt-auto'>
          <div className='font-bold text-negative text-sm'>{`The data you've entered can be temporarily saved, and you can continue to complete it at a later time.`}</div>
          <Button type='primary' htmlType='button' onClick={handleSubmit} className='w-full mt-4'>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
