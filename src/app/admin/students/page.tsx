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
