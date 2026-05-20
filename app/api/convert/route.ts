import { convertSpotifyPlaylistToYoutube } from "@/lib/converter"
import { savePlaylistConversion } from "@/lib/db"
import { env } from "@/lib/env"
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
    .slice(0, env.TRACKS_LIMIT)
    .map((item) => item.track)

  const conversion = await convertSpotifyPlaylistToYoutube(tracks)

  const savedPlaylist = await savePlaylistConversion({
    spotifyUrl: playlistUrl,
    spotifyId: playlistId,
    convertedTracks: conversion.convertedTracks,
    url: conversion.url,
  })

  return NextResponse.json({ id: savedPlaylist.id })
}
