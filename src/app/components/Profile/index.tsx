import { Avatar, Button, Col, Row } from "antd";
import SuitcaseIcon from "../icons/suitcase";
import styles from "./profile.module.scss";
import { useEffect, useState } from "react";
import AboutMeCard from "./about-me-card";
import EmployeeDataSection from "./employee-data-section";
import OverviewSection from "./overview-section";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { getEmployeeByNIP } from "@root/libs/store/thunk/employee";
import { EmployeeDataFull } from "@root/libs/types/employee";
import PersonalDataSection from "./personal-data-section";
import AddressDataSection from "./address-data-section";
import PermissionDataSection from "./permission-data-section";
import ClaimsDataSection from "./claim-data-section";

interface ProfileComponentProps {
  user_id: string;
}

const ProfileComponent = (props: ProfileComponentProps) => {
  const [activeMenu, setActiveMenu] = useState<string>("overview");
  const dispatch = useAppDispatch();

  const { employee }: { employee: EmployeeDataFull } = useAppSelector(
    (state) => state.employee
  );

  console.log("employee data: ", employee);

  useEffect(() => {
    dispatch(getEmployeeByNIP(props.user_id));
  }, []);

  const menus = [
    {
      key: "overview",
      label: "Overview",
      section: <OverviewSection />,
    },
    {
      key: "employee-data",
      label: "Employee Data",
      section: <EmployeeDataSection user_id={props.user_id} />,
    },
    {
      key: "personal-data",
      label: "Personal Data",
      section: <PersonalDataSection user_id={props.user_id} />,
    },
    {
      key: "address-data",
      label: "Address Data",
      section: <AddressDataSection user_id={props.user_id} />,
    },
    {
      key: "permissions",
      label: "Permissions",
      section: <PermissionDataSection user_id={props.user_id} />,
    },
    {
      key: "claims",
      label: "Claims",
      section: <ClaimsDataSection user_id={props.user_id} />,
    },
    {
      key: "certificate",
      label: "Certificate",
      section: "",
    },
  ];

  return (
    <div>
      <Row gutter={24}>
        <Col span={8}>
          <div className="bg-white rounded-lg justify-center gap-3">
            <div className="flex justify-center items-center py-6">
              <Avatar size={150} />
            </div>
            <div className="font-bold w-full text-center m-2">
              {employee?.employee?.name}
            </div>
            <div className="text-xs w-full text-center m-2">
              {employee?.jobrole?.name}
            </div>
            <div className="text-xs w-full text-center flex gap-1 justify-center m-2">
              <SuitcaseIcon />{" "}
              <span>
                {employee?.division?.name} - {employee?.department?.name}
              </span>
            </div>
            <div className="text-xs w-full text-center m-2">
              <Button className="text-xs m-2">My Team</Button>
              <Button className="text-xs" type="primary">
                Edit Profile
              </Button>
            </div>
          </div>

          <AboutMeCard className="my-4 p-4" user_id={props.user_id} />
        </Col>
        <Col span={16}>
          <div className="w-full rounded-xl bg-white">
            <div
              className={`${styles["header-background"]} w-full h-[200px] rounded-xl`}
            ></div>
            <div className="px-6 flex gap-3">
              {menus.map((menu) => (
                <div
                  key={menu.key}
                  className={`px-2 py-4 cursor-pointer font-bold ${activeMenu === menu.key && "border-b-primary border-b-4"}`}
                  onClick={() => setActiveMenu(menu.key)}
                >
                  {menu.label}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            {menus.map((menu) => menu.key === activeMenu && menu.section)}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ProfileComponent;
