"use client";

import {useState} from "react";
import {Bell,ChevronDown,User} from "lucide-react";
import {AppSidebar} from "./app-sidebar";
import Dashboard from "./Dashboard";
import {cn} from "@/lib/utils";

// Layout classes from components/layout/authenticated-layout.tsx and top-bar.tsx.
// Authentication, notifications, and legal/service prompts are omitted from the sample.
export default function FinShieldSample(){
  const [collapsed,setCollapsed]=useState(false);
  return <div className="flex min-h-screen bg-[var(--paper)] relative w-full overflow-x-clip">
    <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
    <div className={cn("flex-1 flex flex-col min-w-0 w-full transition-[margin-left] duration-300 ease-in-out",collapsed?"ml-0 md:ml-24":"ml-0 md:ml-72")}>
      <header className="w-full min-w-full h-20 border-b border-[var(--line)] bg-[var(--surface)] px-4 md:px-6 flex items-center justify-between gap-4 sticky top-0 z-40">
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-[var(--ink)] truncate m-0 flex items-center leading-none">Dashboard</h1>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Bell size={20} aria-label="Notifications"/>
          <div className="h-10 sm:h-11 px-2.5 sm:px-3 py-1 flex items-center justify-between gap-2 sm:gap-2.5 rounded-xl border border-[var(--line)] sm:min-w-[185px]">
            <User className="h-5 w-5 text-[var(--teal)]"/><span className="text-xs font-semibold">Karlos Rivo</span><ChevronDown size={14}/>
          </div>
        </div>
      </header>
      <main className="flex-1 p-0 min-w-0 w-full"><Dashboard/></main>
    </div>
  </div>;
}
