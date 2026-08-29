<div align="center">

# 🎓 PLACIFY
### *Next-Generation Campus Placement & Recruitment Management System*

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.20-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![NextAuth.js](https://img.shields.io/badge/Auth-NextAuth_v5-purple?style=for-the-badge&logo=auth0)](https://authjs.dev/)

<p align="center">
  <b>A unified, role-based platform modernizing university campus recruitments for Students, Recruiters, and Placement Administrators.</b>
</p>

</div>

---

## 📌 Overview

**Placify** is a comprehensive, enterprise-grade Placement Management System engineered to eliminate the manual friction in college campus drives. Built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**, Placify provides dedicated workflows and dashboards tailored specifically for **Students**, **Company Recruiters**, and **University Training & Placement Officers (TPO / Admins)**.

---

## 🚀 Key Features by Portal

### 🎓 1. Student Portal
- **Interactive Dashboard**: Real-time stats on active applications, interview schedules, shortlisted roles, and job offers.
- **Live Job Board**: Discover campus job listings with real-time eligibility checks (CGPA threshold validation).
- **One-Click Application**: Apply directly to eligible openings with attached profile and resume links.
- **Application Tracker**: Full visibility over application stages (`Applied` ➔ `Shortlisted` ➔ `Interview` ➔ `Selected` / `Rejected`).
- **Profile & Resume Management**: Update academic details, CGPA, department, technical skill sets, and portfolio/resume links.
- **Notifications & Schedule**: Stay alerted on scheduled interview rounds and status updates.

### 🏢 2. Recruiter Portal
- **Job Posting & Mandate Management**: Create, edit, and publish job opportunities with custom eligibility criteria (CGPA threshold, CTC package, location, deadlines).
- **Applicant Pipeline & Review**: View student profiles, departmental info, CGPA, skill sets, and resumes in a centralized list.
- **Status Control**: Advance candidate status through each round of the hiring funnel with instant feedback.
- **Company Profile**: Customize company information, logo, description, and compensation packages.

### 🏛️ 3. Admin & TPO Portal
- **Institutional Overview**: Executive dashboard displaying placement statistics, student participation rates, and partner companies.
- **Student & Recruiter Directories**: Comprehensive management of student profiles and verified corporate partners.
- **Placement Analytics & Reports**: Visualized department-wise placement metrics and salary insights powered by **Recharts**.
- **Audit Logs & Security**: Transparent audit logging tracking system and administrative activities.

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Frontend Framework** | [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/), [Radix UI Primitives](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Database & ORM** | [MySQL](https://www.mysql.com/) / [Aiven Cloud](https://aiven.io/) with [Prisma ORM](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js v5](https://authjs.dev/) with RBAC (Credentials + Google OAuth) |
| **Data Validation** | [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Data Visualization** | [Recharts](https://recharts.org/) |

---

## 🗄️ Database Architecture

Placify uses a relational schema designed in Prisma ORM with strict relationships and cascading integrity:

```mermaid
erDiagram
    USER ||--o| STUDENT : "has profile"
    USER ||--o| COMPANY : "manages (recruiter)"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ AUDIT_LOG : "triggers"
    COMPANY ||--o{ JOB : "posts"
    COMPANY ||--o{ OFFER : "issues"
    STUDENT ||--o{ APPLICATION : "submits"
    STUDENT ||--o{ OFFER : "receives"
    JOB ||--o{ APPLICATION : "receives"
    JOB ||--o{ OFFER : "generates"

    USER {
        int id PK
        string name
        string email UK
        string passwordHash
        enum role "STUDENT | ADMIN | RECRUITER"
        datetime createdAt
    }

    STUDENT {
        int id PK
        int userId FK
        string department
        decimal cgpa
        string phone
        string skills
        string resumeUrl
    }

    COMPANY {
        int id PK
        int recruiterId FK
        string name
        string location
        decimal packageOffered
        string logoUrl
    }

    JOB {
        int id PK
        int companyId FK
        string title
        text description
        float eligibilityCgpa
        decimal salaryLpa
        string location
        datetime deadline
    }

    APPLICATION {
        int id PK
        int studentId FK
        int jobId FK
        enum status "APPLIED | SHORTLISTED | INTERVIEW | SELECTED | REJECTED"
        datetime appliedAt
    }

    OFFER {
        int id PK
        int studentId FK
        int companyId FK
        int jobId FK
        decimal package
        enum offerStatus "PENDING | ACCEPTED | REJECTED"
        datetime offerDate
    }
```

---

## ⚙️ Getting Started

Follow these steps to set up and run the project locally on your machine:

### 1. Prerequisites
- **Node.js**: v18.18.0 or higher
- **npm** / **pnpm** / **yarn**
- **MySQL Database** (Local MySQL server or a cloud instance such as Aiven, PlanetScale, Railway, Supabase)

### 2. Clone the Repository
```bash
git clone https://github.com/souvikmondal1432006-lgtm/placement-management-system-new.git
cd placement-management-system-new
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory (you can copy `.env.example`):
```bash
cp .env.example .env
```

Update the values in `.env`:
```env
# Database connection string (MySQL)
DATABASE_URL="mysql://username:password@localhost:3306/placement_db"

# NextAuth configuration
NEXTAUTH_SECRET="generate-a-strong-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Public App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Google OAuth Credentials
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

### 5. Initialize the Database
Generate Prisma client and push the schema to your database:
```bash
# Push schema to MySQL database
npm run db:push
```

### 6. Seed Sample Data (Optional but Recommended)
Populate your database with mock users (Admin, Recruiters, Students), companies, and job postings:
```bash
npm run db:seed
```

### 7. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔑 Demo Login Credentials

If you populated the database using `npm run db:seed`, you can immediately test the platform using the following accounts:

| Role | Email | Password | Access / Portal |
|---|---|---|---|
| **Admin / TPO** | `admin@university.edu` | `password123` | `/admin/dashboard` |
| **Recruiter (Google)** | `recruiter@google.com` | `password123` | `/recruiter/dashboard` |
| **Recruiter (Microsoft)** | `recruiter@microsoft.com` | `password123` | `/recruiter/dashboard` |
| **Recruiter (Amazon)** | `recruiter@amazon.com` | `password123` | `/recruiter/dashboard` |
| **Student** | `student@university.edu` | `password123` | `/student/dashboard` |

---

## 📁 Project Structure

```plaintext
Placement-Management-System/
├── prisma/
│   ├── schema.prisma       # Prisma ORM schema & entity models
│   └── seed.ts             # Database seeding script with demo data
├── public/                 # Static assets, logos, and icons
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/      # Authentication & Login page
│   │   ├── admin/          # Admin / TPO dashboard & management views
│   │   │   ├── companies/  # Company directory & management
│   │   │   ├── dashboard/  # Admin statistics & overview
│   │   │   ├── jobs/       # Campus drives & job postings
│   │   │   ├── reports/    # Analytics & placement charts
│   │   │   └── students/   # Student verification & roster
│   │   ├── recruiter/      # Recruiter portal
│   │   │   ├── applicants/ # Candidate review & status controls
│   │   │   ├── dashboard/  # Recruiter drive statistics
│   │   │   ├── jobs/       # Create & manage job postings
│   │   │   └── profile/    # Recruiter company settings
│   │   ├── student/        # Student portal
│   │   │   ├── applications/ # Applied job tracking & status
│   │   │   ├── dashboard/  # Student overview & metrics
│   │   │   ├── jobs/       # Job directory & 1-click apply
│   │   │   ├── notifications/ # Alerts & interview schedules
│   │   │   └── settings/   # Profile & resume URL setup
│   │   ├── api/            # Next.js API Routes (REST endpoints)
│   │   ├── globals.css     # Global styles & design tokens
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Modern landing page
│   ├── components/         # Reusable UI components & Radix wrappers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Database client, auth configs, and utilities
│   ├── types/              # TypeScript interfaces and type definitions
│   └── middleware.ts       # Route protection & role-based middleware
├── .env.example            # Environment variables template
├── package.json            # Project dependencies & scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server at `http://localhost:3000`.
- `npm run build`: Generates the Prisma client, pushes database schema, and compiles the Next.js production build.
- `npm run start`: Runs the compiled production server.
- `npm run lint`: Runs ESLint checks across the codebase.
- `npm run db:push`: Synchronizes the Prisma schema with the target MySQL database.
- `npm run db:seed`: Seeds the database with default roles, companies, jobs, and applications.

---

## 🛡️ Security & Authentication

- **Role-Based Access Control (RBAC)**: Enforced via Next.js Edge Middleware protecting `/admin/*`, `/recruiter/*`, and `/student/*` routes.
- **Encrypted Credentials**: Passwords are secure-hashed using `bcryptjs` with salt rounds.
- **Input Sanitization & Schema Validation**: Robust API and client form validation powered by `zod`.
- **Environment Isolation**: Sensitive credentials and database connection strings are fully isolated via environment variables.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/souvikmondal1432006-lgtm/placement-management-system-new/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
