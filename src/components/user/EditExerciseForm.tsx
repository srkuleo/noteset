import { useState } from "react";
import { useExerciseForm } from "@/util/hooks";
import * as Dialog from "@radix-ui/react-dialog";
import { EditExerciseIcon } from "../icons/user/modify";
import {
  NameInput,
  RepsInputs,
  SetsInput,
  WeightInputs,
} from "./ExerciseInputs";
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
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Dialog.Root open={isEditing} onOpenChange={setIsEditing}>
      <Dialog.Trigger>
        <div className="rounded-full bg-green-500 p-1.5 text-white dark:bg-green-600 shadow-sm">
          {EditExerciseIcon}
          <span className="sr-only">Edit exercise</span>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-900/80 data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/85" />

        <Dialog.Content
          //Prevent autofocus on modal opening
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          className="fixed inset-x-0 top-8 z-10 px-12 pt-safe-top data-[state=closed]:animate-modal-scale-down data-[state=open]:animate-modal-scale-up"
        >
          <div className="rounded-xl bg-white dark:bg-slate-800 dark:ring-1 dark:ring-slate-700/80">
            <div className="rounded-t-xl border-b border-slate-200 bg-slate-100 py-4 dark:border-slate-700/80 dark:bg-slate-900">
              <Dialog.Title className="text-center font-manrope text-lg font-bold ">
                Editing {exercise.name}
              </Dialog.Title>
            </div>
            <ExerciseForm
              exercise={exercise}
              exerciseIndex={exerciseIndex}
              editExercises={editExercises}
              afterEdit={() => setIsEditing(false)}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const ExerciseForm = ({
  exercise,
  exerciseIndex,
  editExercises,
  afterEdit,
}: {
  exercise: ExerciseType;
  exerciseIndex: number;
  editExercises: (editedExercise: ExerciseType, index: number) => void;
  afterEdit: () => void;
}) => {
  const initExercise = { ...exercise };
  const {
    tempExercise,
    exerciseFormErrors,
    setExerciseFormErrors,
    handleNameInput,
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
    afterEdit();
  }

  return (
    <form action={editExercise} className="space-y-6 p-8">
      <div className="space-y-3">
        <NameInput
          name={tempExercise.name}
          nameError={exerciseFormErrors.errors?.name}
          handleNameInput={handleNameInput}
        />
        <SetsInput
          sets={tempExercise.sets}
          handleSetsInput={handleSetsInput}
          setsError={exerciseFormErrors.errors?.sets}
        />
      </div>

      <div className="space-y-3">
        <RepsInputs
          form="edit"
          reps={tempExercise.reps}
          repsError={exerciseFormErrors.errors?.reps}
          handleRepsInput={handleRepsInput}
        />
        <WeightInputs
          weights={tempExercise.weights}
          handleWeightInput={handleWeightInput}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Dialog.Close className="rounded-xl bg-slate-50 px-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-200 dark:bg-white dark:text-slate-600 ">
          Cancel
        </Dialog.Close>
        <SubmitFormButton
          label="Add"
          loading="Adding..."
          className="w-full rounded-xl font-nunito"
        />
      </div>
    </form>
  );
};
