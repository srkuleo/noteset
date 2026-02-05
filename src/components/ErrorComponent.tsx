import { twMerge } from "tailwind-merge"
import { ErrorTriangleIcon } from "./icons/user/warning"

type ErrorComponentProps = React.HTMLAttributes<HTMLParagraphElement> & {
  errorArr?: string[]
  message?: string
}

export const ErrorComponent = ({ errorArr, message, className }: ErrorComponentProps) => {
  if (message) {
    return (
      <div className={twMerge("flex items-center gap-2.5 pt-2 text-red-500", className)}>
        <ErrorTriangleIcon strokeWidth={1.5} className="size-7" />

        <p className="font-semibold leading-7 dark:text-slate-100">{message}</p>
      </div>
    )
  }

  if (!errorArr?.length) {
    return null
  }

  return (
    <div className={twMerge("flex gap-1.5 text-red-500", className)}>
      <ErrorTriangleIcon strokeWidth={1.5} className="size-4" />

      <p className="block font-semibold text-[14px] leading-4 dark:text-white">{errorArr[0]}</p>
    </div>
  )
}
