"use server";

import { revalidatePath } from "next/cache";
import { and, eq, ilike, ne } from "drizzle-orm";
import { db } from "@/db";
import { workouts } from "@/db/schema";
import { getAuth } from "./auth";

import {
  CreateWorkoutSchema,
  type WorkoutActionResponse,
  type CreateWorkoutType,
} from "../types";

export async function createWorkout(
  workout: CreateWorkoutType,
): Promise<WorkoutActionResponse> {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized action. Please login.");
  }

  const isValidWorkout = CreateWorkoutSchema.safeParse(workout);

  if (!isValidWorkout.success) {
    return {
      status: "error",
      errors: isValidWorkout.error.flatten().fieldErrors,
      message: "Workout could not be created",
    };
  }

  const { title, description, exercises } = isValidWorkout.data;

  try {
    const existingWorkout = await db.query.workouts.findFirst({
      where: and(ilike(workouts.title, title), eq(workouts.userId, user.id)),
    });

    if (existingWorkout) {
      console.log("Workout already exists.");

      return {
        status: "error",
        errors: {
          title: ["Workout with this title already exists."],
        },
        message: `"${title}" workout already exists`,
      };
    }

    await db.insert(workouts).values({
      userId: user.id,
      title: title,
      description: description ? description : "Description not provided.",
      exercises: exercises,
    });

    console.log(`${title} workout created!`);

    revalidatePath("/workouts");

    return {
      status: "success",
      message: `${title} workout created`,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Database Error: Workout could not be created",
    };
  }
}

export async function editWorkout(
  editedWorkout: CreateWorkoutType,
  workoutId: number,
  initTitle: string,
): Promise<WorkoutActionResponse> {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized action. Please login.");
  }

  const isValidWorkout = CreateWorkoutSchema.safeParse(editedWorkout);

  if (!isValidWorkout.success) {
    return {
      status: "error",
      errors: isValidWorkout.error.flatten().fieldErrors,
      message: "Workout could not be edited",
    };
  }

  const { title, description, exercises } = isValidWorkout.data;

  try {
    const alreadyExistWorkout = await db.query.workouts.findFirst({
      where: and(
        ilike(workouts.title, title),
        eq(workouts.userId, user.id),
        ne(workouts.id, workoutId),
      ),
    });

    if (alreadyExistWorkout) {
      return {
        status: "error",
        errors: {
          title: ["Workout with this title already exists."],
        },
        message: `Workout already exists`,
      };
    }

    await db
      .update(workouts)
      .set({
        title: title,
        description: description ? description : "Description not provided.",
        exercises: exercises,
      })
      .where(eq(workouts.id, workoutId));

    console.log(`${initTitle} workout edited.`);

    revalidatePath("/workouts");

    return {
      status: "success-redirect",
      message: `"${initTitle}" workout edited`,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Database Error: Workout could not be edited",
    };
  }
}

export async function removeWorkout(
  workoutId: number,
  workoutTitle: string,
): Promise<WorkoutActionResponse> {
  try {
    await db.delete(workouts).where(eq(workouts.id, workoutId));

    console.log("Workout deleted!");

    revalidatePath("/workouts");

    return {
      status: "success",
      message: `"${workoutTitle}" workout removed`,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Database Error: Workout could not be removed",
    };
  }
}

export async function archiveWorkout(
  workoutId: number,
  workoutTitle: string,
): Promise<WorkoutActionResponse> {
  try {
    await db
      .update(workouts)
      .set({ status: "arhived" })
      .where(eq(workouts.id, workoutId));

    console.log("Workout archived!");

    revalidatePath("/workouts");

    return {
      status: "success",
      message: `"${workoutTitle}" workout archived`,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Database Error: Workout could not be archived",
    };
  }
}
