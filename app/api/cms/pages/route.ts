import { type NextRequest, NextResponse } from "next/server"
import type { Page, PageStatus } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    // Mock pages data
    const mockPages = [
      {
        id: "1",
        title: "About Yog Computers",
        slug: "about",
        content: "Your trusted technology partner since 2003...",
        excerpt: "Learn about Yog Computers history and services",
        metaTitle: "About Yog Computers - Your Technology Partner",
        metaDescription: "Discover Yog Computers' 20+ years of service in Pune",
        status: "PUBLISHED",
        isPublished: true,
        template: "default",
        sortOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        creator: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
        updater: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
        parent: null,
        children: []
      },
      {
        id: "2",
        title: "Contact Us",
        slug: "contact",
        content: "Get in touch with Yog Computers...",
        excerpt: "Contact Yog Computers for all your tech needs",
        metaTitle: "Contact Yog Computers - Pune Tech Support",
        metaDescription: "Contact Yog Computers in Pune for computer repair, CCTV, electrical services",
        status: "PUBLISHED",
        isPublished: true,
        template: "default",
        sortOrder: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        creator: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
        updater: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
        parent: null,
        children: []
      },
      {
        id: "3",
        title: "Services",
        slug: "services",
        content: "Our comprehensive technology services...",
        excerpt: "Computer repair, CCTV installation, electrical services",
        metaTitle: "Yog Computers Services - Computer Repair & CCTV Pune",
        metaDescription: "Professional computer repair, CCTV installation, and electrical services in Pune",
        status: "PUBLISHED",
        isPublished: true,
        template: "default",
        sortOrder: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        creator: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
        updater: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
        parent: null,
        children: []
      }
    ]

    return NextResponse.json({
      data: mockPages,
      pagination: {
        page: 1,
        limit: 20,
        total: 3,
        totalPages: 1
      }
    })
  } catch (error) {
    console.error("Error fetching pages:", error)
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, status = 'DRAFT' } = body

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 })
    }

    // Mock response
    const mockPage = {
      id: Date.now().toString(),
      title,
      slug,
      content: content || "",
      excerpt: "",
      metaTitle: title,
      metaDescription: "",
      status,
      isPublished: status === 'PUBLISHED',
      template: "default",
      sortOrder: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creator: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
      parent: null
    }

    return NextResponse.json({ data: mockPage }, { status: 201 })
  } catch (error) {
    console.error("Error creating page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}