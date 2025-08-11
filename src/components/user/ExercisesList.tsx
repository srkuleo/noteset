import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import {
  formatLastUpdatedDate,
  reorderExercises,
  updateInterval,
} from "@/util/utils";
import { useExercisesList } from "@/util/hooks/useExercisesList";
import { useCalcExercisesAndWorkingSets } from "@/util/hooks/useCalcExercisesAndWorkingSets";
import { SwipeAction } from "../swipe/SwipeAction";
import { EditExerciseDrawer } from "./EditExerciseDrawer";
import { RemoveExerciseModal } from "./RemoveExerciseModal";
import { ErrorComponent } from "../ErrorComponent";
import { DragExerciseIcon, EditIcon, TrashBinIcon } from "../icons/user/modify";

import type { ExerciseType, CreateWorkoutType } from "@/util/types";

type ExerciseListProps = {
  workout: CreateWorkoutType;
  exercisesError: string[] | undefined;
  editForm?: boolean;
  updateExercises: (exercises: ExerciseType | ExerciseType[]) => void;
  editExercises: (editedExercise: ExerciseType) => void;
  removeExercise: (id: string) => void;
};

function scrollEasing(percentage: number) {
  return Math.pow(percentage, 2);
}

export const ExercisesList = ({
  workout,
  exercisesError,
  editForm,
  updateExercises,
  editExercises,
  removeExercise,
}: ExerciseListProps) => {
  const {
    openEditDrawer,
    openRemoveModal,
    exerciseInFocus,
    toggleEditDrawer,
    toggleRemoveModal,
    keepTrackOfTheCurrExercise,
  } = useExercisesList();
  const { totalWorkingSets } = useCalcExercisesAndWorkingSets(
    workout.exercises,
  );

  function handleSorting({ destination, source }: DropResult) {
    if (!destination) return;

    const prevExercises = [...workout.exercises];

    const reorderedExercises = reorderExercises(
      prevExercises,
      source.index,
      destination.index,
    );

    updateExercises(reorderedExercises);
  }

  return (
    <>
      <EditExerciseDrawer
        isOpen={openEditDrawer}
        setIsOpen={toggleEditDrawer}
        exercise={exerciseInFocus}
        editExercises={editExercises}
      />

      <RemoveExerciseModal
        isOpen={openRemoveModal}
        setIsOpen={toggleRemoveModal}
        exerciseName={exerciseInFocus.name}
        removeExercise={() => removeExercise(exerciseInFocus.id)}
        isEditWorkoutPage={editForm}
        openEditDrawer={toggleEditDrawer}
      />

      {workout.exercises.length === 0 ? (
        <ExerciseShell exercisesError={exercisesError} />
      ) : (
        <div className="group-disabled:opacity-50">
          <div className="mx-4 mb-4 flex justify-between border-b border-slate-200 pb-2 pt-4 dark:border-slate-800">
            <p className="pl-1 font-manrope text-sm font-semibold uppercase text-slate-600 dark:text-slate-200">
              Exercises
            </p>

            <p className="text-sm font-semibold italic text-green-500">
              {totalWorkingSets}
            </p>
          </div>

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
                    "space-y-4 p-4 group-disabled:opacity-50",
                    snapshot.isDraggingOver &&
                      "rounded-xl bg-violet-200 dark:bg-violet-950",
                  )}
                >
                  {workout.exercises.map((exercise, index) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      exerciseIndex={index}
                      keepTrackOfTheCurrExercise={keepTrackOfTheCurrExercise}
                      toggleEditDrawer={toggleEditDrawer}
                      toggleRemoveModal={toggleRemoveModal}
                    />
                  ))}
                  {exerciseList.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </>
  );
};

const ExerciseCard = ({
  exerciseIndex,
  exercise,
  keepTrackOfTheCurrExercise,
  toggleEditDrawer,
  toggleRemoveModal,
}: {
  exerciseIndex: number;
  exercise: ExerciseType;
  keepTrackOfTheCurrExercise: (targetedExercise: ExerciseType) => void;
  toggleEditDrawer: () => void;
  toggleRemoveModal: () => void;
}) => {
  const workingSets =
    exercise.sets.filter((set) => set.purpose === "working").length *
    (exercise.movementType === "unilateral" ? 2 : 1);

  return (
    <Draggable index={exerciseIndex} draggableId={exercise.id}>
      {(exerciseToDrag, snapshot) => (
        <div {...exerciseToDrag.draggableProps} ref={exerciseToDrag.innerRef}>
          <SwipeAction.Root direction={snapshot.isDragging ? "none" : "x"}>
            <SwipeAction.Trigger
              className={twMerge(
                "flex w-full items-center rounded-lg bg-white py-6 pl-6 pr-3 shadow-md ring-1 ring-slate-400/40 dark:bg-slate-800 dark:ring-slate-600",
                snapshot.isDragging &&
                  "bg-green-400 ring-slate-200 dark:bg-green-700 dark:ring-slate-300",
              )}
            >
              <div className="flex flex-1 flex-col gap-3">
                <p
                  className={twMerge(
                    "font-bold uppercase dark:text-slate-200",
                    snapshot.isDragging && "text-white",
                  )}
                >
                  {exercise.name}
                </p>

                <p
                  className={twMerge(
                    "-mt-3 text-sm font-semibold italic",
                    exercise.movementType === "unilateral"
                      ? "text-orange-500"
                      : "text-green-500",
                    snapshot.isDragging && "text-white",
                  )}
                >
                  {`${workingSets} working set${workingSets > 0 ? "s" : ""}`}
                </p>

                <LastUpdatedDate
                  lastUpdatedDate={exercise.lastUpdated}
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
              wrapperClassName="bg-violet-100 dark:bg-violet-500 rounded-xl"
              className="flex-col"
            >
              <SwipeAction.Action
                type="button"
                onClick={() => {
                  keepTrackOfTheCurrExercise({ ...exercise });
                  toggleEditDrawer();
                }}
                className="flex grow items-center justify-center border-b border-violet-500 px-4 text-green-500 dark:border-white dark:text-green-300"
              >
                <EditIcon strokeWidth={1.5} className="size-6" />

                <span className="sr-only">Edit exercise</span>
              </SwipeAction.Action>

              <SwipeAction.Action
                type="button"
                onClick={() => {
                  keepTrackOfTheCurrExercise({ ...exercise });
                  toggleRemoveModal();
                }}
                className="flex grow items-center justify-center px-4 text-red-500 dark:text-red-300"
              >
                <TrashBinIcon strokeWidth={1.5} className="size-6" />

                <span className="sr-only">Remove exercise</span>
              </SwipeAction.Action>
            </SwipeAction.Actions>
          </SwipeAction.Root>
        </div>
      )}
    </Draggable>
  );
};

const LastUpdatedDate = ({
  lastUpdatedDate,
  isDragging,
}: {
  lastUpdatedDate: ExerciseType["lastUpdated"];
  isDragging: boolean;
}) => {
  const [formattedDate, setFormattedDate] = useState(() =>
    formatLastUpdatedDate(lastUpdatedDate),
  );

  useEffect(() => {
    setFormattedDate(formatLastUpdatedDate(lastUpdatedDate));

    const interval = updateInterval(lastUpdatedDate);

    if (interval) {
      const timer = setTimeout(
        () => setFormattedDate(formatLastUpdatedDate(lastUpdatedDate)),
        interval,
      );

      return () => clearTimeout(timer);
    }
  }, [lastUpdatedDate]);

  return (
    <p
      className={twMerge(
        "text-[10px] italic text-slate-400 dark:text-slate-500",
        isDragging && "text-white dark:text-slate-100/80",
      )}
    >
      {formattedDate ? `updated ${formattedDate}` : "not yet updated"}
    </p>
  );
};

const ExerciseShell = ({
  exercisesError,
}: {
  exercisesError: string[] | undefined;
}) => {
  return (
    <div className="space-y-2 px-4 pt-6">
      <div
        className={twMerge(
          "space-y-3 rounded-xl border-2 border-dashed border-slate-400/60 bg-white px-4 py-24 text-center group-disabled:opacity-30 dark:border-slate-600 dark:bg-slate-800",
          exercisesError && "border-red-500 dark:border-red-500",
        )}
      >
        <h3 className="font-manrope">Exercises not added yet</h3>

        <p className="text-sm text-slate-400/80 dark:text-slate-400">
          Press the{" "}
          <span className="font-bold uppercase text-violet-400 dark:text-violet-400">
            plus
          </span>{" "}
          button in the bottom left corner to add one
        </p>
      </div>

      <ErrorComponent
        errorArr={exercisesError}
        className="justify-center py-4 group-disabled:opacity-50"
      />
    </div>
  );
};
