"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { login } from "@/util/actions/auth";
import { HideIcon, ShowIcon } from "../icons/user/preview";
import { ErrorComponent } from "../ErrorComponent";
import { SubmitFormButton } from "../SubmitButtons";

import type { AuthActionResponse } from "@/util/types";

export const LoginForm = () => {
  const [actionRes, setActionRes] = useState<AuthActionResponse>({});
  const [showPassword, setShowPassword] = useState(false);

  async function clientLogin(formData: FormData) {
    const res = await login(formData);

    setActionRes({ ...res });
  }

  return (
    <form action={clientLogin} className="flex flex-col gap-4">
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        autoComplete="username"
        className={twMerge(
          "input-field",
          "bg-white dark:bg-slate-800/50",
          actionRes.errors?.username && "ring-red-500 dark:ring-red-500",
        )}
      />
      <ErrorComponent errorArr={actionRes.errors?.username} className="pl-1" />

      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="current-password"
          required
          className={twMerge(
            "input-field",
            "w-full bg-white dark:bg-slate-800/50",
            actionRes.errors?.password && "ring-red-500 dark:ring-red-500",
          )}
        />
        <button
          type="button"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className="absolute inset-y-0 right-0 px-3 py-2"
        >
          {showPassword ? (
            <HideIcon className="size-6" />
          ) : (
            <ShowIcon className="size-6" />
          )}
        </button>
      </div>
      <ErrorComponent errorArr={actionRes.errors?.password} className="pl-1" />

      <ErrorComponent message={actionRes.message} />

      <SubmitFormButton
        label="Login"
        loading="Authenticating..."
        className="mt-6 rounded-full py-2.5 shadow-md"
      />
    </form>
  );
};
