import { Avatar, Col, Row } from "antd";
import PaperclipIcon from "../icons/paperclip";
import Image from "next/image";
import { EmployeeDataFull } from "@root/libs/types/employee";
import { useAppSelector } from "@root/libs/store";

interface EmployeeDataSectionProps {
  user_id: string;
}

const PermissionsDataSection = (props: EmployeeDataSectionProps) => {
  const { employee }: { employee: EmployeeDataFull } = useAppSelector(
    (state) => state.employee
  );
  return (
    <div>
      <Row gutter={24}>
        <Col span={24}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7 mt-4`}>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-bold">Permissions</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-semibold">Permissions</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-semibold">Permissions will expire</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2 mt-8">
              <Col span={24}>
                <p className="font-bold">Permissions History</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={8}>ID</Col>
              <Col span={8}>Date</Col>
              <Col span={8}>Reason</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={8}>9009102</Col>
              <Col span={8}>31-Jan-2024 - 02-Feb-2024</Col>
              <Col span={8}>-</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={8}>9009102</Col>
              <Col span={8}>18-Agu-2024 - 23-Agu-2024</Col>
              <Col span={8}>Back To Hometown</Col>
            </Row>

            <Row gutter={24} className="my-2">
              <Col span={24}>
                <hr />
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-base">Permissions Quota</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-base">Used Permissions</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-bold">Permissions Left</p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default PermissionsDataSection;
