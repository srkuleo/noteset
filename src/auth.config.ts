import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "database"
  },
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      console.log(isLoggedIn);
      const isOnAnyUserPage = nextUrl.pathname.startsWith("/user");
      console.log(nextUrl.toString());

      if (isOnAnyUserPage && isLoggedIn) {
        return true;
      }

      if (isOnAnyUserPage && !isLoggedIn) {
        return false;
      }

      if (isLoggedIn) {
        return Response.redirect(new URL("/user/home", nextUrl));
      }

      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.username = user.username;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
