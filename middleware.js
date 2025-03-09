import { NextResponse } from "next/server";

export async function middleware(request) {
  const cookies = request.cookies.getAll();

  const isStaticAssets =
    request.nextUrl.pathname.startsWith("_/next") ||
    request.nextUrl.pathname.startsWith("/favicon.io") ||
    request.nextUrl.pathname.startsWith("/static");

  if (isStaticAssets) return NextResponse.next();

  const isNewRide = request.nextUrl.pathname.startsWith("/newride");
  const isLogin = request.nextUrl.pathname.startsWith("/login");
  const isProfile = request.nextUrl.pathname.startsWith("/riderprofile");
  const isAdminApi = request.nextUrl.pathname.startsWith("/api/admin");

  const authToken = cookies.find((cookie) => cookie.name === "rider-secret");

  if ((isNewRide || isProfile) && !authToken)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  if (isLogin && authToken) {
    return NextResponse.redirect(new URL("/newride", request.url));
  }

  if (isAdminApi) {
    if (!authToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Call the API to verify admin role
    const response = await fetch(`${request.nextUrl.origin}/api/verify-admin`, {
      method: "GET",
      headers: {
        Cookie: `rider-secret=${authToken.value}`,
      },
    });

    const data = await response.json();

    console.log({ data });

    if (!data.success) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }
  }
  return NextResponse.next();
}

// ✅ Ensure this runs in Node.js runtime, not Edge
export const config = {
  matcher: "/api/admin/:path*",
  runtime: "nodejs",
};
