"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-[#0A0A0C] text-white font-headline selection:bg-champagne selection:text-black min-h-screen">
      {/* TopAppBar */}
      <header className="absolute top-0 left-0 w-full h-32 z-50 flex items-center justify-between px-8 md:px-16 bg-transparent">
        <div className="flex items-center gap-12">
          <span className="text-xl font-medium tracking-[0.3em] text-champagne font-sans">PLACIFY</span>
          <nav className="hidden md:flex gap-8">
            <Link className="font-sans uppercase text-xs tracking-[0.2em] text-champagne font-bold transition-colors" href="/login">Dashboard</Link>
            <Link className="font-sans uppercase text-xs tracking-[0.2em] text-zinc-400 hover:text-white transition-colors" href="/login">Jobs</Link>
            <Link className="font-sans uppercase text-xs tracking-[0.2em] text-zinc-400 hover:text-white transition-colors" href="/login">Students</Link>
          </nav>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/login" className="font-sans uppercase text-xs tracking-[0.2em] text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-95">Login</Link>
          <Link href="/login" className="bg-champagne text-black px-6 py-3 rounded-none font-sans uppercase text-xs tracking-[0.2em] font-bold hover:brightness-110 transition-all active:scale-95">Get Started</Link>
        </div>
      </header>

      <main className="relative pt-32">
        {/* Hero Section */}
        <section className="min-h-[819px] flex flex-col justify-center px-8 md:px-16 py-20 md:py-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="font-sans text-5xl md:text-7xl text-white mb-6 leading-[1.05] font-extrabold tracking-tight">
                The Future of <br/>
                <span className="text-champagne italic font-light">Campus Placements</span>
              </h1>
              <p className="font-headline text-lg md:text-xl text-zinc-400 max-w-xl mb-16 leading-relaxed">
                An elite platform for university placement management. Placify transforms the campus recruitment lifecycle into a seamless, data-driven journey of efficiency and absolute control.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="/login" className="w-full sm:w-auto text-center bg-champagne text-black px-10 py-5 rounded-none font-sans uppercase text-xs tracking-[0.2em] font-bold hover:shadow-[0_0_30px_rgba(247,231,206,0.15)] transition-all">
                  Initialize Access
                </Link>
                <Link href="/login" className="w-full sm:w-auto text-center border border-white/10 text-white px-10 py-5 rounded-none font-sans uppercase text-xs tracking-[0.2em] hover:bg-white/5 transition-all">
                  View Platform
                </Link>
              </div>
            </div>
            <div className="hidden lg:col-span-4 lg:flex justify-end relative">
              <div className="w-full aspect-[4/5] glass-card overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" 
                  alt="Placify dashboard" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7j_46FJ47owW9djCHUiCpKDOc0gGbFW8R0gS8uebh1krZYMgjjvizOuRognEPTfgo2BGeOALHms6d4NFKGXTT-ycc_FcrEp9pDD0opRqwAA69M37T-xrb7uZbQahUPzMgjR2W8fNkl7Rjwc2hw2aDctgfIRXgoWGri2IKZeu_8G4kC7jcHwGnZDWhjQDzshKQbAUmbji64_5eVe2Bj8X1Sge-BYhp8bY2igCF2rfn8AV5KGQc1f1dbtAZO3_m_d_GN6xUSi95blIK"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-8 md:px-16 py-20 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="block font-sans text-4xl md:text-5xl font-bold text-white mb-2">98<span className="text-champagne">%</span></span>
              <span className="font-sans uppercase text-[10px] tracking-[0.3em] text-zinc-500 font-bold">Placement Rate</span>
            </div>
            <div>
              <span className="block font-sans text-4xl md:text-5xl font-bold text-white mb-2">12<span className="text-champagne">ms</span></span>
              <span className="font-sans uppercase text-[10px] tracking-[0.3em] text-zinc-500 font-bold">Search Latency</span>
            </div>
            <div>
              <span className="block font-sans text-4xl md:text-5xl font-bold text-white mb-2">450<span className="text-champagne">+</span></span>
              <span className="font-sans uppercase text-[10px] tracking-[0.3em] text-zinc-500 font-bold">Global Partners</span>
            </div>
            <div>
              <span className="block font-sans text-4xl md:text-5xl font-bold text-white mb-2">$4.2<span className="text-champagne">B</span></span>
              <span className="font-sans uppercase text-[10px] tracking-[0.3em] text-zinc-500 font-bold">Talent Managed</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-8 md:px-16 py-32 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-6">Ecosystem Spheres</h2>
            <div className="w-24 h-px bg-champagne/30 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Students */}
            <div className="glass-card p-10 flex flex-col items-start group hover:bg-white/[0.04] transition-all duration-500">
              <div className="mb-8">
                <span className="material-symbols-outlined text-champagne text-4xl">school</span>
              </div>
              <h3 className="font-sans text-2xl font-bold text-white mb-4">For Students</h3>
              <p className="font-headline text-[15px] text-zinc-400 leading-relaxed mb-8">
                Curate your professional identity within a prestigious network. Access exclusive mandates and track your evolution with surgical precision.
              </p>
              <Link className="mt-auto font-sans uppercase text-[10px] font-bold tracking-[0.2em] text-champagne border-b border-champagne/20 pb-1 group-hover:border-champagne transition-all" href="/student/dashboard">Explore Trajectories</Link>
            </div>
            
            {/* Recruiters */}
            <div className="glass-card p-10 flex flex-col items-start group hover:bg-white/[0.04] transition-all duration-500">
              <div className="mb-8">
                <span className="material-symbols-outlined text-champagne text-4xl">business_center</span>
              </div>
              <h3 className="font-sans text-2xl font-bold text-white mb-4">For Recruiters</h3>
              <p className="font-headline text-[15px] text-zinc-400 leading-relaxed mb-8">
                Eliminate noise with Intelligence-driven filtering. Manage complex mandates through an interface designed for executive cognitive flow.
              </p>
              <Link className="mt-auto font-sans uppercase text-[10px] font-bold tracking-[0.2em] text-champagne border-b border-champagne/20 pb-1 group-hover:border-champagne transition-all" href="/recruiter/dashboard">Optimize Flow</Link>
            </div>
            
            {/* Institutions */}
            <div className="glass-card p-10 flex flex-col items-start group hover:bg-white/[0.04] transition-all duration-500">
              <div className="mb-8">
                <span className="material-symbols-outlined text-champagne text-4xl">account_balance</span>
              </div>
              <h3 className="font-sans text-2xl font-bold text-white mb-4">For Institutions</h3>
              <p className="font-headline text-[15px] text-zinc-400 leading-relaxed mb-8">
                Benchmark your talent pool against global standards. Gain holistic oversight of placements through high-fidelity analytics dashboards.
              </p>
              <Link className="mt-auto font-sans uppercase text-[10px] font-bold tracking-[0.2em] text-champagne border-b border-champagne/20 pb-1 group-hover:border-champagne transition-all" href="/admin/dashboard">Institutional Insight</Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 md:px-16 py-32 max-w-5xl mx-auto text-center">
          <h2 className="font-sans text-4xl md:text-5xl text-white mb-16 font-light tracking-tight"> 
            Ready to join <span className="text-champagne italic">Placify</span>?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <input 
              className="bg-white/5 border border-white/10 px-6 py-4 w-full max-w-sm focus:border-champagne focus:ring-0 text-white font-headline transition-all outline-none" 
              placeholder="professional@email.com" 
              type="email"
            />
            <button className="bg-white text-black px-10 py-4 font-sans uppercase text-xs tracking-[0.2em] font-bold hover:bg-champagne transition-all w-full md:w-auto">
              Request Invite
            </button>
          </div>
          <p className="mt-6 text-[13px] text-zinc-600 font-headline">Exclusive access by invitation only.</p>
        </section>
      </main>

      <footer className="px-8 md:px-16 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xs font-bold tracking-[0.4em] text-zinc-500 font-sans">PLACIFY © 2026</span>
          <div className="flex gap-8">
            <Link className="font-sans uppercase text-[10px] font-bold tracking-[0.2em] text-zinc-500 hover:text-white transition-colors" href="#">Privacy</Link>
            <Link className="font-sans uppercase text-[10px] font-bold tracking-[0.2em] text-zinc-500 hover:text-white transition-colors" href="#">Terms</Link>
            <Link className="font-sans uppercase text-[10px] font-bold tracking-[0.2em] text-zinc-500 hover:text-white transition-colors" href="#">Global</Link>
          </div>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-zinc-500 hover:text-champagne cursor-pointer transition-colors">language</span>
            <span className="material-symbols-outlined text-zinc-500 hover:text-champagne cursor-pointer transition-colors">share</span>
          </div>
        </div>
      </footer>

      {/* Background Decorative Element */}
      <div className="fixed top-0 right-0 -z-10 w-1/2 h-full opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-champagne/10 to-transparent"></div>
      </div>
    </div>
  );
}
