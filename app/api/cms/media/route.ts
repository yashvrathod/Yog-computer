import { type NextRequest, NextResponse } from "next/server"
import type { Media } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    // Mock media data for demo
    const mockMedia = [
      {
        id: "1",
        filename: "logo.jpg",
        originalName: "yog-computers-logo.jpg",
        mimeType: "image/jpeg",
        size: 15680,
        url: "/logo.jpeg",
        alt: "Yog Computers Logo",
        caption: "Company logo",
        folder: "logos",
        width: 200,
        height: 200,
        createdAt: new Date().toISOString(),
        creator: { id: "1", name: "Admin", email: "admin@yogcomputers.com" }
      },
      {
        id: "2",
        filename: "hero-bg.jpg",
        originalName: "hero-background.jpg", 
        mimeType: "image/jpeg",
        size: 245760,
        url: "/abstract-holographic-crystal-texture-with-iridesce.jpg",
        alt: "Hero background",
        caption: "Website hero background",
        folder: "backgrounds",
        width: 1920,
        height: 1080,
        createdAt: new Date().toISOString(),
        creator: { id: "1", name: "Admin", email: "admin@yogcomputers.com" }
      }
    ]

    return NextResponse.json({
      data: mockMedia,
      pagination: {
        page: 1,
        limit: 20,
        total: 2,
        totalPages: 1
      }
    })
  } catch (error) {
    console.error("Error fetching media:", error)
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { filename, url, mimeType, alt } = body

    if (!filename || !url || !mimeType) {
      return NextResponse.json({ error: "Filename, URL, and MIME type are required" }, { status: 400 })
    }

    // Mock response
    const mockMedia = {
      id: Date.now().toString(),
      filename,
      originalName: filename,
      mimeType,
      size: 12000,
      url,
      alt: alt || "",
      caption: "",
      folder: "uploads",
      width: null,
      height: null,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({ data: mockMedia }, { status: 201 })
  } catch (error) {
    console.error("Error creating media:", error)
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 })
  }
}