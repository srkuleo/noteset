"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { login } from "@/util/actions/auth";
import { HideIcon, ShowIcon } from "../icons/user/preview";
import { ErrorComponent } from "../ErrorComponent";
import { AuthButton } from "../SubmitButtons";
import type { PasswordInputs } from "@/util/types";

export const LoginForm = () => {
  const {
    data: actionRes,
    mutate: serverAction,
    isPending,
  } = useMutation({
    mutationFn: login,
  });
  const [input, setInput] = useState<Pick<PasswordInputs, "password">>({
    password: { show: false, focus: false },
  });

  return (
    <form action={serverAction} className="flex flex-col">
      <fieldset disabled={isPending} className="group space-y-4">
        <input
          id="identifier"
          name="identifier"
          type="text"
          placeholder="Username or email"
          autoComplete="username"
          className={twMerge(
            "input-field",
            "autofill:shadow-autofill-light dark:autofill:shadow-autofill-dark autofill:text-fill-slate-500 dark:autofill:text-fill-white w-full group-disabled:opacity-50",
            actionRes?.status === "error" && "ring-red-500 dark:ring-red-500",
          )}
        />

        <div
          className={twMerge(
            "relative w-full rounded-xl bg-white shadow-sm ring-1 ring-slate-400/40 group-disabled:opacity-50 dark:bg-slate-900 dark:ring-slate-700",
            input.password.focus && "ring-2 ring-green-500 dark:ring-green-600",
          )}
        >
          <input
            id="password"
            name="password"
            type={input.password.show ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            required
            onFocus={() =>
              setInput((prev) => {
                return {
                  password: {
                    ...prev.password,
                    focus: true,
                  },
                };
              })
            }
            onBlur={() =>
              setInput((prev) => {
                return {
                  password: {
                    ...prev.password,
                    focus: false,
                  },
                };
              })
            }
            className={twMerge(
              "autofill:shadow-autofill-light dark:autofill:shadow-autofill-dark autofill:text-fill-slate-500 dark:autofill:text-fill-white w-[calc(100%-48px)] rounded-l-xl bg-transparent px-4 py-3 font-semibold leading-none placeholder-slate-400/80 caret-green-500 outline-none placeholder:text-sm placeholder:italic focus:placeholder-slate-300 dark:placeholder-slate-500 dark:caret-green-600 dark:focus:placeholder-slate-600",
              actionRes?.status === "error" && "ring-red-500 dark:ring-red-500",
            )}
          />
          <button
            type="button"
            onClick={() =>
              setInput((prev) => {
                return {
                  password: {
                    ...prev.password,
                    show: !prev.password.show,
                  },
                };
              })
            }
            className="absolute inset-y-0 right-0 rounded-r-xl border-l border-slate-400/40 px-3 py-2 text-slate-400 active:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:active:bg-slate-800"
          >
            {input.password.show ? (
              <HideIcon strokeWidth={1.3} className="size-6" />
            ) : (
              <ShowIcon strokeWidth={1.3} className="size-6" />
            )}
          </button>
        </div>

        {actionRes?.status === "error" && (
          <ErrorComponent message={actionRes?.message} />
        )}
      </fieldset>

      <AuthButton
        pending={isPending}
        label="Login"
        loading="Authenticating..."
      />
    </form>
  );
};
