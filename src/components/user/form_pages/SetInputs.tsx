import type { ChangeEvent } from "react"
import { twMerge } from "tailwind-merge"
import { SegmentedButtons } from "@/components/CustomButtons"
import { purposeButtons, type SetPurpose, type SetType } from "@/util/types"
import { ErrorComponent } from "../../ErrorComponent"

export const SetPurposeInput = ({
  selected,
  handlePurposeInput,
}: {
  selected: SetPurpose
  handlePurposeInput: (value: Exclude<SetPurpose, "none">) => void
}) => {
  return (
    <div className="group-disabled:pointer-events-none group-disabled:opacity-50">
      <p className="block font-bold font-manrope text-[14px] text-slate-600 uppercase leading-4 dark:text-slate-200">
        Choose a set purpose
      </p>

      <SegmentedButtons
        buttons={purposeButtons}
        selectedButton={selected}
        selectedIndicatorId="selected-set-purpose"
        handleClickEvent={handlePurposeInput}
      />
    </div>
  )
}

type SetOrderInputProps = {
  purpose: SetPurpose
  currSets: SetType[]
  newSetIndex: number
  setIndexError: string[] | undefined
  handleSetOrderInput: (placement: number) => void
}

export const SetOrderInput = ({
  purpose,
  currSets,
  newSetIndex,
  setIndexError,
  handleSetOrderInput,
}: SetOrderInputProps) => {
  const filteredSets = currSets.filter((set) => set.purpose === purpose)

  const label = purpose === "warmup" ? "Warmup set - order" : "Working set - order"

  return (
    <div className="group-disabled:pointer-events-none group-disabled:opacity-50">
      <p className="block font-bold font-manrope text-[14px] text-slate-600 uppercase leading-4 dark:text-slate-200">
        {label}
      </p>

      <div className="no-scrollbar flex w-full overflow-x-auto py-4">
        <div className="flex flex-1 gap-4">
          {filteredSets.map((_, index) => (
            <div key={index} className="flex h-9 shrink-0 grow-0 basis-9">
              <button
                type="button"
                onClick={() => handleSetOrderInput(index)}
                className={twMerge(
                  "w-full rounded-full bg-white font-bold font-manrope shadow-md ring-1 ring-slate-300 ring-inset active:scale-95 dark:bg-slate-800 dark:shadow-slate-950/75 dark:ring-slate-600",
                  index === newSetIndex &&
                    "bg-violet-400 text-white ring-violet-500 dark:bg-violet-600 dark:ring-white",
                  setIndexError && "ring-red-500 dark:ring-red-500"
                )}
              >
                {index + 1}
              </button>
            </div>
          ))}

          <div className="flex h-9 shrink-0 grow-0 basis-9">
            <button
              type="button"
              onClick={() => handleSetOrderInput(filteredSets.length)}
              className={twMerge(
                "w-full rounded-full bg-white font-bold font-manrope shadow-md ring-1 ring-slate-300 ring-inset active:scale-95 dark:bg-slate-800 dark:shadow-slate-950/75 dark:ring-slate-600",
                filteredSets.length === newSetIndex &&
                  "bg-violet-400 text-white ring-violet-500 dark:bg-violet-600 dark:ring-white",
                setIndexError && "ring-red-500 dark:ring-red-500"
              )}
            >
              {filteredSets.length + 1}
            </button>
          </div>
        </div>
      </div>

      <ErrorComponent errorArr={setIndexError} className="pb-2" />
    </div>
  )
}

export const RepsAndWeightInputs = ({
  repsError,
  weightError,
  handleInputField,
}: {
  repsError: string[] | undefined
  weightError: string[] | undefined
  handleInputField: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className="group-disabled:opacity-50">
      <label
        htmlFor="reps"
        className="block font-bold font-manrope text-[14px] text-slate-600 uppercase leading-4 dark:text-slate-200"
      >
        Reps and weight
      </label>

      <div className="flex justify-evenly py-6">
        <input
          required
          id="reps"
          name="reps"
          type="text"
          placeholder="Reps"
          onChange={handleInputField}
          className={twMerge(
            "w-1/3 rounded-xl bg-white px-4 py-[7px] text-center font-bold font-manrope leading-none placeholder-slate-400/80 caret-green-500 shadow-md outline-none ring-1 ring-inset placeholder:font-medium placeholder:text-sm placeholder:italic focus:placeholder-slate-300 focus:ring-2 dark:bg-slate-800 dark:placeholder-slate-500 dark:caret-green-600 dark:shadow-slate-950/75 dark:focus:placeholder-slate-700",
            repsError
              ? "ring-red-500 dark:ring-red-500"
              : "ring-slate-300 focus:ring-green-500 dark:ring-slate-600 dark:focus:ring-green-600"
          )}
        />

        <input
          required
          id="weight"
          name="weight"
          type="text"
          inputMode="decimal"
          placeholder="Weight"
          onChange={handleInputField}
          className={twMerge(
            "w-1/3 rounded-xl bg-white px-4 py-[7px] text-center font-bold font-manrope leading-none placeholder-slate-400/80 caret-green-500 shadow-md outline-none ring-1 ring-inset placeholder:font-medium placeholder:text-sm placeholder:italic focus:placeholder-slate-300 focus:ring-2 dark:bg-slate-800 dark:placeholder-slate-500 dark:caret-green-600 dark:shadow-slate-950/75 dark:focus:placeholder-slate-700",
            weightError
              ? "ring-red-500 dark:ring-red-500"
              : "ring-slate-300 focus:ring-green-500 dark:ring-slate-600 dark:focus:ring-green-600"
          )}
        />
      </div>

      {(repsError || weightError) && (
        <div className="space-y-1.5 pb-2">
          <ErrorComponent errorArr={repsError} />
          <ErrorComponent errorArr={weightError} />
        </div>
      )}
    </div>
  )
}
