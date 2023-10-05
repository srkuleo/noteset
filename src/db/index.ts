import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as schema from "./schema";

/*  Potentially needed for reading env file  */

// import { cwd } from "process";
// import { loadEnvConfig } from "@next/env";

// loadEnvConfig(cwd());

const connection = connect({
  url: process.env.DB_URL,
});

export const db = drizzle(connection, { schema });
