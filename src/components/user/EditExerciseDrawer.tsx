import { Drawer } from "vaul";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useExerciseForm } from "@/util/hooks";
import {
  NameInput,
  NoteInput,
  RepsInputs,
  SetsInput,
  WeightInputs,
} from "./ExerciseInputs";
import { SubmitFormButton } from "../SubmitButtons";

import { ExerciseSchema, type ExerciseType } from "@/util/types";

export const EditExerciseDrawer = ({
  isOpen,
  exercise,
  setIsOpen,
  editExercises,
}: {
  isOpen: boolean;
  exercise: ExerciseType;
  setIsOpen: (isOpen: boolean) => void;
  editExercises: (editedExercise: ExerciseType) => void;
}) => {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      direction="top"
      noBodyStyles
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-xs dark:bg-slate-950/85" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-[9999] px-2 focus:outline-none"
        >
          <div className="rounded-b-modal bg-slate-100 pb-2 pt-safe-top dark:bg-slate-800 dark:ring-1 dark:ring-slate-700/80">
            <VisuallyHidden asChild>
              <Drawer.Title>Adding new exercise</Drawer.Title>
            </VisuallyHidden>

            <EditExerciseForm
              exercise={exercise}
              editExercises={editExercises}
              closeDrawer={() => setIsOpen(false)}
            />
            <Drawer.Handle
              preventCycle
              className="bg-slate-400/60 dark:bg-slate-600"
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const EditExerciseForm = ({
  exercise,
  editExercises,
  closeDrawer,
}: {
  exercise: ExerciseType;
  editExercises: (editedExercise: ExerciseType) => void;
  closeDrawer: () => void;
}) => {
  const initExercise = { ...exercise };
  const {
    tempExercise,
    exerciseFormErrors,
    setExerciseFormErrors,
    handleNameInput,
    handleNoteInput,
    handleSetsInput,
    handleRepsInput,
    handleWeightInput,
  } = useExerciseForm(initExercise);

  async function editExercise() {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const isValidExercise = ExerciseSchema.safeParse({ ...tempExercise });

    if (!isValidExercise.success) {
      setExerciseFormErrors({
        errors: isValidExercise.error.flatten().fieldErrors,
      });
      return;
    }

    const validExercise = isValidExercise.data;

    editExercises(validExercise);
    closeDrawer();
  }

  return (
    <form
      id="edit-exercise-form"
      action={editExercise}
      onSubmit={(e) => {
        e.stopPropagation();
      }}
      className="space-y-6 px-8 py-4"
    >
      <div className="space-y-3">
        <NameInput
          name={tempExercise.name}
          nameError={exerciseFormErrors.errors?.name}
          handleNameInput={handleNameInput}
        />

        <NoteInput note={tempExercise.note} handleNoteInput={handleNoteInput} />

        <SetsInput
          sets={tempExercise.sets}
          setsError={exerciseFormErrors.errors?.sets}
          handleSetsInput={handleSetsInput}
        />
      </div>

      <div className="space-y-3">
        <RepsInputs
          reps={tempExercise.reps}
          repsError={exerciseFormErrors.errors?.reps}
          handleRepsInput={handleRepsInput}
        />

        <WeightInputs
          weights={tempExercise.weights}
          weightsError={exerciseFormErrors.errors?.weights}
          handleWeightInput={handleWeightInput}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            closeDrawer();
          }}
          className="rounded-xl bg-slate-50 px-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-200 active:bg-slate-200 dark:bg-white dark:text-slate-600 active:dark:bg-slate-300"
        >
          Cancel
        </button>

        <SubmitFormButton
          form="edit-exercise-form"
          label="Save"
          loading="Saving..."
          className="w-full rounded-xl font-nunito"
        />
      </div>
    </form>
  );
};
