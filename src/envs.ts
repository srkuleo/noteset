import { z } from "zod";

const envVariablesSchema = z.object({
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_URL: z.string().url(),
});

envVariablesSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}
