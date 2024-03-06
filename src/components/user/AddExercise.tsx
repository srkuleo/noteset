import debounce from "lodash.debounce";
import { useState } from "react";
import { useFormState } from "react-dom";
import { twMerge } from "tailwind-merge";
import * as Dialog from "@radix-ui/react-dialog";
import { AddIcon } from "../icons/user/modify";
import { InputFieldError } from "./InputFieldError";
import { SubmitFormButton } from "./SubmitFormButton";

import {
  type AddExerciseType,
  type ExerciseActionResponse,
  AddExerciseSchema,
} from "@/util/types";

const chooseSets = [1, 2, 3, 4] as const;

const initExercise: AddExerciseType = {
  name: "",
  sets: 0,
  reps: [],
  weights: [],
};

const initialErrors: ExerciseActionResponse = { errors: {}, message: "" };

export const AddExercise = ({
  updateExercises,
}: {
  updateExercises: (newExercise: AddExerciseType) => void;
}) => {
  const [addingExercise, setAddingExercise] = useState(false);
  const [tempExercise, setTempExercise] = useState(initExercise);
  const [state, formAction] = useFormState(createExercise, initialErrors);
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

  function createExercise(): ExerciseActionResponse {
    const isValidExercise = AddExerciseSchema.safeParse({ ...tempExercise });

    if (!isValidExercise.success) {
      console.log(isValidExercise.error.flatten().fieldErrors);
      return { errors: isValidExercise.error.flatten().fieldErrors };
    }

    const validExercise = isValidExercise.data;

    updateExercises(validExercise);
    setTempExercise(initExercise);
    setAddingExercise(false);

    return { message: `${validExercise.name} exercise added!` };
  }

  return (
    <Dialog.Root open={addingExercise} onOpenChange={setAddingExercise}>
      <Dialog.Trigger className="flex items-center gap-1.5 rounded-lg bg-violet-500 p-2 font-manrope text-xs font-semibold text-white focus:outline-none">
        <AddIcon size={20} strokeWidth={1.5} />
        <div className="h-[16px] w-[1px] bg-white" />
        Exercise
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => {
            setTempExercise(initExercise);
            
          }}
          className="fixed inset-0 z-10 bg-slate-900/80 data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/85"
        />

        <Dialog.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          className="fixed inset-x-0 top-8 z-10 px-12 pt-safe-top data-[state=closed]:animate-modal-scale-down data-[state=open]:animate-modal-scale-up"
        >
          <form
            action={formAction}
            className="rounded-xl bg-white pb-8 dark:bg-slate-800 dark:ring-1 dark:ring-slate-700/80"
          >
            <div className="relative rounded-t-xl border-b border-slate-200 bg-slate-100 py-4 dark:border-slate-700/80 dark:bg-slate-900">
              <Dialog.Title className="text-center font-manrope text-lg font-bold ">
                Adding exercise
              </Dialog.Title>
            </div>

            <div className="space-y-4 px-8 pt-8">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="pl-1 text-sm font-semibold uppercase dark:text-slate-200"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="exerciseName"
                    type="text"
                    placeholder="e.g. Bench press"
                    className={twMerge("input-field", "py-2")}
                    onChange={(e) =>
                      setTempExercise({
                        ...tempExercise,
                        name: e.target.value,
                      })
                    }
                  />
                  <InputFieldError errorArr={state.errors?.name} className="gap-3"/>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="sets"
                    className="pl-1 text-sm font-semibold uppercase dark:text-slate-200"
                  >
                    Sets
                  </label>
                  <div className="flex gap-2 overflow-x-scroll p-1 no-scrollbar">
                    {chooseSets.map((sets) => (
                      <button
                        key={sets}
                        type="button"
                        className={twMerge(
                          "rounded-xl bg-slate-200/80 px-6 py-2 font-manrope text-sm ring-1 ring-slate-400/50 dark:bg-slate-900/80 dark:ring-slate-700",
                          tempExercise.sets === sets &&
                            "bg-green-500 text-white dark:bg-green-600 dark:ring-slate-50",
                        )}
                        onClick={() =>
                          setTempExercise({ ...tempExercise, sets: sets })
                        }
                      >
                        {sets}
                      </button>
                    ))}
                    <input
                      id="sets"
                      name="exerciseSets"
                      type="number"
                      inputMode="numeric"
                      placeholder="More..."
                      value={tempExercise.sets > 4 ? tempExercise.sets : ""}
                      className={twMerge("input-field", "max-w-[40%] py-2")}
                      onChange={(e) =>
                        setTempExercise({
                          ...tempExercise,
                          sets: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <InputFieldError errorArr={state.errors?.sets} className="gap-3"/>
                </div>
              </div>

              {reps.length > 0 && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="rep 1"
                      className="flex items-center pl-1 font-manrope text-sm font-semibold uppercase dark:text-slate-200"
                    >
                      Reps
                      <span className="pl-2 text-xs lowercase italic text-slate-400/65 dark:text-slate-500">
                        (eg. 6-8, 10)
                      </span>
                    </label>
                    <div className="flex snap-x snap-proximity gap-2 overflow-x-scroll p-1 no-scrollbar">
                      {reps.map((rep, index) => (
                        <input
                          required
                          key={`Rep: ${rep}`}
                          id={`rep ${rep}`}
                          type="text"
                          placeholder={`Rep ${rep}`}
                          className={twMerge(
                            "input-field",
                            "max-w-[40%] px-0 py-1.5 text-center",
                          )}
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
                      className="flex items-center pl-1 font-manrope text-sm font-semibold uppercase dark:text-slate-200"
                    >
                      Weights
                      <span className="pl-2 text-xs lowercase italic text-slate-400/65 dark:text-slate-500">
                        (number only)
                      </span>
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
                          className={twMerge(
                            "input-field",
                            "max-w-[40%] px-0 py-1.5 text-center",
                          )}
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
                  className="rounded-xl bg-slate-50 px-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-200 dark:bg-white dark:text-slate-600 "
                >
                  Cancel
                </Dialog.Close>
                <SubmitFormButton
                  label="Add"
                  loading="Adding..."
                  className="w-full rounded-xl font-nunito"
                />
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
