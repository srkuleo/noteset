import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub,
    Google({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});
