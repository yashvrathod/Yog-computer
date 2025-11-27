import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { CompanySize } from "@/lib/types";
import type { Client } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const where: any = {
      is_active: true,
    };

    if (featured === "true") {
      where.is_featured = true;
    }

    const clients = await prisma.client.findMany({
      where,
      orderBy: {
        company_name: "asc",
      },
    });

    return NextResponse.json(clients);
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

    const client = await prisma.client.create({
      data: {
        company_name: companyName,
        contact_name: contactName,
        email,
        phone,
        address,
        logo_url: logoUrl,
        industry,
        notes,
        is_featured: isFeatured ?? false,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}
