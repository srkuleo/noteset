"use server";

import { and, eq } from "drizzle-orm";
import { db } from ".";
import { workouts } from "./schema";

export async function getUserWorkouts(userId: string) {
  try {
    const userWorkouts = await db
      .select({
        id: workouts.id,
        title: workouts.title,
        description: workouts.description,
        exercises: workouts.exercises,
        status: workouts.status,
      })
      .from(workouts)
      .where(and(eq(workouts.userId, userId), eq(workouts.status, "current")))
      .orderBy(workouts.id);

    console.log("Workouts fetched.");

    return userWorkouts;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive user's workouts.");
  }
}

export async function getWorkoutById(workoutId: number, userId: string) {
  try {
    const workout = await db.query.workouts.findFirst({
      where: and(eq(workouts.userId, userId), eq(workouts.id, workoutId)),
      columns: {
        id: true,
        title: true,
        description: true,
        exercises: true,
      },
    });

    console.log("Workout retrived.");

    return workout;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive selected workout.");
  }
}
