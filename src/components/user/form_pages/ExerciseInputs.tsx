import { type ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"
import { ClearInputButton, SegmentedButtons } from "@/components/CustomButtons"
import { TrashBinIcon } from "@/components/icons/user/modify"
import { type LimbInvolvement, limbInvolementButtons, type SetsSectionProps } from "@/util/types"
import { BUTTON_TIMEOUT, isValidRepsInput, isValidWeightInput, timeout } from "@/util/utils"
import { ErrorComponent } from "../../ErrorComponent"
import { SetsPerExerciseIndicator } from "../Indicators"
import { CreateNewSetDrawer } from "./CreateNewSetDrawer"

export const SelectLimbInvolvement = ({
  selected,
  handleLimbInvolvementInput,
}: {
  selected: LimbInvolvement | undefined
  handleLimbInvolvementInput: (value: LimbInvolvement) => void
}) => {
  return (
    <div className="group-disabled:pointer-events-none group-disabled:opacity-50">
      <p className="block font-bold font-manrope text-[14px] text-slate-600 uppercase leading-4 dark:text-slate-200">
        Limb involvement
        <span className="pl-1 text-[12px] text-slate-400/80 lowercase italic leading-3 dark:text-slate-500">
          (recommended)
        </span>
      </p>

      <SegmentedButtons
        buttons={limbInvolementButtons}
        selectedButton={selected}
        selectedIndicatorId="selected-limb-involvement"
        handleClickEvent={handleLimbInvolvementInput}
      />
    </div>
  )
}

export const NameInput = ({
  name,
  nameError,
  handleNameInput,
  resetNameInput,
}: {
  name: string
  nameError: string[] | undefined
  handleNameInput: (eventValue: React.ChangeEvent<HTMLInputElement>) => void
  resetNameInput: () => void
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-2 group-disabled:opacity-50">
      <label
        htmlFor="name"
        className="block font-bold font-manrope text-[14px] text-slate-600 uppercase leading-4 dark:text-slate-200"
      >
        Name
      </label>

      <div
        className={twMerge(
          "relative w-full rounded-xl bg-white px-4 py-2.5 shadow-md ring-1 ring-slate-300 ring-inset dark:bg-slate-800 dark:shadow-slate-950/75 dark:ring-slate-600",
          isFocused && "ring-2 ring-green-500 dark:ring-green-600",
          nameError && "ring-red-500 dark:ring-red-500"
        )}
      >
        <input
          required
          id="name"
          value={name}
          type="text"
          placeholder="e.g. Bench press"
          onChange={(e) => handleNameInput(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={twMerge(
            "w-full bg-transparent font-bold font-manrope text-sm placeholder-slate-400/80 caret-green-500 outline-none placeholder:font-semibold placeholder:italic focus:placeholder-slate-300 dark:placeholder-slate-500 dark:caret-green-600 dark:focus:placeholder-slate-600",
            name && isFocused && "w-[calc(100%-36px)]"
          )}
        />

        {name && isFocused && (
          <div className="absolute inset-y-0 right-0 flex items-center px-4">
            <ClearInputButton
              srOnlyDescription="Clear name input"
              strokeWidth={3}
              onMouseDown={(e) => {
                e.preventDefault()
                resetNameInput()
              }}
              className="rounded-full bg-green-500 p-1 text-white dark:bg-green-600"
              svgClassName="size-3.5"
            />
          </div>
        )}
      </div>

      <ErrorComponent errorArr={nameError} />
    </div>
  )
}

export const NoteInput = ({
  note,
  withLabel,
  className,
  focusedWrapperClassName,
  focusedInputClassName,
  onChange,
  resetNoteInput,
}: {
  note: string
  withLabel?: boolean
  onChange: ComponentProps<"input">["onChange"]
  resetNoteInput: () => void
  focusedWrapperClassName: string
  focusedInputClassName: string
  className: ComponentProps<"input">["className"]
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={twMerge("group-disabled:opacity-50", withLabel && "space-y-2")}>
      {withLabel && (
        <label
          htmlFor="note"
          className="block font-bold font-manrope text-[14px] text-slate-600 uppercase leading-4 dark:text-slate-200"
        >
          Note
          <span className="pl-1 text-[12px] text-slate-400/80 lowercase italic leading-3 dark:text-slate-500">
            (optional)
          </span>
        </label>
      )}

      <div className={twMerge("relative w-full", className, isFocused && focusedWrapperClassName)}>
        <input
          id="note"
          type="text"
          value={note}
          placeholder="Leave a note..."
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={twMerge(
            "w-full bg-transparent font-bold placeholder-slate-400/80 caret-green-500 outline-none placeholder:font-semibold placeholder:italic focus:placeholder-slate-300 dark:placeholder-slate-500 dark:caret-green-600 dark:focus:placeholder-slate-600",
            note && isFocused && focusedInputClassName
          )}
        />
        {note && isFocused && (
          <div
            className={twMerge("absolute inset-y-0 right-0 flex items-center", withLabel && "px-4")}
          >
            <ClearInputButton
              srOnlyDescription="Clear note input"
              strokeWidth={3}
              onMouseDown={(e) => {
                e.preventDefault()
                resetNoteInput()
              }}
              className="rounded-full bg-green-500 p-1 text-white dark:bg-green-600"
              svgClassName="size-3.5"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export const SetsSection = ({
  sets,
  limbInvolvement,
  setsError,
  repsError,
  weightError,
  updateSets,
}: SetsSectionProps) => {
  return (
    <div className="group-disabled:pointer-events-none group-disabled:opacity-50">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="block font-bold font-manrope text-[14px] text-slate-600 uppercase leading-4 dark:text-slate-200">
            Sets
          </p>

          <SetsPerExerciseIndicator
            sets={sets}
            limbInvolvement={limbInvolvement}
            className="rounded-lg+ bg-white px-3 py-1.5 shadow-md ring-slate-300 dark:bg-slate-800 dark:shadow-slate-950/75 dark:ring-slate-600"
          />
        </div>

        <CreateNewSetDrawer sets={sets} updateSets={updateSets} />
      </div>

      {sets.length === 0 ? (
        <div className="flex h-[126px] flex-col items-center justify-center gap-4">
          <p className="font-semibold text-slate-400 text-sm">
            Press the{" "}
            <span className="font-extrabold text-slate-500 uppercase dark:text-slate-100">
              plus
            </span>{" "}
            button to add a new set
          </p>

          <ErrorComponent errorArr={setsError} />
        </div>
      ) : (
        <div className="no-scrollbar flex overflow-x-auto">
          <div className="flex flex-1 gap-4 pt-8 pb-4">
            {sets.map((set) => (
              <div
                key={set.id}
                className="flex shrink-0 grow-0 basis-2/5 items-center justify-between sm:basis-1/3"
              >
                <div
                  className={twMerge(
                    "w-[calc(100%-48px)] space-y-1.5",
                    set.purpose === "working" && limbInvolvement === "unilateral"
                      ? "text-orange-500"
                      : set.purpose === "working" && limbInvolvement === "bilateral"
                        ? "text-green-500"
                        : "text-slate-500 dark:text-white"
                  )}
                >
                  <input
                    required
                    type="text"
                    name="reps"
                    value={set.reps}
                    placeholder="Reps"
                    onChange={(e) => updateSets({ type: "edit", event: e, setId: set.id })}
                    className={twMerge(
                      "w-full rounded-xl bg-white py-1.5 text-center font-bold placeholder-slate-400/80 caret-green-500 shadow-md outline-none ring-1 ring-inset placeholder:font-medium placeholder:text-sm placeholder:italic focus:placeholder-slate-300 focus:ring-2 dark:bg-slate-800 dark:placeholder-slate-500 dark:caret-green-600 dark:shadow-slate-950/75 dark:focus:placeholder-slate-700",
                      repsError && !isValidRepsInput(set.reps)
                        ? "ring-red-500 dark:ring-red-500"
                        : "ring-slate-300 focus:ring-green-500 dark:ring-slate-600 dark:focus:ring-green-600"
                    )}
                  />

                  <input
                    required
                    type="text"
                    name="weight"
                    value={set.weight}
                    placeholder="Weight"
                    onChange={(e) => updateSets({ type: "edit", event: e, setId: set.id })}
                    className={twMerge(
                      "w-full rounded-xl bg-white py-1.5 text-center font-bold placeholder-slate-400/80 caret-green-500 shadow-md outline-none ring-1 ring-inset placeholder:font-medium placeholder:text-sm placeholder:italic focus:placeholder-slate-300 focus:ring-2 dark:bg-slate-800 dark:placeholder-slate-500 dark:caret-green-600 dark:shadow-slate-950/75 dark:focus:placeholder-slate-700",
                      weightError && !isValidWeightInput(set.weight)
                        ? "ring-red-500 dark:ring-red-500"
                        : "ring-slate-300 focus:ring-green-500 dark:ring-slate-600 dark:focus:ring-green-600"
                    )}
                  />
                </div>

                <div className="size-8">
                  <button
                    type="button"
                    onClick={async () => {
                      await timeout(BUTTON_TIMEOUT)
                      updateSets({ type: "remove", setId: set.id })
                    }}
                    className="rounded-full bg-white p-1.5 text-red-500 shadow-md ring-1 ring-slate-300 ring-inset active:bg-slate-200 dark:bg-slate-800 dark:text-red-400 dark:shadow-slate-950/75 dark:ring-slate-600 dark:active:bg-slate-700"
                  >
                    <TrashBinIcon strokeWidth={1.3} className="size-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(repsError || weightError) && (
        <div className="space-y-1.5 pb-2">
          <ErrorComponent errorArr={repsError} />
          <ErrorComponent errorArr={weightError} />
        </div>
      )}
    </div>
  )
}
