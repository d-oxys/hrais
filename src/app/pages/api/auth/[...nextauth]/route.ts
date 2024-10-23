import NextAuth from "next-auth";
import { authOptions } from "@root/libs/utils/auth";

const handler = NextAuth(authOptions);
console.log("next auth pages di panggil");

export { handler as GET, handler as POST };
