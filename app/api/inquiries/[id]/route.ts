import { type NextRequest, NextResponse } from "next/server"

interface Inquiry {
  id: string
  status: string
  notes?: string
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, notes } = body

    // Mock response for now - replace with actual database logic
    const mockInquiry: Inquiry = {
      id,
      status: status || "pending",
      notes: notes || ""
    }

    return NextResponse.json(mockInquiry)
  } catch (error) {
    console.error("Error updating inquiry:", error)
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 })
  }
}
