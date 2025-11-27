import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Mock logout for demo purposes
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
