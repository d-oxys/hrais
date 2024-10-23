"use client";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../store";
import { getUserRole } from "../store/thunk/role";
import LoadingComponent from "@root/app/components/Loading";
import Cookies from "js-cookie";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const { userRoles }: any = useAppSelector((state) => state.role);

  useEffect(() => {
    if (status === "loading") {
      setIsChecking(true);
      return;
    }
    if (!session) {
      // router.push("/");
    } else {
      dispatch(getUserRole());
      setIsChecking(false);
    }
  }, [session, status, router, dispatch]);

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(userRoles));
  }, [userRoles]);

  if (isChecking) {
    return <LoadingComponent />;
  }

  return <>{children}</>;
};

export default AuthProvider;
