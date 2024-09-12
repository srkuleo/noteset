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
  createSets: (input: string | number) => void;
}) => {
  const chooseSetCount = [1, 2, 3] as const;
  const [needMoreSets, setNeedMoreSets] = useState(false);

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
            <div className="flex max-w-[400px] items-center gap-2 px-1 py-0.5">
              <input
                autoFocus
                id="setsInput"
                name="sets"
                value={sets === 0 ? "" : sets}
                type="number"
                inputMode="numeric"
                placeholder="More..."
                onChange={(e) => createSets(e.target.value)}
                className="w-3/5 rounded-none border-b-2 border-violet-500 bg-transparent py-0.5 font-semibold placeholder-slate-400/80 caret-violet-500 placeholder:text-sm placeholder:italic focus:placeholder-slate-300 focus:outline-none dark:text-white dark:placeholder-slate-500 dark:focus:placeholder-slate-700"
              />

              <button
                type="button"
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 100));

                  setNeedMoreSets(false);
                }}
                className="w-1/5 rounded-lg py-2 font-manrope font-bold text-blue-400 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-blue-500 dark:active:bg-slate-800"
              >
                Back
              </button>
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
                  onClick={() => createSets(setCount)}
                  className={twMerge(
                    "w-1/6 rounded-xl bg-white py-2 font-manrope text-sm font-semibold ring-1 ring-slate-400/40 dark:bg-slate-900/80 dark:ring-slate-700",
                    sets === setCount &&
                      "bg-green-500 text-white dark:bg-green-600 dark:ring-slate-50",
                  )}
                >
                  {setCount}
                </button>
              ))}

              <button
                type="button"
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 100));

                  setNeedMoreSets(true);
                }}
                className="w-1/5 rounded-lg py-1.5 font-manrope font-bold text-blue-400 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-blue-500 dark:active:bg-slate-800"
              >
                More
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
  modifySets,
}: {
  sets: SetType[];
  setsErrors: string[] | undefined;
  isPending: boolean;
  modifySets: (e: React.ChangeEvent<HTMLInputElement>, setId: string) => void;
}) => {
  return (
    <AnimatePresence>
      {sets.length !== 0 && (
        <motion.div
          initial={{ height: 0 }}
          animate={{
            height: "auto",
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
        >
          <div
            className={`${isPending && "pointer-events-non opacity-50"} flex flex-col overflow-hidden`}
          >
            <div className="flex gap-4 overflow-x-scroll px-1 py-2 no-scrollbar">
              {sets.map((set, setIndex) => (
                <div key={set.id} className="flex w-1/3 flex-col gap-2">
                  <label
                    htmlFor={`rep ${setIndex + 1}`}
                    className="flex items-center gap-1 pl-1 font-manrope text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
                  >
                    Set {setIndex + 1}
                  </label>

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
                      "px-0 py-1.5 text-center placeholder:text-xs",
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
                      "px-0 py-1.5 text-center placeholder:text-xs",
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
