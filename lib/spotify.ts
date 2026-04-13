import { SpotifyApi } from "@spotify/web-api-ts-sdk"

const spotify = SpotifyApi.withClientCredentials(
  "38f16be1ff184568b93be029774924f0",
  "566b27fcd191490eae687c3672f9c8bd"
)

export function getPlaylistTracks(playlistId: string) {
  return spotify.playlists.getPlaylistItems(playlistId)
}

export function getTrack(trackId: string) {
  return spotify.tracks.get(trackId)
}
