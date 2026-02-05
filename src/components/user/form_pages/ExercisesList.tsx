import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { useLastUpdatedLabel } from "@/util/hooks/useLastUpdatedLabel"
import { useRemoveExercise } from "@/util/hooks/useRemoveExercise"
import type { ExercisesListProps, ExerciseToRemoveType, ExerciseType } from "@/util/types"
import { reorderExercises, SWIPE_AND_DRAWER_TIMEOUT, timeout } from "@/util/utils"
import { ErrorComponent } from "../../ErrorComponent"
import { DragExerciseIcon, EditIcon, TrashBinIcon } from "../../icons/user/modify"
import { SwipeAction } from "../../swipe/SwipeAction"
import { SetsPerExerciseIndicator } from "../Indicators"
import { EditExerciseDrawer } from "./EditExerciseDrawer"
import { ExercisesListHeader } from "./ExercisesListHeader"
import { RemoveExerciseModal } from "./RemoveExerciseModal"

function scrollEasing(percentage: number) {
  return percentage ** 2
}

export const ExercisesList = ({
  exercises,
  exercisesError,
  updateExercises,
}: ExercisesListProps) => {
  const { openModal, exerciseToRemove, toggleModal, selectExerciseToRemove } = useRemoveExercise()

  function handleSorting({ destination, source }: DropResult) {
    if (!destination) return

    const prevExercises = [...exercises]
    const reorderedExercises = reorderExercises(prevExercises, source.index, destination.index)

    updateExercises({ type: "reorder", exercises: reorderedExercises })
  }

  return (
    <>
      <RemoveExerciseModal
        open={openModal}
        toggleModal={toggleModal}
        exercise={exerciseToRemove}
        updateExercises={updateExercises}
      />

      <ExercisesListHeader exercises={exercises} updateExercises={updateExercises} />

      {exercises.length === 0 ? (
        <ExerciseShell exercisesError={exercisesError} />
      ) : (
        <DragDropContext
          onDragEnd={handleSorting}
          autoScrollerOptions={{
            startFromPercentage: 0.4,
            maxScrollAtPercentage: 0.3,
            maxPixelScroll: 56,
            ease: scrollEasing,
            durationDampening: {
              accelerateAt: 360,
              stopDampeningAt: 1200,
            },
          }}
        >
          <Droppable droppableId="exercise-list" direction="vertical">
            {(exerciseList, snapshot) => (
              <div
                {...exerciseList.droppableProps}
                ref={exerciseList.innerRef}
                className={twMerge(
                  "space-y-4 group-disabled:opacity-50",
                  snapshot.isDraggingOver && "rounded-xl bg-violet-200 dark:bg-violet-950"
                )}
              >
                {exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exerciseIndex={index}
                    exercise={exercise}
                    selectExerciseToRemove={selectExerciseToRemove}
                    toggleModal={toggleModal}
                    updateExercises={updateExercises}
                  />
                ))}
                {exerciseList.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  )
}

const ExerciseCard = ({
  exerciseIndex,
  exercise,

  selectExerciseToRemove,
  toggleModal,
  updateExercises,
}: {
  exerciseIndex: number
  exercise: ExerciseType
  selectExerciseToRemove: (exercise: ExerciseToRemoveType) => void
  toggleModal: () => void
  updateExercises: ExercisesListProps["updateExercises"]
}) => {
  const [openEditDrawer, setOpenEditDrawer] = useState(false)

  return (
    <Draggable index={exerciseIndex} draggableId={exercise.id}>
      {(exerciseToDrag, snapshot) => (
        <div {...exerciseToDrag.draggableProps} ref={exerciseToDrag.innerRef}>
          <EditExerciseDrawer
            open={openEditDrawer}
            toggleDrawer={() => setOpenEditDrawer(!openEditDrawer)}
            exercise={exercise}
            updateExercises={updateExercises}
          />

          <SwipeAction.Root direction={snapshot.isDragging ? "none" : "x"}>
            <SwipeAction.Trigger
              className={twMerge(
                "flex w-full items-center rounded-lg bg-white py-6 pr-3 pl-6 shadow-md ring-1 ring-slate-300 ring-inset dark:bg-slate-800 dark:ring-slate-600",
                snapshot.isDragging &&
                  "bg-green-400 ring-slate-200 dark:bg-green-700 dark:ring-slate-300"
              )}
            >
              <div className="flex grow flex-col gap-5">
                <div className="flex flex-col items-start gap-1">
                  <p
                    className={twMerge(
                      "w-full font-bold text-[16px] uppercase leading-[16px] dark:text-slate-200",
                      snapshot.isDragging && "text-white"
                    )}
                  >
                    {exercise.name}
                  </p>

                  <SetsPerExerciseIndicator
                    onlyWorkingSets
                    sets={exercise.sets}
                    limbInvolvement={exercise.limbInvolvement}
                    className="rounded-lg bg-slate-200/55 px-3 py-1.5 shadow-sm ring-slate-300 dark:bg-slate-900 dark:shadow-slate-900/55 dark:ring-slate-700/90"
                  />
                </div>

                <LastUpdatedDate
                  timestamp={exercise.lastUpdateTimestamp}
                  isDragging={snapshot.isDragging}
                />
              </div>

              <button
                {...exerciseToDrag.dragHandleProps}
                type="button"
                className="cursor-move touch-auto px-3 py-2"
              >
                {DragExerciseIcon}
              </button>
            </SwipeAction.Trigger>

            <SwipeAction.Actions
              wrapperClassName="bg-slate-200 dark:bg-slate-800/80 rounded-xl"
              className="flex-col"
            >
              <SwipeAction.Action
                type="button"
                onClick={async () => {
                  await timeout(SWIPE_AND_DRAWER_TIMEOUT)
                  selectExerciseToRemove({ id: exercise.id, name: exercise.name })
                  toggleModal()
                }}
                className="flex grow items-center justify-center border-slate-400/35 border-b px-4 text-red-500 active:bg-white dark:border-slate-700 dark:text-red-500 dark:active:bg-slate-700"
              >
                <TrashBinIcon strokeWidth={1.5} className="size-7" />
                <span className="sr-only">Remove exercise</span>
              </SwipeAction.Action>

              <SwipeAction.Action
                type="button"
                onClick={async () => {
                  await timeout(SWIPE_AND_DRAWER_TIMEOUT)
                  setOpenEditDrawer(true)
                }}
                className="flex grow items-center justify-center px-4 text-green-500 active:bg-white dark:text-green-500 dark:active:bg-slate-700"
              >
                <EditIcon strokeWidth={1.5} className="size-7" />
                <span className="sr-only">Edit exercise</span>
              </SwipeAction.Action>
            </SwipeAction.Actions>
          </SwipeAction.Root>
        </div>
      )}
    </Draggable>
  )
}

const LastUpdatedDate = ({ timestamp, isDragging }: { timestamp: number; isDragging: boolean }) => {
  const { text } = useLastUpdatedLabel(timestamp)

  return (
    <p
      className={twMerge(
        "text-[10px] text-slate-400 italic leading-[10px] dark:text-slate-500",
        isDragging && "text-white dark:text-slate-100/80"
      )}
    >
      {`updated ${text}`}
    </p>
  )
}

const ExerciseShell = ({ exercisesError }: { exercisesError: string[] | undefined }) => {
  return (
    <div className="space-y-4 px-6 py-14 text-center group-disabled:opacity-50">
      <p className="font-semibold text-slate-400">
        Press the{" "}
        <span className="font-extrabold text-slate-500 uppercase dark:text-slate-100">plus</span>{" "}
        button to create an exercise
      </p>

      <ErrorComponent errorArr={exercisesError} className="justify-center" />
    </div>
  )
}
