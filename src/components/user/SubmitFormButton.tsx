"use client";

import { useFormStatus } from "react-dom";

export const SubmitFormButton = ({
  label,
  loading,
}: {
  label: string;
  loading: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-green-500 px-4 py-1.5 font-manrope font-semibold text-white shadow-sm active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-600"
    >
      {pending ? loading : label}
    </button>
  );
};
