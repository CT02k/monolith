import { useState } from "react"

type ConvertedTrack = {
  spotifyTitle: string
  spotifyArtists: string[]
  youtubeTitle: string | null
  youtubeVideoId: string | null
  youtubeUrl: string | null
}

type ConvertResponse = {
  playlistId: string
  total: number
  converted: ConvertedTrack[]
}

export function useConverter() {
  const [data, setData] = useState<ConvertResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function convert(playlistUrl: string) {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistUrl }),
      })
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError("Failed to convert playlist")
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, convert }
}
