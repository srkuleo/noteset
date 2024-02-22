"use client";

import Link from "next/link";
import { manrope } from "@/styles/fonts";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { Drawer } from "vaul";
import { validateSets, type Exercise } from "@/util/types";
import { createWorkout } from "@/util/actions";
import { DrawerWrapper } from "./DrawerWrapper";
import debounce from "lodash.debounce";

export const CreateForm = ({ userId }: { userId: string }) => {
  const initExercise: Exercise = {
    name: "",
    sets: 0,
    reps: [],
    weights: [],
  };
  const initFormErrors = { errors: {}, message: "" };
  const initSetsError: { message: string | undefined } = { message: "" };
  const reps: number[] = [];
  const [openExerciseModal, setOpenExerciseModal] = useState(false);
  const [tempExercise, setTempExercise] = useState(initExercise);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const bindedCreateWorkout = createWorkout.bind(null, userId, exercises);
  const [state, formAction] = useFormState(bindedCreateWorkout, initFormErrors);
  const [setsError, setSetsError] = useState(initSetsError);

  for (let i = 1; i <= tempExercise.sets; i++) {
    reps.push(i);
  }

  function handleSetsInput(sets: string) {
    const areValidSets = validateSets.safeParse(sets);

    if (!areValidSets.success) {
      setSetsError({ message: areValidSets.error.flatten().formErrors[0] });
      return;
    }

    const validSets = areValidSets.data;

    setTempExercise({ ...tempExercise, sets: validSets });
    setSetsError({ message: "" });
  }

  const handleRepRangeInput = debounce((repRange: string, index: number) => {
    const modifiedReps = tempExercise.reps.toSpliced(index, 1, repRange);

    console.log(modifiedReps);

    setTempExercise({ ...tempExercise, reps: [...modifiedReps] });
  }, 500);

  const handleWeightInput = debounce((weight: string, index: number) => {
    const coercedWeight = Number(weight);

    const modifiedWeights = tempExercise.weights.toSpliced(
      index,
      1,
      coercedWeight,
    );

    console.log(modifiedWeights);

    setTempExercise({ ...tempExercise, weights: [...modifiedWeights] });
  }, 300);

  return (
    <form action={formAction} className="space-y-4 pt-4">
      <label className="flex flex-col gap-1">
        <span className="pl-1 text-sm font-semibold uppercase dark:text-slate-300">
          Title
        </span>
        <input
          type="text"
          name="title"
          placeholder="e.g. Upper 1"
          className={`${state.errors?.title ? "input-error-ring" : "input-focus-ring"} input-field`}
        />
        {state.errors?.title &&
          state.errors.title.map((error) => (
            <p
              key={error}
              className="pl-1 pt-1 text-sm font-semibold text-red-500 dark:text-red-400"
            >
              {error}
            </p>
          ))}
      </label>

      <label className="flex flex-col gap-1">
        <span className="pl-1 text-sm font-semibold uppercase dark:text-slate-300">
          Description
        </span>
        <input
          type="text"
          name="description"
          placeholder="e.g. Upper body focused workout"
          className={`${state.errors?.description ? "input-error-ring" : "input-focus-ring"} input-field`}
        />
        {state.errors?.description &&
          state.errors.description.map((error) => (
            <p
              key={error}
              className="pl-1 pt-1 text-sm font-semibold text-red-500 dark:text-red-400"
            >
              {error}
            </p>
          ))}
      </label>

      <Drawer.Root open={openExerciseModal} onOpenChange={setOpenExerciseModal}>
        <div className="flex justify-center pt-4">
          <Drawer.Trigger
            onClick={() => {
              setTempExercise(initExercise);
              setSetsError({ message: "" });
            }}
            className={`text-sm font-semibold text-violet-500 underline underline-offset-4 focus:outline-none dark:text-violet-400 ${manrope.className}`}
          >
            Add exercise
          </Drawer.Trigger>
        </div>

        <DrawerWrapper modalTitle="add exercise" closeButtonText="Close">
          <form className="space-y-8">
            <div className="flex flex-col items-center gap-4">
              <label className="flex max-w-[200px] flex-col gap-1">
                <span className="pl-1 text-sm font-semibold uppercase text-slate-500 dark:text-slate-200">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Bench press"
                  className={`input-focus-ring input-field`}
                  onChange={(e) =>
                    setTempExercise({ ...tempExercise, name: e.target.value })
                  }
                />
              </label>

              <label className="flex max-w-[200px] flex-col gap-1">
                <span className="pl-1 text-sm font-semibold uppercase text-slate-500 dark:text-slate-200">
                  Sets
                </span>
                <input
                  type="number"
                  name="sets"
                  placeholder="e.g. 3"
                  className="input-focus-ring input-field"
                  inputMode="numeric"
                  onChange={(e) => handleSetsInput(e.target.value)}
                />
                {setsError.message && (
                  <p className="pt-2 text-center text-sm text-red-500 dark:text-red-400 ">
                    {setsError.message}
                  </p>
                )}
              </label>
            </div>

            {reps.length > 0 && !setsError.message && (
              <div className="mx-auto flex max-w-[75%] flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <p
                      className={`text-sm font-semibold ${manrope.className} uppercase dark:text-slate-200`}
                    >
                      Reps
                    </p>
                    <div className="flex snap-x snap-proximity gap-2 overflow-x-scroll p-1 no-scrollbar">
                      {reps.map((rep, index) => (
                        <input
                          required
                          key={`Rep: ${rep}`}
                          type="text"
                          placeholder={`Rep ${rep}`}
                          className="smaller-input-field"
                          pattern="^[0-9]+[-][0-9]+$|[0-9]+"
                          onChange={(e) =>
                            handleRepRangeInput(e.target.value, index)
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex grow flex-col">
                    <p
                      className={`text-sm font-semibold ${manrope.className} uppercase dark:text-slate-200`}
                    >
                      Weights
                    </p>
                    <div className="flex snap-x snap-proximity gap-2 overflow-x-scroll p-1 no-scrollbar">
                      {reps.map((weight, index) => (
                        <input
                          required
                          key={`Weight: ${weight}`}
                          type="number"
                          placeholder={`Weight ${weight}`}
                          className="smaller-input-field"
                          onChange={(e) =>
                            handleWeightInput(e.target.value, index)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setExercises([...exercises, { ...tempExercise }]);
                    setOpenExerciseModal(false);
                  }}
                  className="flex justify-center gap-2 rounded-xl bg-green-500 px-6  py-2 text-lg font-bold text-white shadow-md dark:bg-green-600"
                >
                  Done
                </button>
              </div>
            )}
          </form>
        </DrawerWrapper>
      </Drawer.Root>

      {exercises.length > 0 && (
        <div className="flex snap-x snap-proximity items-start gap-4 overflow-x-scroll px-2 py-4 no-scrollbar">
          {exercises.map((exercise) => (
            <div
              key={exercise.name}
              className="min-w-[95%] snap-center rounded-lg bg-slate-50 p-4 shadow-md ring-1 ring-slate-200 dark:bg-slate-900/50 dark:ring-slate-700"
            >
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
                <div className="flex grow flex-col items-center gap-2 dark:text-slate-200">
                  {exercise.reps.map((rep, i) => (
                    <p key={`Rep: ${i + 1}`}>{rep}</p>
                  ))}
                </div>
                <div className="flex grow flex-col items-center gap-2 dark:text-slate-200">
                  {exercise.weights.map((weight, i) => (
                    <p key={`Weight: ${i + 1}`}>{weight}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {state.errors?.exercises &&
        state.errors.exercises.map((error) => (
          <p
            key={error}
            className="py-4 text-center font-semibold text-red-500 dark:text-red-400"
          >
            {error}
          </p>
        ))}

      <div className="flex items-center justify-end gap-2">
        <Link
          href="/workouts"
          className="rounded-lg px-3 py-2 text-sm font-semibold active:scale-95 active:bg-slate-100 dark:text-slate-200 active:dark:bg-slate-900/60 "
        >
          Cancel
        </Link>
        <CreateButton />
      </div>
    </form>
  );
};

const CreateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-green-500 px-4 py-1.5 font-semibold text-white shadow-sm active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-600"
    >
      {pending ? "Creating..." : "Create"}
    </button>
  );
};
