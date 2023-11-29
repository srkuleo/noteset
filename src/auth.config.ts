import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";

export const authConfig = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "database",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isOnUserPage = nextUrl.pathname.startsWith("/user");
      if (isOnUserPage) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/api/auth/signin", nextUrl)); // Redirect unauthenticated users to signin page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/user/home", nextUrl)); //Redirect authenticated users to user's home page
      }
      return true;
    },

    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
