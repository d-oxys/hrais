// cookieUtils.ts
import Cookies from "js-cookie";
import { User } from "../types/user";

// Menyimpan data pengguna dalam cookie
export const setUserData = (userData: User, expiration = 1440): void => {
  Cookies.set("user_data", JSON.stringify(userData), {
    expires: expiration / (60 * 24),
  });
};

// Mendapatkan data pengguna dari cookie
export const getUserData = (): User | null => {
  const userData = Cookies.get("user_data");
  return userData ? (JSON.parse(userData) as User) : null;
};
