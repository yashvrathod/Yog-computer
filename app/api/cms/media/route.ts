import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import type { Media } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    // Check authentication for admin features
    const session = await getSession()
    const isAdmin = session && ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(session.user.role)

    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder")
    const search = searchParams.get("search")
    const mimeType = searchParams.get("mimeType")
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "20")

    const where: any = {}

    if (folder) {
      where.folder = folder
    }

    if (search) {
      where.OR = [
        { filename: { contains: search, mode: 'insensitive' } },
        { originalName: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
        { caption: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (mimeType) {
      where.mimeType = { startsWith: mimeType }
    }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        include: isAdmin ? {
          creator: {
            select: { id: true, name: true, email: true }
          }
        } : undefined,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.media.count({ where })
    ])

    return NextResponse.json({
      data: media,
      pagination: {
        page,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    })
  } catch (error) {
    console.error("Error fetching media:", error)
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession()
    if (!session || !['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      filename,
      originalName,
      mimeType,
      size,
      url,
      alt,
      caption,
      description,
      folder,
      tags = [],
      width,
      height,
      metadata
    } = body

    // Validate required fields
    if (!filename || !url || !mimeType) {
      return NextResponse.json({ error: "Filename, URL, and MIME type are required" }, { status: 400 })
    }

    const media = await prisma.media.create({
      data: {
        filename,
        originalName: originalName || filename,
        mimeType,
        size: size || 0,
        url,
        alt,
        caption,
        description,
        folder,
        tags,
        width,
        height,
        metadata,
        createdById: session.user.id
      }
    })

    return NextResponse.json({ data: media }, { status: 201 })
  } catch (error) {
    console.error("Error creating media:", error)
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 })
  }
}