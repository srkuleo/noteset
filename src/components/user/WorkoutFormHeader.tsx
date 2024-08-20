import { BackButtonModal } from "../BackButtonModal";
import { AddExerciseDrawer } from "./AddExerciseDrawer";
import { CheckMarkIcon, ThreeDotIcon } from "../icons/user/submit-button";

import type { ExerciseType } from "@/util/types";

export const WorkoutFormHeader = ({
  heading,
  formId,
  updateExercises,
}: {
  heading: string;
  formId: string;
  updateExercises: (newExercise: ExerciseType) => void;
}) => {
  return (
    <div className="flex items-center gap-3 border-b border-slate-300 px-6 py-4 dark:border-slate-800">
      <BackButtonModal className="rounded-full p-1.5 active:bg-slate-200 dark:active:bg-slate-700" />

      <h2 className="text-2xl">{heading}</h2>

      <div className="flex flex-1 items-center justify-end gap-3 group-disabled:pointer-events-none group-disabled:opacity-50">
        <AddExerciseDrawer
          className="rounded-full p-1.5 text-violet-400 active:bg-slate-200 dark:text-violet-400 dark:active:bg-slate-700"
          updateExercises={updateExercises}
        />

        <button
          type="submit"
          form={formId}
          className="inline-flex rounded-full bg-green-500 p-2 text-white shadow-sm active:scale-95 dark:bg-green-600"
        >
          <CheckMarkIcon className="size-[22px] group-disabled:opacity-0" />
          <ThreeDotIcon className="absolute size-[22px] group-enabled:opacity-0" />
        </button>
      </div>
    </div>
  );
};
