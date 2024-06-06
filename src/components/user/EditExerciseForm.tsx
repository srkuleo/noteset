import { useState } from "react";
import { useExerciseForm } from "@/util/hooks";
import { Drawer } from "vaul";
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
    <Drawer.Root open={isEditing} onOpenChange={setIsEditing} direction="top">
      <Drawer.Trigger>
        <div className="rounded-full bg-green-500 p-1.5 text-white shadow-sm dark:bg-green-600">
          {EditExerciseIcon}
          <span className="sr-only">Edit exercise</span>
        </div>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs dark:bg-slate-950/85" />

        <Drawer.Content className="fixed inset-x-0 top-0 px-4 focus:outline-none">
          <div className="rounded-b-xl bg-white pt-safe-top dark:bg-slate-800 dark:ring-1 dark:ring-slate-700/80">
            <ExerciseForm
              exercise={exercise}
              exerciseIndex={exerciseIndex}
              editExercises={editExercises}
              closeModal={() => setIsEditing(false)}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const ExerciseForm = ({
  exercise,
  exerciseIndex,
  editExercises,
  closeModal,
}: {
  exercise: ExerciseType;
  exerciseIndex: number;
  editExercises: (editedExercise: ExerciseType, index: number) => void;
  closeModal: () => void;
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
    closeModal();
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
        <button
          type="button"
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            closeModal();
          }}
          className="rounded-xl bg-slate-50 px-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-200 active:bg-slate-200 dark:bg-white dark:text-slate-600 active:dark:bg-slate-300"
        >
          Cancel
        </button>
        <SubmitFormButton
          label="Add"
          loading="Adding..."
          className="w-full rounded-xl font-nunito"
        />
      </div>
    </form>
  );
};
