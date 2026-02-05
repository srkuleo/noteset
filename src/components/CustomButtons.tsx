import { motion } from "framer-motion"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { Drawer } from "vaul"
import { BUTTON_TIMEOUT, timeout } from "@/util/utils"
import { AddIcon } from "./icons/user/modify"

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  loading: string
  pending: boolean
}

export const AuthButton = ({ label, loading, pending, ...props }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-8 rounded-full bg-green-500 px-4 py-2.5 font-manrope font-semibold text-white shadow-md active:scale-95 active:bg-green-400 disabled:pointer-events-none disabled:opacity-50 dark:bg-green-600 dark:active:bg-green-800"
      {...props}
    >
      {pending ? loading : label}
    </button>
  )
}

export const FormSubmitDrawerButton = ({
  label,
  loading,
  pending,
  className,
  ...props
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={twMerge(
        "w-full rounded-xl bg-green-500 px-4 py-1.5 font-manrope font-semibold text-white shadow-sm active:scale-95 active:bg-green-400 dark:bg-green-600 dark:active:bg-green-800",
        className
      )}
      {...props}
    >
      {pending ? loading : label}
    </button>
  )
}

export const FormSubmitFooterButton = ({
  label,
  loading,
  pending,
  form,
  ...props
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      form={form}
      className="px-3 py-1.5 font-extrabold text-green-500 text-xl active:scale-95 active:text-green-400 dark:text-green-600 dark:active:text-green-800"
      {...props}
    >
      {pending ? loading : label}
    </button>
  )
}

export const SubmitDoneWorkoutButton = ({
  formId,
  pending,
  open,
  setOpen,
}: {
  formId: string
  pending: boolean
  open: boolean
  setOpen: (isOpen: boolean) => void
}) => {
  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)
          setOpen(true)
        }}
        className="rounded-lg px-3 py-1.5 font-extrabold text-green-500 text-xl active:scale-95 active:bg-slate-200 dark:text-green-600 dark:active:bg-slate-700"
      >
        Done
        <p className="sr-only">Done button</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col gap-3 rounded-lg+ bg-white/90 text-center dark:bg-slate-700/70">
            <Drawer.Title className="px-2 pt-5 pb-2 font-semibold text-sm">
              Are you sure you want to submit workout?
            </Drawer.Title>

            <button
              type="submit"
              form={formId}
              disabled={pending}
              className="w-full rounded-b-lg+ border-slate-400/40 border-t p-3 font-manrope font-semibold text-green-500 text-lg focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-green-500/75 dark:border-slate-600 dark:disabled:bg-slate-900/75 dark:active:bg-slate-600/90"
            >
              {pending ? "Submitting..." : "Submit"}
            </button>
          </div>

          <button
            type="button"
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT)

              setOpen(false)
            }}
            className="w-full rounded-lg+ bg-white p-3 font-bold text-violet-500 text-xl focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

type SegmentedButton<T> = {
  label: string
  value: T
}

type NotSelected = "none" | undefined

type SegmentedButtonsProps<TValue, TSelected extends TValue | NotSelected> = {
  buttons: SegmentedButton<TValue>[]
  selectedButton: TSelected
  selectedIndicatorId: string
  handleClickEvent: (value: TValue) => void
}

export const SegmentedButtons = <TValue, TSelected extends TValue | NotSelected>({
  buttons,
  selectedButton,
  selectedIndicatorId,
  handleClickEvent,
}: SegmentedButtonsProps<TValue, TSelected>) => {
  return (
    <div className="my-4 flex rounded-2xl bg-white p-1 shadow-md ring-1 ring-slate-300 ring-inset dark:bg-slate-800 dark:shadow-slate-950/75 dark:ring-slate-600">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          type="button"
          onClick={() => handleClickEvent(btn.value)}
          className={twMerge(
            "relative grow py-2 font-bold font-manrope text-sm active:scale-95",
            selectedButton === btn.value && "text-white"
          )}
        >
          {selectedButton === btn.value && (
            <motion.div
              layoutId={selectedIndicatorId}
              style={{ borderRadius: 12 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="absolute inset-0 bg-violet-400 dark:bg-violet-600"
            />
          )}
          <span className="relative z-10"> {btn.label}</span>
        </button>
      ))}
    </div>
  )
}

export const DrawerPlusButton = ({
  openDrawer,
  buttonDescriptionSrOnly,
  className,
}: {
  openDrawer: () => void
  buttonDescriptionSrOnly: string
  className?: string
}) => {
  return (
    <button
      type="button"
      onClick={async () => {
        await timeout(BUTTON_TIMEOUT)
        openDrawer()
      }}
      className={twMerge(
        "rounded-full bg-white p-2.5 shadow-md ring-1 ring-slate-300 ring-inset active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-600 dark:active:bg-slate-700",
        className
      )}
    >
      <AddIcon strokeWidth={2} className="size-6" />

      <p className="sr-only">{buttonDescriptionSrOnly}</p>
    </button>
  )
}

export const XButton = ({
  srOnlyDescription,
  strokeWidth,
  svgSize,
  onClick,
  className,
}: {
  srOnlyDescription: string
  strokeWidth: number
  svgSize: string
  onClick: ComponentProps<"button">["onClick"]
  className: string
}) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        className={svgSize}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>

      <p className="sr-only">{srOnlyDescription}</p>
    </button>
  )
}

export const ClearInputButton = ({
  srOnlyDescription,
  strokeWidth,
  onMouseDown,
  className,
  svgClassName,
}: {
  srOnlyDescription: string
  strokeWidth: number
  svgClassName: string
  onMouseDown: ComponentProps<"button">["onMouseDown"]
  className: string
}) => {
  return (
    <button type="button" onMouseDown={onMouseDown} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        className={svgClassName}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>

      <p className="sr-only">{srOnlyDescription}</p>
    </button>
  )
}
