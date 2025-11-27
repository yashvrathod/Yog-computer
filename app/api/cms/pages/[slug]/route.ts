import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import type { Page, PageStatus } from "@/lib/types"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const session = await getSession()
    
    const where: any = { slug }
    
    // Only show published pages for non-authenticated users
    if (!session) {
      where.isPublished = true
      where.status = 'PUBLISHED'
    }

    const page = await prisma.page.findUnique({
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
          select: { id: true, title: true, slug: true },
          where: { isPublished: true }
        }
      }
    })

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ data: page })
  } catch (error) {
    console.error("Error fetching page:", error)
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    const session = await getSession()
    if (!session || !['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { slug } = params
    const body = await request.json()
    const {
      title,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      status,
      isPublished,
      publishedAt,
      template,
      parentId,
      sortOrder,
      featuredImage,
      settings
    } = body

    // Check if page exists
    const existingPage = await prisma.page.findUnique({ where: { slug } })
    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    // Update page
    const page = await prisma.page.update({
      where: { slug },
      data: {
        title,
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
        updatedById: session.user.id
      },
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        },
        updater: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json({ 
      data: page,
      message: "Page updated successfully"
    })
  } catch (error) {
    console.error("Error updating page:", error)
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    const session = await getSession()
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { slug } = params

    // Check if page exists
    const existingPage = await prisma.page.findUnique({ where: { slug } })
    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    // Delete page
    await prisma.page.delete({ where: { slug } })

    return NextResponse.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}