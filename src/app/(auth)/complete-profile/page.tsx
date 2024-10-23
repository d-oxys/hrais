"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { Steps } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useRef, useState } from "react";
import FormEmployeeData from "@root/app/components/FormEmployeeData";
import FormAddressIdentityCard from "@root/app/components/FormAddressIdentityCard";
import { getEmployeeByNIP } from "@root/libs/store/thunk/employee";
import { useAppDispatch, useAppSelector } from "@root/libs/store";
import { EmployeeData } from "@root/libs/types/employee";
import FormDriverLicense from "@root/app/components/FormDriverLicense";
import FormFamilyData from "@root/app/components/FormFamilyData";
import { getSession } from "next-auth/react";

const Page = () => {
  const [form] = useForm();
  const formRef = useRef<any>();
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState<number>(0);

  const { employee }: { employee: any } = useAppSelector(
    (state) => state.employee
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const session: any = await getSession();
      dispatch(getEmployeeByNIP(session.user.user.nip));
    };

    fetchUserData();
  }, [dispatch]);

  const handleSubmit = () => {
    formRef?.current?.submit();
  };

  const onFinsih = (values: any) => {};

  return (
    <div className={`${styles.page} flex`}>
      <div className="w-[80%] h-[90%] m-auto flex gap-7 ">
        <div className="flex flex-col gap-7">
          <div className="bg-white rounded-xl py-4 px-14">
            <Image
              src="/assets/images/23-logo.png"
              width={214}
              height={99}
              alt="23 Logo"
            />
          </div>

          <div className="bg-white rounded-xl py-6 px-14 max-h-[90%] overflow-y-auto">
            <div className="font-bold mb-7">Complete Profile</div>
            <div>
              <Steps
                direction="vertical"
                size="small"
                current={currentStep}
                items={[
                  {
                    title: 1,
                    description: (
                      <span>
                        Employee Data <br />
                        Job Role
                      </span>
                    ),
                  },
                  {
                    title: 2,
                    description: (
                      <span>
                        Address <br />
                        Identity Card <br />
                        Personal Data <br />
                      </span>
                    ),
                  },
                  {
                    title: 3,
                    description: (
                      <span>
                        Family Data <br />
                        Contact <br />
                        Bank
                      </span>
                    ),
                  },
                  {
                    title: 4,
                    description: (
                      <span>
                        Driver License <br />
                        Family Card <br />
                        Tax Number <br />
                        Insurance <br />
                        Education History <br />
                        Others
                      </span>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
        {currentStep === 0 && (
          <FormEmployeeData
            data={employee}
            onNext={() => {
              setCurrentStep(currentStep + 1);
            }}
          />
        )}

        {currentStep === 1 && (
          <FormAddressIdentityCard
            data={employee}
            onNext={() => {
              setCurrentStep(currentStep + 1);
            }}
            onBack={() => {
              setCurrentStep(currentStep - 1);
            }}
          />
        )}

        {currentStep === 2 && (
          <FormFamilyData
            data={employee}
            onNext={() => {
              setCurrentStep(currentStep + 1);
            }}
            onBack={() => {
              setCurrentStep(currentStep - 1);
            }}
          />
        )}

        {currentStep === 3 && (
          <FormDriverLicense
            data={employee}
            onBack={() => {
              setCurrentStep(currentStep - 1);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Page;
