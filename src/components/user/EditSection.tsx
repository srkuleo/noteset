import Link from "next/link";
import { manrope } from "@/styles/fonts";
import { AddIcon, EditIcon } from "@/icons/user/modify";

export const EditSection = ({
  editMode,
  toggleEditMode,
}: {
  toggleEditMode: () => void;
  editMode: boolean;
}) => {
  return (
    <div className="flex select-none items-center justify-between pb-4">
      <h1
        className={`text-2xl font-extrabold text-slate-600 dark:text-white ${manrope.className}`}
      >
        Workouts
      </h1>
      <div className="flex items-center gap-3">
        <Link
          href="/workouts/create"
          className="rounded-full bg-white p-2 shadow-sm transition active:scale-95 dark:bg-slate-800 dark:ring-1 dark:ring-slate-700"
        >
          <AddIcon height={22} width={22} strokeWidth={2} />
        </Link>

        {editMode ? (
          <button
            className="px-2 font-extrabold text-violet-500 dark:text-violet-400"
            onClick={toggleEditMode}
          >
            Done
          </button>
        ) : (
          <button
            className="rounded-full bg-green-500 p-2 text-white shadow-sm dark:bg-green-600"
            onClick={toggleEditMode}
          >
            {EditIcon}
          </button>
        )}
      </div>
    </div>
  );
};
