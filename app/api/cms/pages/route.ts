import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import type { Page, PageStatus } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") as PageStatus
    const published = searchParams.get("published")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "20")

    const where: any = {}

    // Only show published pages for non-authenticated users
    const session = await getSession()
    if (!session) {
      where.isPublished = true
      where.status = 'PUBLISHED'
    } else if (status) {
      where.status = status
    }

    if (published === "true") {
      where.isPublished = true
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [pages, total] = await Promise.all([
      prisma.page.findMany({
        where,
        include: {
          creator: {
            select: { id: true, name: true, email: true }
          },
          updater: {
            select: { id: true, name: true, email: true }
          },
          parent: {
            select: { id: true, title: true, slug: true }
          },
          children: {
            select: { id: true, title: true, slug: true }
          }
        },
        orderBy: [
          { sortOrder: 'asc' },
          { createdAt: 'desc' }
        ],
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.page.count({ where })
    ])

    return NextResponse.json({
      data: pages,
      pagination: {
        page,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    })
  } catch (error) {
    console.error("Error fetching pages:", error)
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
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
      title,
      slug,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      status = 'DRAFT',
      isPublished = false,
      publishedAt,
      template,
      parentId,
      sortOrder = 0,
      featuredImage,
      settings
    } = body

    // Validate required fields
    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 })
    }

    // Check if slug already exists
    const existingPage = await prisma.page.findUnique({ where: { slug } })
    if (existingPage) {
      return NextResponse.json({ error: "Page with this slug already exists" }, { status: 400 })
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        metaTitle,
        metaDescription,
        status: status as PageStatus,
        isPublished,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        template,
        parentId,
        sortOrder,
        featuredImage,
        settings,
        createdById: session.user.id,
        updatedById: session.user.id
      },
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        },
        parent: {
          select: { id: true, title: true, slug: true }
        }
      }
    })

    return NextResponse.json({ data: page }, { status: 201 })
  } catch (error) {
    console.error("Error creating page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}