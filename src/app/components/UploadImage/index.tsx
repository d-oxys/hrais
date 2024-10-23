import { useState } from 'react';
import { Upload, Button, message, Spin } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useAppDispatch } from '@root/libs/store/';
import {
  uploadPhoto,
  uploadKTP,
  uploadNPWP,
  uploadBPJS,
  uploadBPJSK,
  uploadIjazah,
  uploadTraining,
  uploadKeteranganSehat,
  uploadVerklaring,
  uploadTranskrip,
  uploadKK,
  uploadPhotoFull,
  deletePhoto,
  deleteTrainingPhoto,
  deleteHealthPhoto,
  deleteCardPhoto,
  deleteVerklaringPhoto,
  deleteTranskripPhoto,
  deleteIjazahPhoto,
  deleteNPWPPhoto,
  deleteBPJSPhoto,
  deleteBPJSKPhoto,
  deleteKKPhoto,
  deleteFullPhoto,
} from '@root/libs/store/thunk/document';

interface ImageUploadProps {
  label?: string;
  required?: boolean;
  accept?: string;
  maxSize?: number;
  recommendedSize?: string;
  storageKey: string;
  onFileChange: (storageKey: string, file: UploadFile | null) => void;
  disabled?: boolean;
  nip: string;
}

const ImageUpload = ({ label, required = false, accept = '.jpg,.png,.jpeg', maxSize = 2, recommendedSize = '300 x 300', storageKey, onFileChange, disabled = false, nip }: ImageUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          const result = e.target?.result as string;
          setPreviewImage(result);
          const file = fileList[fileList.length - 1].originFileObj as File;

          // Upload file to API
          switch (storageKey) {
            case 'self_photo':
              dispatch(uploadPhoto(file, nip));
              break;
            case 'identity_card':
              dispatch(uploadKTP(file, nip));
              break;
            case 'npwp_card':
              dispatch(uploadNPWP(file, nip));
              break;
            case 'bpjs_card':
              dispatch(uploadBPJS(file, nip));
              break;
            case 'bpjsk_card':
              dispatch(uploadBPJSK(file, nip));
              break;
            case 'ijazah':
              dispatch(uploadIjazah(file, nip));
              break;
            case 'training':
              dispatch(uploadTraining(file, nip));
              break;
            case 'health_certificate':
              dispatch(uploadKeteranganSehat(file, nip));
              break;
            case 'verklaring':
              dispatch(uploadVerklaring(file, nip));
              break;
            case 'transcript':
              dispatch(uploadTranskrip(file, nip));
              break;
            case 'family_card':
              dispatch(uploadKK(file, nip));
              break;
            case 'full_photo':
              dispatch(uploadPhotoFull(file, nip));
              break;
            default:
              message.error('Invalid storage key');
          }

          setLoading(false);
          onFileChange(storageKey, fileList[fileList.length - 1]);
        }, 1000);
      };
      reader.readAsDataURL(fileList[fileList.length - 1].originFileObj as Blob);
    } else {
      setPreviewImage(null);
      onFileChange(storageKey, null);
    }
  };

  const handleRemoveImage = () => {
    setLoading(true);
    switch (storageKey) {
      case 'self_photo':
        dispatch(deletePhoto(nip));
        break;
      case 'identity_card':
        dispatch(deleteCardPhoto(nip));
        break;
      case 'npwp_card':
        dispatch(deleteNPWPPhoto(nip));
        break;
      case 'bpjs_card':
        dispatch(deleteBPJSPhoto(nip));
        break;
      case 'bpjsk_card':
        dispatch(deleteBPJSKPhoto(nip));
        break;
      case 'ijazah':
        dispatch(deleteIjazahPhoto(nip));
        break;
      case 'training':
        dispatch(deleteTrainingPhoto(nip));
        break;
      case 'health_certificate':
        dispatch(deleteHealthPhoto(nip));
        break;
      case 'verklaring':
        dispatch(deleteVerklaringPhoto(nip));
        break;
      case 'transcript':
        dispatch(deleteTranskripPhoto(nip));
        break;
      case 'family_card':
        dispatch(deleteKKPhoto(nip));
        break;
      case 'full_photo':
        dispatch(deleteFullPhoto(nip));
        break;
      default:
        message.error('Invalid storage key');
    }
    setFileList([]);
    setPreviewImage(null);
    onFileChange(storageKey, null);
    setLoading(false);
  };

  const getPlaceholderUrl = (size: string) => {
    const [width, height] = size.split(' x ').map(Number);
    return `https://via.placeholder.com/${width}x${height}`;
  };

  return (
    <div className='mt-4 flex space-x-16'>
      <div className='w-1/2 flex flex-col items-center relative'>
        {label && (
          <label className='block text-sm font-bold text-gray-700'>
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
        )}
        <div className='py-4'>
          {loading ? (
            <div className='mt-4 flex justify-center items-center'>
              <Spin />
            </div>
          ) : (
            <div className='mt-4 relative'>
              {previewImage ? (
                <div className='relative'>
                  <img src={previewImage} alt='Preview' className='w-auto max-w-80 h-auto max-h-80' />
                </div>
              ) : (
                <img src={getPlaceholderUrl(recommendedSize)} alt='Placeholder' className='w-auto max-w-80 h-auto max-h-80' />
              )}
            </div>
          )}
        </div>
        <Button icon={<DeleteOutlined />} onClick={handleRemoveImage} className='absolute top-12 right-1' shape='circle' disabled={disabled} />
      </div>

      <div className='w-1/2'>
        {label && (
          <label className='block text-sm font-bold text-gray-700 mb-4'>
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
        )}
        <div className='py-4'>
          <Upload fileList={fileList} onChange={handleChange} beforeUpload={() => false} listType='picture' accept={accept} showUploadList={false} disabled={disabled}>
            <Button icon={<UploadOutlined />} disabled={disabled}>
              Upload Image
            </Button>
          </Upload>
          <div className='text-sm text-gray-500 mt-2'>
            Image: {accept}, <span className='block'>Max Size: {maxSize}MB, </span> <span className='block'>Recommended Size: {recommendedSize}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
