import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function GET(req: Request) {
  const session = await auth()
  if (!session || (session.user as any).role !== Role.STUDENT) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const userId = Number((session.user as any).id);

  try {
    const student = await prisma.student.findUnique({
      where: { userId }
    })
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true }
    })

    return NextResponse.json({ ...student, user })
  } catch (error) {
    console.error("Profile GET error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session || (session.user as any).role !== Role.STUDENT) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const userId = Number((session.user as any).id);

  try {
    const body = await req.json()
    const { name, phone, department, cgpa, skills } = body

    if (name) {
      await prisma.user.update({
        where: { id: userId },
        data: { name }
      })
    }

    const student = await prisma.student.upsert({
      where: { userId },
      update: {
        phone,
        department,
        cgpa: cgpa ? parseFloat(cgpa) : null,
        skills
      },
      create: {
        userId,
        phone,
        department,
        cgpa: cgpa ? parseFloat(cgpa) : null,
        skills
      }
    })

    return NextResponse.json({ success: true, student })
  } catch (error) {
    console.error("Profile PUT error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
