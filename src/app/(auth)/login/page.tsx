"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { GraduationCap, Briefcase, Shield, Mail, Lock, ArrowRight, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"STUDENT" | "RECRUITER" | "ADMIN">("STUDENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      if (!isLogin) {
        // Registration Flow
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Failed to register.");
          setLoading(false);
          return;
        }
      }

      // Login Flow (executes for both Login and successful Registration)
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
    <div className="flex items-center justify-center min-h-screen font-headline text-white selection:bg-champagne selection:text-black bg-[#0A0A0C] overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ background: 'radial-gradient(circle at 50% -20%, rgba(247, 231, 206, 0.08) 0%, rgba(10, 10, 12, 0) 70%)'}}>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-champagne/[0.02] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2b2a28]/[0.1] blur-[100px] rounded-full"></div>
      </div>

      {/* Main Login Container */}
      <main className="relative z-10 w-full max-w-[480px] px-8">
        {/* Branding Header */}
        <header className="flex flex-col items-center mb-10 text-center">
          <div className="mb-4">
            <Link href="/" className="font-sans text-5xl text-champagne tracking-[0.3em] uppercase font-bold">PLACIFY</Link>
          </div>
          <p className="font-headline text-[12px] text-[#979085] uppercase tracking-[0.2em] font-bold">Placement Management Architecture</p>
        </header>

        {/* Glassmorphic Login Card */}
        <section className="bg-[#0f0e0c]/70 backdrop-blur-[20px] border border-champagne/10 p-10 md:p-12 rounded-xl shadow-2xl relative">
          <div className="mb-8 text-center flex flex-col items-center">
            <div className="flex bg-white/5 border border-white/10 rounded-full p-1 mb-6">
              <button 
                onClick={() => { setIsLogin(true); setError(null); }}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isLogin ? 'bg-champagne text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => { setIsLogin(false); setError(null); }}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${!isLogin ? 'bg-champagne text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                Register
              </button>
            </div>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-champagne mb-2">
              {isLogin ? "Executive Login" : "Create Account"}
            </h2>
            <p className="font-headline text-[13px] text-[#979085]">
              {isLogin ? "Secure access to the intelligence mandate." : "Initialize a new intelligence profile."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Role Selection Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
              {(["STUDENT", "RECRUITER", "ADMIN"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 flex flex-col items-center py-3 rounded-lg transition-all duration-300 relative ${role === r ? "bg-champagne/10 text-champagne shadow-xl border border-champagne/20" : "text-zinc-500 hover:text-zinc-300"}`}
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

            {!isLogin && (
              <div className="space-y-2">
                <label className="font-headline text-[12px] font-bold text-[#c7c6c4] uppercase tracking-widest" htmlFor="name">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-champagne/70 group-focus-within:text-champagne transition-colors" />
                  <input 
                    className="w-full bg-[#1d1b1a]/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-champagne font-headline placeholder:text-[#979085]/40 focus:outline-none focus:border-champagne/40 focus:bg-[#1d1b1a]/80 transition-all duration-300" 
                    id="name" 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name" 
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="font-headline text-[12px] font-bold text-[#c7c6c4] uppercase tracking-widest" htmlFor="email">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-champagne/70 group-focus-within:text-champagne transition-colors" />
                <input 
                  className="w-full bg-[#1d1b1a]/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-champagne font-headline placeholder:text-[#979085]/40 focus:outline-none focus:border-champagne/40 focus:bg-[#1d1b1a]/80 transition-all duration-300" 
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@executive.com" 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-headline text-[12px] font-bold text-[#c7c6c4] uppercase tracking-widest" htmlFor="password">Password</label>
                {isLogin && <Link className="font-headline text-[13px] text-champagne/60 hover:text-champagne transition-colors" href="#">Forgot Password?</Link>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-champagne/70 group-focus-within:text-champagne transition-colors" />
                <input 
                  className="w-full bg-[#1d1b1a]/50 border border-white/10 rounded-lg py-4 pl-12 pr-12 text-champagne font-headline placeholder:text-[#979085]/40 focus:outline-none focus:border-champagne/40 focus:bg-[#1d1b1a]/80 transition-all duration-300" 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-champagne transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 space-y-4">
              <button 
                disabled={loading}
                className="w-full bg-champagne hover:bg-[#fcf1e1] text-[#0A0A0C] font-sans font-bold text-[16px] py-4 rounded-lg tracking-[0.1em] uppercase shadow-lg shadow-champagne/5 transition-all duration-500 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50" 
                type="submit"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#0A0A0C]/30 border-t-[#0A0A0C] rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{isLogin ? "Sign In" : "Initialize Profile"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-white/10 w-full"></div>
                <span className="bg-[#0f0e0c] px-3 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">OR</span>
                <div className="border-t border-white/10 w-full"></div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/student/dashboard" })}
                className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-headline font-bold text-xs py-3.5 rounded-lg tracking-wider flex items-center justify-center gap-3 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                Continue with Google
              </button>

              {/* Demo Accounts Quick-Fill Helper */}
              {isLogin && (
                <div className="pt-4 border-t border-white/5">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold text-center mb-2">Quick Demo Accounts (1-Click Fill)</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRole("STUDENT");
                        setEmail("student@university.edu");
                        setPassword("password123");
                      }}
                      className="px-2 py-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-[10px] font-bold text-champagne uppercase tracking-wider transition-all"
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRole("RECRUITER");
                        setEmail("recruiter@google.com");
                        setPassword("password123");
                      }}
                      className="px-2 py-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-[10px] font-bold text-champagne uppercase tracking-wider transition-all"
                    >
                      Recruiter
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRole("ADMIN");
                        setEmail("admin@university.edu");
                        setPassword("password123");
                      }}
                      className="px-2 py-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-[10px] font-bold text-champagne uppercase tracking-wider transition-all"
                    >
                      Admin
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </section>

        {/* Footer Meta */}
        <footer className="mt-10 text-center space-y-4 relative z-10">
          <div className="flex justify-center items-center space-x-6">
            <Link className="font-headline text-[13px] text-[#979085] hover:text-white transition-colors uppercase tracking-widest" href="#">Privacy Protocol</Link>
            <span className="w-1 h-1 bg-[#979085]/20 rounded-full"></span>
            <Link className="font-headline text-[13px] text-[#979085] hover:text-white transition-colors uppercase tracking-widest" href="#">System Status</Link>
          </div>
          <p className="font-headline text-[11px] text-[#979085]/40 uppercase tracking-[0.2em]">© 2026 PLACIFY ARTIFACTS INC.</p>
        </footer>
      </main>

      {/* Ambient Image Fragment */}
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none mix-blend-screen z-0">
        <img 
          className="w-full h-full object-cover" 
          alt="Placify texture" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfuQ2sz5zhmZfz6eiMrsD5tLtsBwZIzxSeeN9groGnYAqyJpMWeguh1N_sYMooLKn4G6cHL8TRxVumzSMf0ZaEsYOlviGh7Kchg2HeVuXWHxc6PJfiR4ZsiAlr5lkDNdc5MfOo7ja6I8Yu1kzovp6NOmoaJ4jZ8LQcgfeLhrCgVdKYkqedXiqTSTywjBn4k_CZZnr8CK-AvaKxV2SbT5quhQlYjxNcUoUZ1FxRxrFsV9YB99Zp3bExZCZaYkMu1MVkXb5GaBlaoSjg" 
        />
      </div>
    </div>
  );
}
