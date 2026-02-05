import type { ExercisesListProps } from "@/util/types"
import { TotalExercisesAndWorkingSetsIndicator } from "../Indicators"
import { CreateExerciseDrawer } from "./CreateExerciseDrawer"

export const ExercisesListHeader = ({
  exercises,
  updateExercises,
}: Pick<ExercisesListProps, "exercises" | "updateExercises">) => {
  return (
    <div className="flex items-center justify-between p-4 group-disabled:opacity-50">
      <div className="space-y-2">
        <p className="font-bold font-manrope text-[14px] text-slate-600 uppercase leading-4 dark:text-slate-200">
          Exercises
        </p>

        <TotalExercisesAndWorkingSetsIndicator
          exercises={exercises}
          className="rounded-lg+ bg-white px-3 py-2 ring-slate-300 dark:bg-slate-800 dark:shadow-slate-900/80 dark:ring-slate-600"
        />
      </div>

      <CreateExerciseDrawer updateExercises={updateExercises} />
    </div>
  )
}
