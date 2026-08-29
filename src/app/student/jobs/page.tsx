"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Search, Briefcase, MapPin, DollarSign, Calendar, ChevronRight, CheckCircle2, AlertCircle, Building2, Sparkles } from "lucide-react";

export default function StudentJobsPage() {

const CompanyLogo = ({ url, name }: { url: string | null; name: string }) => {
  const [error, setError] = useState(false);

  if (!url || error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-800 rounded-xl text-zinc-400 font-bold text-xs uppercase tracking-widest">
        {name ? name.substring(0, 2) : <Building2 className="w-6 h-6" />}
      </div>
    );
  }

  return (
    <img 
      src={url} 
      alt={name} 
      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" 
      onError={() => setError(true)}
    />
  );
};
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          fetch("/api/jobs"),
          fetch("/api/applications")
        ]);
        if (jobsRes.ok) setJobs(await jobsRes.json());
        if (appsRes.ok) setApplications(await appsRes.json());
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    }
    if (session) fetchData();
  }, [session]);

  const handleApply = async (jobId: number) => {
    setApplying(jobId);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId })
      });
      if (res.ok) {
        const newApp = await res.json();
        setApplications([...applications, newApp]);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to apply");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setApplying(null);
    }
  };

  const isApplied = (jobId: number) => applications.some(app => app.jobId === jobId);

  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Scanning Market Opportunities...</div>
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
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-label-caps text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Live Opportunities Grid</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Elite Tech Openings</h1>
          <p className="text-zinc-400 mt-2">Filter through curated roles designed for your institutional profile.</p>
        </motion.div>
      </section>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-2xl"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search by title, technology, or company..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all"
        />
      </motion.div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.map((job, idx) => {
          const applied = isApplied(job.id);
          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card rounded-[2.5rem] p-8 border-white/5 flex flex-col h-full group hover:border-primary/20 transition-all relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CompanyLogo 
                    url={job.company.logoUrl} 
                    name={job.company.name} 
                  />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Threshold</div>
                  <div className="text-sm font-extrabold text-white">{job.eligibilityCgpa ? `${job.eligibilityCgpa}` : '0.0'} <span className="text-zinc-500 font-medium text-[10px]">CGPA</span></div>
                </div>
              </div>
              
              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-primary transition-colors leading-tight mb-1">{job.title}</h3>
                <p className="text-zinc-500 font-medium flex items-center gap-1.5 text-sm">
                  {job.company.name} <span className="text-zinc-700">•</span> {job.location}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-10 pt-6 border-t border-white/5 relative z-10">
                <div>
                  <div className="flex items-center gap-1.5 text-zinc-600 mb-1">
                    <DollarSign className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Valuation</span>
                  </div>
                  <div className="text-lg font-bold text-white tracking-tight">
                    {Number(job.salaryLpa) > 100 ? (Number(job.salaryLpa) / 100000).toFixed(1) : job.salaryLpa} <span className="text-zinc-500 font-medium text-xs">LPA</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-zinc-600 mb-1">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Expires</span>
                  </div>
                  <div className="text-lg font-bold text-white tracking-tight">
                    {job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "TBD"}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto relative z-10">
                {applied ? (
                  <div className="w-full py-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center justify-center gap-2 uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4" /> Application Initialized
                  </div>
                ) : (
                  <button 
                    onClick={() => handleApply(job.id)}
                    disabled={applying === job.id}
                    className="w-full py-4 rounded-2xl accent-gradient text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 group/btn"
                  >
                    {applying === job.id ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing Stream...
                      </>
                    ) : (
                      <>
                        Initialize Application <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
        {filteredJobs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-24 text-center glass-card rounded-[2.5rem] border-dashed border-white/10"
          >
            <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg">No matching streams detected</h3>
            <p className="text-zinc-500 text-sm mt-2">Try adjusting your search filters or exploring all roles.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

