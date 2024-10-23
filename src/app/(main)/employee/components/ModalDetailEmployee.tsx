"use client";
import DropdownStatus from "@root/app/components/DropdownStatus";
import BankIcon from "@root/app/components/icons/bank";
import BankBloodIcon from "@root/app/components/icons/bank-blood";
import CalendarIcon from "@root/app/components/icons/calendar";
import CardIcon from "@root/app/components/icons/card";
import Education from "@root/app/components/icons/education";
import EmergencyPhoneIcon from "@root/app/components/icons/emergency-phone";
import FaithIcon from "@root/app/components/icons/faith";
import GenderIcon from "@root/app/components/icons/gender";
import HomeIcon from "@root/app/components/icons/home";
import IdCardIcon from "@root/app/components/icons/id-card";
import IdentityCard from "@root/app/components/icons/identity-card";
import PhoneIcon from "@root/app/components/icons/phone";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { getEmployeeByNIP } from "@root/libs/store/thunk/employee";
import { EmployeeDataFull } from "@root/libs/types/employee";
import { formatDate } from "@root/libs/utils/dateUtils";
import { Avatar, Button, Modal, ModalProps } from "antd";
import { useEffect } from "react";

interface ModalDetailEmployeeProps extends ModalProps {
  employeeData: any;
}

const ModalDetailEmployee = (props: ModalDetailEmployeeProps) => {
  const dispatch = useAppDispatch();
  const { employee }: { employee: EmployeeDataFull } = useAppSelector(
    (state) => state.employee
  );

  useEffect(() => {
    if (props?.employeeData?.user?.nip) {
      dispatch(getEmployeeByNIP(props?.employeeData?.user?.nip));
    }
  }, [dispatch, props?.employeeData?.user?.nip]);

  return (
    <Modal title="Employee Detail" {...props} width={960} footer={null}>
      <div className="bg-[#1572A1] flex justify-between items-center rounded-t-xl p-4 w-auto mx-1">
        <div className="text-white">
          <p>
            {props?.employeeData?.user?.nip ?? "-"} -{" "}
            {props?.employeeData?.user?.name ?? "-"}
          </p>
          <p className="font-bold">{props?.employeeData?.user?.email ?? "-"}</p>
          <div className="ml-4 mt-6">
            <p>{props?.employeeData?.position?.name ?? "-"}</p>
            <p className="font-bold">{employee.division.name ?? "-"}</p>
            <p>
              {props?.employeeData?.position?.team?.section?.department?.name ??
                "-"}{" "}
              | {props?.employeeData?.position?.team?.section?.name ?? "-"}
            </p>
            <p>{props?.employeeData?.level?.specialist ?? "-"}</p>
            <p>{employee.personal_data.address.addressKTP ?? "-"}</p>
          </div>
        </div>
        <div className="px-5">
          <Avatar size={150} />
        </div>
      </div>
      <div className="flex rounded-b-xl p-8 w-auto mx-1 border border-[#00000040]">
        <div className="w-1/2">
          <table cellPadding={1}>
            <tr>
              <td className="flex">
                <IdentityCard /> <span className="mx-2">KTP Number</span>
              </td>
              <td>:</td>
              <td>{employee.personal_data.ktp ?? "-"}</td>
            </tr>
            {/* <tr>
              <td className="flex">
                <HomeIcon /> <span className="mx-2">KTP Address</span>
              </td>
              <td>:</td>
              <td>{`${employee.personal_data.address.addressKTP ?? "-"}`}</td>
            </tr> */}
            <tr>
              <td className="flex">
                <CardIcon /> <span className="mx-2">NPWP Number</span>
              </td>
              <td>:</td>
              <td>{employee.personal_data.npwp ?? "-"}</td>
            </tr>
            <tr>
              <td className="flex">
                <GenderIcon /> <span className="mx-2">Gender</span>
              </td>
              <td>:</td>
              <td>{employee.personal_data.gender ?? "-"}</td>
            </tr>
            <tr>
              <td className="flex">
                <CalendarIcon /> <span className="mx-2">Born</span>
              </td>
              <td>:</td>
              <td>
                {employee.personal_data.birth.place_of_birth ?? "-"},{" "}
                {employee.personal_data.birth.date_of_birth ?? "-"}
              </td>
            </tr>
            <tr>
              <td className="flex">
                <FaithIcon /> <span className="mx-2">Religion</span>
              </td>
              <td>:</td>
              <td>{employee.personal_data.religion ?? "-"}</td>
            </tr>
          </table>
        </div>
        <div className="w-1/2">
          <table cellPadding={1}>
            <tr>
              <td className="flex">
                <BankBloodIcon /> <span className="mx-2">Blood Type</span>
              </td>
              <td>:</td>
              <td>{employee.personal_data.blood_type ?? "-"}</td>
            </tr>
            <tr>
              <td className="flex">
                <Education /> <span className="mx-2">Education</span>
              </td>
              <td>:</td>
              <td>
                {employee.personal_data.education_history.last_education ?? "-"}
              </td>
            </tr>
            <tr>
              <td className="flex">
                <PhoneIcon /> <span className="mx-2">Phone Number</span>
              </td>
              <td>:</td>
              <td>{props?.employeeData?.user?.phone ?? "-"}</td>
            </tr>
            <tr>
              <td className="flex">
                <EmergencyPhoneIcon />{" "}
                <span className="mx-2">Emergency Number</span>
              </td>
              <td>:</td>
              <td>{employee.contact_data.emergency_number ?? "-"}</td>
            </tr>
            <tr>
              <td className="flex">
                <BankIcon /> <span className="mx-2">Bank</span>
              </td>
              <td>:</td>
              <td>{employee.bank.bank_name ?? "-"}</td>
            </tr>
            <tr>
              <td className="flex">
                <IdCardIcon /> <span className="mx-2">Bank Number</span>
              </td>
              <td>:</td>
              <td>{employee.bank.bank_account_number ?? "-"}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="my-2">
        <table cellPadding={3}>
          <tr>
            <td className="font-bold">Contract Status</td>
            <td>:</td>
            <td>{employee.personal_data.statusKaryawan ?? "-"}</td>
          </tr>
          <tr>
            <td className="font-bold">Contract Date</td>
            <td>:</td>
            <td>
              {formatDate(
                employee.personal_data.date_contract.start_date ?? "-"
              )}{" "}
              -{" "}
              {formatDate(employee.personal_data.date_contract.end_date ?? "-")}
            </td>
          </tr>
        </table>
      </div>
      <div className="flex justify-between">
        <div>
          <Button className="bg-primary rounded-full text-white">
            Open Profile
          </Button>
          <Button className="rounded-full ml-3">Edit</Button>
        </div>
        <div>
          <DropdownStatus
            initialValue={employee.personal_data.status}
            id={employee.employee.id}
          />
        </div>
      </div>
    </Modal>
  );
};
export default ModalDetailEmployee;
