import { NextResponse } from "next/server";

export function middleware(request) {
  const cookies = request.cookies.getAll();

  const isStaticAssets =
    request.nextUrl.pathname.startsWith("_/next") ||
    request.nextUrl.pathname.startsWith("/favicon.io") ||
    request.nextUrl.pathname.startsWith("/static");

  if (isStaticAssets) return NextResponse.next();

  const isNewRide = request.nextUrl.pathname.startsWith("/newride");
  const isLogin = request.nextUrl.pathname.startsWith("/login");
  const isProfile = request.nextUrl.pathname.startsWith("/riderprofile");

  const authToken = cookies.find((cookie) => cookie.name == "rider-secret");

  if ((isNewRide || isProfile) && !authToken)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  if (isLogin && authToken) {
    NextResponse.redirect(new URL("/newride", request.url));
  }
  return NextResponse.next();
}
