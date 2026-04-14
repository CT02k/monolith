import { convertSpotifyPlaylistToYoutube } from "@/lib/converter"
import { getPlaylistTracks } from "@/lib/spotify"
import { parseSpotifyInput } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { playlistUrl } = await request.json()
  const playlistId = parseSpotifyInput(playlistUrl)?.id

  if (!playlistId) {
    return new Response("Invalid Spotify playlist URL", { status: 400 })
  }

  const tracks = (await getPlaylistTracks(playlistId)).items
    .slice(0, 5)
    .map((item) => item.track)

  const convertedTracks = await convertSpotifyPlaylistToYoutube(tracks)

  return NextResponse.json(convertedTracks)
}
