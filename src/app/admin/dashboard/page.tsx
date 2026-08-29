"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, companiesRes, jobsRes] = await Promise.all([
          fetch("/api/analytics"),
          fetch("/api/companies"),
          fetch("/api/jobs")
        ]);
        if (statsRes.ok) setStats(await statsRes.json());
        if (companiesRes.ok) setCompanies(await companiesRes.json());
        if (jobsRes.ok) setJobs(await jobsRes.json());
      } catch (error) {
        console.error("Failed to fetch admin dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#F7E7CE]/30 border-t-[#F7E7CE] rounded-full animate-spin"></div>
      </div>
    );
  }

  const placementRate = stats?.placementRate || 0;

  return (
    <div className="px-8 md:px-16 pb-16">
      {/* Bento Grid Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-[80px]">
        <div className="md:col-span-4 glass-panel p-8 group border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <div className="flex justify-between items-start mb-12">
            <span className="text-zinc-500 material-symbols-outlined text-2xl">groups</span>
            <span className="text-[10px] tracking-widest text-zinc-500 font-semibold">+12% VS LAST QUARTER</span>
          </div>
          <p className="text-zinc-400 font-sans text-[10px] tracking-[0.2em] uppercase mb-2">Total Active Students</p>
          <h4 className="text-4xl font-sans font-extrabold text-white">{stats?.totalStudents || 0}</h4>
          <div className="mt-8 h-[1px] w-full bg-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#F7E7CE] w-2/3"></div>
          </div>
        </div>
        
        <div className="md:col-span-4 glass-panel p-8 group border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <div className="flex justify-between items-start mb-12">
            <span className="text-zinc-500 material-symbols-outlined text-2xl">apartment</span>
            <span className="text-[10px] tracking-widest text-[#F7E7CE] font-semibold">TARGET EXCEEDED</span>
          </div>
          <p className="text-zinc-400 font-sans text-[10px] tracking-[0.2em] uppercase mb-2">Onboarded Companies</p>
          <h4 className="text-4xl font-sans font-extrabold text-white">{stats?.totalCompanies || 0}</h4>
          <div className="mt-8 h-[1px] w-full bg-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#F7E7CE] w-4/5"></div>
          </div>
        </div>
        
        <div className="md:col-span-4 glass-panel p-8 group border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <div className="flex justify-between items-start mb-12">
            <span className="text-zinc-500 material-symbols-outlined text-2xl">verified</span>
            <span className="text-[10px] tracking-widest text-zinc-500 font-semibold">{placementRate.toFixed(1)}% COMPLETION RATE</span>
          </div>
          <p className="text-zinc-400 font-sans text-[10px] tracking-[0.2em] uppercase mb-2">Total Placements</p>
          <h4 className="text-4xl font-sans font-extrabold text-white">{stats?.selectedCount || 0}</h4>
          <div className="mt-8 h-[1px] w-full bg-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#F7E7CE]" style={{ width: `${placementRate}%` }}></div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Tables and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px]">
        {/* Recent Companies Table */}
        <div className="lg:col-span-8 glass-panel p-8 border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h5 className="text-lg font-sans font-bold text-white">Recently Onboarded</h5>
              <p className="text-zinc-500 text-xs mt-1">Review active organizational partners</p>
            </div>
            <Link href="/admin/companies" className="text-[10px] tracking-[0.2em] uppercase text-[#F7E7CE] border border-[#F7E7CE]/30 px-6 py-2 hover:bg-[#F7E7CE]/5 transition-colors font-semibold">
              View All Partners
            </Link>
          </div>
          <div className="overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-4 text-[10px] tracking-[0.2em] font-medium text-zinc-500 uppercase">Company Entity</th>
                  <th className="py-4 text-[10px] tracking-[0.2em] font-medium text-zinc-500 uppercase">Industry</th>
                  <th className="py-4 text-[10px] tracking-[0.2em] font-medium text-zinc-500 uppercase text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {companies.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-zinc-500">No companies onboarded yet.</td>
                  </tr>
                ) : (
                  companies.slice(0, 3).map((company, idx) => (
                    <tr key={company.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/5 flex items-center justify-center border border-white/10 rounded-sm">
                            <span className="material-symbols-outlined text-zinc-400 text-sm">
                              {idx === 0 ? 'corporate_fare' : idx === 1 ? 'analytics' : 'account_balance'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{company.name}</p>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">{company._count?.jobs || 0} Active Mandates</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <span className="text-[10px] tracking-widest text-zinc-400 border border-white/10 px-3 py-1 uppercase rounded-sm">
                          {idx === 0 ? 'Technology' : idx === 1 ? 'Consulting' : 'Finance'}
                        </span>
                      </td>
                      <td className="py-6">
                        <div className="flex justify-center gap-4">
                          <span className="bg-[#F7E7CE]/10 text-[#F7E7CE] border border-[#F7E7CE]/20 text-[10px] font-bold px-4 py-1 uppercase rounded-sm">Active</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Secondary Data Artifacts */}
        <div className="lg:col-span-4 flex flex-col gap-[32px]">
          {/* System Health Artifact */}
          <div className="glass-panel p-8 border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
            <div className="flex items-center justify-between mb-8">
              <h5 className="text-sm font-semibold uppercase tracking-widest text-white">Platform Health</h5>
              <span className="w-2 h-2 rounded-full bg-[#F7E7CE] shadow-[0_0_12px_rgba(247,231,206,0.6)] animate-pulse"></span>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Server Load</p>
                <p className="text-xs text-white">24%</p>
              </div>
              <div className="h-[2px] w-full bg-white/5">
                <div className="h-full bg-[#F7E7CE] w-1/4"></div>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Database Uptime</p>
                <p className="text-xs text-white">99.9%</p>
              </div>
              <div className="h-[2px] w-full bg-white/5">
                <div className="h-full bg-[#F7E7CE] w-full"></div>
              </div>
            </div>
          </div>

          {/* Recent Activity Artifact */}
          <div className="glass-panel p-8 flex-1 border border-white/5 bg-white/[0.02] backdrop-blur-[20px]">
            <h5 className="text-sm font-semibold uppercase tracking-widest text-white mb-8">System Logs</h5>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-[22px] h-[22px] rounded-full border border-white/20 bg-[#0A0A0C] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-[#F7E7CE] rounded-full"></span>
                </div>
                <p className="text-xs text-white font-medium">New student credentials verified</p>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tighter">Just now • Auto-Auth</p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-[22px] h-[22px] rounded-full border border-white/10 bg-[#0A0A0C] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span>
                </div>
                <p className="text-xs text-zinc-400">Nightly DB optimization completed</p>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tighter">14 mins ago • Reports</p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-[22px] h-[22px] rounded-full border border-white/10 bg-[#0A0A0C] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span>
                </div>
                <p className="text-xs text-zinc-400">Mandate synchronization successful</p>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tighter">1 hour ago • System</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization / Featured Image Section with Live Overlay */}
      <section className="mt-[80px] h-[500px] w-full border border-white/5 overflow-hidden relative group rounded-xl">
        <img 
          alt="Global Placement Intelligence Map" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-1000 z-0" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC42kIBGyB3SQNnJnK45R63mFly3rAERAWsl5UTmprJKrjJTBiEcLKC1pggrhNnxrkPJEb9gJC6ltzgXsuAuF216qbf6nzjGlCkurbine849bNCli_8fzNfEe33RMqNI0T0GoaWNOs60jppZTVkaYtaqdhc64oM4NkyUhiov_HRDv2cY3VJWltA93A-D6qbsDtZQ-GrTCm0ABQw7D0bJHi3MxDItaMs4khD2ag4ue3r8NdCChixvw8gAf4sRDPzbOvLTaGridgYWTF3"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-transparent to-transparent z-10"></div>

        <div className="absolute inset-0 z-20 p-12 flex flex-col md:flex-row justify-between h-full">
          {/* Text Content - Left Side */}
          <div className="flex flex-col justify-end max-w-md h-full">
            <h2 className="font-sans text-3xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F7E7CE] animate-pulse shadow-[0_0_12px_rgba(247,231,206,0.8)]"></span>
              Live Mandate Intelligence
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              A live visualization of talent acquisition trajectories across the Monolith ecosystem. Analyzing active mandates and application inflow in real-time.
            </p>
            <Link href="/admin/jobs" className="self-start px-6 py-3 border border-[#F7E7CE]/30 text-[#F7E7CE] text-[10px] uppercase tracking-widest font-bold hover:bg-[#F7E7CE]/10 transition-colors bg-[#0A0A0C]/50 backdrop-blur-md">
              View All Global Mandates
            </Link>
          </div>

          {/* Scrolling Job Feed - Right Side */}
          <div className="hidden md:flex flex-col gap-4 h-full w-full max-w-md overflow-hidden relative" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex flex-col gap-4 animate-scroll">
              {jobs.length === 0 ? (
                <div className="text-zinc-400 font-sans p-6 glass-panel">Awaiting mandate synchronization...</div>
              ) : (
                [...jobs, ...jobs].map((job, idx) => ( // Duplicate array to create an infinite scroll illusion
                  <div 
                    key={`${job.id}-${idx}`} 
                    className="p-6 border border-white/10 bg-[#0A0A0C]/60 backdrop-blur-md hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 flex flex-col justify-between rounded-xl group shrink-0"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] text-[#F7E7CE] uppercase tracking-widest font-bold">{job.company?.name || "Company"}</span>
                        <span className="text-[10px] text-zinc-500 uppercase flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          Live
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-base leading-tight mb-1 group-hover:text-[#F7E7CE] transition-colors line-clamp-1">{job.title}</h4>
                      <p className="text-zinc-400 text-xs line-clamp-1">{job.location}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-white font-bold text-sm bg-white/5 px-2 py-1 rounded">{job.salaryLpa} LPA</span>
                      <span className="text-zinc-400 text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">groups</span>
                        {job._count?.applications || 0} Applied
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Inject CSS Animation for infinite scrolling */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes scroll {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
              .animate-scroll {
                animation: scroll 30s linear infinite;
              }
              .animate-scroll:hover {
                animation-play-state: paused;
              }
            `}} />
          </div>
        </div>
      </section>
    </div>
  );
}
