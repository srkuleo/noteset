import type { NextAuthConfig } from "next-auth";

export const authConfig = {
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
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/user/home", nextUrl));
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
