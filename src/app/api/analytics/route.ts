import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role, ApplicationStatus } from "@prisma/client"

export async function GET(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = session.user as any
  const userId = Number(user.id)

  try {
    if (user.role === Role.ADMIN) {
      const [totalStudents, totalJobs, totalCompanies, totalApplications, selectedCount] = await Promise.all([
        prisma.student.count(),
        prisma.job.count(),
        prisma.company.count(),
        prisma.application.count(),
        prisma.application.count({ where: { status: ApplicationStatus.SELECTED } })
      ])

      const highestPackageJob = await prisma.job.findFirst({
        orderBy: { salaryLpa: "desc" },
        select: { salaryLpa: true }
      })

      return NextResponse.json({
        totalStudents,
        totalJobs,
        totalCompanies,
        totalApplications,
        placementRate: totalStudents > 0 ? (selectedCount / totalStudents) * 100 : 0,
        highestPackage: highestPackageJob?.salaryLpa ? Number(highestPackageJob.salaryLpa) : 0,
      })
    }

    if (user.role === Role.RECRUITER) {
      const company = await prisma.company.findUnique({ where: { recruiterId: userId } })
      if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 })

      const [jobCount, applicationCount, selectedCount] = await Promise.all([
        prisma.job.count({ where: { companyId: company.id } }),
        prisma.application.count({ where: { job: { companyId: company.id } } }),
        prisma.application.count({ where: { job: { companyId: company.id }, status: ApplicationStatus.SELECTED } })
      ])

      return NextResponse.json({
        jobCount,
        applicationCount,
        selectedCount,
      })
    }

    if (user.role === Role.STUDENT) {
      const student = await prisma.student.findUnique({ where: { userId: userId } })
      if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 })

      const [applicationCount, shortlistedCount, interviewCount, offerCount] = await Promise.all([
        prisma.application.count({ where: { studentId: student.id } }),
        prisma.application.count({ where: { studentId: student.id, status: ApplicationStatus.SHORTLISTED } }),
        prisma.application.count({ where: { studentId: student.id, status: ApplicationStatus.INTERVIEW } }),
        prisma.offer.count({ where: { studentId: student.id } })
      ])

      return NextResponse.json({
        applicationCount,
        shortlistedCount,
        interviewCount,
        offerCount,
      })
    }

    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
