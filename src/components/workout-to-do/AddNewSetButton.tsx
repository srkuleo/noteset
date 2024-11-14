import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Drawer } from "vaul";
import { twMerge } from "tailwind-merge";
import {
  BUTTON_TIMEOUT,
  SWIPE_AND_DRAWER_TIMEOUT,
  timeout,
} from "@/util/utils";
import { AddIcon } from "../icons/user/modify";
import { ArrowLeftIcon } from "../icons/arrows";
import { ErrorComponent } from "../ErrorComponent";
import { ModalSubmitButton } from "../SubmitButtons";

import {
  SetSchema,
  type ExerciseToDoType,
  type SetWithoutId,
} from "@/util/types";

export const AddNewSetButton = ({
  exercise,
  removeMode,
  addNewSet,
}: {
  exercise: ExerciseToDoType;
  removeMode: boolean;
  addNewSet: (
    exerciseId: string,
    setData: SetWithoutId,
    setIndex: number,
  ) => void;
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
          await timeout(BUTTON_TIMEOUT);

          setOpen(true);
        }}
        className="mx-auto flex w-fit items-center gap-1 rounded-lg px-3 py-[5px] text-sm font-bold active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-100 dark:active:bg-slate-800"
      >
        <AddIcon strokeWidth={2} className="size-5" />
        <p className="font-bold uppercase">Add set</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-xs dark:bg-slate-950/85" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-[9999] px-2 focus:outline-none"
        >
          <div className="rounded-b-modal bg-white pb-3 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700/70">
            <div className="space-y-4 border-b border-b-slate-300/50 bg-slate-200/55 pt-safe-top dark:border-b-slate-700/70 dark:bg-slate-800">
              <Drawer.Title className="px-4 py-3 font-manrope text-xl text-slate-800">
                Adding new set
              </Drawer.Title>
            </div>

            <AddSetForm
              exercise={exercise}
              addNewSet={addNewSet}
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

const AddSetForm = ({
  exercise,
  addNewSet,
  closeDrawer,
}: {
  exercise: ExerciseToDoType;
  addNewSet: (
    exerciseId: string,
    setData: SetWithoutId,
    setIndex: number,
  ) => void;
  closeDrawer: () => void;
}) => {
  const [newSet, setNewSet] = useState<SetWithoutId>({
    reps: "",
    weight: "",
    warmup: undefined,
  });
  const [newSetIndex, setNewSetIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const {
    mutate: clientAction,
    data: error,
    isPending,
    reset,
  } = useMutation({
    mutationFn: async () => {
      await timeout(SWIPE_AND_DRAWER_TIMEOUT);

      const isValidSet = SetSchema.pick({
        reps: true,
        weight: true,
        warmup: true,
      })
        .extend({
          setIndex: z
            .number()
            .min(0, { message: "Index must be positive number" }),
        })
        .safeParse({ ...newSet, setIndex: newSetIndex });

      if (!isValidSet.success) {
        return isValidSet.error.flatten().fieldErrors;
      }

      const { reps, weight, setIndex, warmup } = isValidSet.data;

      addNewSet(
        exercise.id,
        { reps: reps, weight: weight, warmup: warmup },
        setIndex,
      );
      closeDrawer();
    },
  });

  return (
    <form id="add-new-set" action={() => clientAction()} className="p-6">
      <fieldset
        disabled={isPending}
        className="group flex flex-col space-y-8 overflow-hidden p-2"
      >
        <AnimatePresence initial={false} mode="wait">
          {!showForm ? (
            <motion.div
              key="select-set-type"
              initial={{ opacity: 0, x: -64 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.36, 0.66, 0.04, 1],
                },
              }}
              exit={{
                opacity: 0,
                x: -64,
                transition: {
                  duration: 0.3,
                  ease: [0.36, 0.66, 0.04, 1],
                },
              }}
            >
              <div className="space-y-4">
                <p className="text-center text-xl font-semibold text-slate-500 dark:text-slate-300">
                  Select the type of the set:
                </p>

                <div className="flex justify-evenly text-slate-700 dark:text-white">
                  <button
                    type="button"
                    onClick={() => setNewSet({ ...newSet, warmup: true })}
                    className={twMerge(
                      "rounded-xl px-5 py-2.5 font-manrope text-sm font-semibold uppercase shadow-md ring-1 ring-slate-200 dark:shadow-slate-950 dark:ring-slate-700",
                      newSet.warmup &&
                        "bg-violet-400 text-white dark:bg-violet-500",
                    )}
                  >
                    Warmup
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewSet({ ...newSet, warmup: false })}
                    className={twMerge(
                      "rounded-xl px-5 py-2.5 font-manrope text-sm font-semibold uppercase shadow-md ring-1 ring-slate-200 dark:shadow-slate-950 dark:ring-slate-700",
                      newSet.warmup === false &&
                        "bg-violet-400 text-white dark:bg-violet-500",
                    )}
                  >
                    Working
                  </button>
                </div>

                <AnimatePresence initial={false} mode="wait">
                  {newSet.warmup ? (
                    <motion.div
                      key="warmup-order-sections"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: {
                          duration: 0.4,
                          delay: 0.04,
                          ease: [0.36, 0.66, 0.04, 1],
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: {
                          duration: 0.4,
                          ease: [0.36, 0.66, 0.04, 1],
                        },
                      }}
                    >
                      <div className="space-y-4 pb-4">
                        <p className="text-center text-xl font-semibold text-slate-500 dark:text-slate-300">
                          Order:
                        </p>

                        <div className="flex justify-center gap-3">
                          {exercise.sets
                            .filter((set) => set.warmup)
                            .map((warmupSet, warmupSetIndex) => (
                              <button
                                key={warmupSet.id}
                                type="button"
                                onClick={() => setNewSetIndex(warmupSetIndex)}
                                className={twMerge(
                                  "size-12 rounded-full font-manrope font-bold shadow-md ring-1 ring-slate-200 dark:shadow-slate-950 dark:ring-slate-700",
                                  warmupSetIndex === newSetIndex &&
                                    "bg-violet-400 text-white dark:bg-violet-500",
                                )}
                              >
                                {warmupSetIndex + 1}
                              </button>
                            ))}

                          <button
                            type="button"
                            onClick={() =>
                              setNewSetIndex(
                                exercise.sets.filter((set) => set.warmup)
                                  .length,
                              )
                            }
                            className={twMerge(
                              "size-12 rounded-full font-manrope font-bold shadow-md ring-1 ring-slate-200 dark:shadow-slate-950 dark:ring-slate-700",
                              exercise.sets.filter((set) => set.warmup)
                                .length === newSetIndex &&
                                "bg-violet-400 text-white dark:bg-violet-500",
                            )}
                          >
                            {exercise.sets.filter((set) => set.warmup).length +
                              1}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : newSet.warmup === false ? (
                    <motion.div
                      key="working-order-sections"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: {
                          duration: 0.4,
                          delay: 0.04,
                          ease: [0.36, 0.66, 0.04, 1],
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: {
                          duration: 0.4,
                          ease: [0.36, 0.66, 0.04, 1],
                        },
                      }}
                    >
                      <div className="space-y-4 pb-4">
                        <p className="text-center text-xl font-semibold text-slate-500 dark:text-slate-300">
                          Order:
                        </p>

                        <div className="flex justify-center gap-3">
                          {exercise.sets
                            .filter((set) => !set.warmup)
                            .map((workingSet, workingSetIndex) => (
                              <button
                                key={workingSet.id}
                                type="button"
                                onClick={() => setNewSetIndex(workingSetIndex)}
                                className={twMerge(
                                  "size-12 rounded-full font-manrope font-bold shadow-md ring-1 ring-slate-200 dark:shadow-slate-950 dark:ring-slate-700",
                                  workingSetIndex === newSetIndex &&
                                    "bg-violet-400 text-white dark:bg-violet-500",
                                )}
                              >
                                {workingSetIndex + 1}
                              </button>
                            ))}

                          <button
                            type="button"
                            onClick={() =>
                              setNewSetIndex(
                                exercise.sets.filter((set) => !set.warmup)
                                  .length,
                              )
                            }
                            className={twMerge(
                              "size-12 rounded-full font-manrope font-bold shadow-md ring-1 ring-slate-200 dark:shadow-slate-950 dark:ring-slate-700",
                              exercise.sets.filter((set) => !set.warmup)
                                .length === newSetIndex &&
                                "bg-violet-400 text-white dark:bg-violet-500",
                            )}
                          >
                            {exercise.sets.filter((set) => !set.warmup).length +
                              1}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {newSetIndex >= 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: {
                          duration: 0.4,
                          delay: 0.04,
                          ease: [0.36, 0.66, 0.04, 1],
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: {
                          duration: 0.4,
                          ease: [0.36, 0.66, 0.04, 1],
                        },
                      }}
                    >
                      <button
                        type="button"
                        onClick={async () => {
                          await timeout(BUTTON_TIMEOUT);

                          setShowForm(true);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 py-2 text-white shadow-md active:bg-green-400 dark:bg-green-600 dark:active:bg-green-500"
                      >
                        <p className="text-lg font-bold">Next</p>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reps-and-weights-fields"
              initial={{ opacity: 0, x: 64 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.36, 0.66, 0.04, 1],
                },
              }}
              exit={{
                opacity: 0,
                x: 64,
                transition: {
                  duration: 0.3,
                  ease: [0.36, 0.66, 0.04, 1],
                },
              }}
            >
              <div className="space-y-4 group-disabled:opacity-50">
                <p className="text-center text-xl font-semibold text-slate-500 dark:text-slate-300">
                  Please fill the empty fields
                </p>

                <div
                  className={twMerge(
                    "flex justify-evenly pb-4",
                    (error?.reps || error?.weight) && "pb-0",
                  )}
                >
                  <input
                    required
                    disabled={isPending}
                    id="reps"
                    name="reps"
                    type="text"
                    placeholder="Reps"
                    onChange={(e) =>
                      setNewSet({ ...newSet, reps: e.target.value })
                    }
                    className={twMerge(
                      "input-field",
                      "w-1/3 py-2 text-center dark:bg-slate-800",
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
                    onChange={(e) =>
                      setNewSet({ ...newSet, weight: e.target.value })
                    }
                    className={twMerge(
                      "input-field",
                      "w-1/3 py-2 text-center dark:bg-slate-800",
                      error?.weight && "ring-red-500 dark:ring-red-500",
                    )}
                  />
                </div>

                {(error?.reps || error?.weight || error?.setIndex) && (
                  <div className="space-y-2 pb-4">
                    <ErrorComponent errorArr={error?.reps} />
                    <ErrorComponent errorArr={error?.weight} />
                    <ErrorComponent errorArr={error?.setIndex} />
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={async () => {
                      await timeout(BUTTON_TIMEOUT);

                      reset();
                      setShowForm(false);
                    }}
                    className="rounded-full bg-slate-50 px-2 ring-1 ring-slate-300 active:scale-95 active:bg-slate-100 dark:bg-slate-800 dark:ring-slate-600 dark:active:bg-slate-700"
                  >
                    {ArrowLeftIcon}

                    <p className="sr-only">Logout button</p>
                  </button>

                  <ModalSubmitButton
                    label="Done"
                    loading="Please wait..."
                    pending={isPending}
                    form="add-new-set"
                    className="rounded-full py-2 text-lg font-bold shadow-md"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </fieldset>
    </form>
  );
};
