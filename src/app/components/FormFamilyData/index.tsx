import { Button, Col, DatePicker, Form, Input, message, Radio, Row, Select, Space, UploadFile, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@root/libs/store';
import { getBank, getBloodType, getCity, getDistrict, getMaritalStatus, getProvince, getReligion, getVillage } from '@root/libs/store/thunk/masterdata';
import { BankState, CityState, DistrictState, MaritalStatusState, ProvinceState, ReligionState, SubdistrictState } from '@root/libs/types/masterdata';
import { EmployeeData } from '@root/libs/types/employee';
import dayjs from 'dayjs';
import FormItem from '../FormItem';
import { employeeActions } from '@root/libs/store/slices/employee.slice';

interface FormFamilyData {
  data?: EmployeeData;
  onNext: () => void;
  onBack: () => void;
}

const FormFamilyData = (props: FormFamilyData) => {
  const { data, onNext, onBack } = props;
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const {
    bank,
  }: {
    bank: BankState[];
  } = useAppSelector((state) => state.masterdata);
  const { form: formEmployee }: { form: any } = useAppSelector((state) => state.employee);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getBank());
      // Set nilai-nilai form dari localStorage jika ada
      const storedData = localStorage.getItem('formContactFamily');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.dateofbirth) {
          parsedData.dateofbirth = dayjs(parsedData.dateofbirth);
        }
        if (parsedData.biological_father_dob) {
          parsedData.biological_father_dob = dayjs(parsedData.biological_father_dob);
        }
        if (parsedData.biological_mother_dob) {
          parsedData.biological_mother_dob = dayjs(parsedData.biological_mother_dob);
        }
        if (parsedData.marital_dob) {
          parsedData.marital_dob = dayjs(parsedData.marital_dob);
        }

        form.setFieldsValue(parsedData);
        console.log(parsedData);
      } else {
        form.setFieldValue('identity_number', data?.address?.identity_number);
        form.setFieldValue('address', data?.address?.address);
        form.setFieldValue('province_id', data?.address?.province_id);
        form.setFieldValue('city_id', data?.address?.city_id);
        form.setFieldValue('district_id', data?.address?.district_id);
        form.setFieldValue('subdistrict_id', data?.address?.subdistrict_id);
        form.setFieldValue('rt', data?.address?.rt);
        form.setFieldValue('rw', data?.address?.rw);
        form.setFieldValue('gender', data?.personal_data?.gender);
        form.setFieldValue('weight', data?.personal_data?.weight);
        form.setFieldValue('height', data?.personal_data?.height);
        form.setFieldValue('blood_type', data?.personal_data?.bloodtype);
        form.setFieldValue('placeofbirth', data?.personal_data?.placeofbirth);
        form.setFieldValue('religion', data?.personal_data?.religion?.toString());
        form.setFieldValue('nationality', data?.personal_data?.nationality);
      }
      setLoading(false);
    };
    fetchData();
  }, [data]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    localStorage.setItem('formContactFamily', JSON.stringify(allValues));
  };

  const onFinish = async (values: any) => {
    values.dateofbirth = dayjs(values.dateofbirth).format('YYYY-MM-DD');
    values.biological_mother_dob = dayjs(values.biological_mother_dob).format('YYYY-MM-DD');
    values.biological_father_dob = dayjs(values.biological_father_dob).format('YYYY-MM-DD');

    localStorage.setItem('formContactFamily', JSON.stringify(values));
    dispatch(employeeActions.setFormEmployeeData(values));
    onNext();
  };

  return (
    <div className='bg-white max-h-90vh overflow-y-scroll w-full rounded-xl p-8'>
      <Form layout='vertical' form={form} onFinish={onFinish} onValuesChange={handleValuesChange}>
        <Row className='mt-4 font-bold text-lg'>Contact</Row>
        <Row className={loading ? 'mb-4' : ''}>
          <Col span={24}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Personal Email' required name='contact_personal_email'>
                <Input size='large' type='email' />
              </FormItem>
            )}
          </Col>
        </Row>
        <Row gutter={24} className={loading ? 'mb-4' : ''}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Emergency Number' required name='contact_emergency_number'>
                <Input size='large' />
              </FormItem>
            )}
          </Col>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Relationship to Emergency Contact' required name='contact_relationship'>
                <Input size='large' />
              </FormItem>
            )}
          </Col>
        </Row>
        <Row className={loading ? 'mb-4' : ''}>
          <Col span={24}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Name of Person for Emergency Contact*' required name='contact_name_of_person'>
                <Input size='large' />
              </FormItem>
            )}
          </Col>
        </Row>
        <Row className='mt-4 font-bold text-lg'>Bank</Row>
        <Row gutter={24} className={loading ? 'mb-4' : ''}>
          <Col span={24}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Bank Name' required name='bank'>
                <Select placeholder='Select Bank' size='large'>
                  {bank?.map((bt: BankState) => (
                    <Select.Option key={bt.id}>
                      ({bt.kode}) {bt.name}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            )}
          </Col>
        </Row>
        <Row gutter={24} className={loading ? 'mb-4' : ''}>
          <Col span={24}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Bank Account Number' required name='bank_account'>
                <Input size='large' type='number' />
              </FormItem>
            )}
          </Col>
        </Row>
        <Row className='mt-4 font-bold text-lg'>Family Data</Row>

        <Row className='mt-4 text-lg font-bold'>Status Marital</Row>
        <Row gutter={24} className={loading ? 'mb-4' : ''}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Name' required name='marital_name'>
                <Input size='large' />
              </FormItem>
            )}
          </Col>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Date of Birth' required name='marital_dob' initialValue={data?.personal_data?.biological_mother_dob ? dayjs(data.personal_data.biological_mother_dob) : null}>
                <DatePicker placeholder='Pilih Tanggal' size='large' className='w-full' format='DD-MM-YYYY' />
              </FormItem>
            )}
          </Col>
        </Row>

        <Row gutter={24} className={loading ? 'mb-4' : ''}>
          <Col span={24}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Status Marital' required name='status_marital'>
                <Input size='large' />
              </FormItem>
            )}
          </Col>
        </Row>

        <Row className='mt-4 text-lg font-bold'>Biological Father</Row>
        <Row gutter={24}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Name' required name='biological_father_name'>
                <Input size='large' />
              </FormItem>
            )}
          </Col>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Date of Birth' required name='biological_father_dob' initialValue={data?.personal_data?.biological_father_dob ? dayjs(data.personal_data.biological_father_dob) : null}>
                <DatePicker placeholder='Pilih Tanggal' size='large' className='w-full' format='DD-MM-YYYY' />
              </FormItem>
            )}
          </Col>
        </Row>

        <Row className='mt-4 text-lg font-bold'>Biological Mother</Row>
        <Row gutter={24} className={loading ? 'mb-4' : ''}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Name' required name='biological_mother_name'>
                <Input size='large' />
              </FormItem>
            )}
          </Col>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size='large' />
            ) : (
              <FormItem label='Date of Birth' required name='biological_mother_dob' initialValue={data?.personal_data?.biological_mother_dob ? dayjs(data.personal_data.biological_mother_dob) : null}>
                <DatePicker placeholder='Pilih Tanggal' size='large' className='w-full' format='DD-MM-YYYY' />
              </FormItem>
            )}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Button className='w-full text-primary' size='large' onClick={() => onBack()} disabled={loading}>
              Back
            </Button>
          </Col>
          <Col span={12}>
            <Button className='w-full' size='large' type='primary' htmlType='submit' disabled={loading}>
              Next
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormFamilyData;
