import { useState } from "react"

type ConvertedTrack = {
  id: string
  playlistId: string
  youtubeId: string
  title: string
  channelName: string
  thumbnailUrl: string
}

type ConvertResponse = {
  id: string
  spotifyUrl: string
  spotifyId: string
  youtubeUrl: string
  createdAt: string
  tracks: ConvertedTrack[]
}

type CreateConversionResponse = {
  id: string
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
      const createResponse = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistUrl }),
      })

      if (!createResponse.ok) {
        const message = await createResponse.text()
        throw new Error(message || "Failed to convert playlist")
      }

      const { id } = (await createResponse.json()) as CreateConversionResponse

      const conversionResponse = await fetch(`/api/convert/${id}`)

      if (!conversionResponse.ok) {
        const message = await conversionResponse.text()
        throw new Error(message || "Failed to load converted playlist")
      }

      const result = (await conversionResponse.json()) as ConvertResponse
      setData(result)

      return id
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to convert playlist"
      )
      return null
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, convert }
}
