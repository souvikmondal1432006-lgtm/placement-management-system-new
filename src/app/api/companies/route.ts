import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function GET(req: Request) {
  const session = await auth()
  if (!session || (session.user as any).role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: { jobs: true }
        }
      },
      orderBy: { name: "asc" }
    })

    return NextResponse.json(companies)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
  }
}
