import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { Drawer } from "vaul"
import type { CurrentWorkoutType } from "@/db/schema"
import type { ExerciseType } from "@/util/types"
import { BUTTON_TIMEOUT, timeout } from "@/util/utils"
import { HideIcon, ShowIcon } from "../icons/user/preview"
import { SeeWorkoutTooltip } from "../Tooltips"
import {
  SetsPerExerciseIndicator,
  TotalExercisesAndWorkingSetsIndicator,
  WorkoutStatusIndicator,
} from "./Indicators"

export type SeeWorkoutType = Pick<CurrentWorkoutType, "title" | "exercises" | "status">

export const SeeWorkoutDrawer = ({
  workout,
  className,
  logMode,
}: {
  workout: SeeWorkoutType
  className?: string
  logMode?: boolean
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)
          setOpen(true)
        }}
        className={twMerge(
          "rounded-lg+ p-2 text-slate-400 shadow-md ring-1 ring-slate-300/80 ring-inset active:scale-95 active:bg-slate-200 dark:bg-slate-700 dark:text-white dark:ring-slate-600 dark:active:bg-slate-800",
          className
        )}
      >
        <ShowIcon strokeWidth={1.5} className="size-6" />
        <p className="sr-only">See workout</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm dark:bg-slate-950/80" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-[9999] mx-0.5 flex max-h-[80%] flex-col rounded-t-4xl bg-white pb-6 focus:outline-none dark:bg-slate-900"
        >
          <div className="rounded-t-4xl bg-slate-200/55 p-4 dark:bg-slate-800">
            <Drawer.Handle className="bg-slate-300 dark:bg-slate-600" />

            <div className="flex flex-col">
              <Drawer.Title className="flex items-center justify-between text-lg text-slate-800 uppercase">
                {workout.title}

                <SeeWorkoutTooltip />
              </Drawer.Title>

              <div className="flex justify-between">
                <TotalExercisesAndWorkingSetsIndicator
                  logMode={logMode}
                  exercises={workout.exercises}
                  className="rounded-full bg-white px-3 py-2 ring-slate-300 dark:bg-slate-900 dark:shadow-slate-900/65 dark:ring-slate-700"
                />

                <WorkoutStatusIndicator
                  status={workout.status}
                  className="bg-white px-4 py-2 ring-slate-300 dark:bg-slate-900 dark:shadow-slate-900/65 dark:ring-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col divide-y divide-slate-100 overflow-y-auto overscroll-y-contain border-t border-t-slate-200 px-6 dark:divide-slate-700/70 dark:border-t-slate-700">
            {workout.exercises.map((exercise) => (
              <ExerciseSection key={exercise.id} exercise={exercise} />
            ))}
          </div>

          <button
            type="button"
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT)
              setOpen(false)
            }}
            className="m-6 flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
          >
            Hide
            <HideIcon strokeWidth={1.5} className="size-[22px]" />
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export const ExerciseSection = ({ exercise }: { exercise: ExerciseType }) => {
  const isExerciseSkipped = exercise.sets.length === 0

  return (
    <div className="flex flex-col items-center py-8 last:pb-2">
      <p
        className={twMerge(
          "pb-1.5 text-center font-bold text-[18px] leading-[18px]",
          isExerciseSkipped && "pb-0 text-slate-300 dark:text-slate-500"
        )}
      >
        {exercise.name}
      </p>

      {!isExerciseSkipped && (
        <SetsPerExerciseIndicator
          onlyWorkingSets
          sets={exercise.sets}
          limbInvolvement={exercise.limbInvolvement}
          className="rounded-lg+ bg-slate-200/55 px-3 py-1.5 shadow-sm ring-slate-300/50 dark:bg-slate-800 dark:shadow-slate-950/55 dark:ring-slate-700/70"
        />
      )}

      <div
        className={twMerge(
          "flex divide-x divide-slate-100 overflow-y-auto overscroll-contain px-3 py-6 min-[500px]:justify-center dark:divide-slate-700/70",
          exercise.sets.length > 5 ? "justify-normal" : "justify-center"
        )}
      >
        {isExerciseSkipped ? (
          <p className="text-slate-500 italic dark:text-slate-300">Skipped</p>
        ) : (
          exercise.sets.map((set) => (
            <div
              key={set.id}
              className="flex min-w-fit flex-col items-center gap-1 px-3 text-sm first:pl-0 last:pr-0"
            >
              <p
                className={twMerge(
                  "font-bold",
                  exercise.limbInvolvement === "unilateral" && set.purpose === "working"
                    ? "text-orange-500 dark:text-orange-500"
                    : exercise.limbInvolvement === "bilateral" && set.purpose === "working"
                      ? "text-green-500 dark:text-green-500"
                      : "text-slate-400 dark:text-slate-100"
                )}
              >
                {set.reps}
              </p>

              <p
                className={twMerge(
                  "font-semibold",
                  exercise.limbInvolvement === "unilateral" && set.purpose === "working"
                    ? "text-orange-500 dark:text-orange-500"
                    : exercise.limbInvolvement === "bilateral" && set.purpose === "working"
                      ? "text-green-500 dark:text-green-500"
                      : "text-slate-400 dark:text-slate-100"
                )}
              >
                {set.weight}kg
              </p>
            </div>
          ))
        )}
      </div>

      <p
        className={twMerge(
          "text-center font-semibold text-sm italic leading-none",
          isExerciseSkipped && "text-slate-300 dark:text-slate-500"
        )}
      >
        {exercise.note || "..."}
      </p>
    </div>
  )
}
