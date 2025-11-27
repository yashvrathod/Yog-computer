import { type NextRequest, NextResponse } from "next/server"
import type { Page, PageStatus } from "@/lib/types"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    
    // Mock page data
    const mockPages: { [key: string]: any } = {
      'about': {
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        creator: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
        updater: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
        parent: null,
        children: []
      },
      'contact': {
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        creator: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
        updater: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
        parent: null,
        children: []
      }
    }

    const page = mockPages[slug]
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
    const { slug } = params
    const body = await request.json()
    const { title, content, status } = body

    // Mock update response
    const mockPage = {
      id: Date.now().toString(),
      title: title || "Updated Page",
      slug,
      content: content || "Updated content...",
      status: status || "DRAFT",
      updatedAt: new Date().toISOString(),
      creator: { id: "1", name: "Admin", email: "admin@yogcomputers.com" },
      updater: { id: "1", name: "Admin", email: "admin@yogcomputers.com" }
    }

    return NextResponse.json({ 
      data: mockPage,
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
    // Mock delete response
    return NextResponse.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}