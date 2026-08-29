"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Video, Clock } from "lucide-react";

export default function StudentInterviewsPage() {
  const { data: session } = useSession();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/applications");
        if (res.ok) {
          const apps = await res.json();
          // Filter applications to only those with INTERVIEW status
          setInterviews(apps.filter((app: any) => app.status === "INTERVIEW"));
        }
      } catch (error) {
        console.error("Failed to fetch interviews", error);
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
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="mb-12">
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Active Interviews</h1>
        <p className="font-headline text-lg text-[#979085] max-w-2xl font-light">
          Manage your upcoming technical and behavioral assessments. Prepare to perform.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {interviews.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center border border-white/5">
              <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">No Scheduled Interviews</h3>
              <p className="text-zinc-500 font-headline text-sm">Keep applying to unlock new interview streams.</p>
            </div>
          ) : (
            interviews.map((interview) => (
              <div key={interview.id} className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row gap-6 justify-between group hover:bg-white/[0.02] transition-colors">
                <div className="flex gap-6">
                  <div className="hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-champagne/10 border border-champagne/20 shrink-0">
                    <span className="text-champagne font-bold text-2xl font-sans">{new Date(interview.appliedAt).getDate() + 7}</span>
                    <span className="text-champagne/70 text-[10px] uppercase font-bold tracking-widest">
                      {new Date(interview.appliedAt).toLocaleString('default', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-champagne/10 text-champagne border border-champagne/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Scheduled
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-champagne transition-colors">{interview.job.title}</h3>
                    <p className="text-zinc-400 font-headline text-sm">{interview.job.company.name} • Technical Round</p>
                    
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-2 text-zinc-500 text-xs font-headline">
                        <Clock className="w-4 h-4" />
                        <span>10:00 AM EST</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 text-xs font-headline">
                        <Video className="w-4 h-4" />
                        <span>Google Meet</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                  <button className="w-full bg-white/5 hover:bg-champagne hover:text-black text-white border border-white/10 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                    Join Call
                  </button>
                  <Link href="/student/jobs" className="mt-4 text-center text-[10px] text-zinc-500 hover:text-champagne transition-colors uppercase tracking-widest font-bold">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="lg:col-span-4">
          <div className="glass-card rounded-3xl p-6 border border-white/5 sticky top-40">
            <h3 className="text-white font-bold text-lg mb-4">Preparation Protocol</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-champagne/10 text-champagne flex items-center justify-center shrink-0 font-bold text-xs">1</div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">System Check</h4>
                  <p className="text-zinc-500 text-xs font-headline">Ensure your terminal audio and video inputs are functioning optimally.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-champagne/10 text-champagne flex items-center justify-center shrink-0 font-bold text-xs">2</div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">Portfolio Sync</h4>
                  <p className="text-zinc-500 text-xs font-headline">Have your architectural designs and code repositories ready to screen-share.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-champagne/10 text-champagne flex items-center justify-center shrink-0 font-bold text-xs">3</div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">Environment Check</h4>
                  <p className="text-zinc-500 text-xs font-headline">Find a high-bandwidth, noise-free zone for the assessment.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
