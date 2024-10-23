import FormItem from "@root/app/components/FormItem";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { TeamType, teamActions } from "@root/libs/store/slices/team.slice";
import {
  createJobRole, // Update this import to use the new thunk
  getTeamById,
  updateTeam,
} from "@root/libs/store/thunk/team";
import { getLevelList } from "@root/libs/store/thunk/level";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FormTeamProps {
  id?: string;
  section_id: string;
  callback?: () => void;
}

const FormTeam = (props: FormTeamProps) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const [limit, setLimit] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<{ name?: string }>({});

  const { loading, team }: { loading: boolean; team: TeamType } =
    useAppSelector((state) => state.team);
  const { levels, loading: levelLoading } = useAppSelector(
    (state) => state.level
  );

  useEffect(() => {
    dispatch(getLevelList(limit, currentPage, searchParams.name)).catch(
      (error) => {
        console.error("Error fetching levels:", error);
      }
    );
  }, [dispatch, limit, currentPage, searchParams]);

  useEffect(() => {
    if (team) {
      form.setFieldValue("name", team.name);
      form.setFieldValue("level", team.level_id);
    }
  }, [team]);

  const handleSearch = (value: string) => {
    setSearchParams({ name: value });
  };

  const handleClear = async () => {
    setSearchParams({});
    await dispatch(getLevelList());
  };

  const submitData = (values: { name: string; level: string }) => {
    const dataToSend = {
      name: values.name,
      slug: values.name.toLowerCase().replace(/\s+/g, "-"),
      section_id: props.section_id,
      level_id: values.level,
    };

    if (id) {
      dispatch(
        updateTeam({
          ...dataToSend,
          id: id,
        })
      );
    } else {
      console.log(dataToSend);
      dispatch(createJobRole(dataToSend));
    }

    form.resetFields();
    if (props.callback) {
      props.callback();
    }
  };

  return (
    <div className="p-2">
      <Form form={form} layout="vertical" onFinish={submitData}>
        <FormItem required label="Team Name" name="name">
          <Input />
        </FormItem>

        {/* Dropdown with search for levels */}
        <FormItem required label="Level" name="level">
          <Select
            loading={levelLoading}
            showSearch
            placeholder="Select a level"
            onSearch={handleSearch}
            allowClear
            onClear={handleClear}
            filterOption={false} // Disable built-in filtering to use custom search
          >
            {levels.map((level) => (
              <Select.Option key={level.id} value={level.id}>
                {`${level.type} - ${level.category}`}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <Row>
          <Col span="24" className="text-end">
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormTeam;
