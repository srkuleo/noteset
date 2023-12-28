import { type Breadcrumb, Breadcrumbs } from "@/components/user/Breadcrumb";
import { manrope } from "@/styles/fonts";
import { createWorkout } from "@/util/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function CreateWorkoutPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userId = user?.id as string;

  const createWorkoutWithId = createWorkout.bind(null, userId);

  const breadcrumbs: Breadcrumb[] = [
    {
      label: "workouts",
      href: "/workouts",
    },
    {
      label: "create",
      href: "/workouts/create",
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="rounded-lg bg-white p-4 shadow-md ring-1 ring-slate-400/30 dark:bg-slate-800">
        <p className={`pb-6 text-lg font-semibold ${manrope.className}`}>
          Create a new workout
        </p>
        <form action={createWorkoutWithId} className="space-y-4">
          <label className="flex flex-col gap-1">
            <span className="pl-1 text-sm font-semibold uppercase text-slate-400 dark:text-slate-300">
              Title
            </span>
            <input
              type="text"
              name="title"
              placeholder="e.g. Upper 1"
              className="input-field"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="pl-1 text-sm font-semibold uppercase text-slate-400 dark:text-slate-300">
              Description
            </span>
            <input
              type="text"
              name="description"
              placeholder="e.g. Upper body focused workout"
              className="input-field"
            />
          </label>
          <div className="flex items-center justify-end gap-2 pt-4">
            <Link
              href="/workouts"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 active:scale-95 active:bg-slate-100 dark:text-slate-200 active:dark:bg-slate-900/60 "
            >
              Cancel
            </Link>
            <button className="rounded-lg bg-green-500 px-4 py-1.5 font-semibold text-white shadow-sm active:scale-95 dark:bg-green-600">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
