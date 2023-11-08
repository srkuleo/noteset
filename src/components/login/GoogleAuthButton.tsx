"use client";

import { GoogleIcon } from "@/icons/google";

export const GoogleAuthButton = () => {
  return (
    <button className="flex items-center justify-center gap-4 rounded-xl bg-white py-3 shadow-md text-sm ring-1 ring-slate-400/50">
      <GoogleIcon />
      <p className="font-semibold italic dark:text-slate-500">
        Continue with Google
      </p>
    </button>
  );
};
