"use server";

import { revalidatePath } from "next/cache";
import { and, eq, ilike, ne } from "drizzle-orm";
import { db } from "@/db";
import { workouts } from "@/db/schema";
import { getAuth } from "./auth";

import {
  CreateWorkoutSchema,
  WorkoutToDoSchema,
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
      message: "Invalid workout data",
    };
  }

  const { title, description, exercises } = isValidWorkout.data;

  try {
    const existingWorkout = await db.query.workouts.findFirst({
      where: and(
        ilike(workouts.title, title),
        eq(workouts.userId, user.id),
        eq(workouts.status, "current"),
      ),
    });

    if (existingWorkout) {
      console.log("Workout already exists.");

      return {
        status: "error",
        errors: {
          title: ["Workout with this title already exists."],
        },
        message: `${title} workout already exists`,
      };
    }

    await db.insert(workouts).values({
      userId: user.id,
      title: title,
      description: description,
      exercises: exercises,
    });

    console.log(`${title} workout created!`);

    revalidatePath("/home?q=current");

    return {
      status: "success-redirect",
      message: `${title} workout created`,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to create workout...",
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
      message: "Invalid workout data",
    };
  }

  const { title, description, exercises } = isValidWorkout.data;

  try {
    const alreadyExistWorkout = await db.query.workouts.findFirst({
      where: and(
        ilike(workouts.title, title),
        eq(workouts.userId, user.id),
        eq(workouts.status, "current"),
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
        description: description,
        exercises: exercises,
      })
      .where(eq(workouts.id, workoutId));

    console.log(`${initTitle} workout edited.`);

    revalidatePath("/home?q=current");

    return {
      status: "success-redirect",
      message: `"${initTitle}" workout edited`,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to edit workout",
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

    revalidatePath("/home?q=current");

    return {
      status: "success",
      message: `"${workoutTitle}" workout removed`,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Failed to remove workout...",
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
      .set({ status: "archived" })
      .where(eq(workouts.id, workoutId));

    console.log("Workout archived!");

    revalidatePath("/home?q=current");

    return {
      status: "success",
      message: `"${workoutTitle}" workout archived`,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Failed to archive workout",
    };
  }
}

export async function unarchiveWorkout(
  workoutId: number,
  workoutTitle: string,
): Promise<WorkoutActionResponse> {
  try {
    await db
      .update(workouts)
      .set({ status: "current" })
      .where(eq(workouts.id, workoutId));

    console.log("Workout unarchived!");

    revalidatePath("/home?q=current");

    return {
      status: "success-redirect",
      message: `"${workoutTitle}" workout moved to current`,
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Failed to unarchive workout",
    };
  }
}

export async function submitDoneWorkout(
  doneWorkout: CreateWorkoutType,
  duration: number,
): Promise<WorkoutActionResponse> {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized action. Please login.");
  }

  const isValidWorkout = WorkoutToDoSchema.safeParse(doneWorkout);

  if (!isValidWorkout.success) {
    return {
      status: "error",
      message: "Invalid workout data",
    };
  }

  const { title, description, exercises } = isValidWorkout.data;

  try {
    await db.insert(workouts).values({
      userId: user.id,
      title: title,
      description: description,
      exercises: exercises,
      status: "done",
      duration: duration,
      doneAt: new Date(),
    });

    console.log("Workout submitted!");

    revalidatePath("/logs");

    return {
      status: "success-redirect",
      message: "Workout submitted",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to submit workout...",
    };
  }
}

export async function updateCurrentWorkout(
  updatedCurrentWorkout: CreateWorkoutType,
  workoutId: number,
): Promise<WorkoutActionResponse> {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized action. Please login.");
  }

  const isValidWorkout = CreateWorkoutSchema.safeParse(updatedCurrentWorkout);

  if (!isValidWorkout.success) {
    return {
      status: "error",
      errors: isValidWorkout.error.flatten().fieldErrors,
      message: "Invalid workout data",
    };
  }

  try {
    await db
      .update(workouts)
      .set({ exercises: [...updatedCurrentWorkout.exercises] })
      .where(and(eq(workouts.id, workoutId), eq(workouts.status, "current")));

    console.log("Workout updated.");

    revalidatePath("/home?q=current");

    return {
      status: "success-redirect",
      message: `${updatedCurrentWorkout.title} workout updated`,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to update workout...",
    };
  }
}
