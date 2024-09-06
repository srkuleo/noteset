"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Drawer } from "vaul";
import { useWorkoutToDo, useWorkoutDuration } from "@/util/hooks";
import { submitDoneWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { BackButtonModal } from "../BackButtonModal";
import { WorkoutToDoTooltip } from "../Tooltips";
import {
  AddIcon,
  RemoveExerciseIcon,
  TrashBinIcon,
} from "../icons/user/modify";
import { AddExerciseDrawer } from "../user/AddExerciseDrawer";

import type { CreateWorkoutType, ExerciseType } from "@/util/types";

export const WorkoutToDoForm = ({
  workoutToDo,
}: {
  workoutToDo: CreateWorkoutType;
}) => {
  const {
    currWorkout,
    placeholderExercises,
    removeMode,
    handleNoteInput,
    handleSetsInput,
    addNewSet,
    removeSet,
    updateExercises,
    enterRemoveMode,
    resetChangesInRemoveMode,
    saveChangesInRemoveMode,
  } = useWorkoutToDo(workoutToDo);
  const { endWorkout, calcWorkoutDuration } = useWorkoutDuration();
  const [openDoneModal, setOpenDoneModal] = useState(false);
  const router = useRouter();

  async function clientAction() {
    const workoutDuration = calcWorkoutDuration();

    const res = await submitDoneWorkout(currWorkout, workoutDuration);

    if (res.status === "success-redirect") {
      router.push(`/post-workout?workoutTitle=${currWorkout.title}`);
    }

    if (res.status === "error") {
      showToast(res.message);
    }

    setOpenDoneModal(false);
  }

  return (
    <form
      id="submit-done-workout"
      action={clientAction}
      className="flex h-full flex-col"
    >
      <header className="bg-gradient-to-r from-green-600 from-20% to-violet-600 pt-safe-top dark:from-green-700 dark:to-violet-700">
        <div className="flex items-center gap-3 px-4 py-2 [&>*:nth-child(2)]:mr-auto [&>*:nth-child(3)]:mr-2">
          <BackButtonModal className="mr-4 rounded-full p-1.5 text-white active:bg-slate-300/60 dark:active:bg-slate-300/50" />

          <p className="font-manrope text-xl uppercase text-white">
            {currWorkout.title}
          </p>

          <WorkoutToDoTooltip />
        </div>
      </header>

      <main className="flex flex-col divide-y divide-slate-300 overflow-auto overscroll-contain px-6 dark:divide-slate-800">
        {currWorkout.exercises.map((exercise, exerciseIndex) => (
          <div key={exercise.id} className="flex flex-col py-6">
            <p className="pb-1 text-2xl font-bold">{exercise.name}</p>

            <NoteSection
              exercise={exercise}
              removeMode={removeMode}
              handleNoteInput={handleNoteInput}
            />

            <div className="py-8">
              <div className="flex justify-evenly pb-3 text-center">
                <label
                  htmlFor={`${exercise.name} - rep 1`}
                  className="w-1/3 font-manrope text-xs font-semibold uppercase dark:text-slate-300"
                >
                  Reps
                </label>

                <label
                  htmlFor={`${exercise.name} - weight 1`}
                  className="w-1/3 font-manrope text-xs font-semibold uppercase dark:text-slate-300"
                >
                  Weights - kg
                </label>
              </div>

              <AnimatePresence initial={false}>
                {exercise.sets.map((set, setIndex) => (
                  <motion.div
                    key={set.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{
                      opacity: { duration: 0.2, ease: [0.36, 0.66, 0.04, 1] },
                      height: {
                        duration: 0.4,
                        ease: [0.36, 0.66, 0.04, 1],
                      },
                    }}
                  >
                    <div
                      className={`flex items-center justify-evenly ${setIndex !== exercise.sets.length - 1 ? "pb-3" : "pb-0"}`}
                    >
                      <input
                        type="text"
                        name="reps"
                        disabled={removeMode}
                        inputMode="tel"
                        placeholder={
                          placeholderExercises[exerciseIndex]?.sets[setIndex]
                            ?.reps
                        }
                        onChange={(e) => {
                          handleSetsInput(e, exercise.id, set.id);
                        }}
                        className="input-field w-1/3 py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:opacity-60 dark:caret-violet-500 dark:focus:ring-violet-500"
                      />

                      <input
                        type="text"
                        name="weight"
                        disabled={removeMode}
                        inputMode="decimal"
                        placeholder={
                          placeholderExercises[exerciseIndex]?.sets[setIndex]
                            ?.weight
                        }
                        onChange={(e) => {
                          handleSetsInput(e, exercise.id, set.id);
                        }}
                        className="input-field w-1/3 py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:opacity-60 dark:caret-violet-500 dark:focus:ring-violet-500"
                      />

                      {removeMode && (
                        <motion.div
                          key={`remove-set-btn-${set.id}`}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              duration: 0.3,
                              ease: [0.36, 0.66, 0.04, 1],
                            },
                          }}
                          exit={{
                            opacity: 0,
                            x: 16,
                            transition: {
                              duration: 0.15,
                              ease: [0.36, 0.66, 0.04, 1],
                            },
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => removeSet(exercise.id, set.id)}
                            className="rounded-full bg-red-500 p-1.5 text-white"
                          >
                            {RemoveExerciseIcon}
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button
              type="button"
              disabled={removeMode}
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));

                addNewSet(exercise.id);
              }}
              className="mx-auto flex w-fit items-center gap-1 rounded-lg px-3 py-[5px] text-sm font-bold active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-300 dark:active:bg-slate-800"
            >
              <AddIcon size={20} strokeWidth={1.2} />
              <p className="font-semibold uppercase">Add set</p>
            </button>
          </div>
        ))}
      </main>

      <footer className="border-t border-slate-300/80 px-6 pb-6 pt-2 text-end dark:border-slate-800">
        <AnimatePresence mode="wait" initial={false}>
          {removeMode ? (
            <motion.div
              key="remove-mode-footer"
              initial={{ opacity: 0, x: 24 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
              }}
              exit={{
                opacity: 0,
                x: -24,
                transition: { duration: 0.15, ease: [0.36, 0.66, 0.04, 1] },
              }}
              className="flex items-center justify-between"
            >
              <button
                type="button"
                onClick={resetChangesInRemoveMode}
                className="rounded-lg px-2.5 py-1 text-lg font-semibold active:scale-95 active:bg-slate-200 dark:text-slate-300 dark:active:bg-slate-700"
              >
                Close
                <p className="sr-only">Close Remove mode</p>
              </button>

              <button
                type="button"
                onClick={saveChangesInRemoveMode}
                className="my-[3px] rounded-lg px-2.5 py-1 text-xl font-bold text-green-500 active:scale-95 active:bg-slate-200 dark:text-green-600 dark:active:bg-slate-700"
              >
                Save
                <p className="sr-only">Save changes in Remove mode</p>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form-footer"
              initial={{ opacity: 0, x: 24 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
              }}
              exit={{
                opacity: 0,
                x: -24,
                transition: { duration: 0.15, ease: [0.36, 0.66, 0.04, 1] },
              }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <AddExerciseDrawer
                  updateExercises={updateExercises}
                  className="rounded-full p-2 text-slate-400 active:scale-95 active:bg-slate-200 dark:text-slate-300 dark:active:bg-slate-700"
                />

                <button
                  type="button"
                  onClick={enterRemoveMode}
                  className="rounded-full p-2 text-red-500 active:bg-slate-200 dark:active:bg-slate-700"
                >
                  <TrashBinIcon className="size-6" strokeWidth={1.8} />
                  <p className="sr-only">Enter Remove mode</p>
                </button>
              </div>

              <DoneButton
                formId="submit-done-workout"
                open={openDoneModal}
                setOpen={setOpenDoneModal}
                endWorkout={endWorkout}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </form>
  );
};

type NoteType = { add: boolean; onExercise: string };

const NoteSection = ({
  exercise,
  removeMode,
  handleNoteInput,
}: {
  exercise: ExerciseType;
  removeMode: boolean;
  handleNoteInput: (
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseId: string,
  ) => void;
}) => {
  const [note, setNote] = useState<NoteType>({ add: false, onExercise: "" });

  return (
    <AnimatePresence mode="wait" initial={false}>
      {note.add && note.onExercise === exercise.id ? (
        <motion.div
          key="editing-note"
          initial={{ opacity: 0, x: 16 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.3,
              ease: [0.36, 0.66, 0.04, 1],
            },
          }}
          exit={{
            opacity: 0,
            x: -16,
            transition: {
              duration: 0.15,
              ease: [0.36, 0.66, 0.04, 1],
            },
          }}
          className="flex gap-2"
        >
          <input
            autoFocus
            id="note"
            type="text"
            disabled={removeMode}
            value={exercise.note ?? ""}
            placeholder="Leave a note..."
            onChange={(e) => handleNoteInput(e, exercise.id)}
            className="w-full rounded-none border-b-2 border-violet-500 bg-transparent py-0.5 font-semibold placeholder-slate-400/80 caret-violet-500 placeholder:text-sm placeholder:italic focus:placeholder-slate-300 focus:outline-none disabled:opacity-30 dark:text-white dark:placeholder-slate-500 dark:focus:placeholder-slate-700"
          />

          <button
            type="button"
            disabled={removeMode}
            onClick={async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));
              setNote({ add: false, onExercise: exercise.id });
            }}
            className="rounded-lg px-4 font-manrope font-bold text-blue-400 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-blue-500 dark:active:bg-slate-800"
          >
            Done
          </button>
        </motion.div>
      ) : exercise.note ? (
        <motion.div
          key="edit-note"
          initial={{ opacity: 0, x: 16 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.3,
              ease: [0.36, 0.66, 0.04, 1],
            },
          }}
          exit={{
            opacity: 0,
            x: -16,
            transition: {
              duration: 0.15,
              ease: [0.36, 0.66, 0.04, 1],
            },
          }}
          className="flex items-center justify-between gap-2"
        >
          <p className="py-0.5 font-semibold italic text-slate-400 dark:text-slate-400">
            {exercise.note}
          </p>

          <button
            type="button"
            disabled={removeMode}
            onClick={async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));

              setNote({
                onExercise: exercise.id,
                add: true,
              });
            }}
            className="rounded-lg px-4 py-[3px] font-manrope font-bold text-green-500 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-green-600 dark:active:bg-slate-800"
          >
            Edit
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="add-note"
          initial={{ opacity: 0, x: 16 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.3,
              ease: [0.36, 0.66, 0.04, 1],
            },
          }}
          exit={{
            opacity: 0,
            x: -16,
            transition: {
              duration: 0.15,
              ease: [0.36, 0.66, 0.04, 1],
            },
          }}
          className="flex justify-end"
        >
          <button
            type="button"
            disabled={removeMode}
            onClick={async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));

              setNote({
                onExercise: exercise.id,
                add: true,
              });
            }}
            className="rounded-lg px-4 py-[7px] font-manrope font-bold leading-none text-green-500 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-green-600 dark:active:bg-slate-800"
          >
            Add note
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DoneButton = ({
  formId,
  open,
  setOpen,
  endWorkout,
}: {
  formId: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  endWorkout: () => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles>
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className="rounded-lg px-2.5 py-1 text-xl font-bold text-green-500 active:scale-95 active:bg-slate-200 dark:text-green-600 dark:active:bg-slate-700"
      >
        Done
        <p className="sr-only">Done button</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col gap-3 rounded-modal bg-white/90 text-center dark:bg-slate-700/70">
            <Drawer.Title className="px-2 pb-2 pt-5 text-sm font-semibold">
              Are you sure you want to submit workout?
            </Drawer.Title>

            <button
              type="submit"
              form={formId}
              disabled={pending}
              onClick={endWorkout}
              className="w-full rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-green-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-green-500/75 dark:border-slate-600 active:dark:bg-slate-600/90 disabled:dark:bg-slate-900/75 disabled:dark:text-green-800"
            >
              {pending ? "Submitting..." : "Submit"}
            </button>
          </div>

          <button
            onClick={async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));

              setOpen(false);
            }}
            className="w-full rounded-modal bg-white p-3 text-xl font-bold text-violet-500 focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
