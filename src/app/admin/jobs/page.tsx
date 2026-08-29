"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Search, Filter, MoreVertical, Building2 } from "lucide-react";

export default function AdminJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) setJobs(await res.json());
      } catch (error) {
        console.error("Failed to fetch admin jobs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.company?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="h-20 bg-white/5 rounded-2xl animate-pulse" />
        <div className="h-96 bg-white/5 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-manrope tracking-tight mb-2">Job Postings</h1>
          <p className="text-muted-foreground">Monitor all active job listings across companies.</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 shadow-sm glass rounded-2xl overflow-hidden p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
          <button className="h-11 px-6 flex items-center justify-center gap-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors font-medium text-sm">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Job Title</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Applicants</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredJobs.map((job, idx) => (
                <motion.tr 
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-foreground">{job.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {job.company?.name || "Independent"}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{job._count?.applications || 0}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                      ${new Date(job.deadline) > new Date() ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-muted text-muted-foreground border-border/50'}
                    `}>
                      {new Date(job.deadline) > new Date() ? 'Active' : 'Expired'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-muted rounded-md transition-colors">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
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
