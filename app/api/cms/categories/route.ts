import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import type { Category } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const parentId = searchParams.get("parentId")
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "50")

    const where: any = {
      isActive: true
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (parentId === "null") {
      where.parentId = null
    } else if (parentId) {
      where.parentId = parentId
    }

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        include: {
          parent: {
            select: { id: true, name: true, slug: true }
          },
          children: {
            select: { id: true, name: true, slug: true },
            where: { isActive: true }
          },
          _count: {
            select: {
              products: true,
              services: true,
              posts: true
            }
          }
        },
        orderBy: [
          { sortOrder: 'asc' },
          { name: 'asc' }
        ],
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.category.count({ where })
    ])

    return NextResponse.json({
      data: categories,
      pagination: {
        page,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession()
    if (!session || !['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      slug,
      description,
      image,
      parentId,
      sortOrder = 0
    } = body

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({ where: { slug } })
    if (existingCategory) {
      return NextResponse.json({ error: "Category with this slug already exists" }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        parentId,
        sortOrder
      },
      include: {
        parent: {
          select: { id: true, name: true, slug: true }
        },
        children: {
          select: { id: true, name: true, slug: true }
        }
      }
    })

    return NextResponse.json({ data: category }, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}