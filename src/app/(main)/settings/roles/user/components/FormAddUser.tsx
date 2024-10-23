import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { getEmployeeDropdown } from "@root/libs/store/thunk/employee";
import { createRelation } from "@root/libs/store/thunk/relation";
import { Form, Select, Row, Col, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import _ from "lodash";
import { addUserToRole, getRoleList } from "@root/libs/store/thunk/user-role";
import { Role } from "@root/libs/store/slices/user-role.slice";

interface FormAddUserProps {
  id?: string;
}

const FormAddUser = (props: FormAddUserProps) => {
  const { id } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const route = useRouter();

  const [userOptions, setUserOptions] = useState<any[]>([]);
  const [roleOptions, setRoleOptions] = useState<Role[]>([]);

  const { employees, loading: employeeLoading } = useAppSelector(
    (state) => state.employee
  );
  const { roles, loading: roleLoading } = useAppSelector((state) => ({
    roles: state.userRole.roles,
    loading: state.userRole.loading,
  }));

  const { loading: relationLoading } = useAppSelector(
    (state) => state.relation
  );

  useEffect(() => {
    dispatch(getEmployeeDropdown());
    dispatch(getRoleList());
  }, [dispatch]);

  useEffect(() => {
    setUserOptions(employees);
  }, [employees]);

  useEffect(() => {
    setRoleOptions(roles);
  }, [roles]);

  const handleSubmit = async (values: {
    user_id: string[];
    role_id?: string;
  }) => {
    const { user_id, role_id } = values;
    console.log(user_id, role_id);

    if (role_id) {
      const result = await dispatch(addUserToRole(role_id, user_id));
      if (result && result.success) {
        route.push("/settings/roles/user");
      } else {
        console.error("Failed to add users to role:", result?.error);
      }
    } else {
      console.error("Role ID is required to add users to a role");
    }
  };

  const debouncedSearchUser = _.debounce(async (e: string) => {
    await dispatch(getEmployeeDropdown(e));
  }, 300);

  const handleSearchUser = (e: string) => {
    debouncedSearchUser(e);
  };

  const handleClearUser = async () => {
    await dispatch(getEmployeeDropdown());
  };

  return (
    <div className="p-2">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <FormItem required label="User" name="user_id">
          <Select
            mode="multiple"
            showSearch
            onSearch={handleSearchUser}
            allowClear
            onClear={handleClearUser}
            filterOption={false}
            loading={employeeLoading}
          >
            {userOptions.map((item: any) => (
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

        <FormItem required label="Role" name="role_id">
          <Select
            showSearch
            allowClear
            filterOption={false}
            loading={roleLoading}
          >
            {roleOptions.map((item: Role) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
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

export default FormAddUser;
