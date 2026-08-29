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
    const students = await prisma.student.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      orderBy: { user: { name: "asc" } }
    })

    return NextResponse.json(students)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}
