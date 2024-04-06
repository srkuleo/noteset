"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from "."; 
import { workouts } from "./schema";
import { and, eq } from "drizzle-orm"; 

export async function getUserWorkouts(userId: string) {
  noStore();

  try {
    const userWorkouts = await db
      .select({
        id: workouts.id,
        title: workouts.title,
        description: workouts.description,
        exercises: workouts.exercises,
      })
      .from(workouts)
      .where(and(eq(workouts.userId, userId), eq(workouts.status, "current")));

    console.log("Workouts fetched.");

    return userWorkouts;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive user's workouts.");
  }
}

export async function getWorkoutById(workoutId: number) {
  noStore();

  try {
    const workout = await db.query.workouts.findFirst({
      where: eq(workouts.id, workoutId),
    });

    console.log("Workout retrived.");

    return workout;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive selected workout.");
  }
}
