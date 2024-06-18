"use server";

import { db } from "@/db";
import { workouts } from "@/db/schema";
import { and, eq } from "drizzle-orm/mysql-core/expressions";
import { revalidatePath } from "next/cache";
import {
  CreateWorkoutSchema,
  type WorkoutActionResponse,
  type WorkoutWithoutIds,
} from "./types";

export async function removeWorkout(
  workoutId: number,
  workoutTitle: string,
): Promise<Omit<WorkoutActionResponse, "timestamp">> {
  try {
    await db.delete(workouts).where(eq(workouts.id, workoutId));

    console.log("Workout deleted!");

    revalidatePath("/workouts");

    return {
      status: "success",
      message: `${workoutTitle} workout has been removed.`,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: `${workoutTitle} workout could not be removed.`,
    };
  }
}

export async function createWorkout(
  userId: string,
  workout: WorkoutWithoutIds,
): Promise<WorkoutActionResponse> {
  const isValidWorkout = CreateWorkoutSchema.safeParse(workout);

  if (!isValidWorkout.success) {
    return {
      status: "error",
      errors: isValidWorkout.error.flatten().fieldErrors,
      message: "Workout could not be created.",
    };
  }

  const { title, description, exercises } = isValidWorkout.data;

  try {
    const existingWorkout = await db.query.workouts.findFirst({
      where: and(eq(workouts.title, title.trim()), eq(workouts.userId, userId)),
    });

    if (existingWorkout) {
      console.log("Workout already exists.");

      return {
        status: "error",
        message: `${title} workout already exists.`,
        errors: {
          title: ["Workout with this title already exists."],
        },
      };
    }

    await db.insert(workouts).values({
      userId: userId,
      title: title.trim(),
      description: description
        ? description.trim()
        : "Description not provided.",
      exercises: exercises,
    });

    console.log(`${title} workout created!`);

    revalidatePath("/workouts");

    return {
      status: "success",
      message: `${title} workout has been created.`,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Database Error: Workout could not be created.",
    };
  }
}

export async function editWorkout(
  initTitle: string,
  editedWorkout: WorkoutWithoutIds,
  userId: string,
  workoutId: number,
): Promise<WorkoutActionResponse> {
  const isValidWorkout = CreateWorkoutSchema.safeParse(editedWorkout);

  if (!isValidWorkout.success) {
    return {
      status: "error",
      errors: isValidWorkout.error.flatten().fieldErrors,
      message: "Workout could not be edited.",
    };
  }

  const { title, description, exercises } = isValidWorkout.data;

  try {
    const matchingTitleWorkout = await db.query.workouts.findFirst({
      where: and(eq(workouts.title, title), eq(workouts.userId, userId)),
    });

    if (matchingTitleWorkout && matchingTitleWorkout.id !== workoutId) {
      return {
        status: "error",
        message: `Workout with ${title} title already exists.`,
        errors: {
          title: ["Workout with this title already exists."],
        },
      };
    }

    await db
      .update(workouts)
      .set({
        title: title.trim(),
        description: description
          ? description.trim()
          : "Description not provided.",
        exercises: exercises,
      })
      .where(eq(workouts.id, workoutId));

    console.log(`${initTitle} workout edited.`);

    revalidatePath("/workouts");

    return {
      status: "success",
      message: `${initTitle} workout has been edited.`,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Database Error: Workout could not be edited.",
    };
  }
}
