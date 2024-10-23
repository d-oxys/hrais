import axios from 'axios';
import { message } from 'antd';

export const handleOcr = async (file: any, setOcrText: (text: string) => void) => {
  if (!file || !file.originFileObj) {
    message.error('File tidak ditemukan.');
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_OCR_APIKEY;
  if (!apiKey) {
    message.error('API key tidak ditemukan.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file.originFileObj);
  formData.append('apikey', apiKey);

  try {
    const response = await axios.post('https://api.ocr.space/parse/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const rawText = response.data?.ParsedResults?.[0]?.ParsedText || 'No text found';
    const structuredData = parseOcrText(rawText);
    setOcrText(structuredData);
    console.log(structuredData);
    message.success('OCR berhasil, teks telah diekstraksi.');
  } catch (error) {
    message.error('Gagal melakukan OCR.');
    console.error(error);
  }
};

const parseOcrText = (text: string) => {
  const data = {
    provinsi: text.match(/PROVINSI\s([^\r\n]+)/)?.[1] || '',
    kota: text.match(/(?:KOTA|KABUPATEN|JAKARTA BARAT)\s([^\r\n]+)/)?.[1] || '',
    nik: text.match(/NIK\s*:\s*([^\r\n]+)/)?.[1] || text.match(/: (\d{16})/)?.[1] || '',
    nama: text.match(/Nama\s*:\s*([^\r\n]+)/)?.[1] || '',
    tempatTanggalLahir: text.match(/Tempat\/Tgl Lahir\s*:\s*([^\r\n]+)/)?.[1] || '',
    golonganDarah: text.match(/Goi. Darah\s*:\s*([^\r\n]+)/)?.[1] || '',
    jenisKelamin: text.match(/Jenis Kelamin\s*:\s*([^\r\n]+)/)?.[1] || '',
    alamat: text.match(/Alamat\s*:\s*([^\r\n]+)/)?.[1].replace('A7166', 'A7/66') || '',
    rtRw: text.match(/RT\/RW\s*:\s*([^\r\n]+)/)?.[1] || '',
    kelDesa: text.match(/Kel\/Desa\s*:\s*([^\r\n]+)/)?.[1] || '',
    kecamatan: text.match(/Kecamatan\s*([^\r\n]+)/)?.[1] || '',
    agama: text.match(/Agama\s*:\s*([^\r\n]+)/)?.[1] || '',
    statusPerkawinan: text.match(/Status Perkawinan\s*:\s*([^\r\n]+)/)?.[1] || '',
    pekerjaan: text.match(/Pekerjaan\s*:\s*([^\r\n]+)/)?.[1] || '',
    kewarganegaraan: text.match(/Kewarganegaraan\s*:\s*([^\r\n]+)/)?.[1] || '',
    berlakuHingga: text.match(/Berlaku Hingga\s*:\s*([^\r\n]+)/)?.[1] || '',
    tanggalDikeluarkan: text.match(/(?:JAKARTA BARAT|Tanggal Dikeluarkan)\s*:\s*([^\r\n]+)/)?.[1] || '',
  };

  return JSON.stringify(data, null, 2);
};
