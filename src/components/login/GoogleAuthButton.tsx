"use client";

import { GoogleIcon } from "../../icons/google";

export const GoogleAuthButton = () => {
  return (
    <button className="flex items-center justify-center gap-4 rounded-xl bg-white py-2.5 text-sm shadow-md ring-1 ring-slate-400/50 active:scale-95 dark:shadow-slate-950 dark:ring-0">
      <GoogleIcon />
      <p className="font-semibold italic dark:text-slate-500">
        Continue with Google
      </p>
    </button>
  );
};
