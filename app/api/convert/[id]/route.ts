import { NextResponse } from "next/server"
import { getPlaylistConversion } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const data = getPlaylistConversion(id)

  if (!data) {
    return new NextResponse("Playlist conversion not found", { status: 404 })
  }

  return NextResponse.json({ ...data })
}
