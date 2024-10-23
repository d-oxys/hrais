import FormItem from "@root/app/components/FormItem";
import { LEVEL_A, LEVEL_N } from "@root/libs/constants/staticdata";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { LevelType, levelActions } from "@root/libs/store/slices/level.slice";
import { getCompany } from "@root/libs/store/thunk/company";
import {
  createLevel,
  getLevelById,
  updateLevel,
  getLevelCategory,
  getLevelEmacs, // Import thunk
} from "@root/libs/store/thunk/level";
import { CompanyState } from "@root/libs/types/company";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FormLevelProps {
  id?: string;
}

const FormLevel = (props: FormLevelProps) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const {
    loading,
    level,
    levelCategory,
    levelEmacs,
  }: {
    loading: boolean;
    level: LevelType;
    levelCategory: any[];
    levelEmacs: any[];
  } = useAppSelector((state) => state.level);
  const [groupOptions, setGroupOptions] = useState<string[]>([]);
  const [specialistOptions, setSpecialistOptions] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(getLevelById(id));
    } else {
      dispatch(levelActions.setLevelDetail({}));
    }
  }, [id]);

  useEffect(() => {
    if (level) {
      form.setFieldsValue(level);
      if (level.level) {
        dispatch(getLevelCategory(level.level));
      }
    }
  }, [level]);

  useEffect(() => {
    if (levelCategory) {
      const groupTypes: string[] = Array.from(
        new Set(levelCategory.map((item) => item.type))
      );
      setGroupOptions(groupTypes);

      if (level.type) {
        const filteredSpecialists = Array.from(
          new Set(
            levelCategory
              .filter((item) => item.type === level.type)
              .map((item) => item.category)
          )
        );
        setSpecialistOptions(filteredSpecialists);
      }
    }
  }, [levelCategory, level.type]);

  useEffect(() => {
    dispatch(getLevelEmacs());
  }, []);

  const handleLevelAChange = (value: string) => {
    dispatch(getLevelCategory(value));
    setGroupOptions([]);
    setSpecialistOptions([]);
    form.setFieldsValue({ type: undefined, category: undefined });
  };

  const handleGroupChange = (value: string) => {
    const filteredSpecialists = Array.from(
      new Set(
        levelCategory
          .filter((item) => item.type === value)
          .map((item) => item.category)
      )
    );
    setSpecialistOptions(filteredSpecialists);
  };

  const submitData = async (values: LevelType) => {
    const payload = {
      level: values.level,
      grade: values.grade,
      levelEm: values.levelEm,
      type: values.type,
      category: values.category,
      health_balance: values.health_balance,
      meal_allowance: values.meal_allowance,
      transportation_fee: values.transportation_fee,
      ...(id && { id: Number(id) }),
    };

    if (id) {
      dispatch(updateLevel(payload));
    } else {
      dispatch(createLevel(payload));
    }
    route.push("/settings/level");
  };

  return (
    <div className="p-2">
      <Form form={form} layout="vertical" onFinish={submitData}>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="Level" required name="level">
              <Select onChange={handleLevelAChange}>
                {LEVEL_A.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Grade" required name="grade">
              <Select>
                {LEVEL_N.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Level Emacs" required name="levelEm">
              <Select>
                {levelEmacs.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.levelE}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="Group" required name="type">
              <Select onChange={handleGroupChange}>
                {groupOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Specialist" required name="category">
              <Select>
                {specialistOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="Health Allowances" required name="health_balance">
              <Input type="number" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Meal Allowances" name="meal_allowance">
              <Input type="number" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Transport Allowances" name="transportation_fee">
              <Input type="number" />
            </FormItem>
          </Col>
        </Row>
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
export default FormLevel;
