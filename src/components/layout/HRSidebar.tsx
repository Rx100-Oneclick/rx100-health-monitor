import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Users, Calendar, FileText, BarChart3, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigationItems = [
  { 
    title: "Employees", 
    url: "/employees", 
    icon: Users,
    description: "Manage employee directory"
  },
  { 
    title: "Attendance", 
    url: "/attendance", 
    icon: Calendar,
    description: "Track attendance and shifts"
  },
  { 
    title: "Leave", 
    url: "/leave", 
    icon: FileText,
    description: "Manage leave requests"
  },
  { 
    title: "Reports", 
    url: "/reports", 
    icon: BarChart3,
    description: "Analytics and reporting"
  },
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings,
    description: "System configuration"
  },
];

export function HRSidebar() {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const SidebarItem = ({ item }: { item: typeof navigationItems[0] }) => {
    const active = isActive(item.url);
    
    const content = (
      <SidebarMenuButton asChild>
        <NavLink 
          to={item.url}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            active 
              ? 'bg-primary text-primary-foreground shadow-[var(--shadow-glow)]' 
              : 'hover:bg-card-hover hover:text-primary'
          }`}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {open && <span className="font-medium">{item.title}</span>}
        </NavLink>
      </SidebarMenuButton>
    );

    if (!open) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {content}
            </TooltipTrigger>
            <TooltipContent side="right" className="tooltip-fade">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  };

  return (
    <Sidebar 
      className={`sidebar-slide bg-sidebar border-r border-border ${
        open ? 'w-64' : 'w-16'
      }`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-border">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-card-hover transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarItem item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}