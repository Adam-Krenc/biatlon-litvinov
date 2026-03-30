import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Lightweight Edge middleware — neimportuje Prisma ani bcrypt
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*"],
};
