import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === "ADMIN";

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isUserManagementRoute = nextUrl.pathname.startsWith("/admin/uzivatele");

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/prihlaseni", nextUrl));
  }

  if (isUserManagementRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
