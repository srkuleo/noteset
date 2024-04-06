import { useState } from "react";
import { useExerciseForm } from "@/util/hooks";
import * as Dialog from "@radix-ui/react-dialog";
import { AddIcon } from "../icons/user/modify";
import {
  NameInput,
  RepsInputs,
  SetsInput,
  WeightInputs,
} from "./ExerciseInputs";
import { SubmitFormButton } from "./SubmitFormButton";

import { type ExerciseType, AddExerciseSchema } from "@/util/types";

export const AddExerciseForm = ({
  updateExercises,
}: {
  updateExercises: (newExercise: ExerciseType) => void;
}) => {
  const [addingExercise, setAddingExercise] = useState(false);

  return (
    <Dialog.Root open={addingExercise} onOpenChange={setAddingExercise}>
      <Dialog.Trigger className="flex w-full justify-center pt-4 focus:outline-none">
        <div className="rounded-full bg-violet-500/90 p-2 text-white dark:bg-violet-500 dark:text-violet-50 shadow-md">
          <AddIcon size={24} strokeWidth={1.5} />
          <span className="sr-only">Add Exercise</span>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-900/80 data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/85" />

        <Dialog.Content
          //Prevent autofocus on modal opening
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          className="fixed inset-x-0 top-10 z-10 px-12 pt-safe-top outline-none data-[state=closed]:animate-modal-scale-down data-[state=open]:animate-modal-scale-up"
        >
          <div className="rounded-xl bg-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-700/80">
            <div className="rounded-t-xl border-b border-slate-200 bg-slate-100 py-4 dark:border-slate-700/80 dark:bg-slate-900">
              <Dialog.Title className="text-center font-manrope text-lg font-bold">
                Adding exercise
              </Dialog.Title>
            </div>
            <ExerciseForm
              updateExercises={updateExercises}
              afterCreate={() => setAddingExercise(false)}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const initExercise: ExerciseType = {
  name: "",
  sets: 0,
  reps: [],
  weights: [],
};

const ExerciseForm = ({
  updateExercises,
  afterCreate,
}: {
  updateExercises: (newExercise: ExerciseType) => void;
  afterCreate: () => void;
}) => {
  const {
    tempExercise,
    exerciseFormErrors,
    setExerciseFormErrors,
    handleNameInput,
    handleSetsInput,
    handleRepsInput,
    handleWeightInput,
  } = useExerciseForm(initExercise);

  function createExercise() {
    const isValidExercise = AddExerciseSchema.safeParse(tempExercise);

    if (!isValidExercise.success) {
      setExerciseFormErrors({
        errors: isValidExercise.error.flatten().fieldErrors,
      });
      return;
    }

    const validExercise = isValidExercise.data;

    updateExercises(validExercise);
    afterCreate();
  }

  return (
    <form action={createExercise} className="space-y-6 p-8">
      <div className="space-y-3">
        <NameInput
          name={tempExercise.name}
          nameError={exerciseFormErrors.errors?.name}
          handleNameInput={handleNameInput}
        />
        <SetsInput
          sets={tempExercise.sets}
          setsError={exerciseFormErrors.errors?.sets}
          handleSetsInput={handleSetsInput}
        />
      </div>

      {tempExercise.sets !== 0 && (
        <div className="space-y-3">
          <RepsInputs
            form="add"
            reps={tempExercise.reps}
            repsError={exerciseFormErrors.errors?.reps}
            handleRepsInput={handleRepsInput}
          />
          <WeightInputs
            weights={tempExercise.weights}
            handleWeightInput={handleWeightInput}
          />
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Dialog.Close className="rounded-xl bg-slate-50 px-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-200 dark:bg-white dark:text-slate-600">
          Cancel
        </Dialog.Close>
        <SubmitFormButton
          label="Add"
          loading="Adding..."
          className="w-full rounded-xl"
        />
      </div>
    </form>
  );
};
