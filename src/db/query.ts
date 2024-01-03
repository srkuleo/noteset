"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from ".";
import { workouts } from "./schema";
import { and, eq } from "drizzle-orm/mysql-core/expressions";

export async function getUserWorkouts(id: string) {
  noStore();

  try {
    const userWorkouts = await db
      .select({
        id: workouts.id,
        title: workouts.title,
        description: workouts.description,
      })
      .from(workouts)
      .where(and(eq(workouts.userId, id), eq(workouts.status, "current")));

    console.log("Workouts fetched.");

    return userWorkouts;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to get user's workouts.");
  }
}

export async function getWorkoutById(id: number) {
  noStore();

  try {
    const workout = await db.query.workouts.findFirst({
      where: eq(workouts.id, id),
    });

    console.log("Workout retrived.");

    return workout;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive selected workout.");
  }
}
