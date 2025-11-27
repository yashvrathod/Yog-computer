import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock categories for demo
    const mockCategories = [
      {
        id: "1",
        name: "Computer Products",
        slug: "computer-products",
        description: "Laptops, desktops, and accessories",
        isActive: true,
        sortOrder: 1,
        parent: null,
        children: [],
        _count: { products: 5, services: 0, posts: 0 }
      },
      {
        id: "2", 
        name: "Security Systems",
        slug: "security-systems", 
        description: "CCTV and surveillance equipment",
        isActive: true,
        sortOrder: 2,
        parent: null,
        children: [],
        _count: { products: 3, services: 2, posts: 0 }
      }
    ]

    return NextResponse.json({
      data: mockCategories,
      pagination: {
        page: 1,
        limit: 50,
        total: 2,
        totalPages: 1
      }
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description } = body

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    // Mock response
    const mockCategory = {
      id: Date.now().toString(),
      name,
      slug,
      description: description || "",
      isActive: true,
      sortOrder: 0,
      parent: null,
      children: []
    }

    return NextResponse.json({ data: mockCategory }, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}