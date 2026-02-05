import { useMutation } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Drawer } from "vaul"
import { DrawerPlusButton, FormSubmitDrawerButton } from "@/components/CustomButtons"
import { CreateNewSetTooltip } from "@/components/Tooltips"
import { type SetError, useCreateNewSet } from "@/util/hooks/useCreateNewSet"
import {
  type SetsSectionProps,
  type SetType,
  type SetWithIndexProp,
  SetWithIndexPropSchema,
} from "@/util/types"
import { BUTTON_TIMEOUT, collapseNewSetForm, FORM_TIMEOUT, timeout } from "@/util/utils"
import { RepsAndWeightInputs, SetOrderInput, SetPurposeInput } from "./SetInputs"

export const CreateNewSetDrawer = ({
  sets,
  updateSets,
}: Pick<SetsSectionProps, "sets" | "updateSets">) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root
      direction="top"
      open={open}
      onOpenChange={setOpen}
      noBodyStyles
      disablePreventScroll
    >
      <DrawerPlusButton
        openDrawer={() => setOpen(true)}
        buttonDescriptionSrOnly="Create a new set"
        className="dark:shadow-slate-950/75"
      />

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm dark:bg-slate-950/80" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-[9999] px-0.5 focus:outline-none"
        >
          <div className="rounded-b-4xl bg-white pb-4 dark:bg-slate-900">
            <div className="border-b border-b-slate-200 bg-slate-200/55 pt-safe-top dark:border-b-slate-700 dark:bg-slate-800">
              <Drawer.Title className="px-8 py-4 font-manrope text-slate-800 text-xl leading-5">
                Creating a new set
              </Drawer.Title>
            </div>

            <CreateNewSetForm
              sets={sets}
              updateSets={updateSets}
              closeDrawer={() => setOpen(false)}
            />

            <Drawer.Handle preventCycle className="bg-slate-300 dark:bg-slate-600" />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

const CreateNewSetForm = ({
  sets,
  updateSets,
  closeDrawer,
}: {
  sets: SetType[]
  updateSets: SetsSectionProps["updateSets"]
  closeDrawer: () => void
}) => {
  const {
    newSet,
    newSetErrors,
    handlePurposeInput,
    handleSetOrderInput,
    handleInputField,
    handleSetErrors,
    resetSetErrors,
  } = useCreateNewSet()

  const { mutate: createNewSet, isPending } = useMutation({
    mutationFn: async (newSet: SetWithIndexProp) => {
      await timeout(FORM_TIMEOUT)

      const isValidSet = SetWithIndexPropSchema.safeParse(newSet)

      if (!isValidSet.success) {
        throw isValidSet.error
      }

      updateSets({ type: "create", set: isValidSet.data })
    },
    onMutate: resetSetErrors,
    onError: (error) => {
      handleSetErrors(error as SetError)
    },
    onSuccess: closeDrawer,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        createNewSet({ ...newSet })
      }}
    >
      <fieldset disabled={isPending} className="group px-8 pt-8">
        <SetPurposeInput selected={newSet.purpose} handlePurposeInput={handlePurposeInput} />

        <AnimatePresence initial={false} mode="wait">
          {newSet.purpose === "warmup" && (
            <motion.div
              key="warmup-order-sections"
              variants={collapseNewSetForm}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SetOrderInput
                purpose={newSet.purpose}
                currSets={sets}
                newSetIndex={newSet.index}
                setIndexError={newSetErrors.errors?.index}
                handleSetOrderInput={handleSetOrderInput}
              />

              <RepsAndWeightInputs
                repsError={newSetErrors.errors?.reps}
                weightError={newSetErrors.errors?.weight}
                handleInputField={handleInputField}
              />

              <FormActions pending={isPending} closeDrawer={closeDrawer} />
            </motion.div>
          )}

          {newSet.purpose === "working" && (
            <motion.div
              key="working-order-sections"
              variants={collapseNewSetForm}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SetOrderInput
                purpose={newSet.purpose}
                currSets={sets}
                newSetIndex={newSet.index}
                setIndexError={newSetErrors.errors?.index}
                handleSetOrderInput={handleSetOrderInput}
              />

              <RepsAndWeightInputs
                repsError={newSetErrors.errors?.reps}
                weightError={newSetErrors.errors?.weight}
                handleInputField={handleInputField}
              />

              <FormActions pending={isPending} closeDrawer={closeDrawer} />
            </motion.div>
          )}
        </AnimatePresence>
      </fieldset>
    </form>
  )
}

const FormActions = ({ pending, closeDrawer }: { pending: boolean; closeDrawer: () => void }) => {
  return (
    <div className="flex gap-1 pb-8 group-disabled:pointer-events-none group-disabled:opacity-50">
      <CreateNewSetTooltip />

      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)
          closeDrawer()
        }}
        className="mr-1.5 rounded-xl bg-slate-50 px-4 font-semibold text-sm shadow-sm ring-1 ring-slate-300/80 ring-inset active:bg-slate-200 dark:bg-white dark:text-slate-600 dark:active:bg-slate-300"
      >
        Close
      </button>

      <FormSubmitDrawerButton pending={pending} label="Create" loading="Creating..." />
    </div>
  )
}
