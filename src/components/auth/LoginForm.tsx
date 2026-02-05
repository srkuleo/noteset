"use client"

import { useMutation } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { login } from "@/util/actions/auth"
import type { PasswordInputs } from "@/util/types"
import { AuthButton } from "../CustomButtons"
import { ErrorComponent } from "../ErrorComponent"
import { HideIcon, ShowIcon } from "../icons/user/preview"

export const LoginForm = () => {
  const [input, setInput] = useState<Pick<PasswordInputs, "password">>({
    password: { show: false, focus: false },
  })
  const formRef = useRef<HTMLFormElement>(null)

  const {
    data: actionRes,
    mutate: serverAction,
    isPending,
  } = useMutation({
    mutationFn: login,
  })

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        serverAction(formData)
      }}
      className="flex flex-col"
    >
      <fieldset disabled={isPending} className="group space-y-4">
        <input
          id="identifier"
          name="identifier"
          type="text"
          placeholder="Username or email"
          autoComplete="username"
          className={twMerge(
            "input-field",
            "w-full autofill:text-fill-slate-500 autofill:shadow-autofill-light group-disabled:opacity-50 dark:autofill:text-fill-white dark:autofill:shadow-autofill-dark",
            actionRes?.status === "error" && "ring-red-500 dark:ring-red-500"
          )}
        />

        <div
          className={twMerge(
            "relative w-full rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-400/40 ring-inset group-disabled:opacity-50 dark:bg-slate-900 dark:ring-slate-700",
            input.password.focus && "ring-2 ring-green-500 dark:ring-green-600",
            actionRes?.status === "error" && "ring-red-500 dark:ring-red-500"
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
                }
              })
            }
            onBlur={() =>
              setInput((prev) => {
                return {
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
              setInput((prev) => {
                return {
                  password: {
                    ...prev.password,
                    show: !prev.password.show,
                  },
                }
              })
            }
            className="absolute inset-y-0 right-0 px-4 text-slate-400 active:scale-95 active:text-slate-300 dark:text-slate-300 dark:active:text-slate-500"
          >
            {input.password.show ? (
              <HideIcon strokeWidth={1.3} className="size-6" />
            ) : (
              <ShowIcon strokeWidth={1.3} className="size-6" />
            )}
          </button>
        </div>

        {actionRes?.status === "error" && <ErrorComponent message={actionRes.message} />}
      </fieldset>

      <AuthButton pending={isPending} label="Login" loading="Authenticating..." />
    </form>
  )
}
