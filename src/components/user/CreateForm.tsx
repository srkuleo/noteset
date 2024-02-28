"use client";

import Link from "next/link";
import debounce from "lodash.debounce";
import { useState } from "react";
import { useFormState } from "react-dom";
import { type Exercise } from "@/util/types";
import { createWorkout } from "@/util/actions";
import { SubmitFormButton } from "./SubmitFormButton";
import * as Dialog from "@radix-ui/react-dialog";

const chooseSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const CreateForm = ({ userId }: { userId: string }) => {
  const initExercise: Exercise = {
    name: "",
    sets: 0,
    reps: [],
    weights: [],
  };
  const initFormErrors = { errors: {}, message: "" };
  const reps: number[] = [];
  const [addingExercise, setAddingExercise] = useState(false);
  const [tempExercise, setTempExercise] = useState(initExercise);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const bindedCreateWorkout = createWorkout.bind(null, userId, exercises);
  const [state, formAction] = useFormState(bindedCreateWorkout, initFormErrors);

  for (let i = 1; i <= tempExercise.sets; i++) {
    reps.push(i);
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
    <>
      <form
        action={formAction}
        className="space-y-4 rounded-lg bg-white px-4 py-4 shadow-md ring-1 ring-slate-400/30 dark:bg-slate-800"
      >
        <h2 className="text-center text-lg font-semibold">
          Create a new workout
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="pl-1 text-sm font-semibold uppercase dark:text-slate-300"
          >
            Title
          </label>
          <input
            id="title"
            name="workoutTitle"
            type="text"
            placeholder="e.g. Upper 1"
            className={`${state.errors?.title ? "input-error-ring" : "input-focus-ring"} input-field`}
          />
          {state.errors?.title &&
            state.errors.title.map((error) => (
              <p
                key={error}
                className="pl-1 text-sm font-semibold text-red-500 dark:text-red-400"
              >
                {error}
              </p>
            ))}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="pl-1 text-sm font-semibold uppercase dark:text-slate-300"
          >
            Description
          </label>
          <input
            id="description"
            name="workoutDescription"
            type="text"
            placeholder="e.g. Upper 1"
            className={`${state.errors?.description ? "input-error-ring" : "input-focus-ring"} input-field`}
          />
          {state.errors?.description &&
            state.errors.description.map((error) => (
              <p
                key={error}
                className="pl-1 text-sm font-semibold text-red-500 dark:text-red-400"
              >
                {error}
              </p>
            ))}
        </div>

        <div
          className={`${exercises.length === 0 && "pb-4"} flex justify-center pt-4`}
        >
          <div
            onClick={() => {
              setAddingExercise(true);
            }}
            className="font-manrope text-sm font-semibold text-violet-500 underline underline-offset-4 focus:outline-none dark:text-violet-400"
          >
            Add exercise
          </div>
        </div>

        {exercises.length > 0 && (
          <div
            className={`${exercises.length === 1 && "justify-center"} flex snap-x snap-proximity items-start gap-4 overflow-x-scroll px-2 py-4 no-scrollbar`}
          >
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
              className="py-4 text-center text-sm font-semibold text-red-500 dark:text-red-400"
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
          <SubmitFormButton buttonText="Create" />
        </div>
        {state.message && (
          <p className="py-2 text-right text-sm font-semibold text-red-500 dark:text-red-400">
            {state.message}
          </p>
        )}
      </form>

      {addingExercise && (
        <Dialog.Root open={true} onOpenChange={setAddingExercise}>
          <Dialog.Overlay
            onClick={() => {
              setTempExercise(initExercise);
            }}
            className="fixed inset-0 z-10 bg-slate-900/80 dark:bg-slate-950/70"
          />

          <Dialog.Content className="fixed inset-x-0 top-8 z-10 px-4 pt-safe-top">
            <form
              action=""
              className="space-y-8 rounded-xl bg-white p-6 dark:bg-slate-800 dark:ring-1 dark:ring-slate-700/80"
            >
              <Dialog.Title className="text-center font-manrope text-lg font-bold">
                Adding exercise
              </Dialog.Title>

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="pl-1 text-sm font-semibold uppercase dark:text-slate-300"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="exerciseName"
                    type="text"
                    placeholder="e.g. Bench press"
                    className="input-field input-focus-ring"
                    onChange={(e) =>
                      setTempExercise({ ...tempExercise, name: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="sets"
                    className="pl-1 text-sm font-semibold uppercase dark:text-slate-300"
                  >
                    Sets
                  </label>
                  <select
                    name="exerciseSets"
                    id="sets"
                    defaultValue=""
                    required
                    className="peer rounded-xl bg-slate-50 px-4 py-3 shadow-sm outline-none ring-1 ring-slate-200 invalid:text-sm invalid:italic invalid:text-slate-100/80 focus:ring-2 focus:ring-green-500 dark:bg-slate-900/40 dark:ring-slate-700 invalid:dark:text-slate-500  focus:dark:ring-green-600"
                    onChange={(e) => {
                      setTempExercise({
                        ...tempExercise,
                        sets: Number(e.target.value),
                      });
                    }}
                  >
                    <option
                      value=""
                      disabled
                      className="text-sm font-semibold italic "
                    >
                      Choose a number
                    </option>

                    {chooseSets.map((set) => (
                      <option
                        key={set}
                        value={set}
                        className="font-manrope font-bold text-slate-500 dark:text-white"
                      >
                        {set}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {reps.length > 0 && (
                <div className="space-y-12">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="rep 1"
                        className="font-manrope text-sm font-semibold uppercase dark:text-slate-200"
                      >
                        Reps
                      </label>
                      <div className="flex snap-x snap-proximity gap-2 overflow-x-scroll p-1 no-scrollbar">
                        {reps.map((rep, index) => (
                          <input
                            required
                            key={`Rep: ${rep}`}
                            id={`rep ${rep}`}
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

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="weight 1"
                        className="font-manrope text-sm font-semibold uppercase dark:text-slate-200"
                      >
                        Weights
                      </label>
                      <div className="flex snap-x snap-proximity gap-2 overflow-x-scroll p-1 no-scrollbar">
                        {reps.map((weight, index) => (
                          <input
                            required
                            key={`Weight: ${weight}`}
                            id={`weight ${weight}`}
                            type="number"
                            inputMode="numeric"
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
                      setTempExercise(initExercise);
                      setAddingExercise(false);
                    }}
                    className="flex w-full justify-center gap-2 rounded-xl bg-green-500 px-6 py-2 text-lg font-bold text-white shadow-md dark:bg-green-600"
                  >
                    Done
                  </button>
                </div>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
};
