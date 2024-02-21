"use server";

import { db } from "@/db";
import { workouts } from "@/db/schema";
import { and, eq } from "drizzle-orm/mysql-core/expressions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateWorkoutSchema,
  type Exercise,
  type InputFieldErrors,
} from "./types";

export async function removeWorkout(workoutId: number) {
  try {
    await db.delete(workouts).where(eq(workouts.id, workoutId));
  } catch (err) {
    throw new Error("Database error: Workout could not be deleted.");
  }

  console.log("Workout deleted!");
  revalidatePath("/workouts");
  redirect("/workouts?action=deleted");
}

export async function createWorkout(
  userId: string,
  workoutExercises: Exercise[],
  prevState: InputFieldErrors,
  formData: FormData,
) {
  const parsedWorkout = CreateWorkoutSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    exercises: workoutExercises,
  });

  if (!parsedWorkout.success) {
    console.log(parsedWorkout.error.flatten().fieldErrors);

    return {
      errors: parsedWorkout.error.flatten().fieldErrors,
      message: "Workout could not be created.",
    };
  }

  const { title, description, exercises } = parsedWorkout.data;

  try {
    const existingWorkout = await db.query.workouts.findFirst({
      where: and(eq(workouts.title, title), eq(workouts.userId, userId)),
    });

    if (existingWorkout) {
      return {
        message: `${title} workout already exists.`,
      };
    }

    await db.insert(workouts).values({
      userId: userId,
      title: title,
      description: description,
      exercises: exercises,
    });

    console.log(`${title} workout created!`);
  } catch (error) {
    console.log(error);
    return { message: "Database Error: Workout could not be created." };
  }

  redirect("/workout-created-page");
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
    title: formData.get("title"),
    description: formData.get("description"),
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
