"use client";

import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Drawer } from "vaul";
import { ThemeButton } from "../ThemeButton";
import { ArrowLeftIcon } from "../icons/arrows";
import { AddIcon } from "../icons/user/modify";

import type { FetchedWorkout } from "@/db/schema";
import type { ExerciseType, WorkoutType } from "@/util/types";

export const WorkoutForm = ({
  fetchedWorkout,
}: {
  fetchedWorkout: FetchedWorkout;
}) => {
  const [fetchedExercises, setFetchedExercises] = useState(
    fetchedWorkout.exercises,
  );
  const [currWorkout, setCurrWorkout] = useState<WorkoutType>({
    id: fetchedWorkout.id,
    userId: fetchedWorkout.userId,
    title: fetchedWorkout.title,
    description: fetchedWorkout.description,
    exercises: [...fetchedWorkout.exercises],
    status: "done",
    timeElapsed: "",
  });

  function handleRepsInput(
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseId: string,
    inputIndex: number,
  ) {
    const modifiedExercises = currWorkout.exercises.map(
      (exercise): ExerciseType =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              reps: exercise.reps.toSpliced(inputIndex, 1, event.target.value),
            }
          : exercise,
    );

    setCurrWorkout((prev) => {
      return { ...prev, exercises: modifiedExercises };
    });
  }

  function handleWeightInput(
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseId: string,
    inputIndex: number,
  ) {
    const modifiedExercises = currWorkout.exercises.map(
      (exercise): ExerciseType =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              weights: exercise.weights.toSpliced(
                inputIndex,
                1,
                event.target.value,
              ),
            }
          : exercise,
    );

    setCurrWorkout((prev) => {
      return { ...prev, exercises: modifiedExercises };
    });
  }

  function addNewSet(exerciseId: string) {
    const modifiedFetchedExercises = fetchedExercises.map(
      (exercise): ExerciseType =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets + 1,
              reps: [...exercise.reps, ""],
              weights: [...exercise.weights, ""],
            }
          : exercise,
    );

    const modifiedCurrExercises = currWorkout.exercises.map(
      (exercise): ExerciseType =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets + 1,
              reps: [...exercise.reps, ""],
              weights: [...exercise.weights, ""],
            }
          : exercise,
    );

    setFetchedExercises(modifiedFetchedExercises);
    setCurrWorkout((prev) => {
      return { ...prev, exercises: modifiedCurrExercises };
    });
  }

  console.log(currWorkout.exercises);

  return (
    <form
      action={() => {
        console.log("submited");
      }}
      className="flex h-full flex-col"
    >
      <header className="bg-gradient-to-r from-green-600 from-20% to-violet-600 pt-safe-top dark:from-green-700 dark:to-violet-700">
        <div className="flex items-center gap-3 px-4 py-3 font-manrope">
          <BackButton />
          <p className="text-xl uppercase text-white">{currWorkout.title}</p>
          <ThemeButton />
        </div>
      </header>

      <main className="flex flex-col divide-y divide-slate-300 overflow-auto overscroll-contain px-6 dark:divide-slate-800">
        {fetchedExercises.map((exercise) => (
          <div key={exercise.id} className="flex flex-col py-6">
            <p className="text-2xl font-bold">{exercise.name}</p>

            <div className="flex justify-evenly py-6">
              <div className="flex w-1/3 flex-col items-center gap-3">
                <label
                  htmlFor={`${exercise.name} - rep 1`}
                  className="font-manrope text-xs font-semibold uppercase dark:text-slate-300"
                >
                  Reps
                </label>
                {exercise.reps.map((rep, i) => (
                  <input
                    key={`${exercise.name} - rep ${i + 1}`}
                    id={`${exercise.name} - rep ${i + 1}`}
                    placeholder={rep}
                    onChange={(e) => {
                      handleRepsInput(e, exercise.id, i);
                    }}
                    className={twMerge(
                      "input-field w-full py-1.5 text-center caret-violet-500 focus:ring-violet-500 dark:caret-violet-500 dark:focus:ring-violet-500",
                    )}
                  />
                ))}
              </div>

              <div className="flex w-1/3 flex-col items-center gap-3">
                <label
                  htmlFor={`${exercise.name} - weight 1`}
                  className="font-manrope text-xs font-semibold uppercase dark:text-slate-300"
                >
                  Weights - kg
                </label>
                {exercise.weights.map((weight, i) => (
                  <input
                    key={`${exercise.name} - weight ${i + 1}`}
                    id={`${exercise.name} - weight ${i + 1}`}
                    type="text"
                    placeholder={weight}
                    onChange={(e) => {
                      handleWeightInput(e, exercise.id, i);
                    }}
                    className={twMerge(
                      "input-field w-full py-1.5 text-center caret-violet-500 focus:ring-violet-500 dark:caret-violet-500 dark:focus:ring-violet-500",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-500/85 dark:text-slate-400">
              <button
                type="button"
                onClick={() => addNewSet(exercise.id)}
                className="flex w-[45%] items-center justify-center gap-1 rounded-xl py-2 active:scale-95 active:bg-slate-300 dark:active:bg-slate-800"
              >
                <AddIcon size={20} strokeWidth={1.2} />
                <p className="text-[16px] font-semibold uppercase">Add set</p>
              </button>

              <div className="h-6 w-[1px] bg-slate-300 dark:bg-slate-800" />

              <input
                id={`${exercise.name} comment`}
                type="text"
                placeholder="Add comment"
                className="w-[45%] rounded-none bg-transparent px-2 py-0.5 text-[16px] text-slate-700 placeholder-slate-500/85 caret-violet-500 placeholder:font-semibold placeholder:uppercase focus:border-b-2 focus:border-violet-500 focus:outline-none dark:text-white dark:placeholder-slate-400"
              />
            </div>
          </div>
        ))}
      </main>
      <footer className="flex items-center justify-between border-t border-slate-300/80 px-8 pb-7 pt-3 dark:border-slate-800">
        <p>Timer</p>
        <button
          type="submit"
          className="font-manrope text-xl font-extrabold text-green-500 dark:text-green-600"
        >
          Done
        </button>
      </footer>
    </form>
  );
};

const BackButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles>
      <Drawer.Trigger className="px-2 py-2 text-white active:rounded-full active:bg-slate-200 dark:active:bg-slate-700">
        {ArrowLeftIcon}

        <p className="sr-only">Logout button</p>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col gap-3 rounded-modal bg-slate-50/90 text-center dark:bg-slate-700/70">
            <Drawer.Title className="px-2 pb-2 pt-5 text-sm font-semibold">
              Are you sure you want to leave? Any provided data will be lost.
            </Drawer.Title>

            <Link
              href="/workouts"
              className="w-full rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-green-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-green-500/75 dark:border-slate-600 active:dark:bg-slate-600/90 disabled:dark:bg-slate-900/75 disabled:dark:text-green-800"
            >
              Back to Home page
            </Link>
          </div>

          <button
            onClick={async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));
              setOpen(false);
            }}
            className="w-full rounded-modal bg-white p-3 text-xl font-bold text-violet-500 focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
