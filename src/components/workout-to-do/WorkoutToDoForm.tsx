"use client";

import debounce from "lodash.debounce";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Drawer } from "vaul";
import { submitDoneWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { BackButtonModal } from "../BackButtonModal";
import { WorkoutToDoTooltip } from "../Tooltips";
import {
  AddIcon,
  RemoveExerciseIcon,
  TrashBinIcon,
} from "../icons/user/modify";
import { AddExerciseDrawer } from "../user/AddExerciseDrawer";

import type { CreateWorkoutType, ExerciseType } from "@/util/types";

type TimeType = { start: Date | null; end: Date | null };
type NoteType = { add: boolean; onExercise: string };

export const WorkoutToDoForm = ({
  workoutToDo,
}: {
  workoutToDo: CreateWorkoutType;
}) => {
  const [exercisesToDo, setExercisesToDo] = useState(workoutToDo.exercises);
  const [currWorkout, setCurrWorkout] = useState<CreateWorkoutType>({
    title: workoutToDo.title,
    description: workoutToDo.description,
    exercises: workoutToDo.exercises.map((exercise): ExerciseType => {
      return {
        ...exercise,
        reps: exercise.reps.map(() => ""),
        weights: exercise.weights.map(() => ""),
      };
    }),
  });
  const [time, setTime] = useState<TimeType>({
    start: new Date(),
    end: null,
  });
  const [tempExercises, setTempExercises] = useState([
    ...currWorkout.exercises,
  ]);
  const [note, setNote] = useState<NoteType>({ add: false, onExercise: "" });
  const [removeMode, setRemoveMode] = useState(false);
  const [openDoneModal, setOpenDoneModal] = useState(false);
  const router = useRouter();

  const handleRepsInput = debounce(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      exerciseId: string,
      inputIndex: number,
    ) => {
      const modifiedExercises = currWorkout.exercises.map(
        (exercise): ExerciseType =>
          exercise.id === exerciseId
            ? {
                ...exercise,
                reps: exercise.reps.toSpliced(
                  inputIndex,
                  1,
                  event.target.value,
                ),
              }
            : exercise,
      );

      setCurrWorkout((prev) => {
        return { ...prev, exercises: modifiedExercises };
      });
    },
    200,
  );

  const handleWeightInput = debounce(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      exerciseId: string,
      inputIndex: number,
    ) => {
      const modifiedExercises = currWorkout.exercises.map(
        (exercise): ExerciseType =>
          exercise.id === exerciseId
            ? {
                ...exercise,
                weights: exercise.weights.toSpliced(
                  inputIndex,
                  1,
                  event.target.value,
                ),
              }
            : exercise,
      );

      setCurrWorkout((prev) => {
        return { ...prev, exercises: modifiedExercises };
      });
    },
    200,
  );

  function addNewSet(exerciseId: string) {
    const modifiedCurrExercises = currWorkout.exercises.map(
      (exercise): ExerciseType =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets + 1,
              reps: [...exercise.reps, ""],
              weights: [...exercise.weights, ""],
            }
          : exercise,
    );

    setCurrWorkout((prev) => {
      return { ...prev, exercises: modifiedCurrExercises };
    });
  }

  function removeSet(exerciseId: string, setIndex: number) {
    const modifiedTempExercises = tempExercises.map(
      (exercise): ExerciseType =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets - 1,
              reps: exercise.reps.toSpliced(setIndex, 1),
              weights: exercise.weights.toSpliced(setIndex, 1),
            }
          : exercise,
    );

    setTempExercises(modifiedTempExercises);
  }

  function handleNoteInput(
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseId: string,
  ) {
    const modifiedExercises = currWorkout.exercises.map(
      (exercise): ExerciseType =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              note: event.target.value,
            }
          : exercise,
    );

    setCurrWorkout((prev) => {
      return { ...prev, exercises: modifiedExercises };
    });
  }

  function updateExercises(newExercise: ExerciseType) {
    const newExerciseWithoutRepsAndWeights: ExerciseType = {
      ...newExercise,
      reps: newExercise.reps.map(() => ""),
      weights: newExercise.weights.map(() => ""),
    };

    const modifiedCurrExercises = [
      ...currWorkout.exercises,
      newExerciseWithoutRepsAndWeights,
    ];

    setCurrWorkout((prev) => {
      return {
        ...prev,
        exercises: modifiedCurrExercises,
      };
    });

    setExercisesToDo((prev) => {
      return [...prev, newExercise];
    });
  }

  async function clientAction() {
    console.log("Submitting!");

    let duration = 0;

    if (time.start && time.end) {
      const durationInMili = time.end.getTime() - time.start.getTime();
      const minutes = Math.floor(durationInMili / (1000 * 60));

      duration = minutes;
    }

    const res = await submitDoneWorkout(currWorkout, duration);

    if (res.status === "success-redirect") {
      router.push(`/post-workout?workoutTitle=${currWorkout.title}`);
    }

    if (res.status === "error") {
      showToast(res.message);
    }

    setOpenDoneModal(false);
  }

  return (
    <form
      id="submit-done-workout"
      action={clientAction}
      className="flex h-full flex-col"
    >
      <header className="bg-gradient-to-r from-green-600 from-20% to-violet-600 pt-safe-top dark:from-green-700 dark:to-violet-700">
        <div className="flex items-center gap-3 px-4 py-2 [&>*:nth-child(2)]:mr-auto [&>*:nth-child(3)]:mr-2">
          <BackButtonModal className="mr-4 rounded-full p-1.5 text-white active:bg-slate-300/60 dark:active:bg-slate-300/50" />

          <p className="font-manrope text-xl uppercase text-white">
            {currWorkout.title}
          </p>

          <WorkoutToDoTooltip />
        </div>
      </header>

      <main className="flex flex-col divide-y divide-slate-300 overflow-auto overscroll-contain px-6 dark:divide-slate-800">
        {removeMode
          ? tempExercises.map((exercise, exerciseIndex) => (
              <div key={exercise.id} className="flex flex-col py-6">
                <p className="pb-2 text-2xl font-bold">{exercise.name}</p>

                {note.add && note.onExercise === exercise.id ? (
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      id="note"
                      type="text"
                      value={exercise.note}
                      placeholder="Leave a note..."
                      onChange={(e) => handleNoteInput(e, exercise.id)}
                      className="w-full rounded-none border-b-2 border-violet-500 bg-transparent py-0.5 font-semibold placeholder-slate-400/80 caret-violet-500 placeholder:text-sm placeholder:italic focus:placeholder-slate-300 focus:outline-none dark:text-white dark:placeholder-slate-500 dark:focus:placeholder-slate-700"
                    />

                    <button
                      type="button"
                      onClick={async () => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 100),
                        );
                        setNote({ add: false, onExercise: exercise.id });
                      }}
                      className="rounded-[8px] px-4 font-manrope text-lg font-bold text-blue-400 active:bg-slate-300 dark:text-blue-500 dark:active:bg-slate-700"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <p className="font-semibold italic text-slate-400 dark:text-slate-400">
                    {exercise.note}
                  </p>
                )}

                <div className="flex justify-evenly pt-6">
                  <div className="flex w-2/5 flex-col items-center gap-3">
                    <label
                      htmlFor={`${exercise.name} - rep 1`}
                      className="font-manrope text-xs font-semibold uppercase dark:text-slate-300"
                    >
                      Reps
                    </label>
                    {exercise.reps.map((_, repIndex) => (
                      <input
                        key={`${exercise.name} - rep ${repIndex + 1}`}
                        id={`${exercise.name} - rep ${repIndex + 1}`}
                        type="text"
                        disabled={removeMode}
                        inputMode="tel"
                        placeholder={
                          exercisesToDo[exerciseIndex]?.reps[repIndex]
                            ? exercisesToDo[exerciseIndex].reps[repIndex]
                            : exercisesToDo[exerciseIndex]?.reps[repIndex - 1]
                        }
                        onChange={(e) => {
                          handleRepsInput(e, exercise.id, repIndex);
                        }}
                        className="input-field w-full py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:opacity-60 dark:caret-violet-500 dark:focus:ring-violet-500"
                      />
                    ))}

                    <button
                      type="button"
                      disabled={removeMode}
                      onClick={async () => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 100),
                        );

                        addNewSet(exercise.id);
                      }}
                      className="mt-3 flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm text-slate-500/85 active:scale-95 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-400 dark:active:bg-slate-700"
                    >
                      <AddIcon size={20} strokeWidth={1.2} />
                      <p className="font-semibold uppercase">Add set</p>
                    </button>
                  </div>

                  <div className="flex w-2/5 flex-col items-center gap-3">
                    <label
                      htmlFor={`${exercise.name} - weight 1`}
                      className="font-manrope text-xs font-semibold uppercase dark:text-slate-300"
                    >
                      Weights - kg
                    </label>
                    {exercise.weights.map((_, weightIndex) => (
                      <div
                        className="flex items-center gap-4"
                        key={`${exercise.name} - weight ${weightIndex + 1}`}
                      >
                        <input
                          id={`${exercise.name} - weight ${weightIndex + 1}`}
                          type="text"
                          disabled={removeMode}
                          inputMode="decimal"
                          placeholder={
                            exercisesToDo[exerciseIndex]?.weights[weightIndex]
                              ? exercisesToDo[exerciseIndex].weights[
                                  weightIndex
                                ]
                              : exercisesToDo[exerciseIndex]?.weights[
                                  weightIndex - 1
                                ]
                          }
                          onChange={(e) => {
                            handleWeightInput(e, exercise.id, weightIndex);
                          }}
                          className="input-field w-full py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:opacity-60 dark:caret-violet-500 dark:focus:ring-violet-500"
                        />
                        {removeMode && (
                          <button
                            type="button"
                            onClick={() => removeSet(exercise.id, weightIndex)}
                            className="rounded-full bg-red-500 p-1.5 text-white"
                          >
                            {RemoveExerciseIcon}
                            <p className="sr-only">Remove this set button</p>
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      disabled={removeMode}
                      onClick={async () => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 100),
                        );

                        setNote({
                          onExercise: exercise.id,
                          add: true,
                        });
                      }}
                      className="mt-3 flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm text-slate-500/85 active:scale-95 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-400 dark:active:bg-slate-700"
                    >
                      <AddIcon size={20} strokeWidth={1.2} />
                      <p className="font-semibold uppercase">Add note</p>
                    </button>
                  </div>
                </div>
              </div>
            ))
          : currWorkout.exercises.map((exercise, exerciseIndex) => (
              <div key={exercise.id} className="flex flex-col py-6">
                <p className="pb-2 text-2xl font-bold">{exercise.name}</p>

                {note.add && note.onExercise === exercise.id ? (
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      id="note"
                      type="text"
                      value={exercise.note}
                      placeholder="Leave a note..."
                      onChange={(e) => handleNoteInput(e, exercise.id)}
                      className="w-full rounded-none border-b-2 border-violet-500 bg-transparent py-0.5 font-semibold placeholder-slate-400/80 caret-violet-500 placeholder:text-sm placeholder:italic focus:placeholder-slate-300 focus:outline-none dark:text-white dark:placeholder-slate-500 dark:focus:placeholder-slate-700"
                    />

                    <button
                      type="button"
                      onClick={async () => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 100),
                        );
                        setNote({ add: false, onExercise: exercise.id });
                      }}
                      className="rounded-[8px] px-4 font-manrope text-lg font-bold text-blue-400 active:bg-slate-300 dark:text-blue-500 dark:active:bg-slate-700"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <p className="font-semibold italic text-slate-400 dark:text-slate-400">
                    {exercise.note}
                  </p>
                )}

                <div className="flex justify-evenly pt-6">
                  <div className="flex w-2/5 flex-col items-center gap-3">
                    <label
                      htmlFor={`${exercise.name} - rep 1`}
                      className="font-manrope text-xs font-semibold uppercase dark:text-slate-300"
                    >
                      Reps
                    </label>
                    {exercise.reps.map((_, repIndex) => (
                      <input
                        key={`${exercise.name} - rep ${repIndex + 1}`}
                        id={`${exercise.name} - rep ${repIndex + 1}`}
                        type="text"
                        disabled={removeMode}
                        inputMode="tel"
                        placeholder={
                          exercisesToDo[exerciseIndex]?.reps[repIndex]
                            ? exercisesToDo[exerciseIndex].reps[repIndex]
                            : exercisesToDo[exerciseIndex]?.reps[repIndex - 1]
                        }
                        onChange={(e) => {
                          handleRepsInput(e, exercise.id, repIndex);
                        }}
                        className="input-field w-full py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:opacity-60 dark:caret-violet-500 dark:focus:ring-violet-500"
                      />
                    ))}

                    <button
                      type="button"
                      disabled={removeMode}
                      onClick={async () => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 100),
                        );

                        addNewSet(exercise.id);
                      }}
                      className="mt-3 flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm text-slate-500/85 active:scale-95 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-400 dark:active:bg-slate-700"
                    >
                      <AddIcon size={20} strokeWidth={1.2} />
                      <p className="font-semibold uppercase">Add set</p>
                    </button>
                  </div>

                  <div className="flex w-2/5 flex-col items-center gap-3">
                    <label
                      htmlFor={`${exercise.name} - weight 1`}
                      className="font-manrope text-xs font-semibold uppercase dark:text-slate-300"
                    >
                      Weights - kg
                    </label>
                    {exercise.weights.map((_, weightIndex) => (
                      <div
                        className="flex items-center gap-4"
                        key={`${exercise.name} - weight ${weightIndex + 1}`}
                      >
                        <input
                          id={`${exercise.name} - weight ${weightIndex + 1}`}
                          type="text"
                          disabled={removeMode}
                          inputMode="decimal"
                          placeholder={
                            exercisesToDo[exerciseIndex]?.weights[weightIndex]
                              ? exercisesToDo[exerciseIndex].weights[
                                  weightIndex
                                ]
                              : exercisesToDo[exerciseIndex]?.weights[
                                  weightIndex - 1
                                ]
                          }
                          onChange={(e) => {
                            handleWeightInput(e, exercise.id, weightIndex);
                          }}
                          className="input-field w-full py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:opacity-60 dark:caret-violet-500 dark:focus:ring-violet-500"
                        />

                        {removeMode && (
                          <button
                            onClick={() => removeSet(exercise.id, weightIndex)}
                            className="rounded-full bg-red-500 p-1.5 text-white"
                          >
                            {RemoveExerciseIcon}
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      disabled={removeMode}
                      onClick={async () => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 100),
                        );

                        setNote({
                          onExercise: exercise.id,
                          add: true,
                        });
                      }}
                      className="mt-3 flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm text-slate-500/85 active:scale-95 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-400 dark:active:bg-slate-700"
                    >
                      <AddIcon size={20} strokeWidth={1.2} />
                      <p className="font-semibold uppercase">Add note</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </main>

      <footer className="border-t border-slate-300/80 px-6 pb-6 pt-2 text-end dark:border-slate-800">
        <AnimatePresence mode="wait">
          {removeMode ? (
            <motion.div
              key="remove-mode-footer"
              initial={{ opacity: 0, x: 24 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
              }}
              exit={{
                opacity: 0,
                x: -24,
                transition: { duration: 0.15, ease: [0.36, 0.66, 0.04, 1] },
              }}
              className="flex items-center justify-between"
            >
              <button
                type="button"
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 100));
                  setTempExercises([...currWorkout.exercises]);
                  setRemoveMode(false);
                }}
                className="rounded-lg px-2.5 py-1 text-lg font-semibold active:scale-95 active:bg-slate-200 dark:text-slate-300 dark:active:bg-slate-700"
              >
                Close
                <p className="sr-only">Close Remove mode</p>
              </button>

              <button
                type="button"
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 100));
                  setCurrWorkout((prev) => {
                    return {
                      ...prev,
                      exercises: [...tempExercises],
                    };
                  });
                  setRemoveMode(false);
                }}
                className="my-[3px] rounded-lg px-2.5 py-1 text-xl font-bold text-green-500 active:scale-95 active:bg-slate-200 dark:text-green-600 dark:active:bg-slate-700"
              >
                Save
                <p className="sr-only">Save changes in Remove mode</p>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form-footer"
              initial={{ opacity: 0, x: 24 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
              }}
              exit={{
                opacity: 0,
                x: -24,
                transition: { duration: 0.15, ease: [0.36, 0.66, 0.04, 1] },
              }}
              className="flex items-center justify-between"
            >
              <div className="space-x-4">
                <AddExerciseDrawer
                  updateExercises={updateExercises}
                  className="rounded-full p-2 text-green-500 active:scale-95 active:bg-slate-200 dark:text-green-600 dark:active:bg-slate-700"
                />

                <button
                  type="button"
                  onClick={async () => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    setRemoveMode(true);
                  }}
                  className="rounded-full p-2 text-red-500 active:bg-slate-200 dark:active:bg-slate-700"
                >
                  <TrashBinIcon className="size-6" strokeWidth={1.5} />
                  <p className="sr-only">Enter Remove mode</p>
                </button>
              </div>

              <DoneButton
                formId="submit-done-workout"
                open={openDoneModal}
                setOpen={setOpenDoneModal}
                stopTimer={() =>
                  setTime((prev) => {
                    return {
                      ...prev,
                      end: new Date(),
                    };
                  })
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </form>
  );
};

const DoneButton = ({
  formId,
  open,
  setOpen,
  stopTimer,
}: {
  formId: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  stopTimer: () => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles>
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className="rounded-lg px-2.5 py-1 text-xl font-bold text-green-500 active:scale-95 active:bg-slate-200 dark:text-green-600 dark:active:bg-slate-700"
      >
        Done
        <p className="sr-only">Done button</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col gap-3 rounded-modal bg-white/90 text-center dark:bg-slate-700/70">
            <Drawer.Title className="px-2 pb-2 pt-5 text-sm font-semibold">
              Are you sure you want to submit workout?
            </Drawer.Title>

            <button
              type="submit"
              form={formId}
              disabled={pending}
              onClick={async () => {
                stopTimer();
              }}
              className="w-full rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-green-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-green-500/75 dark:border-slate-600 active:dark:bg-slate-600/90 disabled:dark:bg-slate-900/75 disabled:dark:text-green-800"
            >
              {pending ? "Submitting..." : "Submit"}
            </button>
          </div>

          <button
            onClick={async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));
              setOpen(false);
            }}
            className="w-full rounded-modal bg-white p-3 text-xl font-bold text-violet-500 focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
