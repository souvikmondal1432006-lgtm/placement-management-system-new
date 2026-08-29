"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function StudentApplicationsPage() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await fetch("/api/applications");
        if (res.ok) setApplications(await res.json());
      } catch (error) {
        console.error("Failed to fetch applications", error);
      } finally {
        setLoading(false);
      }
    }
    if (session) fetchApps();
  }, [session]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Retrieving Tracking Streams...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-label-caps text-label-caps text-purple-500 mb-2 block uppercase tracking-[0.2em]">TRACKING</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">My Applications</h1>
          <p className="text-on-surface-variant font-body-md mt-1">Monitor the status of your journey with top companies.</p>
        </div>
      </section>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-zinc-500 uppercase tracking-widest bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-5 font-bold">Company & Role</th>
                <th className="px-6 py-5 font-bold">Applied Date</th>
                <th className="px-6 py-5 font-bold">Package</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                    No applications found. Head over to Jobs to apply!
                  </td>
                </tr>
              ) : applications.map((app, idx) => (
                <motion.tr 
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white group-hover:border-purple-500/30 transition-colors">
                        {app.job?.company?.name?.charAt(0) || "C"}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{app.job?.title}</div>
                        <div className="text-zinc-500 text-xs flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-xs">apartment</span> {app.job?.company?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">calendar_today</span> {new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-6 font-medium text-white">{Number(app.job?.salaryLpa)} LPA</td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border
                      ${app.status === 'APPLIED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                      ${app.status === 'SHORTLISTED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                      ${app.status === 'INTERVIEW' || app.status === 'INTERVIEWED' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : ''}
                      ${app.status === 'SELECTED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                      ${app.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                    `}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    {app.status === 'SELECTED' ? (
                      <button className="inline-flex items-center text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm mr-1">download</span> Offer Letter
                      </button>
                    ) : (
                      <button className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
                        View Details
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
