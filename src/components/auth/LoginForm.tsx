"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { login } from "@/util/actions/auth";
import { HideIcon, ShowIcon } from "../icons/user/preview";
import { ErrorComponent } from "../ErrorComponent";
import { AuthButton } from "../SubmitButtons";

export const LoginForm = () => {
  const {
    isPending,
    isError,
    error,
    mutate: serverAction,
  } = useMutation({
    mutationFn: login,
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={serverAction} className="flex flex-col">
      <fieldset disabled={isPending} className="group space-y-4">
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          className={twMerge(
            "input-field",
            "w-full bg-white group-disabled:opacity-50 dark:bg-slate-800/50",
            isError && "ring-red-500 dark:ring-red-500",
          )}
        />

        <div className="relative group-disabled:opacity-50">
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
              isError && "ring-red-500 dark:ring-red-500",
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

        {isError && <ErrorComponent message={error?.message} />}
      </fieldset>

      <AuthButton
        pending={isPending}
        label="Login"
        loading="Authenticating..."
      />
    </form>
  );
};
