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
