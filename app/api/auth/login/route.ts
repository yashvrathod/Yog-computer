import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Mock authentication for demo purposes
    if (email === "admin@yogcomputers.com" && password === "admin123") {
      return NextResponse.json({
        user: {
          id: "1",
          email: "admin@yogcomputers.com",
          name: "Admin User",
          role: "ADMIN",
        },
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
