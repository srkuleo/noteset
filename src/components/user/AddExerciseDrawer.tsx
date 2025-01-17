import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Drawer } from "vaul";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useExerciseForm } from "@/util/hooks/useExerciseForm";
import {
  BUTTON_TIMEOUT,
  generateRandomId,
  SWIPE_AND_DRAWER_TIMEOUT,
  timeout,
} from "@/util/utils";
import { AddIcon } from "../icons/user/modify";
import {
  NameInput,
  NoteInput,
  SelectSetsInput,
  RepsAndWeightInputs,
} from "./ExerciseInputs";
import { ErrorComponent } from "../ErrorComponent";
import { ModalSubmitButton } from "../SubmitButtons";

import { type ExerciseType, ExerciseSchema } from "@/util/types";

const initExercise: ExerciseType = {
  id: "",
  name: "",
  sets: [],
  note: "",
  lastUpdated: null,
};

export const AddExerciseDrawer = ({
  className,
  updateExercises,
}: {
  className: string;
  updateExercises: (newExercise: ExerciseType) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      direction="top"
      noBodyStyles
      disablePreventScroll
    >
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT);

          setOpen(true);
        }}
        className={className}
      >
        <AddIcon strokeWidth={2} className="size-7" />
        <span className="sr-only">Add Exercise</span>
      </button>

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

            <AddExerciseForm
              updateExercises={updateExercises}
              closeDrawer={() => setOpen(false)}
            />

            <Drawer.Handle
              preventCycle
              className="mt-2 bg-slate-300 dark:bg-slate-600"
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const AddExerciseForm = ({
  updateExercises,
  closeDrawer,
}: {
  updateExercises: (newExercise: ExerciseType) => void;
  closeDrawer: () => void;
}) => {
  const { mutate: createExercise, isPending } = useMutation({
    mutationFn: async (exercise: ExerciseType) => {
      await timeout(SWIPE_AND_DRAWER_TIMEOUT);

      const exerciseWithId: ExerciseType = {
        ...exercise,
        id: generateRandomId(10),
      };

      const isValidExercise = ExerciseSchema.safeParse(exerciseWithId);

      if (!isValidExercise.success) {
        setExerciseFormErrors({
          status: "error",
          errors: isValidExercise.error.flatten().fieldErrors,
          message: "Exercise not added",
        });
        throw isValidExercise.error;
      }

      return isValidExercise.data;
    },
    onSuccess: (validExercise) => {
      const exerciseWithLastUpdatedDate: ExerciseType = {
        ...validExercise,
        lastUpdated: new Date(),
      };
      updateExercises(exerciseWithLastUpdatedDate);
      closeDrawer();
    },
  });
  const {
    tempExercise,
    exerciseFormErrors,
    setExerciseFormErrors,
    handleNameInput,
    handleNoteInput,
    createSets,
    markSetAsWarmup,
    modifySets,
  } = useExerciseForm(initExercise);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        createExercise(tempExercise);
      }}
      className="px-8 py-2"
    >
      <fieldset disabled={isPending} className="group flex flex-col space-y-3">
        <NameInput
          form="add"
          name={tempExercise.name}
          nameError={exerciseFormErrors.errors?.name}
          handleNameInput={handleNameInput}
        />

        <NoteInput
          note={tempExercise.note ?? ""}
          handleNoteInput={handleNoteInput}
        />

        <SelectSetsInput
          sets={tempExercise.sets.length}
          createSets={createSets}
          setsError={exerciseFormErrors.errors?.sets}
        />
      </fieldset>

      <RepsAndWeightInputs
        sets={tempExercise.sets}
        setsErrors={exerciseFormErrors.errors?.sets}
        isPending={isPending}
        markSetAsWarmup={markSetAsWarmup}
        modifySets={modifySets}
      />

      <ErrorComponent
        errorArr={exerciseFormErrors.errors?.sets}
        className={`${isPending && "opacity-50"} pl-1`}
      />

      <div className="flex gap-2 pt-6">
        <button
          type="button"
          disabled={isPending}
          onClick={async () => {
            await timeout(BUTTON_TIMEOUT);

            closeDrawer();
          }}
          className="rounded-xl bg-slate-50 px-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-300/80 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-slate-600 dark:active:bg-slate-300"
        >
          Cancel
        </button>

        <ModalSubmitButton
          pending={isPending}
          label="Add"
          loading="Adding..."
        />
      </div>
    </form>
  );
};
