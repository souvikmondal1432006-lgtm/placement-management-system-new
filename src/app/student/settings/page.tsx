"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Book, Save, Shield, Award, Briefcase, FileText, Activity } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";

export default function StudentSettingsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Computer Science (CSE)",
    cgpa: "",
    skills: ""
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/students/profile");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.user?.name || "",
            email: data.user?.email || "",
            phone: data.phone || "",
            department: data.department || "Computer Science (CSE)",
            cgpa: data.cgpa ? data.cgpa.toString() : "",
            skills: data.skills || ""
          });
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    }
    if (session) fetchProfile();
  }, [session]);

  const handleSync = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/students/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Identity Synced Successfully!");
      } else {
        alert("Failed to sync identity");
      }
    } catch (error) {
      console.error("Sync error:", error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const metrics = useMemo(() => {
    let integrityScore = 0;
    const coreFields = [formData.name, formData.phone, formData.department, formData.cgpa, formData.skills];
    const filledCoreFields = coreFields.filter(field => field && field.trim().length > 0).length;
    integrityScore = Math.round((filledCoreFields / 5) * 100);

    let saturationScore = 0;
    if (formData.skills && formData.skills.trim().length > 0) {
      const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(s => s.length > 0);
      saturationScore = Math.min(Math.round((skillsArray.length / 5) * 100), 100);
    }

    return { profileIntegrity: integrityScore, skillSaturation: saturationScore };
  }, [formData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Verifying Identity Matrix...</div>
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
            <User className="w-4 h-4 text-primary" />
            <span className="font-label-caps text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Personal Identity Node</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Identity & Merit</h1>
          <p className="text-zinc-400 mt-2">Manage your academic credentials and professional persona.</p>
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
              <Shield className="w-12 h-12 text-primary/5" />
            </div>

            <div className="relative z-10 space-y-12">
              {/* Personal Section */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Personal Identity</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Legal Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Communication Line</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:bg-white/10 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Institutional Email (Verified)</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                      <input 
                        type="email" 
                        value={formData.email} 
                        disabled 
                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-zinc-500 cursor-not-allowed font-medium"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Academic Section */}
              <section className="pt-12 border-t border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Book className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Academic Profile</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Institutional Department</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-secondary transition-colors" />
                      <select 
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-10 text-white focus:ring-2 focus:ring-secondary/20 focus:bg-white/10 outline-none transition-all font-bold appearance-none cursor-pointer"
                      >
                        <option value="Computer Science (CSE)" className="bg-zinc-900">Computer Science (CSE)</option>
                        <option value="Information Technology (IT)" className="bg-zinc-900">Information Technology (IT)</option>
                        <option value="Electronics (ECE)" className="bg-zinc-900">Electronics (ECE)</option>
                        <option value="Mechanical (ME)" className="bg-zinc-900">Mechanical (ME)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Cumulative Grade Point</label>
                    <div className="relative group">
                      <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-secondary transition-colors" />
                      <input 
                        type="number" 
                        step="0.01" 
                        value={formData.cgpa}
                        onChange={(e) => setFormData({...formData, cgpa: e.target.value})}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-secondary/20 focus:bg-white/10 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Technical Stack (Matrix)</label>
                    <div className="relative group">
                      <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-secondary transition-colors" />
                      <input 
                        type="text" 
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                        placeholder="e.g. React, Node.js, Python"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-secondary/20 focus:bg-white/10 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="pt-10 flex justify-end">
                <button 
                  onClick={handleSync}
                  disabled={saving}
                  className="accent-gradient text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saving ? "Synchronizing..." : "Sync Identity"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Side Info */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Merit Assets</h2>
          
          <div className="glass-card rounded-[2.5rem] p-8 border-white/5 bg-gradient-to-br from-primary/10 to-transparent group hover:border-primary/20 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Professional Resume</h3>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest leading-relaxed mb-6">
              Ensure your stack is up to date for better mandate matching.
            </p>
            <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              Update Asset
            </button>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 border-white/5">
            <h3 className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-6">Validation Metrics</h3>
            <div className="space-y-6">
              {[
                { label: "Profile Integrity", value: metrics.profileIntegrity, color: "primary" },
                { label: "Skill Saturation", value: metrics.skillSaturation, color: "secondary" }
              ].map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-zinc-600">{metric.label}</span>
                    <span className="text-white">{metric.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${metric.color} transition-all duration-1000 ease-out`} 
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

