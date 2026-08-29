"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Plus, Building2, Mail, Globe, Briefcase, ExternalLink, MoreVertical, Search, ShieldCheck, MapPin, DollarSign } from "lucide-react";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/companies");
        if (res.ok) setCompanies(await res.json());
      } catch (error) {
        console.error("Failed to fetch companies", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredCompanies = companies.filter(company => 
    (company.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.location || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Retrieving Global Partners...</div>
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
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="font-label-caps text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Institutional Asset Control</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Partner Matrix</h1>
          <p className="text-zinc-400 mt-2">Manage corporate relationships and institutional placement channels.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button className="accent-gradient text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
            <Plus className="w-4 h-4" /> Onboard Partner
          </button>
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
          placeholder="Filter by name or industry sector..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all"
        />
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCompanies.length === 0 ? (
          <div className="col-span-full py-24 text-center glass-card rounded-[2.5rem] border-dashed border-white/10">
            <Building2 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg">No active partnerships found</h3>
            <p className="text-zinc-500 text-sm mt-2">Begin institutional expansion by onboarding your first partner.</p>
          </div>
        ) : (
          filteredCompanies.map((company, idx) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card rounded-[2.5rem] p-8 border-white/5 flex flex-col h-full group hover:border-primary/20 transition-all relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-3xl group-hover:scale-110 transition-transform group-hover:border-primary/30 group-hover:text-primary">
                  {company.name?.charAt(0) || "C"}
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border bg-green-500/10 text-green-400 border-green-500/20">
                    Active
                  </span>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-600 hover:text-white transition-all">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-primary transition-colors mb-1">{company.name}</h3>
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <MapPin className="w-3.5 h-3.5" /> {company.location}
                </div>
              </div>

              <div className="space-y-4 mb-10 pt-6 border-t border-white/5 relative z-10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Avg Package</span>
                  </div>
                  <span className="text-sm font-bold text-white tracking-tight">{Number(company.packageOffered)} <span className="text-zinc-500 font-medium">LPA</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Postings</span>
                  </div>
                  <span className="text-sm font-bold text-white tracking-tight">{company._count?.jobs || 0} <span className="text-zinc-500 font-medium">Live</span></span>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-4 relative z-10">
                <button className="py-3.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2">
                  Analytics
                </button>
                <button className="py-3.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2">
                  Profile <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

