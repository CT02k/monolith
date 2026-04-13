"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-2xl font-medium">
        Convert Spotify Playlists to YouTube
      </h1>
      <div className="mt-10 flex w-full max-w-md items-center rounded-full border p-1">
        <Input
          placeholder="https://open.spotify.com/playlist/..."
          style={{ backgroundColor: "transparent" }}
          className="rounded-full border-0 focus-visible:ring-0"
        />
        <Button className="cursor-pointer rounded-full" size="lg">
          Convert
        </Button>
      </div>
      <div
        className={`h-0 w-96 rounded-b-lg border-x border-b opacity-0 transition-all hover:h-48 hover:opacity-100`}
      ></div>
    </div>
  )
}
