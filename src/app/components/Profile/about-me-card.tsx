import { useEffect } from "react";
import EditIcon from "../icons/edit";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { EmployeeDataFull } from "@root/libs/types/employee";

interface AboutMeCardProps {
  className: string;
  user_id: string;
}

const AboutMeCard = (props: AboutMeCardProps) => {
  const { employee }: { employee: EmployeeDataFull } = useAppSelector(
    (state) => state.employee
  );

  return (
    <div className={`bg-white rounded-lg justify-center ${props.className}`}>
      <div className="flex justify-between">
        <p className="font-bold">About me</p>
        <EditIcon />
      </div>

      <div className="p-3">
        <div className="border-b mt-4 pb-3">
          <p className="font-bold">Born</p>
          <div className="flex justify-between">
            <p>
              {employee.personal_data.birth.place_of_birth},{" "}
              {employee.personal_data.birth.date_of_birth}
            </p>
            <p>22 Years</p>
          </div>
        </div>

        <div className="border-b mt-4 pb-3">
          <p className="font-bold">Contact</p>
          <div className="flex my-1 justify-between">
            <p>Personal</p>
            <p>{employee.employee.phoneNumber}</p>
          </div>
          <div className="flex my-1 justify-between">
            <p>Home</p>
            <p>null</p>
          </div>
          <div className="flex my-1 justify-between">
            <p>Emergency</p>
          </div>
          <div className="pl-4">
            <div className="flex my-1 justify-between">
              <p>Contact Number</p>
              <p>{employee.contact_data.emergency_number}</p>
            </div>
            <div className="flex my-1 justify-between">
              <p>Contact Name</p>
              <p>{employee.contact_data.emergency_name}</p>
            </div>
            <div className="flex my-1 justify-between">
              <p>Relationship</p>
              <p>{employee.contact_data.emergency_relationship}</p>
            </div>
          </div>
        </div>

        <div className="border-b mt-4 pb-3">
          <p className="font-bold">Email</p>
          <div className="flex my-1 justify-between">
            <p>Personal</p>
            <p>{employee.employee.emailPribadi}</p>
          </div>
          <div className="flex my-1 justify-between">
            <p>Office</p>
            <p>{employee.employee.emailKantor}</p>
          </div>
        </div>

        <div className="mt-4 pb-3">
          <p className="font-bold">Other Information</p>
          <div className="flex my-1 justify-between">
            <p>Identity Number (NIK)</p>
            <p>{employee.personal_data.ktp}</p>
          </div>
          <div className="flex my-1 justify-between">
            <p>Family Number (KK)</p>
            <p>{employee.personal_data.noKK}</p>
          </div>
          <div className="flex my-1 justify-between">
            <p>Tax Number (NPWP)</p>
            <p>{employee.personal_data.npwp}</p>
          </div>
          <div className="flex my-1 justify-between">
            <p>Driving License Number (SIM)</p>
            <p>{employee.personal_data.sim_card.number_sim_1}</p>
          </div>
          <div className="flex my-1 justify-between">
            <p>BPJS Kesehatan</p>
            <p>{employee.personal_data.noBPJS}</p>
          </div>
          <div className="flex my-1 justify-between">
            <p>BPJS Ketenagakerjaan</p>
            <p>{employee.personal_data.noBPJSK}</p>
          </div>
          <div className="flex my-1 justify-between">
            <p>Bank</p>
            <p>{employee.bank.bank_name}</p>
          </div>
          <div className="flex my-1 justify-between">
            <p>Account Number</p>
            <p>{employee.bank.bank_account_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutMeCard;
