import debounce from "lodash.debounce";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { AddIcon } from "../icons/user/modify";

import type { Exercise } from "@/util/types";

const chooseSets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const initExercise: Exercise = {
  name: "",
  sets: 0,
  reps: [],
  weights: [],
};

export const ExerciseForm = ({
  updateExercises,
}: {
  updateExercises: (newExercise: Exercise) => void;
}) => {
  const [addingExercise, setAddingExercise] = useState(false);
  const [tempExercise, setTempExercise] = useState(initExercise);
  const reps: number[] = [];

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

  function createExercise(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateExercises(tempExercise);
    setTempExercise(initExercise);
    setAddingExercise(false);
  }

  return (
    <Dialog.Root open={addingExercise} onOpenChange={setAddingExercise}>
      <Dialog.Trigger className="flex items-center gap-2 font-manrope text-xs font-semibold focus:outline-none">
        <div className="rounded-full bg-violet-500 p-1 text-white dark:bg-violet-400">
          <AddIcon size={20} strokeWidth={1.5} />
        </div>
        Exercise
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => {
            setTempExercise(initExercise);
          }}
          className="fixed inset-0 z-10 bg-slate-900/80 dark:bg-slate-950/85"
        />

        <Dialog.Content className="fixed inset-x-0 top-8 z-10 px-12 pt-safe-top">
          <form
            onSubmit={createExercise}
            className="rounded-xl bg-white pb-4 dark:bg-slate-800 dark:ring-1 dark:ring-slate-700/80"
          >
            <div className="relative rounded-t-xl border-b border-slate-200 bg-slate-100 py-4 dark:border-slate-700/80 dark:bg-slate-900">
              <Dialog.Title className="text-center font-manrope text-lg font-bold ">
                Adding exercise
              </Dialog.Title>
            </div>

            <div className="space-y-4 px-4 pt-4">
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
                      setTempExercise({
                        ...tempExercise,
                        name: e.target.value,
                      })
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
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="rep 1"
                      className="pl-1 font-manrope text-sm font-semibold uppercase dark:text-slate-200"
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
                      className="pl-1 font-manrope text-sm font-semibold uppercase dark:text-slate-200"
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
              )}

              <div className="flex gap-2 pt-4">
                <Dialog.Close
                  onClick={() => setTempExercise(initExercise)}
                  className="rounded-xl bg-slate-50 ring-1 ring-inset ring-slate-200 px-4 text-sm font-semibold shadow-sm dark:bg-white dark:text-slate-600 "
                >
                  Cancel
                </Dialog.Close>
                <button
                  type="submit"
                  className="flex grow justify-center rounded-xl bg-green-500 px-6 py-1.5 text-lg font-bold text-white shadow-md dark:bg-green-600"
                >
                  Done
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
