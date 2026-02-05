"use client"

import { useMutation } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { signUp } from "@/util/actions/auth"
import type { PasswordInputs } from "@/util/types"
import { AuthButton } from "../CustomButtons"
import { ErrorComponent } from "../ErrorComponent"
import { HideIcon, ShowIcon } from "../icons/user/preview"
import { showToast } from "../Toasts"

export const SignUpForm = () => {
  const [inputs, setInputs] = useState<PasswordInputs>({
    password: { show: false, focus: false },
    confirmPassword: {
      show: false,
      focus: false,
    },
  })
  const formRef = useRef<HTMLFormElement>(null)

  const {
    data: actionRes,
    mutate: clientAction,
    isPending,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: (actionRes) => {
      if (actionRes.status === "success-redirect") {
        showToast(actionRes.message, "/login", "Log in")
        formRef.current?.reset()
      }
    },
  })

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        clientAction(formData)
      }}
      className="flex flex-col"
    >
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
            "w-full autofill:text-fill-slate-500 autofill:shadow-autofill-light group-disabled:opacity-50 dark:autofill:text-fill-white dark:autofill:shadow-autofill-dark",
            actionRes?.errors?.username && "ring-red-500 dark:ring-red-500"
          )}
        />
        <ErrorComponent errorArr={actionRes?.errors?.username} className="pl-1" />

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
          className={twMerge(
            "input-field",
            "w-full autofill:text-fill-slate-500 autofill:shadow-autofill-light group-disabled:opacity-50 dark:autofill:text-fill-white dark:autofill:shadow-autofill-dark",
            actionRes?.errors?.email && "ring-red-500 dark:ring-red-500"
          )}
        />
        <ErrorComponent errorArr={actionRes?.errors?.email} className="pl-1" />

        <div
          className={twMerge(
            "relative w-full rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-400/40 ring-inset group-disabled:opacity-50 dark:bg-slate-900 dark:ring-slate-700",
            inputs.password.focus && "ring-2 ring-green-500 dark:ring-green-600",
            actionRes?.errors?.password && "ring-red-500 dark:ring-red-500"
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
                }
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
                }
              })
            }
            className="block w-[calc(100%-40px)] bg-transparent font-semibold text-[16px] leading-5 placeholder-slate-400/80 caret-green-500 outline-none placeholder:text-[14px] placeholder:italic autofill:text-fill-slate-500 autofill:shadow-autofill-light focus:placeholder-slate-300 dark:placeholder-slate-500 dark:caret-green-600 dark:focus:placeholder-slate-600 dark:autofill:text-fill-white dark:autofill:shadow-autofill-dark"
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
                }
              })
            }
            className="absolute inset-y-0 right-0 px-4 text-slate-400 active:scale-95 active:text-slate-300 dark:text-slate-300 dark:active:text-slate-500"
          >
            {inputs.password.show ? (
              <HideIcon strokeWidth={1.3} className="size-6" />
            ) : (
              <ShowIcon strokeWidth={1.3} className="size-6" />
            )}
          </button>
        </div>
        <ErrorComponent errorArr={actionRes?.errors?.password} className="pl-1" />

        <div
          className={twMerge(
            "relative w-full rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-400/40 ring-inset group-disabled:opacity-50 dark:bg-slate-900 dark:ring-slate-700",
            inputs.confirmPassword.focus && "ring-2 ring-green-500 dark:ring-green-600",
            actionRes?.errors?.confirmPassword && "ring-red-500 dark:ring-red-500"
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
                }
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
                }
              })
            }
            className="block w-[calc(100%-40px)] bg-transparent font-semibold text-[16px] leading-5 placeholder-slate-400/80 caret-green-500 outline-none placeholder:text-[14px] placeholder:italic autofill:text-fill-slate-500 autofill:shadow-autofill-light focus:placeholder-slate-300 dark:placeholder-slate-500 dark:caret-green-600 dark:focus:placeholder-slate-600 dark:autofill:text-fill-white dark:autofill:shadow-autofill-dark"
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
                }
              })
            }
            className="absolute inset-y-0 right-0 px-4 text-slate-400 active:scale-95 active:text-slate-300 dark:text-slate-300 dark:active:text-slate-500"
          >
            {inputs.confirmPassword.show ? (
              <HideIcon strokeWidth={1.3} className="size-6" />
            ) : (
              <ShowIcon strokeWidth={1.3} className="size-6" />
            )}
          </button>
        </div>
        <ErrorComponent errorArr={actionRes?.errors?.confirmPassword} className="pl-1" />

        {actionRes?.status === "error" && <ErrorComponent message={actionRes.message} />}
      </fieldset>

      <AuthButton pending={isPending} label="Sign Up" loading="Creating profile..." />
    </form>
  )
}
