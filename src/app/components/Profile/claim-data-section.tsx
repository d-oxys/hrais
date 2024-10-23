import { Avatar, Col, Row } from "antd";
import PaperclipIcon from "../icons/paperclip";
import Image from "next/image";
import { EmployeeDataFull } from "@root/libs/types/employee";
import { useAppSelector } from "@root/libs/store";

interface EmployeeDataSectionProps {
  user_id: string;
}

const ClaimsDataSection = (props: EmployeeDataSectionProps) => {
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
                <p className="font-bold">Claims Information</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>
                <p className="font-base">Total Health Claims Quota</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-base">Used Claims</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-base">Health Claims Left</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2 mt-8">
              <Col span={24}>
                <p className="font-bold">Permissions History</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={6}>ID</Col>
              <Col span={6}>Date</Col>
              <Col span={6}>Reason</Col>
              <Col span={6}>Nominal</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={6}>9009102</Col>
              <Col span={6}>18-Agu-2024 - 23-Agu-2024</Col>
              <Col span={6}>Back To Hometown</Col>
              <Col span={6}>1,0000,000</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={6}>9009102</Col>
              <Col span={6}>18-Agu-2024 - 23-Agu-2024</Col>
              <Col span={6}>Back To Hometown</Col>
              <Col span={6}>1,0000,000</Col>
            </Row>

            <Row gutter={24} className="my-2">
              <Col span={24}>
                <hr />
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-base">Health CLaims Quota</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-base">Used Claims</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-bold">Claims Left</p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ClaimsDataSection;
