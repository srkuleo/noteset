import type { ComponentProps } from "react"
import { z } from "zod"
import { WORKOUT_STATUS_VALUES } from "@/db/schema"

export type ActionResponse = {
  status: "success" | "success-redirect" | "error" | "unset"
  message: string
}

export type SetActionResponse = {
  errors?: {
    reps?: string[] | undefined
    weight?: string[] | undefined
    index?: string[] | undefined
  }
}

export type ExerciseActionResponse = {
  errors?: {
    name?: string[] | undefined
    sets?: string[] | undefined
    reps?: string[] | undefined
    weight?: string[] | undefined
  }
}

export type WorkoutActionResponse = ActionResponse & {
  errors?: {
    title?: string[]
    exercises?: string[]
  }
}

export type AuthActionResponse = ActionResponse & {
  errors?: {
    username?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
  }
}

//Exercise types and schemas
const SET_PURPOSE_VALUE = ["warmup", "working", "none"] as const
export type SetPurpose = (typeof SET_PURPOSE_VALUE)[number]

type PurposeButtons = { value: Exclude<SetPurpose, "none">; label: "Warm-up" | "Working" }
export const purposeButtons: PurposeButtons[] = [
  { value: "warmup", label: "Warm-up" },
  { value: "working", label: "Working" },
]

export const SetSchema = z.object({
  id: z.string(),
  reps: z
    .string()
    .trim()
    .regex(/^\d+(?:[-+]\d+)?$/, {
      error: "Reps must be number or range.",
    }),
  weight: z
    .string()
    .trim()
    .regex(/^\d+(,\d+|\.\d+)?$/, {
      error: "Weight must be whole or decimal number.",
    }),
  purpose: z.enum(SET_PURPOSE_VALUE),
})
export type SetType = z.infer<typeof SetSchema>

export const SetWithIndexPropSchema = SetSchema.omit({ id: true }).extend({
  index: z.number().min(0, { error: "Please, select set placement..." }),
})
export type SetWithIndexProp = z.infer<typeof SetWithIndexPropSchema>

const OptionalSetSchema = SetSchema.pick({
  id: true,
  purpose: true,
}).extend({
  reps: z.union([
    z
      .string()
      .trim()
      .regex(/^\d+(?:[-+]\d+)?$/, {
        error: "Reps must be a number or range.",
      }),
    z.literal(""),
  ]),
  weight: z.union([
    z
      .string()
      .trim()
      .regex(/^\d+(,\d+|\.\d+)?$/, {
        error: "Weight must be a whole or decimal number.",
      }),
    z.literal(""),
  ]),
})

const LIMB_INVOLVEMENT_VALUES = ["bilateral", "unilateral"] as const
export type LimbInvolvement = (typeof LIMB_INVOLVEMENT_VALUES)[number]

type LimbInvolementButtons = { value: LimbInvolvement; label: "Unilateral" | "Bilateral" }
export const limbInvolementButtons: LimbInvolementButtons[] = [
  { value: "unilateral", label: "Unilateral" },
  { value: "bilateral", label: "Bilateral" },
]

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .min(2, { error: "Must be at least 2 characters long." })
    .max(30, { error: "Too long. Keep it less than 30 characters." }),
  note: z.string().trim(),
  limbInvolvement: z.enum(LIMB_INVOLVEMENT_VALUES).optional(),
  sets: z.array(SetSchema).min(1, { error: "Please add at least one set." }),
  lastUpdateTimestamp: z.number(),
})
export type ExerciseType = z.infer<typeof ExerciseSchema>

export const CreateExerciseFormSchema = ExerciseSchema.pick({
  name: true,
  note: true,
  limbInvolvement: true,
  sets: true,
})
export type CreateExerciseFormType = z.infer<typeof CreateExerciseFormSchema>

const ExerciseWithOptionalSetsClientSchema = ExerciseSchema.pick({
  id: true,
  name: true,
  note: true,
  limbInvolvement: true,
  lastUpdateTimestamp: true,
}).extend({
  sets: z.array(OptionalSetSchema),
  done: z.boolean(),
})

const ExerciseWithOptionalSetsServerSchema = ExerciseWithOptionalSetsClientSchema.extend({
  sets: z
    .array(OptionalSetSchema)
    .transform((sets) => sets.filter((set) => set.reps !== "" && set.weight !== "")),
}).transform(({ done, ...exercise }) => exercise)

export type ExerciseToDoClientType = z.infer<typeof ExerciseWithOptionalSetsClientSchema>
export type ExerciseToRemoveType = Pick<ExerciseType, "id" | "name">

//Workout types and schemas

export const WorkoutSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .trim()
    .min(2, { error: "Must be at least 2 characters long." })
    .max(30, { error: "Too long. Keep it less than 30 characters." }),
  description: z.string().trim().nullable(),
  exercises: z.array(ExerciseSchema).min(1, { error: "Please add at least one exercise." }),
  status: z.enum(WORKOUT_STATUS_VALUES),
  userId: z.string(),
  doneAt: z.date().nullable(),
  duration: z.number().nullable(),
})

export const CreateWorkoutSchema = WorkoutSchema.pick({
  title: true,
  description: true,
  exercises: true,
})

const WorkoutToDoClientSchema = CreateWorkoutSchema.pick({
  title: true,
  description: true,
}).extend({
  exercises: z.array(ExerciseWithOptionalSetsClientSchema),
})
export type WorkoutToDoClientType = z.infer<typeof WorkoutToDoClientSchema>

export const WorkoutToDoServerSchema = CreateWorkoutSchema.pick({
  title: true,
  description: true,
}).extend({
  exercises: z.array(ExerciseWithOptionalSetsServerSchema),
})

//Auth types and schemas

export const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { error: "Must contain at least 3 characters." })
      .max(32, { error: "Must be within 3 and 32 characters long." }),
    email: z.email({ error: "Not a valid email address." }).trim(),
    password: z.string().superRefine((password, context) => {
      if (password.length < 8 && !/[0-9]/.test(password)) {
        context.addIssue({
          code: "too_small",
          minimum: 8,
          origin: "string",
          inclusive: true,
          message: "Must contain at least 8 characters and 1 number.",
        })

        return
      }

      if (password.length < 8) {
        context.addIssue({
          code: "too_small",
          minimum: 8,
          origin: "string",
          inclusive: true,
          message: "Must contain at least 8 characters.",
        })

        return
      }

      if (!/[0-9]/.test(password)) {
        context.addIssue({
          code: "custom",
          message: "Must contain at least one number.",
        })

        return
      }
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, context) => {
    if (confirmPassword !== password) {
      context.addIssue({
        code: "custom",
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      })
    }
  })

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, { error: "Invalid username or email." })
    .max(32, { error: "Invalid username or email." })
    .refine(
      (value) => {
        const isUsername = /^[a-zA-Z0-9_]{3,32}$/.test(value)
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        return isUsername || isEmail
      },
      {
        error: "Must be a valid username or email.",
      }
    ),
  password: z.string().superRefine((password, context) => {
    if (password.length < 8 || !/[0-9]/.test(password)) {
      context.addIssue({
        code: "custom",
        message: "Invalid password.",
      })
    }
  }),
})

//Util types

export type PasswordInputs = {
  password: {
    show: boolean
    focus: boolean
  }
  confirmPassword: {
    show: boolean
    focus: boolean
  }
}

export interface GeneralIconProps extends ComponentProps<"svg"> {
  className: string
  strokeWidth: number
}

export interface SolidIconProps extends GeneralIconProps {
  fill: string
  stroke: string
}

export const TIME_FORMAT_VALUES = ["default", "Hours and minutes", "Minutes only"] as const

export type TimeFormatType = (typeof TIME_FORMAT_VALUES)[number]

export const LOGS_ORDER_VALUES = ["default", "Newest first", "Newest last"] as const

export type LogsOrderType = (typeof LOGS_ORDER_VALUES)[number]

export type UserPreferences = {
  timeFormat: TimeFormatType
  logsOrder: LogsOrderType
}

export type LogsPageSearchParams = {
  searchQuery: string | undefined
  strictMode: "on" | undefined
}

export type ExerciseError = z.ZodError<{
  name: string
  note: string | null
  sets: {
    id: string
    reps: string
    weight: string
    purpose: "warmup" | "working" | "none"
  }[]
  limbInvolvement?: "bilateral" | "unilateral" | undefined
}>

export type UseExerciseFormReturn<TExercise> = {
  tempExercise: TExercise
  exerciseFormErrors: ExerciseActionResponse
  handleNameInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  resetNameInput: () => void
  handleNoteInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  resetNoteInput: () => void
  handleLimbInvolvementInput: (value: LimbInvolvement) => void
  updateSets: (action: UpdateSetsAction) => void
  handleExerciseErrors: (error: ExerciseError) => void
  resetExerciseErrors: () => void
}

export type UpdateExercisesAction =
  | { type: "reorder"; exercises: ExerciseType[] }
  | { type: "edit"; exercise: ExerciseType }
  | { type: "create"; exercise: CreateExerciseFormType }
  | { type: "remove"; exerciseId: string }

export type ExercisesListProps = {
  exercises: ExerciseType[]
  exercisesError: string[] | undefined
  updateExercises: (action: UpdateExercisesAction) => void
}

export type UpdateSetsAction =
  | { type: "create"; set: SetWithIndexProp }
  | { type: "remove"; setId: string }
  | { type: "edit"; event: React.ChangeEvent<HTMLInputElement>; setId: string }

export type SetsSectionProps = {
  sets: SetType[]
  limbInvolvement: LimbInvolvement | undefined
  setsError: string[] | undefined
  repsError: string[] | undefined
  weightError: string[] | undefined
  updateSets: (action: UpdateSetsAction) => void
}
