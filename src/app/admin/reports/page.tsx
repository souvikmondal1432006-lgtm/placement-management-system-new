"use client";

import { BarChart3, Download } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-manrope tracking-tight mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Detailed placement metrics and exports.</p>
        </div>
        <button className="h-10 px-4 flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm">
          <Download className="h-4 w-4" />
          Export All Data (CSV)
        </button>
      </div>

      <div className="bg-card border border-border/50 shadow-sm glass rounded-2xl p-6 min-h-[500px] flex items-center justify-center">
        <div className="text-center text-muted-foreground space-y-4">
          <BarChart3 className="h-16 w-16 mx-auto opacity-50" />
          <h2 className="text-xl font-medium">Advanced Analytics Dashboard</h2>
          <p className="max-w-md mx-auto">This module will feature Recharts integration for department-wise placement stats and historical data comparisons.</p>
        </div>
      </div>
    </div>
  );
}
