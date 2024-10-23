import { Button, Col, Form, Input, Row, Select, Skeleton } from "antd";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { useCallback, useEffect, useState } from "react";
import { EmployeeData } from "@root/libs/types/employee";
import { DriverLicenseTypeState } from "@root/libs/types/masterdata";
import CirclePlus from "../icons/circle-plus";
import FormItem from "../FormItem";
import { employeeActions } from "@root/libs/store/slices/employee.slice";
import { updateEmployeeData } from "@root/libs/store/thunk/employee";
import { DeleteOutlined } from "@ant-design/icons";
import { getDriverLicenseType } from "@root/libs/store/thunk/masterdata";
import { handleSubmit } from "@root/libs/store/thunk/document";

interface FormDriverLicenseProps {
  onBack: () => void;
  data: EmployeeData;
}
const FormDriverLicense = (props: FormDriverLicenseProps) => {
  const { onBack, data } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [numOfDriverLicense, setNumOfDriverLicense] = useState<number[]>(() => {
    const storedData = JSON.parse(
      localStorage.getItem("formDriverLicenseData") || "{}"
    );
    return storedData.numOfDriverLicense &&
      storedData.numOfDriverLicense.length > 0
      ? storedData.numOfDriverLicense
      : [1];
  });
  const [numOfVerklaring, setNumOfVerklaring] = useState<number[]>([1]);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    driverlicensetype,
  }: {
    driverlicensetype: DriverLicenseTypeState[];
  } = useAppSelector((state) => state.masterdata);
  const {
    form: { employeeData },
  } = useAppSelector((state) => state.employee);

  const removeRow = useCallback(
    (type: string, index: number) => {
      const storedData = JSON.parse(
        localStorage.getItem("formDriverLicenseData") || "{}"
      );

      if (type === "driver license") {
        const updatedDriverLicense = numOfDriverLicense.filter(
          (_: any, i: number) => i !== index
        );
        setNumOfDriverLicense(updatedDriverLicense);

        if (
          storedData.driver_license_type &&
          storedData.driver_license_number
        ) {
          storedData.driver_license_type.splice(index, 1);
          storedData.driver_license_number.splice(index, 1);

          form.setFieldsValue({
            driver_license_type: storedData.driver_license_type,
            driver_license_number: storedData.driver_license_number,
          });
        }

        localStorage.setItem(
          "formDriverLicenseData",
          JSON.stringify(storedData)
        );
      }
    },
    [numOfDriverLicense, form]
  );

  useEffect(() => {
    dispatch(getDriverLicenseType());
    const storedData = JSON.parse(
      localStorage.getItem("formDriverLicenseData") || "{}"
    );
    form.setFieldsValue({
      driver_license_type: storedData.driver_license_type || [],
      driver_license_number: storedData.driver_license_number || [],
    });
    setLoading(false);
  }, [numOfDriverLicense, form]);

  useEffect(() => {
    const storedData = localStorage.getItem("formDriverLicenseData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      form.setFieldsValue(parsedData);

      const numLicenses = parsedData.driver_license_type
        ? parsedData.driver_license_type.length
        : 1;
      setNumOfDriverLicense(
        Array.from({ length: numLicenses }, (_, i) => i + 1)
      );
      const numVerklaring = parsedData.numOfVerklaring
        ? parsedData.numOfVerklaring.length
        : 1;
      setNumOfVerklaring(
        Array.from({ length: numVerklaring }, (_, i) => i + 1)
      );
    }
    setLoading(false);
  }, [form, dispatch]);

  const addRow = (type: string) => {
    const storedData = JSON.parse(
      localStorage.getItem("formDriverLicenseData") || "{}"
    );

    if (type === "driver license") {
      const newDriverLicenseIndex = numOfDriverLicense.length + 1;
      const updatedDriverLicense = [
        ...numOfDriverLicense,
        newDriverLicenseIndex,
      ];
      setNumOfDriverLicense(updatedDriverLicense);
      storedData.numOfDriverLicense = updatedDriverLicense;

      if (!storedData.driver_license_type) {
        storedData.driver_license_type = [];
      }
      if (!storedData.driver_license_number) {
        storedData.driver_license_number = [];
      }

      storedData.driver_license_type.push("");
      storedData.driver_license_number.push("");

      localStorage.setItem("formDriverLicenseData", JSON.stringify(storedData));
    }
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    localStorage.setItem(
      "formDriverLicenseData",
      JSON.stringify({ ...allValues, numOfDriverLicense })
    );
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    // Simpan data ke localStorage
    localStorage.setItem(
      "formDriverLicenseData",
      JSON.stringify({ ...values, numOfDriverLicense })
    );

    const currentAllData = { ...employeeData, ...values };
    await dispatch(employeeActions.setFormEmployeeData(values));
    dispatch(updateEmployeeData(currentAllData));

    await handleSubmit(new Event("submit"));

    setLoading(false);
  };

  return (
    <div className="bg-white max-h-90vh overflow-y-scroll w-full rounded-xl p-8">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
      >
        <Row className="font-bold text-lg">Driver License (SIM)</Row>
        {numOfDriverLicense.map((idx, index) => (
          <div key={idx} className="relative">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => removeRow("driver license", index)}
              className="absolute top-0 right-0 z-50"
            />
            <Row gutter={24}>
              <Col span={12}>
                {loading ? (
                  <Skeleton.Input active size="large" />
                ) : (
                  <FormItem
                    name={[`driver_license_type`, index]}
                    required
                    label="Driver License Type"
                  >
                    <Select placeholder="Pilih Tipe SIM" size="large">
                      {driverlicensetype.map((drl) => (
                        <Select.Option key={drl.id}>{drl.name}</Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                )}
              </Col>
              <Col span={12}>
                {loading ? (
                  <Skeleton.Input active size="large" />
                ) : (
                  <FormItem
                    name={[`driver_license_number`, index]}
                    required
                    label="Driver License Number"
                  >
                    <Input size="large" type="number" maxLength={16} />
                  </FormItem>
                )}
              </Col>
            </Row>
          </div>
        ))}

        <Row>
          <Col>
            <span
              className="font-bold text-primary underline cursor-pointer flex gap-2 hover:text-medium pl-2"
              onClick={() => addRow("driver license")}
            >
              <CirclePlus /> Add Driver License Type
            </span>
          </Col>
        </Row>

        <Row className="font-bold text-lg mt-4">Family Card (KK)</Row>
        <Row gutter={24}>
          <Col span={24}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem
                name="family_card_number"
                required
                label="Family Card Number"
              >
                <Input size="large" type="number" maxLength={16} />
              </FormItem>
            )}
          </Col>
        </Row>

        <Row className="font-bold text-lg mt-4">
          Tax Number (Nomor Pokok Wajib Pajak NPWP)
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem name="tax_name" required label="Tax Name">
                <Input size="large" />
              </FormItem>
            )}
          </Col>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem name="tax_number" required label="Tax Number">
                <Input size="large" type="number" maxLength={16} />
              </FormItem>
            )}
          </Col>
        </Row>

        <Row className="font-bold text-lg mt-4">Personal BPJS</Row>
        <Row gutter={24}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem
                name="bpjs_kesehatan_number"
                required
                label="BPJS Kesehatan Number"
              >
                <Input size="large" type="number" maxLength={16} />
              </FormItem>
            )}
          </Col>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem
                name="bpjs_ketenagakerjaan_number"
                required
                label="BPJS Ketenagakerjaan"
              >
                <Input size="large" type="number" maxLength={16} />
              </FormItem>
            )}
          </Col>
        </Row>

        <Row className="font-bold text-lg mt-4">Education History</Row>
        <Row gutter={24}>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem name="last_education" required label="Last Education">
                <Input size="large" />
              </FormItem>
            )}
          </Col>
          <Col span={12}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem name="major" required label="Major">
                <Input size="large" />
              </FormItem>
            )}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            {loading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <FormItem name="institution" required label="Institution Name">
                <Input size="large" />
              </FormItem>
            )}
          </Col>
        </Row>

        <Row gutter={24} className="mt-4">
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
              submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default FormDriverLicense;
