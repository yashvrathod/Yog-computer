import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Mock clients data for demo
    const mockClients = [
      {
        id: "1",
        company_name: "Tech Solutions Pvt Ltd",
        contact_name: "Rajesh Kumar",
        email: "rajesh@techsolutions.com",
        phone: "+91-9876543210",
        address: "Pune, Maharashtra",
        industry: "Technology",
        is_featured: true,
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: "2",
        company_name: "Digital Innovations",
        contact_name: "Priya Sharma",
        email: "priya@digitalinnovations.com", 
        phone: "+91-9876543211",
        address: "Mumbai, Maharashtra",
        industry: "Software",
        is_featured: false,
        is_active: true,
        created_at: new Date().toISOString()
      }
    ];

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    let filteredClients = mockClients;
    if (featured === "true") {
      filteredClients = mockClients.filter(client => client.is_featured);
    }

    return NextResponse.json(filteredClients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      address,
      logoUrl,
      industry,
      notes,
      isFeatured,
    } = body;

    // Mock response
    const mockClient = {
      id: Date.now().toString(),
      company_name: companyName,
      contact_name: contactName,
      email,
      phone,
      address,
      logo_url: logoUrl,
      industry,
      notes,
      is_featured: isFeatured ?? false,
      is_active: true,
      created_at: new Date().toISOString()
    };

    return NextResponse.json(mockClient, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}
