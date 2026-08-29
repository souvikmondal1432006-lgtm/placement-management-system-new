import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Role, ApplicationStatus, OfferStatus } from '@prisma/client';

export async function GET() {
  try {
    const passwordHash = await bcrypt.hash('password123', 10);

    // 1. Create Users
    const admin = await prisma.user.upsert({
      where: { email: 'admin@university.edu' },
      update: { passwordHash },
      create: {
        name: 'Admin User',
        email: 'admin@university.edu',
        passwordHash,
        role: Role.ADMIN,
      },
    });

    const recruiterUser = await prisma.user.upsert({
      where: { email: 'recruiter@google.com' },
      update: { passwordHash },
      create: {
        name: 'John Google',
        email: 'recruiter@google.com',
        passwordHash,
        role: Role.RECRUITER,
      },
    });

    const studentUser = await prisma.user.upsert({
      where: { email: 'student@university.edu' },
      update: { passwordHash },
      create: {
        name: 'Alex Student',
        email: 'student@university.edu',
        passwordHash,
        role: Role.STUDENT,
      },
    });

    // 2. Create Student Profile
    const student = await prisma.student.upsert({
      where: { userId: studentUser.id },
      update: {},
      create: {
        userId: studentUser.id,
        department: 'Computer Science & Engineering',
        cgpa: 8.9,
        phone: '9876543210',
        skills: 'React, Node.js, TypeScript, Next.js, MySQL, Python',
      },
    });

    // 3. Create Companies
    const google = await prisma.company.upsert({
      where: { recruiterId: recruiterUser.id },
      update: {},
      create: {
        name: 'Google',
        location: 'Mountain View, CA / Bangalore',
        description: 'Global leader in search, AI, cloud computing, and software.',
        packageOffered: 35.0,
        logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        recruiterId: recruiterUser.id,
      },
    });

    // 4. Create Sample Jobs
    const job1 = await prisma.job.findFirst({
      where: { title: 'Software Development Engineer I', companyId: google.id }
    });

    if (!job1) {
      await prisma.job.create({
        data: {
          title: 'Software Development Engineer I',
          description: 'Join our core infrastructure and systems engineering team. Requirements: B.Tech/BE in CS/IT, strong understanding of Data Structures and Algorithms.',
          salaryLpa: 32.0,
          location: 'Bangalore / Hybrid',
          eligibilityCgpa: 7.5,
          companyId: google.id,
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with demo accounts!',
      accounts: [
        { role: 'STUDENT', email: 'student@university.edu', password: 'password123' },
        { role: 'RECRUITER', email: 'recruiter@google.com', password: 'password123' },
        { role: 'ADMIN', email: 'admin@university.edu', password: 'password123' },
      ]
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
