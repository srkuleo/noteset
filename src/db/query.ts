"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from ".";
import {
  sessions,
  users,
  workouts,
  type PartialWorkoutType,
  type Session,
} from "./schema";
import { getAuthSession } from "@/util/session";

import type { WorkoutStatusType } from "@/util/types";

export async function getUserWorkouts(
  workoutStatus: WorkoutStatusType,
): Promise<PartialWorkoutType[]> {
  const { user } = await getAuthSession();

  if (user === null) {
    throw new Error("Unauthorized action. Please login.");
  }

  try {
    const userWorkouts = await db
      .select({
        id: workouts.id,
        title: workouts.title,
        description: workouts.description,
        status: workouts.status,
        exercises: workouts.exercises,
      })
      .from(workouts)
      .where(
        and(eq(workouts.userId, user.id), eq(workouts.status, workoutStatus)),
      )
      .orderBy(workouts.id);

    console.log("Workouts fetched.");

    return userWorkouts;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive user's workouts.");
  }
}

export async function getUserDoneWorkouts() {
  const { user } = await getAuthSession();

  if (user === null) {
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
  const { user } = await getAuthSession();

  if (user === null) {
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
  const { user } = await getAuthSession();

  if (user === null) {
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

export async function getLastSubmittedWorkout(title: string) {
  const { user } = await getAuthSession();

  if (user === null) {
    throw new Error("Unauthorized action. Please login.");
  }

  try {
    const submittedWorkout = await db.query.workouts.findFirst({
      where: and(
        eq(workouts.userId, user.id),
        eq(workouts.title, title),
        eq(workouts.status, "done"),
      ),
      orderBy: (workouts, { desc }) => desc(workouts.id),
      columns: {
        userId: false,
      },
    });

    console.log("Workout retrived.");

    return submittedWorkout;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive selected workout.");
  }
}

export async function getCurrentWorkoutByTitle(title: string) {
  const { user } = await getAuthSession();

  if (user === null) {
    throw new Error("Unauthorized action. Please login.");
  }

  try {
    const currentWorkout = await db.query.workouts.findFirst({
      where: and(
        eq(workouts.userId, user.id),
        eq(workouts.title, title),
        eq(workouts.status, "current"),
      ),
      columns: {
        id: true,
        title: true,
        description: true,
        exercises: true,
      },
    });

    console.log("Current workout retrived.");

    return currentWorkout;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive current workout.");
  }
}

export async function getWorkoutTitleById(workoutId: number) {
  const { user } = await getAuthSession();

  if (user === null) {
    throw new Error("Unauthorized action. Please login.");
  }

  try {
    const workoutTitle = await db.query.workouts.findFirst({
      where: and(eq(workouts.userId, user.id), eq(workouts.id, workoutId)),
      columns: {
        title: true,
      },
    });

    console.log("Workout title retrived!");
    return workoutTitle;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive selected workout.");
  }
}

export async function insertSessionInDb(session: Session) {
  await db.insert(sessions).values(session);
}

export async function getCurrentSession(sessionId: string) {
  const currSession = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
  });

  return currSession;
}

export async function getUserInfoWithoutPassword(session: Session) {
  const userInfo = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
    columns: {
      hashedPassword: false,
    },
  });

  return userInfo;
}
