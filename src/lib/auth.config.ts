import type { NextAuthConfig } from "next-auth";

/**
 * Lightweight auth config bez Prisma/bcrypt — bezpečné pro Edge runtime (middleware).
 * Providers jsou prázdné; přihlášení probíhá v src/lib/auth.ts s full configem.
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/prihlaseni" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = (auth?.user as { role?: string })?.role === "ADMIN";
      const path = nextUrl.pathname;

      if (path.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        // Správa uživatelů pouze pro admina
        if (path.startsWith("/admin/uzivatele") && !isAdmin) {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        return true;
      }
      return true;
    },
  },
  providers: [],
};
