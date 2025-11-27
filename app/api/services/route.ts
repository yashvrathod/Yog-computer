import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock services data for demo
    const mockServices = [
      {
        id: "1",
        name: "Computer Repair",
        slug: "computer-repair",
        description: "Professional computer repair and maintenance services",
        short_description: "Fast and reliable computer repair",
        price_range: "₹500 - ₹2000",
        is_featured: true,
        is_active: true,
        status: "PUBLISHED",
        category: { id: "1", name: "Computer Services", slug: "computer-services" },
        created_at: new Date().toISOString()
      },
      {
        id: "2",
        name: "CCTV Installation",
        slug: "cctv-installation",
        description: "Complete CCTV camera installation and monitoring setup",
        short_description: "Professional security camera installation",
        price_range: "₹15000 - ₹50000",
        is_featured: true,
        is_active: true,
        status: "PUBLISHED",
        category: { id: "2", name: "Security Services", slug: "security-services" },
        created_at: new Date().toISOString()
      },
      {
        id: "3",
        name: "Electrical Services",
        slug: "electrical-services", 
        description: "Electrical wiring, installation and maintenance services",
        short_description: "Complete electrical solutions",
        price_range: "₹1000 - ₹10000",
        is_featured: true,
        is_active: true,
        status: "PUBLISHED",
        category: { id: "3", name: "Electrical Services", slug: "electrical-services" },
        created_at: new Date().toISOString()
      }
    ];

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "20")

    let filteredServices = mockServices;

    if (featured === "true") {
      filteredServices = filteredServices.filter(service => service.is_featured);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredServices = filteredServices.filter(service => 
        service.name.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower)
      );
    }

    const total = filteredServices.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedServices = filteredServices.slice(startIndex, startIndex + pageSize);

    return NextResponse.json({
      data: paginatedServices,
      pagination: {
        page,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, shortDescription, icon, category, features, priceRange, isFeatured } = body

    // Mock response
    const mockService = {
      id: Date.now().toString(),
      name,
      slug,
      description,
      short_description: shortDescription,
      icon,
      category_id: category,
      features,
      price_range: priceRange,
      is_featured: isFeatured ?? false,
      is_active: true,
      status: "PUBLISHED",
      created_at: new Date().toISOString()
    }

    return NextResponse.json(mockService, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
