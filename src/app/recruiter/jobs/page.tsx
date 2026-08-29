"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Search, Plus, Filter, MoreVertical, DollarSign, Clock, ChevronRight, Activity, X } from "lucide-react";

export default function RecruiterJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posting, setPosting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eligibilityCgpa: "",
    salaryLpa: "",
    location: "",
    deadline: ""
  });

  async function fetchJobs() {
    try {
      const res = await fetch("/api/jobs");
      if (res.ok) setJobs(await res.json());
    } catch (error) {
      console.error("Failed to fetch recruiter jobs", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ title: "", description: "", eligibilityCgpa: "", salaryLpa: "", location: "", deadline: "" });
        await fetchJobs();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to post job");
      }
    } catch (error) {
      console.error("Job posting error:", error);
      alert("Something went wrong");
    } finally {
      setPosting(false);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Synchronizing Mandate Streams...</div>
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
            <span className="font-label-caps text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Mandate Management Console</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Active Postings</h1>
          <p className="text-zinc-400 mt-2">Manage and monitor your company's live recruitment streams.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button 
            onClick={() => setIsModalOpen(true)}
            className="accent-gradient text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Post New mandate
          </button>
        </motion.div>
      </section>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by mandate title, tech stack..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all"
          />
        </div>
        <button className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
          <Filter className="w-4 h-4" /> Filter Stream
        </button>
      </div>

      {/* Postings Table/Grid */}
      <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 font-bold text-[10px] text-zinc-500 uppercase tracking-widest">Mandate Details</th>
                <th className="px-8 py-6 font-bold text-[10px] text-zinc-500 uppercase tracking-widest">Valuation</th>
                <th className="px-8 py-6 font-bold text-[10px] text-zinc-500 uppercase tracking-widest">Talent Inflow</th>
                <th className="px-8 py-6 font-bold text-[10px] text-zinc-500 uppercase tracking-widest">Operational Status</th>
                <th className="px-8 py-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredJobs.map((job, idx) => (
                <motion.tr 
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-extrabold text-base tracking-tight group-hover:text-primary transition-colors">{job.title}</div>
                        <div className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1 flex items-center gap-2">
                          <Clock className="w-3 h-3" /> {new Date(job.createdAt).toLocaleDateString()} • Full Time
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-white font-bold tracking-tight">
                      <DollarSign className="w-4 h-4 text-zinc-600" />
                      {job.salaryLpa} LPA
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-white">
                            {String.fromCharCode(64 + i)}
                          </div>
                        ))}
                      </div>
                      <div className="text-zinc-400 font-bold text-sm">
                        {job._count?.applications || 0} <span className="text-[10px] text-zinc-600 uppercase tracking-widest ml-1 font-medium">Applicants</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all
                      ${new Date(job.deadline) > new Date() ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-zinc-500 border-white/10'}
                    `}>
                      {new Date(job.deadline) > new Date() ? 'Active' : 'Expired'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-white transition-all">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Job Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 w-full max-w-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-8 relative z-10">
                <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Initialize New Mandate</h2>
                <p className="text-zinc-400 text-sm">Define the parameters for your next talent acquisition stream.</p>
              </div>

              <form onSubmit={handlePostJob} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Role Title</label>
                    <input 
                      required
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g. Senior Frontend Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Location</label>
                    <input 
                      required
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g. Remote / Bangalore"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Valuation (LPA)</label>
                    <input 
                      required
                      type="number"
                      step="0.1" 
                      value={formData.salaryLpa}
                      onChange={(e) => setFormData({...formData, salaryLpa: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g. 15.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Min. Threshold (CGPA)</label>
                    <input 
                      required
                      type="number"
                      step="0.1"
                      min="0"
                      max="10" 
                      value={formData.eligibilityCgpa}
                      onChange={(e) => setFormData({...formData, eligibilityCgpa: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g. 7.5"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Expiration Date</label>
                    <input 
                      required
                      type="date" 
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Mandate Details</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Describe the role responsibilities, requirements, and benefits..."
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    disabled={posting}
                    className="accent-gradient text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {posting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Deploy Mandate"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

