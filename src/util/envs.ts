import { z } from "zod"

const envVariablesSchema = z.object({
  DATABASE_URL: z.url(),
})

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}

const checkEvn = () => {
  const envCheck = envVariablesSchema.safeParse(process.env)

  if (!envCheck.success) {
    throw new Error("Env variable is missing.")
  }
}

export default checkEvn
