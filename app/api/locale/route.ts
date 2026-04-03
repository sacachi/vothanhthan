import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale") ?? "en";
  const validLocale = ["en", "vi"].includes(locale) ? locale : "en";
  const ref = req.headers.get("referer") ?? "/";
  const res = NextResponse.redirect(ref);
  res.cookies.set("locale", validLocale, { path: "/", maxAge: 31536000 });
  return res;
}
