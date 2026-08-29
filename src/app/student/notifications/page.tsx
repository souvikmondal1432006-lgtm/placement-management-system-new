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
