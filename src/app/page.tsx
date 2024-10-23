"use client";
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  message,
} from "antd";
import styles from "./page.module.scss";
import Image from "next/image";
import FloatInput from "./components/floatinput";
import PeopleIcon from "./components/icons/people";
import LockIcon from "./components/icons/lock";
import Link from "next/link";
import { useRef, useState } from "react";
import EmailSentIcon from "./components/icons/email-sent";
import CheckIcon from "./components/icons/check";
import { Login as LoginType } from "@root/libs/types/login";
import { login } from "@root/libs/store/thunk/auth";
import { useRouter } from "next/navigation";
import { setUser } from "@root/libs/store/slices/auth.slice";
import { useAppDispatch } from "@root/libs/store";
import { setUserData } from "@root/libs/utils/cookieUtils";
import { signIn } from "next-auth/react";

const Login = () => {
  const formRef = useRef<any>();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const route = useRouter();

  const [formState, setFormState] = useState<string>("login");
  const [showModalEmailResetSent, setShowModalEmailResetSent] =
    useState<boolean>(false);
  const [showModalEmailResetFinish, setShowModalEmailResetFinish] =
    useState<boolean>(false);
  const [hasError, setHasError] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    formRef?.current?.submit();
  };

  const onFinish = async (values: LoginType) => {
    if (formState === "login") {
      setLoading(true);
      const result = await signIn("credentials", {
        nip: values.nip,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        message.error("Invalid NIP or Password");
      } else {
        route.push("/home");
      }
      setLoading(false);
    }

    if (formState === "reset password") {
      setShowModalEmailResetSent(true);
    }

    if (formState === "confirm password") {
      setShowModalEmailResetFinish(true);
    }
  };

  const onFieldsChange = () => {
    setHasError(form.getFieldsError());
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins",
          colorText: "#5C6880",
        },
      }}
    >
      <div className={`${styles.loginpage} flex`}>
        <div className="w-1/2 flex">
          <div className="m-auto">
            <Image
              src="/assets/images/background-login-2.png"
              width={500}
              height={500}
              alt="Background Login 2"
            />
          </div>
        </div>
        <div className="h-full lg:w-1/2 m-auto flex items-center justify-center">
          <div className="bg-white lg:w-[70%] w-full w-full h-[80%] rounded-xl p-16">
            <div className={styles.logo}>
              <Image
                src="/assets/images/23-logo.png"
                width={214}
                height={99}
                alt="23 Logo"
              />
            </div>
            <div className="flex flex-col h-[85%]">
              <Form
                ref={formRef}
                form={form}
                name="loginForm"
                autoComplete="off"
                initialValues={{ remember: true }}
                className="mt-6"
                onFinish={onFinish}
                onFieldsChange={onFieldsChange}
              >
                <div className="grow">
                  {formState === "login" && (
                    <>
                      <Form.Item
                        name="nip"
                        rules={[
                          { required: true, message: "Please input your nip" },
                        ]}
                        style={{ marginBottom: 40 }}
                        hasFeedback={
                          hasError.some(
                            (err: any) =>
                              err.name[0] === "nip" && err.errors.length > 0
                          ) || error
                        }
                      >
                        <FloatInput
                          label={
                            <Flex align="center">
                              <PeopleIcon />{" "}
                              <span style={{ marginLeft: "10px" }}>NIP</span>
                            </Flex>
                          }
                          type="text"
                          required={false}
                          value=""
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username",
                          },
                        ]}
                        style={{ marginBottom: 40 }}
                        hasFeedback={
                          hasError.some(
                            (err: any) =>
                              err.name[0] === "password" &&
                              err.errors.length > 0
                          ) || error
                        }
                      >
                        <FloatInput
                          label={
                            <Flex align="center">
                              <LockIcon />{" "}
                              <span style={{ marginLeft: "10px" }}>
                                Password
                              </span>
                            </Flex>
                          }
                          type="password"
                          required={false}
                          value=""
                        />
                      </Form.Item>

                      {error && (
                        <div style={{ color: "red", marginBottom: 20 }}>
                          {error}
                        </div>
                      )}

                      <Flex justify="space-between">
                        <div>
                          <Checkbox>Keep me logged in</Checkbox>
                        </div>
                        <div>
                          <Link
                            href="#"
                            className="text-primary"
                            onClick={() => setFormState("reset password")}
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </Flex>
                    </>
                  )}

                  {formState === "reset password" && (
                    <>
                      <div className="text-center mb-8">
                        Enter your email address below. You will receive a link
                        to reset your password.
                      </div>

                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email",
                          },
                        ]}
                        style={{ marginBottom: 40 }}
                        hasFeedback={hasError}
                      >
                        <FloatInput
                          label={
                            <Flex align="center">
                              <PeopleIcon />{" "}
                              <span style={{ marginLeft: "10px" }}>Email</span>
                            </Flex>
                          }
                          type="text"
                          required={false}
                          value=""
                        />
                      </Form.Item>
                    </>
                  )}

                  {formState === "confirm password" && (
                    <>
                      <div className="text-center mb-8">
                        Enter your email address below. You will receive a link
                        to reset your password.
                      </div>

                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your new password",
                          },
                        ]}
                        style={{ marginBottom: 40 }}
                      >
                        <FloatInput
                          label={
                            <Flex align="center">
                              <span style={{ marginLeft: "10px" }}>
                                New Password
                              </span>
                            </Flex>
                          }
                          type="text"
                          required={false}
                          value=""
                        />
                      </Form.Item>

                      <Form.Item
                        name="password_confirmation"
                        rules={[
                          {
                            required: true,
                            message: "Please repeat your new password",
                          },
                        ]}
                        style={{ marginBottom: 40 }}
                      >
                        <FloatInput
                          label={
                            <Flex align="center">
                              <span style={{ marginLeft: "10px" }}>
                                Re-enter Password
                              </span>
                            </Flex>
                          }
                          type="text"
                          required={false}
                          value=""
                        />
                      </Form.Item>
                    </>
                  )}
                </div>
              </Form>
              <div className="mt-auto text-center">
                {formState === "reset password" && (
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full"
                      onClick={handleSubmit}
                    >
                      Confirm
                    </Button>
                    <div
                      className="mt-2 cursor-pointer text-primary"
                      onClick={() => setFormState("login")}
                    >
                      Back to Login
                    </div>
                  </div>
                )}

                {formState === "login" && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    Log in
                  </Button>
                )}

                {formState === "confirm password" && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    onClick={handleSubmit}
                  >
                    Reset Password
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={showModalEmailResetSent}
          onOk={() => setShowModalEmailResetSent(false)}
          className="flex justify-center items-center rounded-xl"
          closeIcon={false}
          footer={[
            <div className="w-full text-center mt-6" key="ok">
              <Button
                type="primary"
                onClick={() => {
                  setShowModalEmailResetSent(false);
                  setFormState("confirm password");
                }}
              >
                Ok
              </Button>
            </div>,
          ]}
        >
          <div className="text-center p-5 w-full justify-center flex w-[300px]">
            <EmailSentIcon />
          </div>
          <div className="w-full text-center">
            Link has been sent to your <br />
            email address.
          </div>
        </Modal>

        <Modal
          open={showModalEmailResetFinish}
          onOk={() => setShowModalEmailResetFinish(false)}
          className="flex justify-center items-center rounded-xl"
          closeIcon={false}
          footer={[
            <div className="w-full text-center mt-6" key="ok">
              <Button
                type="primary"
                onClick={() => {
                  setShowModalEmailResetFinish(false);
                  setFormState("login");
                }}
              >
                Ok
              </Button>
            </div>,
          ]}
        >
          <div className="text-center p-5 w-full justify-center flex w-[300px]">
            <CheckIcon />
          </div>
          <div className="w-full text-center">
            The password has been reset
            <br />
            successfully.
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};
export default Login;
