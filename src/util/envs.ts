import { z } from "zod";

const envVariablesSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_URL: z.string().url(),
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
