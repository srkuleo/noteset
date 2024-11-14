"use client";

import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { signUp } from "@/util/actions/auth";
import { showToast } from "../Toasts";
import { HideIcon, ShowIcon } from "../icons/user/preview";
import { ErrorComponent } from "../ErrorComponent";
import { AuthButton } from "../SubmitButtons";

import type { PasswordInputs } from "@/util/types";

export const SignUpForm = () => {
  const {
    data: actionRes,
    mutate: clientAction,
    isPending,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: (actionRes) => {
      if (actionRes.message && actionRes.status === "success-redirect") {
        showToast(actionRes.message, "/login", "Log in");
        formRef.current?.reset();
      }
    },
  });
  const [inputs, setInputs] = useState<PasswordInputs>({
    password: { show: false, focus: false },
    confirmPassword: {
      show: false,
      focus: false,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={clientAction} className="flex flex-col">
      <fieldset disabled={isPending} className="group space-y-4">
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          required
          className={twMerge(
            "input-field",
            "w-full group-disabled:opacity-50",
            actionRes &&
              actionRes.errors?.username &&
              "ring-red-500 dark:ring-red-500",
          )}
        />
        {actionRes && (
          <ErrorComponent
            errorArr={actionRes.errors?.username}
            className="pl-1"
          />
        )}

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
          className={twMerge(
            "input-field",
            "w-full group-disabled:opacity-50",
            actionRes &&
              actionRes.errors?.email &&
              "ring-red-500 dark:ring-red-500",
          )}
        />
        {actionRes && (
          <ErrorComponent errorArr={actionRes.errors?.email} className="pl-1" />
        )}

        <div
          className={twMerge(
            "relative w-full rounded-xl bg-white shadow-sm ring-1 ring-slate-400/40 group-disabled:opacity-50 dark:bg-slate-900 dark:ring-slate-700",
            inputs.password.focus &&
              "ring-2 ring-green-500 dark:ring-green-600",
          )}
        >
          <input
            id="password"
            name="password"
            type={inputs.password.show ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            required
            onFocus={() =>
              setInputs((prev) => {
                return {
                  ...prev,
                  password: {
                    ...prev.password,
                    focus: true,
                  },
                };
              })
            }
            onBlur={() =>
              setInputs((prev) => {
                return {
                  ...prev,
                  password: {
                    ...prev.password,
                    focus: false,
                  },
                };
              })
            }
            className={twMerge(
              "w-[calc(100%-48px)] rounded-l-xl bg-transparent px-4 py-3 font-semibold leading-none placeholder-slate-400/80 caret-green-500 outline-none placeholder:text-sm placeholder:italic focus:placeholder-slate-300 dark:placeholder-slate-500 dark:caret-green-600 dark:focus:placeholder-slate-600",
              actionRes &&
                actionRes.errors?.password &&
                "ring-red-500 dark:ring-red-500",
            )}
          />
          <button
            type="button"
            onClick={() =>
              setInputs((prev) => {
                return {
                  ...prev,
                  password: {
                    ...prev.password,
                    show: !prev.password.show,
                  },
                };
              })
            }
            className="absolute inset-y-0 right-0 rounded-r-xl border-l border-slate-400/40 px-3 py-2 text-slate-400 active:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:active:bg-slate-800"
          >
            {inputs.password.show ? (
              <HideIcon strokeWidth={1.3} className="size-6" />
            ) : (
              <ShowIcon strokeWidth={1.3} className="size-6" />
            )}
          </button>
        </div>
        {actionRes && (
          <ErrorComponent
            errorArr={actionRes.errors?.password}
            className="pl-1"
          />
        )}

        <div
          className={twMerge(
            "relative w-full rounded-xl bg-white shadow-sm ring-1 ring-slate-400/40 group-disabled:opacity-50 dark:bg-slate-900 dark:ring-slate-700",
            inputs.confirmPassword.focus &&
              "ring-2 ring-green-500 dark:ring-green-600",
          )}
        >
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={inputs.confirmPassword.show ? "text" : "password"}
            placeholder="Confirm password"
            autoComplete="new-password"
            required
            onFocus={() =>
              setInputs((prev) => {
                return {
                  ...prev,
                  confirmPassword: {
                    ...prev.confirmPassword,
                    focus: true,
                  },
                };
              })
            }
            onBlur={() =>
              setInputs((prev) => {
                return {
                  ...prev,
                  confirmPassword: {
                    ...prev.confirmPassword,
                    focus: false,
                  },
                };
              })
            }
            className={twMerge(
              "w-[calc(100%-48px)] rounded-l-xl bg-transparent px-4 py-3 font-semibold leading-none placeholder-slate-400/80 caret-green-500 outline-none placeholder:text-sm placeholder:italic focus:placeholder-slate-300 dark:placeholder-slate-500 dark:caret-green-600 dark:focus:placeholder-slate-600",
              actionRes &&
                actionRes.errors?.confirmPassword &&
                "ring-red-500 dark:ring-red-500",
            )}
          />
          <button
            type="button"
            onClick={() =>
              setInputs((prev) => {
                return {
                  ...prev,
                  confirmPassword: {
                    ...prev.confirmPassword,
                    show: !prev.confirmPassword.show,
                  },
                };
              })
            }
            className="absolute inset-y-0 right-0 rounded-r-xl border-l border-slate-400/40 px-3 py-2 text-slate-400 active:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:active:bg-slate-800"
          >
            {inputs.confirmPassword.show ? (
              <HideIcon strokeWidth={1.3} className="size-6" />
            ) : (
              <ShowIcon strokeWidth={1.3} className="size-6" />
            )}
          </button>
        </div>
        {actionRes && (
          <ErrorComponent
            errorArr={actionRes.errors?.confirmPassword}
            className="pl-1"
          />
        )}

        {actionRes && actionRes.status === "error" && (
          <ErrorComponent message={actionRes.message} />
        )}
      </fieldset>

      <AuthButton
        pending={isPending}
        label="Sign Up"
        loading="Creating profile..."
      />
    </form>
  );
};
