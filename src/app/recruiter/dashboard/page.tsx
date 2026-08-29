"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function RecruiterDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userName = session?.user?.name?.split(" ")[0] || "Director";

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, appsRes, jobsRes] = await Promise.all([
          fetch("/api/analytics"),
          fetch("/api/applications"),
          fetch("/api/jobs")
        ]);
        if (statsRes.ok) setStats(await statsRes.json());
        if (appsRes.ok) setApplicants(await appsRes.json());
        if (jobsRes.ok) setJobs(await jobsRes.json());
      } catch (error) {
        console.error("Failed to fetch recruiter dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    if (session) fetchData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin"></div>
      </div>
    );
  }

  const placementRate = stats?.applicationCount > 0 
    ? Math.round(((stats?.selectedCount || 0) / stats.applicationCount) * 100) 
    : 0;

  return (
    <div className="px-16 pb-16 max-w-7xl mx-auto">
      {/* Greeting Header */}
      <div className="mb-[80px]">
        <h1 className="font-sans text-[48px] leading-[1.1] tracking-[-0.04em] font-extrabold text-white mb-4">Welcome back, {userName}.</h1>
        <p className="font-sans text-[18px] leading-[1.6] tracking-[-0.01em] text-zinc-500 max-w-2xl">
          The mandates for Q4 have been prioritized. Talent acquisition channels are seeing a 14% increase in high-intent candidates this week.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-[80px]">
        <div className="glass p-8 flex flex-col justify-between h-56 transition-all duration-500 hover:bg-white/[0.04] border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <div>
            <span className="text-[12px] tracking-[0.2em] font-semibold text-zinc-500 uppercase font-sans">Open Mandates</span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[32px] leading-[1.2] tracking-[-0.03em] font-bold text-[#F7E7CE]">{stats?.jobCount || 0}</span>
              <span className="text-[10px] text-zinc-500">Active</span>
            </div>
          </div>
          <div className="w-full h-1 bg-white/5 overflow-hidden">
            <div className="w-2/3 h-full bg-[#F7E7CE]"></div>
          </div>
        </div>

        <div className="glass p-8 flex flex-col justify-between h-56 transition-all duration-500 hover:bg-white/[0.04] border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <div>
            <span className="text-[12px] tracking-[0.2em] font-semibold text-zinc-500 uppercase font-sans">Active Applicants</span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[32px] leading-[1.2] tracking-[-0.03em] font-bold text-[#F7E7CE]">{stats?.applicationCount || 0}</span>
              <span className="text-[10px] text-zinc-500">Global Pool</span>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="w-1/4 h-8 bg-white/10"></div>
            <div className="w-1/4 h-12 bg-white/10"></div>
            <div className="w-1/4 h-16 bg-[#F7E7CE]"></div>
            <div className="w-1/4 h-10 bg-white/10"></div>
          </div>
        </div>

        <div className="glass p-8 flex flex-col justify-between h-56 transition-all duration-500 hover:bg-white/[0.04] border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <div>
            <span className="text-[12px] tracking-[0.2em] font-semibold text-zinc-500 uppercase font-sans">Placement Rate</span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[32px] leading-[1.2] tracking-[-0.03em] font-bold text-[#F7E7CE]">{placementRate}%</span>
              <span className="text-[10px] text-zinc-500">Selected</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F7E7CE] text-sm">trending_up</span>
            <span className="text-[11px] text-zinc-400 font-medium">1.2% variance from last month</span>
          </div>
        </div>

        <div className="glass p-8 flex flex-col justify-between h-56 transition-all duration-500 hover:bg-white/[0.04] border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <div>
            <span className="text-[12px] tracking-[0.2em] font-semibold text-zinc-500 uppercase font-sans">Time to Hire</span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[32px] leading-[1.2] tracking-[-0.03em] font-bold text-[#F7E7CE]">18d</span>
              <span className="text-[10px] text-zinc-500">Avg. Cycle</span>
            </div>
          </div>
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full border border-[#0A0A0C] bg-zinc-800"></div>
            <div className="w-6 h-6 rounded-full border border-[#0A0A0C] bg-zinc-700"></div>
            <div className="w-6 h-6 rounded-full border border-[#0A0A0C] bg-zinc-600"></div>
            <div className="w-6 h-6 rounded-full border border-[#0A0A0C] bg-zinc-500 flex items-center justify-center text-[8px]">+12</div>
          </div>
        </div>
      </div>

      {/* Talent Inflow Table */}
      <div className="mb-[80px]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-sans text-[24px] leading-[1.2] font-bold text-white">Talent Inflow</h3>
          <Link href="/recruiter/applicants" className="text-[10px] tracking-[0.2em] font-bold text-[#F7E7CE] uppercase border-b border-[#F7E7CE]/30 pb-1 hover:border-[#F7E7CE] transition-all">Export Intelligence</Link>
        </div>
        <div className="glass overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] tracking-[0.2em] font-semibold text-zinc-500 uppercase">Candidate</th>
                <th className="px-8 py-6 text-[10px] tracking-[0.2em] font-semibold text-zinc-500 uppercase">University / Major</th>
                <th className="px-8 py-6 text-[10px] tracking-[0.2em] font-semibold text-zinc-500 uppercase">Applied Mandate</th>
                <th className="px-8 py-6 text-[10px] tracking-[0.2em] font-semibold text-zinc-500 uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applicants.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-zinc-500">No applicants detected in the current talent stream.</td>
                </tr>
              ) : (
                applicants.slice(0, 3).map((app) => (
                  <tr key={app.id} className="group hover:bg-white/[0.05] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#211f1e] rounded-sm flex items-center justify-center border border-white/5 overflow-hidden text-lg font-bold text-[#F7E7CE]">
                          {app.student?.user?.name?.charAt(0) || "U"}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-white">{app.student?.user?.name || "Unknown"}</span>
                          <span className="text-[11px] text-zinc-500">{formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm text-zinc-300">{app.student?.department || "General"}</span>
                        <span className="text-[11px] text-zinc-500 font-medium">CGPA: {app.student?.cgpa ? Number(app.student.cgpa).toFixed(2) : "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-zinc-400">{app.job?.title}</td>
                    <td className="px-8 py-6 text-right">
                      <span className={`px-3 py-1 border text-[10px] tracking-[0.1em] uppercase font-bold ${
                        app.status === 'APPLIED' ? 'bg-white/5 border-white/10 text-zinc-400' :
                        app.status === 'INTERVIEW' ? 'bg-champagne/10 border-[#F7E7CE]/20 text-[#F7E7CE]' :
                        'bg-green-500/10 border-green-500/20 text-green-400'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intelligence Section / Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 glass p-10 h-96 flex flex-col justify-between border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <div>
            <h4 className="text-[24px] font-bold text-white mb-2 font-sans">Market Volatility Impact</h4>
            <p className="text-[13px] text-zinc-500 font-sans">AI-driven projection for hiring trends in your sector over the next fiscal quarter.</p>
          </div>
          <div className="relative w-full h-48 mt-8 border-l border-b border-white/10 flex items-end px-4 gap-4">
            <div className="flex-1 bg-white/5 h-[40%] hover:bg-[#F7E7CE]/20 transition-all duration-700"></div>
            <div className="flex-1 bg-white/5 h-[65%] hover:bg-[#F7E7CE]/20 transition-all duration-700"></div>
            <div className="flex-1 bg-white/5 h-[50%] hover:bg-[#F7E7CE]/20 transition-all duration-700"></div>
            <div className="flex-1 bg-white/10 h-[85%] hover:bg-[#F7E7CE]/40 transition-all duration-700"></div>
            <div className="flex-1 bg-[#F7E7CE] h-[95%]"></div>
            <div className="flex-1 bg-white/5 h-[70%] hover:bg-[#F7E7CE]/20 transition-all duration-700"></div>
            <div className="flex-1 bg-white/5 h-[45%] hover:bg-[#F7E7CE]/20 transition-all duration-700"></div>
          </div>
        </div>
        
        <div className="glass p-10 h-96 flex flex-col border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <h4 className="text-[10px] tracking-[0.2em] font-semibold text-zinc-500 uppercase mb-8">Priority Mandates</h4>
          <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {jobs.length === 0 ? (
              <p className="text-zinc-500 text-sm">No mandates posted yet.</p>
            ) : (
              jobs.slice(0, 3).map((job, idx) => (
                <div key={job.id} className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white line-clamp-1">{job.title}</span>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{job.location}</span>
                  </div>
                  <span className="material-symbols-outlined text-[#F7E7CE] text-sm">
                    {idx === 0 ? 'bolt' : idx === 1 ? 'star' : 'work'}
                  </span>
                </div>
              ))
            )}
          </div>
          <Link href="/recruiter/jobs" className="mt-4 w-full py-4 text-center block text-[10px] tracking-[0.2em] font-bold text-[#0A0A0C] bg-[#F7E7CE] uppercase hover:bg-[#f0e0c8] transition-all">
            View All Mandates
          </Link>
        </div>
      </div>
    </div>
  );
}
