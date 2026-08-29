"use client";

import { motion } from "framer-motion";
import { Settings2, Save, Shield, Calendar, Award, Database, RefreshCw, Activity } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-label-caps text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Institutional Core Configuration</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">System Node</h1>
          <p className="text-zinc-400 mt-2">Modify global institutional parameters and security protocols.</p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Reset Tokens
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Settings */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-[2.5rem] p-10 border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8">
              <Activity className="w-12 h-12 text-primary/5" />
            </div>

            <div className="relative z-10 space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Academic Lifecycle</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Current Batch Index</label>
                    <input 
                      type="text" 
                      defaultValue="2026" 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Minimum Merit Threshold (CGPA)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      defaultValue="6.0" 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all font-bold"
                    />
                  </div>
                </div>
              </section>

              <section className="pt-10 border-t border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Institutional Incentives</h3>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Highest Package Record (LPA)</label>
                  <input 
                    type="text" 
                    defaultValue="45.0" 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all font-bold"
                  />
                </div>
              </section>

              <div className="pt-10 flex justify-end">
                <button className="accent-gradient text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center gap-3">
                  <Save className="w-4 h-4" /> Commit Configurations
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* System Info */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Environment Meta</h2>
          
          <div className="space-y-4">
            {[
              { label: "Core Version", value: "v2.4.1-stable", icon: Database },
              { label: "Storage Engine", value: "Prisma x MySQL", icon: Shield },
              { label: "Last Synchronization", value: "4m ago", icon: RefreshCw }
            ].map((meta, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500">
                  <meta.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-0.5">{meta.label}</div>
                  <div className="text-white font-bold text-sm">{meta.value}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="glass-card rounded-3xl p-8 border-white/5 bg-gradient-to-br from-red-500/10 to-transparent">
            <h3 className="text-red-500 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              Critical Actions
            </h3>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest leading-relaxed mb-6">
              Executing institutional resets will purge all active mandates and talent streams. Use with extreme caution.
            </p>
            <button className="w-full py-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all">
              Initialize System Purge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

