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
} from "drizzle-orm/pg-core";

import type { ExerciseType } from "@/util/types";

export const workoutStatus = ["current", "done", "archived"] as const;
export const statusEnum = pgEnum("status", workoutStatus);

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    username: varchar("username", { length: 32 }).unique().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    hashedPassword: varchar("hashed_password", { length: 100 }).notNull(),
    isVerified: boolean("is_verified").default(false),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
  },
  (table) => {
    return {
      usernameIndex: index("username_index").on(table.username),
      emailIndex: index("email_index").on(table.email),
    };
  },
);

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const workouts = pgTable(
  "workouts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 30 }).notNull(),
    description: varchar("description", { length: 80 }),
    exercises: json("exercises").$type<ExerciseType[]>().notNull(),
    status: statusEnum("status").default("current").notNull(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    doneAt: timestamp("done_at", {
      withTimezone: true,
      mode: "date",
    }),
    duration: integer("duration"),
  },
  (table) => {
    return {
      userIdIndex: index("user_id_index").on(table.userId),
      titleIndex: index("title_index").on(table.title),
      statusIndex: index("status_index").on(table.status),
    };
  },
);

export type WorkoutType = Omit<typeof workouts.$inferSelect, "userId">;
export type PartialWorkoutType = Omit<WorkoutType, "duration" | "doneAt">;
export type QueriedByIdWorkoutType = Omit<
  WorkoutType,
  "status" | "duration" | "doneAt"
>;
