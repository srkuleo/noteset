import {
  date,
  index,
  mysqlTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

export const workouts = mysqlTable(
  "workouts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }),
    description: text("description"),
    userId: varchar("user_id", { length: 255 }).notNull(),
    doneAt: date("done_at"),
    timeElapsed: text("time_elapsed"),
  },
  (table) => {
    return {
      userIdIndex: index("user_id_index").on(table.userId),
    };
  },
);

//Later on add schema for superset and exercises
