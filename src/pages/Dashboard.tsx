import { useNavigate } from "react-router-dom";
import { Users, Calendar, FileText, BarChart3, Settings } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

const dashboardCards = [
  {
    title: "Employee Directory",
    description: "View and manage all employees.",
    icon: Users,
    route: "/employees",
  },
  {
    title: "Attendance",
    description: "Track attendance logs and shifts.",
    icon: Calendar,
    route: "/attendance",
  },
  {
    title: "Leave Requests",
    description: "Approve or reject leave applications.",
    icon: FileText,
    route: "/leave",
  },
  {
    title: "Reports",
    description: "Generate workforce reports and analytics.",
    icon: BarChart3,
    route: "/reports",
  },
  {
    title: "Settings",
    description: "Configure policies and roles.",
    icon: Settings,
    route: "/settings",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your HR Management System. Choose a module to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
            onClick={() => navigate(card.route)}
          />
        ))}
      </div>
    </div>
  );
}