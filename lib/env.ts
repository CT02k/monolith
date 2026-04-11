import { z } from "zod"

const envSchema = z.object({
  SPOTIFY_CLIENT_SECRET: z.string("SPOTIFY_CLIENT_SECRET is required"),
})

export const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error("❌ Invalid environment variables:", z.treeifyError(env.error))
  throw new Error("❌ Invalid environment variables")
}
