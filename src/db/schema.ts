import {
  pgTable,
  index,
  json,
  serial,
  timestamp,
  varchar,
  pgEnum,
  boolean,
  integer,
  text,
} from "drizzle-orm/pg-core";

import type { ExerciseType, UserPreferences } from "@/util/types";

export const WORKOUT_STATUS_VALUES = ["current", "done", "archived"] as const;
export const statusEnum = pgEnum("status", WORKOUT_STATUS_VALUES);

export const users = pgTable(
  "users",
  {
    id: varchar({ length: 255 }).primaryKey(),
    username: varchar({ length: 32 }).unique().notNull(),
    email: varchar({ length: 255 }).unique().notNull(),
    hashedPassword: varchar({ length: 100 }).notNull(),
    isVerified: boolean().default(false).notNull(),
    createdAt: timestamp({
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    preferences: json().$type<UserPreferences>().notNull(),
  },
  (table) => [
    index("username_index").on(table.username),
    index("email_index").on(table.email),
  ],
);

export const sessions = pgTable(
  "sessions",
  {
    id: varchar({ length: 255 }).primaryKey(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp({
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (table) => [index("expires_at_index").on(table.expiresAt)],
);

export const workouts = pgTable(
  "workouts",
  {
    id: serial().primaryKey(),
    title: varchar({ length: 30 }).notNull(),
    description: text(),
    exercises: json().$type<ExerciseType[]>().notNull(),
    status: statusEnum().default("current").notNull(),
    userId: varchar({ length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    doneAt: timestamp({
      withTimezone: true,
      mode: "date",
    }),
    duration: integer(),
  },
  (table) => [
    index("user_id_index").on(table.userId),
    index("title_index").on(table.title),
    index("status_index").on(table.status),
  ],
);

export type User = Omit<typeof users.$inferSelect, "hashedPassword">;
export type Session = typeof sessions.$inferSelect;

export type WorkoutType = Omit<typeof workouts.$inferSelect, "userId">;
export type PartialWorkoutType = Omit<WorkoutType, "duration" | "doneAt">;
export type QueriedByIdWorkoutType = Omit<
  WorkoutType,
  "status" | "duration" | "doneAt"
>;
