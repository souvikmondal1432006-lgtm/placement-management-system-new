import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function GET(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = session.user as any
  const userId = Number(user.id)

  try {
    const { searchParams } = new URL(req.url)
    const companyIdParam = searchParams.get("companyId")
    
    let where: any = {}

    if (user.role === Role.RECRUITER) {
      const company = await prisma.company.findUnique({ where: { recruiterId: userId } })
      if (company) where.companyId = company.id
    } else if (companyIdParam) {
      where.companyId = parseInt(companyIdParam)
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        company: true,
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    const domainMap: Record<string, string> = {
      "tcs": "tcs.com",
      "infosys": "infosys.com",
      "wipro": "wipro.com",
      "google": "google.com",
      "microsoft": "microsoft.com",
      "amazon": "amazon.com",
      "hcl": "hcltech.com",
      "accenture": "accenture.com"
    }

    const enrichedJobs = jobs.map(job => {
      if (job.company && !job.company.logoUrl && job.company.name) {
        const name = job.company.name.toLowerCase()
        const domain = Object.keys(domainMap).find(k => name.includes(k))
        if (domain) {
          (job.company as any).logoUrl = `https://logo.clearbit.com/${domainMap[domain]}`
        }
      }
      return job
    })

    return NextResponse.json(enrichedJobs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  
  if (!session || (session.user as any).role === Role.STUDENT) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const body = await req.json()
    const { title, description, eligibilityCgpa, salaryLpa, location, deadline, companyId } = body

    // If recruiter, ensure they are posting for their own company
    let targetCompanyId = companyId
    if ((session.user as any).role === Role.RECRUITER) {
      const company = await prisma.company.findUnique({
        where: { recruiterId: Number((session.user as any).id) }
      })
      if (!company) return NextResponse.json({ error: "Company profile not found" }, { status: 400 })
      targetCompanyId = company.id
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        eligibilityCgpa: parseFloat(eligibilityCgpa),
        salaryLpa: parseFloat(salaryLpa),
        location,
        deadline: new Date(deadline),
        companyId: targetCompanyId,
      }
    })

    // Log action
    await prisma.auditLog.create({
      data: {
        actorId: Number((session.user as any).id),
        action: `Created job posting: ${title}`,
      }
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error("Job creation error:", error)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
