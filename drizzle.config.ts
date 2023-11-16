import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
  breakpoints: true,
} satisfies Config;
