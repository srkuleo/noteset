import { useState, useRef, useEffect } from "react";

import type { ExerciseType } from "@/util/types";

export const NoteInputField = ({
  exercise,
  removeMode,
  handleNoteInput,
  resetNoteInput,
}: {
  exercise: ExerciseType;
  removeMode: boolean;
  handleNoteInput: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    exerciseId: string,
  ) => void;
  resetNoteInput: (exerciseId: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current !== null) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [exercise.note]);

  return (
    <div
      className={`relative w-full pt-2 ${isFocused && "rounded-lg border border-violet-500 bg-slate-50 px-2 dark:border-green-600 dark:bg-slate-900"}`}
    >
      <textarea
        ref={textAreaRef}
        disabled={removeMode}
        value={exercise.note ? exercise.note : ""}
        placeholder="Leave a note..."
        rows={1}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => handleNoteInput(e, exercise.id)}
        className="w-full rounded-none bg-transparent pr-6 font-semibold text-slate-500/80 placeholder-slate-400 caret-violet-500 no-scrollbar placeholder:text-sm placeholder:italic focus:text-slate-500 focus:placeholder-slate-300 focus:outline-none disabled:opacity-30 dark:text-slate-400 dark:placeholder-slate-500/75 dark:caret-green-600 dark:focus:text-white dark:focus:placeholder-slate-600/80"
      />

      {exercise.note && isFocused && (
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            resetNoteInput(exercise.id);
          }}
          className="absolute right-2 top-2 text-slate-400 dark:text-slate-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
