"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import AlertErrorIcon from "../../components/icons/alert-error";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useRef, useState } from "react";
import { UserState } from "@root/libs/store/slices/auth.slice";
import { verifyEmail } from "@root/libs/store/thunk/auth";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@root/libs/store";
import { setLoading } from "@root/libs/store/slices/auth.slice";

const Page = () => {
  const [form] = useForm();
  const formRef = useRef<any>();
  const route = useRouter();
  const dispatch = useAppDispatch();

  const userData: UserState = useAppSelector((state) => state.auth);
  const loading = useAppSelector((state) => state.auth.loading);

  const [goToOTP, setGoToOTP] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldValue("email", userData?.user?.email);
  }, [userData]);

  const handleSubmit = () => {
    formRef?.current?.submit();
  };

  const onFinish = async (values: any) => {
    const data = {
      email: values.email,
      password: values.new_password,
      confirm_new_password: values.password_verification,
    };
    dispatch(setLoading(true));
    try {
      await verifyEmail(data);
      message.success("Email verified successfully");
      route.push("/verifikasi-email");
    } catch (error) {
      message.error("Error verifying email");
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
        <div className="text-xl">Verifikasi Profil</div>
        <div className="text-negative flex gap-2 text-sm mt-1">
          <AlertErrorIcon />{" "}
          <span>Please verify your profile and reset your password</span>
        </div>

        <div className="grow">
          <Form
            form={form}
            name="verifikasiProfil"
            layout="vertical"
            className="mt-5"
            ref={formRef}
            onFinish={onFinish}
          >
            <Form.Item name="email" label="Email" className="font-bold">
              <Input type="text" />
            </Form.Item>

            <Form.Item
              name="new_password"
              label="Password Baru"
              className="font-bold"
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item
              name="password_verification"
              label="Verifikasi Password"
              className="font-bold"
            >
              <Input type="password" />
            </Form.Item>
          </Form>
        </div>
        <div className="mt-auto">
          <Button
            type="primary"
            htmlType="button"
            onClick={() => handleSubmit()}
            className="w-full mt-7"
            loading={loading}
          >
            Verify Email
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Page;
