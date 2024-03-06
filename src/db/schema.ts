import type { ExerciseType } from "@/util/types";
import {
  date,
  index,
  mysqlTable,
  serial,
  varchar,
  json,
} from "drizzle-orm/mysql-core";

export const workouts = mysqlTable(
  "workouts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 30 }).notNull(),
    description: varchar("description", { length: 80 }),
    exercises: json("exercises").$type<ExerciseType[]>().notNull(),
    status: varchar("status", { length: 10 }).default("current"),
    userId: varchar("user_id", { length: 255 }).notNull(),
    doneAt: date("done_at"),
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
