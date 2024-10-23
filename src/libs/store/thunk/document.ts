import Http from '@root/libs/http';
import { AppDispatch } from '..';
import { uploadActions } from '../slices/document';
import { message } from 'antd';
import { getSession } from 'next-auth/react';
import axios from 'axios';

export const uploadFile = (file: File, storageKey: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uploadActions.setLoading(true));
    const formData = new FormData();
    formData.append(storageKey, file);
    formData.append('fileName', file.name);

    try {
      const { data } = await new Http().post('/api/v1/profile/document/428', formData);
      dispatch(uploadActions.setUploadedFile(data.data));
      message.success('File berhasil diunggah ke API!');
    } catch (error) {
      dispatch(uploadActions.setError(error));
      message.error('Gagal mengunggah file ke API.');
    } finally {
      dispatch(uploadActions.setLoading(false));
    }
  };
};

const uploadDocument = (file: File, nip: string, url: string, fieldName: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uploadActions.setLoading(true));
    const formData = new FormData();
    formData.append(fieldName, file);
    formData.append('fileName', file.name);

    try {
      const session: any = await getSession();
      const token = session?.accessToken;

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}/${nip}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(uploadActions.setUploadedFile(data.data));
      message.success(`${fieldName} berhasil diunggah ke API!`);
    } catch (error) {
      dispatch(uploadActions.setError(error));
      message.error(`Gagal mengunggah ${fieldName} ke API.`);
    } finally {
      dispatch(uploadActions.setLoading(false));
    }
  };
};

// Thunk untuk mengunggah berbagai dokumen
export const uploadPhoto = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/store', 'imgPhoto');
export const uploadKTP = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/card/store', 'imgKTP');
export const uploadNPWP = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/card/npwp/store', 'imgNPWP');
export const uploadBPJS = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/card/bpjs/store', 'imgBPJS');
export const uploadBPJSK = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/card/bpjsk/store', 'imgBPJSK');
export const uploadIjazah = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/ijazah/store', 'imgIjazah');
export const uploadTraining = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/training/store', 'imgTraining');
export const uploadKeteranganSehat = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/health/store', 'imgKeteranganSehat');
export const uploadVerklaring = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/paklaring/store', 'imgVerklaring');
export const uploadTranskrip = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/transkrip/store', 'imgTranskrip');
export const uploadKK = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/card/kk/store', 'imgKK');
export const uploadPhotoFull = (file: File, nip: string) => uploadDocument(file, nip, '/api/v1/employee/img/photo/full/store', 'imgPhotoFull');

const deleteDocument = (url: string, nip: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uploadActions.setLoading(true));

    try {
      const session: any = await getSession();
      const token = session?.accessToken;

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${url}/${nip}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success('Dokumen berhasil dihapus dari API!');
    } catch (error) {
      dispatch(uploadActions.setError(error));
      message.error('Gagal menghapus dokumen dari API.');
    } finally {
      dispatch(uploadActions.setLoading(false));
    }
  };
};

// Thunk untuk menghapus berbagai dokumen
export const deletePhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/delete', nip);
export const deleteTrainingPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/training/delete', nip);
export const deleteHealthPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/health/delete', nip);
export const deleteCardPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/card/delete', nip);
export const deleteVerklaringPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/paklaring/delete', nip);
export const deleteTranskripPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/transkrip/delete', nip);
export const deleteIjazahPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/ijazah/delete', nip);
export const deleteNPWPPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/card/npwp/delete', nip);
export const deleteBPJSPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/card/bpjs/delete', nip);
export const deleteBPJSKPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/card/bpjsk/delete', nip);
export const deleteKKPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/card/kk/delete', nip);
export const deleteFullPhoto = (nip: string) => deleteDocument('/api/v1/employee/img/photo/full/delete', nip);

export async function handleSubmit(event: Event) {
  event.preventDefault();
  console.log('data sedang di kirim ke backend');

  // Mendapatkan sesi
  const session: any = await getSession();
  const token = session.accessToken;
  const userId = session.user.user.id;

  // Mengambil data dari localStorage
  const formEmployeeData = JSON.parse(localStorage.getItem('formEmployeeData') ?? '{}');
  const formAddressIdentityCardData = JSON.parse(localStorage.getItem('formAddressIdentityCardData') ?? '{}');
  const formContactFamily = JSON.parse(localStorage.getItem('formContactFamily') ?? '{}');
  const formDriverLicenseData = JSON.parse(localStorage.getItem('formDriverLicenseData') ?? '{}');

  // Membuat objek FormData
  const formData = new FormData();

  // Menambahkan file ke FormData
  formData.append('self_photo', localStorage.getItem('self_photo') ?? '');
  formData.append('fullbody_photo', localStorage.getItem('fullbody_photo') ?? '');
  formData.append('identity_card', localStorage.getItem('identity_card') ?? '');
  formData.append('family_card', localStorage.getItem('family_card') ?? '');
  formData.append('tax_card', localStorage.getItem('tax_card') ?? '');
  formData.append('bpjs_card', localStorage.getItem('bpjs_card') ?? '');
  formData.append('bpjs_k_card', localStorage.getItem('bpjs_k_card') ?? '');
  formData.append('education_certificate', localStorage.getItem('education_certificate') ?? '');
  formData.append('transcripts', localStorage.getItem('transcripts') ?? '');
  formData.append('verklaring', localStorage.getItem('verklaring') ?? '');
  formData.append('training', localStorage.getItem('training') ?? '');
  formData.append('health_letter', localStorage.getItem('health_letter') ?? '');

  // Menambahkan data teks ke FormData
  formData.append('full_name', formEmployeeData.fullname ?? '');
  formData.append('phone_number', formEmployeeData.phone_number ?? '');
  formData.append('nip', formEmployeeData.nip ?? '');
  formData.append('identity_number', formAddressIdentityCardData.identity_number ?? '');
  formData.append('addressCard', formAddressIdentityCardData.address ?? '');
  formData.append('noRtCard', formAddressIdentityCardData.rt ?? '');
  formData.append('noRwCard', formAddressIdentityCardData.rw ?? '');
  formData.append('provinceCard', formAddressIdentityCardData.province_id ?? '');
  formData.append('cityCard', formAddressIdentityCardData.city_id ?? '');
  formData.append('districtCard', formAddressIdentityCardData.district_id ?? '');
  formData.append('subdistrictCard', formAddressIdentityCardData.subdistrict_id ?? '');
  formData.append('sameCard', formAddressIdentityCardData.is_according_ktp ?? '');
  formData.append('addressDom', formAddressIdentityCardData.address ?? '');
  formData.append('noRtDom', formAddressIdentityCardData.rt ?? '');
  formData.append('noRwDom', formAddressIdentityCardData.rw ?? '');
  formData.append('provinceDom', formAddressIdentityCardData.province_id ?? '');
  formData.append('cityDom', formAddressIdentityCardData.city_id ?? '');
  formData.append('districtDom', formAddressIdentityCardData.district_id ?? '');
  formData.append('subdistrictDom', formAddressIdentityCardData.subdistrict_id ?? '');
  formData.append('gender', formAddressIdentityCardData.gender ?? '');
  formData.append('weight', formAddressIdentityCardData.weight ?? '');
  formData.append('height', formAddressIdentityCardData.height ?? '');
  formData.append('blood_type', formAddressIdentityCardData.blood_type ?? '');
  formData.append('place_birth', formAddressIdentityCardData.placeofbirth ?? '');
  formData.append('date_birth', formAddressIdentityCardData.dateofbirth ?? '');
  formData.append('religion', formAddressIdentityCardData.religion ?? '');
  formData.append('nationality', formAddressIdentityCardData.nationality ?? '');
  formData.append('father_name', formContactFamily.biological_father_name ?? '');
  formData.append('father_date_birth', formContactFamily.biological_father_dob ?? '');
  formData.append('mother_name', formContactFamily.biological_mother_name ?? '');
  formData.append('mother_date_birth', formContactFamily.biological_mother_dob ?? '');
  formData.append('marital_status', formContactFamily.status_marital ?? '');
  formData.append('partner_name', formContactFamily.marital_name ?? '');
  formData.append('partner_card', formContactFamily.marital_name ?? '');
  formData.append('partner_place_birth', formContactFamily.marital_name ?? '');
  formData.append('partner_date_birth', formContactFamily.marital_dob ?? '');
  formData.append('number_children', formContactFamily.number_children ?? '');
  formData.append('email_personal', formContactFamily.contact_personal_email ?? '');
  formData.append('emergency_number', formContactFamily.contact_emergency_number ?? '');
  formData.append('relationship_emergency', formContactFamily.contact_relationship ?? '');
  formData.append('relationship_name_emergency', formContactFamily.contact_name_of_person ?? '');
  formData.append('bank_name', formContactFamily.bank ?? '');
  formData.append('bank_number', formContactFamily.bank_account ?? '');
  formData.append('driver_license_type1', formDriverLicenseData.driver_license_type[0] ?? '');
  formData.append('driver_license_number1', formDriverLicenseData.driver_license_number[0] ?? '');
  formData.append('driver_license_type2', formDriverLicenseData.driver_license_type[1] ?? '');
  formData.append('driver_license_number2', formDriverLicenseData.driver_license_number[1] ?? '');
  formData.append('family_card_number', formDriverLicenseData.family_card_number ?? '');
  formData.append('tax_card_name', formDriverLicenseData.tax_name ?? '');
  formData.append('tax_card_number', formDriverLicenseData.tax_number ?? '');
  formData.append('bpjs_number', formDriverLicenseData.bpjs_kesehatan_number ?? '');
  formData.append('bpjs_k_number', formDriverLicenseData.bpjs_ketenagakerjaan_number ?? '');
  formData.append('last_education', formDriverLicenseData.last_education ?? '');
  formData.append('major', formDriverLicenseData.major ?? '');
  formData.append('institution_name', formDriverLicenseData.institution ?? '');

  // Menghitung ukuran data
  const jsonObject: Record<string, any> = {};
  formData.forEach((value, key) => {
    jsonObject[key] = value;
  });
  const jsonString = JSON.stringify(jsonObject);
  const dataSize = new Blob([jsonString]).size;
  console.log(`Ukuran data: ${dataSize} bytes`);

  console.log(formData);
  try {
    const response = await fetch(`https://apps-api-dev.duapuluhtiga.com/api/v1/profile/document/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: formData,
    });

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
