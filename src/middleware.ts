import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

interface UserToken {
  user: {
    user: {
      id: number;
      nip: string;
      name: string;
      email_kantor: string | null;
      email_pribadi: string;
      img_profile: string | null;
      phone_number: string | null;
    };
    jobrole: { jobrole: string };
    jabatan: { tempLevelA: string; tempLevelN: string; templevel: string };
    token: string;
    accessToken: string;
  };
  iat: number;
  exp: number;
  jti: string;
}

export async function middleware(request: NextRequest) {
  const token = (await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })) as unknown as UserToken;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token.user.accessToken === "emailVerificationToken") {
    return NextResponse.redirect(new URL("/verifikasi-profil", request.url));
  }

  if (token.user.accessToken === "documentPreparation") {
    return NextResponse.redirect(new URL("/document-preparation", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/admin/:path*", "/poos/:path*"],
};
