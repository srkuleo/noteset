"use client";

import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { signUp } from "@/util/actions/auth";
import { showToast } from "../Toasts";
import { HideIcon, ShowIcon } from "../icons/user/preview";
import { InputFieldError } from "../user/InputFieldError";
import { SubmitFormButton } from "../SubmitButtons";

import type { AuthActionResponse } from "@/util/types";

export const SignUpForm = () => {
  const [actionRes, setActionRes] = useState<AuthActionResponse>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  function togglePasswordVisibility(field: "password" | "confirmPassword") {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  }

  async function clientSignUp(formData: FormData) {
    const res = await signUp(formData);

    if (res.status === "success-redirect" && res.message) {
      showToast(res.message, res.status, "/workouts", "View workouts");
      formRef.current?.reset();
    }

    setActionRes({ ...res });
  }

  return (
    <form ref={formRef} action={clientSignUp} className="flex flex-col gap-4">
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        autoComplete="username"
        required
        className={twMerge(
          "input-field",
          "bg-white dark:bg-slate-800/50",
          actionRes.errors?.username && "ring-red-500 dark:ring-red-500",
        )}
      />
      <InputFieldError errorArr={actionRes.errors?.username} className="pl-1" />

      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        required
        className={twMerge(
          "input-field",
          "bg-white dark:bg-slate-800/50",
          actionRes.errors?.email && "ring-red-500 dark:ring-red-500",
        )}
      />
      <InputFieldError errorArr={actionRes.errors?.email} className="pl-1" />

      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="new-password"
          required
          className={twMerge(
            "input-field",
            "w-full bg-white dark:bg-slate-800/50",
            actionRes.errors?.password && "ring-red-500 dark:ring-red-500",
          )}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility("password")}
          className="absolute inset-y-0 right-0 px-3 py-2"
        >
          {showPassword ? (
            <HideIcon className="size-6" />
          ) : (
            <ShowIcon className="size-6" />
          )}
        </button>
      </div>
      <InputFieldError errorArr={actionRes.errors?.password} className="pl-1" />

      <div className="relative">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          autoComplete="new-password"
          required
          className={twMerge(
            "input-field",
            "w-full bg-white dark:bg-slate-800/50",
            actionRes.errors?.confirmPassword &&
              "ring-red-500 dark:ring-red-500",
          )}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility("confirmPassword")}
          className="absolute inset-y-0 right-0 px-3 py-2"
        >
          {showConfirmPassword ? (
            <HideIcon className="size-6" />
          ) : (
            <ShowIcon className="size-6" />
          )}
        </button>
      </div>
      <InputFieldError
        errorArr={actionRes.errors?.confirmPassword}
        className="pl-1"
      />

      {actionRes.status === "error" && (
        <InputFieldError message={actionRes.message} />
      )}

      <SubmitFormButton
        label="Sign Up"
        loading="Creating profile..."
        className="mt-6 rounded-full py-2.5 shadow-md"
      />
    </form>
  );
};
