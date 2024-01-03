"use client";

import { useEffect, useState } from "react";
import type { Workout } from "./Workouts";
import { removeWorkout } from "@/util/actions";
import { DangerIcon } from "@/icons/user/danger";
import { manrope } from "@/styles/fonts";
import { AnimatePresence, motion } from "framer-motion";
import { RemoveWorkoutIcon } from "@/icons/user/modify";

export const RemoveWorkoutButton = ({
  workout,
  isEditing,
}: {
  isEditing: boolean;
  workout: Workout;
}) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  useEffect(() => {
    if (openRemoveModal) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [openRemoveModal]);

  return (
    <>
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: -12,
              transition: { duration: 0.14, ease: "easeIn" },
            }}
          >
            <button
              className="text-red-500 transition  active:scale-95 dark:text-red-400"
              onClick={() => setOpenRemoveModal(true)}
            >
              {RemoveWorkoutIcon}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {openRemoveModal && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70"
            onClick={() => setOpenRemoveModal(false)}
          />
          <div className="fixed inset-x-0 bottom-4 space-y-4 px-4 py-4">
            <div className="flex flex-col items-center gap-3 rounded-[10px] bg-white/90 pt-3 backdrop-blur-md dark:bg-slate-700/75">
              <DangerIcon />

              <div className="px-1">
                <p className="text-center text-sm font-semibold leading-snug text-slate-600 dark:text-slate-400">
                  This action is irreversible. Proceeding further will result in
                  permanent data loss. Continue?
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
              className="w-full rounded-[10px] bg-white p-3 text-xl font-bold text-violet-500 active:bg-slate-200 dark:bg-slate-700/95 dark:text-violet-400 active:dark:bg-slate-600/90"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
};
