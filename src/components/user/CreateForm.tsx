"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";
import { createWorkout } from "@/util/actions";
import { Drawer } from "vaul";
import { useState } from "react";
import { AddIcon } from "@/icons/user/modify";
import { z } from "zod";
import { manrope } from "@/styles/fonts";
import { DrawerWrapper } from "./DrawerWrapper";

interface Exercise {
  name: string;
  sets: number;
  reps: string[];
  weight: number[];
}

const initialState: Exercise = {
  name: "",
  sets: 0,
  reps: [],
  weight: [],
};

// const initialExercises = {
//   exercises: [] as Exercise[],
// };

const maxSets = z.coerce
  .number()
  .min(0, { message: "Can't do negative sets." })
  .max(12, { message: "Don't overtrain. Max number of sets is 12." });

export const CreateForm = ({ userId }: { userId: string }) => {
  const [tempExercise, setTempExercise] = useState(initialState);
  // const [exercises, setExercises] = useState(initialExercises);
  const [errMessage, setErrMessage] = useState<string | undefined>("");
  const [showInputs, setShowInputs] = useState(false);

  const reps: number[] = [];
  for (let i = 1; i <= tempExercise.sets; i++) {
    reps.push(i);
  }

  function handleSetInput(e: React.ChangeEvent<HTMLInputElement>) {
    const isValid = maxSets.safeParse(e.target.value);
    console.log(isValid);

    if (isValid.success) {
      if (isValid.data === 0) {
        reset();
      } else {
        setTempExercise({ ...tempExercise, sets: isValid.data });
        setErrMessage("");
      }
    } else {
      setErrMessage(isValid.error.flatten().formErrors[0]);
      setTempExercise(initialState);
      setShowInputs(false);
    }
  }

  function reset() {
    setTempExercise(initialState);
    setErrMessage("");
    setShowInputs(false);
  }

  const createWorkoutWithId = createWorkout.bind(null, userId);

  return (
    <form action={createWorkoutWithId} className="space-y-4 pt-4">
      <label className="flex flex-col gap-1">
        <span className="pl-1 text-sm font-semibold uppercase dark:text-slate-300">
          Title
        </span>
        <input
          type="text"
          name="title"
          placeholder="e.g. Upper 1"
          className="input-field"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="pl-1 text-sm font-semibold uppercase dark:text-slate-300">
          Description
        </span>
        <input
          type="text"
          name="description"
          placeholder="e.g. Upper body focused workout"
          className="input-field"
        />
      </label>

      <Drawer.Root>
        <div className="flex justify-center py-4">
          <Drawer.Trigger
            onClick={reset}
            className={`text-sm font-semibold text-violet-500 underline underline-offset-4 focus:outline-none dark:text-violet-400 ${manrope.className}`}
          >
            Add exercise
          </Drawer.Trigger>
        </div>

        <DrawerWrapper modalTitle="add exercise" closeButtonText="Close">
          <div className="flex flex-col items-center gap-4">
            <label className="flex max-w-[200px] flex-col gap-1">
              <span className="pl-1 text-sm font-semibold uppercase dark:text-slate-200">
                Name
              </span>
              <input
                type="text"
                name="name"
                placeholder="e.g. Bench press"
                className="input-field"
                onChange={(e) =>
                  setTempExercise({ ...tempExercise, name: e.target.value })
                }
              />
            </label>
            <label className="flex max-w-[200px] flex-col gap-1">
              <span className="pl-1 text-sm font-semibold uppercase dark:text-slate-200">
                Sets
              </span>

              <input
                type="number"
                name="sets"
                placeholder="e.g. 3"
                className="input-field"
                onChange={handleSetInput}
              />
              {errMessage && (
                <p className="text-pretty pt-1 text-center text-xs font-semibold text-red-500 dark:text-red-400">
                  {errMessage}
                </p>
              )}
            </label>
          </div>

          <div className="flex justify-center py-6">
            <button
              onClick={() => {
                setShowInputs(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-green-500 px-3 py-1.5 text-xs text-white disabled:pointer-events-none disabled:opacity-30 dark:bg-green-600"
              disabled={showInputs || reps.length === 0}
            >
              <AddIcon height={24} width={24} strokeWidth={2.5} />
              <div className="h-full w-[1px] bg-slate-300" />
              Add reps and weights
            </button>
          </div>

          {showInputs && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex max-w-[80%] gap-12">
                <div className="flex grow flex-col">
                  <p
                    className={`pb-2 text-center text-sm font-semibold ${manrope.className} uppercase dark:text-slate-200`}
                  >
                    Reps
                  </p>
                  <div className="space-y-4">
                    {reps.map((rep) => (
                      <input
                        type="text"
                        key={rep}
                        placeholder={`Rep ${rep}`}
                        className="smaller-input-field"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex grow flex-col">
                  <p
                    className={`pb-2 text-center text-sm font-semibold ${manrope.className} uppercase dark:text-slate-200`}
                  >
                    Weight
                  </p>
                  <div className="space-y-4">
                    {reps.map((weight) => (
                      <input
                        type="number"
                        key={weight}
                        placeholder={`Weight ${weight}`}
                        className="smaller-input-field"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button className="flex shadow-md items-center text-white gap-2 rounded-xl bg-violet-500 px-6 py-1 font-bold">
                Done
              </button>
            </div>
          )}
        </DrawerWrapper>
      </Drawer.Root>

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
      className="rounded-lg bg-green-500 px-4 py-1.5 font-semibold text-white shadow-sm active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-600"
      disabled={pending}
    >
      {pending ? "Creating..." : "Create"}
    </button>
  );
};
