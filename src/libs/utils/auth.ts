import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import https from "https";
import { login } from "../store/thunk/auth";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const authOptions: NextAuthOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        nip: { label: "NIP", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { nip, password } = credentials as {
          nip: string;
          password: string;
        };
        console.log("Authorize function called");
        try {
          const resp = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`,
            {
              nip: nip,
              password: password,
            },
            { httpsAgent: agent }
          );
          // console.log("Login Response:", resp);
          if (resp.data && resp.data.meta.status === "success") {
            const userData = resp.data.result.data;
            const token = resp.data.meta.message.token;
            const accessToken = resp.data.meta.message.AccessToken;
            // console.log("User Data:", userData);
            // console.log("Token:", token);
            // console.log("AccessToken:", accessToken);
            return {
              ...userData,
              token: token,
              accessToken: accessToken,
            };
          } else {
            console.log("Login Response:", resp);
            return null;
          }
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      const userData = token.user as any;
      session.user = userData;
      return {
        ...session,
        accessToken: userData.token,
      };
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
};
// export const authOptions: NextAuthOptions = {
//   debug: true,
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     Credentials({
//       credentials: {
//         nip: { label: "NIP", type: "string" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { nip, password } = credentials as {
//           nip: string;
//           password: string;
//         };
//         console.log("Authorize function called");
//         try {
//           const resp = await axios.post(
//             "https://7745-119-235-218-162.ngrok-free.app/api/v1/login",
//             {
//               nip: nip,
//               password: password,
//             }
//           );
//           console.log("Login Response:", resp);
//           if (resp.data && resp.data.status === "success") {
//             const userData = resp.data.data.user;
//             const token = resp.data.data.token;
//             console.log("User Data:", userData);
//             console.log("Token:", token);
//             return {
//               ...userData,
//               token: token,
//             };
//           } else {
//             console.log("Login Response:", resp);
//             return null;
//           }
//         } catch (error) {
//           console.error("Error during login:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       const userData = token.user as any;
//       session.user = userData;
//       return {
//         ...session,
//         accessToken: userData.token,
//       };
//     },
//   },

//   pages: {
//     signIn: "/",
//     signOut: "/",
//   },
// };
