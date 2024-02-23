import Link from "next/link";
import { AddIcon } from "@/icons/user/modify";

export const WorkoutCardsHeader = () => {
  return (
    <div className="flex select-none items-center justify-between pb-4">
      <h2 className="text-2xl font-extrabold text-slate-600 dark:text-white ">
        Workouts
      </h2>
      <div className="flex items-center gap-3">
        <Link
          href="/workouts/create"
          className="rounded-full bg-white p-2 shadow-sm transition active:scale-95 dark:bg-slate-800 dark:ring-1 dark:ring-slate-700"
        >
          <AddIcon height={22} width={22} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
};
