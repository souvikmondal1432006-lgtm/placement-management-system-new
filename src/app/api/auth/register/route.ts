import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const { name, email, password, role, department, cgpa, companyName, location } = await req.json()

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: role as Role,
        }
      })

      if (role === Role.STUDENT) {
        await tx.student.create({
          data: {
            userId: newUser.id,
            department: department || "General",
            cgpa: parseFloat(cgpa) || 0,
          }
        })
      } else if (role === Role.RECRUITER) {
        await tx.company.create({
          data: {
            recruiterId: newUser.id,
            name: companyName || "New Company",
            location: location || "Remote",
          }
        })
      }

      return newUser
    })

    return NextResponse.json({ message: "User registered successfully", user: { id: user.id, email: user.email } }, { status: 201 })
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
