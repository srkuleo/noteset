import { relations, sql } from "drizzle-orm";
import {
  date,
  index,
  int,
  json,
  mysqlTable,
  primaryKey,
  serial,
  text,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  username: varchar("username", { length: 30 }).unique(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified").default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 32 }),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  workouts: many(workouts),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const workouts = mysqlTable(
  "workout",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }),
    description: text("description"),
    workoutComment: varchar("workout_comment", { length: 255 }).default(
      "Add comment...",
    ),
    exercises: json("exercises").default({}),
    doneAt: date("done_at"),
    timeElapsed: time("time_elapsed"),
    userId: varchar("user_id", { length: 255 }),
  },
  (workouts) => {
    return {
      doneAtIdx: index("done_at_idx").on(workouts.doneAt),
    };
  },
);

export const workoutsRelations = relations(workouts, ({ one }) => ({
  user: one(users, {
    fields: [workouts.userId],
    references: [users.id],
  }),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
