import { Avatar, Col, Row } from "antd";
import PaperclipIcon from "../icons/paperclip";
import Image from "next/image";
import { EmployeeDataFull } from "@root/libs/types/employee";
import { useAppSelector } from "@root/libs/store";

interface EmployeeDataSectionProps {
  user_id: string;
}

const AddressDataSection = (props: EmployeeDataSectionProps) => {
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
                <p className="font-bold">Address</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Address</Col>
              <Col span={12}>{employee.personal_data.address.addressKTP}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Province</Col>
              <Col span={12}>
                {employee.personal_data.address.provinceKTP.name}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>City</Col>
              <Col span={12}>{employee.personal_data.address.cityKTP.name}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>District</Col>
              <Col span={12}>
                {employee.personal_data.address.districtKTP.name}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Sub District</Col>
              <Col span={12}>
                {employee.personal_data.address.subdistrictKTP.name}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Rw</Col>
              <Col span={12}>
                {employee.personal_data.address.RtRwDomisili.split("/")[1]}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Rt</Col>
              <Col span={12}>
                {employee.personal_data.address.RtRwDomisili.split("/")[0]}
              </Col>
            </Row>
          </div>

          <div className={`bg-white rounded-lg justify-center py-4 px-7 mt-4`}>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-bold">Address</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Address</Col>
              <Col span={12}>{employee.personal_data.address.addressKTP}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Province</Col>
              <Col span={12}>
                {employee.personal_data.address.provinceKTP.name}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>City</Col>
              <Col span={12}>{employee.personal_data.address.cityKTP.name}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>District</Col>
              <Col span={12}>
                {employee.personal_data.address.districtKTP.name}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Sub District</Col>
              <Col span={12}>
                {employee.personal_data.address.subdistrictKTP.name}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Rw</Col>
              <Col span={12}>
                {employee.personal_data.address.RtRwDomisili.split("/")[1]}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Rt</Col>
              <Col span={12}>
                {employee.personal_data.address.RtRwDomisili.split("/")[0]}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default AddressDataSection;
