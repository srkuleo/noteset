"use server";

import { db } from "@/db";
import { workouts } from "@/db/schema";
import { and, eq } from "drizzle-orm/mysql-core/expressions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { WorkoutAlreadyExistsError } from "./exceptions";

const WorkoutSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(4, { message: "Must be at least 4 characters long" })
    .max(30, { message: "Too long. Keep it less than 30 characters." }),
  description: z
    .string()
    .min(5, { message: "Please provide a short description." })
    .max(80, { message: "Too long. Keep it less than 80 characters." }),
  status: z.enum(["current", "done"]),
  userId: z.string(),
  doneAt: z.string(),
  timeElapsed: z.string(),
});

export async function removeWorkout(workoutId: number) {
  try {
    await db.delete(workouts).where(eq(workouts.id, workoutId));
  } catch (err) {
    throw new Error("Database error: Workout could not be deleted.");
  }

  console.log("Workout deleted!");
  revalidatePath("/workouts?action=deleted");
}

const CreateWorkout = WorkoutSchema.omit({
  id: true,
  status: true,
  userId: true,
  doneAt: true,
  timeElapsed: true,
});

export async function createWorkout(userId: string, formData: FormData) {
  const { title, description } = CreateWorkout.parse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  try {
    const existingWorkout = await db.query.workouts.findFirst({
      where: and(eq(workouts.title, title), eq(workouts.userId, userId)),
    });

    if (existingWorkout) {
      throw new WorkoutAlreadyExistsError(
        `Workout with ${title} title already exists.`,
      );
    }

    await db
      .insert(workouts)
      .values({ userId: userId, title: title, description: description });
  } catch (error) {
    if (error instanceof WorkoutAlreadyExistsError) {
      throw new Error(error.message);
    } else {
      throw new Error("Database Error: Workout could not be created.");
    }
  }

  console.log(`${title} workout created!`);

  revalidatePath("/workouts");
  redirect("/workouts?action=created");
}

interface Ids {
  userId: string;
  workoutId: number;
}

export async function editWorkout(
  { userId, workoutId }: Ids,
  formData: FormData,
) {
  const { title, description } = CreateWorkout.parse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  try {
    const matchingTitleWorkout = await db.query.workouts.findFirst({
      where: and(eq(workouts.title, title), eq(workouts.userId, userId)),
    });

    if (matchingTitleWorkout && matchingTitleWorkout.id !== workoutId) {
      throw new WorkoutAlreadyExistsError(
        `Workout with ${title} title already exists.`,
      );
    }

    await db
      .update(workouts)
      .set({ title: title, description: description })
      .where(eq(workouts.id, workoutId));
  } catch (error) {
    if (error instanceof WorkoutAlreadyExistsError) {
      throw new Error(error.message);
    } else {
      throw new Error("Database Error: Workout could not be edited.");
    }
  }

  revalidatePath("/workouts");
  redirect("/workouts?action=edited");
}
