import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { InputFieldError } from "./InputFieldError";

export const NameInput = ({
  name,
  nameError,
  handleNameInput,
}: {
  name: string;
  nameError: string[] | undefined;
  handleNameInput: (input: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="name"
        className="pl-1 text-sm font-semibold uppercase dark:text-slate-200"
      >
        Name
      </label>
      <input
        id="name"
        value={name}
        type="text"
        placeholder="e.g. Bench press"
        onChange={(e) => handleNameInput(e.target.value)}
        className={twMerge(
          "input-field",
          "py-2",
          nameError && "ring-red-500 dark:ring-red-500",
        )}
      />
      <InputFieldError errorArr={nameError} className="gap-3" />
    </div>
  );
};

export const SetsInput = ({
  sets,
  setsError,
  handleSetsInput,
}: {
  sets: number;
  setsError: string[] | undefined;
  handleSetsInput: (input: string | number) => void;
}) => {
  const chooseSets = [1, 2, 3, 4] as const;
  const [needMoreSets, setNeedMoreSets] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={needMoreSets ? "setsInput" : "Set 1"}
        className="pl-1 text-sm font-semibold uppercase dark:text-slate-200"
      >
        Sets
      </label>
      {needMoreSets ? (
        <div className="space-x-4 pb-[6px]">
          <input
            autoFocus
            id="setsInput"
            name="sets"
            type="number"
            inputMode="numeric"
            placeholder="More..."
            value={sets === 0 ? "" : sets}
            className={twMerge("input-field", "max-w-[40%] py-2")}
            onChange={(e) => handleSetsInput(e.target.value)}
          />
          <button
            type="button"
            className="text-sm font-semibold"
            onClick={() => setNeedMoreSets(false)}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 overflow-x-scroll p-1 no-scrollbar">
          {chooseSets.map((cS) => (
            <button
              key={cS}
              id={`Set ${cS}`}
              type="button"
              onClick={() => handleSetsInput(cS)}
              className={twMerge(
                "rounded-xl bg-slate-200/80 px-6 py-2 font-manrope text-sm ring-1 ring-slate-400/50 dark:bg-slate-900/80 dark:ring-slate-700",
                sets === cS &&
                  "bg-green-500 text-white dark:bg-green-600 dark:ring-slate-50",
              )}
            >
              {cS}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setNeedMoreSets(true)}
            className="min-w-fit pl-2 text-sm font-semibold"
          >
            More sets
          </button>
        </div>
      )}
      <InputFieldError errorArr={setsError} className="gap-3" />
    </div>
  );
};

export const RepsInputs = ({
  form,
  reps,
  repsError,
  handleRepsInput,
}: {
  reps: string[];
  repsError: string[] | undefined;
  handleRepsInput: (eventValue: string, index: number) => void;
  form: "edit" | "add";
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="rep 1"
        className="flex items-center gap-2 pl-1 font-manrope text-sm font-semibold uppercase dark:text-slate-200"
      >
        Reps
        <span className="text-xs lowercase italic text-slate-400/65 dark:text-slate-500">
          (eg. 6-8, 10)
        </span>
      </label>
      <div className="flex snap-x snap-proximity gap-2 overflow-x-scroll p-1 no-scrollbar">
        {reps.map((rep, index) => (
          <input
            required
            key={`Rep: ${index + 1}`}
            id={`rep ${index + 1}`}
            value={rep}
            type="text"
            placeholder={`Rep ${index + 1}`}
            autoFocus={form === "add" && index === 0}
            onChange={(e) => handleRepsInput(e.target.value, index)}
            className={twMerge(
              "input-field",
              "max-w-[40%] px-0 py-1.5 text-center",
              repsError && !/^(?:\d+|\d+-\d+)$/.test(rep)
                ? "ring-red-500 dark:ring-red-500"
                : "",
            )}
          />
        ))}
      </div>
      <InputFieldError errorArr={repsError} className="gap-3" />
    </div>
  );
};

export const WeightInputs = ({
  weights,
  weightsError,
  handleWeightInput,
}: {
  weights: string[];
  weightsError: string[] | undefined;
  handleWeightInput: (eventValue: string, index: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="weight 1"
        className="flex items-center gap-2 pl-1 font-manrope text-sm font-semibold uppercase dark:text-slate-200"
      >
        Weights
        <span className="text-xs lowercase italic text-slate-400/65 dark:text-slate-500">
          (eg. 25, 2,5)
        </span>
      </label>
      <div className="flex snap-x snap-proximity gap-2 overflow-x-scroll p-1 no-scrollbar">
        {weights.map((weight, index) => (
          <input
            required
            key={`Weight: ${index + 1}`}
            id={`weight ${index + 1}`}
            value={weight}
            type="text"
            inputMode="decimal"
            placeholder={`Weight ${index + 1}`}
            onChange={(e) => handleWeightInput(e.target.value, index)}
            className={twMerge(
              "input-field",
              "max-w-[40%] px-0 py-1.5 text-center",
              weightsError && !/^\d+(\,\d+)?$/.test(weight)
                ? "ring-red-500 dark:ring-red-500"
                : "",
            )}
          />
        ))}
      </div>
      <InputFieldError errorArr={weightsError} className="gap-3" />
    </div>
  );
};
