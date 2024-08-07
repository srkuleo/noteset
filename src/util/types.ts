import { z } from "zod";
import { workoutStatus } from "@/db/schema";

//Exercise types and schemas

export type ExerciseActionResponse = {
  errors?: {
    name?: string[] | undefined;
    sets?: string[] | undefined;
    reps?: string[] | undefined;
    weights?: string[] | undefined;
    comment?: string[] | undefined;
  };
  message?: string;
};

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Exercise name must be at least 2 characters long." })
    .max(30, { message: "Too long. Keep it less than 30 characters." }),
  sets: z.number().min(1, { message: "Please choose the number of sets." }),
  reps: z.array(
    z
      .string()
      .regex(/^(?:\d+|\d+-\d+)$/, { message: "Reps must be number or range." }),
  ),
  weights: z.array(
    z.string().regex(/^\d+(,\d+)?$/, {
      message: "Weight must be positve or decimal number.",
    }),
  ),
  comment: z
    .string()
    .trim()
    .max(80, { message: "Comment is too long" })
    .optional(),
});

export type ExerciseType = z.infer<typeof ExerciseSchema>;

export const AddExerciseSchema = ExerciseSchema.omit({
  comment: true,
});

//Workout types and schemas

export type WorkoutActionResponse = {
  status: "success" | "success-redirect" | "error" | "unset" | "pending";
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
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(30, { message: "Too long. Keep it less than 30 characters." }),
  description: z
    .string()
    .trim()
    .max(80, { message: "Too long. Keep it less than 80 characters." })
    .optional(),
  exercises: z
    .array(ExerciseSchema)
    .min(1, { message: "Please add at least one exercise." }),
  status: z.enum(workoutStatus),
  userId: z.string(),
  doneAt: z.date(),
  timeElapsed: z.string(),
});

export const CreateWorkoutSchema = WorkoutSchema.omit({
  id: true,
  status: true,
  userId: true,
  doneAt: true,
  timeElapsed: true,
});

export type WorkoutWithoutIds = z.infer<typeof CreateWorkoutSchema>;

//Auth types and schemas

export type AuthActionResponse = {
  status?: "success" | "error" | "success-redirect";
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
