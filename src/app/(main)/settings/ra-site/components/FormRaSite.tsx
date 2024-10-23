import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { getEmployeeDropdown } from "@root/libs/store/thunk/employee";
import {
  getSiteData,
  createRaSiteRelation,
} from "@root/libs/store/thunk/rasite";
import { Form, Select, Row, Col, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import _ from "lodash";

interface FormRelationProps {
  id?: string;
}

const FormRaSite = (props: FormRelationProps) => {
  const { id } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const route = useRouter();

  const [employeeOptions, setEmployeeOptions] = useState<any>([]);
  const [siteOptions, setSiteOptions] = useState<any>([]);

  const {
    employees,
    loading: employeeLoading,
  }: { employees: any; loading: boolean } = useAppSelector(
    (state) => state.employee
  );
  const {
    sitedata,
    loading: siteLoading,
  }: { sitedata: any; loading: boolean } = useAppSelector(
    (state) => state.rasiteGroup
  );

  const { loading: relationLoading }: { loading: boolean } = useAppSelector(
    (state) => state.relation
  );

  useEffect(() => {
    dispatch(getEmployeeDropdown());
    dispatch(getSiteData());
  }, [dispatch]);

  useEffect(() => {
    setEmployeeOptions(employees);
  }, [employees]);

  useEffect(() => {
    setSiteOptions(sitedata);
  }, [sitedata]);

  const submitData = async (values: { lead_id: string; site_id: string }) => {
    const { lead_id, site_id } = values;
    console.log(lead_id, site_id);
    // Panggil thunk untuk mengirim data ke API
    await dispatch(createRaSiteRelation(lead_id, site_id));
    route.push("/settings/ra-site");
  };

  const debouncedSearchEmployee = _.debounce(async (e: string) => {
    await dispatch(getEmployeeDropdown(e));
  }, 300);

  const handleSearchEmployee = (e: string) => {
    debouncedSearchEmployee(e);
  };

  const handleClearEmployee = async () => {
    await dispatch(getEmployeeDropdown());
  };

  const debouncedSearchSite = _.debounce(async (e: string) => {
    await dispatch(getSiteData(e, undefined, 100));
  }, 300);

  const handleSearchSite = (e: string) => {
    debouncedSearchSite(e);
  };

  const handleClearSite = async () => {
    await dispatch(getSiteData());
  };

  return (
    <div className="p-2">
      <Form form={form} layout="vertical" onFinish={submitData}>
        <FormItem required label="Employee" name="lead_id">
          <Select
            showSearch
            onSearch={handleSearchEmployee}
            allowClear
            onClear={handleClearEmployee}
            filterOption={false}
            loading={employeeLoading}
          >
            {employeeOptions.map((item: any) => (
              <Select.Option
                key={item.user_id}
                value={item.user_id}
                disabled={employeeLoading || relationLoading}
              >
                {item.user.nip} - {item.user.name}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <FormItem required label="Site" name="site_id">
          <Select
            showSearch
            onSearch={handleSearchSite}
            allowClear
            onClear={handleClearSite}
            filterOption={false}
            loading={siteLoading}
          >
            {siteOptions.map((item: any) => (
              <Select.Option
                key={item.site}
                value={item.site}
                disabled={siteLoading || relationLoading}
              >
                {item.site} - {item.name} ({item.category})
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <Row>
          <Col span="24" className="text-end">
            <Button type="primary" htmlType="submit" loading={relationLoading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormRaSite;
