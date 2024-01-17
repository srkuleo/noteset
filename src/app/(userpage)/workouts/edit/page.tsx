import { manrope } from "@/styles/fonts";
import type { Metadata } from "next";
import Link from "next/link";
import { getWorkoutById } from "@/db/query";
import { notFound } from "next/navigation";
import { type Breadcrumb, Breadcrumbs } from "@/components/user/Breadcrumbs";
import { editWorkout } from "@/util/actions";

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
        <p className={`text-center text-lg font-semibold ${manrope.className}`}>
          Edit workout
        </p>
        <form action={editWorkoutWithId} className="space-y-4 pt-4">
          <label className="flex flex-col gap-1">
            <span className="pl-1 text-sm font-semibold uppercase dark:text-slate-300">
              Title
            </span>
            <input
              type="text"
              name="title"
              defaultValue={workout.title}
              className="input-field"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="pl-1 text-sm font-semibold uppercase dark:text-slate-300">
              Description
            </span>
            <input
              type="text"
              name="description"
              defaultValue={workout.description}
              className="input-field"
            />
          </label>
          <div className="flex items-center justify-end gap-2 pt-4">
            <Link
              href="/workouts"
              className="rounded-lg px-3 py-2 text-sm font-semibold active:scale-95 active:bg-slate-100 dark:text-slate-200 active:dark:bg-slate-900/60 "
            >
              Cancel
            </Link>
            <button className="rounded-lg bg-green-500 px-4 py-1.5 font-semibold text-white shadow-sm active:scale-95 dark:bg-green-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
