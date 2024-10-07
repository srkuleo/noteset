import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { Drawer } from "vaul";
import { AddIcon } from "../icons/user/modify";
import { ErrorComponent } from "../ErrorComponent";

import {
  SetSchema,
  type ExerciseToDoType,
  type SetWithoutId,
} from "@/util/types";
import { ModalSubmitButton } from "../SubmitButtons";

export const AddNewSetButton = ({
  exercise,
  removeMode,
  addNewSet,
}: {
  exercise: ExerciseToDoType;
  removeMode: boolean;
  addNewSet: (exerciseId: string, setData: SetWithoutId) => void;
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
        disabled={removeMode || exercise.done}
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className="mx-auto flex w-fit items-center gap-1 rounded-lg px-3 py-[5px] text-sm font-bold active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-100 dark:active:bg-slate-800"
      >
        <AddIcon size={20} strokeWidth={1.7} />
        <p className="font-bold uppercase">Add set</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-xs dark:bg-slate-950/85" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-[9999] px-2 focus:outline-none"
        >
          <div className="rounded-b-modal bg-slate-200 pt-safe-top dark:bg-slate-800 dark:ring-1 dark:ring-slate-700/80">
            <div className="border-b border-b-slate-300 px-8 py-4 dark:border-b-slate-700">
              <Drawer.Title className="font-manrope text-xl text-slate-800">
                Adding new set
              </Drawer.Title>
            </div>

            <AddSetForm
              exercise={exercise}
              addNewSet={addNewSet}
              closeDrawer={() => setOpen(false)}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const AddSetForm = ({
  exercise,
  addNewSet,
  closeDrawer,
}: {
  exercise: ExerciseToDoType;
  addNewSet: (exerciseId: string, setData: SetWithoutId) => void;
  closeDrawer: () => void;
}) => {
  const {
    mutate: clientAction,
    data: error,
    isPending,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const isValidSet = SetSchema.pick({
        reps: true,
        weight: true,
        warmup: true,
      }).safeParse({
        reps: formData.get("reps"),
        weight: formData.get("weight"),
        warmup: Boolean(formData.get("warmup-set")),
      });

      if (!isValidSet.success) {
        return isValidSet.error.flatten().fieldErrors;
      }

      addNewSet(exercise.id, isValidSet.data);
      closeDrawer();
    },
  });

  return (
    <form
      id="add-new-set"
      action={clientAction}
      className="rounded-b-modal bg-white px-8 py-4 dark:bg-slate-600"
    >
      <fieldset disabled={isPending} className="group flex flex-col space-y-8">
        <div className="flex items-center gap-2 group-disabled:pointer-events-none group-disabled:opacity-50">
          <label
            htmlFor="warmup-set"
            className="font-semibold uppercase dark:text-slate-400"
          >
            Warmup Set
          </label>

          <input
            type="checkbox"
            name="warmup-set"
            id="warmup-set"
            className="accent-green-500"
          />
        </div>

        <div className="space-y-2 group-disabled:opacity-50">
          <div className="flex justify-evenly">
            <input
              required
              disabled={isPending}
              id="reps"
              name="reps"
              type="text"
              placeholder="Reps"
              className={twMerge(
                "input-field",
                "w-1/3 py-2 text-center",
                error?.reps && "ring-red-500 dark:ring-red-500",
              )}
            />

            <input
              required
              disabled={isPending}
              id="weight"
              name="weight"
              type="text"
              inputMode="decimal"
              placeholder="Weight"
              className={twMerge(
                "input-field",
                "w-1/3 py-2 text-center",
                error?.weight && "ring-red-500 dark:ring-red-500",
              )}
            />
          </div>

          {(error?.reps || error?.weight) && (
            <div className="space-y-2">
              <ErrorComponent errorArr={error?.reps} />
              <ErrorComponent errorArr={error?.weight} />
            </div>
          )}
        </div>

        <ModalSubmitButton
          label="Add"
          loading="Adding..."
          pending={isPending}
          form="add-new-set"
        />
      </fieldset>

      <Drawer.Handle
        preventCycle
        className="mt-4 bg-slate-300 dark:bg-slate-600"
      />
    </form>
  );
};
