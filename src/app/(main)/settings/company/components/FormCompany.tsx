'use client';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { getCity, getDistrict, getProvince, getVillage } from '@root/libs/store/thunk/masterdata';
import { CityState, DistrictState, ProvinceState, VillageState } from '@root/libs/types/masterdata';
import { createCompany } from '@root/libs/store/thunk/company';
import FormItem from '@root/app/components/FormItem';
import UploadFile from '@root/app/components/Upload';
import { useRouter } from 'next/navigation';

const FormCompany = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const router = useRouter();

  const {
    province,
    city,
    district,
    village,
  }: {
    province: ProvinceState[];
    city: CityState[];
    district: DistrictState[];
    village: VillageState[];
  } = useAppSelector((state) => state.masterdata);

  const [loading, setLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getProvince());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.province_id) {
      form.setFieldsValue({
        city_id: undefined,
        district_id: undefined,
        village_id: undefined,
        kode_pos: undefined,
      });
      dispatch(getCity(changedValues.province_id));
    }

    if (changedValues.city_id) {
      form.setFieldsValue({
        district_id: undefined,
        village_id: undefined,
        kode_pos: undefined,
      });
      dispatch(getDistrict(changedValues.city_id));
    }

    if (changedValues.district_id) {
      form.setFieldsValue({
        village_id: undefined,
        kode_pos: undefined,
      });
      dispatch(getVillage(changedValues.district_id));
    }

    if (changedValues.village_id) {
      const selectedVillage = village.find((vill) => vill.code === changedValues.village_id);
      if (selectedVillage && selectedVillage.meta) {
        const meta = JSON.parse(selectedVillage.meta);
        form.setFieldsValue({ kode_pos: meta.pos });
      }
    }
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('address', values.address);
      formData.append('rt', values.rt);
      formData.append('rw', values.rw);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('province_code', values.province_id);
      formData.append('city_code', values.city_id);
      formData.append('district_code', values.district_id);
      formData.append('village_code', values.village_id);
      formData.append('logo_img', values.logo);

      await dispatch(createCompany(formData)).unwrap();
      message.success('Company created successfully!');
      form.resetFields();
      router.push('/settings/company');
    } catch (error) {
      message.error('Failed to create company.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-2'>
      <Form layout='vertical' onFinish={onFinish} form={form} onValuesChange={handleValuesChange}>
        {/* Company Name */}
        <Row className='mb-4'>
          <Col span={15}>
            <FormItem required label='Company Name' name='name'>
              <Input />
            </FormItem>
          </Col>
        </Row>

        {/* Logo Upload */}
        <Row className='mb-4'>
          <Col span={24}>
            <FormItem label='Logo' required name='logo'>
              <UploadFile
                allowedFile={['jpg', 'png']}
                maxSize={2048}
                recommendedSize='300x300'
                onFileUpload={(file) => {
                  form.setFieldValue('logo', file);
                }}
              />
            </FormItem>
          </Col>
        </Row>

        {/* Company Address */}
        <Row className='mb-4'>
          <Col span={24}>
            <FormItem required label='Company Address' name='address'>
              <Input />
            </FormItem>
          </Col>
        </Row>

        {/* Email */}
        <Row className='mb-4'>
          <Col span={12}>
            <FormItem required label='Email' name='email'>
              <Input type='email' />
            </FormItem>
          </Col>
        </Row>

        {/* Phone */}
        <Row className='mb-4'>
          <Col span={12}>
            <FormItem required label='Phone' name='phone'>
              <Input type='tel' />
            </FormItem>
          </Col>
        </Row>

        {/* Province, City, District, Village, Kode Pos */}
        <Row gutter={12}>
          <Col span={6}>
            <FormItem required label='Province' name='province_id'>
              <Select loading={loading} showSearch placeholder='Select Province'>
                {province.map((prov) => (
                  <Select.Option key={prov.id} value={prov.code}>
                    {prov.name}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem required label='City' name='city_id'>
              <Select loading={loading} showSearch placeholder='Select City'>
                {city.map((ct) => (
                  <Select.Option key={ct.id} value={ct.code}>
                    {ct.name}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem required label='District' name='district_id'>
              <Select loading={loading} showSearch placeholder='Select District'>
                {district.map((dist) => (
                  <Select.Option key={dist.id} value={dist.code}>
                    {dist.name}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>

          <Col span={6}>
            <FormItem required label='Village' name='village_id'>
              <Select loading={loading} showSearch placeholder='Select Village'>
                {village.map((vill) => (
                  <Select.Option key={vill.id} value={vill.code}>
                    {vill.name}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>

        {/* Kode Pos, RT, RW */}
        <Row gutter={12}>
          <Col span={6}>
            <FormItem required label='Kode Pos' name='kode_pos'>
              <Input disabled />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem required label='RT' name='rt'>
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem required label='RW' name='rw'>
              <Input />
            </FormItem>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row justify='end'>
          <Col span={24} className='text-end'>
            <Button type='primary' htmlType='submit' loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormCompany;
