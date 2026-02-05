import { type ChangeEvent, useState } from "react"
import z from "zod"
import type { SetActionResponse, SetPurpose, SetWithIndexProp } from "../types"

export type SetError = z.ZodError<{
  reps: string
  weight: string
  purpose: "warmup" | "working" | "none"
  index: number
}>

const INIT_SET: SetWithIndexProp = {
  purpose: "none",
  index: -1,
  reps: "",
  weight: "",
}

const INIT_SET_ERRORS: SetActionResponse = {
  errors: {},
}

export const useCreateNewSet = () => {
  const [newSet, setNewSet] = useState(INIT_SET)
  const [newSetErrors, setNewSetErrors] = useState(INIT_SET_ERRORS)

  const hasPurposeBeenSelected = newSet.purpose !== "none"

  function handlePurposeInput(purpose: Exclude<SetPurpose, "none">) {
    if (hasPurposeBeenSelected && newSet.purpose !== purpose) {
      setNewSet({ ...INIT_SET, purpose })
      setNewSetErrors(INIT_SET_ERRORS)
      return
    }

    setNewSet((prev) => ({ ...prev, purpose }))
  }

  function handleSetOrderInput(index: number) {
    setNewSet((prev) => ({ ...prev, index }))
  }

  function handleInputField(e: ChangeEvent<HTMLInputElement>) {
    setNewSet((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSetErrors(error: SetError) {
    const { properties: fields } = z.treeifyError(error)

    setNewSetErrors({
      errors: {
        index: fields?.index?.errors,
        reps: fields?.reps?.errors,
        weight: fields?.weight?.errors,
      },
    })
  }

  function resetSetErrors() {
    setNewSetErrors(INIT_SET_ERRORS)
  }

  return {
    newSet,
    newSetErrors,
    handlePurposeInput,
    handleSetOrderInput,
    handleInputField,
    handleSetErrors,
    resetSetErrors,
  }
}
