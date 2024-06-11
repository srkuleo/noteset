import Link from "next/link";
import { EditWorkoutIcon, RemoveWorkoutIcon } from "../icons/user/modify";

import type { Workout } from "@/db/schema";

export const EditSection = ({
  workout,
  setOpenRemoveModal,
  setWorkoutToRemove,
}: {
  workout: Workout;
  setOpenRemoveModal: (isOpen: boolean) => void;
  setWorkoutToRemove: (workout: { title: string; id: number }) => void;
}) => {
  return (
    <div className="flex select-none items-center gap-2">
      <Link
        href={`/workouts/edit?id=${workout.id}`}
        className="rounded-full p-1.5 text-green-500 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600"
      >
        {EditWorkoutIcon}
        <span className="sr-only">Edit exercise</span>
      </Link>

      <button
        onClick={() => {
          setWorkoutToRemove({ id: workout.id, title: workout.title });
          setOpenRemoveModal(true);
        }}
        className="rounded-full p-1.5 text-red-500 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:text-red-400 dark:shadow-slate-900 dark:ring-slate-600"
      >
        {RemoveWorkoutIcon}
        <span className="sr-only">Remove exercise</span>
      </button>
    </div>
  );
};
