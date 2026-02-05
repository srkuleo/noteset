import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { ClearInputButton } from "@/components/CustomButtons"
import { ErrorComponent } from "@/components/ErrorComponent"

//See if it can be refactored
export const TitleInput = ({
  title,
  titleError,
  handleTitleInput,
  resetTitleInput,
}: {
  title: string
  titleError: string[] | undefined
  handleTitleInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  resetTitleInput: () => void
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-2 px-4 group-disabled:opacity-50">
      <label
        htmlFor="title"
        className="block font-bold font-manrope text-[14px] text-slate-600 uppercase leading-4 dark:text-slate-200"
      >
        Title
      </label>

      <div
        className={twMerge(
          "relative w-full rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-slate-300 ring-inset dark:bg-slate-800 dark:shadow-slate-900/80 dark:ring-slate-600",
          isFocused && "ring-2 ring-green-500 dark:ring-green-600",
          titleError && "ring-red-500 dark:ring-red-500"
        )}
      >
        <input
          required
          id="title"
          value={title}
          type="text"
          placeholder="e.g. Upper 1"
          onChange={(e) => handleTitleInput(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={twMerge(
            "w-full bg-transparent font-bold font-manrope text-sm placeholder-slate-400/80 caret-green-500 outline-none placeholder:font-semibold placeholder:italic focus:placeholder-slate-300 group-disabled:opacity-100 dark:placeholder-slate-500 dark:caret-green-600 dark:focus:placeholder-slate-600",
            title && isFocused && "w-[calc(100%-36px)]"
          )}
        />
        {title && isFocused && (
          <div className="absolute inset-y-0 right-0 flex items-center px-4">
            <ClearInputButton
              srOnlyDescription="Clear title input"
              strokeWidth={3}
              onMouseDown={(e) => {
                e.preventDefault()
                resetTitleInput()
              }}
              className="rounded-full bg-green-500 p-1 text-white dark:bg-green-600"
              svgClassName="size-3.5"
            />
          </div>
        )}
      </div>

      <ErrorComponent errorArr={titleError} className="mt-2 pl-1" />
    </div>
  )
}

export const DescriptionInput = ({
  description,
  handleDescriptionInput,
  resetDescriptionInput,
}: {
  description: string | null
  handleDescriptionInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  resetDescriptionInput: () => void
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-2 px-4 group-disabled:opacity-50">
      <label
        htmlFor="description"
        className="block font-bold font-manrope text-[14px] text-slate-600 uppercase leading-4 dark:text-slate-200"
      >
        Description
        <span className="pl-1 text-[12px] text-slate-400/80 lowercase italic leading-3 dark:text-slate-500">
          (optional)
        </span>
      </label>

      <div
        className={twMerge(
          "relative w-full rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-slate-300 ring-inset dark:bg-slate-800 dark:shadow-slate-900/80 dark:ring-slate-600",
          isFocused && "ring-2 ring-green-500 dark:ring-green-600"
        )}
      >
        <input
          id="description"
          value={description ?? ""}
          type="text"
          placeholder="e.g. Workout for the upper body"
          onChange={(e) => handleDescriptionInput(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={twMerge(
            "w-full bg-transparent font-bold font-manrope text-sm placeholder-slate-400/80 caret-green-500 outline-none placeholder:font-semibold placeholder:italic focus:placeholder-slate-300 group-disabled:opacity-100 dark:placeholder-slate-500 dark:caret-green-600 dark:focus:placeholder-slate-600",
            description && isFocused && "w-[calc(100%-36px)]"
          )}
        />
        {description && isFocused && (
          <div className="absolute inset-y-0 right-0 flex items-center px-4">
            <ClearInputButton
              srOnlyDescription="Clear description input"
              strokeWidth={3}
              onMouseDown={(e) => {
                e.preventDefault()
                resetDescriptionInput()
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
