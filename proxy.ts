import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const isLoginPage = req.nextUrl.pathname === "/admins/login";

  if (!req.auth && !isLoginPage) {
    return NextResponse.redirect(new URL("/admins/login", req.url));
  }

  if (req.auth && isLoginPage) {
    return NextResponse.redirect(new URL("/admins", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admins/:path*"],
};