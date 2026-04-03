import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname === "/admins/login";
  if (isLoginPage) return NextResponse.next();

  // Check for NextAuth session token (v5 uses authjs.session-token or next-auth.session-token)
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("next-auth.session-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admins/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admins/:path*"],
};
