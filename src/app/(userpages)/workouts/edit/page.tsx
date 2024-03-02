import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/db/query";
import { editWorkout } from "@/util/actions";
import { SubmitFormButton } from "@/components/user/SubmitFormButton";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit",
};

export default async function EditWorkoutPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const coercedWorkoutId = Number(searchParams.id);
  const workout = await getWorkoutById(coercedWorkoutId);

  if (!workout) notFound();

  const editWorkoutWithId = editWorkout.bind(null, {
    userId: workout.userId,
    workoutId: coercedWorkoutId,
  });

  return (
    <>
      <h2 className="pb-6 pt-2 text-2xl font-extrabold text-slate-600 dark:text-white">
        Editing {workout.title}
      </h2>
      <form
        action={editWorkoutWithId}
        className="space-y-4 rounded-lg bg-white p-6 shadow-md ring-1 ring-slate-300/50 dark:bg-slate-800 dark:ring-slate-700/70"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="pl-1 text-sm font-semibold uppercase dark:text-slate-300"
          >
            Title
          </label>
          <input
            id="title"
            name="workoutTitle"
            type="text"
            defaultValue={workout.title}
            className="input-field input-focus-ring"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="pl-1 text-sm font-semibold uppercase dark:text-slate-300"
          >
            Description
          </label>
          <input
            id="description"
            name="workoutDescription"
            type="text"
            defaultValue={workout.description || "Description not provided."}
            className="input-field input-focus-ring"
          />
        </div>
        <div className="flex items-center justify-end gap-2 pt-4">
          <Link
            href="/workouts"
            className="rounded-lg px-3 py-2 text-sm font-semibold active:scale-95 active:bg-slate-100 dark:text-slate-200 active:dark:bg-slate-900/60 "
          >
            Cancel
          </Link>
          <SubmitFormButton label="Save" loading="Saving" />
        </div>
      </form>
    </>
  );
}
