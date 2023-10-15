"use client";

import { signIn } from "next-auth/react";
import { GoogleSvg } from "./Svgs";

export const GoogleAuth = () => {
  function GoogleLogin() {
    signIn("google");
  }

  return (
    <button
      onClick={GoogleLogin}
      className="mb-4 flex w-full items-center justify-center gap-4 rounded-xl bg-slate-50 py-2 shadow-md ring-1 ring-slate-300 dark:bg-slate-200 dark:ring-0"
    >
      {GoogleSvg}
      <p className="text-sm font-semibold italic text-slate-600">
        Continue with Google
      </p>
    </button>
  );
};
