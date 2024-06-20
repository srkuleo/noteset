import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  AddIcon,
  EditExerciseIcon,
  RemoveExerciseIcon,
} from "../icons/user/modify";
import { AddExerciseForm } from "./AddExerciseForm";
import { EditExerciseForm } from "./EditExerciseForm";
import { RemoveExerciseModal } from "./RemoveExerciseModal";

import type { ExerciseType } from "@/util/types";

export const ExercisesCarousel = ({
  editForm,
  exercises,
  updateExercises,
  editExercises,
  removeExercise,
}: {
  editForm?: boolean;
  exercises: ExerciseType[];
  updateExercises: (newExercise: ExerciseType) => void;
  editExercises: (editedExercise: ExerciseType) => void;
  removeExercise: (id: string) => void;
}) => {
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<ExerciseType>({
    id: "",
    name: "",
    sets: 0,
    reps: [],
    weights: [],
  });

  return (
    <>
      <AddExerciseForm
        isOpen={openAddDrawer}
        setIsOpen={setOpenAddDrawer}
        updateExercises={updateExercises}
      />

      <EditExerciseForm
        isOpen={openEditDrawer}
        setIsOpen={setOpenEditDrawer}
        exercise={currentExercise}
        editExercises={editExercises}
      />

      <RemoveExerciseModal
        isOpen={openRemoveModal}
        setIsOpen={setOpenRemoveModal}
        exerciseName={currentExercise.name}
        removeExercise={() => removeExercise(currentExercise.id)}
        isEditWorkoutPage={editForm}
        openEditDrawer={() => setOpenEditDrawer(true)}
      />

      {exercises.length === 0 ? (
        <div className="pt-4">
          <div className="rounded-xl border-2 border-dashed border-slate-300/80 bg-slate-50 px-4 py-8 dark:border-slate-700 dark:bg-slate-900/40">
            <p className="pb-4 text-center text-sm font-semibold text-slate-400/80 dark:text-slate-500">
              Currently no exercise added.
            </p>
            <div className="flex w-full justify-center focus:outline-none">
              <button
                type="button"
                onClick={() => setOpenAddDrawer(true)}
                className="rounded-full bg-violet-500/90 p-2 text-white shadow-md dark:bg-violet-500"
              >
                <AddIcon size={24} strokeWidth={1.5} />
                <span className="sr-only">Add Exercise</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex w-full justify-center py-2 focus:outline-none">
            <button
              type="button"
              onClick={() => setOpenAddDrawer(true)}
              className="rounded-full bg-violet-500/90 p-2 text-white shadow-md dark:bg-violet-500"
            >
              <AddIcon size={24} strokeWidth={1.5} />
              <span className="sr-only">Add Exercise</span>
            </button>
          </div>

          <div
            className={twMerge(
              "flex snap-x snap-proximity items-start gap-4 overflow-x-scroll px-2 py-4 no-scrollbar",
              exercises.length === 1 && "justify-center",
            )}
          >
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="relative min-w-[95%] snap-center rounded-lg bg-slate-50 p-4 shadow-md ring-1 ring-slate-200 dark:bg-slate-900/50 dark:ring-slate-700"
              >
                <div className="absolute -right-2 -top-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentExercise({ ...exercise });
                      setOpenEditDrawer(true);
                    }}
                    className="rounded-full bg-green-500 p-1.5 text-white shadow-sm dark:bg-green-600"
                  >
                    {EditExerciseIcon}
                    <span className="sr-only">Edit exercise</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentExercise({ ...exercise });
                      setOpenRemoveModal(true);
                    }}
                    className="select-none rounded-full bg-red-500 p-1.5 text-white"
                  >
                    {RemoveExerciseIcon}
                    <span className="sr-only">Remove exercise</span>
                  </button>
                </div>
                <div className="grid grid-cols-exercise gap-2 text-xs">
                  <p className="font-bold italic">Name</p>
                  <p className="text-center font-bold italic">Sets</p>
                  <p className="text-center font-bold italic">Reps</p>
                  <p className="text-center font-bold italic">Weights - kg</p>

                  <div className="col-span-4 h-[1px] bg-slate-200 dark:bg-slate-700" />

                  <p className="my-auto dark:text-slate-200">{exercise.name}</p>
                  <p className="my-auto text-center dark:text-slate-200">
                    {exercise.sets}
                  </p>
                  <div className="flex flex-col items-center justify-center gap-2 dark:text-slate-200">
                    {exercise.reps.map((rep, i) => (
                      <p key={`Rep: ${i + 1}`}>{rep}</p>
                    ))}
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 dark:text-slate-200">
                    {exercise.weights.map((weight, i) => (
                      <p key={`Weight: ${i + 1}`}>{weight}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
