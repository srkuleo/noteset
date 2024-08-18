"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from ".";
import { workouts } from "./schema";
import { getAuth } from "@/util/actions/auth";

export async function getUserWorkouts() {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized action. Please login.");
  }

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
      .where(and(eq(workouts.userId, user.id), eq(workouts.status, "current")))
      .orderBy(workouts.id);

    console.log("Workouts fetched.");

    return userWorkouts;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive user's workouts.");
  }
}

export async function getUserDoneWorkouts() {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized action. Please login.");
  }

  try {
    const userWorkouts = await db
      .select({
        id: workouts.id,
        title: workouts.title,
        description: workouts.description,
        exercises: workouts.exercises,
        status: workouts.status,
        doneAt: workouts.doneAt,
        duration: workouts.duration,
      })
      .from(workouts)
      .where(and(eq(workouts.userId, user.id), eq(workouts.status, "done")))
      .orderBy(desc(workouts.id));

    console.log("Done workouts fetched.");

    return userWorkouts;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive user's workouts.");
  }
}

export async function getWorkoutById(workoutId: number) {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized action. Please login.");
  }

  try {
    const workout = await db.query.workouts.findFirst({
      where: and(eq(workouts.userId, user.id), eq(workouts.id, workoutId)),
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

export async function getWorkoutByIdWithoutId(workoutId: number) {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized action. Please login.");
  }

  try {
    const workout = await db.query.workouts.findFirst({
      where: and(eq(workouts.userId, user.id), eq(workouts.id, workoutId)),
      columns: {
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
