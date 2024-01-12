import Link from "next/link";
import { manrope } from "@/styles/fonts";
import { AddWorkoutIcon, EditIcon } from "@/icons/user/modify";

export const EditSection = ({
  toggleEditMode,
}: {
  toggleEditMode: () => void;
}) => {
  return (
    <div className="flex items-center justify-between pb-4">
      <h1
        className={`select-none text-xl font-bold text-slate-600 dark:text-white ${manrope.className}`}
      >
        Your current workouts
      </h1>
      <div className="flex gap-2">
        <Link
          href="/workouts/create"
          className="select-none rounded-xl bg-white p-2 shadow-sm transition active:scale-95 dark:bg-slate-800 dark:ring-1 dark:ring-slate-700"
        >
          {AddWorkoutIcon}
        </Link>
        <button
          onClick={toggleEditMode}
          className="select-none rounded-xl bg-green-500 p-2 text-white shadow-sm transition active:scale-95 dark:bg-green-600"
        >
          {EditIcon}
        </button>
      </div>
    </div>
  );
};
