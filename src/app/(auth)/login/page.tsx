"use client";
import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { message } from "antd";

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div
      onClick={toggleSwitch}
      className={`${
        isOn ? "bg-gray-800" : "bg-gray-300"
      } relative w-14 h-7 md:w-12 md:h-6 sm:w-10 sm:h-5 rounded-full cursor-pointer transition-colors duration-300`}
    >
      <div
        className={`absolute top-1 left-1 w-5 h-5 md:w-4 md:h-4 sm:w-3 sm:h-3 bg-white rounded-full transform transition-transform duration-300 ${
          isOn
            ? "translate-x-7 md:translate-x-6 sm:translate-x-5"
            : "translate-x-0"
        }`}
      />
    </div>
  );
};

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  icon: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  icon,
  onChange,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div className="mb-8 md:mb-6 sm:mb-4">
      <label className="block text-base md:text-sm sm:text-xs font-medium text-gray-700 mb-3 md:mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <img
            src={icon}
            alt=""
            className="w-6 h-6 md:w-5 md:h-5 sm:w-4 sm:h-4 opacity-60"
          />
        </div>
        <input
          type={isPasswordField && showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full h-14 md:h-12 sm:h-10 pl-14 md:pl-12 sm:pl-10 pr-14 md:pr-12 sm:pr-10 text-xxl md:text-lg sm:text-base rounded-lg border border-gray-200 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition-all duration-200 outline-none flex-grow focus:outline-none text-xl"
          onChange={onChange}
          value={value}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <EyeOutlined className="w-6 h-6 md:w-5 md:h-5 sm:w-4 sm:h-4" />
            ) : (
              <EyeInvisibleOutlined className="w-6 h-6 md:w-5 md:h-5 sm:w-4 sm:h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      nip,
      password,
    });

    if (result?.error) {
      console.log(result?.error);
      message.error("Invalid NIP or Password");
    } else {
      router.push("/product/product-performance");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-customGradient">
      <div className="max-h-screen flex items-center justify-center p-20 xl:p-16 lg:p-12 md:p-8 sm:p-4">
        {/* Main Container */}
        <div className="w-full max-w-7xl overflow-hidden flex flex-row md:flex-col min-h-screen">
          {/* Logo Section */}
          <div className="w-1/2 md:w-full sm:w-min flex items-center justify-center p-20 xl:p-16 lg:p-12 md:p-8 sm:p-6">
            <div className="max-w-md w-min-screen">
              <img
                src="/assets/images/23-Emacs-Logo.png"
                alt="eMacs Online Logo"
                className="w-full md:w-36 sm:w-32 h-auto sm:h-8"
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="w-1/2 md:w-full p-20 xl:p-16 lg:p-12 md:p-8 sm:p-6 flex items-center justify-center">
            <div className="max-w-lg w-full mx-auto">
              <form className="space-y-8 md:space-y-6" onSubmit={handleSubmit}>
                <InputField
                  label="Username"
                  type="text"
                  placeholder="Enter your username"
                  icon="/assets/icons/profile.png"
                  onChange={(e) => setNip(e.target.value)}
                  value={nip}
                />

                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  icon="/assets/icons/key.png"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ToggleSwitch />
                    <span className="text-lg md:text-base sm:text-sm text-gray-600">
                      Remember me
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-lg md:text-base sm:text-sm font-medium text-[#2F5EC8] transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full h-14 md:h-12 sm:h-10 bg-gray-800 text-white text-lg md:text-base sm:text-sm rounded-lg hover:bg-gray-700 transition-colors duration-300 font-medium"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
