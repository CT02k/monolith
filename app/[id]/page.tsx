import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { decode } from "html-entities"
import { getPlaylistConversion } from "@/lib/db"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getPlaylistConversion(id)

  if (!data) {
    notFound()
  }

  const hasTracks = data.tracks.length > 0

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4">
      <p className="mb-4 max-w-md rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-700 dark:text-amber-300">
        Currently only fetching the first 5 songs because the YouTube API is
        mercenary and the free quota is very low.
      </p>
      <div className="mt-4 w-full max-w-100 overflow-hidden rounded-2xl border">
        <div className="max-h-lg overflow-y-auto bg-card/80 px-3 pt-3 backdrop-blur">
          {hasTracks && data.youtubeUrl ? (
            <a
              href={data.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-primary px-4 py-3 text-center text-sm font-medium text-black transition-all hover:bg-primary/90"
            >
              Open on YouTube
            </a>
          ) : null}

          <div className="max-h-110 space-y-3 overflow-y-auto p-3">
            {hasTracks
              ? data.tracks.map((track, index) => {
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

      <Link href="/" className="mt-10 rounded-full border px-4 py-2 text-sm">
        Convert another playlist
      </Link>
    </div>
  )
}
