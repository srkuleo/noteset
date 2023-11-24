import type { DefaultSession } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string | undefined;
  }

  interface Session {
    user: {
      id: string;
      username?: string | undefined;
    } & DefaultSession["user"];
  }
}
