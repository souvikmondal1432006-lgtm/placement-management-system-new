"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role, ApplicationStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function updateApplicationStatus(applicationId: number, status: ApplicationStatus) {
  const session = await auth()
  if (!session || (session.user as any).role === Role.STUDENT) {
    throw new Error("Unauthorized")
  }

  const application = await prisma.application.update({
    where: { id: applicationId },
    data: { status },
    include: { student: { include: { user: true } }, job: true }
  })

  // Create notification for student
  if (application.student?.userId) {
    await prisma.notification.create({
      data: {
        userId: application.student.userId,
        title: `Application Update: ${application.job?.title}`,
        message: `Your application for ${application.job?.title} has been updated to ${status}.`,
      }
    })
  }

  // Audit log
  await prisma.auditLog.create({
    data: {
      actorId: Number((session.user as any).id),
      action: `Updated application ${applicationId} to ${status}`,
    }
  })

  revalidatePath("/recruiter/applicants")
  revalidatePath("/student/applications")
  
  return application
}

export async function createJobAction(formData: any) {
  const session = await auth()
  if (!session || (session.user as any).role === Role.STUDENT) {
    throw new Error("Unauthorized")
  }

  // Implementation logic for job creation...
  // (Assuming this would be called from a form)
}
