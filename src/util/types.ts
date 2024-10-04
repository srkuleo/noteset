import { z } from "zod";
import { workoutStatus } from "@/db/schema";

//Exercise types and schemas

export type ExerciseActionResponse = {
  errors?: {
    name?: string[] | undefined;
    sets?: string[] | undefined;
    note?: string[] | undefined;
  };
  message?: string;
};

const SetSchema = z.object({
  id: z.string(),
  reps: z
    .string()
    .trim()
    .regex(/^\d+(?:[-+]\d+)?$/, {
      message: "Reps must be number or range.",
    }),
  weight: z
    .string()
    .trim()
    .regex(/^\d+(,\d+|\.\d+)?$/, {
      message: "Weight must be whole or decimal number.",
    }),
  warmup: z.boolean().optional(),
});

export type SetType = z.infer<typeof SetSchema>;

const OptionalSetSchema = z.object({
  id: z.string(),
  reps: z.union([
    z
      .string()
      .trim()
      .regex(/^\d+(?:[-+]\d+)?$/, {
        message: "Reps must be a number or range.",
      }),
    z.literal(""),
  ]),
  weight: z.union([
    z
      .string()
      .trim()
      .regex(/^\d+(,\d+|\.\d+)?$/, {
        message: "Weight must be a whole or decimal number.",
      }),
    z.literal(""),
  ]),
});

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Must be at least 2 characters long." })
    .max(30, { message: "Too long. Keep it less than 30 characters." }),
  sets: z.array(SetSchema).min(1, { message: "Please add at least one set." }),
  note: z.string().trim().nullable(),
});

export type ExerciseType = z.infer<typeof ExerciseSchema>;

const ExerciseWithOptionalSetsSchema = ExerciseSchema.pick({
  id: true,
  name: true,
  note: true,
}).extend({
  sets: z
    .array(OptionalSetSchema)
    .transform((sets) => sets.filter((set) => set.reps)),
  done: z.boolean().optional(),
});

export type ExerciseToDoType = z.infer<typeof ExerciseWithOptionalSetsSchema>;

//Workout types and schemas

export type WorkoutActionResponse = {
  status: "success" | "success-redirect" | "error" | "unset";
  errors?: {
    title?: string[];
    exercises?: string[];
  };
  message: string;
};

export const WorkoutSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .trim()
    .min(2, { message: "Must be at least 2 characters long." })
    .max(30, { message: "Too long. Keep it less than 30 characters." }),
  description: z.string().trim().nullable(),
  exercises: z
    .array(ExerciseSchema)
    .min(1, { message: "Please add at least one exercise." }),
  status: z.enum(workoutStatus),
  userId: z.string(),
  doneAt: z.date().nullable(),
  duration: z.number().nullable(),
});

export const CreateWorkoutSchema = WorkoutSchema.pick({
  title: true,
  description: true,
  exercises: true,
});

export type CreateWorkoutType = z.infer<typeof CreateWorkoutSchema>;

export const WorkoutToDoSchema = WorkoutSchema.pick({
  title: true,
  description: true,
}).extend({
  exercises: z.array(ExerciseWithOptionalSetsSchema),
});

export type WorkoutToDoType = z.infer<typeof WorkoutToDoSchema>;

//Auth types and schemas

export type AuthActionResponse = {
  status?: "success" | "error" | "success-redirect" | "pending";
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
};

export const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Must contain at least 3 characters." })
      .max(32, { message: "Must be within 3 and 32 characters long." }),
    email: z.string().trim().email({ message: "Not a valid email address." }),
    password: z.string().superRefine((password, context) => {
      if (password.length < 8 && !/[0-9]/.test(password)) {
        context.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: "string",
          inclusive: true,
          message: "Must contain at least 8 characters and 1 number.",
        });

        return;
      }

      if (password.length < 8) {
        context.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: "string",
          inclusive: true,
          message: "Must contain at least 8 characters.",
        });

        return;
      }

      if (!/[0-9]/.test(password)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must contain at least one number.",
        });

        return;
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
      });
    }
  });

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Invalid username." })
    .max(32, { message: "Invalid username." }),
  password: z.string().superRefine((password, context) => {
    if (password.length < 8 || !/[0-9]/.test(password)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid password.",
      });
    }
  }),
});

export const timeFormatValues = [
  "Hours and minutes",
  "Minutes only",
  "default",
] as const;

export type TimeFormatType = (typeof timeFormatValues)[number];

export type UserPreferences = {
  timeFormat: TimeFormatType;
};
