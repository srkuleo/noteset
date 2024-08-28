import { useMutation } from "@tanstack/react-query";
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
import { ModalSubmitButton } from "../SubmitButtons";

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
  const { mutate: editExercise, isPending } = useMutation({
    mutationFn: async (exercise: ExerciseType) => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const isValidExercise = ExerciseSchema.safeParse(exercise);

      if (!isValidExercise.success) {
        setExerciseFormErrors({
          errors: isValidExercise.error.flatten().fieldErrors,
        });
        throw isValidExercise.error;
      }

      return isValidExercise.data;
    },
    onSuccess: (validExercise) => {
      editExercises(validExercise);
      closeDrawer();
    },
  });
  const {
    tempExercise,
    exerciseFormErrors,
    setExerciseFormErrors,
    handleNameInput,
    handleNoteInput,
    handleSetsInput,
    handleRepsInput,
    handleWeightInput,
  } = useExerciseForm({ ...exercise });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        editExercise({ ...tempExercise });
      }}
      className="space-y-6 px-8 py-4"
    >
      <fieldset disabled={isPending} className="group">
        <div className="space-y-3 group-disabled:opacity-50">
          <NameInput
            name={tempExercise.name}
            nameError={exerciseFormErrors.errors?.name}
            handleNameInput={handleNameInput}
          />

          <NoteInput
            note={tempExercise.note}
            handleNoteInput={handleNoteInput}
          />

          <SetsInput
            sets={tempExercise.sets}
            setsError={exerciseFormErrors.errors?.sets}
            handleSetsInput={handleSetsInput}
          />
        </div>
      </fieldset>

      <div className="space-y-3">
        <RepsInputs
          reps={tempExercise.reps}
          repsError={exerciseFormErrors.errors?.reps}
          isPending={isPending}
          handleRepsInput={handleRepsInput}
        />

        <WeightInputs
          weights={tempExercise.weights}
          weightsError={exerciseFormErrors.errors?.weights}
          isPending={isPending}
          handleWeightInput={handleWeightInput}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          disabled={isPending}
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            closeDrawer();
          }}
          className="rounded-xl bg-slate-50 px-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-200 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-slate-600 active:dark:bg-slate-300"
        >
          Cancel
        </button>

        <ModalSubmitButton
          pending={isPending}
          label="Save"
          loading="Saving..."
        />
      </div>
    </form>
  );
};
