import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isOnAnyUserPage = nextUrl.pathname.startsWith("/user");
      console.log(nextUrl.toString());

      if (isOnAnyUserPage && isLoggedIn) {
        return true;
      }

      if (isOnAnyUserPage && !isLoggedIn) {
        return false;
      }

      if (isLoggedIn) {
        return Response.redirect(new URL("/user", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
