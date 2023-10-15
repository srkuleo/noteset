import { relations } from "drizzle-orm";
import {
  bigint,
  date,
  index,
  json,
  mysqlTable,
  serial,
  text,
  time,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 30 }).notNull().unique(),
    email: varchar("email", { length: 50 }).notNull().unique(),
    password: varchar("password", { length: 32 }).notNull(),
    picture: text("picture"),
    createdAt: date("created_at"),
  },
  (table) => {
    return {
      emailIdx: index("email_idx").on(table.email),
    };
  },
);

export const usersRelations = relations(users, ({ many }) => ({
  workouts: many(workouts),
}));

export const workouts = mysqlTable(
  "workouts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }),
    description: text("description"),
    workoutComment: varchar("workout_comment", { length: 255 }).default(
      "Add comment...",
    ),
    exercises: json("exercises"),
    doneAt: date("done_at"),
    timeElapsed: time("time_elapsed"),
    userId: bigint("user_id", { mode: "bigint" }),
  },
  (table) => {
    return {
      doneAtIdx: index("done_at_idx").on(table.doneAt),
    };
  },
);

export const workoutsRelations = relations(workouts, ({ one }) => ({
  user: one(users, {
    fields: [workouts.userId],
    references: [users.id],
  }),
}));
