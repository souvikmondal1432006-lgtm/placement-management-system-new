import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role, ApplicationStatus } from "@prisma/client"

export async function GET(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = session.user as any
  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get("jobId") ? parseInt(searchParams.get("jobId")!) : null

  try {
    let where: any = {}

    if (user.role === Role.STUDENT) {
      const student = await prisma.student.findUnique({ where: { userId: Number(user.id) } })
      if (!student) return NextResponse.json({ error: "Student profile not found" }, { status: 404 })
      where.studentId = student.id
    } else if (user.role === Role.RECRUITER) {
      const company = await prisma.company.findUnique({ where: { recruiterId: Number(user.id) } })
      if (!company) return NextResponse.json({ error: "Company profile not found" }, { status: 404 })
      where.job = { companyId: company.id }
      if (jobId) where.jobId = jobId
    } else if (user.role === Role.ADMIN) {
      if (jobId) where.jobId = jobId
    }

    const applications = await prisma.application.findMany({
      where,
      include: {
        student: {
          include: { user: { select: { name: true, email: true } } }
        },
        job: {
          include: { company: true }
        }
      },
      orderBy: { appliedAt: "desc" }
    })

    return NextResponse.json(applications)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session || (session.user as any).role !== Role.STUDENT) {
    return NextResponse.json({ error: "Only students can apply" }, { status: 403 })
  }

  try {
    const { jobId } = await req.json()
    const student = await prisma.student.findUnique({ where: { userId: Number((session.user as any).id) } })
    
    if (!student) return NextResponse.json({ error: "Student profile not found" }, { status: 404 })

    // Check if already applied
    const existing = await prisma.application.findUnique({
      where: { studentId_jobId: { studentId: student.id, jobId } }
    })

    if (existing) return NextResponse.json({ error: "Already applied" }, { status: 400 })

    const application = await prisma.application.create({
      data: {
        studentId: student.id,
        jobId: Number(jobId),
        status: ApplicationStatus.APPLIED
      }
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
