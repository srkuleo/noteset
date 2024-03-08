import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useExerciseForm } from "@/util/hooks";
import * as Dialog from "@radix-ui/react-dialog";
import { EditIcon } from "../icons/user/modify";
import { InputFieldError } from "./InputFieldError";
import { SubmitFormButton } from "./SubmitFormButton";

import { AddExerciseSchema, type ExerciseType } from "@/util/types";

export const EditExerciseForm = ({
  exercise,
  exerciseIndex,
  editExercises,
}: {
  exercise: ExerciseType;
  exerciseIndex: number;
  editExercises: (editedExercise: ExerciseType, index: number) => void;
}) => {
  const initExercise = { ...exercise };
  const [isEditing, setIsEditing] = useState(false);
  const {
    chooseSets,
    tempExercise,
    needMoreSets,
    exerciseFormErrors,
    setTempExercise,
    setNeedMoreSets,
    setExerciseFormErrors,
    handleSetsInput,
    handleRepsInput,
    handleWeightInput,
  } = useExerciseForm(initExercise);

  function editExercise() {
    const isValidExercise = AddExerciseSchema.safeParse({ ...tempExercise });

    if (!isValidExercise.success) {
      setExerciseFormErrors({
        errors: isValidExercise.error.flatten().fieldErrors,
      });
      return;
    }

    const validExercise = isValidExercise.data;

    editExercises(validExercise, exerciseIndex);
    setIsEditing(false);
  }

  return (
    <Dialog.Root open={isEditing} onOpenChange={setIsEditing}>
      <Dialog.Trigger className="absolute -right-2 -top-3">
        <div className="rounded-full bg-green-500 p-1.5 text-white dark:bg-green-600">
          {EditIcon}
          <span className="sr-only">Edit exercise</span>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-900/80 data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/85" />

        <Dialog.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          className="fixed inset-x-0 top-8 z-10 px-12 pt-safe-top data-[state=closed]:animate-modal-scale-down data-[state=open]:animate-modal-scale-up"
        >
          <form
            action={editExercise}
            className="rounded-xl bg-white pb-8 dark:bg-slate-800 dark:ring-1 dark:ring-slate-700/80"
          >
            <div className="relative rounded-t-xl border-b border-slate-200 bg-slate-100 py-4 dark:border-slate-700/80 dark:bg-slate-900">
              <Dialog.Title className="text-center font-manrope text-lg font-bold ">
                Editing {initExercise.name}
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
                    value={tempExercise.name}
                    placeholder="e.g. Bench press"
                    className={twMerge("input-field", "py-2")}
                    onChange={(e) =>
                      setTempExercise({
                        ...tempExercise,
                        name: e.target.value,
                      })
                    }
                  />
                  <InputFieldError
                    errorArr={exerciseFormErrors.errors?.name}
                    className="gap-3"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={needMoreSets ? "setsInput" : "Set 1"}
                    className="pl-1 text-sm font-semibold uppercase dark:text-slate-200"
                  >
                    Sets
                  </label>
                  {needMoreSets ? (
                    <div className="space-x-4 pb-[6px]">
                      <input
                        autoFocus
                        id="setsInput"
                        name="sets"
                        type="number"
                        inputMode="numeric"
                        placeholder="More..."
                        value={tempExercise.sets === 0 ? "" : tempExercise.sets}
                        className={twMerge("input-field", "max-w-[40%] py-2")}
                        onChange={(e) => handleSetsInput(e.target.value)}
                      />
                      <button
                        type="button"
                        className="text-sm font-semibold"
                        onClick={() => setNeedMoreSets(false)}
                      >
                        Back
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 overflow-x-scroll p-1 no-scrollbar">
                      {chooseSets.map((sets) => (
                        <button
                          key={sets}
                          id={`Set ${sets}`}
                          type="button"
                          className={twMerge(
                            "rounded-xl bg-slate-200/80 px-6 py-2 font-manrope text-sm ring-1 ring-slate-400/50 dark:bg-slate-900/80 dark:ring-slate-700",
                            tempExercise.sets === sets &&
                              "bg-green-500 text-white dark:bg-green-600 dark:ring-slate-50",
                          )}
                          onClick={() => handleSetsInput(sets)}
                        >
                          {sets}
                        </button>
                      ))}
                      <button
                        type="button"
                        className="min-w-fit text-sm font-semibold pl-2"
                        onClick={() => setNeedMoreSets(true)}
                      >
                        More sets
                      </button>
                    </div>
                  )}
                  <InputFieldError
                    errorArr={exerciseFormErrors.errors?.sets}
                    className="gap-3"
                  />
                </div>
              </div>

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
                    {tempExercise.reps.map((rep, index) => (
                      <input
                        autoFocus={index === 0}
                        required
                        key={`Rep: ${index + 1}`}
                        id={`rep ${index + 1}`}
                        type="text"
                        value={rep}
                        placeholder={`Rep ${index + 1}`}
                        className={twMerge(
                          "input-field",
                          "max-w-[40%] px-0 py-1.5 text-center",
                        )}
                        onChange={(e) => handleRepsInput(e.target.value, index)}
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
                    {tempExercise.weights.map((weight, index) => (
                      <input
                        required
                        key={`Weight: ${index + 1}`}
                        id={`weight ${index + 1}`}
                        value={weight === 0 ? "" : weight}
                        type="number"
                        inputMode="numeric"
                        placeholder={`Weight ${index + 1}`}
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

              <div className="flex gap-2 pt-4">
                <Dialog.Close className="rounded-xl bg-slate-50 px-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-200 dark:bg-white dark:text-slate-600 ">
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
