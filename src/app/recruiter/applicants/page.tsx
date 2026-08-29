"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { updateApplicationStatus } from "@/lib/actions";
import { ApplicationStatus } from "@prisma/client";
import { Users, FileText, Search, Filter, MoreHorizontal, Download, CheckCircle2, XCircle, Clock, ChevronRight, Activity } from "lucide-react";

export default function RecruiterApplicantsPage() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchApplicants() {
    try {
      const res = await fetch("/api/applications");
      if (res.ok) setApplicants(await res.json());
    } catch (error) {
      console.error("Failed to fetch applicants", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusUpdate = async (id: number, status: ApplicationStatus) => {
    try {
      await updateApplicationStatus(id, status);
      fetchApplicants(); // Refresh list
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const filteredApplicants = applicants.filter(app => 
    app.student.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Filtering Global Talent Pool...</div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="font-label-caps text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Live Recruitment Pipeline</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Applicant Hub</h1>
          <p className="text-zinc-400 mt-2">Oversee and accelerate candidate progression across all active mandates.</p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Batch
          </button>
        </div>
      </section>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by candidate name or target role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all"
          />
        </div>
        <button className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
          <Filter className="w-4 h-4" /> Pipeline Filters
        </button>
      </div>

      {/* Grid / Table */}
      <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 font-bold text-[10px] text-zinc-500 uppercase tracking-widest">Candidate Profile</th>
                <th className="px-8 py-6 font-bold text-[10px] text-zinc-500 uppercase tracking-widest">Target Role</th>
                <th className="px-8 py-6 font-bold text-[10px] text-zinc-500 uppercase tracking-widest">Pipeline Status</th>
                <th className="px-8 py-6 font-bold text-[10px] text-zinc-500 uppercase tracking-widest">Transition</th>
                <th className="px-8 py-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-lg">No candidates in queue</h3>
                    <p className="text-zinc-500 text-sm mt-2">Active postings will populate this list as applications flow in.</p>
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((app, idx) => (
                  <motion.tr 
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform">
                          {app.student.user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-extrabold text-white text-base tracking-tight">{app.student.user.name}</div>
                          <div className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">{app.student.department} • CGPA: {app.student.cgpa}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-white font-bold text-sm tracking-tight">{app.job.title}</div>
                      <div className="text-zinc-600 text-[10px] uppercase tracking-widest mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> Applied {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border
                        ${app.status === 'APPLIED' ? 'bg-primary/10 text-primary border-primary/20' : 
                          app.status === 'SHORTLISTED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                          app.status === 'INTERVIEW' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                          app.status === 'SELECTED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          'bg-red-500/10 text-red-400 border-red-500/20'}
                      `}>
                        <Activity className="w-3 h-3" /> {app.status}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={app.status}
                        onChange={(e) => handleStatusUpdate(app.id, e.target.value as ApplicationStatus)}
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300 outline-none focus:ring-2 focus:ring-primary/20 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        {Object.values(ApplicationStatus).map((status) => (
                          <option key={status} value={status} className="bg-zinc-900">{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest">
                          <FileText className="w-4 h-4" /> CV
                        </button>
                        <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

