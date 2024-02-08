"use client";

import { useFormStatus } from "react-dom";

export const SaveEditButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-green-500 px-4 py-1.5 font-semibold text-white shadow-sm active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-600"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
};
