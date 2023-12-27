import { EmptyIcon } from "@/icons/user/error";
import Link from "next/link";

export const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center gap-8 px-4 pt-28">
      <div className="text-slate-400/60 dark:text-slate-700/80">
        {EmptyIcon}
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold dark:text-slate-300">
          Seems like you don&apos;t have any available workouts
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Go to create page and create your first workout
        </p>
      </div>
      <Link
        href="/workouts/create"
        className="rounded-xl bg-violet-500 px-3 py-2 font-semibold text-white shadow-sm  dark:bg-violet-600"
      >
        Create workout
      </Link>
    </div>
  );
};
