import {
  pgTable,
  index,
  json,
  serial,
  timestamp,
  varchar,
  pgEnum,
  boolean,
  date,
  integer,
} from "drizzle-orm/pg-core";

import type { ExerciseType } from "@/util/types";

export const workoutStatus = ["current", "done", "arhived"] as const;
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
    description: varchar("description", { length: 80 }).notNull(),
    exercises: json("exercises").$type<ExerciseType[]>().notNull(),
    status: statusEnum("status").default("current").notNull(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    doneAt: date("done_at", { mode: "string" }),
    timeElapsed: integer("time_elapsed"),
  },
  (table) => {
    return {
      userIdIndex: index("user_id_index").on(table.userId),
      titleIndex: index("title_index").on(table.title),
      statusIndex: index("status_index").on(table.status),
    };
  },
);

export type FetchedWorkout = Pick<
  typeof workouts.$inferSelect,
  "id" | "title" | "description" | "exercises" | "status"
>;
