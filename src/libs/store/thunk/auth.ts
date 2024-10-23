import { Http } from "@root/libs/http";
import { Login } from "@root/libs/types/login";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const http = new Http();

export const login = async (data: Login) => {
  console.log("thunk: ", data);
  return await axios.post(`${API_URL}/api/v1/login`, data);
};

export const verifyEmail = async (data: any) => {
  console.log("Data yang dikirim:", data);

  return await http.post("/api/v1/verify-email", data, {
    onError: (error) => {
      console.error("Error verifying email:", error);
      console.log("Response data:", error.response?.data);
    },
    onSuccess: (response) => {
      console.log("Email verified successfully:", response);
    },
  });
};

export const confirmOTPEmail = async (data: any) => {
  console.log("Data yang dikirim:", data);

  return await http.post("/api/v1/verify-otp-email", data, {
    onError: (error) => {
      console.error("Error confirming OTP email:", error);
      console.log("Response data:", error.response?.data);
    },
    onSuccess: (response) => {
      console.log("OTP email confirmed successfully:", response);
    },
  });
};
