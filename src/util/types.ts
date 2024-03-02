import { z } from "zod";

export type PageLink = {
  href: string;
  icon: JSX.Element;
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
};

export type ActionResponse = {
  status: "success" | "error" | "unset";
  errors?: {
    title?: string[];
    description?: string[];
    exercises?: string[];
  };
  message: string;
  timestamp: number;
};

export const ExerciseSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Exercise name must be at least 2 characters long." })
    .max(30, { message: "Too long. Keep it less than 30 characters." }),
  sets: z.number(),
  reps: z.array(z.string()),
  weights: z.array(z.number()),
  comment: z.string().max(80, { message: "Comment is too long" }).optional(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;

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
    .nonempty({ message: "Please add at least one exercise." }),
  status: z.enum(["current", "done"]),
  userId: z.string(),
  doneAt: z.string(),
  timeElapsed: z.string(),
});

export const CreateWorkoutSchema = WorkoutSchema.omit({
  id: true,
  status: true,
  userId: true,
  doneAt: true,
  timeElapsed: true,
});
