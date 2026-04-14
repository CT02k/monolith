import { Track } from "@spotify/web-api-ts-sdk"
import { findYoutubeEquivalent } from "./youtube"

export async function convertSpotifyPlaylistToYoutube(tracks: Track[]) {
  return Promise.all(
    tracks.map(async (track) => {
      const youtubeVideo = await findYoutubeEquivalent(
        track.name,
        track.artists[0].name
      )
      return youtubeVideo
    })
  )
}
