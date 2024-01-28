"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";
import { createWorkout } from "@/util/actions";
import { Drawer } from "vaul";
import { useState } from "react";
import { AddIcon } from "@/icons/user/modify";
import { z } from "zod";
import { manrope } from "@/styles/fonts";

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
  .max(12, { message: "Don't overtrain. Maximum number of sets is 12." });

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

      <Drawer.Root onDrag={reset}>
        <div className="flex justify-center py-4">
          <Drawer.Trigger
            className={`text-sm font-semibold text-violet-500 underline underline-offset-4 focus:outline-none dark:text-violet-400 ${manrope.className}`}
          >
            Add exercise
          </Drawer.Trigger>
        </div>

        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />
          <Drawer.Content className="fixed inset-0 mt-32 flex select-none flex-col rounded-t-modal bg-white focus:outline-none dark:bg-slate-800">
            <div className="rounded-t-modal border-b border-slate-200 bg-slate-100/65 px-2 pb-4 pt-2 dark:border-slate-600 dark:bg-slate-700/20">
              <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-600" />
              <div className="flex items-center justify-center">
                <p className={`font-bold ${manrope.className}`}>Add exercise</p>
                <Drawer.Close
                  onClick={reset}
                  className="absolute right-4 text-lg font-extrabold text-violet-500 focus:outline-none active:text-violet-300 dark:text-violet-400 active:dark:text-violet-600"
                >
                  Close
                </Drawer.Close>
              </div>
            </div>

            <div className="space-y-4 overflow-auto p-8">
              <label className="flex items-center justify-around">
                <span className="text-sm font-semibold uppercase dark:text-slate-300">
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
              <label className="flex items-center justify-around">
                <span className="text-sm font-semibold uppercase dark:text-slate-300">
                  Sets
                </span>
                <input
                  type="number"
                  name="sets"
                  placeholder="e.g. 3"
                  className="input-field"
                  onChange={handleSetInput}
                />
              </label>
              {errMessage && <p>{errMessage}</p>}
              <div className="flex justify-center py-4">
                <button
                  onClick={() => {
                    setShowInputs(true);
                  }}
                  className="flex items-center gap-2 rounded-2xl bg-green-500 px-3 py-1.5 text-xs text-white disabled:pointer-events-none disabled:opacity-30 dark:bg-green-600"
                  disabled={showInputs || reps.length === 0}
                >
                  <AddIcon height={24} width={24} strokeWidth={2.5} />
                  Add reps and weights
                </button>
              </div>
              {showInputs && (
                <div className="flex justify-between">
                  <div className="flex w-32 min-w-0 flex-col">
                    <p>REPS</p>
                    <div className="space-y-4">
                      {reps.map((rep) => (
                        <input
                          key={rep}
                          placeholder={`Rep ${rep}`}
                          className="w-full"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex w-32 min-w-0 flex-col">
                    <p>WEIGHT</p>
                    <div className="space-y-4">
                      {reps.map((weight) => (
                        <input
                          key={weight}
                          placeholder={`Weight ${weight}`}
                          className="w-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Drawer.Close></Drawer.Close>
          </Drawer.Content>
        </Drawer.Portal>
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
