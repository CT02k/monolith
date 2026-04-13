import { getPlaylistTracks, getTrack } from "@/lib/spotify"
import { parseSpotifyInput } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET() {
  const playlistId = parseSpotifyInput(
    "https://open.spotify.com/playlist/0F3RnzseCThdsxaZdBH5Al?si=46dd119442974828"
  )

  if (!playlistId?.id)
    return NextResponse.json(
      { error: "Invalid Spotify input" },
      { status: 400 }
    )

  const playlistTracks = (await getPlaylistTracks(playlistId.id)).items
  const firstTrack =
    playlistTracks[Math.floor(Math.random() * playlistTracks.length)].track

  return NextResponse.json({
    message: `${playlistId.source} ${firstTrack.name} by ${firstTrack.artists.map((artist) => artist.name).join(", ")}`,
  })
}
