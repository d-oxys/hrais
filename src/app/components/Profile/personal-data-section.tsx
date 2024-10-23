import { Avatar, Col, Row } from "antd";
import PaperclipIcon from "../icons/paperclip";
import Image from "next/image";
import { EmployeeDataFull } from "@root/libs/types/employee";
import { useAppSelector } from "@root/libs/store";
import React from "react";

interface EmployeeDataSectionProps {
  user_id: string;
}

const PersonalDataSection = (props: EmployeeDataSectionProps) => {
  const { employee }: { employee: EmployeeDataFull } = useAppSelector(
    (state) => state.employee
  );

  const personalData = {
    maritalStatus: "Married",
    spouseName: "Robert",
    identityNumber: "323232123456789",
    placeOfBirth: "Bandung",
    dateOfBirth: "01 December 2000",
    children: [
      {
        name: "Wilbert Quinn",
        placeOfBirth: "Bandung",
        dateOfBirth: "01 December 2001",
      },
      {
        name: "Willie Som",
        placeOfBirth: "Bandung",
        dateOfBirth: "08 September 2002",
      },
      {
        name: "Shania Lawrence",
        placeOfBirth: "Bandung",
        dateOfBirth: "16 May 2004",
      },
    ],
  };

  const getOrdinal = (n: any) => {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div>
      <Row gutter={24}>
        {/* right */}
        <Col span={12}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7`}>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-bold">Personal Data</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Religion</Col>
              <Col span={12}>{employee.personal_data.religion}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Gender</Col>
              <Col span={12}>{employee.personal_data.gender}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Weigth</Col>
              <Col span={12}>{employee.personal_data.weight}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Height</Col>
              <Col span={12}>{employee.personal_data.height}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Blood Type</Col>
              <Col span={12}>{employee.personal_data.blood_type}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Nationality</Col>
              <Col span={12}>{employee.personal_data.nationality}</Col>
            </Row>
          </div>

          <div className={`bg-white rounded-lg justify-center py-4 px-7 mt-4 `}>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <p className="font-bold">Family Data</p>
              </Col>
            </Row>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <p className="font-semibold">Biological Father</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Name</Col>
              <Col span={12}>{employee.family_data.father_name}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Place Of Birth</Col>
              <Col span={12}>
                {employee.family_data.relationship_birth.name}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Date Of Birth</Col>
              <Col span={12}>{employee.family_data.father_birth}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Address</Col>
              <Col span={12}>
                {employee.personal_data.address.addressKTP}{" "}
                {employee.personal_data.address.RtRwDomisili}
              </Col>
            </Row>

            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <p className="font-semibold">Biological Mother</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Name</Col>
              <Col span={12}>{employee.family_data.mother_name}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Place Of Birth</Col>
              <Col span={12}>
                {employee.family_data.relationship_birth.name}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Date Of Birth</Col>
              <Col span={12}>{employee.family_data.mother_birth}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Address</Col>
              <Col span={12}>
                {" "}
                {employee.personal_data.address.addressKTP}{" "}
                {employee.personal_data.address.RtRwDomisili}
              </Col>
            </Row>
          </div>

          <div className={`bg-white rounded-lg justify-center py-4 px-7 mt-4`}>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <Row gutter={24} className="mb-2 mt-4">
                  <Col span={24} className="text-center">
                    <p className="font-bold">FAMILY CARD</p>
                  </Col>
                </Row>
                <div className="text-center flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/150x80"
                    alt="Placeholder"
                    width={150}
                    height={80}
                  />
                </div>
                <Row className="mb-2 mt-4">
                  <Col span={24} className="text-center">
                    <p>PT Dua Puluh Tiga</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>

        {/* left */}
        <Col span={12}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7`}>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <Row gutter={24} className="mb-2 mt-4">
                  <Col span={24} className="text-center">
                    <p className="font-bold">ID CARD</p>
                  </Col>
                </Row>
                <div className="text-center flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/150x80"
                    alt="Placeholder"
                    width={150}
                    height={80}
                  />
                </div>
                <Row className="mb-2 mt-4">
                  <Col span={24} className="text-center">
                    <p>PT Dua Puluh Tiga</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className={`bg-white rounded-lg justify-center py-4 px-7 mt-4`}>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-bold">Spouse And Children</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2 font-semibold">
              <Col span={12}>Marital Status</Col>
              <Col span={12}>{personalData.maritalStatus}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Spouse Name</Col>
              <Col span={12}>{personalData.spouseName}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Identity Number</Col>
              <Col span={12}>{personalData.identityNumber}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Place of Birth</Col>
              <Col span={12}>{personalData.placeOfBirth}</Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Date of Birth</Col>
              <Col span={12}>{personalData.dateOfBirth}</Col>
            </Row>
            {personalData.children.map((child, index) => (
              <React.Fragment key={index}>
                <Row gutter={24} className="my-2 font-semibold">
                  <Col span={24}>{getOrdinal(index + 1)} Child</Col>
                </Row>
                <Row gutter={24} className="my-2">
                  <Col span={12}>Name</Col>
                  <Col span={12}>{child.name}</Col>
                </Row>
                <Row gutter={24} className="my-2">
                  <Col span={12}>Place of Birth</Col>
                  <Col span={12}>{child.placeOfBirth}</Col>
                </Row>
                <Row gutter={24} className="my-2">
                  <Col span={12}>Date of Birth</Col>
                  <Col span={12}>{child.dateOfBirth}</Col>
                </Row>
              </React.Fragment>
            ))}
          </div>
        </Col>
      </Row>

      <Row gutter={24} className="mt-4">
        <Col span={16}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7`}>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={12}>
                <Row gutter={24} className="mb-2 mt-4">
                  <Col span={24} className="text-center">
                    <p className="font-bold">WORKER INSURANCE</p>
                  </Col>
                </Row>
                <div className="text-center flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/150x80"
                    alt="Placeholder"
                    width={150}
                    height={80}
                  />
                </div>
                <Row className="mb-2 mt-4">
                  <Col span={24} className="text-center">
                    <p>PT Dua Puluh Tiga</p>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={24} className="mb-2 mt-4">
                  <Col span={24} className="text-center">
                    <p className="font-bold">PERSONAL INSURANCE</p>
                  </Col>
                </Row>
                <div className="text-center flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/150x80"
                    alt="Placeholder"
                    width={150}
                    height={80}
                  />
                </div>
                <Row className="mb-2 mt-4">
                  <Col span={24} className="text-center">
                    <p>PT Dua Puluh Tiga</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>

        <Col span={8}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7`}>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <Row gutter={24} className="mb-2 mt-4">
                  <Col span={24} className="text-center">
                    <p className="font-bold">TAX NUMBER</p>
                  </Col>
                </Row>
                <div className="text-center flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/150x80"
                    alt="Placeholder"
                    width={150}
                    height={80}
                  />
                </div>
                <Row className="mb-2 mt-4">
                  <Col span={24} className="text-center">
                    <p>PT Dua Puluh Tiga</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row gutter={24} className="mt-4">
        <Col span={24}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7`}>
            <Row gutter={24} className="my-2">
              <Col span={24}>
                <p className="font-bold">Education Data</p>
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Last Education</Col>
              <Col span={12}>
                {employee.personal_data.education_history.institution_name}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Institution</Col>
              <Col span={12}>
                {employee.personal_data.education_history.last_education}
              </Col>
            </Row>
            <Row gutter={24} className="my-2">
              <Col span={12}>Major</Col>
              <Col span={12}>
                {employee.personal_data.education_history.major}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row gutter={24} className="mt-4">
        <Col span={8}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7`}>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24} className="text-center">
                <p className="font-bold">Verklaring</p>
              </Col>
            </Row>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <div className="text-center flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/150x80"
                    alt="Placeholder"
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
          </div>
        </Col>
        <Col span={8}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7`}>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24} className="text-center">
                <p className="font-bold">Transcript</p>
              </Col>
            </Row>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <div className="text-center flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/150x80"
                    alt="Placeholder"
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
          </div>
        </Col>
        <Col span={8}>
          <div className={`bg-white rounded-lg justify-center py-4 px-7`}>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24} className="text-center">
                <p className="font-bold">Education Certificate</p>
              </Col>
            </Row>
            <Row gutter={24} className="mb-2 mt-4">
              <Col span={24}>
                <div className="text-center flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/150x80"
                    alt="Placeholder"
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
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default PersonalDataSection;
