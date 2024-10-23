import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
  UploadFile,
  Skeleton,
} from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import {
  getBank,
  getBloodType,
  getCity,
  getDistrict,
  getMaritalStatus,
  getProvince,
  getReligion,
  getVillage,
} from "@root/libs/store/thunk/masterdata";
import {
  BankState,
  CityState,
  DistrictState,
  MaritalStatusState,
  ProvinceState,
  ReligionState,
  SubdistrictState,
  VillageState,
} from "@root/libs/types/masterdata";
import { EmployeeData } from "@root/libs/types/employee";
import dayjs from "dayjs";
import FormItem from "../FormItem";
import { employeeActions } from "@root/libs/store/slices/employee.slice";
import ImageUpload from "../UploadImage";
import { handleOcr } from "@root/libs/utils/ocrHandler";

interface FormAddressIdentityCard {
  data?: EmployeeData;
  onNext: () => void;
  onBack: () => void;
}

const FormAddressIdentityCard = (props: FormAddressIdentityCard) => {
  const { data, onNext, onBack } = props;
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const {
    province,
    city,
    district,
    village,
    bloodtype,
    religion,
  }: {
    province: ProvinceState[];
    city: CityState[];
    district: DistrictState[];
    subdistrict: SubdistrictState[];
    village: VillageState[];
    bloodtype: { name: string }[];
    religion: ReligionState[];
  } = useAppSelector((state) => state.masterdata);
  const { form: formEmployee }: { form: any } = useAppSelector(
    (state) => state.employee
  );

  const [files, setFiles] = useState<{ [key: string]: UploadFile | null }>({});
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getProvince());
      await dispatch(getBloodType());
      await dispatch(getReligion());

      const storedData = localStorage.getItem("formAddressIdentityCardData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.dateofbirth) {
          parsedData.dateofbirth = dayjs(parsedData.dateofbirth);
        }
        if (parsedData.biological_father_dob) {
          parsedData.biological_father_dob = dayjs(
            parsedData.biological_father_dob
          );
        }
        if (parsedData.biological_mother_dob) {
          parsedData.biological_mother_dob = dayjs(
            parsedData.biological_mother_dob
          );
        }

        form.setFieldsValue(parsedData);
        console.log(parsedData);
      } else {
        const savedKtpImage = localStorage.getItem("identity_card");

        if (savedKtpImage) {
          const isBase64 = savedKtpImage.startsWith("data:image");
          if (isBase64) {
            try {
              const base64Response = await fetch(savedKtpImage);
              const blob = await base64Response.blob();
              const file = new File([blob], "ktp.png", { type: "image/png" });
              await handleOcr({ originFileObj: file }, (ocrText) => {
                setOcrText(ocrText);
                const ocrData = JSON.parse(ocrText);
                form.setFieldsValue({
                  identity_number: ocrData.nik,
                  address: ocrData.alamat,
                  province_id: ocrData.provinsi,
                  city_id: ocrData.kota,
                  district_id: ocrData.kecamatan,
                  subdistrict_id: ocrData.kelDesa,
                  rt: ocrData.rtRw.split("/")[0],
                  rw: ocrData.rtRw.split("/")[1],
                  gender: ocrData.jenisKelamin,
                  blood_type: ocrData.golonganDarah,
                  placeofbirth: ocrData.tempatTanggalLahir.split(",")[0],
                  dateofbirth: dayjs(
                    ocrData.tempatTanggalLahir.split(",")[1],
                    "DD-MM-YYYY"
                  ),
                  religion: ocrData.agama,
                  nationality: ocrData.kewarganegaraan,
                });
              });
            } catch (error) {
              console.error("Error processing the image for OCR:", error);
            }
          } else {
            console.error("Data in localStorage is not a valid base64 image");
          }
        } else {
          form.setFieldValue("identity_number", data?.address?.identity_number);
          form.setFieldValue("address", data?.address?.address);
          form.setFieldValue("province_id", data?.address?.province_id);
          form.setFieldValue("city_id", data?.address?.city_id);
          form.setFieldValue("district_id", data?.address?.district_id);
          form.setFieldValue("subdistrict_id", data?.address?.subdistrict_id);
          form.setFieldValue("rt", data?.address?.rt);
          form.setFieldValue("rw", data?.address?.rw);
          form.setFieldValue("gender", data?.personal_data?.gender);
          form.setFieldValue("weight", data?.personal_data?.weight);
          form.setFieldValue("height", data?.personal_data?.height);
          form.setFieldValue("blood_type", data?.personal_data?.bloodtype);
          form.setFieldValue("placeofbirth", data?.personal_data?.placeofbirth);
          form.setFieldValue(
            "religion",
            data?.personal_data?.religion?.toString()
          );
          form.setFieldValue("nationality", data?.personal_data?.nationality);
        }
      }

      setLoading(false);
    };
    fetchData();
  }, [data]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    localStorage.setItem(
      "formAddressIdentityCardData",
      JSON.stringify(allValues)
    );

    if (changedValues.province_id) {
      console.log(changedValues.province_id);
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
      form.setFieldsValue({ village_id: undefined, kode_pos: undefined });
      dispatch(getVillage(changedValues.district_id));
    }

    if (changedValues.village_id) {
      const selectedVillage = village.find(
        (vill) => vill.code === changedValues.village_id
      );
      if (selectedVillage && selectedVillage.meta) {
        const meta = JSON.parse(selectedVillage.meta);
        form.setFieldsValue({ kode_pos: meta.pos });
      }
    }
  };

  const onFinish = async (values: any) => {
    values.dateofbirth = dayjs(values.dateofbirth).format("YYYY-MM-DD");
    values.biological_mother_dob = dayjs(values.biological_mother_dob).format(
      "YYYY-MM-DD"
    );
    values.biological_father_dob = dayjs(values.biological_father_dob).format(
      "YYYY-MM-DD"
    );

    const requiredKeys = ["identity_card"];

    const allRequiredFilesPresent = requiredKeys.every(
      (key) => files[key] !== null
    );

    if (allRequiredFilesPresent) {
      localStorage.setItem(
        "formAddressIdentityCardData",
        JSON.stringify(values)
      );
      dispatch(employeeActions.setFormEmployeeData(values));
      onNext();
    } else {
      message.error("Please upload all required documents.");
    }
  };

  return (
    <div className="bg-white max-h-90vh overflow-y-scroll w-full rounded-xl p-8">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
      >
        <Row className="font-bold text-lg">Address & Identity Card (KTP)</Row>
        <Row className="p-3">
          <Col span={24}>
            {loading ? (
              <Skeleton active />
            ) : (
              <>
                <FormItem
                  label="Identity Number (NIK)"
                  required
                  name="identity_number"
                >
                  <Input size="large" />
                </FormItem>

                <FormItem label="Address" required name="address">
                  <Input size="large" />
                </FormItem>

                {/* dropdown address start */}
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Province" required name="province_id">
                      <Select
                        placeholder="Select Province"
                        size="large"
                        showSearch
                      >
                        {province?.map((prov) => (
                          <Select.Option key={prov.id} value={prov.code}>
                            {prov.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="City" required name="city_id">
                      <Select placeholder="Select City" size="large" showSearch>
                        {city?.map((ct) => (
                          <Select.Option key={ct.id} value={ct.code}>
                            {ct.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="District" required name="district_id">
                      <Select placeholder="Select District" size="large">
                        {district?.map((dist) => (
                          <Select.Option key={dist.id} value={dist.code}>
                            {dist.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Village" required name="village_id">
                      <Select placeholder="Select Village" size="large">
                        {village?.map((vill) => (
                          <Select.Option key={vill.id} value={vill.code}>
                            {vill.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Kode Pos" required name="kode_pos">
                      <Input size="large" disabled />
                    </Form.Item>
                  </Col>
                </Row>

                {/* dropdown address end */}

                {/* field address start */}
                {/* <Row gutter={24}>
                  <Col span={12}>
                    <FormItem label='Province' required name='province_id'>
                      <Input size='large' />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label='City' required name='city_id'>
                      <Input size='large' />
                    </FormItem>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={8}>
                    <FormItem label='District' required name='district_id'>
                      <Input size='large' />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label='Sub District' required name='subdistrict_id'>
                      <Input size='large' />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label='Kode Pos' required name='kode_pos'>
                      <Input size='large' />
                    </FormItem>
                  </Col>
                </Row> */}
                {/* field address end */}

                <Row gutter={24}>
                  <Col span={12}>
                    <FormItem label="RT" required name="rt">
                      <Input size="large" />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="RW" required name="rw">
                      <Input size="large" />
                    </FormItem>
                  </Col>
                </Row>

                <FormItem required name="is_according_ktp">
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value={1}>
                        Address According to your ID card (KTP)
                      </Radio>
                      <Radio value={0}>
                        Address NOT According to your ID card (KTP)
                      </Radio>
                    </Space>
                  </Radio.Group>
                </FormItem>
              </>
            )}
          </Col>
        </Row>
        {/* personal data */}
        <Row className="mt-4 font-bold text-lg">Personal Data</Row>
        <Row gutter={24} className={loading ? "mb-4" : ""}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem label="Gender" required name="gender">
                <Input size="large" />
              </FormItem>
            )}
          </Col>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem label="Weight (kg)" required name="weight">
                <Input size="large" type="number" />
              </FormItem>
            )}
          </Col>
        </Row>

        <Row gutter={24} className={loading ? "mb-4" : ""}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem label="Height (cm)" required name="height">
                <Input size="large" type="number" />
              </FormItem>
            )}
          </Col>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem label="Blood Type" required name="blood_type">
                <Select placeholder="Select Blood Type" size="large">
                  {bloodtype?.map((bt: { name: string }) => (
                    <Select.Option key={bt.name}>{bt.name}</Select.Option>
                  ))}
                </Select>
              </FormItem>
            )}
          </Col>
        </Row>

        <Row gutter={24} className={loading ? "mb-4" : ""}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem label="Place of Birth" required name="placeofbirth">
                <Input size="large" />
              </FormItem>
            )}
          </Col>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem
                label="Date of Birth"
                required
                name="dateofbirth"
                initialValue={
                  data?.personal_data?.dateofbirth
                    ? dayjs(data.personal_data.dateofbirth)
                    : null
                }
              >
                <DatePicker
                  size="large"
                  className="w-full"
                  format="DD-MM-YYYY"
                />
              </FormItem>
            )}
          </Col>
        </Row>

        <Row gutter={24} className={loading ? "mb-4" : ""}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem label="Religion" required name="religion">
                <Select placeholder="Select Religion" size="large">
                  {religion?.map((bt: ReligionState) => (
                    <Select.Option key={bt.id}>{bt.name}</Select.Option>
                  ))}
                </Select>
              </FormItem>
            )}
          </Col>
          <Col span={12} className={loading ? "mb-4" : ""}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem label="Nationality" required name="nationality">
                <Input size="large" />
              </FormItem>
            )}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Button
              className="w-full text-primary"
              size="large"
              onClick={() => onBack()}
              disabled={loading}
            >
              Back
            </Button>
          </Col>
          <Col span={12}>
            <Button
              className="w-full"
              size="large"
              type="primary"
              htmlType="submit"
              disabled={loading}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormAddressIdentityCard;
