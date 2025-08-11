"use server";

import { unauthorized } from "next/navigation";
import { and, desc, eq, asc, ilike, like } from "drizzle-orm";
import { db } from ".";
import { getAuthSession } from "@/util/session";
import {
  sessions,
  users,
  workouts,
  type PartialWorkoutType,
  type QueriedByIdWorkoutType,
  type Session,
  type User,
  type WorkoutType,
} from "./schema";

import type { LogsOrderType, LogsPageSearchParams } from "@/util/types";

export async function getUserCurrentWorkouts(): Promise<PartialWorkoutType[]> {
  const { user } = await getAuthSession();

  if (user === null) {
    unauthorized();
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
      .where(and(eq(workouts.userId, user.id), eq(workouts.status, "current")))
      .orderBy(workouts.id);

    if (userWorkouts.length === 0) {
      console.log("Nothing in current workouts.");
    } else {
      console.log("Current workouts fetched.");
    }

    return userWorkouts;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive user's current workouts.");
  }
}

export async function getUserArchivedWorkouts(): Promise<PartialWorkoutType[]> {
  const { user } = await getAuthSession();

  if (user === null) {
    unauthorized();
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
      .where(and(eq(workouts.userId, user.id), eq(workouts.status, "archived")))
      .orderBy(workouts.id);

    if (userWorkouts.length === 0) {
      console.log("Nothing in archive.");
    } else {
      console.log("Archived workouts fetched.");
    }

    return userWorkouts;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive user's archived workouts.");
  }
}

export async function getUserDoneWorkouts(
  searchQuery: LogsPageSearchParams["searchQuery"],
  strictMode: LogsPageSearchParams["strictMode"],
  order: LogsOrderType,
): Promise<WorkoutType[]> {
  const { user } = await getAuthSession();

  if (user === null) {
    unauthorized();
  }

  try {
    if (!searchQuery) {
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
        .orderBy(
          order === "Newest first" || order === "default"
            ? desc(workouts.id)
            : asc(workouts.id),
        );

      if (userWorkouts.length === 0) {
        console.log("Nothing in your workout's logs.");
      } else {
        console.log("Done workouts fetched.");
      }

      return userWorkouts;
    }

    const searchedWorkouts = await db
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
      .where(
        and(
          eq(workouts.userId, user.id),
          eq(workouts.status, "done"),
          strictMode === "on"
            ? like(workouts.title, searchQuery)
            : ilike(workouts.title, `%${searchQuery}%`),
        ),
      )
      .orderBy(
        order === "Newest first" || order === "default"
          ? desc(workouts.id)
          : asc(workouts.id),
      );

    if (searchedWorkouts.length === 0) {
      console.log(`Nothing matching ${searchQuery} search value.`);
    } else {
      console.log(`${searchQuery} workouts fetched.`);
    }

    return searchedWorkouts;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive user's workouts.");
  }
}

export async function getWorkoutById(
  workoutId: number,
): Promise<QueriedByIdWorkoutType | undefined> {
  const { user } = await getAuthSession();

  if (user === null) {
    unauthorized();
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

    if (!workout) {
      console.error("No matching workout found.");
    } else {
      console.log("Workout retrived.");
    }

    return workout;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive selected workout.");
  }
}

export async function getWorkoutByIdWithoutId(
  workoutId: number,
): Promise<Omit<QueriedByIdWorkoutType, "id"> | undefined> {
  const { user } = await getAuthSession();

  if (user === null) {
    unauthorized();
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

    if (!workout) {
      console.error("No matching workout found.");
    } else {
      console.log("Workout retrived.");
    }

    return workout;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive selected workout.");
  }
}

export async function getPostWorkoutPageWorkouts(title: string): Promise<{
  lastSubmittedWorkout: WorkoutType | undefined;
  currentWorkout: QueriedByIdWorkoutType | undefined;
}> {
  const { user } = await getAuthSession();

  if (user === null) {
    unauthorized();
  }

  try {
    const lastSubmittedWorkout = await db.query.workouts.findFirst({
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

    if (!lastSubmittedWorkout || !currentWorkout) {
      console.error("Something is missing...");
    } else {
      console.log("Both workouts retrived.");
    }

    return { lastSubmittedWorkout, currentWorkout };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive selected workouts.");
  }
}

export async function getWorkoutTitleById(
  workoutId: number,
): Promise<{ title: string }> {
  const { user } = await getAuthSession();

  if (user === null) {
    unauthorized();
  }

  try {
    const workoutTitle = await db.query.workouts.findFirst({
      where: and(eq(workouts.userId, user.id), eq(workouts.id, workoutId)),
      columns: {
        title: true,
      },
    });

    if (!workoutTitle) {
      console.error("No matching title found.");
      throw new Error("Failed to retrive selected title.");
    }

    console.log("Workout title retrived!");

    return workoutTitle;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to retrive selected workout.");
  }
}

export async function insertSessionInDb(session: Session): Promise<void> {
  await db.insert(sessions).values(session);
}

export async function getCurrentSession(
  sessionId: string,
): Promise<Session | undefined> {
  const currSession = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
  });

  return currSession;
}

export async function getUserInfoWithoutPassword(
  session: Session,
): Promise<User | undefined> {
  const userInfo = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
    columns: {
      hashedPassword: false,
    },
  });

  return userInfo;
}
