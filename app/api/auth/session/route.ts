import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock session for demo purposes
    return NextResponse.json({ user: null })
  } catch (error) {
    console.error("Session error:", error)
    return NextResponse.json({ user: null })
  }
}
