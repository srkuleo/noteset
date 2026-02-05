"use server"

import { and, eq, ilike, inArray, ne } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { unauthorized } from "next/navigation"
import z from "zod"
import { db } from "@/db"
import { type CurrentWorkoutForFormsType, workouts } from "@/db/schema"
import { getAuthSession } from "@/util/session"
import {
  type ActionResponse,
  CreateWorkoutSchema,
  type WorkoutActionResponse,
  type WorkoutToDoClientType,
  WorkoutToDoServerSchema,
} from "../types"
import { FORM_TIMEOUT, timeout } from "../utils"

export type EditWorkoutArgs = {
  editedWorkout: CurrentWorkoutForFormsType
  workoutToEditId: number
}

export type UpdateWorkoutsArgs = {
  id: number
  title: string
  action: "remove" | "archive" | "unarchive"
}

export type SubmitWorkoutArgs = {
  doneWorkout: WorkoutToDoClientType
  duration: number
}

export async function createWorkout(
  workout: CurrentWorkoutForFormsType
): Promise<WorkoutActionResponse> {
  await timeout(FORM_TIMEOUT)

  const { user } = await getAuthSession()
  if (user === null) {
    unauthorized()
  }

  const isValidWorkout = CreateWorkoutSchema.safeParse(workout)
  if (!isValidWorkout.success) {
    const tree = z.treeifyError(isValidWorkout.error)

    return {
      status: "error",
      errors: {
        title: tree.properties?.title?.errors,
        exercises: tree.properties?.exercises?.errors,
      },
      message: "Invalid workout data",
    }
  }

  const { title, description, exercises } = isValidWorkout.data

  try {
    const alreadyExistWorkout = await db.query.workouts.findFirst({
      where: and(
        ilike(workouts.title, title),
        eq(workouts.userId, user.id),
        inArray(workouts.status, ["current", "archived"])
      ),
    })

    if (alreadyExistWorkout) {
      return {
        status: "error",
        errors: {
          title: ["Workout with this title already exists."],
        },
        message: `${title} workout already exists`,
      }
    }

    await db.insert(workouts).values({
      userId: user.id,
      title,
      description,
      exercises,
    })

    revalidatePath("/current")

    return {
      status: "success-redirect",
      message: `${title} workout created`,
    }
  } catch (error) {
    console.log(error)
    return {
      status: "error",
      message: "Failed to create workout...",
    }
  }
}

export async function editWorkout({
  editedWorkout,
  workoutToEditId,
}: EditWorkoutArgs): Promise<WorkoutActionResponse> {
  await timeout(FORM_TIMEOUT)

  const { user } = await getAuthSession()
  if (user === null) {
    unauthorized()
  }

  const isValidWorkout = CreateWorkoutSchema.safeParse(editedWorkout)
  if (!isValidWorkout.success) {
    const tree = z.treeifyError(isValidWorkout.error)

    return {
      status: "error",
      errors: {
        title: tree.properties?.title?.errors,
        exercises: tree.properties?.exercises?.errors,
      },
      message: "Invalid workout data",
    }
  }

  const { title, description, exercises } = isValidWorkout.data
  try {
    const exsitingWorkout = await db.query.workouts.findFirst({
      where: and(
        ilike(workouts.title, title),
        eq(workouts.userId, user.id),
        inArray(workouts.status, ["current", "archived"]),
        ne(workouts.id, workoutToEditId)
      ),
    })

    if (exsitingWorkout) {
      return {
        status: "error",
        errors: {
          title: ["Workout with this title already exists."],
        },
        message: `Workout already exists`,
      }
    }

    await db
      .update(workouts)
      .set({
        title,
        description,
        exercises,
      })
      .where(eq(workouts.id, workoutToEditId))

    revalidatePath("/current")

    return {
      status: "success-redirect",
      message: "Workout edited.",
    }
  } catch (error) {
    console.log(error)
    return {
      status: "error",
      message: "Failed to edit a workout...",
    }
  }
}

export async function updateWorkouts({
  id,
  title,
  action,
}: UpdateWorkoutsArgs): Promise<ActionResponse> {
  const { session } = await getAuthSession()
  if (!session) {
    unauthorized()
  }

  try {
    switch (action) {
      case "remove":
        await db.delete(workouts).where(eq(workouts.id, id))

        return {
          status: "success",
          message: `"${title}" workout removed.`,
        }

      case "archive":
        await db.update(workouts).set({ status: "archived" }).where(eq(workouts.id, id))

        return {
          status: "success-redirect",
          message: `"${title}" workout archived.`,
        }

      case "unarchive":
        await db.update(workouts).set({ status: "current" }).where(eq(workouts.id, id))

        return {
          status: "success-redirect",
          message: `"${title}" workout unarchived.`,
        }
    }
  } catch (err) {
    console.error(err)

    return {
      status: "error",
      message: "Failed to update workouts...",
    }
  }
}

export async function submitWorkout({
  doneWorkout,
  duration,
}: SubmitWorkoutArgs): Promise<ActionResponse> {
  const { user } = await getAuthSession()
  if (user === null) {
    unauthorized()
  }

  const isValidWorkout = WorkoutToDoServerSchema.safeParse(doneWorkout)
  if (!isValidWorkout.success) {
    return {
      status: "error",
      message: "Invalid workout data!",
    }
  }

  const { title, description, exercises } = isValidWorkout.data

  try {
    await db.insert(workouts).values({
      userId: user.id,
      title,
      description,
      exercises,
      status: "done",
      duration,
      doneAt: new Date(),
    })

    revalidatePath("/logs")

    return {
      status: "success-redirect",
      message: "Workout submitted",
    }
  } catch (error) {
    console.log(error)
    return {
      status: "error",
      message: "Failed to submit a workout...",
    }
  }
}
