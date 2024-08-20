"use server";

import { eq } from "drizzle-orm";
import { getAuth } from "./auth";
import { db } from "@/db";
import { users } from "@/db/schema";

import type { TimeFormatType, WorkoutActionResponse } from "../types";
import { revalidatePath } from "next/cache";

export async function updateUserTimeFormatPreference(
  value: TimeFormatType,
): Promise<WorkoutActionResponse> {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized action. Please login.");
  }

  if (user.preferences.timeFormat === value) {
    console.log(`Already set to - ${value}`);

    return {
      status: "success",
      message: `Already set to - ${value}`,
    };
  }

  try {
    await db
      .update(users)
      .set({ preferences: { ...user.preferences, timeFormat: value } })
      .where(eq(users.id, user.id));

    console.log(`Time format set to - ${value}`);

    revalidatePath("/profile");

    return {
      status: "success",
      message: `Time format set to - ${value}`,
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Database Error: Time format could not be changed",
    };
  }
}
