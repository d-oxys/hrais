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
    </ConfigProvider>
  );
};
export default Login;
