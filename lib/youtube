import { youtube } from "@googleapis/youtube"
import { env } from "process"

const client = youtube({
  version: "v3",
  auth: env.YOUTUBE_API_KEY,
})

function searchVideos(query: string) {
  return client.search.list({
    part: ["snippet"],
    q: query,
    type: ["video"],
    maxResults: 5,
  })
}

export async function findYoutubeEquivalent(
  spotifyTrackName: string,
  spotifyArtistName: string
) {
  const query = `${spotifyTrackName} ${spotifyArtistName}`

  return (await searchVideos(query)).data.items?.[0]
}
