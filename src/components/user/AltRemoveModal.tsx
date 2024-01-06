"use client";

import { RemoveWorkoutIcon } from "@/icons/user/modify";
import { DangerIcon } from "@/icons/user/warning";
import { manrope } from "@/styles/fonts";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Workout } from "./Workouts";
import { removeWorkout } from "@/util/actions";

export const AltRemoveModal = ({
  editMode,
  workout,
}: {
  editMode: boolean;
  workout: Workout;
}) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  return (
    <Dialog.Root
      open={openRemoveModal}
      onOpenChange={() => setOpenRemoveModal(!openRemoveModal)}
    >
      <div>
        <AnimatePresence>
          {editMode && (
            <Dialog.Trigger>
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
                }}
                exit={{
                  opacity: 0,
                  y: "100%",
                  transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
                }}
              >
                <div
                  onClick={() => setOpenRemoveModal(true)}
                  className="text-red-500 transition active:scale-95 dark:text-red-400"
                >
                  {RemoveWorkoutIcon}
                </div>
              </motion.div>
            </Dialog.Trigger>
          )}
        </AnimatePresence>
      </div>
      <Dialog.Portal>
        <div>
          <AnimatePresence>
            {openRemoveModal && (
              <Dialog.Overlay>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      delay: 0.1,
                      duration: 0.3,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  }}
                  className="backdrop-blur-xs fixed inset-0  bg-slate-900/40 dark:bg-slate-950/70"
                  onClick={() => setOpenRemoveModal(false)}
                />
              </Dialog.Overlay>
            )}
          </AnimatePresence>
        </div>
        <div>
          <AnimatePresence>
            {openRemoveModal && (
              <Dialog.Content>
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{
                    y: 0,
                    transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
                  }}
                  exit={{
                    y: "100%",
                    transition: {
                      delay: 0.1,
                      duration: 0.3,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  }}
                  className="fixed inset-x-0 bottom-4 space-y-4 px-4 py-4"
                >
                  <div className="flex flex-col items-center gap-3 rounded-[10px] bg-slate-50/95 pt-5 dark:bg-slate-700/90">
                    <div className="rounded-full bg-red-400 p-2 text-white shadow-sm dark:bg-red-200 dark:text-red-500">
                      {DangerIcon}
                    </div>
                    <div className="px-1 pt-2">
                      <p className="text-center text-sm font-semibold leading-snug text-slate-600 dark:text-slate-400">
                        This action is irreversible. Proceeding further will
                        result in permanent data loss. Continue?
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        removeWorkout(workout.id);
                        setOpenRemoveModal(false);
                      }}
                      className={`w-full rounded-b-[10px] border-t border-slate-400/40 p-3 text-lg font-semibold text-red-500 active:bg-slate-200 dark:border-slate-600 active:dark:bg-slate-600/90 ${manrope.className}`}
                    >
                      Remove {workout.title}
                    </button>
                  </div>
                  <button
                    onClick={() => setOpenRemoveModal(false)}
                    className="w-full rounded-[10px] bg-white p-3 text-xl font-bold text-violet-500 active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
                  >
                    Cancel
                  </button>
                </motion.div>
              </Dialog.Content>
            )}
          </AnimatePresence>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
