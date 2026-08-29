"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Intelligence", href: "/recruiter/dashboard", icon: "space_dashboard" },
  { name: "Mandates", href: "/recruiter/jobs", icon: "business_center" },
  { name: "Talent", href: "/recruiter/applicants", icon: "groups" },
  { name: "Interviews", href: "/recruiter/interviews", icon: "calendar_today" },
  { name: "Company", href: "/recruiter/profile", icon: "domain" },
  { name: "Settings", href: "/recruiter/settings", icon: "settings" },
];

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
           // We could fetch actual company profile here if needed, but session usually suffices
        }
      } catch (e) {}
    }
    fetchProfile();
  }, [session]);

  const userName = session?.user?.name || "Julian Voss";
  
  return (
    <div className="bg-[#0A0A0C] text-[#e7e1de] font-sans selection:bg-[#F7E7CE] selection:text-[#0A0A0C]">
      {/* SideNavBar Component */}
      <nav className="fixed left-0 top-0 h-full flex flex-col py-16 px-8 w-72 border-r border-white/5 bg-[#0A0A0C]/80 backdrop-blur-xl z-50 transition-all duration-500 ease-out hidden md:flex">
        <div className="mb-16 flex flex-col gap-2">
          <Link href="/recruiter/dashboard">
            <h1 className="text-xl font-medium tracking-[0.3em] text-[#F7E7CE] font-sans">PLACIFY</h1>
            <p className="font-sans font-light tracking-wide text-xs text-zinc-500 uppercase mt-1">Placement Management</p>
          </Link>
        </div>
        
        <div className="flex flex-col gap-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 py-3 px-4 transition-all duration-500 ease-out font-sans font-light tracking-wide ${
                  isActive 
                    ? "text-[#F7E7CE] bg-white/5 border-l border-[#F7E7CE]" 
                    : "text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-200"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-[#211f1e] flex items-center justify-center font-bold text-[#F7E7CE]">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#F7E7CE]">{userName}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Recruiter</span>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-zinc-500 hover:text-red-400 transition-colors p-2"
            title="Logout"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </nav>

      {/* TopAppBar Component */}
      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] h-32 bg-[#0A0A0C]/90 backdrop-blur-md z-40 flex items-center justify-between px-16">
        <div>
          <h2 className="text-lg font-semibold text-[#F7E7CE] font-sans uppercase tracking-[0.2em]">Executive Overview</h2>
        </div>
        <div className="flex items-center gap-12">
          <div className="relative flex items-center hidden lg:flex">
            <span className="material-symbols-outlined absolute left-4 text-zinc-500 text-lg">search</span>
            <input 
              className="bg-white/5 border-none focus:ring-1 focus:ring-[#F7E7CE] pl-12 pr-6 py-2.5 w-64 text-[10px] tracking-[0.2em] font-medium text-zinc-300 placeholder:text-zinc-600 rounded-sm outline-none" 
              placeholder="GLOBAL SEARCH" 
              type="text"
            />
          </div>
          <div className="flex gap-8">
            <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-white transition-colors active:scale-95">notifications_none</span>
            <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-white transition-colors active:scale-95">tune</span>
            <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-white transition-colors active:scale-95">account_circle</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="md:ml-72 pt-32 min-h-screen relative">
        {children}
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0A0A0C]/95 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 z-50">
        {navigation.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`p-2 transition-all ${isActive ? "text-[#F7E7CE]" : "text-zinc-500"}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
