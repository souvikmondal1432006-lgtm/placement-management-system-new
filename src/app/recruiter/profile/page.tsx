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
