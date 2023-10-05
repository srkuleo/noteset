import { relations } from "drizzle-orm";
import {
  bigint,
  date,
  json,
  mysqlTable,
  serial,
  text,
  time,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }),
  email: varchar("email", { length: 50 }).notNull(),
  password: varchar("password", { length: 20 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  workouts: many(workouts),
}));

export const workouts = mysqlTable("workouts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }),
  description: text("description"),
  exercises: json("exercises"),
  done_at: date("done_at"),
  time_elapsed: time("time_elapsed"),
  user_id: bigint("user_id", { mode: "bigint" }),
});

export const workoutsRelations = relations(workouts, ({ one }) => ({
  user: one(users, {
    fields: [workouts.user_id],
    references: [users.id],
  }),
}));
