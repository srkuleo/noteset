import { z } from "zod";

const envVariablesSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}

const checkEvn = () => {
  const envCheck = envVariablesSchema.safeParse(process.env);

  if (!envCheck.success) {
    throw new Error("Env variable is missing.");
  }
};

export default checkEvn;
