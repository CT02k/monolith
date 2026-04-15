import { useState } from "react"

type ConvertedTrack = {
  id?: {
    videoId?: string | null
  } | null
  snippet?: {
    title?: string | null
    channelTitle?: string | null
    thumbnails?: {
      high?: {
        url?: string | null
      }
      medium?: {
        url?: string | null
      }
      default?: {
        url?: string | null
      }
    } | null
  } | null
}

type ConvertResponse = {
  convertedTracks: ConvertedTrack[]
  url: string
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

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || "Failed to convert playlist")
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to convert playlist"
      )
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, convert }
}
