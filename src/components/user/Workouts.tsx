"use client";

import { PreviewIcon } from "@/icons/user/preview";
import {
  AddIcon,
  EditIcon,
  EditWorkoutIcon,
  DeleteIcon,
} from "@/icons/user/modify";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { manrope } from "@/styles/fonts";

type Workout = {
  id: number;
  title: string | null;
  description: string | null;
};

export const Workouts = ({ workouts }: { workouts: Workout[] }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between pb-2">
        <h1
          className={`text-xl font-bold text-slate-600 dark:text-white ${manrope.className}`}
        >
          Your current workouts
        </h1>
        <div className="flex gap-2">
          <Link
            href="/workouts/create"
            className="rounded-xl bg-white p-2 shadow-sm active:scale-95 dark:bg-slate-800 dark:ring-1 dark:ring-slate-700"
          >
            {AddIcon}
          </Link>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-xl bg-green-500 p-2 text-white shadow-sm active:scale-95 dark:bg-green-600"
          >
            {EditIcon}
          </button>
        </div>
      </div>
      {workouts.map((workout) => (
        <div key={workout.id} className="flex items-center gap-2 pb-4">
          <div className="flex w-full flex-col gap-2 rounded-xl bg-white/90 py-3 pl-3 pr-6 shadow-md dark:bg-slate-800/90">
            <div className="space-y-1 border-b border-green-200 px-1 pb-2 dark:border-green-900/80">
              <p className="text-lg font-bold dark:text-slate-300">
                {workout.title}
              </p>
              <p className="text-balance text-xs italic text-slate-400/80">
                {workout.description}
              </p>
            </div>
            <div className="flex gap-2 py-2 pl-1">
              <button className="rounded-lg px-2 py-1 shadow-md ring-1 ring-inset ring-slate-300 dark:shadow-slate-900 dark:ring-slate-600">
                {PreviewIcon}
              </button>
              <Link
                href={`/workout/${workout.title?.toLowerCase()}`}
                className={`rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-3 py-1 text-white shadow-md transition dark:from-violet-500pap dark:to-violet-600 ${manrope.className}`}
              >
                Start
              </Link>
            </div>
          </div>
          <AnimatePresence>
            {isEditing && (
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: 1,
                  width: "auto",
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  width: 0,
                  transition: { duration: 0.15, ease: "easeIn" },
                }}
              >
                <Link
                  href={`/workouts/edit/${workout.title?.toLowerCase()}`}
                  className="overflow-hidden rounded-full bg-green-500 p-2 text-white active:scale-95 dark:bg-green-600"
                >
                  {EditWorkoutIcon}
                </Link>
                <button className="overflow-hidden rounded-full bg-red-500/90 p-2 px-2 text-white active:scale-95 dark:bg-red-600">
                  {DeleteIcon}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};
