import Link from "next/link";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getWorkoutById } from "@/db/query";
import { editWorkout } from "@/util/actions";
import { type Breadcrumb } from "@/util/types";
import { Breadcrumbs } from "@/components/user/Breadcrumbs";
import { SubmitFormButton } from "@/components/user/SubmitFormButton";

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

  const breadcrumbs: Breadcrumb[] = [
    {
      label: "workouts",
      href: "/workouts",
    },
    {
      label: workout.title,
      href: `/workouts/edit?id=${searchParams.id}`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="rounded-lg bg-white px-4 py-8 shadow-md ring-1 ring-slate-400/30 dark:bg-slate-800">
        <h2 className="text-center text-lg font-semibold">Edit workout</h2>
        <form action={editWorkoutWithId} className="space-y-4 pt-4">
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
              defaultValue={workout.description}
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
            <SubmitFormButton buttonText="Save" />
          </div>
        </form>
      </div>
    </>
  );
}
