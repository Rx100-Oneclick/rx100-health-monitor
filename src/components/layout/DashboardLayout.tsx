import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HRSidebar } from "./HRSidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <HRSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopBar />
          
          <main className="flex-1 p-6 page-enter">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}