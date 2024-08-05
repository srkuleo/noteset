import { Drawer } from "vaul";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import { generateIdFromEntropySize } from "lucia";
import { useExerciseForm } from "@/util/hooks";
import { AddIcon } from "../icons/user/modify";
import {
  NameInput,
  RepsInputs,
  SetsInput,
  WeightInputs,
} from "./ExerciseInputs";
import { SubmitFormButton } from "../SubmitButtons";

import { type ExerciseType, AddExerciseSchema } from "@/util/types";

const initExercise: ExerciseType = {
  id: "",
  name: "",
  sets: 0,
  reps: [],
  weights: [],
};

export const AddExerciseDrawer = ({
  isOpen,
  isPending,
  setIsOpen,
  updateExercises,
}: {
  isOpen: boolean;
  isPending: boolean;
  setIsOpen: (isOpen: boolean) => void;
  updateExercises: (newExercise: ExerciseType) => void;
}) => {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      direction="top"
      noBodyStyles
    >
      <Drawer.Trigger
        disabled={isPending}
        className="rounded-full p-2 text-violet-400 focus:outline-none active:bg-slate-200 disabled:opacity-50 dark:text-violet-400 active:dark:bg-slate-700"
      >
        <AddIcon size={26} strokeWidth={2} />
        <span className="sr-only">Add Exercise</span>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-xs dark:bg-slate-950/85" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-[9999] px-2 focus:outline-none"
        >
          <div className="rounded-b-modal bg-slate-200 pb-2 pt-safe-top dark:bg-slate-800 dark:ring-1 dark:ring-slate-700/80">
            <VisuallyHidden asChild>
              <Drawer.Title>Adding new exercise</Drawer.Title>
            </VisuallyHidden>

            <AddExerciseForm
              updateExercises={updateExercises}
              closeDrawer={() => setIsOpen(false)}
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
    const exerciseWithId: ExerciseType = {
      ...tempExercise,
      id: generateIdFromEntropySize(10),
    };
    const isValidExercise = AddExerciseSchema.safeParse(exerciseWithId);

    if (!isValidExercise.success) {
      setExerciseFormErrors({
        errors: isValidExercise.error.flatten().fieldErrors,
      });
      return;
    }

    const validExercise = isValidExercise.data;

    updateExercises(validExercise);
    closeDrawer();
  }

  return (
    <form action={createExercise} className="space-y-6 px-8 py-4">
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
              handleRepsInput={handleRepsInput}
            />
            <WeightInputs
              weights={tempExercise.weights}
              weightsError={exerciseFormErrors.errors?.weights}
              handleWeightInput={handleWeightInput}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            closeDrawer();
          }}
          className="rounded-xl bg-slate-50 px-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-300 active:bg-slate-200 dark:bg-white dark:text-slate-600 active:dark:bg-slate-300"
        >
          Cancel
        </button>
        <SubmitFormButton
          label="Add"
          loading="Adding..."
          className="w-full rounded-xl"
        />
      </div>
    </form>
  );
};
