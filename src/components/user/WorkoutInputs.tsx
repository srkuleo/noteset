import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ErrorComponent } from "../ErrorComponent";

export const TitleInput = ({
  title,
  titleError,
  handleTitleInput,
}: {
  title: string;
  titleError: string[] | undefined;
  handleTitleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="space-y-2 px-8 group-disabled:opacity-50">
      <label
        htmlFor="title"
        className="pl-1 font-manrope text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
      >
        Title
      </label>
      <input
        required
        id="title"
        value={title}
        type="text"
        placeholder="e.g. Upper 1"
        onChange={(e) => handleTitleInput(e)}
        className={twMerge(
          "input-field",
          "w-full dark:bg-slate-800 dark:ring-slate-600",
          titleError && "ring-red-500 dark:ring-red-500",
        )}
      />
      <ErrorComponent
        errorArr={titleError}
        className="pl-1 group-disabled:opacity-50"
      />
    </div>
  );
};

export const DescriptionInput = ({
  description,
  handleDescriptionInput,
  resetDescriptionInput,
}: {
  description: string | null;
  handleDescriptionInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetDescriptionInput: () => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2 px-8 group-disabled:opacity-50">
      <label
        htmlFor="description"
        className="flex items-center gap-1 pl-1 font-manrope text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
      >
        Description
        <span className="text-xs lowercase italic text-slate-400/80 dark:text-slate-500">
          (optional)
        </span>
      </label>

      <div
        className={twMerge(
          "relative w-full rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-400/40 dark:bg-slate-800 dark:ring-slate-600",
          isFocused && "ring-2 ring-green-500 dark:ring-green-600",
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
            "w-full bg-transparent font-semibold leading-none placeholder-slate-400/80 caret-green-500 outline-none placeholder:text-sm placeholder:italic focus:placeholder-slate-300 dark:placeholder-slate-500 dark:caret-green-600 dark:focus:placeholder-slate-600",
            description && isFocused && "w-[calc(100%-36px)]",
          )}
        />
        {description && isFocused && (
          <div className="absolute inset-y-0 right-0 flex items-center px-4">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                resetDescriptionInput();
              }}
              className="rounded-full bg-green-500 p-1 text-white dark:bg-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
