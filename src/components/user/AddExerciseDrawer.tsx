import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Drawer } from "vaul";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import { generateIdFromEntropySize } from "lucia";
import { useExerciseForm } from "@/util/hooks";
import { AddIcon } from "../icons/user/modify";
import {
  NameInput,
  NoteInput,
  RepsInputs,
  SetsInput,
  WeightInputs,
} from "./ExerciseInputs";
import { ModalSubmitButton } from "../SubmitButtons";

import { type ExerciseType, ExerciseSchema } from "@/util/types";

const initExercise: ExerciseType = {
  id: "",
  name: "",
  sets: 0,
  reps: [],
  weights: [],
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
    >
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className={className}
      >
        <AddIcon size={26} strokeWidth={2} />
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
              className="bg-slate-300 dark:bg-slate-600"
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
      await new Promise((resolve) => setTimeout(resolve, 300));

      const exerciseWithId: ExerciseType = {
        ...exercise,
        id: generateIdFromEntropySize(10),
      };

      const isValidExercise = ExerciseSchema.safeParse(exerciseWithId);

      if (!isValidExercise.success) {
        setExerciseFormErrors({
          errors: isValidExercise.error.flatten().fieldErrors,
        });
        throw isValidExercise.error;
      }

      return isValidExercise.data;
    },
    onSuccess: (validExercise) => {
      updateExercises(validExercise);
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
  } = useExerciseForm(initExercise);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        createExercise(tempExercise);
      }}
      className="space-y-6 px-8 py-4"
    >
      <fieldset disabled={isPending} className="group">
        <div className="space-y-3 group-disabled:opacity-50">
          <NameInput
            form="add"
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

      <AnimatePresence>
        {tempExercise.sets !== 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: "auto",
              transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
            }}
            className="space-y-3 overflow-y-hidden"
          >
            <RepsInputs
              form="add"
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
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          disabled={isPending}
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            closeDrawer();
          }}
          className="rounded-xl bg-slate-50 px-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-300 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-slate-600 active:dark:bg-slate-300"
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
