"use server";

import { db } from "@/db";
import { workouts } from "@/db/schema";
import { and, eq } from "drizzle-orm/mysql-core/expressions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateWorkoutSchema,
  type WorkoutActionResponse,
  type WorkoutType,
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
  workout: WorkoutType,
): Promise<WorkoutActionResponse> {
  const isValidWorkout = CreateWorkoutSchema.safeParse(workout);

  if (!isValidWorkout.success) {
    return {
      status: "error",
      errors: isValidWorkout.error.flatten().fieldErrors,
      message: "Workout could not be created.",
      timestamp: Date.now(),
    };
  }

  const { title, description, exercises } = isValidWorkout.data;

  try {
    const existingWorkout = await db.query.workouts.findFirst({
      where: and(eq(workouts.title, title), eq(workouts.userId, userId)),
    });

    if (existingWorkout) {
      return {
        status: "error",
        message: `${title} workout already exists.`,
        timestamp: Date.now(),
      };
    }

    await db.insert(workouts).values({
      userId: userId,
      title: title,
      description: description ? description : "Description not provided.",
      exercises: exercises,
    });

    console.log(`${title} workout created!`);

    revalidatePath("/workouts");

    return {
      status: "success",
      message: `${title} workout has been created.`,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Database Error: Workout could not be created.",
      timestamp: Date.now(),
    };
  }
}

interface Ids {
  userId: string;
  workoutId: number;
}

export async function editWorkout(
  { userId, workoutId }: Ids,
  formData: FormData,
) {
  const { title, description } = CreateWorkoutSchema.parse({
    title: formData.get("workoutTitle"),
    description: formData.get("workoutDescription"),
  });

  try {
    const matchingTitleWorkout = await db.query.workouts.findFirst({
      where: and(eq(workouts.title, title), eq(workouts.userId, userId)),
    });

    if (matchingTitleWorkout && matchingTitleWorkout.id !== workoutId) {
      return `Workout with ${title} title already exists.`;
    }

    await db
      .update(workouts)
      .set({ title: title, description: description })
      .where(eq(workouts.id, workoutId));

    console.log(`${title} workout edited.`);
  } catch (error) {
    console.log(error);
    throw new Error("Database Error: Workout could not be edited.");
  }

  revalidatePath("/workouts");
  redirect("/workouts?action=edited");
}
