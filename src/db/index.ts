import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema: schema });

export const adapter = new DrizzlePostgreSQLAdapter(
  db,
  schema.sessions,
  schema.users,
);
