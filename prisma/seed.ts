import { PrismaClient, Role, ApplicationStatus, OfferStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  // --- Create Users ---
  console.log('Creating users...');
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@university.edu' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@university.edu',
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const recruiterUser = await prisma.user.upsert({
    where: { email: 'recruiter@google.com' },
    update: {},
    create: {
      name: 'John Google',
      email: 'recruiter@google.com',
      passwordHash,
      role: Role.RECRUITER,
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: 'student@university.edu' },
    update: {},
    create: {
      name: 'Alex Student',
      email: 'student@university.edu',
      passwordHash,
      role: Role.STUDENT,
    },
  });

  // --- Create Student Profile ---
  console.log('Creating student profile...');
  const student = await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      department: 'CSE',
      cgpa: 8.5,
      phone: '1234567890',
      skills: 'React, Node.js, TypeScript, MySQL',
    },
  });

  // --- Create Companies ---
  console.log('Creating companies...');
  const google = await prisma.company.upsert({
    where: { recruiterId: recruiterUser.id },
    update: {},
    create: {
      name: 'Google',
      location: 'Mountain View, CA',
      description: 'Google is a global leader in technology, focusing on search, advertising, cloud computing, and hardware.',
      packageOffered: 35.0,
      logoUrl: '/logos/google.png',
      recruiterId: recruiterUser.id,
    },
  });

  const microsoft = await prisma.company.create({
    data: {
      name: 'Microsoft',
      location: 'Redmond, WA',
      description: 'Microsoft develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.',
      packageOffered: 32.0,
      logoUrl: '/logos/microsoft.png',
      recruiter: {
        create: {
          name: 'Sarah Microsoft',
          email: 'recruiter@microsoft.com',
          passwordHash,
          role: Role.RECRUITER,
        }
      }
    },
  });

  const amazon = await prisma.company.create({
    data: {
      name: 'Amazon',
      location: 'Seattle, WA',
      description: 'Amazon is a multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
      packageOffered: 38.0,
      logoUrl: '/logos/amazon.png',
      recruiter: {
        create: {
          name: 'Dave Amazon',
          email: 'recruiter@amazon.com',
          passwordHash,
          role: Role.RECRUITER,
        }
      }
    },
  });

  // --- Create Jobs ---
  console.log('Creating jobs...');
  const job1 = await prisma.job.create({
    data: {
      companyId: google.id,
      title: 'Software Engineer (L3)',
      description: 'Join Google as a Software Engineer and work on world-class products. Requirements: Strong DSA and system design skills.',
      eligibilityCgpa: 8.0,
      salaryLpa: 35.0,
      location: 'Mountain View, CA',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  const job2 = await prisma.job.create({
    data: {
      companyId: microsoft.id,
      title: 'Cloud Architect Intern',
      description: 'Help build the future of Azure. Looking for students passionate about cloud computing and distributed systems.',
      eligibilityCgpa: 7.5,
      salaryLpa: 15.0,
      location: 'Seattle, WA',
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    },
  });

  // --- Create Applications ---
  console.log('Creating applications...');
  await prisma.application.create({
    data: {
      studentId: student.id,
      jobId: job1.id,
      status: ApplicationStatus.INTERVIEW,
    },
  });

  await prisma.application.create({
    data: {
      studentId: student.id,
      jobId: job2.id,
      status: ApplicationStatus.APPLIED,
    },
  });

  // --- Create Notifications ---
  console.log('Creating notifications...');
  await prisma.notification.create({
    data: {
      userId: studentUser.id,
      title: 'Interview Scheduled',
      message: 'Your interview for Software Engineer at Google is scheduled for next Tuesday at 2:00 PM.',
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
