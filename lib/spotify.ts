import { SpotifyApi } from "@spotify/web-api-ts-sdk"
import { env } from "./env"

const spotify = SpotifyApi.withClientCredentials(
  env.SPOTIFY_CLIENT_ID,
  env.SPOTIFY_CLIENT_SECRET
)

export function getPlaylistTracks(playlistId: string) {
  return spotify.playlists.getPlaylistItems(playlistId)
}

export function getTrack(trackId: string) {
  return spotify.tracks.get(trackId)
}
