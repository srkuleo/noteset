"use client";

import { GoogleIcon } from "@/icons/google";

export const GoogleAuthButton = () => {
  return (
    <button className="mb-4 flex w-full items-center justify-center gap-4 rounded-xl bg-slate-50 py-2 shadow-md ring-1 ring-slate-300 dark:bg-slate-200 dark:ring-0">
      <GoogleIcon />
      <p className="text-sm font-semibold italic dark:text-slate-600">
        Continue with Google
      </p>
    </button>
  );
};
