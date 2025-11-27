import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

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

    const result = await query<Inquiry>(
      `UPDATE inquiries 
       SET status = COALESCE($1, status),
           notes = COALESCE($2, notes),
           updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [status, notes, id],
    )

    if (result.length === 0) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating inquiry:", error)
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 })
  }
}
