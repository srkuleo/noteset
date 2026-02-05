import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import type { WorkoutType } from "@/db/schema"
import type { ExerciseType, SetType } from "@/util/types"
import { useExerciseSetCounts, useWorkoutStats } from "@/util/utils"

export const WorkoutStatusIndicator = ({
  status,
  className,
}: {
  className?: string
} & Pick<WorkoutType, "status">) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-1 rounded-full shadow-md ring-1 ring-inset",
        className
      )}
    >
      <div
        className={`${status === "current" ? "bg-blue-400 dark:bg-blue-500" : status === "done" ? "bg-green-500 dark:bg-green-600" : "bg-slate-500 dark:bg-slate-600"} size-2 rounded-full`}
      />

      <p className="font-nunito font-semibold text-[8px] uppercase">{status}</p>
    </div>
  )
}

export const TotalExercisesAndWorkingSetsIndicator = ({
  exercises,
  logMode,
  className,
}: {
  exercises: ExerciseType[]
  logMode?: boolean
  className?: ComponentProps<"div">["className"]
}) => {
  const { totalExercises, totalWorkingSets } = useWorkoutStats(exercises, { logMode })

  return (
    <div className="flex items-center gap-2">
      <div className={twMerge("shadow-md ring-1 ring-inset", className)}>
        <p className="font-bold text-[8px] text-violet-500 uppercase italic dark:text-violet-400">
          {totalExercises}
        </p>
      </div>

      <div className="h-5 w-[1px] bg-slate-300 dark:bg-slate-600" />

      <div className={twMerge("shadow-md ring-1 ring-inset", className)}>
        <p className="font-bold text-[8px] text-green-500 uppercase italic">{totalWorkingSets}</p>
      </div>
    </div>
  )
}

export const SetsPerExerciseIndicator = ({
  sets,
  limbInvolvement,
  onlyWorkingSets,
  className,
}: {
  sets: SetType[]
  limbInvolvement: ExerciseType["limbInvolvement"]
  onlyWorkingSets?: boolean
  className?: ComponentProps<"div">["className"]
}) => {
  const { warmupSets, workingSets, workingSetsWithLabel } = useExerciseSetCounts(
    sets,
    limbInvolvement
  )

  if (onlyWorkingSets) {
    return (
      <div className={twMerge("ring-1 ring-inset", className)}>
        <p
          className={twMerge(
            "font-extrabold text-[12px] italic leading-3",
            limbInvolvement === "unilateral" ? "text-orange-500" : "text-green-500"
          )}
        >
          {workingSetsWithLabel}
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className={twMerge("shadow-md ring-1 ring-inset", className)}>
        <p className="font-extrabold text-[8px] uppercase italic">{warmupSets}</p>
      </div>

      <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-600" />

      <div className={twMerge("shadow-md ring-1 ring-inset", className)}>
        <p
          className={twMerge(
            "font-extrabold text-[8px] text-green-500 uppercase italic",
            limbInvolvement === "unilateral" ? "text-orange-500" : "text-green-500"
          )}
        >
          {workingSets}
        </p>
      </div>
    </div>
  )
}

export type PageStatus = "initial" | "editing-workout" | "workout-updated"

export const PostWorkoutPageStatusIndicator = ({ pageStatus }: { pageStatus: PageStatus }) => {
  return (
    <p className="block rounded-xl bg-white px-4 py-2 font-manrope font-semibold text-[16px] text-green-500 leading-4 shadow-md ring-1 ring-slate-200 ring-inset dark:bg-slate-800 dark:shadow-slate-800/70 dark:ring-slate-600">
      {pageStatus === "initial" && "completed"}
      {pageStatus === "workout-updated" && "updated"}
    </p>
  )
}
