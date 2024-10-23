import { Avatar, Col, Row } from "antd";
import PaperclipIcon from "../icons/paperclip";
import Image from "next/image";
import { EmployeeDataFull } from "@root/libs/types/employee";
import { useAppSelector } from "@root/libs/store";

interface EmployeeDataSectionProps {
  user_id: string;
}

const EmployeeDataSection = (props: EmployeeDataSectionProps) => {
  const { employee }: { employee: EmployeeDataFull } = useAppSelector(
    (state) => state.employee
  );
  return (
    <div>
      <Row gutter={24}>
        <Col span={14}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7`}>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-bold">Employee Data</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>NIP</Col>
              <Col span={12}>{employee.employee.nip}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Superior</Col>
              <Col span={12}>{employee.employee.name}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Level</Col>
              <Col span={12}>
                {employee.jabatan.templevelA}
                {employee.jabatan.templevelN}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Employee Status</Col>
              <Col span={12}>{employee.personal_data.statusKaryawan}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Join Date</Col>
              <Col span={12}>
                {employee.personal_data.date_contract.in_date}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Contract Start Date</Col>
              <Col span={12}>
                {employee.personal_data.date_contract.in_date}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Contract End Date</Col>
              <Col span={12}>
                {employee.personal_data.date_contract.end_date}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Fixed Date</Col>
              <Col span={12}>
                {employee.personal_data.date_contract.fixed_date}
              </Col>
            </Row>
          </div>

          <div className={`bg-white rounded-lg justify-center py-4 px-7 mt-4`}>
            <Avatar
              size={60}
              style={{
                background:
                  "var(--primary-color-225, rgba(21, 114, 161, 0.25))",
              }}
              icon={<PaperclipIcon />}
            />

            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <p className="font-bold">Workplace Data</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Place</Col>
              <Col span={12}>Head Office</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>City</Col>
              <Col span={12}>Bandung</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Company</Col>
              <Col span={12}>{employee.company.name}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Division</Col>
              <Col span={12}>{employee.division.name}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Department</Col>
              <Col span={12}>{employee.department.name}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Section</Col>
              <Col span={12}>{employee.section.name}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Team</Col>
              <Col span={12}>null</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Position</Col>
              <Col span={12}>{employee.jobrole.name}</Col>
            </Row>
          </div>
        </Col>
        <Col span={10}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7`}>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24} className="text-center">
                <p className="font-bold">Company</p>
              </Col>
            </Row>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <div className="text-center flex items-center justify-center">
                  <Image
                    src="/assets/images/23-logo.png"
                    alt="Logo Perusahaan"
                    width={150}
                    height={80}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-2 mt-4">
              <Col span={24} className="text-center">
                <p>PT Dua Puluh Tiga</p>
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={24} className="text-center text-[#1E1E1E80] text-xs">
                <p>
                  Jl. Kopo Bihbul Raya No.68, Sayati, Kec. Margahayu, Kabupaten
                  Bandung, Jawa Barat
                </p>
              </Col>
            </Row>
          </div>

          <div className={`bg-white rounded-lg justify-center py-4 px-7 mt-4`}>
            <Row gutter={24} className="mb-2 mt-4" justify="space-between">
              <Col span={24}>
                <p className="font-bold">Allowance</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2" justify="space-between">
              <Col>Health Allowance</Col>
              <Col>1,000,000</Col>
            </Row>
            <Row gutter={24} className="my-2" justify="space-between">
              <Col>Meal Allowance</Col>
              <Col>1,000,000</Col>
            </Row>
            <Row gutter={24} className="my-2" justify="space-between">
              <Col>Transportation Allowance</Col>
              <Col>1,000,000</Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default EmployeeDataSection;
