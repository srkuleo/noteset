import { Lucia, TimeSpan } from "lucia";
import { adapter } from "@/db";
import type { UserPreferences } from "./types";

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    name: "session",
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      id: attributes.id,
      username: attributes.username,
      email: attributes.email,
      createdAt: attributes.createdAt,
      isVerified: attributes.isVerified,
      preferences: attributes.preferences,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: Date;
  preferences: UserPreferences;
}
