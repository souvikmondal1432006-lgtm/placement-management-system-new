"use client";

import { motion } from "framer-motion";
import { Settings, Save, Lock, Mail, Shield, User, Globe, Activity } from "lucide-react";

export default function RecruiterSettingsPage() {
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
            <span className="font-label-caps text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Institutional Access Node</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Security & Interface</h1>
          <p className="text-zinc-400 mt-2">Configure your administrative credentials and corporate presence.</p>
        </motion.div>
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
              <Lock className="w-12 h-12 text-primary/5" />
            </div>

            <div className="relative z-10 space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Access Credentials</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Administrative Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                      <input 
                        type="email" 
                        defaultValue="hr@google.com" 
                        disabled 
                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-zinc-500 cursor-not-allowed font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Update Security Key</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="pt-10 flex justify-end">
                <button className="accent-gradient text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center gap-3">
                  <Save className="w-4 h-4" /> Commit Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Corporate Meta */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Partner Context</h2>
          
          <div className="glass-card rounded-[2.5rem] p-8 border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Google Inc.</h3>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest leading-relaxed mb-6">
              Corporate profile is verified and active. All mandates published will carry the verified institutional badge.
            </p>
            <div className="flex items-center gap-2 text-green-400 text-[10px] font-bold uppercase tracking-widest">
              <Activity className="w-4 h-4" /> System Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

