"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const navigation = [
  { name: "Intelligence", href: "/student/dashboard", icon: "space_dashboard" },
  { name: "My Profile", href: "/student/settings", icon: "groups" },
  { name: "Job Board", href: "/student/jobs", icon: "business_center" },
  { name: "Applications", href: "/student/applications", icon: "query_stats" },
  { name: "Interviews", href: "/student/interviews", icon: "event" },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="bg-[#0A0A0C] text-[#e7e1de] font-headline min-h-screen overflow-x-hidden selection:bg-champagne selection:text-black">
      {/* Side Navigation Bar */}
      <aside className="fixed left-0 top-0 h-screen flex flex-col py-16 px-8 w-72 border-r border-white/5 bg-[#0A0A0C]/80 backdrop-blur-xl z-50 transition-all duration-500 ease-out hidden md:flex">
        <div className="mb-16">
          <Link href="/" className="text-xl font-medium tracking-[0.3em] text-champagne font-sans">PLACIFY</Link>
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mt-2 font-headline font-bold">Placement Management</p>
        </div>
        
        <nav className="flex flex-col gap-6 font-sans font-light tracking-wide flex-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 py-3 px-4 transition-all duration-500 ease-out ${
                  isActive 
                    ? "text-champagne bg-white/5 border-l border-champagne" 
                    : "text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-200"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
                <span className="text-xs uppercase tracking-widest font-bold">{item.name}</span>
              </Link>
            );
          })}
          
          <div className="mt-auto flex flex-col gap-6">
            <Link
              href="/student/settings"
              className={`flex items-center gap-4 py-3 px-4 transition-all duration-500 ease-out ${
                pathname === "/student/settings"
                  ? "text-champagne bg-white/5 border-l border-champagne" 
                  : "text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-200"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
              <span className="text-xs uppercase tracking-widest font-bold">Settings</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-4 py-3 px-4 text-zinc-500 hover:bg-red-500/[0.05] hover:text-red-400 transition-all duration-500 ease-out text-left"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>logout</span>
              <span className="text-xs uppercase tracking-widest font-bold">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Top App Bar */}
      <header className="flex items-center justify-between md:pl-[320px] px-8 md:pr-16 w-full h-32 fixed top-0 bg-[#0A0A0C]/80 backdrop-blur-md z-40 border-b md:border-none border-white/5">
        <div>
          <h2 className="text-lg font-bold text-champagne uppercase tracking-[0.2em] font-sans">Executive Overview</h2>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">notifications_none</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors">tune</span>
            <div className="flex items-center gap-3 ml-4">
              <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center border border-champagne/20 text-champagne font-bold">
                {session?.user?.name?.charAt(0) || "S"}
              </div>
              <div className="flex flex-col hidden sm:flex">
                <span className="text-[10px] font-bold text-champagne tracking-widest uppercase">{session?.user?.name || "Student"}</span>
                <span className="text-[9px] text-zinc-500 tracking-[0.1em] uppercase font-bold">Student Identity</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="md:ml-[320px] pt-40 px-8 md:px-16 pb-24 max-w-[1600px] min-h-screen">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0A0A0C]/90 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 z-50">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`p-2 rounded-xl transition-all flex flex-col items-center ${isActive ? "text-champagne" : "text-zinc-500"}`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
