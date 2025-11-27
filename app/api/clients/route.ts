import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import type { Client, CompanySize } from "@/lib/types"
import type { Client } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let queryText = "SELECT * FROM clients WHERE is_active = true"

    if (featured === "true") {
      queryText += " AND is_featured = true"
    }

    queryText += " ORDER BY company_name ASC"

    const clients = await query<Client>(queryText)
    return NextResponse.json(clients)
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { companyName, contactName, email, phone, address, logoUrl, industry, notes, isFeatured } = body

    const result = await query<Client>(
      `INSERT INTO clients (company_name, contact_name, email, phone, address, logo_url, industry, notes, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [companyName, contactName, email, phone, address, logoUrl, industry, notes, isFeatured ?? false],
    )

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating client:", error)
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 })
  }
}
