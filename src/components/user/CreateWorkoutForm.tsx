"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useToastNotification, useWorkouts } from "@/util/hooks";
import { createWorkout } from "@/util/actions";
import { AddExerciseForm } from "./AddExerciseForm";
import { EditExerciseForm } from "./EditExerciseForm";
import { RemoveExerciseIcon } from "../icons/user/modify";
import { InputFieldError } from "./InputFieldError";
import { SubmitFormButton } from "./SubmitFormButton";

export const CreateWorkoutForm = ({ userId }: { userId: string }) => {
  const {
    workout,
    createWorkoutRes,
    setWorkout,
    setCreateWorkoutRes,
    updateExercises,
    editExercises,
    removeExercise,
    resetWorkoutForm,
  } = useWorkouts();

  useToastNotification(createWorkoutRes);

  async function clientAction() {
    const res = await createWorkout(userId, workout);

    setCreateWorkoutRes({ ...res });

    if (res.status === "success") {
      resetWorkoutForm();
    }
  }

  return (
    <form
      action={clientAction}
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
          value={workout.title}
          type="text"
          placeholder="e.g. Upper 1"
          className={twMerge(
            "input-field",
            createWorkoutRes.errors?.title && "ring-red-500 dark:ring-red-500",
          )}
          onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
        />
        <InputFieldError
          errorArr={createWorkoutRes.errors?.title}
          className="pl-1"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="flex gap-1 pl-1 text-sm font-semibold uppercase dark:text-slate-200"
        >
          Description
          <span className="text-xs lowercase italic text-slate-400/65 dark:text-slate-500">
            (optional)
          </span>
        </label>
        <input
          id="description"
          value={workout.description}
          type="text"
          placeholder="e.g. Workout for the upper body"
          className="input-field"
          onChange={(e) =>
            setWorkout({ ...workout, description: e.target.value })
          }
        />
      </div>

      <AddExerciseForm updateExercises={updateExercises} />

      {workout.exercises.length > 0 && (
        <div
          className={twMerge(
            "flex snap-x snap-proximity items-start gap-4 overflow-x-scroll px-2 py-4 no-scrollbar",
            workout.exercises.length === 1 && "justify-center",
          )}
        >
          {workout.exercises.map((exercise, index) => (
            <div
              key={exercise.name}
              className="relative min-w-[95%] snap-center rounded-lg bg-slate-50 p-4 shadow-md ring-1 ring-slate-200 dark:bg-slate-900/50 dark:ring-slate-700"
            >
              <div className="absolute -right-2 -top-4 flex gap-3">
                <EditExerciseForm
                  exercise={exercise}
                  exerciseIndex={index}
                  editExercises={editExercises}
                />
                <button
                  className="rounded-full bg-red-500 p-1.5 text-white"
                  onClick={() => removeExercise(index)}
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
        errorArr={createWorkoutRes.errors?.exercises}
        className="justify-center py-4"
      />

      <div
        className={twMerge(
          "flex justify-end gap-2",
          workout.exercises.length === 0 &&
            !createWorkoutRes.errors?.exercises &&
            "pt-4",
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
