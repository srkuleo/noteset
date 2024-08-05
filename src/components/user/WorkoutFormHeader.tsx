import Link from "next/link";
import { useState } from "react";
import { AddExerciseDrawer } from "./AddExerciseDrawer";
import { ArrowLeftIcon } from "../icons/arrows";
import { CheckmarkIcon, ThreeDotIcon } from "../icons/user/submit-button";

import type { ExerciseType } from "@/util/types";

export const WorkoutFormHeader = ({
  heading,
  isPending,
  formId,
  updateExercises,
}: {
  heading: string;
  isPending: boolean;
  formId: string;
  updateExercises: (newExercise: ExerciseType) => void;
}) => {
  const [openAddDrawer, setOpenAddDrawer] = useState(false);

  return (
    <div className="flex items-center gap-2.5 border-b border-slate-300 px-6 py-4 dark:border-slate-800 [&>*:nth-child(2)]:mr-auto">
      <Link href="/workouts" className="text-slate-400 dark:text-slate-500">
        {ArrowLeftIcon}
      </Link>

      <h2 className="text-2xl">{heading}</h2>

      <AddExerciseDrawer
        isOpen={openAddDrawer}
        isPending={isPending}
        setIsOpen={setOpenAddDrawer}
        updateExercises={updateExercises}
      />

      <button
        type="submit"
        form={formId}
        disabled={isPending}
        className="rounded-full bg-green-500 p-2 text-white shadow-sm active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-600"
      >
        {isPending ? ThreeDotIcon : <CheckmarkIcon className="size-[22px]" />}
      </button>
    </div>
  );
};
