"use server";

import { unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getAuthSession } from "@/util/session";

import type { ActionResponse, LogsOrderType, TimeFormatType } from "../types";

export async function updateUserTimeFormatPreference(
  value: TimeFormatType,
): Promise<ActionResponse> {
  const { user } = await getAuthSession();

  if (user === null) {
    unauthorized();
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

    console.log(`Time format - ${value}`);

    revalidatePath("/profile");

    return {
      status: "success",
      message: `Time format - ${value}`,
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Failed to set new time format...",
    };
  }
}

export async function updateUserLogsOrderPreference(
  value: LogsOrderType,
  searchParams: string,
): Promise<ActionResponse> {
  const { user } = await getAuthSession();

  if (user === null) {
    unauthorized();
  }

  if (user.preferences.logsOrder === value) {
    console.log(`Already set to - ${value}`);

    return {
      status: "success",
      message: `Already set to - ${value}`,
    };
  }

  try {
    await db
      .update(users)
      .set({ preferences: { ...user.preferences, logsOrder: value } })
      .where(eq(users.id, user.id));

    console.log(`Logs order - ${value}`);

    revalidatePath(`/logs?${searchParams}`);

    return {
      status: "success",
      message: `Logs order - ${value}`,
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Failed to set new logs order...",
    };
  }
}
