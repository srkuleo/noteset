"use server";

import { db } from "@/db";
import { workouts } from "@/db/schema";
import { eq } from "drizzle-orm/mysql-core/expressions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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

export async function removeWorkout(id: number) {
  try {
    await db.delete(workouts).where(eq(workouts.id, id));
  } catch (err) {
    console.error(err);
    throw new Error("Database error: Workout could not be deleted.");
  }

  revalidatePath("/workouts");
  console.log({ message: "Workout deleted!" });
  return { message: "Workout deleted!" };
}

const CreateWorkout = WorkoutSchema.omit({
  id: true,
  userId: true,
  doneAt: true,
  timeElapsed: true,
  status: true,
});

export async function createWorkout(userId: string, formData: FormData) {
  const { title, description } = CreateWorkout.parse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  try {
    await db
      .insert(workouts)
      .values({ userId: userId, title: title, description: description });
  } catch (error) {
    console.error(error);
    throw new Error("Database error: Failed to create new workout.");
  }

  revalidatePath("/workouts");
  redirect("/workouts");
}
