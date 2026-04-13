import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-2xl font-medium">
        Convert Spotify Playlists to YouTube
      </h1>
      <div className="mt-10 flex w-full max-w-md gap-2">
        <Input placeholder="https://open.spotify.com/playlist/..." />
        <Button>Convert</Button>
      </div>
    </div>
  )
}
