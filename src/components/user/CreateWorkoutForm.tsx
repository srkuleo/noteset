"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useToastNotification, useWorkouts } from "@/util/hooks";
import { AddExerciseForm } from "./AddExerciseForm";
import { SubmitFormButton } from "./SubmitFormButton";
import { InputFieldError } from "./InputFieldError";
import { EditExerciseForm } from "./EditExerciseForm";

export const CreateWorkoutForm = ({ userId }: { userId: string }) => {
  const {
    formState,
    formAction,
    exercises,
    formRef,
    updateExercises,
    editExercises,
  } = useWorkouts(userId);

  useToastNotification(formState);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 rounded-lg bg-white p-6 shadow-md ring-1 ring-slate-300/50 dark:bg-slate-800 dark:ring-slate-700/70"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="pl-1 text-sm font-semibold uppercase dark:text-slate-200"
        >
          Title
        </label>
        <input
          id="title"
          name="workoutTitle"
          type="text"
          placeholder="e.g. Upper 1"
          className={twMerge(
            "input-field",
            formState.errors?.title && "ring-red-500 dark:ring-red-500",
          )}
        />
        <InputFieldError errorArr={formState.errors?.title} className="pl-1" />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="pl-1 text-sm font-semibold uppercase dark:text-slate-200"
        >
          Description
        </label>
        <input
          id="description"
          name="workoutDescription"
          type="text"
          placeholder="e.g. Workout for the upper body"
          className="input-field"
        />
      </div>

      <AddExerciseForm updateExercises={updateExercises} />

      {exercises.length > 0 && (
        <div
          className={twMerge(
            "flex snap-x snap-proximity items-start gap-4 overflow-x-scroll px-2 py-4 no-scrollbar",
            exercises.length === 1 && "justify-center",
          )}
        >
          {exercises.map((exercise, index) => (
            <div
              key={exercise.name}
              className="relative min-w-[95%] snap-center rounded-lg bg-slate-50 p-4 shadow-md ring-1 ring-slate-200 dark:bg-slate-900/50 dark:ring-slate-700"
            >
              <EditExerciseForm
                exercise={exercise}
                exerciseIndex={index}
                editExercises={editExercises}
              />
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
                <div className="flex grow flex-col items-center justify-center gap-2 dark:text-slate-200">
                  {exercise.reps.map((rep, i) => (
                    <p key={`Rep: ${i + 1}`}>{rep}</p>
                  ))}
                </div>
                <div className="flex grow flex-col items-center justify-center gap-2 dark:text-slate-200">
                  {exercise.weights.map((weight, i) => (
                    <p key={`Weight: ${i + 1}`}>{weight}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <InputFieldError
        errorArr={formState.errors?.exercises}
        className="justify-center py-4"
      />

      <div
        className={twMerge(
          "flex justify-end gap-2",
          exercises.length === 0 && !formState.errors?.exercises && "pt-4",
        )}
      >
        <Link
          href="/workouts"
          className="rounded-lg px-3 py-2 text-sm font-semibold active:scale-95 active:bg-slate-100 dark:text-slate-200 active:dark:bg-slate-900/60 "
        >
          Cancel
        </Link>
        <SubmitFormButton label="Create" loading="Creating..." />
      </div>
    </form>
  );
};
