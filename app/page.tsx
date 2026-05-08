"use client"

import Image from "next/image"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { decode } from "html-entities"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useConverter } from "@/hooks/useConverter"
import { useRouter } from "next/navigation"

export default function Page() {
  const [playlistUrl, setPlaylistUrl] = useState("")
  const router = useRouter()
  const { convert, loading, error, data } = useConverter()

  const hasTracks = (data?.tracks.length ?? 0) > 0

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4">
      <p className="mb-4 max-w-md rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-700 dark:text-amber-300">
        Currently only fetching the first 5 songs because the YouTube API is
        mercenary and the free quota is very low.
      </p>
      <h1 className="text-center text-2xl font-medium">
        Convert Spotify Playlists to YouTube
      </h1>
      <form
        className="mt-10 flex w-full max-w-md items-center rounded-full border p-1"
        onSubmit={async (e) => {
          e.preventDefault()
          if (!playlistUrl.trim()) return
          const id = await convert(playlistUrl)
          if (id) {
            router.push(`/${id}`)
          }
        }}
      >
        <Input
          placeholder="https://open.spotify.com/playlist/..."
          style={{ backgroundColor: "transparent" }}
          className="rounded-full border-0 focus-visible:ring-0"
          name="playlistUrl"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
        />
        <Button
          className="cursor-pointer rounded-full"
          size="lg"
          type="submit"
          disabled={loading || !playlistUrl.trim()}
        >
          {loading ? "Converting..." : "Convert"}
        </Button>
      </form>
      <div
        className={`w-full max-w-100 overflow-hidden rounded-b-2xl border-x border-b transition-all ${
          loading || error || hasTracks ? "h-lg opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="max-h-lg space-y-3 overflow-y-auto bg-card/80 p-3 backdrop-blur">
          {loading ? (
            <div className="flex items-center justify-center rounded-xl px-4 py-8 text-primary">
              <LoaderCircle className="animate-spin" />
            </div>
          ) : null}

          {!loading && error ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {!loading && hasTracks && data?.youtubeUrl ? (
            <a
              href={data.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-primary px-4 py-3 text-center text-sm font-medium text-black transition-all hover:bg-primary/90"
            >
              Open on YouTube
            </a>
          ) : null}

          {!loading && hasTracks
            ? data?.tracks.map((track, index) => {
                const href = track.youtubeId
                  ? `https://www.youtube.com/watch?v=${track.youtubeId}`
                  : null

                return (
                  <a
                    key={`${track.youtubeId ?? "missing"}-${index}`}
                    href={href ?? "#"}
                    target={href ? "_blank" : undefined}
                    rel={href ? "noreferrer" : undefined}
                    className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-3 transition-colors hover:bg-muted/60"
                  >
                    <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
                      {track.thumbnailUrl ? (
                        <Image
                          src={track.thumbnailUrl}
                          alt={track.title ?? "YouTube thumbnail"}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-medium">
                        {decode(track.title ?? "No title found")}
                      </p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {decode(track.channelName ?? "Unknown channel")}
                      </p>
                    </div>
                  </a>
                )
              })
            : null}
        </div>
      </div>
    </div>
  )
}
