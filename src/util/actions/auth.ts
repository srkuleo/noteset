"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { eq, ilike, or } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { generateRandomId, generateSessionToken } from "../utils";
import {
  createSession,
  deleteSessionTokenCookie,
  getAuthSession,
  invalidateSession,
  setSessionTokenCookie,
} from "../session";

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
      message: "Error trying to create user account",
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
        message: "Error trying to create user account",
      };
    } else if (duplicateUsername?.username) {
      return {
        status: "error",
        errors: {
          username: ["Username already exists."],
        },
        message: "Error trying to create user account",
      };
    } else if (duplicateEmail?.email) {
      return {
        status: "error",
        errors: {
          email: ["This email is already taken."],
        },
        message: "Error trying to create user account",
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
  const userId = generateRandomId(16);

  try {
    await db.insert(users).values({
      id: userId,
      username: username,
      email: email,
      hashedPassword: hashedPassword,
      preferences: {
        timeFormat: "default",
        logsOrder: "default",
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

  const token = generateSessionToken();
  const session = await createSession(token, user.id);
  await setSessionTokenCookie(token, session.expiresAt);

  console.log("Credentials validated, you are logged in!");

  return {
    status: "success",
    message: "Credentials validated, you are logged in!",
  };
}

export async function logout() {
  const { session } = await getAuthSession();

  if (session === null) {
    redirect("/login");
  }

  await invalidateSession(session.id);

  await deleteSessionTokenCookie();

  console.log("Session deleted, you are logged out!");

  redirect("/login");
}
