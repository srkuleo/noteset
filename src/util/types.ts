import { z } from "zod";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export const ExerciseSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Exercise name must be at least 2 characters long." })
    .max(30, { message: "Too long. Keep it less than 30 characters." }),
  sets: z.number(),
  reps: z.array(z.string()),
  weights: z.array(z.number()),
});

export const validateSets = z.coerce
  .number()
  .min(0, { message: "Please provide number greater than 0." })
  .max(10, { message: "Don't overtrain. Max number of sets is 10." });

export type Exercise = z.infer<typeof ExerciseSchema>;

export type InputFieldErrors = {
  errors?: {
    title?: string[];
    description?: string[];
    exercises?: string[];
  };
  message?: string | null;
};

export const WorkoutSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(30, { message: "Too long. Keep it less than 30 characters." }),
  description: z
    .string()
    .min(5, { message: "Please provide a short description." })
    .max(80, { message: "Too long. Keep it less than 80 characters." }),
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
