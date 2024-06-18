import { z } from "zod";

export type PageLink = {
  href: string;
  icon: JSX.Element;
  button: "Home" | "Logs" | "Profile";
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
};

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

export type WorkoutActionResponse = {
  status: "success" | "error" | "unset";
  errors?: {
    title?: string[];
    exercises?: string[];
  };
  message: string;
};

export const ExerciseSchema = z.object({
  name: z
    .string()
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
  comment: z.string().max(80, { message: "Comment is too long" }).optional(),
});

export const AddExerciseSchema = ExerciseSchema.omit({
  comment: true,
});

export type ExerciseType = z.infer<typeof ExerciseSchema>;

export const workoutStatus = ["current", "done"] as const;

export const WorkoutSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(30, { message: "Too long. Keep it less than 30 characters." }),
  description: z
    .string()
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
