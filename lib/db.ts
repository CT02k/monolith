import { youtube_v3 } from "@googleapis/youtube/build/v3"

export async function savePlaylisConversion(convertedTracks: {
  convertedTracks: (youtube_v3.Schema$SearchResult | undefined)[]
  url: string
}) {
  const res = await prisa
}
