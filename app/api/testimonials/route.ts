import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import type { Testimonial } from "@/lib/types"
import type { Testimonial } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let queryText = "SELECT * FROM testimonials WHERE is_active = true"

    if (featured === "true") {
      queryText += " AND is_featured = true"
    }

    queryText += " ORDER BY created_at DESC"

    const testimonials = await query<Testimonial>(queryText)
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}
