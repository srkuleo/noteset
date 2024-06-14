import { workoutStatus, type ExerciseType } from "@/util/types";
import {
  pgTable,
  index,
  json,
  serial,
  timestamp,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", workoutStatus);

export const workouts = pgTable(
  "workouts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 30 }).notNull(),
    description: varchar("description", { length: 80 }),
    exercises: json("exercises").$type<ExerciseType[]>().notNull(),
    status: statusEnum("status").default("current"),
    userId: varchar("user_id", { length: 255 }).notNull(),
    doneAt: timestamp("done_at").defaultNow(),
    timeElapsed: varchar("time_elapsed", { length: 100 }),
  },
  (table) => {
    return {
      userIdIndex: index("user_id_index").on(table.userId),
      titleIndex: index("title_index").on(table.title),
      statusIndex: index("status_index").on(table.status),
    };
  },
);

export type Workout = {
  id: typeof workouts.$inferSelect.id;
  title: typeof workouts.$inferSelect.title;
  description: typeof workouts.$inferSelect.description;
  exercises: typeof workouts.$inferSelect.exercises;
};

//Later on add schema for superset and exercises
