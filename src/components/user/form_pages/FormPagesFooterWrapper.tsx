import { twMerge } from "tailwind-merge"

export const FormPagesFooterWrapper = ({
  children,
  disabled,
  className,
}: {
  children: React.ReactNode
  disabled: boolean
  className: string
}) => {
  return (
    <fieldset
      disabled={disabled}
      className="group fixed inset-x-0 bottom-0 z-[9990] border-slate-300/80 border-t bg-white px-6 pt-2 pb-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <footer
        className={twMerge(
          "group-disabled:pointer-events-none group-disabled:opacity-50",
          className
        )}
      >
        {children}
      </footer>
    </fieldset>
  )
}
