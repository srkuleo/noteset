"use server";

import bcrypt from "bcrypt";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq, ilike, or } from "drizzle-orm";
import { generateIdFromEntropySize, type Session, type User } from "lucia";
import { db } from "@/db";
import { users } from "@/db/schema";
import { lucia } from "../lucia";

import { type AuthActionResponse, loginSchema, signUpSchema } from "../types";

export async function signUp(formData: FormData): Promise<AuthActionResponse> {
  const signUpRaw = signUpSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!signUpRaw.success) {
    return {
      status: "error",
      errors: signUpRaw.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = signUpRaw.data;

  try {
    const duplicateUsername = await db.query.users.findFirst({
      where: ilike(users.username, username),
      columns: {
        username: true,
      },
    });

    const duplicateEmail = await db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        email: true,
      },
    });

    if (duplicateUsername?.username && duplicateEmail?.email) {
      return {
        status: "error",
        errors: {
          username: ["Username already exists."],
          email: ["This email is already taken."],
        },
      };
    } else if (duplicateUsername?.username) {
      return {
        status: "error",
        errors: {
          username: ["Username already exists."],
        },
      };
    } else if (duplicateEmail?.email) {
      return {
        status: "error",
        errors: {
          email: ["This email is already taken."],
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Database Error: Please try again.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = generateIdFromEntropySize(10);

  try {
    await db.insert(users).values({
      id: userId,
      username: username,
      email: email,
      hashedPassword: hashedPassword,
      preferences: {
        timeFormat: "default",
      },
    });
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Database Error: Profile was not created",
    };
  }

  return {
    status: "success-redirect",
    message: "Profile created successfully",
  };
}

export async function login(formData: FormData): Promise<AuthActionResponse> {
  const loginRaw = loginSchema.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!loginRaw.success) {
    return {
      status: "error",
      message: "Invalid credentials",
    };
  }

  const { identifier, password } = loginRaw.data;

  const user = await db.query.users.findFirst({
    where: or(eq(users.username, identifier), eq(users.email, identifier)),
  });

  if (!user) {
    return {
      status: "error",
      message: "Incorrect username/email or password",
    };
  }

  const validPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!validPassword) {
    return {
      status: "error",
      message: "Incorrect username/email or password",
    };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  console.log("User validated, you are logged in!");

  return {
    status: "success",
    message: "User validated, you are logged in!",
  };
}

export async function logout() {
  const { session } = await getAuth();

  if (!session) {
    redirect("/login");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/login");
}

export const getAuth = cache(
  async (): Promise<{ user: User | null; session: Session | null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const { user, session } = await lucia.validateSession(sessionId);

    try {
      if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }

      if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {
      /* empty */
    }

    return { user, session };
  },
);
