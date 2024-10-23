"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import AlertErrorIcon from "../../components/icons/alert-error";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { confirmOTPEmail } from "@root/libs/store/thunk/auth";
import { UserState } from "@root/libs/store/slices/auth.slice";
import { setUserData } from "@root/libs/utils/cookieUtils";
import { useAppSelector, useAppDispatch } from "@root/libs/store";
import { setLoading } from "@root/libs/store/slices/auth.slice";

const Page = () => {
  const [form] = useForm();
  const formRef = useRef<any>();
  const route = useRouter();
  const dispatch = useAppDispatch();

  const userData: UserState = useAppSelector((state) => state.auth);
  const loading = useAppSelector((state) => state.auth.loading);

  const handleSubmit = () => {
    formRef?.current?.submit();
  };

  const onFinish = async (values: any) => {
    const data = {
      otp: values.otp,
      token: userData?.user?.token,
    };
    dispatch(setLoading(true));
    try {
      const resp = await confirmOTPEmail(data);
      if (resp.data) {
        setUserData({
          ...resp.data.data?.user,
          token: resp.data.data?.token,
        });
        message.success("OTP email confirmed successfully");
        route.push("/document-preparation");
      }
    } catch (error) {
      message.error("Error confirming OTP email");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={`${styles.page} flex`}>
      <div className="bg-white h-[90%] w-[70%] m-auto rounded-2xl p-16 flex flex-col">
        <div>
          <Image
            src="/assets/images/23-logo.png"
            width={214}
            height={99}
            alt="23 Logo"
          />
        </div>
        <div className="border-4 border-primary rounded my-6"></div>
        <div className="text-xl">
          Enter The 6-Digit OTP Code Sent to Your Email
        </div>
        <div className="text-negative flex gap-2 text-sm mt-1">
          <AlertErrorIcon />{" "}
          <span>
            OTP code sent to{" "}
            <span className="font-bold underline">{userData?.user?.email}</span>
          </span>
        </div>

        <div className="grow">
          <Form
            name="verifikasiProfil"
            layout="vertical"
            className="mt-5"
            ref={formRef}
            onFinish={onFinish}
          >
            <Form.Item
              name="otp"
              label="Enter 6-digit OTP"
              className="font-bold"
            >
              <Input.OTP />
            </Form.Item>
          </Form>
        </div>
        <div className="mt-auto">
          <Link href="#" className="text-primary underline text-sm">
            Resend Code
          </Link>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => handleSubmit()}
            className="w-full mt-2"
            loading={loading}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Page;
