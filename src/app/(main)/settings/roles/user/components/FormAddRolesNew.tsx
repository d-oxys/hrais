import React, { useEffect } from "react";
import FormItem from "@root/app/components/FormItem";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { Module } from "@root/libs/store/slices/module.slice";
import { getModuleListWithFunctions } from "@root/libs/store/thunk/module";
import {
  createRole,
  fetchRoleDetail,
  updateRole,
} from "@root/libs/store/thunk/user-role"; // Import updateRole
import { Button, Col, Form, Input, Row, Table, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";

// Define an interface for module permissions
interface ModulePermissions {
  [key: string]: {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

interface FormModuleProps {
  id?: string;
}

const FormRoles = (props: FormModuleProps) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const loading = useAppSelector((state) => state.userRole.loading);
  const modules: Module[] = useAppSelector((state) => state.module.modules);
  const roleDetail = useAppSelector((state) => state.userRole.roleDetail);

  useEffect(() => {
    const fetchModules = async () => {
      await dispatch(getModuleListWithFunctions());
    };

    fetchModules();
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchRoleDetail(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (roleDetail) {
      form.setFieldsValue({
        name: roleDetail.name,
        modulePermissions: {},
      });

      const modulePermissions: ModulePermissions = {};
      roleDetail.role_functions?.forEach((roleFunction) => {
        const functionId = roleFunction.role_function.id.toString();
        modulePermissions[functionId] = {
          read: Boolean(roleFunction.role_function.read),
          create: Boolean(roleFunction.role_function.create),
          update: Boolean(roleFunction.role_function.update),
          delete: Boolean(roleFunction.role_function.delete),
        };
      });

      form.setFieldsValue({ modulePermissions });
    }
  }, [roleDetail, form]);

  const submitData = async (values: any) => {
    const modulePermissions = values.modulePermissions || {};

    const function_ids = Object.keys(modulePermissions).filter((funcId) =>
      Object.values(modulePermissions[funcId]).some(Boolean)
    );

    const respon = function_ids.map((funcId) => {
      const permissions = modulePermissions[funcId];
      const perms = [];
      if (permissions.create) perms.push("create");
      if (permissions.read) perms.push("read");
      if (permissions.update) perms.push("update");
      if (permissions.delete) perms.push("delete");
      return perms.join(",");
    });

    const roleData = {
      name: values.name,
      function_id: function_ids,
      respon: respon,
    };

    let success = false;

    if (id) {
      const result = await dispatch(updateRole(Number(id), roleData));
      success = result && result.success;
    } else {
      const result = await dispatch(createRole(roleData));
      success = result && result.success;
    }

    if (success) {
      window.location.href = "/settings/roles/user";
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    console.log("Changed values:", changedValues);
    console.log("All form values:", allValues);
  };

  const dataSource = modules.flatMap((module: Module) => {
    return module.functions.map((funcWrapper: any, index: number) => {
      const func = funcWrapper.function;
      return {
        key: func.id.toString(),
        no: index + 1,
        moduleName: module.name,
        functionName: func.name,
      };
    });
  });

  const groupedDataSource = dataSource.reduce(
    (acc, curr) => {
      const lastGroup = acc[acc.length - 1];
      if (lastGroup && lastGroup[0].moduleName === curr.moduleName) {
        lastGroup.push(curr);
      } else {
        acc.push([curr]);
      }
      return acc;
    },
    [] as Array<Array<(typeof dataSource)[0]>>
  );

  const columns: ColumnsType<{
    key: string;
    no: number;
    moduleName: string;
    functionName: string;
  }> = [
    {
      title: "Modules",
      dataIndex: "moduleName",
      key: "moduleName",
      render: (text: string, record: any, index: number) => {
        const isFirstInGroup =
          index === 0 || dataSource[index - 1].moduleName !== text;
        return isFirstInGroup ? <div className="module-row">{text}</div> : null;
      },
    },
    {
      title: "Function",
      dataIndex: "functionName",
      key: "functionName",
    },
    {
      title: "Create",
      key: "create",
      render: (value: any, record: any) => (
        <Form.Item
          name={["modulePermissions", record.key, "create"]}
          valuePropName="checked"
          noStyle
        >
          <Checkbox />
        </Form.Item>
      ),
    },
    {
      title: "Read",
      key: "read",
      render: (value: any, record: any) => (
        <Form.Item
          name={["modulePermissions", record.key, "read"]}
          valuePropName="checked"
          noStyle
        >
          <Checkbox />
        </Form.Item>
      ),
    },
    {
      title: "Update",
      key: "update",
      render: (value: any, record: any) => (
        <Form.Item
          name={["modulePermissions", record.key, "update"]}
          valuePropName="checked"
          noStyle
        >
          <Checkbox />
        </Form.Item>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (value: any, record: any) => (
        <Form.Item
          name={["modulePermissions", record.key, "delete"]}
          valuePropName="checked"
          noStyle
        >
          <Checkbox />
        </Form.Item>
      ),
    },
  ];

  return (
    <div className="p-2">
      <Form
        form={form}
        layout="vertical"
        onFinish={submitData}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <FormItem
          required
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </FormItem>

        <Table
          dataSource={groupedDataSource.flat()}
          columns={columns}
          pagination={false}
          bordered
          className="custom-table"
          rowKey="key"
        />

        <Row>
          <Col span={24} className="text-end mt-8">
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormRoles;
