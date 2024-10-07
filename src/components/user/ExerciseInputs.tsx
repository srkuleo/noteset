import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { slideX } from "@/util/utils";
import { ErrorComponent } from "../ErrorComponent";

import type { SetType } from "@/util/types";

export const NameInput = ({
  name,
  nameError,
  handleNameInput,
  form,
}: {
  name: string;
  nameError: string[] | undefined;
  handleNameInput: (eventValue: React.ChangeEvent<HTMLInputElement>) => void;
  form?: "edit" | "add";
}) => {
  return (
    <div className="space-y-2 group-disabled:pointer-events-none group-disabled:opacity-50">
      <label
        htmlFor="name"
        className="pl-1 font-manrope text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
      >
        Name
      </label>
      <input
        required
        autoFocus={form === "add"}
        id="name"
        value={name}
        type="text"
        placeholder="e.g. Bench press"
        onChange={(e) => handleNameInput(e)}
        className={twMerge(
          "input-field",
          "w-full py-2",
          nameError && "ring-red-500 dark:ring-red-500",
        )}
      />
      <ErrorComponent errorArr={nameError} className="gap-3" />
    </div>
  );
};

export const NoteInput = ({
  note,
  handleNoteInput,
}: {
  note: string;
  handleNoteInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="space-y-2 group-disabled:pointer-events-none group-disabled:opacity-50">
      <label
        htmlFor="note"
        className="flex items-center gap-1 pl-1 font-manrope text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
      >
        Note
        <span className="text-xs lowercase italic text-slate-400 dark:text-slate-500">
          (optional)
        </span>
      </label>

      <input
        id="note"
        type="text"
        value={note}
        placeholder="Leave a note..."
        onChange={(e) => handleNoteInput(e)}
        className={twMerge("input-field", "w-full py-2")}
      />
    </div>
  );
};

export const SelectSetsInput = ({
  sets,
  createSets,
}: {
  sets: number;
  setsError: string[] | undefined;
  createSets: (newSetsCount: number) => void;
}) => {
  const chooseSetCount = [1, 2, 3] as const;
  const [needMoreSets, setNeedMoreSets] = useState(false);
  const [setsCount, setSetsCount] = useState(sets);

  return (
    <div className="space-y-1 group-disabled:pointer-events-none group-disabled:opacity-50">
      <label
        htmlFor={needMoreSets ? "setsInput" : "Set 1"}
        className="pl-1 font-manrope text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
      >
        Select number of sets
      </label>

      <AnimatePresence mode="wait" initial={false}>
        {needMoreSets ? (
          <motion.div
            key="more-sets"
            variants={slideX}
            initial="right-hidden"
            animate="slide-from-right"
            exit="slide-to-left"
          >
            <div className="flex max-w-[400px] justify-between px-1 py-0.5">
              <input
                autoFocus
                id="setsInput"
                name="sets"
                value={setsCount === 0 ? "" : setsCount}
                type="number"
                inputMode="numeric"
                placeholder="Sets count"
                onChange={(e) => setSetsCount(Number(e.target.value))}
                className="w-1/3 rounded-none border-b-2 border-violet-500 bg-transparent py-0.5 text-center font-semibold placeholder-slate-400/80 caret-violet-500 placeholder:text-sm placeholder:italic focus:placeholder-slate-300 focus:outline-none dark:text-white dark:placeholder-slate-500 dark:focus:placeholder-slate-700"
              />

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={async () => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    createSets(setsCount);
                    setNeedMoreSets(false);
                  }}
                  className="py-2 font-manrope font-bold text-blue-400 active:text-blue-600 disabled:pointer-events-none disabled:opacity-30 dark:text-blue-500 dark:active:text-blue-700"
                >
                  Done
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    setNeedMoreSets(false);
                  }}
                  className="py-2 font-manrope font-bold text-slate-400 active:text-slate-300 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-500 dark:active:text-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="choose-sets"
            variants={slideX}
            initial="right-hidden"
            animate="slide-from-right"
            exit="slide-to-left"
          >
            <div className="flex max-w-[400px] items-center gap-2 p-1">
              {chooseSetCount.map((setCount) => (
                <button
                  key={setCount}
                  id={`Set ${setCount}`}
                  type="button"
                  onClick={() => {
                    createSets(setCount);
                    setSetsCount(setCount);
                  }}
                  className={twMerge(
                    "w-1/6 rounded-xl bg-white py-2 font-manrope text-sm font-semibold ring-1 ring-slate-400/40 dark:bg-slate-900/80 dark:ring-slate-700",
                    sets === setCount &&
                      "bg-green-500 text-white dark:bg-green-600 dark:ring-slate-50",
                  )}
                >
                  {setCount}
                </button>
              ))}

              {sets > 3 && (
                <div className="w-1/6 rounded-xl bg-green-500 py-2 text-center font-manrope text-sm font-semibold text-white ring-1 ring-slate-400/40 dark:bg-green-600 dark:ring-slate-50">
                  {sets}
                </div>
              )}

              <button
                type="button"
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 100));

                  setNeedMoreSets(true);
                }}
                className="py-1.5 pl-2 font-manrope font-bold text-blue-400 active:text-blue-600 disabled:pointer-events-none disabled:opacity-30 dark:text-blue-500 dark:active:text-blue-700"
              >
                Other
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const RepsAndWeightInputs = ({
  sets,
  setsErrors,
  isPending,
  markSetAsWarmup,
  modifySets,
}: {
  sets: SetType[];
  setsErrors: string[] | undefined;
  isPending: boolean;
  markSetAsWarmup: (setId: string) => void;
  modifySets: (e: React.ChangeEvent<HTMLInputElement>, setId: string) => void;
}) => {
  return (
    <AnimatePresence>
      {sets.length !== 0 && (
        <motion.div
          initial={{ height: 0 }}
          animate={{
            height: "auto",
            transition: {
              duration: 0.3,
              ease: [0.36, 0.66, 0.04, 1],
            },
          }}
        >
          <div
            className={`${isPending && "pointer-events-non opacity-50"} flex flex-col overflow-hidden`}
          >
            <div className="flex gap-6 overflow-x-scroll px-1 py-4 no-scrollbar">
              {sets.map((set, setIndex) => (
                <div key={set.id} className="flex max-w-[50%] flex-col gap-2">
                  <div className="flex justify-between pb-2">
                    <label
                      htmlFor={`rep ${setIndex + 1}`}
                      className="flex items-center gap-1 pl-1 font-manrope text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
                    >
                      Set {setIndex + 1}
                    </label>

                    <div className="flex items-center gap-0.5">
                      <label
                        htmlFor={`warmup set ${setIndex + 1}`}
                        className="text-xs"
                      >
                        Warmup
                      </label>

                      <input
                        id={`warmup set ${setIndex + 1}`}
                        type="checkbox"
                        checked={set.warmup}
                        onChange={() => markSetAsWarmup(set.id)}
                        className="accent-green-500"
                      />
                    </div>
                  </div>

                  <input
                    required
                    id={`rep ${setIndex + 1}`}
                    name="reps"
                    value={set.reps}
                    type="text"
                    placeholder={`Rep ${setIndex + 1}`}
                    onChange={(e) => modifySets(e, set.id)}
                    className={twMerge(
                      "input-field",
                      "mx-auto max-w-[75%] px-0 py-1.5 text-center placeholder:text-xs",
                      setsErrors && !/^\d+(?:[-+]\d+)?$/.test(set.reps)
                        ? "ring-red-500 dark:ring-red-500"
                        : "",
                    )}
                  />

                  <input
                    required
                    id={`weight ${setIndex + 1}`}
                    name="weight"
                    value={set.weight}
                    type="text"
                    inputMode="decimal"
                    placeholder={`Weight ${setIndex + 1}`}
                    onChange={(e) => modifySets(e, set.id)}
                    className={twMerge(
                      "input-field",
                      "mx-auto max-w-[75%] px-0 py-1.5 text-center placeholder:text-xs",
                      setsErrors && !/^\d+(,\d+|\.\d+)?$/.test(set.weight)
                        ? "ring-red-500 dark:ring-red-500"
                        : "",
                    )}
                  />
                </div>
              ))}
            </div>

            <p className="pl-1 text-xs italic text-slate-400 dark:text-slate-500">
              (reps: 8-10, 6, 5+2 weight: 27,5, 10, 20.5)
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
