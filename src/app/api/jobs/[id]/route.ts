import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const { id } = await params
  const jobId = parseInt(id, 10)

  if (isNaN(jobId)) {
    return NextResponse.json({ error: "Invalid Job ID" }, { status: 400 })
  }

  if (!session || (session.user as any).role === Role.STUDENT) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const body = await req.json()
    const { title, description, eligibilityCgpa, salaryLpa, location, deadline } = body

    // Verify ownership if recruiter
    if ((session.user as any).role === Role.RECRUITER) {
      const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: { company: true }
      })
      if (!job || !job.company || job.company.recruiterId !== Number((session.user as any).id)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
      }
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(eligibilityCgpa && { eligibilityCgpa: parseFloat(eligibilityCgpa) }),
        ...(salaryLpa && { salaryLpa: parseFloat(salaryLpa) }),
        ...(location && { location }),
        ...(deadline && { deadline: new Date(deadline) }),
      }
    })

    return NextResponse.json(updatedJob)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const { id } = await params
  const jobId = parseInt(id, 10)

  if (isNaN(jobId)) {
    return NextResponse.json({ error: "Invalid Job ID" }, { status: 400 })
  }

  if (!session || (session.user as any).role === Role.STUDENT) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    // Verify ownership if recruiter
    if ((session.user as any).role === Role.RECRUITER) {
      const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: { company: true }
      })
      if (!job || !job.company || job.company.recruiterId !== Number((session.user as any).id)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
      }
    }

    await prisma.job.delete({
      where: { id: jobId }
    })

    return NextResponse.json({ message: "Job deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 })
  }
}

