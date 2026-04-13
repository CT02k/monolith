import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ParsedSpotifyInput = {
  source: "uri" | "url" | "raw_id"
  type:
    | "track"
    | "playlist"
    | "album"
    | "artist"
    | "show"
    | "episode"
    | "audiobook"
    | null
  id: string
  url: string | null
}

export function parseSpotifyInput(input: string): ParsedSpotifyInput | null {
  const value = input.trim()

  const validTypes = [
    "track",
    "playlist",
    "album",
    "artist",
    "show",
    "episode",
    "audiobook",
  ]

  const isValidId = (id: string) => /^[A-Za-z0-9]{22}$/.test(id)

  const uriMatch = value.match(
    /^spotify:(track|playlist|album|artist|show|episode|audiobook):([A-Za-z0-9]{22})$/i
  )
  if (uriMatch) {
    return {
      source: "uri",
      type: uriMatch[1].toLowerCase() as ParsedSpotifyInput["type"],
      id: uriMatch[2],
      url: `https://open.spotify.com/${uriMatch[1].toLowerCase()}/${uriMatch[2]}`,
    }
  }

  try {
    const url = new URL(value)
    const hostname = url.hostname.replace(/^www\./, "").toLowerCase()

    if (hostname === "open.spotify.com") {
      const parts = url.pathname.split("/").filter(Boolean)

      if (parts.length >= 2) {
        const [type, id] = parts

        if (validTypes.includes(type.toLowerCase()) && isValidId(id)) {
          return {
            source: "url",
            type: type.toLowerCase() as ParsedSpotifyInput["type"],
            id,
            url: `https://open.spotify.com/${type.toLowerCase()}/${id}`,
          }
        }
      }
    }
  } catch {}

  if (isValidId(value)) {
    return {
      source: "raw_id",
      type: null,
      id: value,
      url: null,
    }
  }

  return null
}
