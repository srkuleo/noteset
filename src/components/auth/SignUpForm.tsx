"use client";

import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { signUp } from "@/util/actions/auth";
import { showToast } from "../Toasts";
import { HideIcon, ShowIcon } from "../icons/user/preview";
import { ErrorComponent } from "../ErrorComponent";
import { AuthButton } from "../SubmitButtons";

export const SignUpForm = () => {
  const {
    isPending,
    data: actionRes,
    mutate: clientAction,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: (actionRes) => {
      if (actionRes.message && actionRes.status === "success-redirect") {
        showToast(actionRes.message, "/login", "Log in");
        formRef.current?.reset();
      }
    },
  });
  const [show, setShow] = useState({ password: false, confirmPassword: false });
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
            "w-full bg-white group-disabled:opacity-50 dark:bg-slate-800/50",
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
            "w-full bg-white group-disabled:opacity-50 dark:bg-slate-800/50",
            actionRes &&
              actionRes.errors?.email &&
              "ring-red-500 dark:ring-red-500",
          )}
        />
        {actionRes && (
          <ErrorComponent errorArr={actionRes.errors?.email} className="pl-1" />
        )}

        <div className="relative group-disabled:opacity-50">
          <input
            id="password"
            name="password"
            type={show.password ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            required
            className={twMerge(
              "input-field",
              "w-full bg-white dark:bg-slate-800/50",
              actionRes &&
                actionRes.errors?.password &&
                "ring-red-500 dark:ring-red-500",
            )}
          />
          <button
            type="button"
            onClick={() =>
              setShow((prev) => {
                return {
                  ...prev,
                  password: !prev.password,
                };
              })
            }
            className="absolute inset-y-0 right-0 px-3 py-2"
          >
            {show.password ? (
              <HideIcon className="size-6" />
            ) : (
              <ShowIcon className="size-6" />
            )}
          </button>
        </div>
        {actionRes && (
          <ErrorComponent
            errorArr={actionRes.errors?.password}
            className="pl-1"
          />
        )}

        <div className="relative group-disabled:opacity-50">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={show.confirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            autoComplete="new-password"
            required
            className={twMerge(
              "input-field",
              "w-full bg-white dark:bg-slate-800/50",
              actionRes &&
                actionRes.errors?.confirmPassword &&
                "ring-red-500 dark:ring-red-500",
            )}
          />
          <button
            type="button"
            onClick={() =>
              setShow((prev) => {
                return {
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                };
              })
            }
            className="absolute inset-y-0 right-0 px-3 py-2"
          >
            {show.confirmPassword ? (
              <HideIcon className="size-6" />
            ) : (
              <ShowIcon className="size-6" />
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
