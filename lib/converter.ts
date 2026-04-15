import { Track } from "@spotify/web-api-ts-sdk"
import { findYoutubeEquivalent } from "./youtube"

export async function convertSpotifyPlaylistToYoutube(tracks: Track[]) {
  const convertedTracks = Promise.all(
    tracks.map(async (track) => {
      const youtubeVideo = await findYoutubeEquivalent(
        track.name,
        track.artists.map((artist) => artist.name).join(" ")
      )
      return youtubeVideo
    })
  )

  return {
    convertedTracks: await convertedTracks,
    url: `https://www.youtube.com/watch_videos?video_ids=${(
      await convertedTracks
    )
      .slice(0, 50)
      .filter((video) => video?.id?.videoId)
      .map((video) => video?.id?.videoId)
      .join(",")}`,
  }
}
