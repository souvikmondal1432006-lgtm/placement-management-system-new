"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

export default function StudentDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, appsRes, profileRes, jobsRes] = await Promise.all([
          fetch("/api/analytics"),
          fetch("/api/applications"),
          fetch("/api/students/profile"),
          fetch("/api/jobs")
        ]);
        
        if (statsRes.ok) setStats(await statsRes.json());
        if (appsRes.ok) setApplications(await appsRes.json());
        if (profileRes.ok) setProfile(await profileRes.json());
        if (jobsRes.ok) setJobs(await jobsRes.json());
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchData();
    }
  }, [session]);

  const handleApply = async (jobId: number) => {
    setApplying(prev => ({ ...prev, [jobId]: true }));
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId })
      });
      
      if (res.ok) {
        const newApp = await res.json();
        setApplications(prev => [newApp, ...prev]);
        setStats((prev: any) => ({ ...prev, applicationCount: (prev?.applicationCount || 0) + 1 }));
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to apply");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setApplying(prev => ({ ...prev, [jobId]: false }));
    }
  };

  const profileIntegrity = useMemo(() => {
    if (!profile) return 0;
    const coreFields = [
      profile.user?.name, 
      profile.phone, 
      profile.department, 
      profile.cgpa?.toString(), 
      profile.skills
    ];
    const filledCoreFields = coreFields.filter(field => field && field.trim().length > 0).length;
    return Math.round((filledCoreFields / 5) * 100);
  }, [profile]);

  const userName = profile?.user?.name?.split(" ")[0] || session?.user?.name?.split(" ")[0] || "Student";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin"></div>
      </div>
    );
  }

  const jobImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAO0Nkmxi3LEEu0XmIIUHCWIV63OAHYsbjQom3SQWQTkEHJp9Q9rKv1ZjvoodilD7SACyI2QqCBuozz_TWrSiQFM1iy4z1lCt4mpDSoV8pthFi4cmc8WSt7hEog_9jRZFZ14M16kEP0riIBTJDcErTy7BMKljUePqZBMnE2Tnt_45ALKazat9mbdb59vRkaZ0X3LnGjR6EgapDY0fBgY_jjWE5VMDqH1p5LBoWItoebAAqsRLT-2V8uUMiovYpWr_siY3OpY8dDYgcd",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD51nBZPI-3J58dK2c7tJFCdWYRcyvo43D-NfD_OR8JD47XYR2K_PdrC23J3FO1XOmB3PGnq9F6DDGY5FQHFNuWk5_6IBfGIKLzJGE4MHyufXKjL_csig6iyXfiu5okNeQFkx1RKCkf3P-59Crspz-VHg87QJgu_D4ReAv0vYorDnq8YMbzzvF3YYXR0LQWn8RSnoTFAeRGIUsWkM6va-YpuU2wuUwp4IK7iS4qxSIX3e3Wd1HBVnzugFMfMEJQuUMM2k_Lq_NOEIMW",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCBjAPotYIA-BdX4LImpUqJ3elNjFVK2jmd6LojTHYfCD0KydsXzUYx_9Cn1P6c3hKhdcrOK0n7D0tiEs15YrzuA0f_9MBTMldsappm-AWxEJg-UnTR0s8CzaU1pLNv5s3hqYesPT8TVnff_R8mdcAsS5H4QJnvlnIvPiQ0OdFKwwyb2TOjDlNrti87jUTq_Inco1tKSNDYiTzvZbzqj2HoEh2ISmOMUDpy_TAzkbAsERY34_5bYZnKgWHyUF9fyvUToGBQ_Tl_iZD_"
  ];

  return (
    <>
      {/* Welcome Section */}
      <section className="mb-20">
        <h1 className="font-sans text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">Welcome back, {userName}.</h1>
        <p className="font-headline text-lg text-[#979085] max-w-2xl font-light">
          Your professional trajectory is currently tracking 14% higher than the seasonal average. Three mandates require your immediate attention.
        </p>
      </section>

      {/* Stats Grid (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
        <div className="col-span-1 md:col-span-4 glass-card p-10 flex flex-col justify-between h-64 rounded-xl">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Applications Submitted</span>
            <span className="material-symbols-outlined text-champagne">send</span>
          </div>
          <div className="flex items-baseline gap-4 mt-auto mb-6">
            <span className="text-6xl font-sans font-light text-champagne">{stats?.applicationCount || 0}</span>
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Total</span>
          </div>
          <div className="w-full h-[1px] bg-white/5 relative">
            <div className="absolute left-0 top-0 h-full w-2/3 bg-champagne"></div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 glass-card p-10 flex flex-col justify-between h-64 rounded-xl">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Interviews Scheduled</span>
            <span className="material-symbols-outlined text-champagne">calendar_today</span>
          </div>
          <div className="mt-auto">
            <span className="text-6xl font-sans font-light text-champagne">{stats?.interviewCount || 0}</span>
          </div>
          <div className="flex gap-2 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i < (stats?.interviewCount || 0) ? 'bg-champagne' : 'bg-white/10'}`}></div>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 glass-card p-10 flex flex-col justify-between h-64 rounded-xl">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Profile Completion %</span>
            <span className="material-symbols-outlined text-champagne">verified</span>
          </div>
          <div className="relative flex items-center justify-center mt-auto mb-6">
            <span className="text-6xl font-sans font-light text-champagne">{profileIntegrity}%</span>
          </div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold text-center">Next milestone: Portfolio Review</div>
        </div>
      </section>

      {/* Recommended Roles Section */}
      <section>
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-4">
          <div>
            <h3 className="font-sans text-3xl font-bold text-white mb-2">Recommended Roles</h3>
            <p className="text-zinc-500 text-sm tracking-wide font-headline">Curated mandates matching your UX & Product profile.</p>
          </div>
          <Link href="/student/jobs" className="text-[10px] uppercase tracking-[0.2em] text-champagne border-b border-champagne/30 pb-1 hover:border-champagne transition-all font-bold self-start md:self-auto">View all board</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.length === 0 ? (
            <div className="col-span-3 py-10 text-center text-zinc-500 font-headline">No recommended roles at this time.</div>
          ) : (
            jobs.slice(0, 3).map((job, idx) => {
              const hasApplied = applications.some(app => app.jobId === job.id);
              return (
                <div key={job.id} className={`glass-card group hover:bg-white/[0.04] transition-all duration-700 flex flex-col h-[480px] rounded-xl overflow-hidden border border-white/5 ${idx === 2 ? 'hidden lg:flex' : ''}`}>
                  <div className="h-48 overflow-hidden relative shrink-0">
                    <img alt="Corporate architecture" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" src={jobImages[idx % jobImages.length]}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] to-transparent"></div>
                    <div className="absolute bottom-6 left-8">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne bg-white/5 backdrop-blur-md px-3 py-1 border border-white/10">Full-Time</span>
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">{job.company?.name || "Company"}</p>
                      <h4 className="text-2xl font-sans font-bold text-white mb-4 group-hover:text-champagne transition-colors">{job.title}</h4>
                      <p className="text-sm text-zinc-400 line-clamp-3 font-headline leading-relaxed">{job.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Salary</span>
                        <span className="text-white text-sm font-bold">{job.salaryLpa} LPA</span>
                      </div>
                      <button 
                        onClick={() => !hasApplied && handleApply(job.id)}
                        disabled={hasApplied || applying[job.id]}
                        className={`px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all rounded ${
                          hasApplied 
                            ? "bg-white/10 text-white cursor-not-allowed" 
                            : "bg-champagne text-[#0A0A0C] hover:bg-white active:scale-95"
                        }`}
                      >
                        {applying[job.id] ? "..." : hasApplied ? "Applied" : "Apply Now"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Floating Action for Quick Search */}
      <Link href="/student/jobs" className="fixed bottom-12 right-12 w-16 h-16 bg-champagne text-[#0A0A0C] flex items-center justify-center rounded-full shadow-[0_0_30px_rgba(247,231,206,0.3)] hover:scale-110 transition-transform active:scale-90 z-50">
        <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
      </Link>
    </>
  );
}
