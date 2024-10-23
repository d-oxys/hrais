"use client";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  UploadFile,
} from "antd";
import { useEffect, useState } from "react";
import { EmployeeData } from "@root/libs/types/employee";
import FormItem from "../FormItem";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { employeeActions } from "@root/libs/store/slices/employee.slice";
import { getCompanies } from "@root/libs/store/thunk/company";

interface FormEmployeeData {
  onNext: () => void;
  data?: EmployeeData | null;
}

const FormEmployeeData = (props: FormEmployeeData) => {
  const { onNext, data } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>(
    undefined
  );
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState<
    string | undefined
  >(undefined);
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
    undefined
  );
  const [selectedDepartment, setSelectedDepartment] = useState<
    string | undefined
  >(undefined);
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined
  );
  const [businessUnits, setBusinessUnits] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [jobroles, setJobroles] = useState<any[]>([]);

  const { companies, loading, error } = useAppSelector(
    (state) => state.company
  );

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  useEffect(() => {
    const storedData = localStorage.getItem("formEmployeeData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      form.setFieldsValue(parsedData);
      setSelectedCompany(parsedData.Companies);
      setSelectedBusinessUnit(parsedData.BusinessUnits);
      setSelectedDivision(parsedData.Divisions);
      setSelectedDepartment(parsedData.Departments);
      setSelectedSection(parsedData.Sections);
    }
  }, [form]);

  useEffect(() => {
    if (selectedCompany) {
      const company = companies.find(
        (c: any) => c.company.id === selectedCompany
      );
      if (company) {
        setBusinessUnits(company.company.businessUnits || []);
      }
    } else {
      setBusinessUnits([]);
    }
  }, [selectedCompany, companies]);

  useEffect(() => {
    if (selectedBusinessUnit) {
      const businessUnit = businessUnits.find(
        (bu: any) => bu.businessUnit.slug === selectedBusinessUnit
      );
      if (businessUnit) {
        setDivisions(businessUnit.divisions || []);
      }
    } else {
      setDivisions([]);
    }
  }, [selectedBusinessUnit, businessUnits]);

  useEffect(() => {
    if (selectedDivision) {
      const division = divisions.find(
        (d: any) => d.division.slug === selectedDivision
      );
      if (division) {
        setDepartments(division.departments || []);
      }
    } else {
      setDepartments([]);
    }
  }, [selectedDivision, divisions]);

  useEffect(() => {
    if (selectedDepartment) {
      const department = departments.find(
        (d: any) => d.department.slug === selectedDepartment
      );
      if (department) {
        setSections(department.sections || []);
      }
    } else {
      setSections([]);
    }
  }, [selectedDepartment, departments]);

  useEffect(() => {
    if (selectedSection) {
      const section = sections.find(
        (s: any) => s.section.slug === selectedSection
      );
      if (section) {
        setJobroles(section.jobroles || []);
      }
    } else {
      setJobroles([]);
    }
  }, [selectedSection, sections]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    localStorage.setItem("formEmployeeData", JSON.stringify(allValues));
  };

  const onFinish = async (values: any) => {
    localStorage.setItem("formEmployeeData", JSON.stringify(values));
    dispatch(employeeActions.setFormEmployeeData(values));
    onNext();
  };

  return (
    <div className="bg-white w-full rounded-xl p-8 h-90vh overflow-y-scroll">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
      >
        <div className="font-bold text-lg">Employee Data</div>
        <div className="p-3 font-bold">
          <FormItem label="Full Name" required name="fullname">
            <Input size="large" />
          </FormItem>

          <FormItem label="NIP" required name="nip">
            <Input size="large" />
          </FormItem>

          <FormItem label="Phone Number" required name="phone_number">
            <Input size="large" />
          </FormItem>
        </div>

        <div className="font-bold text-lg">Job Role</div>
        <div className="p-3">
          <Row gutter={12}>
            <Col span={12}>
              <FormItem label="Companies" required name="Companies">
                <Select
                  size="large"
                  onChange={(value) => setSelectedCompany(value)}
                >
                  {companies.map((item: any) => (
                    <Select.Option
                      key={item.company.id}
                      value={item.company.id}
                    >
                      {item.company.name}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Business Units" required name="BusinessUnits">
                <Select
                  size="large"
                  onChange={(value) => setSelectedBusinessUnit(value)}
                >
                  {businessUnits.map((item: any) => (
                    <Select.Option
                      key={item.businessUnit.slug}
                      value={item.businessUnit.slug}
                    >
                      {item.businessUnit.nameBusinessUnit}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <FormItem label="Divisions" required name="Divisions">
                <Select
                  size="large"
                  onChange={(value) => setSelectedDivision(value)}
                >
                  {divisions.map((item: any) => (
                    <Select.Option
                      key={item.division.slug}
                      value={item.division.slug}
                    >
                      {item.division.nameDivision}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Departments" required name="Departments">
                <Select
                  size="large"
                  onChange={(value) => setSelectedDepartment(value)}
                >
                  {departments.map((item: any) => (
                    <Select.Option
                      key={item.department.slug}
                      value={item.department.slug}
                    >
                      {item.department.nameDepartment}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <FormItem label="Sections" required name="Sections">
                <Select
                  size="large"
                  onChange={(value) => setSelectedSection(value)}
                >
                  {sections.map((item: any) => (
                    <Select.Option
                      key={item.section.slug}
                      value={item.section.slug}
                    >
                      {item.section.nameSection}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Jobroles" required name="Jobroles">
                <Select size="large">
                  {jobroles.map((item: any) => (
                    <Select.Option
                      key={item.jobrole.slug}
                      value={item.jobrole.slug}
                    >
                      {item.jobrole.nameJobrole}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Level" required name="level">
                <Input size="large" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="supervisor" required name="supervisor">
                <Input size="large" />
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Button
                htmlType="submit"
                type="primary"
                className="w-full mt-6"
                size="large"
              >
                Next
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default FormEmployeeData;
