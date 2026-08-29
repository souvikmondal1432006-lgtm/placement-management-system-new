# Frontend Code Snapshot

## File: src\app\(auth)\login\page.tsx

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Shield, User, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [role, setRole] = useState<"STUDENT" | "RECRUITER" | "ADMIN">("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Security check failed. Please verify credentials.");
        setLoading(false);
      } else {
        if (role === "STUDENT") router.push("/student/dashboard");
        else if (role === "RECRUITER") router.push("/recruiter/dashboard");
        else router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected terminal error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex font-sans selection:bg-primary/30 overflow-hidden">
      {/* Left Pane - Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter accent-text-gradient flex items-center gap-2">
            PlacementCore
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            <span className="font-label-caps text-[10px] text-zinc-400 tracking-widest uppercase">Secure Terminal Access</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-extrabold text-white leading-tight tracking-tighter mb-6"
          >
            The Future of <span className="accent-text-gradient">Career Strategy</span> Starts Here.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg leading-relaxed mb-12"
          >
            Enter the command center for placement excellence. Integrated analytics, real-time tracking, and elite networking.
          </motion.p>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Uptime", value: "99.9%" },
              { label: "Matches", value: "14.2k" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border-white/5">
                <div className="text-zinc-500 text-xs font-label-caps uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-zinc-600 text-xs font-medium uppercase tracking-[0.2em]">
          Precision Infrastructure v4.2.0 • Institutional Grade
        </div>
      </div>

      {/* Right Pane - Authentication Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 bg-[#050505] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="w-full max-w-md space-y-10 relative z-10">
          <div className="space-y-4">
            <div className="lg:hidden mb-12">
              <span className="text-2xl font-extrabold tracking-tighter accent-text-gradient">PlacementCore</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">Welcome Back</h2>
            <p className="text-zinc-500 font-medium">Select your role and initialize security credentials.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
              {(["STUDENT", "RECRUITER", "ADMIN"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 flex flex-col items-center py-3 rounded-lg transition-all duration-300 relative ${role === r ? "bg-white/10 text-white shadow-xl border border-white/10" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  <span className="mb-1">
                    {r === "STUDENT" ? <GraduationCap className="w-4 h-4" /> : r === "RECRUITER" ? <Briefcase className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{r.charAt(0) + r.slice(1).toLowerCase()}</span>
                </button>
              ))}
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3"
              >
                <div className="w-1 h-1 rounded-full bg-red-400 animate-pulse"></div>
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Identity (Email)</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="name@university.edu"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:ring-1 focus:ring-primary focus:bg-white/10 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Password</label>
                  <Link href="#" className="text-[10px] font-bold text-primary hover:text-white transition-colors uppercase tracking-widest">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:ring-1 focus:ring-primary focus:bg-white/10 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 rounded-xl accent-gradient text-white font-bold flex items-center justify-center gap-3 group disabled:opacity-50 transition-all active:scale-[0.98] shadow-2xl shadow-primary/20 shimmer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-zinc-500 text-sm">
              New to the platform?{" "}
              <Link href="/register" className="text-white font-bold hover:text-primary transition-colors">Request access</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


```

## File: src\app\admin\companies\page.tsx

```tsx
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
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
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


```

## File: src\app\admin\dashboard\page.tsx

```tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Briefcase, Building, FileText, TrendingUp, ArrowRight, Shield, Activity, Search, ChevronRight, Settings } from "lucide-react";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userName = session?.user?.name?.split(" ")[0] || "Admin";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics");
        if (res.ok) setStats(await res.json());
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
          <div className="h-10 w-64 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white/5 rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-white/5 rounded-[2.5rem] animate-pulse" />
      </div>
    );
  }

  const placementRate = stats?.placementRate || 0;
  const highestPackage = stats?.highestPackage || "0";

  return (
    <div className="space-y-10">
      {/* Executive Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-label-caps text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Institutional Root Access</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">System Node: {userName}</h1>
          <p className="text-zinc-400 mt-2">
            Infrastructure Status: <span className="text-green-400 font-bold" suppressHydrationWarning>OPTIMAL</span> • 
            Operational Efficiency: <span className="text-white font-bold" suppressHydrationWarning>{placementRate.toFixed(1)}%</span>
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4"
        >
          <Activity className="w-5 h-5 text-primary animate-pulse" />
          <div className="text-right">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Real-time Load</div>
            <div className="text-sm font-bold text-white">2.4ms Latency</div>
          </div>
        </motion.div>
      </section>

      {/* Institutional KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Talent Pool", value: stats?.totalStudents || 0, icon: Users, color: "zinc-400" },
          { label: "Active Mandates", value: stats?.totalJobs || 0, icon: Briefcase, color: "primary" },
          { label: "Global Partners", value: stats?.totalCompanies || 0, icon: Building, color: "secondary" },
          { label: "Data Streams", value: stats?.totalApplications || 0, icon: FileText, color: "white" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color === 'primary' ? 'primary' : stat.color === 'secondary' ? 'secondary' : 'white'}/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className={`w-5 h-5 text-${stat.color === 'primary' ? 'primary' : stat.color === 'secondary' ? 'secondary' : 'white'}`} />
              </div>
              <div>
                <div className="text-4xl font-extrabold text-white mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Performance Metrics */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Financial & Yield Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-3xl p-8 border-white/5 bg-gradient-to-br from-primary/10 to-transparent"
            >
              <TrendingUp className="w-8 h-8 text-primary mb-6" />
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Peak Valuation (LPA)</div>
              <div className="text-5xl font-extrabold text-white tracking-tighter" suppressHydrationWarning>{highestPackage}</div>
              <div className="mt-6 flex items-center gap-2 text-green-400 font-bold text-xs">
                <Activity className="w-4 h-4" /> +14.2% Institutional Growth
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-3xl p-8 border-white/5"
            >
              <Shield className="w-8 h-8 text-secondary mb-6" />
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Yield Saturation</div>
              <div className="text-5xl font-extrabold text-white tracking-tighter">{stats?.placementRate.toFixed(1)}%</div>
              <div className="mt-6 h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-secondary" style={{ width: `${stats?.placementRate}%` }}></div>
              </div>
            </motion.div>
          </div>

          <div className="glass-card rounded-3xl p-8 border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <Search className="w-8 h-8 text-zinc-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">Advanced Querying</h3>
                <p className="text-zinc-500 text-sm mt-1">Generate custom multi-dimensional reports for stakeholder review.</p>
              </div>
            </div>
            <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
              Initialize Report
            </button>
          </div>
        </div>

        {/* Global Nav Hooks */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Administrative Hooks</h2>
          
          <div className="space-y-4">
            {[
              { label: "Mandate Registry", href: "/admin/jobs", icon: Briefcase, desc: "Control job lifecycle" },
              { label: "Partner Matrix", href: "/admin/companies", icon: Building, desc: "Manage institutional ties" },
              { label: "System Core", href: "/admin/settings", icon: Settings, desc: "Configure global tokens" }
            ].map((hook, i) => (
              <Link 
                key={i}
                href={hook.href} 
                className="glass-card rounded-3xl p-6 border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:text-primary transition-all">
                    <hook.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{hook.label}</h4>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">{hook.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
            
            <div className="pt-6">
              <button className="w-full py-4 rounded-xl accent-gradient text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group shadow-xl shadow-primary/20 active:scale-95 transition-all">
                Export System Backup <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


```

## File: src\app\admin\jobs\page.tsx

```tsx
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

```

## File: src\app\admin\reports\page.tsx

```tsx
"use client";

import { BarChart3, Download } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-manrope tracking-tight mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Detailed placement metrics and exports.</p>
        </div>
        <button className="h-10 px-4 flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm">
          <Download className="h-4 w-4" />
          Export All Data (CSV)
        </button>
      </div>

      <div className="bg-card border border-border/50 shadow-sm glass rounded-2xl p-6 min-h-[500px] flex items-center justify-center">
        <div className="text-center text-muted-foreground space-y-4">
          <BarChart3 className="h-16 w-16 mx-auto opacity-50" />
          <h2 className="text-xl font-medium">Advanced Analytics Dashboard</h2>
          <p className="max-w-md mx-auto">This module will feature Recharts integration for department-wise placement stats and historical data comparisons.</p>
        </div>
      </div>
    </div>
  );
}

```

## File: src\app\admin\settings\page.tsx

```tsx
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


```

## File: src\app\admin\students\page.tsx

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/students");
        if (res.ok) setStudents(await res.json());
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    (s.user?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.department || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
          <div className="h-10 w-64 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="h-96 bg-white/5 rounded-[2rem] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-label-caps text-label-caps text-purple-500 mb-2 block uppercase tracking-[0.2em]">DIRECTORY</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Student Database</h1>
          <p className="text-on-surface-variant font-body-md mt-1">Manage, verify, and monitor student profiles.</p>
        </div>
      </section>

      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 bg-white/5 rounded-lg border border-white/10 flex items-center px-4 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all">
            <span className="material-symbols-outlined text-zinc-400 text-sm mr-3">search</span>
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 bg-transparent border-none focus:ring-0 text-sm text-zinc-300 outline-none"
            />
          </div>
          <button className="h-11 px-6 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors font-medium text-sm text-white">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-zinc-500 uppercase tracking-widest bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-5 font-bold">Candidate</th>
                <th className="px-6 py-5 font-bold">Dept</th>
                <th className="px-6 py-5 font-bold">CGPA</th>
                <th className="px-6 py-5 font-bold">Verification</th>
                <th className="px-6 py-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.map((student, idx) => (
                <motion.tr 
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-purple-500">
                        {(student.name || student.user?.name || "S").charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{student.name || student.user?.name || "Anonymous Student"}</div>
                        <div className="text-[10px] text-zinc-500">{student.user?.email || student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-zinc-400 font-medium">{student.department}</td>
                  <td className="px-6 py-6 font-bold text-white">{student.cgpa}</td>
                  <td className="px-6 py-6">
                    {student.verified ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-green-500/10 text-green-400 border-green-500/20">
                        <span className="material-symbols-outlined text-[12px]">check_circle</span> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-amber-500/10 text-amber-400 border-amber-500/20">
                        <span className="material-symbols-outlined text-[12px]">pending</span> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="p-2 hover:bg-white/5 rounded-md transition-colors text-zinc-500 hover:text-white">
                      <span className="material-symbols-outlined">more_vert</span>
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

```

## File: src\app\page.tsx

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Bell, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-black text-white font-sans selection:bg-primary/30 min-h-screen overflow-x-hidden">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 h-16 bg-black/80 backdrop-blur-2xl border-b border-white/5 flex justify-between items-center px-10 shadow-2xl">
        <div className="flex items-center gap-8">
          <span className="text-xl font-extrabold tracking-tighter accent-text-gradient">PlacementCore</span>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-primary font-bold hover:text-white transition-all duration-300">Jobs</Link>
            <Link href="/login" className="text-zinc-400 hover:text-white transition-all duration-300">Companies</Link>
            <Link href="/login" className="text-zinc-400 hover:text-white transition-all duration-300">Recruiters</Link>
            <Link href="/login" className="text-zinc-400 hover:text-white transition-all duration-300">Students</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input 
              className="bg-white/5 border-none rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-primary w-48 transition-all outline-none text-white" 
              placeholder="Search..." 
              type="text"
            />
          </div>
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="h-8 w-px bg-white/10 mx-2"></div>
          <Link href="/login" className="accent-gradient px-6 py-2 rounded-lg text-white text-sm font-bold active:scale-95 transition-all shadow-lg shadow-primary/20">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden px-10">
        <div className="absolute inset-0 hero-glow -z-10"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]"></div>
        
        <div className="max-w-5xl w-full text-center space-y-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full glass-card mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
            <span className="font-label-caps text-[10px] text-zinc-400 tracking-[0.25em] uppercase">The Future of Campus Recruitment</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-extrabold text-white text-balance leading-[1.1] tracking-tighter"
          >
            Smart Placement Management for <span className="accent-text-gradient">Modern Colleges</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Empower careers and streamline recruiter workflows with AI-driven matching, deep analytics, and an institutional-grade platform designed for speed.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/login" className="accent-gradient text-white font-bold px-10 py-4 rounded-lg shadow-2xl shadow-primary/20 hover:brightness-110 transition-all active:scale-95 shimmer">
              Get Started
            </Link>
            <Link href="/login" className="bg-white/5 border border-white/10 text-white font-bold px-10 py-4 rounded-lg hover:bg-white/10 transition-all">
              Login to Portal
            </Link>
          </motion.div>
        </div>

        {/* Dashboard Visual */}
        <motion.div 
          initial={{ opacity: 0, rotateX: 20, y: 50 }}
          animate={{ opacity: 1, rotateX: 12, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 w-full max-w-6xl px-4 perspective-1000"
        >
          <div className="glass-card rounded-2xl p-6 shadow-2xl relative overflow-hidden border-white/10 transform translate-y-4">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="h-6 w-px bg-white/5 mx-2"></div>
              <div className="h-2 w-48 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-2/3 accent-gradient"></div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3 space-y-4">
                <div className="h-32 rounded-xl bg-white/5 p-4 flex flex-col justify-end gap-2 border border-white/5">
                  <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                  <div className="h-4 w-3/4 bg-primary/40 rounded-full"></div>
                </div>
                <div className="h-48 rounded-xl bg-white/5 border border-white/5"></div>
              </div>
              <div className="col-span-6 space-y-4">
                <div className="h-64 rounded-xl bg-primary/5 border border-primary/20 relative overflow-hidden flex items-center justify-center">
                  <div className="text-primary/40 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full border-4 border-current border-t-transparent animate-spin"></div>
                    <span className="font-bold uppercase tracking-widest text-xs">Processing Neural Data</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 rounded-xl bg-white/5 border border-white/5"></div>
                  <div className="h-24 rounded-xl bg-white/5 border border-white/5"></div>
                </div>
              </div>
              <div className="col-span-3 space-y-4">
                <div className="h-full rounded-xl bg-white/5 border border-white/5 p-4">
                  <div className="space-y-4">
                    {[20, 20, 10].map((op, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-secondary' : 'bg-white'}/20`}></div>
                        <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Command the Future of Work</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">Scalable infrastructure for placement directors who demand precision and speed.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Automated Matchmaking", icon: "auto_awesome", color: "primary", desc: "AI-powered algorithms that pair candidates with their ideal roles based on skills." },
            { title: "Deep Analytics", icon: "monitoring", color: "secondary", desc: "Real-time dashboards tracking conversion rates, interview success, and salary distributions." },
            { title: "Global Network", icon: "public", color: "zinc-400", desc: "Connect instantly with thousands of pre-vetted recruiters across Fortune 500 companies." },
            { title: "Success Tracking", icon: "school", color: "primary", desc: "Full lifecycle management from onboarding to final offer letter and alumni relations." }
          ].map((feature, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl group border-white/5 hover:border-white/10">
              <div className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6 text-${feature.color} border border-white/10 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-20 pb-10 px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <span className="text-2xl font-extrabold tracking-tighter accent-text-gradient">PlacementCore</span>
            <p className="text-zinc-500 text-sm leading-relaxed">Empowering the next generation of global talent through precision placement technology.</p>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">Product</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/login" className="hover:text-primary transition-colors">Recruiter Dashboard</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Student Hub</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Admin Console</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">Resources</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="#" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">Newsletter</h4>
            <div className="relative">
              <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="email@college.edu" type="email"/>
              <button className="absolute right-2 top-1.5 accent-gradient text-white px-4 py-1.5 rounded text-xs font-bold shadow-lg">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-600">© 2026 PlacementCore Inc. Precision is our standard.</div>
          <div className="flex gap-6 text-xs text-zinc-600 font-bold uppercase tracking-widest">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


```

## File: src\app\recruiter\applicants\page.tsx

```tsx
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
                        ${app.status === 'Applied' ? 'bg-primary/10 text-primary border-primary/20' : 
                          app.status === 'Shortlisted' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                          app.status === 'Interviewing' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                          app.status === 'Offered' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
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


```

## File: src\app\recruiter\dashboard\page.tsx

```tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, ChevronRight, Plus, Users, Calendar, TrendingUp, Search } from "lucide-react";

export default function RecruiterDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userName = session?.user?.name?.split(" ")[0] || "Recruiter";

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, appsRes] = await Promise.all([
          fetch("/api/analytics"),
          fetch("/api/applications")
        ]);
        if (statsRes.ok) setStats(await statsRes.json());
        if (appsRes.ok) setApplicants(await appsRes.json());
      } catch (error) {
        console.error("Failed to fetch recruiter dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    if (session) fetchData();
  }, [session]);

  if (loading) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
          <div className="h-10 w-64 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white/5 rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-white/5 rounded-[2.5rem] animate-pulse" />
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
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="font-label-caps text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Recruiter Command Center</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Executive Overview, {userName}</h1>
          <p className="text-zinc-400 mt-2">
            {stats?.applicationCount > 0 
              ? `You have ${stats.applicationCount} active candidates across ${stats?.jobCount || 0} open mandates.` 
              : "Your talent pipeline is ready for initialization."}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/recruiter/jobs" className="accent-gradient text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
            <Plus className="w-4 h-4" /> Post New Role
          </Link>
        </motion.div>
      </section>

      {/* Analytics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Open Mandates", value: stats?.jobCount || 0, icon: Briefcase, color: "zinc-400" },
          { label: "Active Applicants", value: stats?.applicationCount || 0, icon: Users, color: "primary" },
          { label: "Interview Pipeline", value: "--", icon: Calendar, color: "secondary" },
          { label: "Placement Rate", value: stats?.selectedCount || 0, icon: TrendingUp, color: "white" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color === 'primary' ? 'primary' : stat.color === 'secondary' ? 'secondary' : 'white'}/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className={`w-5 h-5 text-${stat.color === 'primary' ? 'primary' : stat.color === 'secondary' ? 'secondary' : 'white'}`} />
              </div>
              <div>
                <div className="text-4xl font-extrabold text-white mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Applicants List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">Talent Inflow</h2>
            <Link href="/recruiter/applicants" className="text-[10px] font-bold text-primary hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1 group">
              Full Database <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {applicants.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 text-center border-dashed border-white/10 bg-transparent">
                <Users className="text-zinc-600 w-12 h-12 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-1">No applicants detected</h3>
                <p className="text-zinc-500 text-sm">Post a job to begin receiving talent streams.</p>
              </div>
            ) : (
              applicants.slice(0, 5).map((app, idx) => (
                <motion.div 
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="glass-card rounded-2xl p-5 border-white/5 flex items-center justify-between group hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xl">
                      {app.student.user.name[0]}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm leading-tight group-hover:text-primary transition-colors">{app.student.user.name}</h3>
                      <p className="text-zinc-500 text-xs mt-1 font-medium">{app.student.department} Engineering • {app.job.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="text-primary font-bold text-[10px] uppercase tracking-widest">{app.status}</span>
                      <p className="text-[10px] text-zinc-600 font-medium mt-1">CGPA: {app.student.cgpa}</p>
                    </div>
                    <Link href={`/recruiter/applicants/${app.id}`} className="p-2 rounded-lg hover:bg-white/5 text-zinc-600 hover:text-white transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Active Pipeline</h2>
          
          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>
              <Calendar className="w-6 h-6 text-primary mb-4" />
              <h4 className="text-white font-bold text-lg mb-2">Schedule Stream</h4>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">Coordinate with shortlisted candidates for the upcoming hiring sprints.</p>
              <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                Launch Scheduler
              </button>
            </div>

            <div className="glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden group">
               <TrendingUp className="w-6 h-6 text-secondary mb-4" />
              <h4 className="text-white font-bold text-lg mb-2">Insights</h4>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">Your offer conversion rate is 12% higher than the institutional average.</p>
              <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


```

## File: src\app\recruiter\interviews\page.tsx

```tsx
"use client";

import { Calendar } from "lucide-react";

export default function RecruiterInterviewsPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-manrope tracking-tight mb-2">Interview Schedule</h1>
          <p className="text-muted-foreground">Manage your upcoming technical and HR rounds.</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 shadow-sm glass rounded-2xl p-6 min-h-[500px] flex items-center justify-center">
        <div className="text-center text-muted-foreground space-y-4">
          <Calendar className="h-16 w-16 mx-auto opacity-50" />
          <h2 className="text-xl font-medium">Calendar Integration Module</h2>
          <p className="max-w-md mx-auto">This section will feature a full-calendar view allowing you to schedule slots, send invites, and manage interview panels.</p>
        </div>
      </div>
    </div>
  );
}

```

## File: src\app\recruiter\jobs\page.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Search, Plus, Filter, MoreVertical, Users, DollarSign, Clock, ChevronRight, Activity } from "lucide-react";

export default function RecruiterJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchJobs();
  }, []);

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
          <button className="accent-gradient text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
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
    </div>
  );
}


```

## File: src\app\recruiter\profile\page.tsx

```tsx
"use client";

import { Building2, Save, MapPin, DollarSign } from "lucide-react";

export default function RecruiterProfilePage() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-manrope tracking-tight mb-2">Company Profile</h1>
          <p className="text-muted-foreground">Manage your company's public details shown to students.</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 shadow-sm glass rounded-2xl p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-6 pb-6 border-b border-border/50">
          <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary text-3xl">
            G
          </div>
          <div>
            <h2 className="text-xl font-bold">Google</h2>
            <p className="text-sm text-muted-foreground">Tech & Software</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <input type="text" defaultValue="Google" className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Headquarters Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <input type="text" defaultValue="Bangalore, India" className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Standard Package Offered</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <input type="text" defaultValue="25 LPA" className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-border/50 pt-6">
          <button className="h-10 px-6 flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
            <Save className="h-4 w-4" />
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

```

## File: src\app\recruiter\settings\page.tsx

```tsx
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


```

## File: src\app\student\applications\page.tsx

```tsx
"use client";

import { motion } from "framer-motion";

export default function StudentApplicationsPage() {
  const applications = [
    { id: 1, company: "Google", role: "Software Engineer", status: "Shortlisted", date: "2026-04-20", package: "25 LPA", location: "Bangalore" },
    { id: 2, company: "Microsoft", role: "SDE I", status: "Applied", date: "2026-04-18", package: "22 LPA", location: "Hyderabad" },
    { id: 3, company: "Amazon", role: "Frontend Developer", status: "Interviewed", date: "2026-04-15", package: "24 LPA", location: "Bangalore" },
    { id: 4, company: "TCS", role: "System Engineer", status: "Rejected", date: "2026-04-10", package: "7 LPA", location: "Mumbai" },
    { id: 5, company: "Zoho", role: "Product Designer", status: "Selected", date: "2026-04-05", package: "10 LPA", location: "Chennai" },
  ];

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
              {applications.map((app, idx) => (
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
                        {app.company.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{app.role}</div>
                        <div className="text-zinc-500 text-xs flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-xs">apartment</span> {app.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">calendar_today</span> {app.date}
                    </div>
                  </td>
                  <td className="px-6 py-6 font-medium text-white">{app.package}</td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border
                      ${app.status === 'Applied' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                      ${app.status === 'Shortlisted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                      ${app.status === 'Interviewed' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : ''}
                      ${app.status === 'Selected' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                      ${app.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                    `}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    {app.status === 'Selected' ? (
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

```

## File: src\app\student\dashboard\page.tsx

```tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Calendar, ChevronRight, FileText, Sparkles, TrendingUp } from "lucide-react";

export default function StudentDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userName = session?.user?.name?.split(" ")[0] || "Student";

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, appsRes] = await Promise.all([
          fetch("/api/analytics"),
          fetch("/api/applications")
        ]);
        
        if (statsRes.ok) setStats(await statsRes.json());
        if (appsRes.ok) setApplications(await appsRes.json());
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchData();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
          <div className="h-10 w-64 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white/5 rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-white/5 rounded-[2.5rem] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="font-label-caps text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Institutional Command Center</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Welcome back, {userName}</h1>
          <p className="text-zinc-400 mt-2">
            {stats?.interviewCount > 0 
              ? `You have ${stats.interviewCount} active interview streams scheduled.` 
              : "Synchronizing your career trajectory with global opportunities."}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="text-right">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Profile Integrity</div>
            <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full w-3/4 accent-gradient"></div>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">75%</div>
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Applications", value: stats?.applicationCount || 0, icon: FileText, color: "zinc-400" },
          { label: "Shortlisted", value: stats?.shortlistedCount || 0, icon: Sparkles, color: "primary" },
          { label: "Interview Rounds", value: stats?.interviewCount || 0, icon: Calendar, color: "secondary" },
          { label: "Active Offers", value: stats?.offerCount || 0, icon: TrendingUp, color: "white" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color === 'primary' ? 'primary' : stat.color === 'secondary' ? 'secondary' : 'white'}/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 text-${stat.color === 'primary' ? 'primary' : stat.color === 'secondary' ? 'secondary' : 'white'}`} />
              </div>
              <div>
                <div className="text-4xl font-extrabold text-white mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">Application Stream</h2>
            <Link href="/student/applications" className="text-[10px] font-bold text-primary hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1 group">
              View Analytics <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 text-center border-dashed border-white/10 bg-transparent">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Briefcase className="text-zinc-600 w-8 h-8" />
                </div>
                <h3 className="text-white font-bold mb-1">No active applications</h3>
                <p className="text-zinc-500 text-sm">Initialize your first application to see the stream.</p>
              </div>
            ) : (
              applications.slice(0, 5).map((app, idx) => (
                <motion.div 
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="glass-card rounded-2xl p-5 border-white/5 flex items-center justify-between group hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 p-2 overflow-hidden flex items-center justify-center relative group-hover:border-primary/30 transition-colors">
                      <img 
                        src={app.job.company.logoUrl || `https://ui-avatars.com/api/?name=${app.job.company.name}&background=131313&color=fff`} 
                        alt={app.job.company.name} 
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" 
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm leading-tight group-hover:text-primary transition-colors">{app.job.title}</h3>
                      <p className="text-zinc-500 text-xs mt-1 font-medium">{app.job.company.name} • {app.job.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${
                      app.status === 'SELECTED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      app.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-white'
                    }`}>
                      {app.status}
                    </span>
                    <span className="text-[10px] text-zinc-600 font-medium">{new Date(app.appliedAt).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Growth Path</h2>
          
          <div className="space-y-4">
            <div className="glass-card rounded-3xl p-6 border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>
              <Sparkles className="w-6 h-6 text-primary mb-4" />
              <h4 className="text-white font-bold text-lg mb-2">Refine Strategy</h4>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">Your resume match score is currently 75%. Completing your skill matrix could unlock elite tiers.</p>
              <Link href="/student/settings" className="w-full py-4 rounded-xl accent-gradient text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group/btn shadow-xl shadow-primary/10 active:scale-[0.98] transition-all">
                Update Profile <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="glass-card rounded-3xl p-6 border-white/5 hover:bg-white/[0.02] transition-colors group">
              <Briefcase className="w-6 h-6 text-zinc-400 mb-4 group-hover:text-white transition-colors" />
              <h4 className="text-white font-bold text-lg mb-2">Explore Market</h4>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">24 new opportunities were uploaded today that match your tech stack.</p>
              <Link href="/student/jobs" className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                Search Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


```

## File: src\app\student\jobs\page.tsx

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Search, Briefcase, MapPin, DollarSign, Calendar, ChevronRight, CheckCircle2, AlertCircle, Building2, Sparkles } from "lucide-react";

export default function StudentJobsPage() {
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
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                  {job.company.logoUrl ? (
                    <img src={job.company.logoUrl} alt={job.company.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                  ) : (
                    <Building2 className="w-8 h-8 text-zinc-600" />
                  )}
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


```

## File: src\app\student\notifications\page.tsx

```tsx
"use client";

import { motion } from "framer-motion";
import { Bell, Briefcase, CheckCircle2, Clock } from "lucide-react";

export default function StudentNotificationsPage() {
  const notifications = [
    { id: 1, type: "Status", title: "Application Shortlisted", message: "Your application for Software Engineer at Google has been shortlisted.", time: "2 hours ago", icon: CheckCircle2, color: "text-amber-500", bg: "bg-amber-500/10" },
    { id: 2, type: "Job", title: "New Job Match", message: "Microsoft just posted a new role for SDE I that matches your profile 95%.", time: "1 day ago", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: 3, type: "Reminder", title: "Interview Tomorrow", message: "You have a technical interview with Amazon scheduled for tomorrow at 10:00 AM.", time: "2 days ago", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-manrope tracking-tight mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your applications and new opportunities.</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 shadow-sm glass rounded-2xl overflow-hidden p-6 space-y-6">
        {notifications.map((notif, idx) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors"
          >
            <div className={`p-3 rounded-lg ${notif.bg}`}>
              <notif.icon className={`h-6 w-6 ${notif.color}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{notif.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{notif.message}</p>
              <span className="text-xs text-muted-foreground/60 mt-2 block">{notif.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

```

## File: src\app\student\settings\page.tsx

```tsx
"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Book, Save, Shield, Award, Briefcase, FileText, Activity } from "lucide-react";

export default function StudentSettingsPage() {
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
                        defaultValue="Alex Kumar" 
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
                        defaultValue="+91 9876543210" 
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
                        defaultValue="student1@university.edu" 
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
                      <select className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-10 text-white focus:ring-2 focus:ring-secondary/20 focus:bg-white/10 outline-none transition-all font-bold appearance-none cursor-pointer">
                        <option className="bg-zinc-900">Computer Science (CSE)</option>
                        <option className="bg-zinc-900">Information Technology (IT)</option>
                        <option className="bg-zinc-900">Electronics (ECE)</option>
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
                        defaultValue="9.20" 
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
                        defaultValue="React, Node.js, Python, SQL, AWS" 
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-secondary/20 focus:bg-white/10 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="pt-10 flex justify-end">
                <button className="accent-gradient text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center gap-3">
                  <Save className="w-4 h-4" /> Sync Identity
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
              Last synchronized 3 days ago. Ensure your stack is up to date for better mandate matching.
            </p>
            <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              Update Asset
            </button>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 border-white/5">
            <h3 className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-6">Validation Metrics</h3>
            <div className="space-y-6">
              {[
                { label: "Profile Integrity", value: 85 },
                { label: "Skill Saturation", value: 72 }
              ].map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-zinc-600">{metric.label}</span>
                    <span className="text-white">{metric.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${metric.value}%` }}></div>
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


```

