import { youtube_v3 } from "@googleapis/youtube/build/v3"
import { prisma } from "./prisma"

export async function savePlaylistConversion({
  spotifyUrl,
  spotifyId,
  convertedTracks,
  url,
}: {
  spotifyUrl: string
  spotifyId: string
  convertedTracks: (youtube_v3.Schema$SearchResult | undefined)[]
  url: string
}) {
  return await prisma.playlist.create({
    data: {
      spotifyUrl,
      spotifyId,
      youtubeUrl: url,
      tracks: {
        create: convertedTracks
          .filter((track): track is youtube_v3.Schema$SearchResult => !!track)
          .map((track) => ({
            title: track.snippet?.title || "Unknown Title",
            youtubeId: track.id?.videoId || "Unknown ID",
            channelName: track.snippet?.channelTitle || "Unknown Channel",
            thumbnailUrl:
              track.snippet?.thumbnails?.high?.url ||
              track.snippet?.thumbnails?.medium?.url ||
              track.snippet?.thumbnails?.default?.url ||
              "",
          })),
      },
    },
  })
}

export async function getPlaylistConversion(id: string) {
  return await prisma.playlist.findUnique({
    where: { id },
    include: { tracks: true },
  })
}
