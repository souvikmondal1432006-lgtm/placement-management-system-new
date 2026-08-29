"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const navigation = [
  { name: "Intelligence", href: "/admin/dashboard", icon: "space_dashboard" },
  { name: "Mandates", href: "/admin/jobs", icon: "business_center" },
  { name: "Talent", href: "/admin/students", icon: "groups" },
  { name: "Analytics", href: "/admin/reports", icon: "query_stats" },
  { name: "Settings", href: "/admin/settings", icon: "settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name || "Alexander Thorne";

  return (
    <div className="bg-[#0A0A0C] text-[#e7e1de] font-sans selection:bg-[#F7E7CE] selection:text-[#0A0A0C] min-h-screen overflow-x-hidden">
      {/* Side Navigation Shell */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-16 px-8 w-72 border-r border-white/5 bg-[#0A0A0C]/80 backdrop-blur-xl z-50 hidden md:flex">
        <div className="mb-12">
          <Link href="/admin/dashboard">
            <h1 className="text-xl font-medium tracking-[0.3em] text-[#F7E7CE] font-sans">PLACIFY</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-2">Placement Management</p>
          </Link>
        </div>
        
        <nav className="flex-1 flex flex-col gap-4">
          {navigation.slice(0, 4).map((item) => {
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
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto">
          <Link
            href="/admin/settings"
            className={`flex items-center gap-4 py-3 px-4 transition-all duration-500 ease-out font-sans font-light tracking-wide ${
              pathname === "/admin/settings" 
                ? "text-[#F7E7CE] bg-white/5 border-l border-[#F7E7CE]" 
                : "text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-200"
            }`}
          >
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-sm">Settings</span>
          </Link>
          
          <div className="mt-8 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#363432] overflow-hidden flex items-center justify-center text-[#F7E7CE] font-bold">
                {userName.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{userName}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Administrator</p>
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
        </div>
      </aside>

      {/* Top App Bar Shell */}
      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] h-32 flex items-center justify-between px-8 md:pr-16 md:pl-16 bg-[#0A0A0C]/90 backdrop-blur-md z-40 border-b border-transparent">
        <div>
          <h2 className="font-sans uppercase text-xs tracking-[0.2em] text-[#F7E7CE] font-semibold">Admin Command Center</h2>
          <h3 className="font-sans text-white mt-1 text-[24px] font-bold tracking-tight">Executive Overview</h3>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative flex items-center border-b border-white/10 pb-1 w-64 group focus-within:border-[#F7E7CE] transition-colors hidden lg:flex">
            <span className="material-symbols-outlined text-zinc-500 text-sm absolute left-0">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 pl-6 text-[10px] tracking-[0.2em] text-white placeholder-zinc-600 w-full uppercase outline-none" 
              placeholder="GLOBAL SEARCH" 
              type="text"
            />
          </div>
          <div className="flex items-center gap-6 hidden sm:flex">
            <span className="material-symbols-outlined text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-95">notifications_none</span>
            <span className="material-symbols-outlined text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-95">tune</span>
            <span className="material-symbols-outlined text-[#F7E7CE] cursor-pointer active:scale-95" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="md:ml-72 pt-32 min-h-screen relative">
        {children}
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0A0A0C]/95 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 z-50">
        {navigation.slice(0, 4).map((item) => {
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
