import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string("DATABASE_URL is required"),
  SPOTIFY_CLIENT_ID: z.string("SPOTIFY_CLIENT_ID is required"),
  SPOTIFY_CLIENT_SECRET: z.string("SPOTIFY_CLIENT_SECRET is required"),
  YOUTUBE_API_KEY: z.string("YOUTUBE_API_KEY is required"),
  TRACKS_LIMIT: z
    .string("TRACKS_LIMIT must be a number")
    .default("0")
    .transform(Number),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error("❌ Invalid environment variables:", z.treeifyError(_env.error))
  throw new Error("❌ Invalid environment variables")
}

export const env = _env.data
