"use client";

import Link from "next/link";
import { useState } from "react";
import { EmptyIcon } from "../icons/user/warning";
import { RemoveWorkoutModal } from "./RemoveWorkoutModal";
import { PreviewWorkoutButton } from "./PreviewWorkoutButton";
import { EditWorkoutIcon, RemoveWorkoutIcon } from "../icons/user/modify";

import type { Workout } from "@/db/schema";

export const WorkoutCards = ({ workouts }: { workouts: Workout[] }) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [workoutToRemove, setWorkoutToRemove] = useState({ title: "", id: 0 });

  return (
    <>
      <RemoveWorkoutModal
        open={openRemoveModal}
        setOpen={setOpenRemoveModal}
        workoutToRemove={workoutToRemove}
      />

      {workouts.length === 0 ? (
        <EmptyPage />
      ) : (
        workouts.map((workout) => (
          <div
            key={workout.id}
            className="flex w-full flex-col gap-4 rounded-xl border border-slate-300/80 bg-white px-4 py-6 shadow-md dark:border-slate-700/60 dark:bg-slate-800/80"
          >
            <div className="space-y-1.5 px-1">
              <p className="text-pretty font-manrope text-lg font-bold uppercase dark:text-slate-300">
                {workout.title}
              </p>
              <p className="text-pretty text-sm font-semibold italic leading-none text-slate-400/80 dark:text-slate-400/60">
                {workout.description}
              </p>
            </div>

            <div className="h-[1px] bg-green-200 dark:bg-green-900/70" />

            <div className="flex gap-2 px-1 [&>*:nth-child(2)]:mr-auto">
              <PreviewWorkoutButton workout={workout} />

              <Link
                href={`/workout?id=${workout.id}`}
                className="flex items-center rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-4 py-1 font-manrope text-xs text-white shadow-md transition active:scale-95 dark:from-violet-500 dark:to-violet-600"
              >
                Let&apos;s begin
                <p className="sr-only">Start this workout</p>
              </Link>

              <Link
                href={`/workouts/edit?id=${workout.id}`}
                className="rounded-full p-1.5 text-green-500 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600"
              >
                {EditWorkoutIcon}
                <span className="sr-only">Edit workout</span>
              </Link>

              <button
                onClick={() => {
                  setWorkoutToRemove({ id: workout.id, title: workout.title });
                  setOpenRemoveModal(true);
                }}
                className="rounded-full p-1.5 text-red-500 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:text-red-400 dark:shadow-slate-900 dark:ring-slate-600"
              >
                {RemoveWorkoutIcon}
                <span className="sr-only">Remove workout</span>
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

const EmptyPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 pb-18">
      <div className="text-slate-400/60 dark:text-slate-700/80">
        {EmptyIcon}
      </div>

      <div className="space-y-4 text-center">
        <h3>Seems like you haven&apos;t created any workout yet</h3>
        <p className="font-semibold italic text-slate-400/85">
          Tap the plus button to create one
        </p>
      </div>
    </div>
  );
};
